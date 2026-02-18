import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Truck, Phone, CheckCircle, Calendar, HardHat } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'
import { ReviewMention } from '@/components/ui/review-mention'
import { getAggregateTestimonialStats } from '@/lib/cms-content'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Shed Removal Services',
  category: 'Shed Removal',
  price: 'From $289-649',
  benefits: ['Same-day service', 'Licensed & insured', 'Complete demolition', 'Site cleanup'],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  ...seoData,
  ...buildCanonicalMetadata('/services/shed-removal', baseUrl),
}

export default function ShedRemovalPage() {
  const testimonialStats = getAggregateTestimonialStats()

  const relatedContent = [
    {
      title: 'Shed Removal Guide',
      href: '/blog/shed-removal-guide-evansville',
      description:
        'Complete guide to shed removal in Evansville. Learn about permits, preparation, and disposal options.',
      type: 'blog' as const,
      category: 'Local Guide',
    },
    {
      title: 'Light Demolition',
      href: '/services/light-demolition',
      description: 'Interior demo, deck and fence removal with safety-first approach.',
      type: 'service' as const,
      category: 'Related Service',
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
      title: 'Yard Waste Removal',
      href: '/services/yard-waste-removal',
      description:
        'Fast, reliable yard waste removal and landscaping debris removal with eco-friendly composting.',
      type: 'service' as const,
      category: 'Related Service',
    },
  ]

  return (
    <ServicePageTemplate
      theme="primary"
      title="Shed Removal Services in Evansville"
      description="Professional shed and outbuilding removal, demolition, and cleanup throughout Southern Indiana. Whether you need to remove a small storage shed, large barn, or any outbuilding, we provide complete demolition service with debris removal and site cleanup."
      badges={[
        UNIFORM_OFFERS.SAME_DAY_SERVICE,
        UNIFORM_OFFERS.LICENSED_INSURED,
        'Complete Demolition',
      ]}
      serviceCategory="Shed Removal Service"
      features={[
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.LICENSED_INSURED,
          description: 'Fully licensed and insured for your protection',
        },
        {
          icon: Calendar,
          title: UNIFORM_OFFERS.SAME_DAY_SERVICE,
          description: 'Free assessment and quick scheduling',
        },
        {
          icon: HardHat,
          title: 'Safe Demolition',
          description: 'Systematic dismantling from roof to foundation with proper safety measures',
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
          title: 'Free Assessment',
          description:
            'We evaluate shed size, materials, and access for accurate pricing and timeline estimates.',
        },
        {
          icon: HardHat,
          title: 'Preparation & Safety',
          description:
            'Clear contents, disconnect utilities if needed, and set up safety perimeter for demolition work.',
        },
        {
          icon: Truck,
          title: 'Careful Demolition',
          description:
            'Systematic dismantling from roof to foundation using proper tools and safety techniques with complete debris removal.',
        },
      ]}
      pricing={[
        {
          name: 'Small Shed (up to 8x10)',
          price: 'From $289-389',
          description: 'Perfect for storage sheds',
        },
        {
          name: 'Medium Shed (10x12)',
          price: 'From $389-549',
          description: 'Great for garden sheds',
        },
        {
          name: 'Large Shed / Barn',
          price: 'From $549-649',
          description: 'Complete outbuilding removal',
        },
      ]}
      faqs={[
        {
          question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for shed removal?`,
          answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} assessment and can often begin demolition the same day, subject to availability and project size.`,
        },
        {
          question: 'Do I need to empty my shed before removal?',
          answer:
            'Yes, please remove all contents before our arrival. We can provide junk removal for shed contents at an additional cost if needed.',
        },
        {
          question: 'How do you price shed removal services?',
          answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
        },
        {
          question: 'Can you remove sheds with concrete foundations?',
          answer:
            'Yes, we can remove concrete pads and foundations. This requires additional equipment and time, typically adding $200-400 depending on size.',
        },
        {
          question: 'What materials can you recycle from shed demolition?',
          answer:
            'We recycle metal roofing, siding, hardware, and lumber when possible. Asphalt shingles and treated lumber are disposed of at certified facilities.',
        },
      ]}
      relatedContent={relatedContent}
    >
      {/* Customer reviews section */}
      <div className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <ReviewMention
            averageRating={testimonialStats.averageRating}
            reviewCount={testimonialStats.reviewCount}
            variant="detailed"
            theme="primary"
            location="Evansville"
            showStructuredData={false} // Avoid duplicate structured data
          />
        </div>
      </div>
    </ServicePageTemplate>
  )
}
