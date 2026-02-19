import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import FAQClient from './pageClient'
import { getAllFaqs } from './data'
import { PageHero } from '@/components/ui/page-hero'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Uncle Sam Junk Removal',
  description:
    'Get quick answers about junk removal, light demolition, and cleaning in Southern Indiana—pricing, scheduling, what we take, service areas, and more.',
  ...buildCanonicalMetadata('/faq', baseUrl),
}

export default function FAQPage() {
  const allFaqs = getAllFaqs()

  return (
    <div className="min-h-screen">
      <PageHero
        title="Frequently Asked Questions"
        description="Answers about junk removal, light demolition, and cleaning services"
        eyebrow="Help Center"
      />
      <div className="bg-muted/30 py-16">
        <StructuredData
          type="FAQPage"
          data={{
            faqs: allFaqs,
          }}
        />
        <FAQClient />
      </div>

      {/* Related Blog Resources */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8 text-center">
            These guides go deeper on common topics.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/blog/junk-removal-cost-tri-state"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Pricing Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Junk Removal Cost in the Tri-State</h3>
              <p className="text-muted-foreground text-xs">Full pricing breakdown for all services and item types.</p>
            </a>
            <a
              href="/blog/evansville-junk-removal-tips"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Local Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Junk Removal Tips for Evansville Residents</h3>
              <p className="text-muted-foreground text-xs">Preparation tips, what we take, and how to save money.</p>
            </a>
            <a
              href="/blog/estate-cleanout-guide"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Estate Cleanouts
              </span>
              <h3 className="mb-1 text-sm font-semibold">Estate Cleanout Guide</h3>
              <p className="text-muted-foreground text-xs">Compassionate planning with donation and recycling options.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
