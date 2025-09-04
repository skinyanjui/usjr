import type { MetadataRoute } from "next"
import { shouldIncludeInSitemap } from "@/lib/canonicals"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // All potential URLs
  const allUrls = [
    // Top-level pages
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/quote`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cleaning`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/emergency`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/html-sitemap`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // Services pages
    { url: `${baseUrl}/services/junk-removal`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/dumpster-rental`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/hot-tub-removal`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/appliance-removal`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/garage-cleanout`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/estate-cleanouts`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/shed-removal`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/mattress-removal`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/light-demolition`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/yard-waste-removal`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },

    // Cleaning pages
    { url: `${baseUrl}/cleaning/residential`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cleaning/commercial`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cleaning/deep-clean`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cleaning/recurring`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cleaning/move-in-move-out`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cleaning/specialty`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Location pages
    { url: `${baseUrl}/locations/evansville`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/locations/newburgh`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/locations/henderson-ky`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/locations/owensboro-ky`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/locations/boonville`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/locations/princeton`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/locations/mount-carmel-il`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/mount-vernon-in`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/new-harmony-in`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Blog posts - only include ones that should be indexed (non-canonical)
    { url: `${baseUrl}/blog/evansville-junk-removal-tips`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/property-manager-turnover-playbook`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/spring-cleaning-checklist-southern-indiana`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ]

  // Filter URLs based on canonical rules
  return allUrls.filter((urlObj) => {
    const pathname = urlObj.url.replace(baseUrl, "")
    return shouldIncludeInSitemap(pathname)
  }) as MetadataRoute.Sitemap
}
