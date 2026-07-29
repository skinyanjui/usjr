import {
  handleQuoteOptions,
  handleQuotePhotoRequest,
  type QuoteEnvironment,
} from "../../../../lib/quote-server";

export const runtime = "nodejs";

function environment(): QuoteEnvironment {
  return {
    QUOTE_TO_EMAIL: process.env.QUOTE_TO_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    RESEND_INBOUND_EMAIL: process.env.RESEND_INBOUND_EMAIL,
  };
}

export function OPTIONS(request: Request) {
  return handleQuoteOptions(request);
}

export function POST(request: Request) {
  return handleQuotePhotoRequest(request, environment());
}
