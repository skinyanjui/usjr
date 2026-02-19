import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { ChefHat, Refrigerator, Wrench, Truck } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Restaurant Equipment Removal',
  category: 'Restaurant Equipment Removal',
  price: 'From $299-1299',
  benefits: [
    'Commercial equipment handling',
    'Licensed & insured',
    'Disconnect coordination',
    'Scrap metal recycling',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  ...seoData,
  ...buildCanonicalMetadata('/services/restaurant-equipment-removal', baseUrl),
}

const relatedContent = [
  {
    title: 'Commercial Office Cleaning in Evansville',
    href: '/blog/commercial-office-cleaning-guide-evansville',
    description:
      'Guide to commercial cleaning services for Evansville businesses—applicable to restaurant and hospitality spaces.',
    type: 'blog' as const,
    category: 'Commercial Cleaning',
  },
  {
    title: 'Property Manager Turnover Playbook',
    href: '/blog/property-manager-turnover-playbook',
    description: 'How commercial property managers handle complete turnover and cleanout projects.',
    type: 'blog' as const,
    category: 'Property Management',
  },
  {
    title: 'Office Cleanouts',
    href: '/services/office-cleanouts',
    description: 'Commercial property cleanouts for offices, retail, and hospitality spaces.',
    type: 'service' as const,
    category: 'Related Service',
  },
  {
    title: 'Warehouse Fixture Removal',
    href: '/services/warehouse-fixture-removal',
    description: 'Large-scale commercial fixture and equipment removal for industrial spaces.',
    type: 'service' as const,
    category: 'Related Service',
  },
]

export default function RestaurantEquipmentRemovalPage() {
  return (
    <ServicePageTemplate
      theme="primary"
      title="Restaurant Equipment Removal in Evansville"
      description="Professional removal of commercial kitchen equipment including ovens, refrigerators, sinks, and complete restaurant cleanouts"
      badges={['Commercial Equipment', 'Disconnect Coordination', 'Scrap Metal Recovery']}
      relatedContent={relatedContent}
      features={[
        {
          icon: ChefHat,
          title: 'Commercial Kitchen Equipment',
          description:
            'Expert removal of ovens, fryers, grills, and all commercial cooking equipment',
        },
        {
          icon: Refrigerator,
          title: 'Refrigeration Systems',
          description: 'Safe removal of walk-in coolers, reach-in refrigerators, and freezer units',
        },
        {
          icon: Wrench,
          title: 'Disconnect Coordination',
          description: 'Work with utilities for gas, electric, and plumbing disconnections',
        },
        {
          icon: Truck,
          title: 'Heavy Equipment Handling',
          description: 'Specialized equipment for moving large commercial kitchen items',
        },
      ]}
      pricing={[
        {
          name: 'Single Equipment Item',
          price: 'From $299-499',
          description: 'Individual ovens, refrigerators',
        },
        { name: 'Kitchen Section', price: 'From $499-899', description: 'Partial kitchen removal' },
        {
          name: 'Complete Restaurant',
          price: 'From $899-1299',
          description: 'Full restaurant cleanout',
        },
      ]}
      steps={[
        {
          icon: ChefHat,
          title: 'Equipment Assessment',
          description: 'We evaluate commercial kitchen equipment and coordinate disconnections.',
        },
        {
          icon: Wrench,
          title: 'Professional Disconnection',
          description: 'Coordinate with licensed technicians for gas, electric, and plumbing.',
        },
        {
          icon: Truck,
          title: 'Safe Removal',
          description: 'Use specialized equipment to safely remove heavy commercial items.',
        },
        {
          icon: Refrigerator,
          title: 'Responsible Disposal',
          description: 'Recycle metals and properly dispose of refrigerants and materials.',
        },
      ]}
      pricingNote="Specialized commercial equipment removal with proper handling and disposal."
      ctaPrimary="Get Restaurant Quote"
      ctaSecondary="Call for Commercial Rates"
      faqs={[
        {
          question: 'Do you handle gas line disconnections?',
          answer:
            "We coordinate with licensed professionals for gas line disconnections. We don't perform utility disconnections ourselves but can arrange for qualified technicians as part of the service.",
        },
        {
          question: 'Can you remove walk-in coolers?',
          answer:
            'Yes, we specialize in walk-in cooler and freezer removal. These require specialized equipment and coordination with refrigeration technicians for proper coolant handling.',
        },
        {
          question: 'What happens to the scrap metal?',
          answer:
            'Commercial kitchen equipment contains valuable metals. We recycle all metal components and can often provide credit toward your service cost based on current scrap metal prices.',
        },
        {
          question: 'Do you work with restaurant closures?',
          answer:
            'Absolutely. We frequently work with restaurant owners, landlords, and property managers during restaurant closures, renovations, and equipment updates.',
        },
      ]}
      serviceCategory="Commercial Equipment Removal"
      serviceArea={['Evansville, IN', 'Newburgh, IN', 'Henderson, KY', 'Owensboro, KY']}
    >
      <div className="prose max-w-none">
        <h2>Specialized Restaurant Equipment Removal</h2>
        <p>
          Restaurant equipment removal requires specialized knowledge and equipment. Our team
          understands the unique challenges of commercial kitchen equipment including size, weight,
          utility connections, and proper disposal methods.
        </p>

        <h3>Equipment We Regularly Remove</h3>
        <ul>
          <li>
            <strong>Cooking Equipment:</strong> Commercial ovens, ranges, fryers, grills, steamers
          </li>
          <li>
            <strong>Refrigeration:</strong> Walk-in coolers, reach-in units, freezers, ice machines
          </li>
          <li>
            <strong>Prep Equipment:</strong> Commercial sinks, prep tables, dishwashers, mixers
          </li>
          <li>
            <strong>Ventilation:</strong> Hood systems, exhaust fans, ductwork (coordination)
          </li>
        </ul>

        <h3>Restaurant Closure Services</h3>
        <p>
          We understand the challenges of restaurant closures and work efficiently to help owners
          and landlords clear spaces quickly for the next tenant or renovation project.
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
