import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Building, Monitor, FileText, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Office Cleanout Services',
  category: 'Office Cleanout',
  price: 'From $199-899',
  benefits: [
    'Same-day service',
    'Licensed & insured',
    'IT equipment handling',
    'Document disposal',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  ...seoData,
  ...buildCanonicalMetadata('/services/office-cleanouts', baseUrl),
}

export default function OfficeCleanoutsPage() {
  return (
    <ServicePageTemplate
      theme="primary"
      title="Office Cleanouts in Evansville"
      description="Professional office cleanout services for cubicles, desks, IT equipment, and complete office relocations"
      badges={['Same-Day Service', 'IT Equipment Handling', 'Secure Document Disposal']}
      features={[
        {
          icon: Building,
          title: 'Complete Office Cleanouts',
          description: 'Remove cubicles, desks, chairs, filing cabinets, and all office furniture',
        },
        {
          icon: Monitor,
          title: 'IT Equipment Removal',
          description:
            'Safe handling and disposal of computers, servers, printers, and electronics',
        },
        {
          icon: FileText,
          title: 'Secure Document Disposal',
          description: 'Confidential document destruction and secure paper disposal services',
        },
        {
          icon: Clock,
          title: 'Flexible Scheduling',
          description: 'Work around your business hours including evenings and weekends',
        },
      ]}
      pricing={[
        {
          name: 'Small Office (1-5 desks)',
          price: 'From $199-399',
          description: 'Small offices and suites',
        },
        {
          name: 'Medium Office (6-20 desks)',
          price: 'From $399-699',
          description: 'Mid-size office spaces',
        },
        {
          name: 'Large Office (20+ desks)',
          price: 'From $699-899',
          description: 'Large office complexes',
        },
      ]}
      steps={[
        {
          icon: Building,
          title: 'Office Assessment',
          description: 'We evaluate the office space and coordinate with building management.',
        },
        {
          icon: Monitor,
          title: 'IT Equipment Handling',
          description: 'Safe removal of computers, servers, and electronic equipment.',
        },
        {
          icon: FileText,
          title: 'Document Security',
          description: 'Coordinate secure disposal of confidential documents.',
        },
        {
          icon: Clock,
          title: 'Complete Cleanout',
          description: 'Remove all furniture and equipment according to schedule.',
        },
      ]}
      pricingNote="Specialized service for business relocations and office building management."
      ctaPrimary="Get Office Quote"
      ctaSecondary="Call for Business Rates"
      faqs={[
        {
          question: 'Can you handle sensitive IT equipment?',
          answer:
            'Yes, we have experience with IT equipment removal including computers, servers, and networking equipment. We can coordinate with your IT department for data security and proper equipment handling.',
        },
        {
          question: 'Do you provide secure document destruction?',
          answer:
            'We can coordinate secure document disposal services. For highly sensitive documents, we recommend working with certified document destruction services, which we can help arrange.',
        },
        {
          question: 'Can you work outside business hours?',
          answer:
            "Absolutely. We understand business operations can't be interrupted. We frequently work evenings, weekends, and holidays to accommodate office cleanouts without disrupting business.",
        },
        {
          question: 'What happens to office furniture?',
          answer:
            "We work to donate usable office furniture to local non-profits, schools, and charities. Items that can't be donated are recycled or disposed of responsibly.",
        },
      ]}
      serviceCategory="Commercial Cleanout Services"
      serviceArea={['Evansville, IN', 'Newburgh, IN', 'Henderson, KY', 'Owensboro, KY']}
    >
      <div className="prose max-w-none">
        <h2>Professional Office Cleanout Services</h2>
        <p>
          Office relocations, downsizing, and building management require specialized cleanout
          services. Our team understands the unique challenges of office environments including IT
          equipment, sensitive documents, and coordination with building management.
        </p>

        <h3>What We Remove from Offices</h3>
        <ul>
          <li>
            <strong>Furniture:</strong> Cubicles, desks, chairs, conference tables, filing cabinets
          </li>
          <li>
            <strong>IT Equipment:</strong> Computers, monitors, printers, servers, networking
            equipment
          </li>
          <li>
            <strong>Office Supplies:</strong> Paper, binders, supplies, and general office materials
          </li>
          <li>
            <strong>Storage:</strong> File cabinets, storage units, and document archives
          </li>
        </ul>

        <h3>Perfect for Building Managers</h3>
        <p>
          We work closely with building managers and property management companies to ensure smooth
          tenant turnovers and building preparation for new tenants.
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
