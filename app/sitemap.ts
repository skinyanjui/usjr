import fs from 'node:fs'
import path from 'node:path'
import type { MetadataRoute } from 'next'
import { shouldIncludeInSitemap } from '@/lib/canonicals'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
const projectRoot = process.cwd()
const FALLBACK_LAST_MODIFIED = new Date('2025-01-01T00:00:00.000Z')

function resolveRouteFile(pathname: string): string | undefined {
  if (pathname === '/') return 'app/page.tsx'
  if (pathname === '/privacy') return 'app/privacy/page.tsx'
  if (pathname === '/terms') return 'app/terms/page.tsx'
  if (pathname === '/quote') return 'app/quote/page.tsx'
  if (pathname === '/services') return 'app/services/page.tsx'
  if (pathname === '/cleaning') return 'app/cleaning/page.tsx'
  if (pathname === '/blog') return 'app/blog/page.tsx'
  if (pathname === '/faq') return 'app/faq/page.tsx'
  if (pathname === '/pricing') return 'app/pricing/page.tsx'
  if (pathname === '/about') return 'app/about/page.tsx'
  if (pathname === '/compare') return 'app/compare/page.tsx'
  if (pathname === '/emergency') return 'app/emergency/page.tsx'

  if (pathname.startsWith('/services/')) return `app${pathname}/page.tsx`
  if (pathname.startsWith('/cleaning/')) return `app${pathname}/page.tsx`
  if (pathname.startsWith('/locations/')) return `app${pathname}/page.tsx`
  if (pathname.startsWith('/blog/')) return `app${pathname}/page.tsx`

  return undefined
}

function getLastModified(pathname: string): Date {
  const routeFile = resolveRouteFile(pathname)
  if (!routeFile) return FALLBACK_LAST_MODIFIED

  try {
    const stats = fs.statSync(path.join(projectRoot, routeFile))
    return stats.mtime
  } catch {
    return FALLBACK_LAST_MODIFIED
  }
}

function createEntry(
  pathname: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number
) {
  return {
    url: pathname === '/' ? baseUrl : `${baseUrl}${pathname}`,
    lastModified: getLastModified(pathname),
    changeFrequency,
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const allUrls = [
    createEntry('/', 'weekly', 1.0),
    createEntry('/quote', 'weekly', 0.95),
    createEntry('/services', 'weekly', 0.9),
    createEntry('/cleaning', 'weekly', 0.9),

    createEntry('/services/junk-removal', 'monthly', 0.85),
    createEntry('/services/light-demolition', 'monthly', 0.85),
    createEntry('/services/appliance-removal', 'monthly', 0.85),
    createEntry('/services/hot-tub-removal', 'monthly', 0.85),
    createEntry('/services/mattress-removal', 'monthly', 0.85),
    createEntry('/services/shed-removal', 'monthly', 0.85),
    createEntry('/services/yard-waste-removal', 'monthly', 0.85),
    createEntry('/services/garage-cleanout', 'monthly', 0.85),
    createEntry('/services/estate-cleanouts', 'monthly', 0.85),

    createEntry('/services/property-management-turnovers', 'monthly', 0.8),
    createEntry('/services/storage-unit-cleanouts', 'monthly', 0.8),
    createEntry('/services/office-cleanouts', 'monthly', 0.8),
    createEntry('/services/restaurant-equipment-removal', 'monthly', 0.8),
    createEntry('/services/warehouse-fixture-removal', 'monthly', 0.8),
    createEntry('/services/holiday-tree-removal', 'monthly', 0.8),
    createEntry('/services/storm-debris-cleanup', 'monthly', 0.8),

    createEntry('/cleaning/residential', 'monthly', 0.82),
    createEntry('/cleaning/commercial', 'monthly', 0.82),
    createEntry('/cleaning/deep-clean', 'monthly', 0.82),
    createEntry('/cleaning/move-in-move-out', 'monthly', 0.82),
    createEntry('/cleaning/recurring', 'monthly', 0.82),
    createEntry('/cleaning/specialty', 'monthly', 0.82),

    createEntry('/locations/evansville', 'monthly', 0.78),
    createEntry('/locations/newburgh', 'monthly', 0.78),
    createEntry('/locations/henderson-ky', 'monthly', 0.78),
    createEntry('/locations/owensboro-ky', 'monthly', 0.78),

    createEntry('/locations/boonville', 'monthly', 0.72),
    createEntry('/locations/princeton', 'monthly', 0.72),
    createEntry('/locations/mount-carmel-il', 'monthly', 0.72),
    createEntry('/locations/mount-vernon-in', 'monthly', 0.72),
    createEntry('/locations/new-harmony-in', 'monthly', 0.72),

    createEntry('/about', 'monthly', 0.8),
    createEntry('/compare', 'monthly', 0.8),
    createEntry('/faq', 'monthly', 0.8),
    createEntry('/emergency', 'monthly', 0.75),
    createEntry('/blog', 'weekly', 0.8),

    createEntry('/blog/evansville-junk-removal-tips', 'monthly', 0.75),
    createEntry('/blog/property-manager-turnover-playbook', 'monthly', 0.75),
    createEntry('/blog/spring-cleaning-checklist-southern-indiana', 'monthly', 0.75),
    createEntry('/blog/junk-removal-cost-tri-state', 'monthly', 0.75),
    createEntry('/blog/fall-cleanup-checklist-tri-state', 'monthly', 0.75),
    createEntry('/blog/winter-storm-cleanup-guide-tri-state', 'monthly', 0.75),

    createEntry('/blog/mattress-disposal-evansville', 'monthly', 0.7),
    createEntry('/blog/estate-cleanout-guide', 'monthly', 0.7),
    createEntry('/blog/appliance-disposal-recycling-guide', 'monthly', 0.7),
    createEntry('/blog/yard-waste-disposal-evansville', 'monthly', 0.7),
    createEntry('/blog/shed-removal-guide-evansville', 'monthly', 0.7),
    createEntry('/blog/hot-tub-removal-what-to-know', 'monthly', 0.7),
    createEntry('/blog/evansville-garage-cleanout-48-hours', 'monthly', 0.7),

    createEntry('/privacy', 'yearly', 0.5),
    createEntry('/terms', 'yearly', 0.5),
  ]

  return allUrls.filter(urlObj => {
    const pathname = urlObj.url.replace(baseUrl, '') || '/'
    return shouldIncludeInSitemap(pathname)
  }) as MetadataRoute.Sitemap
}
