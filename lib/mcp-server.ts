import {
  BUSINESS,
  PRICING,
  PRICE_INCLUDES,
  buildAgentQuoteUrl,
  classifyHaulingItem,
  contactBlock,
  locations,
  matchAgentArea,
  matchAgentService,
  normalizeAgentText,
  services,
} from "../app/agent-catalog";
import { formatPriceRange } from "../app/pricing-data";
import {
  mcpCorsHeaders,
  mcpForbiddenOriginResponse,
  rejectDisallowedMcpOrigin,
} from "./mcp-cors";
import {
  getMcpClientInfo,
  logMcpEvent,
  newMcpTraceId,
} from "./mcp-telemetry";

const LATEST_PROTOCOL = "2026-07-28";
const MODERN_PROTOCOLS = [LATEST_PROTOCOL] as const;
const LEGACY_PROTOCOLS = ["2025-11-25", "2025-06-18", "2025-03-26"] as const;
const SUPPORTED_PROTOCOLS = [...MODERN_PROTOCOLS, ...LEGACY_PROTOCOLS] as const;
const TOOL_LIST_TTL_MS = 86_400_000;
const DISCOVER_TTL_MS = 3_600_000;

const SERVER_INFO = {
  name: "uncle-sam-junk-removal",
  title: BUSINESS.name,
  version: "1.1.0",
};

const SERVER_INFO_META_KEY = "io.modelcontextprotocol/serverInfo";
const PROTOCOL_META_KEY = "io.modelcontextprotocol/protocolVersion";

const SERVER_INSTRUCTIONS =
  "Read-only public tools for Uncle Sam Junk Removal in the Evansville Tri-State. " +
  "Planning prices are not binding quotes. Unlisted locations return unknown, not unavailable. " +
  "Check hauling policy before promising unusual materials can be taken. " +
  "getQuoteLink creates only a customer-review link; it never submits, consents, reserves, or books anything.";

type RpcId = string | number | null;
type ToolArguments = Record<string, unknown>;

type ToolContext = {
  clientFamily: string;
  clientName: string;
  clientVersion: string;
  conversionId: string;
};

type ReadTool = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: {
    readOnlyHint: true;
    destructiveHint: false;
    idempotentHint: true;
    openWorldHint: false;
  };
  run: (input: ToolArguments, context: ToolContext) => unknown;
};

