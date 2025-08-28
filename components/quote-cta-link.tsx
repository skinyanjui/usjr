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

export function QuoteCtaLink({ location, label, href = "/quote", prefetch = true, children }: QuoteCtaLinkProps) {
	return (
		<Link
			href={href}
			prefetch={prefetch}
			onClick={() => trackQuoteClick({ location, label, destination: href })}
		>
			{children ?? label}
		</Link>
	)
}