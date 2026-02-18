import type { MetadataRoute } from 'next'
import { shouldIncludeInSitemap } from '@/lib/canonicals'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const allUrls = [
    // ===== Core Pages (Priority: 0.9-1.0) =====
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    {
      url: `${baseUrl}/quote`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cleaning`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },

    // ===== Main Junk Removal Services (Priority: 0.85) =====
    {
      url: `${baseUrl}/services/junk-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/light-demolition`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/appliance-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/hot-tub-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/mattress-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/shed-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/yard-waste-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/garage-cleanout`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/estate-cleanouts`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },

    // ===== Specialized Services (Priority: 0.8) =====
    {
      url: `${baseUrl}/services/property-management-turnovers`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/storage-unit-cleanouts`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/office-cleanouts`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/restaurant-equipment-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/warehouse-fixture-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/holiday-tree-removal`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/storm-debris-cleanup`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },

    // ===== Cleaning Services (Priority: 0.82) =====
    {
      url: `${baseUrl}/cleaning/residential`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/cleaning/commercial`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/cleaning/deep-clean`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/cleaning/move-in-move-out`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/cleaning/recurring`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/cleaning/specialty`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },

    // ===== Locations Hub (Priority: 0.82) =====
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },

    // ===== Primary Locations (Priority: 0.78) =====
    {
      url: `${baseUrl}/locations/evansville`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.78,
    },
    {
      url: `${baseUrl}/locations/newburgh`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.78,
    },
    {
      url: `${baseUrl}/locations/henderson-ky`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.78,
    },
    {
      url: `${baseUrl}/locations/owensboro-ky`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.78,
    },

    // ===== Secondary Locations (Priority: 0.72) =====
    {
      url: `${baseUrl}/locations/boonville`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    },
    {
      url: `${baseUrl}/locations/princeton`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    },
    {
      url: `${baseUrl}/locations/mount-carmel-il`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    },
    {
      url: `${baseUrl}/locations/mount-vernon-in`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    },
    {
      url: `${baseUrl}/locations/new-harmony-in`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    },

    // ===== Information Pages (Priority: 0.8) =====
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/emergency`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },

    // ===== High-Value Blog Posts (Priority: 0.75) =====
    {
      url: `${baseUrl}/blog/evansville-junk-removal-tips`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/property-manager-turnover-playbook`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/spring-cleaning-checklist-southern-indiana`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/junk-removal-cost-tri-state`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/fall-cleanup-checklist-tri-state`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/winter-storm-cleanup-guide-tri-state`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },

    // ===== Educational Blog Posts (Priority: 0.7) =====
    {
      url: `${baseUrl}/blog/mattress-disposal-evansville`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/estate-cleanout-guide`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/appliance-disposal-recycling-guide`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/yard-waste-disposal-evansville`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/shed-removal-guide-evansville`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/hot-tub-removal-what-to-know`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/evansville-garage-cleanout-48-hours`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },

    // ===== Utility Pages (Priority: 0.5-0.6) =====
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  // Filter URLs based on canonical rules
  return allUrls.filter(urlObj => {
    const pathname = urlObj.url.replace(baseUrl, '')
    return shouldIncludeInSitemap(pathname)
  }) as MetadataRoute.Sitemap
}
