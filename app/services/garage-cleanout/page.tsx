import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Warehouse, SortAsc, Gift, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Garage Cleanout Services',
  category: 'Garage Cleanout',
  price: 'From $179-649',
  benefits: ['Same-day service', 'Donation coordination', 'Complete cleanup'],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/services/garage-cleanout', baseUrl),
}

export default function GarageCleanoutPage() {
  return (
    <ServicePageTemplate
      theme="primary" // Changed from "indigo" to "purple" - indigo is not a supported theme
      title="Garage Cleanout in Evansville"
      description="Complete garage cleanout services with sorting, removal, and organization" // Changed from subtitle to description
      badges={['Same-Day Service', 'Complete Cleanout', 'Donation Coordination']} // Added badges array
      features={[
        {
          icon: Warehouse,
          title: 'Complete Cleanout',
          description: 'Remove everything from boxes to large equipment and vehicles',
        },
        {
          icon: SortAsc,
          title: 'Sorting Assistance',
          description: 'Help organize items into keep, donate, recycle, and dispose',
        },
        {
          icon: Gift,
          title: 'Donation Coordination',
          description: 'Partner with local charities for usable items',
        },
        {
          icon: Clock,
          title: 'Same-Day Service Available',
          description: 'Quick response for urgent cleanouts',
        },
      ]}
      pricing={[
        {
          name: 'Single Car Garage',
          price: 'From $289-389',
          description: 'Standard single garage',
        },
        { name: 'Two Car Garage', price: 'From $389-549', description: 'Most common size' },
        { name: 'Large/Workshop Garage', price: 'From $549-649', description: 'Oversized garages' },
        { name: 'Partial Cleanout', price: 'From $179-289', description: 'Selective removal' },
      ]}
      steps={[
        {
          icon: Warehouse,
          title: 'Free Assessment',
          description: 'We evaluate your garage and provide upfront pricing for complete cleanout.',
        },
        {
          icon: SortAsc,
          title: 'Sort & Organize',
          description: 'We help sort items into keep, donate, recycle, and dispose categories.',
        },
        {
          icon: Clock,
          title: 'Complete Removal',
          description: 'Remove all unwanted items and debris, leaving your garage clean.',
        },
        {
          icon: Gift,
          title: 'Responsible Disposal',
          description: 'Donate usable items, recycle materials, and properly dispose of waste.',
        },
      ]}
      faqs={[
        {
          question: 'Do I need to sort through items before you arrive?',
          answer:
            "No, we can help you sort through items on-site. We'll work with you to identify what to keep, donate, recycle, or dispose of during the cleanout process.",
        },
        {
          question: 'How much does a garage cleanout cost in Evansville?',
          answer:
            'Garage cleanouts typically cost from $289-649 depending on the amount of items and garage size. Single-car garages start from $289, while large two-car garages can cost up to $649.',
        },
        {
          question: 'Can you remove hazardous materials from garages?',
          answer:
            "We can remove most garage items, but hazardous materials like paint, chemicals, and automotive fluids require special handling. We'll direct you to proper disposal facilities for these items.",
        },
        {
          question: 'What happens to items that are still good?',
          answer:
            'We donate usable items to local charities, recycle metals and electronics, and only dispose of items that cannot be reused or recycled. We maximize the value of your unwanted items.',
        },
        {
          question: 'How long does a garage cleanout take?',
          answer:
            'Most garage cleanouts take 2-6 hours depending on the amount of items and level of organization needed. We work efficiently while being thorough.',
        },
      ]}
    >
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
