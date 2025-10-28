import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Truck, Phone, CheckCircle, Calendar, Recycle } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'
import { InternalLinks } from '@/components/ui/internal-links'
import { ReviewMention } from '@/components/ui/review-mention'
import { getAggregateTestimonialStats } from '@/lib/cms-content'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Yard Waste Removal Services',
  category: 'Yard Waste Removal',
  price: 'From $179-489',
  benefits: ['Same-day service', 'Licensed & insured', 'Eco-friendly disposal', 'No hidden fees'],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/services/yard-waste-removal', baseUrl),
}

export default function YardWasteRemovalPage() {
  const testimonialStats = getAggregateTestimonialStats()

  const relatedContent = [
    {
      title: 'Yard Waste Disposal Guide',
      href: '/blog/yard-waste-disposal-evansville',
      description:
        'Complete guide to yard waste disposal in Evansville. Learn about composting and local facilities.',
      type: 'blog' as const,
      category: 'Local Guide',
    },
    {
      title: 'Junk Removal Services',
      href: '/services/junk-removal',
      description:
        'Full-service junk removal for all household items including furniture, appliances, and more.',
      type: 'service' as const,
      category: 'Related Service',
    },
    {
      title: 'Light Demolition',
      href: '/services/light-demolition',
      description: 'Interior demo, deck and fence removal with safety-first approach.',
      type: 'service' as const,
      category: 'Related Service',
    },
    {
      title: 'Shed Removal',
      href: '/services/shed-removal',
      description: 'Complete demolition, removal, and cleanup for sheds and outbuildings.',
      type: 'service' as const,
      category: 'Related Service',
    },
  ]

  return (
    <ServicePageTemplate
      theme="green"
      title="Yard Waste Removal Services in Evansville"
      description="Fast, reliable yard waste removal, brush pickup, and landscaping debris removal throughout Southern Indiana. Whether you need leaves removed, tree limbs hauled away, or complete yard cleanup, we provide same-day service with 100% eco-friendly composting."
      badges={[
        UNIFORM_OFFERS.SAME_DAY_SERVICE,
        UNIFORM_OFFERS.LICENSED_INSURED,
        UNIFORM_OFFERS.ECO_FRIENDLY,
      ]}
      serviceCategory="Yard Waste Removal Service"
      features={[
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.LICENSED_INSURED,
          description: 'Fully licensed and insured for your protection',
        },
        {
          icon: Calendar,
          title: UNIFORM_OFFERS.SAME_DAY_SERVICE,
          description: 'Call for same-day pickup of yard waste and debris',
        },
        {
          icon: Recycle,
          title: UNIFORM_OFFERS.ECO_FRIENDLY,
          description: '100% composted or processed into mulch/soil amendments',
        },
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.UPFRONT_PRICING,
          description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
        },
      ]}
      steps={[
        {
          icon: Phone,
          title: 'Schedule',
          description:
            'Call us or text photos for a free estimate. We offer same-day appointments for yard waste removal throughout Evansville.',
        },
        {
          icon: Truck,
          title: 'We Collect',
          description:
            'Our team arrives on time, provides upfront pricing, and collects yard waste from anywhere on your property including backyard areas.',
        },
        {
          icon: Recycle,
          title: 'We Compost',
          description:
            "All yard waste is taken to certified composting facilities where it's processed into mulch, compost, and soil amendments. Nothing goes to landfills.",
        },
      ]}
      pricing={[
        {
          name: 'Small Load',
          price: 'From $179-289',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM,
        },
        {
          name: 'Medium Load',
          price: 'From $289-389',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.QUARTER_LOAD,
        },
        {
          name: 'Large Load',
          price: 'From $389-489',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.HALF_LOAD,
        },
      ]}
      faqs={[
        {
          question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for yard waste removal?`,
          answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas, subject to availability.`,
        },
        {
          question: 'What types of yard waste do you remove?',
          answer:
            'We remove leaves, grass clippings, brush, tree limbs (up to 6 inches diameter), hedge trimmings, garden debris, and other organic landscaping materials.',
        },
        {
          question: 'How do you price yard waste removal services?',
          answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
        },
        {
          question: 'Do you remove large tree limbs and branches?',
          answer:
            'Yes, we remove tree limbs up to 6 inches in diameter. Larger limbs or whole tree removal requires specialized tree service, which we can recommend local providers for.',
        },
        {
          question: 'What happens to the yard waste after removal?',
          answer:
            "All yard waste is taken to certified composting facilities where it's processed into mulch, compost, and soil amendments. Nothing goes to landfills - it's 100% recycled.",
        },
      ]}
    >
      {/* Customer reviews section */}
      <div className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <ReviewMention
            averageRating={testimonialStats.averageRating}
            reviewCount={testimonialStats.reviewCount}
            variant="detailed"
            theme="green"
            location="Evansville"
            showStructuredData={false} // Avoid duplicate structured data
          />
        </div>
      </div>

      {/* Internal linking section */}
      <div className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <InternalLinks
            title="Related Services & Helpful Resources"
            links={relatedContent}
            variant="grid"
            theme="green"
          />
        </div>
      </div>
    </ServicePageTemplate>
  )
}
