import {
  mcpCorsHeaders,
  mcpForbiddenOriginResponse,
  rejectDisallowedMcpOrigin,
} from "../../../../lib/mcp-cors";
import {
  logMcpEvent,
  sanitizeMcpSource,
  sanitizeMcpTrace,
} from "../../../../lib/mcp-telemetry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function response(request: Request, status: number) {
  return new Response(null, {
    status,
    headers: {
      ...mcpCorsHeaders(request),
    },
  });
}

export function OPTIONS(request: Request) {
  if (rejectDisallowedMcpOrigin(request)) {
    return mcpForbiddenOriginResponse();
  }
  return new Response(null, { status: 204, headers: mcpCorsHeaders(request) });
}

export async function POST(request: Request) {
  if (rejectDisallowedMcpOrigin(request)) {
    return mcpForbiddenOriginResponse();
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return response(request, 400);
  }

  if (body.event !== "quote_link_opened") return response(request, 400);
  const conversionId = sanitizeMcpTrace(body.conversionId);
  if (!conversionId) return response(request, 400);

  logMcpEvent("quote_link_opened", {
    conversionId,
    clientFamily: sanitizeMcpSource(body.source),
  });
  return response(request, 204);
}
