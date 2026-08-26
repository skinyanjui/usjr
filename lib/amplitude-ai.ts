import { AIConfig, AmplitudeAI } from "@amplitude/ai";

const apiKey = process.env.AMPLITUDE_AI_API_KEY;

if (!apiKey) {
  console.warn("Amplitude AI API key missing — agent analytics disabled");
}

export const ai = apiKey
  ? new AmplitudeAI({
      apiKey,
      config: new AIConfig({
        contentMode: "metadata_only",
        redactPii: true,
      }),
    })
  : null;

export const mcpAgent = ai
  ? ai.agent("uncle-sam-mcp", {
      description:
        "Public MCP server for Uncle Sam Junk Removal service area, pricing, hauling policy, and quote tools.",
    })
  : null;

export function isAmplitudeAiEnabled() {
  return ai !== null && mcpAgent !== null;
}
