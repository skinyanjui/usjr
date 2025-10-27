import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Truck, Shield, Wrench, Recycle } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'
import { InternalLinks } from '@/components/ui/internal-links'
import { ReviewMention } from '@/components/ui/review-mention'
import { getAggregateTestimonialStats, settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Appliance Removal Services',
  category: 'Appliance Removal',
  price: 'From $89-149',
  benefits: ['Same-day service', 'Safe disconnection', 'EPA compliant', 'No hidden fees'],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  robots: 'index, follow',
  ...buildCanonicalMetadata('/services/appliance-removal', baseUrl),
}

export default function ApplianceRemovalPage() {
  const testimonialStats = getAggregateTestimonialStats()

  const relatedContent = [
    {
      title: 'Appliance Disposal Guide',
      href: '/blog/appliance-disposal-recycling-guide',
      description:
        'Complete guide to appliance disposal and recycling in the Tri-State area. Learn about EPA regulations and disposal options.',
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
      title: 'Estate Cleanouts',
      href: '/services/estate-cleanouts',
      description:
        'Comprehensive estate cleanout services for inherited properties and downsizing projects.',
      type: 'service' as const,
      category: 'Related Service',
    },
    {
      title: 'Mattress Removal',
      href: '/services/mattress-removal',
      description:
        'Professional mattress removal and bed disposal service with eco-friendly disposal methods.',
      type: 'service' as const,
      category: 'Related Service',
    },
  ]

  return (
    <ServicePageTemplate
      theme="orange"
      title="Appliance Removal Services in Evansville"
      description="Professional appliance removal, old appliance pickup, and appliance disposal with safe disconnection and eco-friendly disposal throughout Southern Indiana. Whether you need refrigerator removal, washer dryer removal, or any appliance disposal, we handle it all with specialized equipment."
      badges={[UNIFORM_OFFERS.SAME_DAY_SERVICE, 'Safe Disconnection', 'EPA Compliant']}
      serviceCategory="Appliance Removal Service"
      features={[
        {
          icon: Truck,
          title: 'All Appliance Types',
          description: 'Refrigerators, washers, dryers, stoves, dishwashers, and more',
        },
        {
          icon: Shield,
          title: 'Safe Disconnection',
          description: 'Professional handling of electrical and plumbing connections',
        },
        {
          icon: Wrench,
          title: UNIFORM_OFFERS.PROFESSIONAL_TEAM,
          description: 'Specialized tools for safe removal from any location',
        },
        {
          icon: Recycle,
          title: 'EPA Compliant Disposal',
          description: 'Responsible disposal following all regulations',
        },
      ]}
      steps={[
        {
          icon: Truck,
          title: 'Schedule Service',
          description:
            'Call for same-day pickup. We handle all appliance types and sizes with upfront pricing.',
        },
        {
          icon: Shield,
          title: 'Safe Disconnection',
          description:
            'Professional disconnection of gas, electric, and water connections following safety protocols.',
        },
        {
          icon: Wrench,
          title: 'Careful Removal',
          description:
            'Specialized equipment for heavy appliances and tight spaces with complete protection of your property.',
        },
        {
          icon: Recycle,
          title: 'Responsible Disposal',
          description:
            'EPA-compliant disposal with maximum recycling of metals and components. Nothing goes to waste.',
        },
      ]}
      pricing={[
        {
          name: 'Small Appliances',
          price: 'From $89',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM,
        },
        { name: 'Washer or Dryer', price: 'From $119', description: 'Standard size appliances' },
        { name: 'Refrigerator or Stove', price: 'From $149', description: 'Large appliances' },
        {
          name: 'Multiple Appliances',
          price: '15% Discount',
          description: 'Volume pricing available',
        },
      ]}
      faqs={[
        {
          question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for appliance removal?`,
          answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas for appliance removal, subject to availability.`,
        },
        {
          question: 'Do you disconnect gas and electric appliances?',
          answer:
            'Yes, our team can safely disconnect electric appliances. For gas appliances, we recommend having a licensed plumber disconnect gas lines before our arrival for safety.',
        },
        {
          question: 'How do you price appliance removal services?',
          answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
        },
        {
          question: 'Can you remove built-in appliances?',
          answer:
            'Yes, we can remove built-in appliances including dishwashers, microwaves, and cooktops. This may require additional time and tools, which could affect pricing.',
        },
        {
          question: 'What do you do with old appliances?',
          answer:
            'We recycle metals, donate working appliances when possible, and ensure proper disposal of refrigerants and hazardous materials following EPA guidelines.',
        },
      ]}
    >
      {/* Customer reviews section */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <ReviewMention
            averageRating={testimonialStats.averageRating}
            reviewCount={testimonialStats.reviewCount}
            variant="detailed"
            theme="orange"
            location="Evansville"
            showStructuredData={false} // Avoid duplicate structured data
          />
        </div>
      </div>

      {/* Internal linking section */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <InternalLinks
            title="Related Services & Helpful Resources"
            links={relatedContent}
            variant="grid"
            theme="orange"
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
