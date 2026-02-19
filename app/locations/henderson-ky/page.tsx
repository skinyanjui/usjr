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
  locationName: 'Henderson',
  state: 'KY',
  neighborhoods: ['Downtown Henderson', 'North Henderson', 'East Henderson', 'Geneva', 'Alves'],
  landmarks: [
    'Audubon State Park',
    'Henderson Riverfront',
    'Ellis Park Racing',
    'John James Audubon Museum',
  ],
  specialOffers: [
    'Save $30 Cross-State Discount',
    'No Travel Fees Riverfront Properties',
    '10% Off Near Audubon Park',
  ],
}

const seoData = buildLocationMetadata(locationInfo)

export const metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  openGraph: seoData.openGraph,
  twitter: seoData.twitter,
  robots: 'index, follow',
  ...buildCanonicalMetadata('/locations/henderson-ky', baseUrl),
}

export default function HendersonPage() {
  const data = locationData['henderson-ky'] as LocationData
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
    ctaSecondary: 'Get Free Henderson Quote',
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
        <PromotionHighlight
          location="Henderson"
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

        <div className="py-8">
          <ReviewMention
            averageRating={testimonialStats.averageRating}
            reviewCount={testimonialStats.reviewCount}
            variant="banner"
            theme={data.theme}
            location="Henderson"
            showStructuredData={true}
          />
        </div>
      </LocationPageTemplate>


      {/* Related Blog Resources */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">Helpful Guides for Henderson Residents</h2>
          <p className="text-muted-foreground mb-8 text-center">
            Resources to help you plan your next junk removal or cleanup project.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="/blog/fall-cleanup-checklist-tri-state"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Seasonal Tips
              </span>
              <h3 className="mb-1 text-sm font-semibold">Fall Cleanup Checklist for Tri-State Homeowners</h3>
              <p className="text-muted-foreground text-xs">Leaf removal, gutter cleaning, and storm prep for Henderson and the Tri-State.</p>
            </a>
            <a
              href="/blog/winter-storm-cleanup-guide-tri-state"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Emergency Services
              </span>
              <h3 className="mb-1 text-sm font-semibold">Winter Storm Cleanup Guide for Tri-State Homeowners</h3>
              <p className="text-muted-foreground text-xs">Ice storm recovery, snow removal, and debris cleanup for Henderson, KY.</p>
            </a>
            <a
              href="/blog/junk-removal-cost-tri-state"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Pricing Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Junk Removal Cost in the Tri-State Area</h3>
              <p className="text-muted-foreground text-xs">Full pricing breakdown for Henderson, KY and surrounding communities.</p>
            </a>
          </div>
        </div>
      </section>

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
