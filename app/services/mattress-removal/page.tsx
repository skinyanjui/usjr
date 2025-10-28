import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Truck, Phone, CheckCircle, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'
import { InternalLinks } from '@/components/ui/internal-links'
import { ReviewMention } from '@/components/ui/review-mention'
import { getAggregateTestimonialStats } from '@/lib/cms-content'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Mattress Removal Services',
  category: 'Mattress Removal',
  price: 'From $89-229',
  benefits: ['Same-day service', 'Licensed & insured', 'Eco-friendly disposal', 'No hidden fees'],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/services/mattress-removal', baseUrl),
}

export default function MattressRemovalPage() {
  const testimonialStats = getAggregateTestimonialStats()

  const relatedContent = [
    {
      title: 'Mattress Disposal Guide',
      href: '/blog/mattress-disposal-evansville',
      description:
        'Complete guide to mattress disposal in Evansville. Learn about recycling options and disposal regulations.',
      type: 'blog' as const,
      category: 'Local Guide',
    },
    {
      title: 'Junk Removal Services',
      href: '/services/junk-removal',
      description:
        'Full-service junk removal for all household items including furniture, appliances, and more.',
      type: 'service' as const,
      category: 'Related Service',
    },
    {
      title: 'Appliance Removal',
      href: '/services/appliance-removal',
      description:
        'Professional appliance removal service for refrigerators, washers, dryers, and other large appliances.',
      type: 'service' as const,
      category: 'Related Service',
    },
    {
      title: 'Estate Cleanouts',
      href: '/services/estate-cleanouts',
      description:
        'Comprehensive estate cleanout services for inherited properties and downsizing projects.',
      type: 'service' as const,
      category: 'Related Service',
    },
  ]

  return (
    <ServicePageTemplate
      theme="primary"
      title="Mattress Removal Services in Evansville"
      description="Fast, reliable mattress removal, bed disposal, and old mattress pickup throughout Southern Indiana. Whether you need to get rid of an old mattress, dispose of box springs, or remove an entire bedroom set, we provide same-day service with upfront pricing and eco-friendly disposal methods."
      badges={[
        UNIFORM_OFFERS.SAME_DAY_SERVICE,
        UNIFORM_OFFERS.LICENSED_INSURED,
        UNIFORM_OFFERS.ECO_FRIENDLY,
      ]}
      serviceCategory="Mattress Removal Service"
      features={[
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.LICENSED_INSURED,
          description: 'Fully licensed and insured for your protection',
        },
        {
          icon: Calendar,
          title: UNIFORM_OFFERS.SAME_DAY_SERVICE,
          description: 'Call or text for same-day pickup',
        },
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.ECO_FRIENDLY,
          description: 'Materials are recycled or donated when possible',
        },
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.UPFRONT_PRICING,
          description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
        },
      ]}
      steps={[
        {
          icon: Phone,
          title: 'Schedule',
          description:
            'Call us or text photos for a free estimate. We offer same-day and next-day appointments throughout Evansville.',
        },
        {
          icon: Truck,
          title: 'We Arrive',
          description:
            'Our professional team arrives on time, provides upfront pricing, and handles all the heavy lifting from any location in your home.',
        },
        {
          icon: CheckCircle,
          title: 'We Remove & Recycle',
          description:
            'We remove your mattress, box spring, and bed frame, then dispose of everything responsibly through recycling and proper facilities.',
        },
      ]}
      pricing={[
        {
          name: 'Single Mattress',
          price: 'From $89-129',
          description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM,
        },
        {
          name: 'Mattress + Box Spring',
          price: 'From $119-179',
          description: 'Great for bedroom updates',
        },
        {
          name: 'Full Bedroom Set',
          price: 'From $149-229',
          description: 'Complete bed removal service',
        },
      ]}
      faqs={[
        {
          question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for mattress removal?`,
          answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas, subject to availability.`,
        },
        {
          question: 'Do you remove mattresses from upstairs bedrooms?',
          answer:
            'Yes, we remove mattresses from any location including upstairs bedrooms, basements, and tight spaces. Our team handles all the heavy lifting and navigation.',
        },
        {
          question: 'How do you price mattress removal services?',
          answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
        },
        {
          question: 'Can you remove stained or damaged mattresses?',
          answer:
            'Yes, we remove mattresses in any condition including stained, torn, or water-damaged. We follow proper sanitation protocols and disposal methods for all mattresses.',
        },
        {
          question: 'What happens to my old mattress after removal?',
          answer:
            'We partner with local recycling facilities to break down mattresses into component materials. Springs, foam, and fabric are recycled when possible. Unusable materials go to certified disposal facilities.',
        },
      ]}
    >
      {/* Customer reviews section */}
      <div className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <ReviewMention
            averageRating={testimonialStats.averageRating}
            reviewCount={testimonialStats.reviewCount}
            variant="detailed"
            theme="primary"
            location="Evansville"
            showStructuredData={false} // Avoid duplicate structured data
          />
        </div>
      </div>

      {/* Internal linking section */}
      <div className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <InternalLinks
            title="Related Services & Helpful Resources"
            links={relatedContent}
            variant="grid"
            theme="primary"
          />
        </div>
      </div>
    </ServicePageTemplate>
  )
}
