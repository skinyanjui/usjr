/** Cloudflare Worker entry point for the Vinext build used by OpenAI Sites. */
import {
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
  handleImageOptimization,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import {
  handleQuotePhotoRequest,
  handleQuoteRequest,
  handleResendWebhook,
  type QuoteEnvironment,
} from "../lib/quote-server";

interface Env extends QuoteEnvironment {
  ASSETS: Fetcher;
  DB?: D1Database;
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: {
          format: string;
          quality: number;
        }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function withSecurityHeaders(response: Response, requestUrl: URL) {
  const headers = new Headers(response.headers);

  headers.set(
    "Content-Security-Policy",
    [
      "base-uri 'self'",
      "connect-src 'self' https://unclesamjunkremoval.com",
      "default-src 'self'",
      "font-src 'self' data:",
      "form-action 'self' https://unclesamjunkremoval.com",
      "frame-ancestors 'none'",
      "img-src 'self' blob: data: https://unclesamjunkremoval.com",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
    ].join("; "),
  );
  headers.set(
    "Permissions-Policy",
    "camera=(self), microphone=(), geolocation=(), payment=(), usb=()",
  );
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");

  if (requestUrl.protocol === "https:") {
    headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const worker = {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/quote") {
      return withSecurityHeaders(await handleQuoteRequest(request, env), url);
    }

    if (url.pathname === "/api/quote/photo") {
      return withSecurityHeaders(
        await handleQuotePhotoRequest(request, env),
        url,
      );
    }

    if (url.pathname === "/api/events") {
      return withSecurityHeaders(await handleResendWebhook(request, env), url);
    }

    if (url.pathname === "/_vinext/image" && env.IMAGES) {
      const allowedWidths = [
        ...DEFAULT_DEVICE_SIZES,
        ...DEFAULT_IMAGE_SIZES,
      ];
      const imageResponse = await handleImageOptimization(
        request,
        {
          fetchAsset: (path) =>
            env.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES!.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths,
      );
      return withSecurityHeaders(imageResponse, url);
    }

    return withSecurityHeaders(await handler.fetch(request, env, ctx), url);
  },
};

export default worker;
