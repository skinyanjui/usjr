"use client";

import { useEffect } from "react";
import { locations, services } from "../site-data";
import { WEBMCP_QUOTE_DRAFT_EVENT } from "./webmcp-tools";

type ToolExecuteOptions = { signal: AbortSignal };
type WebMcpTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
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

const BUSINESS_TIME_ZONE = "America/Chicago";

const LOCATION_ALIASES: Record<string, string[]> = {
  "mount-carmel-il": ["mt carmel"],
  "mount-vernon-in": ["mt vernon"],
};

// Operational hints only. Keep in sync with the core service-area tool until
// these are moved into a shared routing data source.
const ZIP_HINTS: Record<string, string[]> = {
  "evansville-in": [
    "47708",
    "47710",
    "47711",
    "47712",
    "47713",
    "47714",
    "47715",
    "47716",
    "47720",
    "47725",
  ],
  "newburgh-in": ["47629", "47630"],
  "henderson-ky": ["42419", "42420"],
  "owensboro-ky": ["42301", "42303"],
  "boonville-in": ["47601"],
  "princeton-in": ["47670"],
  "mount-carmel-il": ["62863"],
  "mount-vernon-in": ["47620"],
  "new-harmony-in": ["47631"],
};

const LOAD_LABELS: Record<string, string> = {
  single_item: "Single item",
  quarter_load: "¼ trailer load",
  half_load: "½ trailer load",
  three_quarter_load: "¾ trailer load",
  full_load: "Full trailer load",
  unsure: "Not sure",
};

function getModelContext(): ModelContext | undefined {
  return (document as Document & { modelContext?: ModelContext }).modelContext;
}

