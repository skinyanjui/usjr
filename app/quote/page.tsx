import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Leaf,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Truck,
  Wrench,
  Sparkles,
  Phone,
  Camera,
  BadgeDollarSign,
} from 'lucide-react'
import Link from 'next/link'
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
  const lightDemolitionPricing = [
    '• Shed removal up to 120 sq ft: From $399',
    '• Deck or fence tear-out: From $499',
    '• Playset removal: From $299',
    '• Small interior demo projects: Custom quote',
  ]

  return (
    <div className="min-h-screen bg-muted/30">
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
              <Badge className="border-border bg-green-100 text-green-700 dark:text-green-400">
                <Leaf className="mr-1 h-3 w-3" />
                Eco-Friendly
              </Badge>
              <Badge className="border-border bg-blue-100 text-blue-700 dark:text-blue-400">
                <Shield className="mr-1 h-3 w-3" />
                Fully Insured
              </Badge>
              <Badge className="border-purple-200 bg-purple-100 text-purple-800">
                <Star className="mr-1 h-3 w-3" />
                Woman-Owned
              </Badge>
              <Badge className="border-border bg-orange-100 text-orange-700 dark:text-orange-400">
                <Clock className="mr-1 h-3 w-3" />
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
                className="bg-blue-600 px-6 py-2.5 text-base text-white hover:bg-blue-700"
              >
                <a href={`tel:${settings.phoneE164}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {settings.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue-800 bg-transparent px-6 py-2.5 text-base text-blue-700 dark:text-blue-400 hover:bg-blue-100"
              >
                <a href={`sms:${settings.phoneE164}`}>
                  <Camera className="mr-2 h-4 w-4" />
                  Text Photos
                </a>
              </Button>
            </div>
          </div>

          {/* Service Selection Cards */}
          <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Junk Removal Service */}
            <Card className="glass border-2 border-border transition-all duration-300 hover:border-blue-400">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 sm:h-16 sm:w-16">
                    <Truck className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
                  </div>
                  <h2 className="text-foreground mb-2 text-xl font-bold sm:text-2xl">
                    Junk Removal
                  </h2>
                  <p className="text-muted-foreground">Same-day pickup and hauling services</p>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="rounded-lg bg-muted/30 p-4">
                    <h3 className="mb-2 font-semibold text-blue-900">Starting Prices:</h3>
                    <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                      {junkRemovalTiers.map(t => (
                        <li key={t.id}>
                          • {t.name}: {t.price}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Furniture & appliance removal
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Construction debris cleanup
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Estate & garage cleanouts
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Same-day availability
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    <Link href="/services/junk-removal">Get Junk Removal Quote</Link>
                  </Button>
                  <Link href="/services/junk-removal">
                    <Button
                      variant="outline"
                      className="w-full border-blue-800 bg-transparent text-blue-700 dark:text-blue-400 hover:bg-blue-100"
                    >
                      Junk Removal Services & Pricing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Light Demolition Service */}
            <Card className="glass border-2 border-border transition-all duration-300 hover:border-orange-400">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 sm:h-16 sm:w-16">
                    <Wrench className="h-6 w-6 text-orange-600 sm:h-8 sm:w-8" />
                  </div>
                  <h2 className="text-foreground mb-2 text-xl font-bold sm:text-2xl">
                    Light Demolition
                  </h2>
                  <p className="text-muted-foreground">
                    Careful tear-downs for sheds, decks, and more
                  </p>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="rounded-lg bg-muted/30 p-4">
                    <h3 className="mb-2 font-semibold text-orange-900">Starting Prices:</h3>
                    <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-400">
                      {lightDemolitionPricing.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Sheds, decks, playsets, and swing sets
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Licensed & insured crew
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Responsible debris hauling
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Permitting guidance when needed
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full bg-orange-600 text-white hover:bg-orange-700">
                    <Link href="/services/light-demolition">Get Demolition Quote</Link>
                  </Button>
                  <Link href="/services/light-demolition">
                    <Button
                      variant="outline"
                      className="w-full border-orange-800 bg-transparent text-orange-700 dark:text-orange-400 hover:bg-orange-100"
                    >
                      Light Demolition Services & Pricing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Cleaning Service */}
            <Card className="glass border-2 border-border transition-all duration-300 hover:border-green-400">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 sm:h-16 sm:w-16">
                    <Sparkles className="h-6 w-6 text-green-600 sm:h-8 sm:w-8" />
                  </div>
                  <h2 className="text-foreground mb-2 text-xl font-bold sm:text-2xl">
                    Cleaning Services
                  </h2>
                  <p className="text-muted-foreground">Natural products for home & business</p>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="rounded-lg bg-muted/30 p-4">
                    <h3 className="mb-2 font-semibold text-green-900">Service Prices:</h3>
                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
                      <li>• Deep clean: From $150-$400</li>
                      <li>• Recurring: From $80-$200</li>
                      <li>• Move-in/out: From $200-$500</li>
                      <li>• Commercial: Custom quote</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      100% natural cleaning products
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Residential & commercial
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      After-hours availability
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Satisfaction guaranteed
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full bg-green-600 text-white hover:bg-green-700">
                    <Link href="/cleaning">Get Cleaning Quote</Link>
                  </Button>
                  <Link href="/cleaning">
                    <Button
                      variant="outline"
                      className="w-full border-green-800 bg-transparent text-green-700 dark:text-green-400 hover:bg-green-100"
                    >
                      Eco-Friendly Cleaning Services & Packages
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
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
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 sm:h-12 sm:w-12">
                    <Truck className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="mb-2 font-bold">Fast Scheduling</h3>
                  <p className="text-muted-foreground text-sm">
                    Same-day and next-day availability
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 sm:h-12 sm:w-12">
                    <Sparkles className="h-6 w-6 text-green-600 sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="mb-2 font-bold">Eco-Friendly</h3>
                  <p className="text-muted-foreground text-sm">
                    We donate and recycle whenever possible
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 sm:h-12 sm:w-12">
                    <BadgeDollarSign className="h-6 w-6 text-orange-600 sm:h-8 sm:w-8" />
                  </div>
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
