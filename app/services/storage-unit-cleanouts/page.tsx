import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Package, Truck, Clock, Shield } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Storage Unit Cleanout Services',
  category: 'Storage Unit Cleanout',
  price: 'From $149-449',
  benefits: [
    'Same-day service',
    'Licensed & insured',
    'Full unit cleanout',
    'Donation coordination',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  ...seoData,
  ...buildCanonicalMetadata('/services/storage-unit-cleanouts', baseUrl),
}

export default function StorageUnitCleanoutsPage() {
  return (
    <ServicePageTemplate
      theme="primary"
      title="Storage Unit Cleanouts in Evansville"
      description="Professional storage unit cleanout services for abandoned units, estate storage, and facility turnovers"
      badges={['Same-Day Service', 'Full Unit Clearing', 'High Demand Service']}
      features={[
        {
          icon: Package,
          title: 'Complete Unit Cleanout',
          description:
            'Remove all contents including furniture, boxes, appliances, and personal items',
        },
        {
          icon: Truck,
          title: 'Professional Hauling',
          description: 'Efficient removal with proper equipment for heavy and awkward items',
        },
        {
          icon: Shield,
          title: 'Facility Coordination',
          description: 'Work directly with storage facilities for seamless unit turnovers',
        },
        {
          icon: Clock,
          title: 'Quick Response',
          description: 'Fast service for time-sensitive facility needs',
        },
      ]}
      pricing={[
        {
          name: 'Small Unit (5x5-5x10)',
          price: 'From $149-249',
          description: 'Small storage units',
        },
        {
          name: 'Medium Unit (10x10-10x15)',
          price: 'From $249-349',
          description: 'Standard storage units',
        },
        { name: 'Large Unit (10x20+)', price: 'From $349-449', description: 'Large storage units' },
      ]}
      steps={[
        {
          icon: Package,
          title: 'Unit Assessment',
          description: 'We evaluate the storage unit contents and provide upfront pricing.',
        },
        {
          icon: Truck,
          title: 'Complete Removal',
          description: 'Remove all contents including furniture, boxes, and personal items.',
        },
        {
          icon: Shield,
          title: 'Facility Coordination',
          description: 'Work with facility management to ensure proper procedures.',
        },
        {
          icon: Clock,
          title: 'Final Cleanup',
          description: 'Basic cleaning to prepare unit for next tenant if requested.',
        },
      ]}
      pricingNote="Popular service for storage facilities. Often underserved by other companies."
      ctaPrimary="Get Storage Unit Quote"
      ctaSecondary="Call for Facility Rates"
      faqs={[
        {
          question: 'Do you work with storage facilities directly?',
          answer:
            'Yes, we frequently partner with storage facilities for abandoned unit cleanouts and facility turnovers. We understand the process and can work within facility requirements and timelines.',
        },
        {
          question: 'How quickly can you clear a storage unit?',
          answer:
            'Most storage units can be cleared within 2-4 hours depending on size and contents. We offer same-day service for urgent facility needs and can schedule multiple units in sequence.',
        },
        {
          question: 'What happens to items from storage unit cleanouts?',
          answer:
            'We sort items for donation, recycling, and proper disposal. Personal documents are handled with care and can be set aside for facility management if requested.',
        },
        {
          question: 'Do you provide facility discounts?',
          answer:
            'Yes, we offer special pricing for storage facilities with multiple units or regular cleanout needs. Contact us for facility partnership rates.',
        },
      ]}
      serviceCategory="Cleanout Services"
      serviceArea={['Evansville, IN', 'Newburgh, IN', 'Henderson, KY', 'Owensboro, KY']}
    >
      <div className="prose max-w-none">
        <h2>Why Storage Unit Cleanouts Are in High Demand</h2>
        <p>
          Storage unit cleanouts are one of our most popular services, yet they're often underserved
          by other companies. Storage facilities frequently need quick, professional cleanout
          services for abandoned units, estate turnovers, and facility management situations.
        </p>

        <h3>Our Storage Unit Cleanout Process</h3>
        <ol>
          <li>
            <strong>Facility Coordination:</strong> We work directly with storage facility
            management to ensure compliance with all procedures
          </li>
          <li>
            <strong>Complete Removal:</strong> All contents are removed including furniture, boxes,
            electronics, and personal items
          </li>
          <li>
            <strong>Sorting & Disposal:</strong> Items are sorted for donation, recycling, or proper
            disposal according to facility requirements
          </li>
          <li>
            <strong>Unit Cleaning:</strong> Basic cleaning to prepare unit for next tenant (if
            requested)
          </li>
        </ol>

        <h3>Perfect For Storage Facilities</h3>
        <p>
          We understand the unique needs of storage facilities and provide reliable, professional
          service that helps facilities maintain operations and prepare units for new tenants
          quickly and efficiently.
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
