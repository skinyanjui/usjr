"use client";

import { useEffect } from "react";
import {
  emailAddress,
  locations,
  phoneDisplay,
  phoneHref,
  services,
  siteUrl,
} from "../site-data";

const WEBMCP_QUOTE_DRAFT_EVENT = "uncle-sam:webmcp-quote-draft";

const PRICING = [
  { size: "single_item", label: "Single item / a few items", describes: "One or a few bulky items", low: 75, high: 150 },
  { size: "quarter_load", label: "¼ trailer load", describes: "Small room or partial cleanout", low: 200, high: 300 },
  { size: "half_load", label: "½ trailer load", describes: "Large room or garage cleanout", low: 350, high: 450 },
  { size: "three_quarter_load", label: "¾ trailer load", describes: "Large multi-room cleanout", low: 425, high: 550 },
  { size: "full_load", label: "Full trailer load", describes: "Large home, office, or property cleanout", low: 500, high: 650 },
] as const;

const PRICE_INCLUDES = [
  "Labor and heavy lifting",
  "Loading and transportation",
  "Standard disposal fees",
  "A basic sweep-up",
] as const;

const NOT_ACCEPTED = [
  "asbestos",
  "biohazards",
  "medical waste",
  "explosives",
  "fuels",
  "unidentified chemicals",
  "other hazardous materials",
] as const;

const FLAG_AHEAD = [
  "paint",
  "refrigerant-containing appliances",
  "pressurized containers",
  "unusually heavy materials such as concrete, tile, dirt, or safes",
] as const;

const LOCATION_ALIASES: Record<string, string[]> = {
  "mount-carmel-il": ["mt carmel"],
  "mount-vernon-in": ["mt vernon"],
};

const ZIP_HINTS: Record<string, string[]> = {
  "evansville-in": ["47708", "47710", "47711", "47712", "47713", "47714", "47715", "47716", "47720", "47725"],
  "newburgh-in": ["47629", "47630"],
  "henderson-ky": ["42419", "42420"],
  "owensboro-ky": ["42301", "42303"],
  "boonville-in": ["47601"],
  "princeton-in": ["47670"],
  "mount-carmel-il": ["62863"],
  "mount-vernon-in": ["47620"],
  "new-harmony-in": ["47631"],
};

type ToolAnnotations = { readOnlyHint?: boolean; untrustedContentHint?: boolean };
type ToolExecuteOptions = { signal: AbortSignal };
type WebMcpTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: ToolAnnotations;
  execute: (input: Record<string, unknown>, options: ToolExecuteOptions) => Promise<unknown> | unknown;
};
type ModelContext = {
  registerTool: (tool: WebMcpTool, options?: { signal?: AbortSignal; exposedTo?: string[] }) => Promise<unknown>;
};

function getModelContext(): ModelContext | undefined {
  return (document as Document & { modelContext?: ModelContext }).modelContext;
}

const norm = (value: unknown) => String(value || "").toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ").trim();

function matchService(input: unknown) {
  const query = norm(input);
  if (!query) return null;
  return (
    services.find((service) => service.slug === query) ||
    services.find((service) => norm(service.name) === query) ||
    services.find((service) => norm(service.name).includes(query) || query.includes(norm(service.name))) ||
    services.find((service) => norm(`${service.name} ${service.summary} ${service.includes.join(" ")} ${service.bestFor.join(" ")}`).includes(query)) ||
    null
  );
}

function matchArea(input: unknown) {
  const query = norm(input);
  if (!query) return null;
  const zip = query.match(/\b(\d{5})\b/)?.[1];
  if (zip) {
    const byZip = locations.find((location) => (ZIP_HINTS[location.slug] || []).includes(zip));
    if (byZip) return byZip;
  }
  return (
    locations.find((location) => query.includes(norm(location.city))) ||
    locations.find((location) => (LOCATION_ALIASES[location.slug] || []).some((alias) => query.includes(norm(alias)))) ||
    null
  );
}

