import {
  logMcpEvent,
  sanitizeMcpSource,
  sanitizeMcpTrace,
} from "../../../../lib/mcp-telemetry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_HOSTS = new Set([
  "unclesamjunkremoval.com",
  "www.unclesamjunkremoval.com",
]);

function response(status: number) {
  return new Response(null, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (!ALLOWED_HOSTS.has(new URL(origin).hostname)) return response(403);
    } catch {
      return response(403);
    }
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return response(400);
  }

  if (body.event !== "quote_link_opened") return response(400);
  const conversionId = sanitizeMcpTrace(body.conversionId);
  if (!conversionId) return response(400);

  logMcpEvent("quote_link_opened", {
    conversionId,
    clientFamily: sanitizeMcpSource(body.source),
  });
  return response(204);
}
