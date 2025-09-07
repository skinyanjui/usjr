import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Home, Truck, Shield, CheckCircle, Calendar, Users, Star } from 'lucide-react'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Move-In/Move-Out Cleaning Services in Evansville, IN | Uncle Sam Junk Removal',
  description:
    'Professional move-in and move-out cleaning services in Evansville. Complete property cleaning for transitions using natural products. Book your move cleaning today!',
  keywords:
    'move-in cleaning Evansville, move-out cleaning, property cleaning, transition cleaning, natural products',
  ...buildCanonicalMetadata('/cleaning/move-in-move-out', baseUrl),
}

export default function MoveInMoveOutPage() {
  return (
    <ServicePageTemplate
      title="Move-In/Move-Out Cleaning"
      description="Complete property cleaning for life transitions. Professional move-in and move-out cleaning services in Evansville. Deep cleaning for fresh starts and maximum deposit returns using natural, eco-friendly products."
      heroImage="/natural-cleaning-service.png"
      theme="purple"
      badges={['From $200', '4-6 Hours', 'Natural Products']}
      features={[
        {
          icon: Home,
          title: 'Fresh Start',
          description: 'Start fresh in a spotless, sanitized home',
        },
        {
          icon: Truck,
          title: 'Deposit Return',
          description: 'Maximize security deposit return with thorough cleaning',
        },
        {
          icon: Shield,
          title: 'Documentation',
          description: 'Professional cleaning documentation provided',
        },
        {
          icon: CheckCircle,
          title: 'Complete Service',
          description: 'All deep cleaning services included',
        },
      ]}
      steps={[
        {
          icon: Calendar,
          title: 'Schedule',
          description: 'Book your move cleaning 1-2 weeks in advance',
        },
        {
          icon: Users,
          title: 'Coordinate',
          description: 'We coordinate timing with your moving schedule',
        },
        {
          icon: Home,
          title: 'Deep Clean',
          description: 'Comprehensive cleaning of the entire property',
        },
        {
          icon: Star,
          title: 'Document',
          description: 'Provide cleaning checklist and photos if needed',
        },
      ]}
      pricing={[
        {
          name: 'Small Property',
          price: 'From $200-300',
          description: '1-2 bedrooms, 1-2 bathrooms',
        },
        {
          name: 'Medium Property',
          price: 'From $300-450',
          description: '3-4 bedrooms, 2-3 bathrooms',
        },
        {
          name: 'Large Property',
          price: 'From $450-650',
          description: '5+ bedrooms, 3+ bathrooms',
        },
      ]}
      faqs={[
        {
          question: 'How far in advance should I book move-in/move-out cleaning?',
          answer:
            'We recommend booking 1-2 weeks in advance, especially during peak moving seasons (summer months). However, we can often accommodate last-minute requests with 24-48 hours notice. For same-day move-outs, call early for priority scheduling.',
        },
        {
          question: 'Do you clean inside appliances?',
          answer:
            "Yes! Move-in/move-out cleaning includes deep cleaning inside the oven, refrigerator, and other appliances. We also clean cabinet interiors when they're empty. If requested, we can provide photos of cleaned areas for documentation.",
        },
        {
          question: "What if the property isn't completely empty?",
          answer:
            "We can work around remaining items, but for the most thorough cleaning, we recommend the property be as empty as possible. We'll discuss specific needs during your quote and can coordinate with your movers to avoid overlap.",
        },
        {
          question: 'Do you provide cleaning documentation for landlords?',
          answer:
            'Yes! We provide detailed cleaning checklists and can coordinate with property managers or landlords to ensure all requirements are met for deposit returns. We can also complete any required move-out forms if provided in advance.',
        },
        {
          question: 'How long does move-in/move-out cleaning take?',
          answer:
            "Typically 4-6 hours depending on property size and condition. We'll provide an accurate time estimate during your quote based on specific property details. Larger properties can be split across multiple cleaners for faster turnaround.",
        },
      ]}
    />
  )
}
