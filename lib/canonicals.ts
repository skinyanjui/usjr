// Central mapping for canonical URLs to resolve duplicate or overlapping content
// Key: pathname (no trailing slash), Value: absolute canonical URL to index

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
).replace(/\/$/, '')

// Helper to build absolute URLs consistently
function abs(path: string): string {
  if (!path.startsWith('/')) return path
  return `${SITE_URL}${path}`
}

// Note: Include the canonical page itself in the group, pointing to itself
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

  // Only canonicalize blog posts that are very similar/duplicate to service pages
  // Keep valuable informational blog posts with unique content indexable

  // These blog posts are too similar to service pages and should be canonicalized
  '/blog/hot-tub-removal-what-to-know': abs('/services/hot-tub-removal'),
  '/blog/evansville-garage-cleanout-48-hours': abs('/services/garage-cleanout'),
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
