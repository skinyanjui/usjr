import type { Metadata } from 'next'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/glass-card'
import { SectionHeader } from '@/components/ui/section-header'
import { buildCanonicalMetadata } from '@/components/canonical'
import { SolidPanel } from '@/components/ui/solid-panel'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Yard Waste Disposal in Evansville: Composting and Pickup Basics | Uncle Sam Junk Removal',
  description:
    'Brush, leaves, and limbs: the simplest, most eco-friendly ways to handle yard waste in Evansville.',
  ...buildCanonicalMetadata('/blog/yard-waste-disposal-evansville', baseUrl),
}

export default function YardWasteDisposalBlog() {
  return (
    <div className="min-h-screen bg-green-50">
      <article className="mx-auto max-w-4xl px-4 py-16">
        <SectionHeader
          title="Yard waste disposal in Evansville: composting and pickup basics"
          subtitle="Seasonal cleanup made simple"
        />
        <SolidPanel color="green" label="Yard Waste" className="mb-8 h-64">
          Compost, mulch, or schedule a haul-away to keep limbs and leaves off your curb.
        </SolidPanel>
        <GlassCard className="p-8">
          <p className="mb-4 text-gray-700">
            Evansville yard waste can be composted, mulched, or hauled away. For brush and limbs up
            to 6 inches in diameter, we offer fast pickup and eco-friendly processing at local
            facilities.
          </p>
          <h2 className="mt-6 mb-2 text-xl font-bold text-gray-900">Pickup Tips</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Bundle limbs where possible for faster loading</li>
            <li>Keep yard waste separate from trash to maximize recycling</li>
            <li>Ask about seasonal cleanup discounts</li>
          </ul>

          <div className="mt-8 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 p-8 text-center text-white shadow-lg">
            <h3 className="mb-3 text-2xl font-bold">Schedule Yard Waste Removal Today</h3>
            <p className="mb-6 text-lg">
              Fast, eco-friendly yard waste pickup in Evansville. Same-day service available.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/quote"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-green-600 transition-transform hover:scale-105 hover:shadow-xl"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services/yard-waste-removal"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white hover:text-green-600"
              >
                View Yard Waste Services
              </Link>
            </div>
          </div>
        </GlassCard>
      </article>
    </div>
  )
}