function contactBlock() {
  return {
    phone: phoneDisplay,
    call: `tel:${phoneHref}`,
    text: `sms:${phoneHref}`,
    email: emailAddress,
    note: "Texting photos usually produces the fastest, most useful estimate.",
  };
}

function asString(input: Record<string, unknown>, key: string, max = 500) {
  const value = input[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function quantityForLoadSize(loadSize: string) {
  const labels: Record<string, string> = {
    single_item: "Single item",
    quarter_load: "¼ trailer load",
    half_load: "½ trailer load",
    three_quarter_load: "¾ trailer load",
    full_load: "Full trailer load",
    unsure: "Not sure",
  };
  return labels[loadSize] || "Not sure";
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
      description: "List Uncle Sam Junk Removal services in the Evansville Tri-State. Use this to identify the right service before preparing a quote request.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", maxLength: 120, description: "Optional keyword such as couch, shed, office, or appliance." },
          popularOnly: { type: "boolean", description: "Return only services marked popular on the website." },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const query = asString(input, "query", 120);
        const popularOnly = input.popularOnly === true;
        let list = popularOnly ? services.filter((service) => service.popular) : services;
        if (query) {
          const normalized = norm(query);
          const hits = list.filter((service) => norm(`${service.name} ${service.summary} ${service.includes.join(" ")} ${service.bestFor.join(" ")}`).includes(normalized));
          if (hits.length > 0) list = hits;
        }
        return {
          total: list.length,
          services: list.map((service) => ({
            name: service.name,
            slug: service.slug,
            summary: service.summary,
            includes: service.includes,
            url: `${siteUrl}/services/${service.slug}`,
          })),
        };
      },
    },
    {
      name: "checkServiceArea",
      title: "Check service area",
      description: "Check whether a city, ZIP code, or address matches a regularly listed Uncle Sam Junk Removal service community. Unmatched locations return unknown, not no, so nearby leads are not rejected automatically.",
      inputSchema: {
        type: "object",
        properties: { location: { type: "string", minLength: 2, maxLength: 160, description: "Pickup city, ZIP code, or address." } },
        required: ["location"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const hit = matchArea(asString(input, "location", 160));
        if (hit) {
          return {
            status: "covered",
            city: hit.name,
            county: hit.county,
            url: `${siteUrl}/locations/${hit.slug}`,
            message: `${hit.name} is a listed Uncle Sam Junk Removal service community.`,
          };
        }
        return {
          status: "unknown",
          message: "That location is not one of the currently listed communities. Nearby jobs may still be possible, so call or text to confirm coverage rather than treating this as unavailable.",
          listedCommunities: locations.map((location) => location.name),
          contact: contactBlock(),
        };
      },
    },
    {
      name: "estimatePrice",
      title: "Estimate planning price",
      description: "Return the website's planning price range for a load size. This is not a binding quote. Final onsite pricing depends on volume, weight, item type, access, disposal needs, and project scope.",
      inputSchema: {
        type: "object",
        properties: {
          loadSize: { type: "string", enum: ["single_item", "quarter_load", "half_load", "three_quarter_load", "full_load", "unsure"] },
          service: { type: "string", maxLength: 120 },
        },
        required: ["loadSize"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const loadSize = asString(input, "loadSize", 40);
        const service = matchService(asString(input, "service", 120));
        const tier = PRICING.find((price) => price.size === loadSize);
        const base = {
          includes: PRICE_INCLUDES,
          disclaimer: "Planning range only. The final onsite price is presented for customer approval before work begins.",
          nextStep: "Send photos for a more useful estimate.",
          contact: contactBlock(),
        };
        if (!tier) {
          return { ...base, allTiers: PRICING.map((price) => ({ ...price, range: `$${price.low}–$${price.high}` })) };
        }
        return {
          ...base,
          loadSize: tier.label,
          describes: tier.describes,
          range: `$${tier.low}–$${tier.high}`,
          service: service?.name,
          note: service && ["light-demolition", "hot-tub-removal", "shed-removal"].includes(service.slug)
            ? "Demolition-type work is priced by scope, not volume alone. Photos of the project and access route are needed."
            : undefined,
        };
      },
    },
    {
      name: "getHaulingPolicy",
      title: "Check hauling policy",
      description: "Check whether an item is clearly excluded, needs advance disclosure, or is likely acceptable. Use this before promising that an unusual material or item will be hauled.",
      inputSchema: {
        type: "object",
        properties: { item: { type: "string", maxLength: 200, description: "Item or material such as old paint cans, mini fridge, concrete, or couch." } },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const item = asString(input, "item", 200);
        const query = norm(item);
        const blocked = NOT_ACCEPTED.find((entry) => query && (query.includes(norm(entry)) || norm(entry).includes(query)));
        const flagged = FLAG_AHEAD.find((entry) => query && norm(entry).split(" ").some((word) => word.length > 4 && query.includes(word)));
        return {
          item: item || null,
          verdict: blocked ? "not_accepted" : flagged ? "needs_advance_notice" : query ? "likely_accepted" : "see_lists",
          message: blocked
            ? `Uncle Sam Junk Removal does not list ${blocked} as accepted material. Use an appropriate licensed disposal provider.`
            : flagged
              ? "This item needs advance disclosure so the crew can confirm equipment and disposal options before the job."
              : query
                ? "Most non-hazardous household and commercial items are generally within scope. Send a photo or contact the team when uncertain."
                : "Review the exclusion and advance-notice lists.",
          neverAccepted: NOT_ACCEPTED,
          mustDiscloseInAdvance: FLAG_AHEAD,
          contact: contactBlock(),
        };
      },
    },
    {
      name: "prepareQuoteRequest",
      title: "Prepare quote request",
      description: "Prepare the on-page free quote form for human review. This tool never checks the consent box and never submits the request. A person must explicitly approve applying the draft, then personally review, consent, and submit the form.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", maxLength: 100 },
          phone: { type: "string", maxLength: 40 },
          email: { type: "string", maxLength: 254 },
          location: { type: "string", minLength: 2, maxLength: 160 },
          service: { type: "string", minLength: 2, maxLength: 120 },
          timing: { type: "string", enum: ["today", "2-3 days", "within-2-3-days", "flexible"] },
          loadSize: { type: "string", enum: ["single_item", "quarter_load", "half_load", "three_quarter_load", "full_load", "unsure"] },
          notes: { type: "string", maxLength: 2000 },
        },
        required: ["location", "service"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async (input, { signal }) => {
        if (signal.aborted) throw signal.reason;
        const service = matchService(asString(input, "service", 120));
        if (!service) {
          return { prepared: false, error: "unknown_service", message: "The service could not be matched. Use listServices first and pass an exact service name or slug." };
        }
        const approved = window.confirm(
          `Apply the AI-prepared ${service.name} request to the quote form for your review? Nothing will be submitted, and contact consent will remain unchecked.`,
        );
        if (!approved) {
          return { prepared: false, reason: "human_declined", submitted: false, consentChecked: false };
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
        window.dispatchEvent(new CustomEvent(WEBMCP_QUOTE_DRAFT_EVENT, { detail }));
        document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return {
          prepared: true,
          service: service.name,
          fieldsPrepared: Object.entries(detail).filter(([, value]) => Boolean(value)).map(([key]) => key),
          submitted: false,
          consentChecked: false,
          message: "The draft was applied to the visible quote form after human approval. The customer must review it, choose any remaining options, check the contact-consent box themselves, and press the submit button themselves.",
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
      void modelContext.registerTool(tool, { signal: controller.signal }).catch((error) => {
        console.warn(`[webmcp] skipped ${tool.name}:`, error instanceof Error ? error.message : error);
      });
    }
    return () => controller.abort();
  }, []);
  return null;
}

export { WEBMCP_QUOTE_DRAFT_EVENT };
