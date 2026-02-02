'use client'

import Link from 'next/link'
import { trackQuoteClick } from '@/lib/quoteTracking'
import { cn } from '@/lib/utils'

interface QuoteCtaLinkProps {
  location: string
  label: string
  href?: string
  prefetch?: boolean
  children?: React.ReactNode
  className?: string
}

export function QuoteCtaLink({
  location,
  label,
  href = '/quote',
  prefetch = true,
  children,
  className,
}: QuoteCtaLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      aria-label={label}
      role="button"
      onClick={() => trackQuoteClick({ location, label, destination: href })}
      className={cn(
        'border-primary/30 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50 inline-flex items-center justify-center rounded-lg border px-4 py-2 font-medium shadow-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[.98]',
        className
      )}
    >
      {children ?? label}
    </Link>
  )
}
