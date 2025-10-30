import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import QuoteFormClient from './QuoteFormClient'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
import { junkRemovalTiers } from '@/lib/pricing'
import { QuoteServiceCard } from '@/components/ui/quote-service-card'

export const metadata: Metadata = {
  title: 'Free Quote | Uncle Sam Junk Removal - Tri-State Area',
  description:
    'Get free quotes for junk removal, light demolition, and cleaning services in Evansville. Professional, eco-friendly services with transparent pricing and same-day availability.',
  keywords:
    'free quote Evansville, junk removal quote, light demolition quote, cleaning quote, Uncle Sam Junk Removal pricing',
  robots: 'index, follow',
  ...buildCanonicalMetadata('/quote', baseUrl),
}

export default function QuotePage() {
  const lightDemolitionPricing = [
    '• Shed removal up to 120 sq ft: From $399',
    '• Deck or fence tear-out: From $499',
    '• Playset removal: From $299',
    '• Small interior demo projects: Custom quote',
  ]

  return (
    <div className="bg-muted/30 min-h-screen">
      <PageHero
        title="Get Your Free Quote Today"
        description="Professional junk removal, light demolition, and cleaning services in Evansville and Southern Indiana"
        color="primary"
      />
      <div className="px-4 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mt-8 mb-16 text-center">
            <div className="mb-6 flex justify-center gap-2">
              <Badge className="border-border bg-muted text-foreground">
                Eco-Friendly
              </Badge>
              <Badge className="border-border bg-muted text-foreground">
                Fully Insured
              </Badge>
              <Badge className="border-border bg-muted text-foreground">
                Woman-Owned
              </Badge>
              <Badge className="border-border bg-muted text-foreground">
                Same-Day Service
              </Badge>
            </div>

            <h2 className="text-foreground mb-6 text-2xl font-bold sm:text-4xl md:text-5xl">
              Pick the fastest way to get your quote
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-4xl text-base sm:text-lg">
              Professional junk removal, light demolition, and cleaning services in Evansville and
              Southern Indiana. Choose your service below for instant pricing and same-day
              availability.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                className="bg-foreground px-6 py-2.5 text-base text-background hover:brightness-110"
              >
                <a href={`tel:${settings.phoneE164}`}>
                  Call {settings.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border bg-transparent px-6 py-2.5 text-base text-foreground hover:bg-accent"
              >
                <a href={`sms:${settings.phoneE164}`}>
                  Text Photos
                </a>
              </Button>
            </div>
          </div>

          {/* Service Selection Cards */}
          <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <QuoteServiceCard
              title="Junk Removal"
              description="Same-day pickup and hauling services"
              pricing={junkRemovalTiers}
              features={[
                'Furniture & appliance removal',
                'Construction debris cleanup',
                'Estate & garage cleanouts',
                'Same-day availability',
              ]}
              primaryLink="/services/junk-removal"
              primaryButtonText="Get Junk Removal Quote"
              secondaryLink="/services/junk-removal"
              secondaryButtonText="Junk Removal Services & Pricing"
            />

            <QuoteServiceCard
              title="Light Demolition"
              description="Careful tear-downs for sheds, decks, and more"
              pricing={lightDemolitionPricing}
              features={[
                'Sheds, decks, playsets, and swing sets',
                'Licensed & insured crew',
                'Responsible debris hauling',
                'Permitting guidance when needed',
              ]}
              primaryLink="/services/light-demolition"
              primaryButtonText="Get Demolition Quote"
              secondaryLink="/services/light-demolition"
              secondaryButtonText="Light Demolition Services & Pricing"
            />

            <QuoteServiceCard
              title="Cleaning Services"
              description="Natural products for home & business"
              pricing={[
                '• Deep clean: From $150-$400',
                '• Recurring: From $80-$200',
                '• Move-in/out: From $200-$500',
                '• Commercial: Custom quote',
              ]}
              features={[
                '100% natural cleaning products',
                'Residential & commercial',
                'After-hours availability',
                'Satisfaction guaranteed',
              ]}
              primaryLink="/cleaning"
              primaryButtonText="Get Cleaning Quote"
              secondaryLink="/cleaning"
              secondaryButtonText="Eco-Friendly Cleaning Services & Packages"
            />
          </div>

          {/* Quote Form Section */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-3xl">
                Get Your Detailed Quote
              </h2>
              <p className="text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg">
                Fill out the form below or upload photos for the most accurate pricing. We'll
                respond within 2 hours with your detailed estimate.
              </p>
            </div>
            <QuoteFormClient />
          </div>

          {/* Why Choose Us Section */}
          <Card className="glass">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-foreground mb-8 text-center text-2xl font-bold sm:text-3xl">
                Why Choose Uncle Sam Junk Removal?
              </h2>

              <div className="mb-8 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <h3 className="mb-2 font-bold">Fast Scheduling</h3>
                  <p className="text-muted-foreground text-sm">
                    Same-day and next-day availability
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="mb-2 font-bold">Eco-Friendly</h3>
                  <p className="text-muted-foreground text-sm">
                    We donate and recycle whenever possible
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="mb-2 font-bold">All-Inclusive Pricing</h3>
                  <p className="text-muted-foreground text-sm">
                    Transparent quotes with no hidden fees
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
