import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { SectionHeader } from '@/components/ui/section-header'
import Image from 'next/image'
import { buildCanonicalMetadata } from '@/components/canonical'

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
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg">
          <Image
            src="/shed-removal-evansville.png"
            alt="Shed removal process and planning"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
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
        </GlassCard>
      </article>
    </div>
  )
}
