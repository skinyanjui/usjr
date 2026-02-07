// Central mapping for canonical URLs to resolve duplicate or overlapping content
// Key: pathname (no trailing slash), Value: absolute canonical URL to index

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com').replace(
  /\/$/,
  ''
)

// Helper to build absolute URLs consistently
function abs(path: string): string {
  if (!path.startsWith('/')) return path
  return `${SITE_URL}${path}`
}

// Canonical strategy:
// - Keep core service/location pages self-canonical.
// - Canonicalize service-adjacent blog posts that are primarily transactional/overlapping.
export const CANONICAL_OVERRIDES: Record<string, string> = {
  // Service pages - self-referential canonicals
  '/services/mattress-removal': abs('/services/mattress-removal'),
  '/services/shed-removal': abs('/services/shed-removal'),
  '/services/yard-waste-removal': abs('/services/yard-waste-removal'),
  '/services/hot-tub-removal': abs('/services/hot-tub-removal'),
  '/services/junk-removal': abs('/services/junk-removal'),
  '/services/appliance-removal': abs('/services/appliance-removal'),
  '/services/estate-cleanouts': abs('/services/estate-cleanouts'),
  '/services/garage-cleanout': abs('/services/garage-cleanout'),

  // Blog posts with high overlap to service pages
  '/blog/hot-tub-removal-what-to-know': abs('/services/hot-tub-removal'),
  '/blog/evansville-garage-cleanout-48-hours': abs('/services/garage-cleanout'),
  '/blog/mattress-disposal-evansville': abs('/services/mattress-removal'),
  '/blog/shed-removal-guide-evansville': abs('/services/shed-removal'),
  '/blog/yard-waste-disposal-evansville': abs('/services/yard-waste-removal'),
  '/blog/appliance-disposal-recycling-guide': abs('/services/appliance-removal'),
  '/blog/estate-cleanout-guide': abs('/services/estate-cleanouts'),
}

export function getCanonicalForPath(pathname: string): string | undefined {
  const key = pathname.replace(/\/$/, '') || '/'
  return CANONICAL_OVERRIDES[key]
}

export function shouldIncludeInSitemap(pathname: string): boolean {
  const key = pathname.replace(/\/$/, '') || '/'
  const canonical = CANONICAL_OVERRIDES[key]

  // If there's a canonical override and it doesn't point to itself, exclude from sitemap
  if (canonical && canonical !== `${SITE_URL}${key}`) {
    return false
  }

  return true
}
