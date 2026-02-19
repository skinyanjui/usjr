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
  locationName: 'New Harmony',
  state: 'IN',
  neighborhoods: [
    'Historic District',
    'Near Harmonie State Park',
    'Poseyville',
    'Crossville',
    'Solitude',
  ],
  landmarks: [
    'Harmonie State Park',
    'Roofless Church',
    'Atheneum Visitor Center',
    'Wabash River Overlook',
  ],
  specialOffers: [
    '10% Off Historic Preservation Discount',
    'Save $15 State Park Visitor Special',
    'Extra $10 Off Community Donation Bonus',
  ],
}

const seoData = buildLocationMetadata(locationInfo)

export const metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  openGraph: seoData.openGraph,
  twitter: seoData.twitter,
  ...buildCanonicalMetadata('/locations/new-harmony-in', baseUrl),
}

export default function NewHarmonyPage() {
  const data = locationData['new-harmony-in'] as LocationData
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
    ctaSecondary: 'Text Photos for Quote',
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
          location="New Harmony"
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
            location="New Harmony"
            showStructuredData={true}
          />
        </div>
      </LocationPageTemplate>


      {/* Related Blog Resources */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">Helpful Guides for New Harmony Residents</h2>
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
              <h3 className="mb-1 text-sm font-semibold">Junk Removal Tips for Southern Indiana</h3>
              <p className="text-muted-foreground text-xs">Expert tips for efficient junk removal serving New Harmony and Posey County.</p>
            </a>
            <a
              href="/blog/yard-waste-disposal-evansville"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Yard Waste
              </span>
              <h3 className="mb-1 text-sm font-semibold">Yard Waste Disposal in the Evansville Area</h3>
              <p className="text-muted-foreground text-xs">Eco-friendly yard waste removal options for rural Southern Indiana properties.</p>
            </a>
            <a
              href="/blog/junk-removal-cost-tri-state"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Pricing Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Junk Removal Cost in the Tri-State Area</h3>
              <p className="text-muted-foreground text-xs">Complete pricing breakdown for junk removal in New Harmony and surrounding areas.</p>
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
