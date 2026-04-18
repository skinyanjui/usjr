import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  Truck,
  Phone,
  CheckCircle,
  Calendar,
  Camera,
  Recycle,
  Shield,
  Wrench,
  Warehouse,
  SortAsc,
  Gift,
  Clock,
  Heart,
  Home,
  Users,
  TreePine,
  Leaf,
  Zap,
  Trash2,
  Cloud,
  Package,
  Archive,
  Briefcase,
  Building2,
  Utensils,
  Hammer,
  Boxes,
  Droplet,
  type LucideIcon,
} from 'lucide-react'
import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { ReviewMention } from '@/components/ui/review-mention'
import { StructuredData } from '@/components/structured-data'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'
import { getAggregateTestimonialStats, settings } from '@/lib/cms-content'
import { servicesData, serviceSlugs } from '@/lib/services-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const iconMap: Record<string, LucideIcon> = {
  Truck,
  Phone,
  CheckCircle,
  Calendar,
  Camera,
  Recycle,
  Shield,
  Wrench,
  Warehouse,
  SortAsc,
  Gift,
  Clock,
  Heart,
  Home,
  Users,
  TreePine,
  Leaf,
  Zap,
  Trash2,
  Cloud,
  Package,
  Archive,
  Briefcase,
  Building2,
  Utensils,
  Hammer,
  Boxes,
  Droplet,
}

const resolveIcon = (name: string): LucideIcon => iconMap[name] ?? CheckCircle

export function generateStaticParams() {
  return serviceSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = servicesData[slug]
  if (!config) return {}

  const seoData = buildServiceMetadata(config.serviceInfo, 'Evansville, IN')
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    ...buildCanonicalMetadata(`/services/${slug}`, baseUrl),
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = servicesData[slug]
  if (!config) notFound()

  const testimonialStats = getAggregateTestimonialStats()
  const seoData = buildServiceMetadata(config.serviceInfo, 'Evansville, IN')

  const templateProps = {
    theme: 'primary' as const,
    title: config.title,
    description: config.description,
    features: config.features.map(f => ({
      icon: resolveIcon(f.iconName),
      title: f.title,
      description: f.description,
    })),
    steps: config.steps.map(s => ({
      icon: resolveIcon(s.iconName),
      title: s.title,
      description: s.description,
    })),
    pricing: config.pricing,
    faqs: config.faqs,
    ...(config.badges && { badges: config.badges }),
    ...(config.serviceCategory && { serviceCategory: config.serviceCategory }),
    ...(config.relatedContent && { relatedContent: config.relatedContent }),
  }

  return (
    <ServicePageTemplate {...templateProps}>
      {config.showReviewMention && (
        <div className="bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <ReviewMention
              averageRating={testimonialStats.averageRating}
              reviewCount={testimonialStats.reviewCount}
              variant="detailed"
              theme="primary"
              location="Evansville"
              showStructuredData={false}
            />
          </div>
        </div>
      )}

      <StructuredData
        type="Service"
        data={{
          name: config.serviceInfo.serviceName,
          description: seoData.description,
          price: config.serviceInfo.price,
          category: config.serviceInfo.category,
          serviceArea: settings.serviceAreas,
        }}
      />
    </ServicePageTemplate>
  )
}
