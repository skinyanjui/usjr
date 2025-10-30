import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import QuoteFormClient from './QuoteFormClient'
import { settings } from '@/lib/cms-content'
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
    <div className="bg-background min-h-screen">
      <div className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h1 className="text-foreground mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              Get Your Free Quote
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Call us or fill out the form below for pricing
            </p>
          </div>

          {/* Primary CTA - Phone */}
          <div className="mb-12 text-center">
            <p className="text-foreground mb-4 text-base font-medium">
              For fastest service, call or text us now
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary px-8 py-3 text-lg text-primary-foreground hover:bg-primary/90"
              >
                <a href={`tel:${settings.phoneE164}`}>
                  Call {settings.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg"
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
              <div className="w-full border-t-2 border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground font-medium">Or fill out the form</span>
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
              <Card className="border-2 border-border bg-card hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="text-foreground mb-3 text-lg font-bold">Junk Removal</h3>
                  <p className="text-foreground mb-4 text-base font-semibold">Starting at {junkRemovalTiers[0]?.price ?? '$149'}</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href="/services/junk-removal">View Details</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-border bg-card hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="text-foreground mb-3 text-lg font-bold">Light Demolition</h3>
                  <p className="text-foreground mb-4 text-base font-semibold">Starting at $299</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href="/services/light-demolition">View Details</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-border bg-card hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="text-foreground mb-3 text-lg font-bold">Cleaning Services</h3>
                  <p className="text-foreground mb-4 text-base font-semibold">Starting at $80</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href="/cleaning">View Details</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground">
              <span className="flex items-center gap-1">
                <span className="text-primary">✓</span> Same-Day Service
              </span>
              <span className="flex items-center gap-1">
                <span className="text-primary">✓</span> Fully Insured
              </span>
              <span className="flex items-center gap-1">
                <span className="text-primary">✓</span> Eco-Friendly
              </span>
              <span className="flex items-center gap-1">
                <span className="text-primary">✓</span> No Hidden Fees
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
