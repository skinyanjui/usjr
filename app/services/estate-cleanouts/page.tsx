import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Heart, Home, Gift, Users } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Estate Cleanout Services',
  category: 'Estate Cleanouts',
  price: 'From $389-1,899',
  benefits: ['Compassionate service', 'Donation coordination', 'Complete cleanout'],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/services/estate-cleanouts', baseUrl),
}

export default function EstateCleanoutsPage() {
  return (
    <ServicePageTemplate
      theme="primary" // Changed from "amber" to "orange" to match supported themes
      title="Estate Cleanouts in Evansville"
      description="Compassionate estate cleanouts, house cleanouts, and property cleanout services for families during difficult times. Whether you need to clean out an inherited home, clear a deceased property, or handle a complete family home cleanout, we provide respectful and thorough service." // Changed from subtitle to description
      badges={['Compassionate Service', 'Complete Cleanout', 'Donation Coordination']} // Added badges array
      features={[
        {
          icon: Heart,
          title: 'Sensitive Approach',
          description: 'Understanding and respectful handling during difficult times',
        },
        {
          icon: Home,
          title: 'Complete Service',
          description: 'Full house cleanouts from attic to basement',
        },
        {
          icon: Gift,
          title: 'Value Recovery',
          description: 'Help identify valuables and coordinate donations',
        },
        {
          icon: Users,
          title: 'Compassionate Service',
          description: 'Trained team sensitive to family emotions',
        },
      ]}
      pricing={[
        { name: 'Small Home', price: 'From $649-899', description: '1-2 bedrooms' },
        { name: 'Medium Home', price: 'From $899-1,299', description: '3-4 bedrooms' },
        { name: 'Large Home', price: 'From $1,299-1,899', description: '4+ bedrooms' },
        { name: 'Partial Cleanout', price: 'From $389-649', description: 'Selective rooms' },
      ]}
      steps={[
        {
          icon: Heart,
          title: 'Compassionate Consultation',
          description:
            'We meet with family to understand needs and provide sensitive, respectful service.',
        },
        {
          icon: Gift,
          title: 'Careful Sorting',
          description:
            'Methodical sorting to identify valuables, donations, and items for disposal.',
        },
        {
          icon: Home,
          title: 'Complete Cleanout',
          description:
            'Full property cleanout with careful handling of all belongings and memories.',
        },
        {
          icon: Users,
          title: 'Thoughtful Disposition',
          description:
            'Maximize donations, recycling, and ensure respectful handling of all items.',
        },
      ]}
      faqs={[
        {
          question: 'How do you handle sensitive family situations during estate cleanouts?',
          answer:
            'We approach every estate cleanout with compassion and respect. Our team is trained to be sensitive to family emotions and work at your pace, allowing time for decision-making about important items.',
        },
        {
          question: 'How much do house cleanouts and estate cleanup services cost in Evansville?',
          answer:
            'Estate cleanouts and property cleanout services typically cost $649-1,899 depending on home size and contents. House cleanouts for inherited properties follow similar pricing. We provide detailed estimates and work with executors and families to find solutions that fit budgets and timelines.',
        },
        {
          question: 'Can you help identify valuable items during the cleanout?',
          answer:
            'Yes, our experienced team can help identify potentially valuable items including antiques, collectibles, and jewelry. We recommend professional appraisals for high-value items and can coordinate with local appraisers.',
        },
        {
          question: 'Do you coordinate with estate sale companies?',
          answer:
            'Absolutely. We work with local estate sale companies and can coordinate timing to maximize value recovery. We can also handle post-sale cleanup and removal of remaining items.',
        },
        {
          question: 'How long does a complete estate cleanout take?',
          answer:
            'Estate cleanouts typically take 1-3 days depending on home size and contents. We work efficiently while being thorough and respectful, and can adjust our timeline to meet family needs.',
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
