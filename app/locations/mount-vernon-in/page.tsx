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
  locationName: 'Mount Vernon',
  state: 'IN',
  neighborhoods: [
    'Downtown Mount Vernon',
    'Poseyville',
    'Griffin',
    'Wadesville',
    'Hovey Lake Area',
  ],
  landmarks: [
    'Posey County Courthouse',
    'Hovey Lake',
    'Ohio River Access',
    'Alex Karras Park',
  ],
  specialOffers: [
    'Save $20 County Seat Discount',
    'No Access Fees Hovey Lake Properties',
    'Save $15 Ohio River Waterfront Special',
  ],
}

const seoData = buildLocationMetadata(locationInfo)

export const metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  openGraph: seoData.openGraph,
  twitter: seoData.twitter,
  ...buildCanonicalMetadata('/locations/mount-vernon-in', baseUrl),
}

export default function MountVernonPage() {
  const data = locationData['mount-vernon-in'] as LocationData
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
          location="Mount Vernon"
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
            location="Mount Vernon"
            showStructuredData={true}
          />
        </div>
      </LocationPageTemplate>


      {/* Related Blog Resources */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">Helpful Guides for Mount Vernon Residents</h2>
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
              <p className="text-muted-foreground text-xs">Expert tips for efficient junk removal serving Mount Vernon and Posey County.</p>
            </a>
            <a
              href="/blog/moving-cleanout-guide-evansville"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Moving Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Moving & Relocation Cleanout Guide</h3>
              <p className="text-muted-foreground text-xs">Complete moving cleanout checklist for Southern Indiana residents.</p>
            </a>
            <a
              href="/blog/junk-removal-cost-tri-state"
              className="bg-card hover:border-primary/50 rounded-lg border p-4 transition-colors"
            >
              <span className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                Pricing Guide
              </span>
              <h3 className="mb-1 text-sm font-semibold">Junk Removal Cost in the Tri-State Area</h3>
              <p className="text-muted-foreground text-xs">Full pricing guide covering Mount Vernon and surrounding Tri-State communities.</p>
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
