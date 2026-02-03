import type { Metadata } from 'next'
import { getCanonicalForPath, SITE_URL } from '@/lib/canonicals'

// Server component exports a function to be used in route metadata
export function buildCanonicalMetadata(
  pathname: string,
  baseUrl: string = SITE_URL
): Partial<Metadata> {
  const override = getCanonicalForPath(pathname)
  // Ensure baseUrl doesn't have a trailing slash to avoid double slashes
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')
  const canonicalUrl = override || `${cleanBaseUrl}${pathname}`
  return {
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