function asString(input: ToolArguments, key: string, max = 500) {
  const value = input[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function errorResult(message: string, code?: string) {
  return {
    ok: false,
    ...(code ? { code } : {}),
    message,
    contact: contactBlock(),
  };
}

function attributedQuoteUrl(input: ToolArguments, context: ToolContext) {
  const raw = buildAgentQuoteUrl({
    service: input.service,
    location: input.location,
    loadSize: input.loadSize,
    timing: input.timing,
    notes: input.notes,
  });
  const url = new URL(raw);
  url.searchParams.set("ref", "mcp");
  url.searchParams.set("mcp_source", context.clientFamily);
  url.searchParams.set("mcp_trace", context.conversionId);
  return url.toString();
}

const READ_TOOLS: ReadTool[] = [
  {
    name: "listServices",
    title: "List junk removal services",
    description:
      "List Uncle Sam Junk Removal services and match a plain-language job description to the most relevant service.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          maxLength: 160,
          description:
            "Optional job description or keyword such as couch, inherited house, hot tub, storage unit, or pallet racks.",
        },
        popularOnly: { type: "boolean" },
      },
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    run: (input) => {
      const query = asString(input, "query", 160);
      const popularOnly = input.popularOnly === true;
      let list = popularOnly ? services.filter((service) => service.popular) : services;
      const matched = query ? matchAgentService(query) : null;
      if (matched) {
        list = [matched, ...list.filter((service) => service.slug !== matched.slug)];
      } else if (query) {
        const normalized = normalizeAgentText(query);
        const hits = list.filter((service) =>
          normalizeAgentText(
            `${service.name} ${service.summary} ${service.includes.join(" ")} ${service.bestFor.join(" ")}`,
          ).includes(normalized),
        );
        if (hits.length > 0) list = hits;
      }
      return {
        query: query || null,
        bestMatch: matched
          ? {
              name: matched.name,
              slug: matched.slug,
              url: `${BUSINESS.site}/services/${matched.slug}`,
            }
          : null,
        total: list.length,
        services: list.map((service) => ({
          name: service.name,
          slug: service.slug,
          summary: service.summary,
          includes: service.includes,
          bestFor: service.bestFor,
          url: `${BUSINESS.site}/services/${service.slug}`,
        })),
      };
    },
  },
  {
    name: "checkServiceArea",
    title: "Check junk removal service area",
    description:
      "Check whether a city, ZIP code, or address matches a listed Uncle Sam Junk Removal service community. Unknown means confirm coverage; it never means unavailable.",
    inputSchema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          minLength: 2,
          maxLength: 160,
          description: "City, ZIP code, or street address.",
        },
      },
      required: ["location"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    run: (input) => {
      const locationInput = asString(input, "location", 160);
      if (!locationInput) {
        return errorResult("A location is required.", "missing_location");
      }
      const match = matchAgentArea(locationInput);
      if (match) {
        return {
          status: "covered",
          community: match.name,
          county: match.county,
          routeZone: match.slug,
          url: `${BUSINESS.site}/locations/${match.slug}`,
        };
      }
      return {
        status: "unknown",
        message:
          "That location is not one of the currently listed communities. Nearby jobs may still be possible, so confirm coverage rather than treating it as unavailable.",
        listedCommunities: locations.map((location) => location.name),
        contact: contactBlock(),
      };
    },
  },
  {
    name: "estimatePrice",
    title: "Estimate junk removal planning price",
    description:
      "Return the current public planning price range for a load size. This is not a final or binding quote.",
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
        service: { type: "string", maxLength: 160 },
      },
      required: ["loadSize"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    run: (input) => {
      const loadSize = asString(input, "loadSize", 40);
      const service = matchAgentService(asString(input, "service", 160));
      const tier = PRICING.find((price) => price.size === loadSize);
      const base = {
        includes: PRICE_INCLUDES,
        disclaimer:
          "Planning range only. Final pricing depends on volume, weight, item type, access, disposal needs, and scope, and is approved before work begins.",
        contact: contactBlock(),
      };
      if (!tier) {
        return {
          ...base,
          loadSize: "unsure",
          allTiers: PRICING.map((price) => ({
            size: price.size,
            label: price.label,
            describes: price.describes,
            range: formatPriceRange(price.low, price.high),
          })),
        };
      }
      return {
        ...base,
        service: service?.name || null,
        size: tier.size,
        label: tier.label,
        describes: tier.describes,
        range: formatPriceRange(tier.low, tier.high),
        scopeNote:
          service &&
          ["light-demolition", "hot-tub-removal", "shed-removal"].includes(
            service.slug,
          )
            ? "Demolition-type work is priced by scope, not load volume alone. Photos and access details are needed."
            : null,
      };
    },
  },
  {
    name: "getHaulingPolicy",
    title: "Check junk hauling policy",
    description:
      "Classify an item or material as likely normal scope, needing assessment, needing advance notice, or not accepted. Use before promising unusual items will be hauled.",
    inputSchema: {
      type: "object",
      properties: {
        item: {
          type: "string",
          minLength: 1,
          maxLength: 240,
          description:
            "Item or material such as old paint cans, refrigerator, propane tank, concrete, needles, popcorn ceiling, or couch.",
        },
      },
      required: ["item"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    run: (input) => {
      const item = asString(input, "item", 240);
      if (!item) {
        return errorResult("An item or material is required.", "missing_item");
      }
      const rule = classifyHaulingItem(item);
      if (!rule) {
        return {
          item,
          verdict: "likely_normal_scope",
          message:
            "No special handling rule matched. Most non-hazardous household and commercial items are generally within scope, but photos are recommended when size, weight, condition, or material is unclear.",
          contact: contactBlock(),
        };
      }
      return {
        item,
        verdict: rule.verdict,
        category: rule.category,
        guidance: rule.guidance,
        contact: contactBlock(),
      };
    },
  },
  {
    name: "getBusinessInfo",
    title: "Get Uncle Sam Junk Removal business info",
    description:
      "Return public business information, service promises, contact methods, service region, and pricing approach for Uncle Sam Junk Removal.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    run: () => ({
      name: BUSINESS.name,
      ownership: BUSINESS.ownership,
      base: `${BUSINESS.city}, ${BUSINESS.state}`,
      region: BUSINESS.region,
      site: BUSINESS.site,
      promises: BUSINESS.promises,
      pricingApproach:
        "Public ranges are planning guides. Final onsite pricing is approved before work begins.",
      fastestEstimatePath: BUSINESS.fastestPath,
      contact: contactBlock(),
      quoteUrl: `${BUSINESS.site}/#quote`,
    }),
  },
  {
    name: "getQuoteLink",
    title: "Build a customer quote link",
    description:
      "Build a customer-review link to the free quote form with service, location, load size, timing, and notes prefilled when supplied. The link never submits, consents, reserves, or books anything.",
    inputSchema: {
      type: "object",
      properties: {
        service: { type: "string", maxLength: 160 },
        location: { type: "string", maxLength: 160 },
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
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    run: (input, context) => ({
      url: attributedQuoteUrl(input, context),
      conversionId: context.conversionId,
      submitted: false,
      consentChecked: false,
      bookingConfirmed: false,
      message:
        "Send this link to the customer for review. The customer must complete any remaining fields, personally consent, and submit the form.",
    }),
  },
];

const TOOL_DESCRIPTORS = READ_TOOLS.map((tool) => ({
  name: tool.name,
  title: tool.title,
  description: tool.description,
  inputSchema: tool.inputSchema,
  annotations: tool.annotations,
}));

const TOOLS_BY_NAME = new Map(READ_TOOLS.map((tool) => [tool.name, tool]));

function responseJson(
  request: Request,
  body: unknown,
  status = 200,
  extraHeaders?: Record<string, string>,
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...mcpCorsHeaders(request),
      ...extraHeaders,
    },
  });
}

