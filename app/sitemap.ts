import type { MetadataRoute } from "next";
import { locations, services, siteUrl } from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-29");
  const legalRoutes = ["privacy", "terms", "accessibility"];

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/locations`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...locations.map((location) => ({
      url: `${siteUrl}/locations/${location.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...legalRoutes.map((route) => ({
      url: `${siteUrl}/${route}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
