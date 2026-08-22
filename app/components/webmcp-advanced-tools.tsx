"use client";

import { useEffect } from "react";

const SERVICE_KEYWORDS: Array<{
  service: string;
  keywords: string[];
  reason: string;
}> = [
  {
    service: "Furniture Removal",
    keywords: ["couch", "sofa", "sectional", "dresser", "desk", "table", "chair", "bed frame", "furniture"],
    reason: "The described items are primarily furniture.",
  },
  {
    service: "Mattress Removal",
    keywords: ["mattress", "box spring"],
    reason: "The scope includes mattresses or box springs.",
  },
  {
    service: "Appliance Removal",
    keywords: ["refrigerator", "fridge", "freezer", "washer", "dryer", "stove", "oven", "dishwasher", "appliance"],
    reason: "The scope includes household appliances.",
  },
  {
    service: "Estate Cleanouts",
    keywords: ["estate", "whole house", "entire house", "inherited house", "deceased", "probate"],
    reason: "The request sounds like a whole-property or estate cleanout.",
  },
  {
    service: "Garage Cleanout",
    keywords: ["garage", "carport"],
    reason: "The request is centered on a garage or carport cleanout.",
  },
  {
    service: "Storage Unit Cleanouts",
    keywords: ["storage unit", "storage locker"],
    reason: "The pickup is from a storage unit or locker.",
  },
  {
    service: "Office Cleanouts",
    keywords: ["office", "cubicle", "office furniture"],
    reason: "The request is primarily an office cleanout.",
  },
  {
    service: "Restaurant Equipment Removal",
    keywords: ["restaurant", "commercial kitchen", "restaurant equipment"],
    reason: "The request involves restaurant or commercial-kitchen equipment.",
  },
  {
    service: "Property Management Turnovers",
    keywords: ["tenant", "rental turnover", "apartment turnover", "property manager", "eviction"],
    reason: "The request is associated with a rental-property turnover.",
  },
  {
    service: "Warehouse Fixture Removal",
    keywords: ["warehouse", "pallet rack", "racking", "warehouse fixture"],
    reason: "The request involves warehouse fixtures or a warehouse cleanout.",
  },
  {
    service: "Hot Tub Removal",
    keywords: ["hot tub", "spa"],
    reason: "The scope includes a hot tub or spa.",
  },
  {
    service: "Shed Removal",
    keywords: ["shed", "outbuilding"],
    reason: "The scope includes a shed or small outbuilding.",
  },
  {
    service: "Yard Waste Removal",
    keywords: ["branches", "brush", "leaves", "yard waste", "tree limbs"],
    reason: "The scope is primarily yard debris.",
  },
  {
    service: "Storm Debris Cleanup",
    keywords: ["storm", "wind damage", "storm debris"],
    reason: "The request is related to storm debris.",
  },
  {
    service: "Light Demolition",
    keywords: ["demolish", "demolition", "tear down", "dismantle"],
    reason: "The request includes dismantling or light demolition.",
  },
];

const CLEARLY_SUPPORTED_ITEMS = [
  "furniture",
  "mattress",
  "box spring",
  "couch",
  "sofa",
  "sectional",
  "dresser",
  "desk",
  "chair",
  "table",
  "washer",
  "dryer",
  "stove",
  "oven",
  "dishwasher",
  "yard waste",
  "branches",
  "brush",
] as const;

const SPECIAL_CONFIRMATION_ITEMS = [
  "refrigerator",
  "fridge",
  "freezer",
  "television",
  "tv",
  "tire",
  "tires",
  "paint",
  "concrete",
  "brick",
  "dirt",
  "soil",
  "battery",
  "batteries",
  "chemical",
  "chemicals",
  "hazardous",
  "propane",
  "fuel",
  "oil",
] as const;