function modernResult(result: Record<string, unknown>) {
  const currentMeta =
    result._meta && typeof result._meta === "object" && !Array.isArray(result._meta)
      ? (result._meta as Record<string, unknown>)
      : {};
  return {
    resultType: "complete",
    ...result,
    _meta: {
      ...currentMeta,
      [SERVER_INFO_META_KEY]: SERVER_INFO,
    },
  };
}

function rpcOk(
  request: Request,
  id: RpcId,
  result: Record<string, unknown>,
  modern = false,
) {
  return responseJson(request, {
    jsonrpc: "2.0",
    id,
    result: modern ? modernResult(result) : result,
  });
}

function rpcError(
  request: Request,
  id: RpcId,
  code: number,
  message: string,
  status = 400,
  data?: unknown,
) {
  return responseJson(
    request,
    {
      jsonrpc: "2.0",
      id,
      error: { code, message, ...(data === undefined ? {} : { data }) },
    },
    status,
  );
}

function decodeHeaderValue(value: string | null) {
  if (!value) return value;
  const match = value.match(/^=\?base64\?(.*)\?=$/);
  if (!match) return value;
  try {
    return Buffer.from(match[1], "base64").toString("utf8");
  } catch {
    return value;
  }
}

function metaEnvelope(body: Record<string, any>) {
  const meta = body.params?._meta;
  return meta && typeof meta === "object" && !Array.isArray(meta)
    ? (meta as Record<string, unknown>)
    : {};
}

function durationMs(startedAt: number) {
  return Math.max(0, Date.now() - startedAt);
}

export function handleMcpOptions(request: Request) {
  if (rejectDisallowedMcpOrigin(request)) {
    return mcpForbiddenOriginResponse();
  }
  return new Response(null, { status: 204, headers: mcpCorsHeaders(request) });
}

export function handleMcpGet(request: Request) {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST, OPTIONS", ...mcpCorsHeaders(request) },
  });
}

