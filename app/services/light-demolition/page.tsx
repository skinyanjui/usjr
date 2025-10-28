import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Truck, Phone, CheckCircle, Camera, Recycle } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'
import { InternalLinks } from '@/components/ui/internal-links'
import { ReviewMention } from '@/components/ui/review-mention'
import { getAggregateTestimonialStats } from '@/lib/cms-content'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Light Demolition Services',
  category: 'Light Demolition',
  price: 'From $389-899',
  benefits: [
    'Same-day service',
    'OSHA safety compliant',
    'Selective demolition',
    'Complete cleanup',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/services/light-demolition', baseUrl),
}

export default function LightDemolitionPage() {
  const testimonialStats = getAggregateTestimonialStats()

  const relatedContent = [
    {
      title: 'Junk Removal Services',
      href: '/services/junk-removal',
      description:
        'Full-service junk removal for all household items including furniture, appliances, and more.',
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
    {
      title: 'Yard Waste Removal',
      href: '/services/yard-waste-removal',
      description:
        'Fast, reliable yard waste removal and landscaping debris removal with eco-friendly composting.',
      type: 'service' as const,
      category: 'Related Service',
    },
    {
      title: 'Estate Cleanouts',
      href: '/services/estate-cleanouts',
      description:
        'Comprehensive estate cleanout services for inherited properties and downsizing projects.',
      type: 'service' as const,
      category: 'Related Service',
    },
  ]

  return (
    <ServicePageTemplate
      theme="red"
      title="Light Demolition Services in Evansville"
      description="Professional light demolition services including interior demo, deck removal, fence removal, and selective demolition throughout Southern Indiana. Safety-first approach with complete debris removal and site cleanup."
      badges={[
        UNIFORM_OFFERS.SAME_DAY_SERVICE,
        'OSHA safety compliant',
        UNIFORM_OFFERS.LICENSED_INSURED,
      ]}
      serviceCategory="Light Demolition Service"
      features={[
        {
          icon: CheckCircle,
          title: 'Interior Demolition',
          description: 'Walls, flooring, cabinets, bathroom and kitchen demo',
        },
        {
          icon: CheckCircle,
          title: 'Exterior Structures',
          description: 'Decks, fences, small sheds, and outbuildings',
        },
        {
          icon: CheckCircle,
          title: 'Selective Demolition',
          description: 'Careful removal while preserving elements you want to keep',
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
          title: 'Project Assessment',
          description:
            'We evaluate your project and provide detailed pricing and timeline estimates with same-day service available.',
        },
        {
          icon: Camera,
          title: 'Safety Preparation',
          description:
            'Secure area, disconnect utilities safely, and set up proper safety measures following OSHA standards.',
        },
        {
          icon: Truck,
          title: 'Careful Demolition',
          description:
            'Systematic demolition using proper tools and techniques with selective preservation of elements you want to keep.',
        },
        {
          icon: Recycle,
          title: 'Complete Cleanup',
          description:
            'Remove all debris, recycle materials when possible, and leave the area clean and ready for your next project.',
        },
      ]}
      pricing={[
        {
          name: 'Interior Room Demo',
          price: 'From $389-549',
          description: 'Perfect for bathroom/kitchen renovations',
        },
        {
          name: 'Deck Removal',
          price: 'From $289-649',
          description: 'Complete deck demolition and removal',
        },
        {
          name: 'Fence Removal',
          price: 'From $289-489',
          description: 'Fence and gate removal service',
        },
        {
          name: 'Kitchen/Bath Demo',
          price: 'From $549-899',
          description: 'Complete fixture and cabinet removal',
        },
        {
          name: 'Flooring Removal',
          price: 'From $3-8/sq ft',
          description: 'All flooring types and disposal',
        },
      ]}
      faqs={[
        {
          question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for light demolition?`,
          answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} assessment and can often begin demolition projects the same day, subject to availability and project complexity.`,
        },
        {
          question: 'What types of light demolition do you handle?',
          answer:
            "We handle interior walls, decks, fences, small outbuildings, bathroom/kitchen demo, flooring removal, and similar projects. We don't handle structural or load-bearing demolition.",
        },
        {
          question: 'How do you price light demolition services?',
          answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. All prices include demolition, debris removal, and site cleanup. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
        },
        {
          question: 'Do you handle permits for demolition projects?',
          answer:
            "We can advise on permit requirements, but permits are typically the homeowner's responsibility. We ensure all work meets local building codes and safety standards.",
        },
        {
          question: 'What safety measures do you take during demolition?',
          answer:
            'We follow OSHA safety standards, use proper protective equipment, secure work areas, disconnect utilities safely, and ensure proper dust and debris containment.',
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
            theme="red"
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
            theme="red"
          />
        </div>
      </div>
    </ServicePageTemplate>
  )
}
