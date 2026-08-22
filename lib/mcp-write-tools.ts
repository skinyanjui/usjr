import {
  BUSINESS,
  classifyHaulingItem,
  contactBlock,
  matchAgentArea,
  matchAgentService,
  normalizeAgentText,
  services,
} from "../app/agent-catalog";
import { handleCompatibleMcpPost } from "./mcp-request-compat";
import {
  getMcpClientInfo,
  logMcpEvent,
  newMcpTraceId,
} from "./mcp-telemetry";
import {
  handleQuoteRequest,
  type QuoteEnvironment,
} from "./quote-server";
import {
  businessDateString,
  isIsoDate,
  isPastBusinessDate,
} from "./quote-date";

const LATEST_PROTOCOL = "2026-07-28";
const SUPPORTED_PROTOCOLS = [
  LATEST_PROTOCOL,
  "2025-11-25",
  "2025-06-18",
  "2025-03-26",
] as const;
const SERVER_INFO_META_KEY = "io.modelcontextprotocol/serverInfo";
const PROTOCOL_META_KEY = "io.modelcontextprotocol/protocolVersion";
const SERVER_INFO = {
  name: "uncle-sam-junk-removal",
  title: BUSINESS.name,
  version: "1.2.0",
};
const SERVER_INSTRUCTIONS =
  "Public information tools plus guarded quote-request preparation and submission for Uncle Sam Junk Removal in the Evansville Tri-State. " +
  "Planning prices are not binding quotes. Unlisted locations return unknown, not unavailable. " +
  "Use prepareQuoteRequest first, show the normalized request to the customer, and call submitQuoteRequest only after the customer explicitly confirms the same request and consents to being contacted. " +
  "Never fabricate confirmation or contact consent. getQuoteLink remains a non-submitting customer-review link.";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Mcp-Session-Id, Authorization, Traceparent, Tracestate, Baggage",
  "Access-Control-Max-Age": "86400",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
} as const;

type RpcId = string | number | null;
type ToolArguments = Record<string, unknown>;
type McpBody = Record<string, any>;

type ToolContext = {
  clientFamily: string;
  clientName: string;
  clientVersion: string;
  conversionId: string;
  request: Request;
};

type ToolDescriptor = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: {
    readOnlyHint: boolean;
    destructiveHint: boolean;
    idempotentHint: boolean;
    openWorldHint: boolean;
  };
};

type NormalizedQuote = {
  name: string;
  phone: string;
  email: string;
  address: string;
  items: string[];
  service: string;
  urgency: string;
  preferredDate: string;
  loadSize: string;
  quantity: string;
  placement: string;
  access: string[];
  heavyMaterials: boolean;
  dismantling: boolean;
  heavyDetails: string;
  preferredContact: string;
  notes: string;
};

type QuoteWarning = {
  verdict: string;
  category: string;
  guidance: string;
  item: string;
};

const TIMING_VALUES = new Set([
  "today",
  "within-2-3-days",
  "choose-date",
  "flexible",
]);
const LOAD_VALUES = new Set([
  "single_item",
  "quarter_load",
  "half_load",
  "three_quarter_load",
  "full_load",
  "unsure",
]);
const PLACEMENT_VALUES = new Set(["indoor", "outdoor", "both", "unsure"]);
const CONTACT_VALUES = new Set(["call", "text", "email"]);

const LOAD_LABELS: Record<string, string> = {
  single_item: "Single item / a few items",
  quarter_load: "About 1/4 trailer load",
  half_load: "About 1/2 trailer load",
  three_quarter_load: "About 3/4 trailer load",
  full_load: "About a full trailer load",
  unsure: "Not sure yet",
};

const ACCESS_LABELS: Record<string, string> = {
  stairs: "Stairs",
  elevator: "Elevator",
  long_carry: "Long carry",
  narrow_doorway: "Narrow doorway",
  limited_truck_access: "Limited truck access",
};

