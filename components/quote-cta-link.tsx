'use client'

import Link from "next/link"
import { trackQuoteClick } from "@/lib/quoteTracking"

interface QuoteCtaLinkProps {
  location: string
  label: string
  href?: string
  prefetch?: boolean
  children?: React.ReactNode
}

export function QuoteCtaLink({
  location,
  label,
  href = "/quote",
  prefetch = true,
  children
}: QuoteCtaLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      aria-label={label}
      onClick={() => trackQuoteClick({ location, label, destination: href })}
      className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white font-medium shadow-sm transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-[.98]"
    >
      {children ?? label}
    </Link>
  )
}
