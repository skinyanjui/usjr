import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { settings, getAggregateTestimonialStats } from '@/lib/cms-content'
import {
  LocationPageTemplate,
  LocationPageTemplateProps,
} from '@/components/ui/location-page-template'
import { locationData } from '@/lib/location-data'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildLocationMetadata } from '@/lib/seo-metadata'
import { PromotionHighlight } from '@/components/ui/promotion-highlight'
import { ReviewMention } from '@/components/ui/review-mention'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export function generateStaticParams() {
  return Object.keys(locationData).map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = locationData[slug]
  if (!data) return {}

  const seoData = buildLocationMetadata({
    locationName: data.locationName,
    state: data.state,
    ...(data.neighborhoods && { neighborhoods: data.neighborhoods }),
    landmarks: data.landmarks,
    specialOffers: data.offers.map(o => o.title),
  })

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    ...buildCanonicalMetadata(`/locations/${slug}`, baseUrl),
  }
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = locationData[slug]
  if (!data) notFound()

  const testimonialStats = getAggregateTestimonialStats()

  const templateProps: LocationPageTemplateProps = {
    locationName: data.locationName,
    state: data.state,
    tagline: data.tagline,
    theme: data.theme,
    features: data.features,
    landmarks: data.landmarks,
    offers: data.offers,
    stories: data.stories,
    serviceGuarantee: data.serviceGuarantee,
    ctaPrimary: `📞 Call ${settings.phone}`,
    ctaSecondary: 'Get Free Quote',
  }

  if (data.neighborhoods) templateProps.neighborhoods = data.neighborhoods
  if (data.disposalNote) templateProps.disposalNote = data.disposalNote

  return (
    <>
      <LocationPageTemplate {...templateProps}>
        {data.offers.length > 0 && (
          <PromotionHighlight
            location={data.locationName}
            offers={data.offers.map(offer => ({
              title: offer.title,
              discount: offer.discount,
              description: offer.description,
              validFrom: offer.validFrom,
              validThrough: offer.validThrough,
              locationSpecific: true,
            }))}
            theme={data.theme}
            showStructuredData={true}
          />
        )}
        <div className="py-8">
          <ReviewMention
            averageRating={testimonialStats.averageRating}
            reviewCount={testimonialStats.reviewCount}
            variant="banner"
            theme={data.theme}
            location={data.locationName}
            showStructuredData={true}
          />
        </div>
      </LocationPageTemplate>

      <StructuredData
        type="LocalBusiness"
        data={{
          locationName: data.locationName,
          locationOffers: data.offers,
          reviews: {
            averageRating: testimonialStats.averageRating,
            reviewCount: testimonialStats.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }}
      />
    </>
  )
}
