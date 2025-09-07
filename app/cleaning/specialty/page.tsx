import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Refrigerator, Package, Sparkles, CheckCircle, Users, Star } from 'lucide-react'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Specialty Cleaning Services in Evansville, IN | Uncle Sam Junk Removal',
  description:
    'Specialized cleaning services in Evansville: refrigerator cleaning, oven cleaning, organizing, and decluttering. Natural products and professional results.',
  keywords:
    'specialty cleaning Evansville, refrigerator cleaning, oven cleaning, home organizing, decluttering services',
  ...buildCanonicalMetadata('/cleaning/specialty', baseUrl),
}

export default function SpecialtyCleaningPage() {
  return (
    <ServicePageTemplate
      title="Specialty Cleaning Services"
      description="Specialized cleaning and organizing services. Professional specialty cleaning services in Evansville including refrigerator cleaning, oven deep cleaning, home organizing, and decluttering using natural, eco-friendly products."
      heroImage="/natural-cleaning-organizing.png"
      theme="orange"
      badges={['From $75', 'Natural Products', 'Professional Results']}
      features={[
        {
          icon: Refrigerator,
          title: 'Appliance Cleaning',
          description: 'Deep cleaning for refrigerators, ovens, and appliances',
        },
        {
          icon: Package,
          title: 'Home Organizing',
          description: 'Professional organizing and space optimization',
        },
        {
          icon: Sparkles,
          title: 'Decluttering',
          description: 'Comprehensive decluttering and donation coordination',
        },
        {
          icon: CheckCircle,
          title: 'Natural Products',
          description: 'Food-safe, eco-friendly cleaning solutions',
        },
      ]}
      steps={[
        {
          icon: Users,
          title: 'Consultation',
          description: 'Assess your specific needs and create a custom plan',
        },
        {
          icon: Package,
          title: 'Preparation',
          description: 'Gather specialized tools and supplies for your service',
        },
        {
          icon: Sparkles,
          title: 'Execute',
          description: 'Professional service using specialized techniques',
        },
        {
          icon: Star,
          title: 'Follow-up',
          description: 'Provide maintenance tips and schedule follow-ups',
        },
      ]}
      pricing={[
        {
          name: 'Appliance Cleaning',
          price: 'From $75-85',
          description: 'Refrigerator or oven deep cleaning service',
        },
        {
          name: 'Home Organizing',
          price: 'From $100-150',
          description: 'Professional organizing and space optimization',
        },
        {
          name: 'Decluttering',
          price: 'From $120-200',
          description: 'Comprehensive decluttering with donation coordination',
        },
      ]}
      faqs={[
        {
          question: 'How long do specialty cleaning services take?',
          answer:
            'Service time varies by task: refrigerator cleaning takes 1-2 hours, oven cleaning 2-3 hours, organizing 3-4 hours, and decluttering 4-6 hours depending on the scope. We’ll provide a time estimate with your quote and adjust as needed on-site.',
        },
        {
          question: 'Do you provide organizing supplies?',
          answer:
            'We bring basic organizing supplies like labels and small containers. For larger storage solutions, we can recommend products or you can provide specific items you prefer. We can also help source bins and shelving if requested in advance.',
        },
        {
          question: 'What happens to items during decluttering?',
          answer:
            'We sort items into keep, donate, and discard categories. We can coordinate donation pickups with local charities and provide documentation for tax purposes. Sensitive documents or items are handled per your instructions with secure disposal options available.',
        },
        {
          question: 'Are your cleaning products safe for food areas?',
          answer:
            'We use only food-safe, natural cleaning products for refrigerator and oven cleaning. All products are non-toxic and leave no harmful residues. SDS sheets are available upon request for all products used.',
        },
        {
          question: 'Can I combine specialty services?',
          answer:
            'Yes! Many clients combine services like refrigerator cleaning with organizing, or oven cleaning with kitchen decluttering. We offer package discounts for multiple services and can schedule them consecutively for minimal disruption.',
        },
      ]}
    />
  )
}
