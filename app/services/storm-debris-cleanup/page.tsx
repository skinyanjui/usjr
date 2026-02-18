import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Zap, TreePine, Home, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Storm Debris Cleanup Services',
  category: 'Storm Debris Cleanup',
  price: 'From $299-1299',
  benefits: [
    'Emergency response',
    'Licensed & insured',
    'Complete cleanup',
    'Insurance coordination',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  ...seoData,
  ...buildCanonicalMetadata('/services/storm-debris-cleanup', baseUrl),
}

export default function StormDebrisCleanupPage() {
  return (
    <ServicePageTemplate
      theme="primary"
      title="Storm Debris Cleanup in Evansville"
      description="Emergency storm debris removal including branches, fencing, shingles, and storm damage cleanup"
      badges={['Emergency Response', 'Insurance Coordination', 'Complete Cleanup']}
      features={[
        {
          icon: Zap,
          title: 'Emergency Response',
          description: 'Rapid response for storm damage cleanup and debris removal',
        },
        {
          icon: TreePine,
          title: 'Tree & Branch Removal',
          description: 'Safe removal of fallen trees, large branches, and storm-damaged vegetation',
        },
        {
          icon: Home,
          title: 'Property Damage Cleanup',
          description: 'Remove damaged fencing, shingles, siding, and structural debris',
        },
        {
          icon: Clock,
          title: 'Insurance Coordination',
          description: 'Work with insurance companies and provide documentation for claims',
        },
      ]}
      pricing={[
        {
          name: 'Small Storm Cleanup',
          price: 'From $299-599',
          description: 'Minor debris and branch removal',
        },
        {
          name: 'Moderate Storm Damage',
          price: 'From $599-899',
          description: 'Significant debris and property cleanup',
        },
        {
          name: 'Major Storm Cleanup',
          price: 'From $899-1299',
          description: 'Extensive storm damage cleanup',
        },
      ]}
      steps={[
        {
          icon: Zap,
          title: 'Emergency Response',
          description: 'Rapid assessment of storm damage and safety hazards.',
        },
        {
          icon: TreePine,
          title: 'Tree & Branch Removal',
          description: 'Safe removal of fallen trees and large storm debris.',
        },
        {
          icon: Home,
          title: 'Property Cleanup',
          description: 'Remove damaged fencing, shingles, and structural debris.',
        },
        {
          icon: Clock,
          title: 'Insurance Documentation',
          description: 'Provide detailed documentation and photos for insurance claims.',
        },
      ]}
      pricingNote="Emergency response available. Insurance documentation provided for claims."
      ctaPrimary="Emergency Storm Service"
      ctaSecondary="Call for Insurance Help"
      faqs={[
        {
          question: 'Do you provide emergency storm cleanup?',
          answer:
            'Yes, we offer emergency response for storm debris cleanup. During severe weather events, we prioritize safety hazards and work as quickly as conditions allow.',
        },
        {
          question: 'Can you help with insurance claims?',
          answer:
            "We can provide detailed documentation, photos, and estimates for insurance claims. We're experienced working with insurance adjusters and can help streamline the claims process.",
        },
        {
          question: 'What types of storm debris do you remove?',
          answer:
            'We remove fallen trees, branches, damaged fencing, roof shingles, siding, broken glass, and any storm-related property debris. We assess each situation for safety and develop an appropriate cleanup plan.',
        },
        {
          question: 'How quickly can you respond after a storm?',
          answer:
            'Response time depends on storm severity and demand, but we typically respond within 24-48 hours. Safety is our priority - we wait for conditions to be safe before beginning work.',
        },
      ]}
      serviceCategory="Emergency Services"
      serviceArea={['Evansville, IN', 'Newburgh, IN', 'Henderson, KY', 'Owensboro, KY']}
    >
      <div className="prose max-w-none">
        <h2>Professional Storm Debris Cleanup</h2>
        <p>
          When storms hit the Tri-State area, property damage and debris can be overwhelming. Our
          storm cleanup team provides fast, professional response to help restore your property and
          get your life back to normal.
        </p>

        <h3>Types of Storm Debris We Handle</h3>
        <ul>
          <li>
            <strong>Tree Damage:</strong> Fallen trees, large branches, storm-damaged vegetation
          </li>
          <li>
            <strong>Structural Debris:</strong> Damaged fencing, gates, outdoor structures
          </li>
          <li>
            <strong>Roofing Materials:</strong> Blown-off shingles, gutters, roofing debris
          </li>
          <li>
            <strong>General Storm Debris:</strong> Blown trash, damaged outdoor furniture, misc.
            debris
          </li>
        </ul>

        <h3>Working with Insurance</h3>
        <p>
          We understand the insurance claims process and can provide detailed documentation to help
          with your storm damage claim. Our experienced team works efficiently to minimize
          additional damage and restore your property.
        </p>
      </div>

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