export async function handleMcpPost(request: Request) {
  if (rejectDisallowedMcpOrigin(request)) {
    return mcpForbiddenOriginResponse();
  }

  const startedAt = Date.now();
  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    logMcpEvent("request", {
      method: "parse",
      outcome: "parse_error",
      durationMs: durationMs(startedAt),
    });
    return rpcError(request, null, -32700, "Parse error");
  }

  if (!body || Array.isArray(body)) {
    return rpcError(request, null, -32600, "Batch requests are not supported");
  }

  const id: RpcId = body.id ?? null;
  const method = body.method;
  if (typeof method !== "string") {
    return rpcError(request, id, -32600, "Invalid Request: missing method");
  }

  const client = getMcpClientInfo(request, body);
  const envelope = metaEnvelope(body);
  const protocolHeader = request.headers.get("mcp-protocol-version") || "";
  const metaProtocol =
    typeof envelope[PROTOCOL_META_KEY] === "string"
      ? String(envelope[PROTOCOL_META_KEY])
      : "";
  const requestedProtocol = protocolHeader || metaProtocol;
  const isLegacyHandshake =
    method === "initialize" || method === "notifications/initialized";
  const protocolVersion =
    requestedProtocol || (isLegacyHandshake ? "2025-11-25" : "");
  const isModern =
    protocolVersion === LATEST_PROTOCOL || method === "server/discover";

  const requestLog = (
    outcome: string,
    fields: Record<string, string | number | boolean | null | undefined> = {},
  ) => {
    logMcpEvent("request", {
      clientFamily: client.family,
      clientName: client.name,
      clientVersion: client.version,
      protocolVersion: protocolVersion || "unspecified",
      method,
      outcome,
      durationMs: durationMs(startedAt),
      ...fields,
    });
  };

  if (
    protocolHeader &&
    metaProtocol &&
    protocolHeader !== metaProtocol
  ) {
    requestLog("protocol_mismatch");
    return rpcError(request, id,
      -32022,
      "MCP protocol version header and request metadata do not match",
      400,
      { supported: SUPPORTED_PROTOCOLS },
    );
  }

  if (
    protocolVersion &&
    !SUPPORTED_PROTOCOLS.includes(
      protocolVersion as (typeof SUPPORTED_PROTOCOLS)[number],
    )
  ) {
    requestLog("unsupported_protocol");
    return rpcError(request, id,
      -32022,
      `Unsupported protocol version: ${protocolVersion}`,
      400,
      { supported: SUPPORTED_PROTOCOLS },
    );
  }

  if (isModern) {
    const headerMethod = request.headers.get("mcp-method");
    if (!headerMethod) {
      requestLog("header_mismatch");
      return rpcError(request, id, -32020, "Header mismatch: Mcp-Method is required");
    }
    if (headerMethod !== method) {
      requestLog("header_mismatch");
      return rpcError(request, id,
        -32020,
        `Header mismatch: Mcp-Method '${headerMethod}' does not match body method '${method}'`,
      );
    }
    if (method === "tools/call") {
      const headerName = decodeHeaderValue(request.headers.get("mcp-name"));
      const bodyName = body.params?.name;
      if (!headerName) {
        requestLog("header_mismatch", { tool: String(bodyName || "") });
        return rpcError(request, id,
          -32020,
          "Header mismatch: Mcp-Name is required for tools/call",
        );
      }
      if (headerName !== bodyName) {
        requestLog("header_mismatch", { tool: String(bodyName || "") });
        return rpcError(request, id,
          -32020,
          `Header mismatch: Mcp-Name '${headerName}' does not match body params.name`,
        );
      }
    }
  }

  switch (method) {
    case "initialize": {
      const requested = body.params?.protocolVersion;
      const negotiated = LEGACY_PROTOCOLS.includes(requested)
        ? requested
        : "2025-11-25";
      requestLog("ok");
      return rpcOk(request, id, {
        protocolVersion: negotiated,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: SERVER_INSTRUCTIONS,
      });
    }

    case "notifications/initialized":
      requestLog("accepted");
      return new Response(null, { status: 202, headers: mcpCorsHeaders(request) });

    case "ping":
      requestLog("ok");
      return rpcOk(request, id, {}, isModern);

    case "server/discover":
      requestLog("ok");
      return rpcOk(request, id,
        {
          supportedVersions: [...MODERN_PROTOCOLS],
          capabilities: { tools: {} },
          instructions: SERVER_INSTRUCTIONS,
          ttlMs: DISCOVER_TTL_MS,
          cacheScope: "public",
        },
        true,
      );

    case "tools/list":
      requestLog("ok");
      return rpcOk(request, id,
        {
          tools: TOOL_DESCRIPTORS,
          ...(isModern
            ? { ttlMs: TOOL_LIST_TTL_MS, cacheScope: "public" }
            : {}),
        },
        isModern,
      );

    case "tools/call": {
      const name = body.params?.name;
      if (typeof name !== "string") {
        requestLog("invalid_params");
        return rpcError(request, id, -32602, "Invalid params: missing tool name");
      }
      const tool = TOOLS_BY_NAME.get(name);
      if (!tool) {
        requestLog("unknown_tool", { tool: name });
        return rpcError(request, id, -32602, `Unknown tool: ${name}`);
      }

      const conversionId = newMcpTraceId();
      const context: ToolContext = {
        clientFamily: client.family,
        clientName: client.name,
        clientVersion: client.version,
        conversionId,
      };

      try {
        const result = tool.run(
          body.params?.arguments && typeof body.params.arguments === "object"
            ? body.params.arguments
            : {},
          context,
        );
        requestLog("ok", { tool: name });
        if (name === "getQuoteLink") {
          logMcpEvent("quote_link_generated", {
            conversionId,
            clientFamily: client.family,
            clientName: client.name,
            clientVersion: client.version,
          });
        }
        return rpcOk(request, id,
          {
            content: [
              { type: "text", text: JSON.stringify(result, null, 2) },
            ],
            structuredContent: result,
            isError: false,
          },
          isModern,
        );
      } catch {
        const fallback = errorResult(
          `That lookup failed. Call or text ${BUSINESS.phoneDisplay}.`,
          "tool_execution_failed",
        );
        requestLog("tool_error", { tool: name });
        return rpcOk(request, id,
          {
            content: [
              { type: "text", text: JSON.stringify(fallback, null, 2) },
            ],
            structuredContent: fallback,
            isError: true,
          },
          isModern,
        );
      }
    }

    default:
      requestLog("method_not_found");
      return rpcError(request, id, -32601, `Method not found: ${method}`, 404);
  }
}
