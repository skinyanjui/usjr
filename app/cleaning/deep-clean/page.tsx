import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { BeforeAfterGallery } from '@/components/before-after-gallery'
import { Sparkles, Shield, Clock, CheckCircle, Star, Users, Home } from 'lucide-react'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Deep Cleaning Services in Evansville, IN | Uncle Sam Junk Removal',
  description:
    'Professional deep cleaning services in Evansville using natural products. Comprehensive one-time cleaning for your entire home. Book your deep clean today!',
  keywords:
    'deep cleaning Evansville, house deep cleaning, one-time cleaning, natural cleaning products',
  ...buildCanonicalMetadata('/cleaning/deep-clean', baseUrl),
}

export default function DeepCleaningPage() {
  return (
    <ServicePageTemplate
      title="Deep Cleaning Services"
      description="Comprehensive deep cleaning for your entire home. Our thorough deep cleaning service covers every corner of your home using natural, eco-friendly products. Perfect for spring cleaning, move-ins, or when you need a fresh start."
      theme="green"
      badges={['From $150', '3-5 Hours', 'Natural Products']}
      features={[
        {
          icon: Sparkles,
          title: 'Comprehensive Clean',
          description: 'Every corner of your home gets attention',
        },
        {
          icon: Shield,
          title: 'Natural Products',
          description: 'Safe, eco-friendly cleaning solutions',
        },
        {
          icon: Clock,
          title: 'Thorough Process',
          description: '3-5 hours of detailed cleaning',
        },
        {
          icon: CheckCircle,
          title: 'Quality Guarantee',
          description: '48-hour re-clean guarantee',
        },
      ]}
      steps={[
        {
          icon: Home,
          title: 'Assessment',
          description: 'We assess your home and create a customized cleaning plan',
        },
        {
          icon: Users,
          title: 'Preparation',
          description: 'Set up equipment and organize supplies for efficient cleaning',
        },
        {
          icon: Sparkles,
          title: 'Deep Clean',
          description: 'Systematic room-by-room deep cleaning using natural products',
        },
        {
          icon: Star,
          title: 'Final Check',
          description: 'Quality inspection and walkthrough with you',
        },
      ]}
      pricing={[
        {
          name: 'Small Home',
          price: 'From $150-200',
          description: '1-2 bedrooms, 1-2 bathrooms',
        },
        {
          name: 'Medium Home',
          price: 'From $200-300',
          description: '3-4 bedrooms, 2-3 bathrooms',
        },
        {
          name: 'Large Home',
          price: 'From $300-450',
          description: '5+ bedrooms, 3+ bathrooms',
        },
      ]}
      faqs={[
        {
          question: 'How long does a deep cleaning take?',
          answer:
            "Deep cleaning typically takes 3-5 hours depending on the size of your home and its current condition. We'll provide an accurate time estimate during your quote and can split service over two visits for large homes if preferred.",
        },
        {
          question: "What's the difference between deep cleaning and regular cleaning?",
          answer:
            'Deep cleaning is more thorough and includes areas not covered in regular cleaning like baseboards, ceiling fans, inside appliances, and detailed sanitization of all surfaces. We follow a detailed checklist and can prioritize rooms based on your goals.',
        },
        {
          question: 'Do I need to prepare anything before you arrive?',
          answer:
            'Just clear personal items from surfaces and ensure we have access to all areas. We bring all cleaning supplies and equipment needed for the job. If you have pets, please secure them for their comfort while we clean.',
        },
        {
          question: 'How often should I get a deep cleaning?',
          answer:
            'We recommend deep cleaning 2-4 times per year, or when moving into a new home. Many clients start with deep cleaning then switch to our recurring service. Seasonal deep cleans help keep recurring visits efficient and cost-effective.',
        },
        {
          question: 'Are your cleaning products safe for pets and children?',
          answer:
            'Yes! We exclusively use natural, non-toxic cleaning products that are completely safe for your family and pets. All products are eco-friendly and biodegradable. We also offer fragrance-free options upon request.',
        },
      ]}
    >
      {/* Before/After Gallery Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">See Our Deep Cleaning Results</h2>
            <p className="text-lg text-gray-600">
              Real before and after photos from our deep cleaning services
            </p>
          </div>
          <BeforeAfterGallery limit={6} service="Deep Cleaning" />
        </div>
      </div>
    </ServicePageTemplate>
  )
}