const COMMON_QUOTE_PROPERTIES = {
  name: {
    type: "string",
    minLength: 2,
    maxLength: 100,
    description: "Customer name.",
  },
  phone: {
    type: "string",
    minLength: 7,
    maxLength: 40,
    description: "Customer phone number.",
  },
  email: {
    type: "string",
    minLength: 5,
    maxLength: 254,
    description: "Customer email address.",
  },
  address: {
    type: "string",
    minLength: 2,
    maxLength: 160,
    description:
      "Pickup street address or sufficiently specific city/ZIP location. Include city, state, and ZIP when available.",
  },
  items: {
    type: "array",
    minItems: 1,
    maxItems: 20,
    items: { type: "string", minLength: 1, maxLength: 160 },
    description: "Items or materials the customer wants removed.",
  },
  service: {
    type: "string",
    maxLength: 100,
    description:
      "Optional service name or plain-language service description. The server will normalize it to a listed service.",
  },
  timing: {
    type: "string",
    enum: ["today", "within-2-3-days", "choose-date", "flexible"],
  },
  preferredDate: {
    type: "string",
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    description:
      "Required when timing is choose-date. Must be today or a future date in the business timezone.",
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
  placement: {
    type: "string",
    enum: ["indoor", "outdoor", "both", "unsure"],
  },
  access: {
    type: "array",
    maxItems: 8,
    items: {
      type: "string",
      maxLength: 80,
      description:
        "Examples: stairs, elevator, long_carry, narrow_doorway, limited_truck_access, or another short access note.",
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
} as const;

const COMMON_REQUIRED = [
  "name",
  "phone",
  "email",
  "address",
  "items",
  "timing",
  "loadSize",
  "placement",
  "preferredContact",
] as const;

const WRITE_TOOL_DESCRIPTORS: ToolDescriptor[] = [
  {
    name: "prepareQuoteRequest",
    title: "Prepare a junk removal quote request",
    description:
      "Validate and normalize a customer's quote request without sending it. Returns service-area status, special-handling warnings, a customer-review summary, and a confirmationId that binds the reviewed payload. Call this before submitQuoteRequest.",
    inputSchema: {
      type: "object",
      properties: COMMON_QUOTE_PROPERTIES,
      required: [...COMMON_REQUIRED],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "submitQuoteRequest",
    title: "Submit a confirmed junk removal quote request",
    description:
      "Create a real Uncle Sam Junk Removal quote lead and send the business/customer confirmation emails. Call only after prepareQuoteRequest and only when the customer explicitly confirms the same request and consents to contact. Requires the matching confirmationId; never invent confirmation or consent.",
    inputSchema: {
      type: "object",
      properties: {
        ...COMMON_QUOTE_PROPERTIES,
        confirmationId: {
          type: "string",
          minLength: 12,
          maxLength: 80,
          description:
            "Exact confirmationId returned by prepareQuoteRequest for this same payload.",
        },
        confirmedByCustomer: {
          type: "boolean",
          description:
            "Must be true only after the customer explicitly asks to submit the reviewed request.",
        },
        consentToContact: {
          type: "boolean",
          description:
            "Must be true only after the customer explicitly consents to being contacted about this quote request.",
        },
      },
      required: [
        ...COMMON_REQUIRED,
        "confirmationId",
        "confirmedByCustomer",
        "consentToContact",
      ],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
];

function asString(input: ToolArguments, key: string, max = 500) {
  const value = input[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function asBoolean(input: ToolArguments, key: string) {
  return input[key] === true;
}

function asStringArray(input: ToolArguments, key: string, maxItems: number) {
  const value = input[key];
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim().slice(0, 160))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeTiming(value: string) {
  if (value === "2-3 days" || value === "within 2-3 days") {
    return "within-2-3-days";
  }
  return value;
}

function normalizeService(input: ToolArguments, items: string[]) {
  const requested = asString(input, "service", 100);
  if (requested) {
    const exact = services.find(
      (service) =>
        normalizeAgentText(service.name) === normalizeAgentText(requested) ||
        service.slug === requested,
    );
    if (exact) return exact.name;
  }

  const matched = matchAgentService(`${requested} ${items.join(" ")}`.trim());
  return matched?.name || "Junk Removal";
}

function normalizeAccess(input: ToolArguments) {
  return asStringArray(input, "access", 8).map(
    (entry) => ACCESS_LABELS[entry] || entry.replaceAll("_", " "),
  );
}

function normalizeQuote(input: ToolArguments): NormalizedQuote {
  const items = asStringArray(input, "items", 20);
  const urgency = normalizeTiming(asString(input, "timing", 40));
  const loadSize = asString(input, "loadSize", 40);
  return {
    name: asString(input, "name", 100),
    phone: asString(input, "phone", 40),
    email: asString(input, "email", 254).toLowerCase(),
    address: asString(input, "address", 160),
    items,
    service: normalizeService(input, items),
    urgency,
    preferredDate: asString(input, "preferredDate", 20),
    loadSize,
    quantity: LOAD_LABELS[loadSize] || "Not sure yet",
    placement: asString(input, "placement", 40),
    access: normalizeAccess(input),
    heavyMaterials: asBoolean(input, "heavyMaterials"),
    dismantling: asBoolean(input, "dismantling"),
    heavyDetails: asString(input, "heavyDetails", 500),
    preferredContact: asString(input, "preferredContact", 20),
    notes: asString(input, "notes", 2000),
  };
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function quoteErrors(data: NormalizedQuote) {
  const errors: Array<{ field: string; code: string; message: string }> = [];
  const phoneDigits = data.phone.replace(/\D/g, "");

  if (data.name.length < 2) {
    errors.push({ field: "name", code: "invalid_name", message: "A customer name is required." });
  }
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.push({ field: "phone", code: "invalid_phone", message: "Enter a valid customer phone number." });
  }
  if (!validEmail(data.email)) {
    errors.push({ field: "email", code: "invalid_email", message: "Enter a valid customer email address." });
  }
  if (data.address.length < 2) {
    errors.push({ field: "address", code: "missing_address", message: "A pickup location is required." });
  }
  if (data.items.length === 0) {
    errors.push({ field: "items", code: "missing_items", message: "Describe at least one item or material to remove." });
  }
  if (!TIMING_VALUES.has(data.urgency)) {
    errors.push({ field: "timing", code: "invalid_timing", message: "Choose a supported timing option." });
  }
  if (!LOAD_VALUES.has(data.loadSize)) {
    errors.push({ field: "loadSize", code: "invalid_load_size", message: "Choose a supported load size." });
  }
  if (!PLACEMENT_VALUES.has(data.placement)) {
    errors.push({ field: "placement", code: "invalid_placement", message: "Choose indoor, outdoor, both, or unsure." });
  }
  if (!CONTACT_VALUES.has(data.preferredContact)) {
    errors.push({ field: "preferredContact", code: "invalid_contact_method", message: "Choose call, text, or email." });
  }

  if (data.urgency === "choose-date") {
    if (!isIsoDate(data.preferredDate)) {
      errors.push({
        field: "preferredDate",
        code: "invalid_date",
        message: "Choose a valid preferred pickup date.",
      });
    } else if (isPastBusinessDate(data.preferredDate)) {
      errors.push({
        field: "preferredDate",
        code: "past_date",
        message: `Preferred pickup date cannot be before ${businessDateString()}.`,
      });
    }
  }

  return errors;
}

function specialHandling(items: string[]) {
  const seen = new Set<string>();
  const warnings: QuoteWarning[] = [];

  for (const item of items) {
    const rule = classifyHaulingItem(item);
    if (!rule) continue;
    const key = `${rule.verdict}:${rule.category}`;
    if (seen.has(key)) continue;
    seen.add(key);
    warnings.push({
      item,
      verdict: rule.verdict,
      category: rule.category,
      guidance: rule.guidance,
    });
  }

  return warnings;
}

function canonicalQuote(data: NormalizedQuote) {
  return JSON.stringify({
    name: data.name,
    phone: data.phone.replace(/\D/g, ""),
    email: data.email,
    address: data.address,
    items: data.items,
    service: data.service,
    urgency: data.urgency,
    preferredDate: data.preferredDate,
    loadSize: data.loadSize,
    placement: data.placement,
    access: data.access,
    heavyMaterials: data.heavyMaterials,
    dismantling: data.dismantling,
    heavyDetails: data.heavyDetails,
    preferredContact: data.preferredContact,
    notes: data.notes,
  });
}

async function confirmationId(data: NormalizedQuote) {
  const digest = new Uint8Array(
    await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(canonicalQuote(data)),
    ),
  );
  const hex = [...digest]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `qcf_${hex.slice(0, 32)}`;
}

async function prepareQuote(input: ToolArguments) {
  const data = normalizeQuote(input);
  const validationErrors = quoteErrors(data);
  const warnings = specialHandling(data.items);
  const blockedItems = warnings.filter((warning) => warning.verdict === "not_accepted");
  const area = matchAgentArea(data.address);
  const readyToSubmit = validationErrors.length === 0 && blockedItems.length === 0;
  const id = readyToSubmit ? await confirmationId(data) : null;

  return {
    ok: readyToSubmit,
    readyToSubmit,
    submitted: false,
    confirmationId: id,
    validationErrors,
    serviceArea: area
      ? {
          status: "covered",
          community: area.name,
          county: area.county,
          routeZone: area.slug,
        }
      : {
          status: "unknown",
          message:
            "This location is not one of the currently listed communities. Nearby jobs may still be possible; the request can be submitted for coverage confirmation.",
        },
    specialHandling: warnings,
    blockedItems,
    request: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      pickupLocation: data.address,
      service: data.service,
      items: data.items,
      timing:
        data.urgency === "choose-date"
          ? { option: data.urgency, preferredDate: data.preferredDate }
          : { option: data.urgency },
      loadSize: data.loadSize,
      quantity: data.quantity,
      placement: data.placement,
      access: data.access,
      heavyMaterials: data.heavyMaterials,
      dismantling: data.dismantling,
      heavyDetails: data.heavyDetails || null,
      preferredContact: data.preferredContact,
      notes: data.notes || null,
    },
    confirmationRequired: readyToSubmit
      ? "Show this normalized request to the customer. submitQuoteRequest may be called only after the customer explicitly confirms these same details and consents to contact."
      : blockedItems.length > 0
        ? "One or more items are outside normal hauling scope. Do not submit this as an ordinary quote request; follow the returned hauling guidance."
        : "Correct the validation errors and prepare the request again.",
    contact: contactBlock(),
  };
}

function quoteEnvironment(): QuoteEnvironment {
  return {
    QUOTE_TO_EMAIL: process.env.QUOTE_TO_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    RESEND_INBOUND_EMAIL: process.env.RESEND_INBOUND_EMAIL,
    RESEND_WEBHOOK_SECRET: process.env.RESEND_WEBHOOK_SECRET,
  };
}

function forwardedHeaders(request: Request) {
  const headers = new Headers({ "Content-Type": "application/json" });
  for (const name of ["cf-connecting-ip", "x-forwarded-for", "x-real-ip"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

async function submitQuote(input: ToolArguments, context: ToolContext) {
  const prepared = await prepareQuote(input);
  if (!prepared.readyToSubmit || !prepared.confirmationId) {
    return {
      ...prepared,
      ok: false,
      submitted: false,
      code: "not_ready",
    };
  }

  const suppliedConfirmationId = asString(input, "confirmationId", 80);
  if (!suppliedConfirmationId || suppliedConfirmationId !== prepared.confirmationId) {
    return {
      ok: false,
      submitted: false,
      code: "confirmation_mismatch",
      message:
        "The confirmationId does not match the current request. Prepare the request again and show the updated details to the customer before submitting.",
      expectedConfirmationId: prepared.confirmationId,
    };
  }

  if (!asBoolean(input, "confirmedByCustomer")) {
    return {
      ok: false,
      submitted: false,
      code: "customer_confirmation_required",
      message:
        "The customer must explicitly confirm the reviewed request before it can be submitted.",
    };
  }

  if (!asBoolean(input, "consentToContact")) {
    return {
      ok: false,
      submitted: false,
      code: "contact_consent_required",
      message:
        "The customer must explicitly consent to being contacted about this quote request before it can be submitted.",
    };
  }

  const data = normalizeQuote(input);
  const itemNotes = `Items: ${data.items.join("; ")}`;
  const notes = [itemNotes, data.notes].filter(Boolean).join("\n\n");
  const request = new Request(`${BUSINESS.site}/api/quote`, {
    method: "POST",
    headers: forwardedHeaders(context.request),
    body: JSON.stringify({
      submissionId: `mcp-${prepared.confirmationId}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      service: data.service,
      urgency: data.urgency,
      preferredDate: data.preferredDate,
      quantity: data.quantity,
      placement: data.placement,
      access: data.access,
      heavyMaterials: data.heavyMaterials,
      dismantling: data.dismantling,
      heavyDetails: data.heavyDetails,
      preferredContact: data.preferredContact,
      conditionalDetails: {},
      notes,
      consent: true,
      company: "",
      source: `mcp-${context.clientFamily}`,
      startedAt: Date.now() - 2_000,
    }),
  });

  const response = await handleQuoteRequest(request, quoteEnvironment());
  const payload = (await response.json().catch(() => ({}))) as Record<string, any>;

  if (!response.ok || payload.ok !== true || !payload.reference) {
    return {
      ok: false,
      submitted: false,
      code: "quote_delivery_failed",
      message:
        typeof payload.error === "string"
          ? payload.error
          : "The quote request could not be delivered online. Please call or text Uncle Sam Junk Removal.",
      status: response.status,
      contact: contactBlock(),
    };
  }

  return {
    ok: true,
    submitted: true,
    reference: payload.reference,
    confirmationSent: payload.confirmationSent === true,
    confirmationId: prepared.confirmationId,
    serviceArea: prepared.serviceArea,
    specialHandling: prepared.specialHandling,
    message:
      "Quote request received. The team will review the job details and follow up using the customer's preferred contact method. Final onsite pricing is approved before work begins.",
    photos:
      "Photos are not uploaded through the remote MCP tool yet. The customer can reply to the confirmation email with photos or use the website quote flow.",
  };
}

function responseJson(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
  });
}

function rpcError(
  id: RpcId,
  code: number,
  message: string,
  data?: unknown,
) {
  return responseJson(
    {
      jsonrpc: "2.0",
      id,
      error: { code, message, ...(data === undefined ? {} : { data }) },
    },
    400,
  );
}

function rpcOk(
  id: RpcId,
  result: Record<string, unknown>,
  modern: boolean,
) {
  const modernResult = modern
    ? {
        resultType: "complete",
        ...result,
        _meta: {
          ...(result._meta && typeof result._meta === "object"
            ? (result._meta as Record<string, unknown>)
            : {}),
          [SERVER_INFO_META_KEY]: SERVER_INFO,
        },
      }
    : result;
  return responseJson({ jsonrpc: "2.0", id, result: modernResult });
}

function protocolMeta(body: McpBody) {
  const meta = body.params?._meta;
  return meta && typeof meta === "object" && !Array.isArray(meta)
    ? (meta as Record<string, unknown>)
    : {};
}

function validateWriteCall(request: Request, body: McpBody, toolName: string) {
  const id: RpcId = body.id ?? null;
  const meta = protocolMeta(body);
  const headerVersion = request.headers.get("mcp-protocol-version") || "";
  const metaVersion =
    typeof meta[PROTOCOL_META_KEY] === "string"
      ? String(meta[PROTOCOL_META_KEY])
      : "";
  const requestedVersion = headerVersion || metaVersion;

  if (headerVersion && metaVersion && headerVersion !== metaVersion) {
    return rpcError(
      id,
      -32020,
      "Header mismatch: MCP-Protocol-Version does not match request metadata",
      { headerVersion, metadataVersion: metaVersion },
    );
  }

  if (
    requestedVersion &&
    !SUPPORTED_PROTOCOLS.includes(
      requestedVersion as (typeof SUPPORTED_PROTOCOLS)[number],
    )
  ) {
    return rpcError(
      id,
      -32022,
      `Unsupported protocol version: ${requestedVersion}`,
      { requested: requestedVersion, supported: SUPPORTED_PROTOCOLS },
    );
  }

  if (requestedVersion === LATEST_PROTOCOL) {
    const headerMethod = request.headers.get("mcp-method");
    const headerName = request.headers.get("mcp-name");
    if (headerMethod !== "tools/call") {
      return rpcError(
        id,
        -32020,
        "Header mismatch: Mcp-Method must match tools/call",
      );
    }
    if (headerName !== toolName) {
      return rpcError(
        id,
        -32020,
        "Header mismatch: Mcp-Name must match the called tool",
      );
    }
  }

  return null;
}

function isModernRequest(request: Request, body: McpBody) {
  const meta = protocolMeta(body);
  return (
    request.headers.get("mcp-protocol-version") === LATEST_PROTOCOL ||
    meta[PROTOCOL_META_KEY] === LATEST_PROTOCOL
  );
}

async function handleWriteCall(request: Request, body: McpBody) {
  const id: RpcId = body.id ?? null;
  const name = body.params?.name;
  if (typeof name !== "string") {
    return rpcError(id, -32602, "Invalid params: missing tool name");
  }

  const validationResponse = validateWriteCall(request, body, name);
  if (validationResponse) return validationResponse;

  const client = getMcpClientInfo(request, body);
  const conversionId = newMcpTraceId();
  const context: ToolContext = {
    clientFamily: client.family,
    clientName: client.name,
    clientVersion: client.version,
    conversionId,
    request,
  };
  const args =
    body.params?.arguments && typeof body.params.arguments === "object"
      ? (body.params.arguments as ToolArguments)
      : {};
  const startedAt = Date.now();

  try {
    const result =
      name === "prepareQuoteRequest"
        ? await prepareQuote(args)
        : await submitQuote(args, context);
    const isError = result.ok !== true;

    logMcpEvent("request", {
      clientFamily: client.family,
      clientName: client.name,
      clientVersion: client.version,
      protocolVersion:
        request.headers.get("mcp-protocol-version") || "legacy-or-unspecified",
      method: "tools/call",
      tool: name,
      outcome: isError ? "application_rejected" : "ok",
      durationMs: Math.max(0, Date.now() - startedAt),
    });

    if (name === "prepareQuoteRequest") {
      logMcpEvent("quote_prepared", {
        conversionId,
        clientFamily: client.family,
        readyToSubmit: result.readyToSubmit === true,
      });
    }

    if (name === "submitQuoteRequest" && result.submitted === true) {
      logMcpEvent("quote_converted", {
        conversionId,
        clientFamily: client.family,
        clientName: client.name,
        clientVersion: client.version,
        quoteReference:
          typeof result.reference === "string" ? result.reference : null,
        conversionPath: "mcp_submit_tool",
      });
    }

    return rpcOk(
      id,
      {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
        isError,
      },
      isModernRequest(request, body),
    );
  } catch {
    logMcpEvent("request", {
      clientFamily: client.family,
      clientName: client.name,
      clientVersion: client.version,
      method: "tools/call",
      tool: name,
      outcome: "tool_error",
      durationMs: Math.max(0, Date.now() - startedAt),
    });
    const fallback = {
      ok: false,
      submitted: false,
      code: "tool_execution_failed",
      message: `The quote tool failed. Call or text ${BUSINESS.phoneDisplay}.`,
      contact: contactBlock(),
    };
    return rpcOk(
      id,
      {
        content: [{ type: "text", text: JSON.stringify(fallback, null, 2) }],
        structuredContent: fallback,
        isError: true,
      },
      isModernRequest(request, body),
    );
  }
}

async function rewriteBaseResponse(
  response: Response,
  transform: (payload: Record<string, any>) => Record<string, any>,
) {
  const text = await response.text();
  let payload: Record<string, any>;
  try {
    payload = JSON.parse(text) as Record<string, any>;
  } catch {
    return new Response(text, {
      status: response.status,
      headers: response.headers,
    });
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(JSON.stringify(transform(payload)), {
    status: response.status,
    headers,
  });
}

function appendToolDescriptors(payload: Record<string, any>) {
  if (!Array.isArray(payload.result?.tools)) return payload;
  const existing = new Set(
    payload.result.tools
      .map((tool: Record<string, unknown>) => tool?.name)
      .filter((name: unknown): name is string => typeof name === "string"),
  );
  payload.result.tools = [
    ...payload.result.tools,
    ...WRITE_TOOL_DESCRIPTORS.filter((tool) => !existing.has(tool.name)),
  ];
  if (payload.result?._meta && typeof payload.result._meta === "object") {
    payload.result._meta[SERVER_INFO_META_KEY] = SERVER_INFO;
  }
  return payload;
}

function rewriteInstructions(payload: Record<string, any>) {
  if (payload.result && typeof payload.result === "object") {
    payload.result.instructions = SERVER_INSTRUCTIONS;
    if (payload.result.serverInfo) {
      payload.result.serverInfo = SERVER_INFO;
    }
    if (payload.result._meta && typeof payload.result._meta === "object") {
      payload.result._meta[SERVER_INFO_META_KEY] = SERVER_INFO;
    }
  }
  return payload;
}

export async function handleMcpWithQuoteWrites(request: Request) {
  let body: McpBody;
  try {
    body = (await request.clone().json()) as McpBody;
  } catch {
    return handleCompatibleMcpPost(request);
  }

  if (
    body?.method === "tools/call" &&
    (body.params?.name === "prepareQuoteRequest" ||
      body.params?.name === "submitQuoteRequest")
  ) {
    return handleWriteCall(request, body);
  }

  const base = await handleCompatibleMcpPost(request);
  if (!base.ok) return base;

  if (body?.method === "tools/list") {
    return rewriteBaseResponse(base, appendToolDescriptors);
  }

  if (body?.method === "server/discover" || body?.method === "initialize") {
    return rewriteBaseResponse(base, rewriteInstructions);
  }

  return base;
}

export const MCP_WRITE_TOOL_NAMES = WRITE_TOOL_DESCRIPTORS.map(
  (tool) => tool.name,
);
