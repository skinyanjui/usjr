import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Package, Wrench, Building2, Truck } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Warehouse & Retail Fixture Removal',
  category: 'Warehouse Fixture Removal',
  price: 'From $399-1599',
  benefits: [
    'Commercial fixture removal',
    'Licensed & insured',
    'Heavy equipment handling',
    'Scrap metal recovery',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/services/warehouse-fixture-removal', baseUrl),
}

export default function WarehouseFixtureRemovalPage() {
  return (
    <ServicePageTemplate
      theme="purple"
      title="Warehouse & Retail Fixture Removal in Evansville"
      description="Professional removal of warehouse racks, retail shelving, and commercial fixtures for space reconfiguration"
      badges={['Commercial Fixtures', 'Heavy Equipment', 'Space Reconfiguration']}
      features={[
        {
          icon: Package,
          title: 'Warehouse Rack Systems',
          description: 'Dismantle and remove pallet racks, cantilever racks, and shelving systems',
        },
        {
          icon: Building2,
          title: 'Retail Fixture Removal',
          description:
            'Remove store shelving, display cases, checkout counters, and retail equipment',
        },
        {
          icon: Wrench,
          title: 'Professional Dismantling',
          description: 'Safe dismantling of fixtures with proper tools and experienced crew',
        },
        {
          icon: Truck,
          title: 'Heavy Equipment Removal',
          description: 'Specialized equipment for large commercial fixtures and systems',
        },
      ]}
      pricing={[
        {
          name: 'Small Retail Section',
          price: 'From $399-699',
          description: 'Individual aisles or sections',
        },
        {
          name: 'Large Retail/Warehouse',
          price: 'From $699-1199',
          description: 'Multiple aisles or large areas',
        },
        {
          name: 'Complete Facility',
          price: 'From $1199-1599',
          description: 'Entire warehouse or store',
        },
      ]}
      steps={[
        {
          icon: Package,
          title: 'Site Assessment',
          description: 'We evaluate the warehouse or retail space and fixture systems.',
        },
        {
          icon: Wrench,
          title: 'Safe Dismantling',
          description: 'Professional dismantling of racks, shelving, and fixture systems.',
        },
        {
          icon: Truck,
          title: 'Heavy Equipment Removal',
          description: 'Use specialized equipment for large commercial fixtures.',
        },
        {
          icon: Building2,
          title: 'Scrap Metal Recovery',
          description: 'Recycle metal components and provide credit toward service cost.',
        },
      ]}
      pricingNote="Specialized equipment and experienced crew for safe commercial fixture removal."
      ctaPrimary="Get Fixture Quote"
      ctaSecondary="Call for Commercial Rates"
      faqs={[
        {
          question: 'Can you dismantle warehouse pallet racks safely?',
          answer:
            'Yes, our crew has experience with warehouse rack systems including pallet racks, cantilever racks, and drive-in systems. We follow proper dismantling procedures to ensure safety.',
        },
        {
          question: 'Do you remove retail store fixtures?',
          answer:
            'Absolutely. We handle all types of retail fixtures including gondola shelving, display cases, checkout counters, and specialized retail equipment.',
        },
        {
          question: 'What happens to the metal fixtures?',
          answer:
            'Most warehouse and retail fixtures contain valuable steel. We recycle all metal components and can often provide credit toward your service cost based on current scrap prices.',
        },
        {
          question: 'Can you work around business operations?',
          answer:
            'Yes, we understand business continuity needs. We can work in phases, during off-hours, or around operational areas to minimize business disruption.',
        },
      ]}
      serviceCategory="Commercial Fixture Removal"
      serviceArea={['Evansville, IN', 'Newburgh, IN', 'Henderson, KY', 'Owensboro, KY']}
    >
      <div className="prose max-w-none">
        <h2>Commercial Fixture Removal Specialists</h2>
        <p>
          Warehouse and retail spaces often require fixture removal for reconfiguration, closure, or
          renovation. Our team has the experience and equipment to safely dismantle and remove
          commercial fixtures of all types.
        </p>

        <h3>Types of Fixtures We Remove</h3>
        <ul>
          <li>
            <strong>Warehouse Systems:</strong> Pallet racks, cantilever racks, shelving systems,
            conveyor systems
          </li>
          <li>
            <strong>Retail Fixtures:</strong> Gondola shelving, display cases, checkout systems,
            fitting rooms
          </li>
          <li>
            <strong>Commercial Equipment:</strong> Loading dock equipment, mezzanines, partitions
          </li>
          <li>
            <strong>Office Fixtures:</strong> Modular offices, warehouse office systems, cubicles
          </li>
        </ul>

        <h3>Safe Dismantling Process</h3>
        <p>
          We follow industry best practices for fixture dismantling, ensuring safety for our crew
          and your property. Our experienced team knows how to efficiently dismantle systems while
          maximizing scrap metal recovery.
        </p>
      </div>
    </ServicePageTemplate>
  )
}
