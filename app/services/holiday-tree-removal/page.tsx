import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { TreePine, Leaf, Calendar, Recycle } from 'lucide-react'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { settings } from '@/lib/cms-content'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Holiday Tree Removal Services',
  category: 'Holiday Tree Removal',
  price: 'From $49-149',
  benefits: [
    'Same-day service',
    'Christmas tree removal',
    'Eco-friendly disposal',
    'Seasonal scheduling',
  ],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  ...seoData,
  ...buildCanonicalMetadata('/services/holiday-tree-removal', baseUrl),
}

const relatedContent = [
  {
    title: 'Fall Cleanup Checklist for Tri-State Homeowners',
    href: '/blog/fall-cleanup-checklist-tri-state',
    description:
      'Seasonal cleanup guide including outdoor equipment storage and winterization tips.',
    type: 'blog' as const,
    category: 'Seasonal Tips',
  },
  {
    title: 'Yard Waste Disposal in Evansville',
    href: '/blog/yard-waste-disposal-evansville',
    description:
      'Eco-friendly ways to handle yard and organic waste in Evansville, including composting options.',
    type: 'blog' as const,
    category: 'Yard Waste',
  },
  {
    title: 'Yard Waste Removal',
    href: '/services/yard-waste-removal',
    description: 'Branch, brush, and organic debris removal paired with holiday tree pickup.',
    type: 'service' as const,
    category: 'Related Service',
  },
  {
    title: 'Junk Removal Services',
    href: '/services/junk-removal',
    description: 'Full-service junk removal for all post-holiday cleanup needs.',
    type: 'service' as const,
    category: 'Related Service',
  },
]

export default function HolidayTreeRemovalPage() {
  return (
    <ServicePageTemplate
      theme="primary"
      title="Holiday Tree Removal in Evansville"
      description="Convenient Christmas tree removal and seasonal landscaping cleanup services"
      badges={['Seasonal Service', 'Eco-Friendly Disposal', 'Christmas Specialists']}
      relatedContent={relatedContent}
      features={[
        {
          icon: TreePine,
          title: 'Christmas Tree Removal',
          description: 'Quick and easy removal of Christmas trees from your home',
        },
        {
          icon: Calendar,
          title: 'Seasonal Scheduling',
          description: 'Convenient scheduling during peak holiday seasons and post-holiday cleanup',
        },
        {
          icon: Leaf,
          title: 'Landscaping Cleanup',
          description: 'Seasonal yard cleanup and landscaping debris removal',
        },
        {
          icon: Recycle,
          title: 'Eco-Friendly Disposal',
          description: 'Trees are chipped for mulch or composted, not sent to landfills',
        },
      ]}
      pricing={[
        {
          name: 'Single Christmas Tree',
          price: 'From $49-79',
          description: 'Standard size Christmas trees',
        },
        {
          name: 'Large Tree + Cleanup',
          price: 'From $79-119',
          description: 'Large trees with needle cleanup',
        },
        {
          name: 'Multiple Trees/Seasonal',
          price: 'From $119-149',
          description: 'Multiple trees or seasonal cleanup',
        },
      ]}
      steps={[
        {
          icon: Calendar,
          title: 'Easy Scheduling',
          description: 'Schedule your tree removal during peak holiday season.',
        },
        {
          icon: TreePine,
          title: 'Safe Tree Removal',
          description: 'Careful removal of Christmas trees from any location in your home.',
        },
        {
          icon: Leaf,
          title: 'Complete Cleanup',
          description: 'Clean up all fallen needles and holiday debris.',
        },
        {
          icon: Recycle,
          title: 'Eco-Friendly Disposal',
          description: 'Trees are chipped for mulch or composted, never sent to landfills.',
        },
      ]}
      pricingNote="Popular seasonal service especially during post-Christmas cleanup season."
      ctaPrimary="Schedule Tree Removal"
      ctaSecondary="Call for Seasonal Service"
      faqs={[
        {
          question: 'When is the best time to schedule Christmas tree removal?',
          answer:
            "We're busiest the week after Christmas through mid-January. For best availability, schedule your tree removal before January 2nd or be flexible with scheduling during peak season.",
        },
        {
          question: 'Do you clean up the needles?',
          answer:
            'Yes, our standard tree removal includes cleaning up fallen needles around the tree area. We bring the necessary equipment to ensure your home is left clean.',
        },
        {
          question: 'What happens to the Christmas trees?',
          answer:
            "All trees are recycled responsibly. They're typically chipped for mulch or composted. We never send Christmas trees to landfills - they're 100% biodegradable and recyclable.",
        },
        {
          question: 'Can you remove trees from upper floors?',
          answer:
            'Yes, we can safely remove trees from second floors, apartments, and condos. Our team has experience navigating stairs and tight spaces.',
        },
      ]}
      serviceCategory="Seasonal Services"
      serviceArea={['Evansville, IN', 'Newburgh, IN', 'Henderson, KY', 'Owensboro, KY']}
    >
      <div className="prose max-w-none">
        <h2>Convenient Holiday Tree Removal</h2>
        <p>
          Nobody wants to deal with removing a dried-out Christmas tree after the holidays. Our
          holiday tree removal service makes post-Christmas cleanup easy and convenient, so you can
          focus on getting back to your regular routine.
        </p>

        <h3>Our Holiday Services Include</h3>
        <ul>
          <li>
            <strong>Christmas Tree Removal:</strong> Safe removal of trees from any location in your
            home
          </li>
          <li>
            <strong>Needle Cleanup:</strong> Complete cleanup of fallen needles and debris
          </li>
          <li>
            <strong>Seasonal Landscaping:</strong> Winter cleanup and seasonal yard preparation
          </li>
          <li>
            <strong>Multiple Tree Service:</strong> Discounts for multiple trees or annual service
          </li>
        </ul>

        <h3>Peak Season Scheduling</h3>
        <p>
          Our holiday tree removal service is especially popular during Christmas season and
          landscaping seasons. We recommend scheduling early for best availability during peak
          times.
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
