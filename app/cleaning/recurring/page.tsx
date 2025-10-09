import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Calendar, Users, Shield, CheckCircle, Star, Home } from 'lucide-react'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Recurring Cleaning Services in Evansville, IN | Uncle Sam Junk Removal',
  description:
    'Weekly, bi-weekly, and monthly recurring cleaning services in Evansville. Consistent team, natural products, flexible scheduling. Book your recurring service today!',
  keywords:
    'recurring cleaning Evansville, weekly cleaning, bi-weekly cleaning, monthly cleaning, maid service',
  ...buildCanonicalMetadata('/cleaning/recurring', baseUrl),
}

export default function RecurringCleaningPage() {
  return (
    <ServicePageTemplate
      title="Recurring Cleaning Services"
      description="Consistent, reliable home cleaning service. Weekly, bi-weekly, or monthly cleaning services with the same trusted team. Natural products, flexible scheduling, and consistent results you can count on."
      theme="green"
      badges={['From $80', 'Same Team', 'Natural Products']}
      features={[
        {
          icon: Users,
          title: 'Same Team',
          description: 'Consistent cleaning team builds familiarity with your home',
        },
        {
          icon: Calendar,
          title: 'Flexible Scheduling',
          description: 'Easy rescheduling with 24-hour notice',
        },
        {
          icon: Shield,
          title: 'Quality Guarantee',
          description: '48-hour re-clean guarantee on every visit',
        },
        {
          icon: CheckCircle,
          title: 'Natural Products',
          description: 'Safe, eco-friendly cleaning solutions only',
        },
      ]}
      steps={[
        {
          icon: Calendar,
          title: 'Choose Schedule',
          description: 'Select weekly, bi-weekly, or monthly cleaning',
        },
        {
          icon: Users,
          title: 'Meet Your Team',
          description: 'We assign a consistent team to your home',
        },
        {
          icon: Home,
          title: 'Regular Service',
          description: 'Consistent cleaning on your chosen schedule',
        },
        {
          icon: Star,
          title: 'Enjoy',
          description: 'Relax knowing your home is always clean',
        },
      ]}
      pricing={[
        {
          name: 'Weekly Cleaning',
          price: 'From $80-100',
          description: 'Perfect for busy families and high-traffic homes',
        },
        {
          name: 'Bi-Weekly Cleaning',
          price: 'From $100-140',
          description: 'Most popular option for regular maintenance',
        },
        {
          name: 'Monthly Cleaning',
          price: 'From $120-180',
          description: 'Great for maintaining already clean homes',
        },
      ]}
      faqs={[
        {
          question: 'Can I change my cleaning frequency?',
          answer:
            "You can adjust your cleaning frequency at any time. Many clients start with weekly service and switch to bi-weekly once their home reaches a maintenance level. We'll review your schedule every few visits to ensure it still fits your needs.",
        },
        {
          question: 'What if I need to reschedule a cleaning?',
          answer:
            'We offer flexible rescheduling with 24-hour notice. We understand life happens and will work with you to find a convenient alternative time. Same-day reschedules are accommodated when availability allows.',
        },
        {
          question: 'Will I have the same cleaning team each time?',
          answer:
            'Yes! We assign a consistent team to your home so they become familiar with your preferences and cleaning needs. This ensures better results and builds trust. If a team member is out, we brief replacements using your documented preferences.',
        },
        {
          question: "What happens if I'm not home during cleaning?",
          answer:
            "Many of our recurring clients provide us with access and aren't home during cleaning. We're fully insured and bonded, and you can track our progress remotely. We can use door codes, lockboxes, or pick up keys at your leasing office if approved.",
        },
        {
          question: 'Do you offer discounts for recurring service?',
          answer:
            'Yes! Recurring cleaning services are priced lower than one-time cleanings. The more frequent your service, the better the rate since maintenance cleaning is more efficient. Ask about bundled discounts when combining with specialty services.',
        },
      ]}
    />
  )
}