const norm = (value: unknown) =>
  String(value || "")
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function asString(input: Record<string, unknown>, key: string, max = 500) {
  const value = input[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function matchLocation(input: unknown) {
  const query = norm(input);
  if (!query) return null;

  const zip = query.match(/\b(\d{5})\b/)?.[1];
  if (zip) {
    const byZip = locations.find((location) =>
      (ZIP_HINTS[location.slug] || []).includes(zip),
    );
    if (byZip) return byZip;
  }

  return (
    locations.find((location) => query.includes(norm(location.city))) ||
    locations.find((location) =>
      (LOCATION_ALIASES[location.slug] || []).some((alias) =>
        query.includes(norm(alias)),
      ),
    ) ||
    null
  );
}

function matchService(input: unknown) {
  const query = norm(input);
  if (!query) return null;
  return (
    services.find((service) => service.slug === query) ||
    services.find((service) => norm(service.name) === query) ||
    services.find(
      (service) =>
        norm(service.name).includes(query) || query.includes(norm(service.name)),
    ) ||
    null
  );
}

function businessDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function isValidCalendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function validateRequestedDate(value: string) {
  if (!isValidCalendarDate(value)) {
    return { valid: false, error: "invalid_requested_date" as const };
  }
  if (value < businessDateString()) {
    return { valid: false, error: "requested_date_in_past" as const };
  }
  return { valid: true as const };
}

function resourcePlan(
  loadSize: string,
  serviceSlug: string,
  heavy: boolean,
  dismantling: boolean,
) {
  let crewMin = 2;
  let crewMax = 2;
  const trailers = 1;
  const reasons: string[] = [];

  if (["three_quarter_load", "full_load"].includes(loadSize)) {
    crewMax = 3;
    reasons.push("larger load size");
  }
  if (["shed-removal", "hot-tub-removal", "light-demolition"].includes(serviceSlug)) {
    crewMax = Math.max(crewMax, 3);
    reasons.push("dismantling / demolition scope");
  }
  if (heavy) {
    crewMax = Math.max(crewMax, 3);
    reasons.push("heavy materials disclosed");
  }
  if (dismantling) {
    crewMax = Math.max(crewMax, 3);
    reasons.push("dismantling disclosed");
  }
  if (loadSize === "full_load" && (heavy || dismantling)) {
    reasons.push(
      "final trailer capacity must be confirmed from photos or onsite scope",
    );
  }

  return {
    crew: crewMin === crewMax ? String(crewMin) : `${crewMin}–${crewMax}`,
    trailers,
    status: "planning_recommendation",
    reasons,
    disclaimer:
      "This is a planning recommendation, not a dispatch assignment. The team confirms crew size, equipment, and trailer capacity before the job.",
  };
}

function requestableDates(count = 5) {
  const today = businessDateString();
  const [year, month, day] = today.split("-").map(Number);
  const cursor = new Date(Date.UTC(year, month - 1, day, 12));
  const dates: Array<{ date: string; status: string }> = [];

  for (let index = 0; index < count; index += 1) {
    const date = new Date(cursor);
    date.setUTCDate(cursor.getUTCDate() + index);
    dates.push({
      date: date.toISOString().slice(0, 10),
      status: "requestable_not_confirmed",
    });
  }
  return dates;
}

function makeTools(): WebMcpTool[] {
  return [
    {
      name: "planPickupRoute",
      title: "Plan pickup route",
      description:
        "Classify a pickup against Uncle Sam Junk Removal's listed route communities and return a crew/trailer planning recommendation. Travel charges are never invented; any surcharge remains pending human review unless an operational pricing rule is later connected.",
      inputSchema: {
        type: "object",
        properties: {
          location: { type: "string", minLength: 2, maxLength: 160 },
          service: { type: "string", minLength: 2, maxLength: 120 },
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
          heavyMaterials: { type: "boolean" },
          dismantling: { type: "boolean" },
        },
        required: ["location", "service", "loadSize"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const location = matchLocation(asString(input, "location", 160));
        const service = matchService(asString(input, "service", 120));
        if (!service) {
          return {
            status: "needs_service_resolution",
            message: "Resolve the service with listServices before routing this job.",
          };
        }
        const resources = resourcePlan(
          asString(input, "loadSize", 40),
          service.slug,
          input.heavyMaterials === true,
          input.dismantling === true,
        );
        if (!location) {
          return {
            routeStatus: "unknown",
            routeZone: null,
            travelCharge: { status: "manual_review", amount: null },
            resources,
            message:
              "The pickup is outside the currently listed communities or could not be resolved. Keep the lead and have the team confirm routing and any travel charge.",
          };
        }
        return {
          routeStatus: "listed_route_community",
          routeZone: location.slug,
          community: location.name,
          county: location.county,
          travelCharge: {
            status: "manual_review",
            amount: null,
            message:
              "No automatic travel surcharge is published in the site data. Confirm any route charge before quoting it.",
          },
          resources,
        };
      },
    },
    {
      name: "getPickupRequestWindows",
      title: "Get pickup request windows",
      description:
        "Return the next dates a customer can request for pickup. These are requestable dates, not live calendar availability, and are not confirmed until the team accepts the booking request.",
      inputSchema: {
        type: "object",
        properties: {
          count: { type: "integer", minimum: 1, maximum: 10 },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const requested = Number(input.count);
        const count = Number.isFinite(requested)
          ? Math.min(10, Math.max(1, Math.trunc(requested)))
          : 5;
        return {
          availabilitySource: "customer_request_only",
          liveCapacityConnected: false,
          businessTimeZone: BUSINESS_TIME_ZONE,
          windows: requestableDates(count),
          disclaimer:
            "These dates can be requested but are not guaranteed. Uncle Sam Junk Removal must confirm the route, crew, equipment, and actual appointment window.",
        };
      },
    },
    {
      name: "estimateJobResources",
      title: "Estimate job resources",
      description:
        "Estimate the crew and trailer planning requirement from service type, load size, heavy materials, and dismantling needs. This is a planning recommendation only.",
      inputSchema: {
        type: "object",
        properties: {
          service: { type: "string", minLength: 2, maxLength: 120 },
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
          heavyMaterials: { type: "boolean" },
          dismantling: { type: "boolean" },
        },
        required: ["service", "loadSize"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: async (input) => {
        const service = matchService(asString(input, "service", 120));
        if (!service) return { status: "unknown_service" };
        return {
          service: service.name,
          loadSize: LOAD_LABELS[asString(input, "loadSize", 40)] || "Not sure",
          ...resourcePlan(
            asString(input, "loadSize", 40),
            service.slug,
            input.heavyMaterials === true,
            input.dismantling === true,
          ),
        };
      },
    },
    {
      name: "prepareBookingRequest",
      title: "Prepare booking request",
      description:
        "Prepare a requested pickup date on the visible quote form after explicit human approval. This does not reserve a slot, check consent, submit the form, or confirm a booking. The customer must review and submit; the team must then confirm the appointment.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", maxLength: 100 },
          phone: { type: "string", maxLength: 40 },
          email: { type: "string", maxLength: 254 },
          location: { type: "string", minLength: 2, maxLength: 160 },
          service: { type: "string", minLength: 2, maxLength: 120 },
          requestedDate: { type: "string", format: "date" },
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
          heavyMaterials: { type: "boolean" },
          dismantling: { type: "boolean" },
          notes: { type: "string", maxLength: 1500 },
        },
        required: ["location", "service", "requestedDate", "loadSize"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async (input, { signal }) => {
        if (signal.aborted) throw signal.reason;
        const service = matchService(asString(input, "service", 120));
        if (!service) {
          return {
            prepared: false,
            error: "unknown_service",
            message: "Resolve the service with listServices first.",
          };
        }

        const requestedDate = asString(input, "requestedDate", 20);
        const dateValidation = validateRequestedDate(requestedDate);
        if (!dateValidation.valid) {
          return {
            prepared: false,
            error: dateValidation.error,
            businessDate: businessDateString(),
            businessTimeZone: BUSINESS_TIME_ZONE,
          };
        }

        const location = matchLocation(asString(input, "location", 160));
        const resources = resourcePlan(
          asString(input, "loadSize", 40),
          service.slug,
          input.heavyMaterials === true,
          input.dismantling === true,
        );
        const approved = window.confirm(
          `Apply a ${requestedDate} ${service.name} booking request to the quote form for your review? This will not reserve or submit anything.`,
        );
        if (!approved) {
          return {
            prepared: false,
            reason: "human_declined",
            submitted: false,
            bookingConfirmed: false,
          };
        }
        const routingNote = location
          ? `Route: ${location.name} (${location.slug}). Travel charge, if any, requires team confirmation.`
          : "Route: outside/unresolved listed communities; team must confirm coverage and any travel charge.";
        const planningNote = `Planning resources: ${resources.crew} crew, ${resources.trailers} trailer. Team confirmation required.`;
        const userNotes = asString(input, "notes", 1500);
        const detail = {
          name: asString(input, "name", 100),
          phone: asString(input, "phone", 40),
          email: asString(input, "email", 254),
          address: asString(input, "location", 160),
          service: service.quoteValue,
          urgency: "choose-date",
          preferredDate: requestedDate,
          quantity: LOAD_LABELS[asString(input, "loadSize", 40)] || "Not sure",
          notes: [
            `Requested pickup date: ${requestedDate}.`,
            routingNote,
            planningNote,
            userNotes,
          ]
            .filter(Boolean)
            .join("\n"),
        };
        window.dispatchEvent(
          new CustomEvent(WEBMCP_QUOTE_DRAFT_EVENT, { detail }),
        );
        document
          .getElementById("quote")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return {
          prepared: true,
          requestedDate,
          bookingConfirmed: false,
          submitted: false,
          consentChecked: false,
          routeStatus: location ? "listed_route_community" : "unknown",
          travelChargeStatus: "manual_review",
          resources,
          message:
            "The booking request is prepared for customer review. The customer must personally consent and submit the form, and the team must confirm the actual appointment before it is a booking.",
        };
      },
    },
  ];
}

export function WebMcpRoutingTools() {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext || !window.isSecureContext || window.top !== window.self) {
      return;
    }
    const controller = new AbortController();
    for (const tool of makeTools()) {
      void modelContext.registerTool(tool, { signal: controller.signal }).catch(
        (error) => {
          console.warn(`[webmcp] could not register ${tool.name}`, error);
        },
      );
    }
    return () => controller.abort();
  }, []);

  return null;
}
