import { buildLlmsSummary } from "../llms-content";

export function GET() {
  return new Response(buildLlmsSummary(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
