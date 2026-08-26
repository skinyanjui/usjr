const SITE_URL = "https://unclesamjunkremoval.com";

/** Same first-party / Sites allowlist pattern as quote APIs. */
export const MCP_ALLOWED_ORIGINS = new Set([
  SITE_URL,
  `https://www.${new URL(SITE_URL).hostname}`,
  "https://uncle-sam-junk-removal.bigafrica.chatgpt.site",
  "http://localhost",
  "http://127.0.0.1",
]);

export function getAllowedMcpOrigin(request: Request) {
  const origin = request.headers.get("Origin")?.replace(/\/$/, "") || "";
  return MCP_ALLOWED_ORIGINS.has(origin) ? origin : "";
}

export function rejectDisallowedMcpOrigin(request: Request) {
  const suppliedOrigin = request.headers.get("Origin");
  return Boolean(suppliedOrigin && !getAllowedMcpOrigin(request));
}

export function mcpCorsHeaders(request: Request) {
  const origin = getAllowedMcpOrigin(request);
  return {
    ...(origin ? { "Access-Control-Allow-Origin": origin } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Accept, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Mcp-Session-Id, Authorization, Traceparent, Tracestate, Baggage",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    Vary: "Origin",
  };
}

export function mcpForbiddenOriginResponse() {
  return new Response(JSON.stringify({ ok: false }), {
    status: 403,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      Vary: "Origin",
    },
  });
}
