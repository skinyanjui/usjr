"use client";

import { useEffect } from "react";
import {
  BUSINESS,
  PRICE_INCLUDES,
  PRICING,
  buildAgentQuoteUrl,
  classifyHaulingItem,
  contactBlock,
  locations,
  matchAgentArea,
  matchAgentService,
  normalizeAgentText,
  quantityForLoadSize,
  services,
} from "../agent-catalog";

const WEBMCP_QUOTE_DRAFT_EVENT = "uncle-sam:webmcp-quote-draft";

type ToolAnnotations = {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
};
type ToolExecuteOptions = { signal: AbortSignal };
type WebMcpTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: ToolAnnotations;
  execute: (
    input: Record<string, unknown>,
    options: ToolExecuteOptions,
  ) => Promise<unknown> | unknown;
};
type ModelContext = {
  registerTool: (
    tool: WebMcpTool,
    options?: { signal?: AbortSignal; exposedTo?: string[] },
  ) => Promise<unknown>;
};

function getModelContext(): ModelContext | undefined {
  return (document as Document & { modelContext?: ModelContext }).modelContext;
}

function asString(input: Record<string, unknown>, key: string, max = 500) {
  const value = input[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function urgencyForTiming(timing: string) {
  const values: Record<string, string> = {
    today: "today",
    "2-3 days": "within-2-3-days",
    "within-2-3-days": "within-2-3-days",
    flexible: "flexible",
  };
  return values[timing] || "flexible";
}

function makeTools(): WebMcpTool[] {
  return [
    {
      name: "listServices",
      title: "List junk removal services",
      description:
        "List Uncle Sam Junk Removal services and match plain-language job descriptions to the closest service. Use this before preparing a quote. Do not use it for pricing or coverage questions.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            maxLength: 160,
            description:
              "Optional plain-language job description such as old couch, shed out back, office move, or inherited house.",
          },
          popularOnly: {
            type: "boolean",
            description: "Return only services marked popular on the website.",
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const query = asString(input, "query", 160);
        const popularOnly = input.popularOnly === true;
        let list = popularOnly
          ? services.filter((service) => service.popular)
          : services;

        if (query) {
          const direct = matchAgentService(query);
          if (direct && (!popularOnly || direct.popular)) {
            list = [direct];
          } else {
            const normalized = normalizeAgentText(query);
            const hits = list.filter((service) =>
              normalizeAgentText(
                `${service.name} ${service.summary} ${service.includes.join(" ")} ${service.bestFor.join(" ")}`,
              ).includes(normalized),
            );
            if (hits.length > 0) list = hits;
          }
        }

        return {
          matched: Boolean(query && list.length === 1),
          total: list.length,
          services: list.map((service) => ({
            name: service.name,
            slug: service.slug,
            summary: service.summary,
            includes: service.includes,
            url: `${BUSINESS.site}/services/${service.slug}`,
          })),
        };
      },
    },
    {
      name: "checkServiceArea",
      title: "Check service area",
      description:
        "Check whether a city, ZIP code, or address matches a regularly listed Uncle Sam Junk Removal service community. Unmatched locations return unknown, never no; nearby jobs may still be possible.",
      inputSchema: {
        type: "object",
        properties: {
          location: {
            type: "string",
            minLength: 2,
            maxLength: 160,
            description: "Pickup city, ZIP code, or address.",
          },
        },
        required: ["location"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const hit = matchAgentArea(asString(input, "location", 160));
        if (hit) {
          return {
            status: "covered",
            city: hit.name,
            county: hit.county,
            url: `${BUSINESS.site}/locations/${hit.slug}`,
            message: `${hit.name} is a listed Uncle Sam Junk Removal service community.`,
          };
        }
        return {
          status: "unknown",
          message:
            "That location is not one of the currently listed communities. Keep the lead and call or text to confirm coverage rather than treating this as unavailable.",
          listedCommunities: locations.map((location) => location.name),
          contact: contactBlock(),
        };
      },
    },
    {
      name: "estimatePrice",
      title: "Estimate planning price",
      description:
        "Return the website's current planning price range for a load size. This is not a binding quote. Final onsite pricing depends on volume, weight, item type, access, disposal needs, and project scope.",
      inputSchema: {
        type: "object",
        properties: {
          loadSize: {
            type: "string",
            enum: [
              "single_item",
              "quarter_load",
              "half_load",
              "three_quarter_load",
              "full_load",
              "unsure",
            ],
          },
          service: { type: "string", maxLength: 120 },
        },
        required: ["loadSize"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const loadSize = asString(input, "loadSize", 40);
        const service = matchAgentService(asString(input, "service", 120));
        const tier = PRICING.find((price) => price.size === loadSize);
        const base = {
          includes: PRICE_INCLUDES,
          disclaimer:
            "Planning range only. The final onsite price is presented for customer approval before work begins.",
          nextStep: BUSINESS.fastestPath,
          contact: contactBlock(),
        };
        if (!tier) {
          return {
            ...base,
            allTiers: PRICING.map((price) => ({
              ...price,
              range: `$${price.low}–$${price.high}`,
            })),
          };
        }
        return {
          ...base,
          loadSize: tier.label,
          describes: tier.describes,
          low: tier.low,
          high: tier.high,
          range: `$${tier.low}–$${tier.high}`,
          service: service?.name,
          note:
            service &&
            ["light-demolition", "hot-tub-removal", "shed-removal"].includes(
              service.slug,
            )
              ? "Demolition-type work is priced by scope, not volume alone. Photos of the project and access route are needed."
              : undefined,
        };
      },
    },
    {
      name: "getHaulingPolicy",
      title: "Check hauling policy",
      description:
        "Check whether a specific item is clearly excluded, needs assessment, needs advance disclosure, or is likely within normal hauling scope. Call this before promising any chemical, appliance, tank, construction material, or unusual item will be taken.",
      inputSchema: {
        type: "object",
        properties: {
          item: {
            type: "string",
            maxLength: 240,
            description:
              "Item or material such as half-full paint cans, mini fridge, concrete patio, old floor tile, or couch.",
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const item = asString(input, "item", 240);
        const rule = classifyHaulingItem(item);
        if (!item) {
          return {
            verdict: "see_policy",
            message:
              "Describe the item or material. Unusual, chemical, heavy, pressurized, refrigerant-containing, or utility-connected items should be checked before promising pickup.",
            contact: contactBlock(),
          };
        }
        if (!rule) {
          return {
            item,
            verdict: "likely_accepted",
            message:
              "This item does not match a documented special-handling rule. Most non-hazardous household and commercial items are generally within scope; send a photo when uncertain.",
            contact: contactBlock(),
          };
        }
        return {
          item,
          verdict: rule.verdict,
          category: rule.category,
          message: rule.guidance,
          contact: contactBlock(),
        };
      },
    },
    {
      name: "getBusinessInfo",
      title: "Get business information",
      description:
        "Get the business location, service region, operating promises, pricing approach, and contact methods. Use this for general company and contact questions; do not use it instead of the service, area, or price tools.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async () => ({
        name: BUSINESS.name,
        ownership: BUSINESS.ownership,
        basedIn: `${BUSINESS.city}, ${BUSINESS.state}`,
        serviceRegion: BUSINESS.region,
        promises: BUSINESS.promises,
        howPricingWorks:
          "Planning ranges are based on load size. Final pricing is adjusted for item type, weight, access, disposal needs, and project scope and is approved before work begins.",
        contact: contactBlock(),
        site: BUSINESS.site,
      }),
    },
    {
      name: "getQuoteLink",
      title: "Build quote link",
      description:
        "Build a link to the website quote form with known details prefilled. Use this when the customer is not currently on the quote form. The customer must still review, consent, and submit it themselves; the link does not create a booking.",
      inputSchema: {
        type: "object",
        properties: {
          service: { type: "string", minLength: 2, maxLength: 120 },
          location: { type: "string", minLength: 2, maxLength: 160 },
          loadSize: {
            type: "string",
            enum: [
              "single_item",
              "quarter_load",
              "half_load",
              "three_quarter_load",
              "full_load",
              "unsure",
            ],
          },
          timing: {
            type: "string",
            enum: ["today", "2-3 days", "within-2-3-days", "flexible"],
          },
          notes: { type: "string", maxLength: 400 },
        },
        required: ["service", "location"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const service = matchAgentService(asString(input, "service", 120));
        if (!service) {
          return {
            error: "unknown_service",
            message:
              "The service could not be matched. Use listServices first and pass an exact service name or slug.",
          };
        }
        return {
          url: buildAgentQuoteUrl(input),
          service: service.name,
          message:
            "Open or send this link to prefill the quote form. The customer must review the request, check contact consent, and submit it themselves.",
          bookingConfirmed: false,
          submitted: false,
          contact: contactBlock(),
        };
      },
    },
    {
      name: "prepareQuoteRequest",
      title: "Prepare quote request",
      description:
        "Prepare the on-page free quote form for human review. This tool never checks the consent box and never submits the request. A person must explicitly approve applying the draft, then personally review, consent, and submit the form.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", maxLength: 100 },
          phone: { type: "string", maxLength: 40 },
          email: { type: "string", maxLength: 254 },
          location: { type: "string", minLength: 2, maxLength: 160 },
          service: { type: "string", minLength: 2, maxLength: 120 },
          timing: {
            type: "string",
            enum: ["today", "2-3 days", "within-2-3-days", "flexible"],
          },
          loadSize: {
            type: "string",
            enum: [
              "single_item",
              "quarter_load",
              "half_load",
              "three_quarter_load",
              "full_load",
              "unsure",
            ],
          },
          notes: { type: "string", maxLength: 2000 },
        },
        required: ["location", "service"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async (input, { signal }) => {
        if (signal.aborted) throw signal.reason;
        const service = matchAgentService(asString(input, "service", 120));
        if (!service) {
          return {
            prepared: false,
            error: "unknown_service",
            message:
              "The service could not be matched. Use listServices first and pass an exact service name or slug.",
          };
        }
        const approved = window.confirm(
          `Apply the AI-prepared ${service.name} request to the quote form for your review? Nothing will be submitted, and contact consent will remain unchecked.`,
        );
        if (!approved) {
          return {
            prepared: false,
            reason: "human_declined",
            submitted: false,
            consentChecked: false,
          };
        }
        const detail = {
          name: asString(input, "name", 100),
          phone: asString(input, "phone", 40),
          email: asString(input, "email", 254),
          address: asString(input, "location", 160),
          service: service.quoteValue,
          urgency: urgencyForTiming(asString(input, "timing", 40)),
          quantity: quantityForLoadSize(asString(input, "loadSize", 40)),
          notes: asString(input, "notes", 2000),
        };
        window.dispatchEvent(
          new CustomEvent(WEBMCP_QUOTE_DRAFT_EVENT, { detail }),
        );
        document
          .getElementById("quote")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return {
          prepared: true,
          service: service.name,
          fieldsPrepared: Object.entries(detail)
            .filter(([, value]) => Boolean(value))
            .map(([key]) => key),
          submitted: false,
          consentChecked: false,
          message:
            "The draft was applied to the visible quote form after human approval. The customer must review it, choose any remaining options, check the contact-consent box themselves, and press the submit button themselves.",
          contact: contactBlock(),
        };
      },
    },
  ];
}

export function WebMcpTools() {
  useEffect(() => {
    if (!window.isSecureContext || window.top !== window.self) return;
    const modelContext = getModelContext();
    if (!modelContext) return;
    const controller = new AbortController();
    for (const tool of makeTools()) {
      void modelContext
        .registerTool(tool, { signal: controller.signal })
        .catch((error) => {
          console.warn(
            `[webmcp] skipped ${tool.name}:`,
            error instanceof Error ? error.message : error,
          );
        });
    }
    return () => controller.abort();
  }, []);
  return null;
}

export { WEBMCP_QUOTE_DRAFT_EVENT };
