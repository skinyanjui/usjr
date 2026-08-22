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
  return value.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
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
        annotations: { readOnlyHint: true, untrustedContentHint: false },
        execute: async () => ({
          business: "Uncle Sam Junk Removal",
          services: SERVICES,
          nextStep:
            "Use find_best_junk_removal_service when the customer describes items, check_junk_removal_service_area for coverage, and prepare_junk_removal_quote before any submission.",
        }),
      },
      options,
    );

    void modelContext.registerTool(
      {
        name: "check_junk_removal_service_area",
        description:
          "Check whether Uncle Sam Junk Removal publicly lists a city as a standard service area. For nearby unlisted locations, return that the customer should request a quote or call to confirm coverage.",
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
        annotations: { readOnlyHint: true, untrustedContentHint: false },
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
              "This location is not one of the publicly listed standard service areas. Nearby jobs may still be possible; prepare a quote request or call (812) 610-1657 to confirm coverage.",
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
        annotations: { readOnlyHint: true, untrustedContentHint: false },
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
          nextStep:
            "Use prepare_junk_removal_quote to assemble a reviewable request. Submission requires a separate explicit approval step.",
        }),
      },
      options,
    );

    return () => controller.abort();
  }, []);

  return null;
}
