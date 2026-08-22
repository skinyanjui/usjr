import {
  handleQuoteOptions,
  handleQuoteRequest,
  type QuoteEnvironment,
} from "../../../lib/quote-server";
import {
  logMcpEvent,
  sanitizeMcpSource,
  sanitizeMcpTrace,
} from "../../../lib/mcp-telemetry";

export const runtime = "nodejs";

function environment(): QuoteEnvironment {
  return {
    QUOTE_TO_EMAIL: process.env.QUOTE_TO_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    RESEND_INBOUND_EMAIL: process.env.RESEND_INBOUND_EMAIL,
    RESEND_WEBHOOK_SECRET: process.env.RESEND_WEBHOOK_SECRET,
  };
}

function mcpAttribution(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) return null;

  try {
    const url = new URL(referer);
    if (url.searchParams.get("ref") !== "mcp") return null;
    const conversionId = sanitizeMcpTrace(url.searchParams.get("mcp_trace"));
    if (!conversionId) return null;
    return {
      conversionId,
      clientFamily: sanitizeMcpSource(url.searchParams.get("mcp_source")),
    };
  } catch {
    return null;
  }
}

export function OPTIONS(request: Request) {
  return handleQuoteOptions(request);
}

export async function POST(request: Request) {
  const attribution = mcpAttribution(request);
  const response = await handleQuoteRequest(request, environment());

  if (attribution && response.ok) {
    const payload = (await response
      .clone()
      .json()
      .catch(() => ({}))) as { ok?: boolean; reference?: string };
    if (payload.ok && payload.reference) {
      logMcpEvent("quote_converted", {
        conversionId: attribution.conversionId,
        clientFamily: attribution.clientFamily,
        quoteReference: payload.reference,
      });
    }
  }

  return response;
}
