"use client";

import { useEffect } from "react";

const SERVICES = [
  "Junk Removal",
  "Furniture Removal",
  "Cleaning",
  "Estate Cleanouts",
  "Appliance Removal",
  "Light Demolition",
  "Garage Cleanout",
  "Hot Tub Removal",
  "Mattress Removal",
  "Shed Removal",
  "Yard Waste Removal",
  "Storage Unit Cleanouts",
  "Office Cleanouts",
  "Restaurant Equipment Removal",
  "Property Management Turnovers",
  "Warehouse Fixture Removal",
  "Holiday Tree Removal",
  "Storm Debris Cleanup",
] as const;

const SERVICE_AREAS = [
  "Evansville, IN",
  "Newburgh, IN",
  "Henderson, KY",
  "Owensboro, KY",
  "Boonville, IN",
  "Princeton, IN",
  "Mount Carmel, IL",
  "Mount Vernon, IN",
  "New Harmony, IN",
] as const;

const PRICING_GUIDE = [
  { size: "Single item", description: "1–2 bulky items", range: "$89–149" },
  { size: "1/4 load", description: "Small room cleanout", range: "$179–249" },
  { size: "1/2 load", description: "Large room or garage", range: "$289–389" },
  { size: "Full load", description: "Home or office cleanout", range: "$489–649" },
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

function normalizeLocation(value: string) {
  return value
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function WebMcpTools() {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;

    const controller = new AbortController();
    const options = { signal: controller.signal };

    void modelContext.registerTool(
      {
        name: "list_junk_removal_services",
        description:
          "List the junk removal, cleanout, cleaning, hauling, and light demolition services offered by Uncle Sam Junk Removal in the Evansville Tri-State.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          untrustedContentHint: false,
        },
        execute: async () => ({
          business: "Uncle Sam Junk Removal",
          services: SERVICES,
          nextStep:
            "Use check_junk_removal_service_area to verify coverage, then request_junk_removal_quote if the user wants a quote.",
        }),
      },
      options,
    );

    void modelContext.registerTool(
      {
        name: "check_junk_removal_service_area",
        description:
          "Check whether Uncle Sam Junk Removal publicly lists a city as a standard service area. For nearby unlisted locations, return that the customer should call or request a quote to confirm coverage.",
        inputSchema: {
          type: "object",
          properties: {
            location: {
              type: "string",
              minLength: 2,
              maxLength: 120,
              description: "Customer city, state, ZIP, or pickup location.",
            },
          },
          required: ["location"],
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          untrustedContentHint: false,
        },
        execute: async ({ location }: { location: string }) => {
          const normalized = normalizeLocation(location);
          const match = SERVICE_AREAS.find((area) => {
            const areaNormalized = normalizeLocation(area);
            const city = areaNormalized.split(",")[0];
            return normalized.includes(areaNormalized) || normalized.includes(city);
          });

          if (match) {
            return {
              covered: true,
              matchedArea: match,
              message: `${match} is a listed Uncle Sam Junk Removal service area.`,
            };
          }

          return {
            covered: null,
            listedAreas: SERVICE_AREAS,
            message:
              "This location is not one of the publicly listed standard service areas. Nearby jobs may still be possible; request a quote or call (812) 610-1657 to confirm coverage.",
          };
        },
      },
      options,
    );

    void modelContext.registerTool(
      {
        name: "get_junk_removal_pricing_guide",
        description:
          "Return Uncle Sam Junk Removal's public planning-price ranges. These are estimates only; final onsite pricing depends on volume, item type, weight, access, disposal needs, and project scope.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          untrustedContentHint: false,
        },
        execute: async () => ({
          pricing: PRICING_GUIDE,
          includes: [
            "Labor and heavy lifting",
            "Loading and transportation",
            "Standard disposal fees",
            "Basic sweep-up",
          ],
          disclaimer:
            "Planning ranges only. The customer approves the final price before work begins.",
        }),
      },
      options,
    );

    void modelContext.registerTool(
      {
        name: "request_junk_removal_quote",
        description:
          "Submit a free, no-obligation junk removal or cleanout quote request to Uncle Sam Junk Removal. Use only after the user has explicitly asked to submit their information and consented to being contacted about the request.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            phone: { type: "string", minLength: 7, maxLength: 40 },
            email: { type: "string", format: "email", maxLength: 254 },
            address: {
              type: "string",
              minLength: 2,
              maxLength: 160,
              description: "Pickup city, ZIP, or address.",
            },
            service: {
              type: "string",
              enum: [...SERVICES, "Something else"],
            },
            urgency: {
              type: "string",
              enum: ["today", "within-2-3-days", "choose-date", "flexible"],
            },
            preferredDate: {
              type: "string",
              format: "date",
              description: "Required when urgency is choose-date.",
            },
            quantity: {
              type: "string",
              maxLength: 120,
              description: "Approximate quantity, load size, or short scope description.",
            },
            placement: {
              type: "string",
              enum: ["indoor", "outdoor", "both", "unsure"],
            },
            access: {
              type: "array",
              maxItems: 8,
              items: {
                type: "string",
                enum: [
                  "Stairs",
                  "Elevator",
                  "Long carry",
                  "Narrow doorway",
                  "Limited truck access",
                ],
              },
            },
            heavyMaterials: { type: "boolean" },
            dismantling: { type: "boolean" },
            heavyDetails: { type: "string", maxLength: 500 },
            preferredContact: {
              type: "string",
              enum: ["call", "text", "email"],
            },
            notes: { type: "string", maxLength: 2000 },
            consent: {
              type: "boolean",
              const: true,
              description:
                "Must be true only after the user explicitly agrees Uncle Sam Junk Removal may call, text, or email them about this service request.",
            },
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
            "preferredContact",
            "consent",
          ],
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: false,
          untrustedContentHint: true,
        },
        execute: async (
          input: {
            name: string;
            phone: string;
            email: string;
            address: string;
            service: string;
            urgency: string;
            preferredDate?: string;
            quantity: string;
            placement: string;
            access?: string[];
            heavyMaterials?: boolean;
            dismantling?: boolean;
            heavyDetails?: string;
            preferredContact: string;
            notes?: string;
            consent: true;
          },
          { signal }: { signal: AbortSignal },
        ) => {
          if (input.urgency === "choose-date" && !input.preferredDate) {
            throw new Error("preferredDate is required when urgency is choose-date.");
          }

          const response = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...input,
              access: input.access ?? [],
              heavyMaterials: input.heavyMaterials ?? false,
              dismantling: input.dismantling ?? false,
              heavyDetails: input.heavyDetails ?? "",
              notes: input.notes ?? "",
              company: "",
              conditionalDetails: {},
              submissionId: crypto.randomUUID(),
              source: "webmcp",
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
              "The quote request was submitted to Uncle Sam Junk Removal. The team will follow up using the customer's preferred contact method.",
          };
        },
      },
      options,
    );

    return () => controller.abort();
  }, []);

  return null;
}
