import { ServicePageTemplate } from '@/components/ui/service-page-template'
import type { Metadata } from 'next'
import {
  Truck,
  Clock,
  DollarSign,
  Package,
  Phone,
  Calendar,
  Trash2,
  CheckCircle,
} from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Dumpster Rental Services',
  category: 'Dumpster Rental',
  price: 'From $349-649',
  benefits: [
    'Same-day delivery',
    'Multiple sizes',
    'Transparent pricing',
    'Flexible rental periods',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/services/dumpster-rental', baseUrl),
}

export default function DumpsterRentalPage() {
  return (
    <ServicePageTemplate
      theme="blue"
      title="Dumpster Rental in Evansville"
      description="Reliable dumpster rental, roll-off container rental, and trash container rental for construction, renovation, and cleanout projects throughout Southern Indiana. Whether you need to rent a dumpster, get a construction dumpster, or order a big trash bin, we offer same-day delivery with transparent pricing."
      heroImage="/dumpster-rental-evansville.png"
      badges={[UNIFORM_OFFERS.SAME_DAY_SERVICE, UNIFORM_OFFERS.UPFRONT_PRICING, 'Multiple Sizes']}
      serviceCategory="Dumpster Rental Service"
      features={[
        {
          icon: Truck,
          title: `${UNIFORM_OFFERS.SAME_DAY_SERVICE} Delivery`,
          description: 'Quick delivery when you need it most',
        },
        {
          icon: Clock,
          title: UNIFORM_OFFERS.FLEXIBLE_SCHEDULING,
          description: 'Keep it as long as you need',
        },
        {
          icon: DollarSign,
          title: UNIFORM_OFFERS.UPFRONT_PRICING,
          description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
        },
        {
          icon: Package,
          title: 'Multiple Sizes Available',
          description: 'Perfect size for any project',
        },
      ]}
      pricing={[
        {
          name: '10 Yard Dumpster',
          price: 'From $299/week',
          description: "Perfect for small projects (12' L × 8' W × 4' H)",
        },
        {
          name: '20 Yard Dumpster',
          price: 'From $399/week',
          description: "Great for medium projects (22' L × 8' W × 4' H)",
        },
        {
          name: '30 Yard Dumpster',
          price: 'From $499/week',
          description: "Ideal for large projects (22' L × 8' W × 6' H)",
        },
        {
          name: '40 Yard Dumpster',
          price: 'From $599/week',
          description: "Maximum capacity (22' L × 8' W × 8' H)",
        },
      ]}
      pricingNote="All prices include delivery, pickup, and disposal fees. Standard 7-day rental period included."
      steps={[
        {
          icon: Phone,
          title: 'Choose Size',
          description:
            "Select the right dumpster size for your project. Not sure? We'll help you choose!",
        },
        {
          icon: Calendar,
          title: 'Schedule Delivery',
          description:
            "We'll deliver your dumpster to your location in Evansville. Same-day delivery available.",
        },
        {
          icon: Trash2,
          title: 'Fill It Up',
          description:
            'Load your debris at your own pace. Keep it for up to 7 days or call for early pickup.',
        },
        {
          icon: CheckCircle,
          title: 'We Pick Up',
          description:
            "We'll pick up your full dumpster and handle all disposal and recycling responsibly.",
        },
      ]}
      faqs={[
        {
          question: 'What size dumpster do I need?',
          answer:
            'It depends on your project size. A 10-yard is perfect for small cleanouts, 20-yard for medium renovations, 30-yard for large projects, and 40-yard for major construction or commercial work.',
        },
        {
          question: 'How long can I keep the dumpster?',
          answer:
            'Our standard rental period is 7 days, but you can keep it longer for an additional daily fee. Call us if you need to extend your rental.',
        },
        {
          question: "What can't I put in the dumpster?",
          answer:
            'Hazardous materials, paint, chemicals, batteries, tires, and appliances with refrigerants are not allowed. Contact us for a complete list of prohibited items.',
        },
        {
          question: `Do you offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} delivery?`,
          answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} delivery throughout Evansville and Southern Indiana, subject to availability. Call us early in the day for best availability.`,
        },
        {
          question: 'Are there any additional fees?',
          answer: `${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR} and disposal fees. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}. Additional fees only apply for extended rental periods or overweight loads.`,
        },
      ]}
      ctaPrimary={`📞 Call ${settings.phone}`}
      ctaSecondary="Get Free Quote"
    />
  )
}
