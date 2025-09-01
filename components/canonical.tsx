import type { Metadata } from "next"
import { getCanonicalForPath } from "@/lib/canonicals"

// Server component exports a function to be used in route metadata
export function buildCanonicalMetadata(pathname: string, baseUrl: string): Partial<Metadata> {
  const override = getCanonicalForPath(pathname)
  const canonicalUrl = override || `${baseUrl}${pathname}`
  return {
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

