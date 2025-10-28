import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Home, Key, Users, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Property Management Turnovers',
  category: 'Property Management Turnovers',
  price: 'From $199-799',
  benefits: [
    'Same-day service',
    'Property management coordination',
    'Complete unit clearing',
    'Fast turnaround',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/services/property-management-turnovers', baseUrl),
}

export default function PropertyManagementTurnoversPage() {
  return (
    <ServicePageTemplate
      theme="teal"
      title="Property Management Turnovers in Evansville"
      description="Fast, reliable cleanout services for apartments, evictions, foreclosures, and rental property turnovers"
      badges={['Property Manager Preferred', 'Fast Turnaround', 'Eviction Specialists']}
      features={[
        {
          icon: Home,
          title: 'Complete Unit Cleanouts',
          description: 'Remove all contents from apartments, condos, and rental properties',
        },
        {
          icon: Key,
          title: 'Property Management Coordination',
          description: 'Work directly with property managers for efficient unit turnovers',
        },
        {
          icon: Users,
          title: 'Eviction & Foreclosure Services',
          description: 'Sensitive handling of eviction and foreclosure cleanout situations',
        },
        {
          icon: Clock,
          title: 'Rapid Response',
          description: 'Quick service to minimize vacancy time between tenants',
        },
      ]}
      pricing={[
        { name: 'Studio/1BR Apartment', price: 'From $199-399', description: 'Small rental units' },
        {
          name: '2-3BR Apartment/Home',
          price: 'From $399-599',
          description: 'Standard rental properties',
        },
        {
          name: 'Large Home/Complex',
          price: 'From $599-799',
          description: 'Large properties and houses',
        },
      ]}
      steps={[
        {
          icon: Key,
          title: 'Property Coordination',
          description: 'Work with property managers to schedule and coordinate access.',
        },
        {
          icon: Home,
          title: 'Complete Clearance',
          description: 'Remove all contents from apartments, condos, and rental properties.',
        },
        {
          icon: Users,
          title: 'Legal Compliance',
          description: 'Follow local laws for abandoned property and eviction procedures.',
        },
        {
          icon: Clock,
          title: 'Quick Turnaround',
          description: 'Fast service to minimize vacancy time and prepare for new tenants.',
        },
      ]}
      pricingNote="Volume discounts available for property management companies with multiple units."
      ctaPrimary="Get Property Quote"
      ctaSecondary="Call for Manager Rates"
      faqs={[
        {
          question: 'Do you offer property management discounts?',
          answer:
            'Yes, we provide special pricing for property management companies and landlords with multiple properties or regular cleanout needs. Contact us for volume pricing.',
        },
        {
          question: 'How quickly can you clear a unit?',
          answer:
            'Most units can be cleared within 4-8 hours depending on size and contents. We understand the importance of minimizing vacancy time and offer same-day service when possible.',
        },
        {
          question: 'Can you handle eviction cleanouts?',
          answer:
            'Yes, we frequently work with property managers and court officers for eviction cleanouts. We understand the legal requirements and handle these situations professionally and sensitively.',
        },
        {
          question: 'What about abandoned property laws?',
          answer:
            'We work with property managers to ensure compliance with local abandoned property laws. We can hold items for the required period or coordinate proper disposal according to legal requirements.',
        },
      ]}
      serviceCategory="Property Management Services"
      serviceArea={['Evansville, IN', 'Newburgh, IN', 'Henderson, KY', 'Owensboro, KY']}
    >
      <div className="prose max-w-none">
        <h2>Property Management Turnover Specialists</h2>
        <p>
          Property managers need reliable, fast cleanout services to minimize vacancy time and
          prepare units for new tenants. We specialize in apartment turnovers, eviction cleanouts,
          and foreclosure situations with professional, efficient service.
        </p>

        <h3>Types of Property Turnovers We Handle</h3>
        <ul>
          <li>
            <strong>Standard Turnovers:</strong> Normal tenant move-out cleanouts and preparation
          </li>
          <li>
            <strong>Eviction Cleanouts:</strong> Court-ordered eviction property clearing
          </li>
          <li>
            <strong>Foreclosure Properties:</strong> Bank-owned property cleanouts
          </li>
          <li>
            <strong>Abandoned Properties:</strong> Long-vacant property clearing and preparation
          </li>
        </ul>

        <h3>Why Property Managers Choose Us</h3>
        <p>
          We understand the rental property business and work efficiently to get units rent-ready
          quickly. Our property management partnerships help minimize costs and maximize rental
          income potential.
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
