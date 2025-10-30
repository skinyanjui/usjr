import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import QuoteFormClient from './QuoteFormClient'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
import { junkRemovalTiers } from '@/lib/pricing'

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
  return (
    <div className="bg-muted/30 min-h-screen">
      <PageHero
        title="Get Your Free Quote"
        description="Call us or fill out the form below for pricing"
        color="primary"
      />
      <div className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          {/* Primary CTA - Phone */}
          <div className="mt-8 mb-12 text-center">
            <p className="text-muted-foreground mb-4 text-base">
              For fastest service, call or text us now
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary px-8 py-3 text-lg text-primary-foreground hover:brightness-110"
              >
                <a href={`tel:${settings.phoneE164}`}>
                  Call {settings.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border px-8 py-3 text-lg hover:bg-accent"
              >
                <a href={`sms:${settings.phoneE164}`}>
                  Text Photos
                </a>
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-muted/30 px-4 text-muted-foreground">Or fill out the form</span>
            </div>
          </div>

          {/* Quote Form Section */}
          <div className="mb-16">
            <QuoteFormClient />
          </div>

          {/* Service Reference Cards - Simplified */}
          <div className="mb-12">
            <h2 className="text-foreground mb-6 text-center text-xl font-bold sm:text-2xl">
              Our Services
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <Card className="glass border-border">
                <CardContent className="p-4 text-center">
                  <h3 className="text-foreground mb-2 font-bold">Junk Removal</h3>
                  <p className="text-muted-foreground mb-2 text-sm">Starting at {junkRemovalTiers[0].price}</p>
                  <Button asChild variant="link" className="p-0 h-auto text-sm">
                    <a href="/services/junk-removal">View pricing details</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border-border">
                <CardContent className="p-4 text-center">
                  <h3 className="text-foreground mb-2 font-bold">Light Demolition</h3>
                  <p className="text-muted-foreground mb-2 text-sm">Starting at $299</p>
                  <Button asChild variant="link" className="p-0 h-auto text-sm">
                    <a href="/services/light-demolition">View pricing details</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border-border">
                <CardContent className="p-4 text-center">
                  <h3 className="text-foreground mb-2 font-bold">Cleaning Services</h3>
                  <p className="text-muted-foreground mb-2 text-sm">Starting at $80</p>
                  <Button asChild variant="link" className="p-0 h-auto text-sm">
                    <a href="/cleaning">View pricing details</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ Same-Day Service</span>
              <span>✓ Fully Insured</span>
              <span>✓ Eco-Friendly</span>
              <span>✓ No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
