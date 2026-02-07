import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Truck, Phone, CheckCircle, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata, buildSocialMetadata } from '@/lib/seo-metadata'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'
import { ReviewMention } from '@/components/ui/review-mention'
import { getAggregateTestimonialStats, settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Junk Removal Services',
  category: 'Junk Removal',
  price: 'From $89-649',
  benefits: ['Same-day service', 'Licensed & insured', 'Eco-friendly disposal', 'No hidden fees'],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  ...buildSocialMetadata({
    title: seoData.title,
    description: seoData.description,
    pathname: '/services/junk-removal',
    type: 'website',
  }),
  ...buildCanonicalMetadata('/services/junk-removal', baseUrl),
}

export default function JunkRemovalPage() {
  const testimonialStats = getAggregateTestimonialStats()

  const relatedContent = [
    {
      title: 'Evansville Junk Removal Tips',
      href: '/blog/evansville-junk-removal-tips',
      description:
        'Local tips for efficient junk removal in Evansville. Learn about bulk pickup schedules and local recycling centers.',
      type: 'blog' as const,
      category: 'Local Guide',
    },
    {
      title: 'Junk Removal Cost Guide',
      href: '/blog/junk-removal-cost-tri-state',
      description:
        'Understanding junk removal pricing in the Tri-State area. Learn what factors affect costs and how to save money.',
      type: 'blog' as const,
      category: 'Pricing Guide',
    },
    {
      title: 'Appliance Removal',
      href: '/services/appliance-removal',
      description:
        'Specialized appliance removal service for refrigerators, washers, dryers, and other large appliances.',
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
    {
      title: 'Light Demolition',
      href: '/services/light-demolition',
      description: 'Shed, deck, and playset tear-downs with debris hauling for exterior cleanups.',
      type: 'service' as const,
      category: 'Alternative Service',
    },
    {
      title: 'Henderson KY Service',
      href: '/locations/henderson-ky',
      description:
        'Professional junk removal service in Henderson, Kentucky with local expertise and competitive rates.',
      type: 'location' as const,
      category: 'Service Area',
    },
  ]

  return (
    <ServicePageTemplate
      theme="primary"
      title="Junk Removal Services in Evansville"
      description="Fast, reliable junk removal, trash removal, and haul away services throughout Southern Indiana. Whether you need to get rid of old furniture, clean out your house, or dispose of construction debris, we provide same-day service with upfront pricing and no hidden fees." // Changed from subtitle to description
      badges={[
        UNIFORM_OFFERS.SAME_DAY_SERVICE,
        UNIFORM_OFFERS.LICENSED_INSURED,
        UNIFORM_OFFERS.ECO_FRIENDLY,
      ]}
      serviceCategory="Junk Removal Service"
      features={[
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.LICENSED_INSURED,
          description: 'Fully licensed and insured for your protection',
        },
        {
          icon: Calendar,
          title: UNIFORM_OFFERS.SAME_DAY_SERVICE,
          description: 'Quick response for urgent cleanouts',
        },
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.ECO_FRIENDLY,
          description: 'Responsible recycling and donation practices',
        },
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.UPFRONT_PRICING,
          description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
        },
      ]}
      steps={[
        // Added missing icon property and restructured to match template
        {
          icon: Phone,
          title: 'Schedule',
          description:
            'Call us or book online for a free estimate. We offer same-day and next-day appointments throughout Evansville.',
        },
        {
          icon: Truck,
          title: 'We Arrive',
          description:
            'Our professional team arrives on time, provides upfront pricing, and handles all the heavy lifting for you.',
        },
        {
          icon: CheckCircle,
          title: 'We Clean Up',
          description:
            'We remove your junk, sweep up the area, and dispose of everything responsibly through recycling and donation.',
        },
      ]}
      pricing={[
        {
          name: 'Single Item',
          price: 'From $89-149',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM,
        },
        {
          name: '1/4 Truck Load',
          price: 'From $179-249',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.QUARTER_LOAD,
        },
        {
          name: '1/2 Truck Load',
          price: 'From $289-389',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.HALF_LOAD,
        },
        {
          name: 'Full Truck Load',
          price: 'From $489-649',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.FULL_LOAD,
        },
      ]}
      faqs={[
        // Added missing FAQs array
        {
          question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()}?`,
          answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas, subject to availability.`,
        },
        {
          question: 'What items do you accept for removal?',
          answer:
            'We accept most household items, furniture, appliances, construction debris, and yard waste. Whether you need to dispose of old furniture, get rid of broken appliances, or remove construction materials, we handle it all. We cannot accept hazardous materials, chemicals, or paint.',
        },
        {
          question: 'How do you price your junk removal services?',
          answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
        },
        {
          question: 'Are you licensed and insured?',
          answer:
            'Yes, Uncle Sam Junk Removal is fully licensed and insured for your protection and peace of mind.',
        },
        {
          question: 'What areas do you serve?',
          answer:
            'We serve Evansville and all of Southern Indiana, including Henderson KY, Newburgh, Boonville, and surrounding communities.',
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

      {/* Service Schema Markup */}
      <StructuredData
        type="Service"
        data={{
          name: serviceInfo.serviceName,
          description: seoData.description,
          price: serviceInfo.price,
          category: serviceInfo.category,
          serviceArea: settings.serviceAreas,
        }}
      />
    </ServicePageTemplate>
  )
}
