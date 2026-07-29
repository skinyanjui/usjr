import type { MetadataRoute } from "next";
import { siteUrl } from "./site-data";

const aiCrawlerUserAgents = [
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Googlebot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "Cohere-ai",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "DuckAssistBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: aiCrawlerUserAgents,
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
