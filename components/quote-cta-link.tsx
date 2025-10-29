'use client'

import Link from 'next/link'
import { trackQuoteClick } from '@/lib/quoteTracking'

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
  href = '/quote',
  prefetch = true,
  children,
}: QuoteCtaLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      aria-label={label}
      role="button"
      onClick={() => trackQuoteClick({ location, label, destination: href })}
      className="inline-flex items-center justify-center rounded-md bg-blue-800 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[.98]"
    >
      {children ?? label}
    </Link>
  )
}
