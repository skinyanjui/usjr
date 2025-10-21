import type { Metadata } from 'next'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/glass-card'
import { SectionHeader } from '@/components/ui/section-header'
import { buildCanonicalMetadata } from '@/components/canonical'
import { SolidPanel } from '@/components/ui/solid-panel'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Shed Removal in Evansville: Permit Tips, Pricing, and Timeline | Uncle Sam Junk Removal',
  description:
    "From permits to pricing, here's how to plan a smooth shed removal in Evansville, including timeline expectations.",
  ...buildCanonicalMetadata('/blog/shed-removal-guide-evansville', baseUrl),
}

export default function ShedRemovalGuideBlog() {
  return (
    <div className="min-h-screen bg-green-50">
      <article className="mx-auto max-w-4xl px-4 py-16">
        <SectionHeader
          title="Shed removal in Evansville: permit tips, pricing, and timeline"
          subtitle="Plan your project with confidence"
        />
        <SolidPanel color="orange" label="Shed Removal" className="mb-8 h-64">
          Prepare for tear-down day with clear access, utility checks, and a plan for debris.
        </SolidPanel>
        <GlassCard className="p-8">
          <p className="mb-4 text-gray-700">
            Most small sheds under 200 sq ft don't require permits in many jurisdictions, but always
            check local rules. Expect $289–649 for removal depending on size, materials, access, and
            whether concrete pads need demo.
          </p>
          <h2 className="mt-6 mb-2 text-xl font-bold text-gray-900">Quick Planning Checklist</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Empty the shed beforehand or ask for a cleanout quote</li>
            <li>Confirm utility disconnections (electric)</li>
            <li>Clear a 4-foot access path to the structure</li>
          </ul>

          <div className="mt-8 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 p-8 text-center text-white shadow-lg">
            <h3 className="mb-3 text-2xl font-bold">Need Professional Shed Removal?</h3>
            <p className="mb-6 text-lg">
              Get a free estimate for complete shed removal and disposal in Evansville.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/quote"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-orange-600 transition-transform hover:scale-105 hover:shadow-xl"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services/shed-removal"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white hover:text-orange-600"
              >
                View Shed Removal Services
              </Link>
            </div>
          </div>
        </GlassCard>
      </article>
    </div>
  )
}
