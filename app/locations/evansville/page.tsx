import { settings, getAggregateTestimonialStats } from '@/lib/cms-content'
import {
  LocationPageTemplate,
  LocationPageTemplateProps,
} from '@/components/ui/location-page-template'
import { locationData, LocationData } from '@/lib/location-data'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildLocationMetadata, buildSocialMetadata } from '@/lib/seo-metadata'
import { PromotionHighlight } from '@/components/ui/promotion-highlight'
import { ReviewMention } from '@/components/ui/review-mention'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const locationInfo = {
  locationName: 'Evansville',
  state: 'IN',
  neighborhoods: ["Haynie's Corner", 'Jacobsville', 'Lincolnshire', 'McCutchanville'],
  landmarks: [
    'Downtown Evansville',
    'University of Evansville',
    'Eastland Mall',
    'Wesselman Woods',
  ],
  specialOffers: ['15% University Discount', '$35 Curbside Special', '$25 Referral Credit'],
}

const seoData = buildLocationMetadata(locationInfo)

export const metadata = {
  title: seoData.title,
  description: seoData.description,
  ...buildSocialMetadata({
    title: seoData.title,
    description: seoData.description,
    pathname: '/locations/evansville',
    type: 'website',
  }),
  ...buildCanonicalMetadata('/locations/evansville', baseUrl),
}

export default function EvansvillePage() {
  const data = locationData['evansville'] as LocationData
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
    ctaSecondary: 'Text Photos for Instant Quote',
  }

  if (data.neighborhoods) {
    templateProps.neighborhoods = data.neighborhoods
  }

  if (data.disposalNote) {
    templateProps.disposalNote = data.disposalNote
  }

  return (
    <>
      <LocationPageTemplate {...templateProps}>
        {/* Enhanced promotion highlighting with structured data */}
        <PromotionHighlight
          location="Evansville"
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

        {/* Review mentions with structured data */}
        <div className="py-8">
          <ReviewMention
            averageRating={testimonialStats.averageRating}
            reviewCount={testimonialStats.reviewCount}
            variant="banner"
            theme={data.theme}
            location="Evansville"
            showStructuredData={true}
          />
        </div>
      </LocationPageTemplate>

      {/* Enhanced structured data for location-specific business */}
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