type ModelContext = {
  registerTool: (
    tool: Record<string, unknown>,
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>;
};

function getModelContext(): ModelContext | undefined {
  return (document as Document & { modelContext?: ModelContext }).modelContext;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function detectMatches(text: string, words: readonly string[]) {
  const normalized = normalize(text);
  return words.filter((word) => normalized.includes(word));
}

export function WebMcpAdvancedTools() {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;

    const controller = new AbortController();
    const options = { signal: controller.signal };

    void modelContext.registerTool(
      {
        name: "find_best_junk_removal_service",
        description:
          "Match a customer's plain-language junk removal scope to the most appropriate Uncle Sam Junk Removal service. Use before preparing a quote when the user describes items instead of naming a service.",
        inputSchema: {
          type: "object",
          properties: {
            description: {
              type: "string",
              minLength: 2,
              maxLength: 2000,
              description: "Plain-language description of the items, property, and work requested.",
            },
          },
          required: ["description"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true, untrustedContentHint: true },
        execute: async ({ description }: { description: string }) => {
          const text = normalize(description);
          const matches = SERVICE_KEYWORDS.map((entry) => ({
            ...entry,
            matchedKeywords: entry.keywords.filter((keyword) => text.includes(keyword)),
          }))
            .filter((entry) => entry.matchedKeywords.length > 0)
            .sort((a, b) => b.matchedKeywords.length - a.matchedKeywords.length);

          if (matches.length === 0) {
            return {
              service: "Junk Removal",
              confidence: "medium",
              reason: "No specialty-service keywords were detected, so general Junk Removal is the safest default.",
              alternatives: [],
            };
          }

          return {
            service: matches[0].service,
            confidence: matches[0].matchedKeywords.length >= 2 ? "high" : "medium",
            reason: matches[0].reason,
            matchedKeywords: matches[0].matchedKeywords,
            alternatives: matches.slice(1, 4).map((match) => ({
              service: match.service,
              reason: match.reason,
            })),
          };
        },
      },
      options,
    );

    void modelContext.registerTool(
      {
        name: "check_junk_item_acceptance",
        description:
          "Check whether described items clearly fit Uncle Sam Junk Removal's published services or require manual confirmation. This tool deliberately does not invent disposal rules for special, regulated, unusually heavy, or undocumented materials.",
        inputSchema: {
          type: "object",
          properties: {
            items: {
              type: "array",
              minItems: 1,
              maxItems: 30,
              items: { type: "string", minLength: 1, maxLength: 120 },
            },
          },
          required: ["items"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true, untrustedContentHint: true },
        execute: async ({ items }: { items: string[] }) => {
          const results = items.map((item) => {
            const special = detectMatches(item, SPECIAL_CONFIRMATION_ITEMS);
            if (special.length > 0) {
              return {
                item,
                status: "confirm",
                reason:
                  "This item may involve special disposal, weight, recycling, or handling requirements that are not defined in the current public policy.",
              };
            }

            const supported = detectMatches(item, CLEARLY_SUPPORTED_ITEMS);
            if (supported.length > 0) {
              return {
                item,
                status: "service-fit",
                reason: "This item clearly fits one or more currently published removal services.",
              };
            }

            return {
              item,
              status: "confirm",
              reason:
                "The current website does not publish a specific acceptance rule for this item. Include it in the quote request for confirmation.",
            };
          });

          return {
            items: results,
            allClearlySupported: results.every((result) => result.status === "service-fit"),
            instruction:
              "Do not tell the customer an undocumented or special-handling item is definitely accepted. Include uncertain items in the quote notes for team confirmation.",
          };
        },
      },
      options,
    );

    void modelContext.registerTool(
      {
        name: "prepare_junk_removal_quote",
        description:
          "Prepare and summarize a junk removal quote request without submitting it. Use this before the side-effecting submission tool so the customer can review the scope and contact details.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            phone: { type: "string", minLength: 7, maxLength: 40 },
            email: { type: "string", format: "email", maxLength: 254 },
            address: { type: "string", minLength: 2, maxLength: 160 },
            service: { type: "string", minLength: 2, maxLength: 100 },
            urgency: {
              type: "string",
              enum: ["today", "within-2-3-days", "choose-date", "flexible"],
            },
            preferredDate: { type: "string", format: "date" },
            quantity: { type: "string", minLength: 1, maxLength: 120 },
            placement: { type: "string", enum: ["indoor", "outdoor", "both", "unsure"] },
            access: { type: "array", maxItems: 8, items: { type: "string", maxLength: 80 } },
            heavyMaterials: { type: "boolean" },
            dismantling: { type: "boolean" },
            heavyDetails: { type: "string", maxLength: 500 },
            preferredContact: { type: "string", enum: ["call", "text", "email"] },
            notes: { type: "string", maxLength: 2000 },
          },
          required: [
            "name",
            "phone",
            "email",
            "address",
            "service",
            "urgency",
            "quantity",
            "placement",
            "preferredContact"
          ],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true, untrustedContentHint: true },
        execute: async (input: Record<string, unknown>) => {
          if (input.urgency === "choose-date" && !input.preferredDate) {
            throw new Error("preferredDate is required when urgency is choose-date.");
          }

          const prepared = {
            ...input,
            access: Array.isArray(input.access) ? input.access : [],
            heavyMaterials: input.heavyMaterials === true,
            dismantling: input.dismantling === true,
            heavyDetails: typeof input.heavyDetails === "string" ? input.heavyDetails : "",
            notes: typeof input.notes === "string" ? input.notes : "",
          };

          return {
            readyToSubmit: true,
            preparedQuote: prepared,
            review: {
              customer: `${prepared.name}`,
              pickup: `${prepared.address}`,
              service: `${prepared.service}`,
              timing:
                prepared.urgency === "choose-date"
                  ? `Choose date: ${prepared.preferredDate}`
                  : `${prepared.urgency}`,
              scope: `${prepared.quantity}`,
              preferredContact: `${prepared.preferredContact}`,
              notes: `${prepared.notes || "None"}`,
            },
            nextStep:
              "Show this summary to the customer. Only use submit_prepared_junk_removal_quote after they explicitly approve submission and consent to contact.",
          };
        },
      },
      options,
    );

    void modelContext.registerTool(
      {
        name: "submit_prepared_junk_removal_quote",
        description:
          "Submit a previously reviewed junk removal quote request. Use only after the customer explicitly approves the prepared summary and consents to being contacted about this service request.",
        inputSchema: {
          type: "object",
          properties: {
            preparedQuote: { type: "object", additionalProperties: true },
            approved: {
              type: "boolean",
              const: true,
              description: "True only when the customer explicitly approves submitting the reviewed quote summary.",
            },
            consent: {
              type: "boolean",
              const: true,
              description: "True only when the customer explicitly consents to call, text, or email follow-up about this request.",
            },
          },
          required: ["preparedQuote", "approved", "consent"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: true },
        execute: async (
          {
            preparedQuote,
            approved,
            consent,
          }: {
            preparedQuote: Record<string, unknown>;
            approved: true;
            consent: true;
          },
          { signal }: { signal: AbortSignal },
        ) => {
          if (!approved || !consent) {
            throw new Error("Explicit approval and contact consent are required before submission.");
          }

          const response = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...preparedQuote,
              consent: true,
              company: "",
              conditionalDetails: {},
              submissionId: crypto.randomUUID(),
              source: "webmcp-reviewed",
              startedAt: Date.now() - 2000,
            }),
            signal,
          });

          const payload = await response.json().catch(() => null);
          if (!response.ok) {
            throw new Error(
              payload && typeof payload === "object" && "error" in payload
                ? String(payload.error)
                : "Quote request could not be submitted.",
            );
          }

          return {
            submitted: true,
            result: payload,
            message:
              "The reviewed quote request was submitted to Uncle Sam Junk Removal for follow-up.",
          };
        },
      },
      options,
    );

    return () => controller.abort();
  }, []);

  return null;
}
