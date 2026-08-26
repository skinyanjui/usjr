import { getMcpClientInfo, newMcpTraceId } from "./mcp-telemetry";
import { ai, isAmplitudeAiEnabled, mcpAgent } from "./amplitude-ai";

type McpBody = Record<string, unknown>;

function asString(value: unknown, max = 160) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function deriveSessionId(body: McpBody) {
  const params =
    body.params && typeof body.params === "object" && !Array.isArray(body.params)
      ? (body.params as Record<string, unknown>)
      : undefined;
  const meta =
    params?._meta && typeof params._meta === "object" && !Array.isArray(params._meta)
      ? (params._meta as Record<string, unknown>)
      : undefined;
  const trace = asString(meta?.["mcp.trace"] ?? meta?.trace, 80);
  if (trace) return trace;

  const conversionId = asString(params?.conversionId, 80);
  if (conversionId) return conversionId;

  return newMcpTraceId();
}

export async function trackMcpHttpRequest(
  request: Request,
  handler: () => Promise<Response>,
): Promise<Response> {
  if (!isAmplitudeAiEnabled() || !ai || !mcpAgent) {
    return handler();
  }

  let body: McpBody = {};
  try {
    body = (await request.clone().json()) as McpBody;
  } catch {
    // Non-JSON bodies fall through without agent session tracking.
    return handler();
  }

  const client = getMcpClientInfo(request, body as Record<string, any>);
  const method = asString(body.method, 80) || "unknown";
  const sessionId = deriveSessionId(body);
  const userId = `mcp:${client.family}`;
  const startedAt = Date.now();
  let response: Response | undefined;

  try {
    await mcpAgent.session({ sessionId, userId }).run(async (session) => {
      if (method === "tools/call") {
        const params =
          body.params && typeof body.params === "object" && !Array.isArray(body.params)
            ? (body.params as Record<string, unknown>)
            : {};
        const toolName = asString(params.name, 80) || "unknown";
        session.trackUserMessage(`MCP tools/call: ${toolName}`, {
          context: {
            clientFamily: client.family,
            clientName: client.name,
            clientVersion: client.version,
          },
        });
      } else {
        session.trackSpan({
          name: `mcp:${method}`,
          latencyMs: 0,
          inputState: {
            method,
            clientFamily: client.family,
            clientName: client.name,
          },
        });
      }

      response = await handler();
      const durationMs = Math.max(0, Date.now() - startedAt);

      if (method === "tools/call") {
        const params =
          body.params && typeof body.params === "object" && !Array.isArray(body.params)
            ? (body.params as Record<string, unknown>)
            : {};
        const toolName = asString(params.name, 80) || "unknown";
        session.trackToolCall(toolName, durationMs, response.ok, {
          toolInput: params.arguments ?? {},
          context: {
            clientFamily: client.family,
            clientName: client.name,
            clientVersion: client.version,
            httpStatus: response.status,
          },
        });
      } else {
        session.trackSpan({
          name: `mcp:${method}:complete`,
          latencyMs: durationMs,
          inputState: { method },
          outputState: { httpStatus: response.status, ok: response.ok },
        });
      }
    });
  } finally {
    await ai.flush();
  }

  return response ?? new Response("Internal Server Error", { status: 500 });
}
