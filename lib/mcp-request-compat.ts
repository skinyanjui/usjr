import { handleMcpPost } from "./mcp-server";
import { getMcpClientInfo, logMcpEvent } from "./mcp-telemetry";

const SUPPORTED_PROTOCOLS = [
  "2026-07-28",
  "2025-11-25",
  "2025-06-18",
  "2025-03-26",
] as const;
const PROTOCOL_META_KEY = "io.modelcontextprotocol/protocolVersion";

function jsonRpcError(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown,
) {
  return Response.json(
    {
      jsonrpc: "2.0",
      id,
      error: {
        code,
        message,
        ...(data === undefined ? {} : { data }),
      },
    },
    {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

export async function handleCompatibleMcpPost(request: Request) {
  let body: Record<string, any>;
  try {
    body = (await request.clone().json()) as Record<string, any>;
  } catch {
    return handleMcpPost(request);
  }

  const id = body?.id ?? null;
  const headerVersion = request.headers.get("mcp-protocol-version") || "";
  const meta =
    body?.params?._meta && typeof body.params._meta === "object"
      ? body.params._meta
      : {};
  const metaVersion =
    typeof meta[PROTOCOL_META_KEY] === "string"
      ? meta[PROTOCOL_META_KEY]
      : "";
  const requested = headerVersion || metaVersion;
  const client = getMcpClientInfo(request, body);

  if (headerVersion && metaVersion && headerVersion !== metaVersion) {
    logMcpEvent("request", {
      clientFamily: client.family,
      clientName: client.name,
      clientVersion: client.version,
      method: body?.method || "unknown",
      outcome: "header_mismatch",
      protocolVersion: headerVersion,
    });
    return jsonRpcError(
      id,
      -32020,
      "Header mismatch: MCP-Protocol-Version does not match request metadata",
      { headerVersion, metadataVersion: metaVersion },
    );
  }

  if (
    requested &&
    !SUPPORTED_PROTOCOLS.includes(
      requested as (typeof SUPPORTED_PROTOCOLS)[number],
    )
  ) {
    logMcpEvent("request", {
      clientFamily: client.family,
      clientName: client.name,
      clientVersion: client.version,
      method: body?.method || "unknown",
      outcome: "unsupported_protocol",
      protocolVersion: requested,
    });
    return jsonRpcError(
      id,
      -32022,
      `Unsupported protocol version: ${requested}`,
      { requested, supported: SUPPORTED_PROTOCOLS },
    );
  }

  return handleMcpPost(request);
}
