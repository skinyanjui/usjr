import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
import CompareClient from './pageClient'
import { PageHero } from '@/components/ui/page-hero'

export const metadata: Metadata = {
  title: 'Compare Services | Uncle Sam Junk Removal',
  description:
    'Compare junk removal, light demolition, and cleaning in Evansville. See pricing, timing, and when to choose each service so you pick the best option.',
  ...buildCanonicalMetadata('/compare', baseUrl),
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Compare Services"
        description="Junk removal vs light demolition vs cleaning"
        align="center"
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <CompareClient />
      </div>
    </div>
  )
}
