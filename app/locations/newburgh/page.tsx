import { settings, getAggregateTestimonialStats } from '@/lib/cms-content'
import {
  LocationPageTemplate,
  LocationPageTemplateProps,
} from '@/components/ui/location-page-template'
import { locationData, LocationData } from '@/lib/location-data'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildLocationMetadata } from '@/lib/seo-metadata'
import { PromotionHighlight } from '@/components/ui/promotion-highlight'
import { ReviewMention } from '@/components/ui/review-mention'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const locationInfo = {
  locationName: 'Newburgh',
  state: 'IN',
  neighborhoods: [
    'Historic Downtown Newburgh',
    'Chandler',
    'Lynnville',
    'Tennyson',
    'Yankeetown',
    'Elberfeld',
  ],
  landmarks: [
    'Historic Downtown Newburgh',
    'Newburgh Riverfront',
    'Castle High School',
    'Newburgh Lock and Dam',
    'Ohio River Scenic Byway',
    'Friedman Park',
  ],
  specialOffers: [
    'Save $20 Historic District Special',
    'No Extra Fees Riverfront Pickup',
    'Same-Day Service Available',
  ],
}

const seoData = buildLocationMetadata(locationInfo)

export const metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  openGraph: seoData.openGraph,
  twitter: seoData.twitter,
  ...buildCanonicalMetadata('/locations/newburgh', baseUrl),
}

export default function NewburghPage() {
  const data = locationData['newburgh'] as LocationData
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
    ctaSecondary: 'Schedule Newburgh Pickup',
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
          location="Newburgh"
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
            location="Newburgh"
            showStructuredData={true}
          />
        </div>
      </LocationPageTemplate>


      {/* Related Blog Resources */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">Helpful Guides for Newburgh Residents</h2>
          <p className="text-muted-foreground mb-8 text-center">
            Resources to help you plan your next junk removal or cleanup project.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="/blog/evansville-junk-removal-tips"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Local Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Junk Removal Tips for the Evansville Area</h3>
              <p className="text-muted-foreground text-xs">Expert tips for efficient junk removal serving Newburgh and Evansville.</p>
            </a>
            <a
              href="/blog/evansville-garage-cleanout-48-hours"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                How-To Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Garage Cleanout in 48 Hours</h3>
              <p className="text-muted-foreground text-xs">Step-by-step timeline and checklist for a complete garage cleanout.</p>
            </a>
            <a
              href="/blog/junk-removal-cost-tri-state"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Pricing Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Junk Removal Cost in the Tri-State Area</h3>
              <p className="text-muted-foreground text-xs">Complete pricing guide for junk removal in Newburgh and surrounding areas.</p>
            </a>
          </div>
        </div>
      </section>

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
