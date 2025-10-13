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
  // Flatten FAQ items for structured data injection only
  const allFaqs = getAllFaqs()

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Frequently Asked Questions"
        description="Answers about junk removal, light demolition, and cleaning services in Southern Indiana."
        color="green"
      />
      <div className="pt-8 pb-16">
        <StructuredData
          type="FAQPage"
          data={{
            faqs: allFaqs,
          }}
        />
        <FAQClient />
      </div>
    </div>
  )
}
