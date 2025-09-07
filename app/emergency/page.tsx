import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Clock, Phone, MessageSquare, Zap, Shield } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { PageHero } from '@/components/ui/page-hero'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Emergency Junk Removal in Evansville, IN | 24/7 Service | Uncle Sam Junk Removal',
  description:
    '24/7 emergency junk removal services in Evansville, Indiana. Fast response for urgent cleanouts, storm debris, and emergency situations throughout Southern Indiana.',
  keywords:
    'emergency junk removal Evansville, 24/7 junk removal, urgent cleanout, storm debris removal, emergency cleanup Indiana',
  ...buildCanonicalMetadata('/emergency', baseUrl),
}

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-red-50 pt-0 pb-16">
      <PageHero
        title="Emergency Junk Removal"
        description="24/7 emergency response throughout Evansville and Southern Indiana"
        imageSrc="/junk-removal-evansville.png"
        priority
      />
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Emergency Junk Removal
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
            Need immediate junk removal service? We provide same-day emergency response throughout
            Evansville and Southern Indiana.
          </p>
          <Badge className="mt-4 bg-red-600 px-4 py-2 text-lg text-white">
            <Clock className="mr-2 h-4 w-4" />
            Available 24/7 for Emergencies
          </Badge>
        </div>

        <Card className="mb-8 border-red-200 bg-white">
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="text-center">
                <Phone className="mx-auto mb-4 h-12 w-12 text-red-600" />
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Call Now</h3>
                <p className="mb-4 text-gray-600">
                  Speak directly with our emergency dispatch team
                </p>
                <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700">
                  <a href={`tel:${settings.phoneE164}`}>{settings.phone}</a>
                </Button>
                <p className="mt-2 text-sm text-gray-600">Available 24/7 for emergencies</p>
              </div>

              <div className="text-center">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 text-red-600" />
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Text Photos</h3>
                <p className="mb-4 text-gray-600">Send photos for immediate assessment</p>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-red-800 bg-transparent text-red-800"
                >
                  <a href={`sms:${settings.phoneE164}`}>Text {settings.phone}</a>
                </Button>
                <p className="mt-2 text-sm text-gray-600">Get instant quote via text</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Emergency Situations We Handle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Property damage cleanup</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Storm debris removal</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Eviction cleanouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Biohazard situations</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Urgent estate cleanouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Commercial emergencies</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Emergency Service Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>2-hour response time</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>Same-day service available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>Weekend & holiday service</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>Licensed & insured</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>Proper disposal guaranteed</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>Upfront emergency pricing</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Emergency Service Pricing</h3>
            <p className="mb-6 text-gray-600">
              Emergency services include a 50% surcharge for immediate response. All pricing is
              provided upfront with no hidden fees.
            </p>
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4">
                <h4 className="font-bold text-gray-900">Small Emergency</h4>
                <p className="text-2xl font-bold text-red-600">$134-224</p>
                <p className="text-sm text-gray-600">1-3 items, 2-hour response</p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <h4 className="font-bold text-gray-900">Medium Emergency</h4>
                <p className="text-2xl font-bold text-red-600">$269-584</p>
                <p className="text-sm text-gray-600">Room cleanout, same-day</p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <h4 className="font-bold text-gray-900">Large Emergency</h4>
                <p className="text-2xl font-bold text-red-600">$734-974</p>
                <p className="text-sm text-gray-600">Full property, immediate</p>
              </div>
            </div>
            <Button asChild className="bg-red-600 text-white hover:bg-red-700">
              <QuoteCtaLink location="emergency" label="Get Emergency Quote Now">
                Get Emergency Quote Now
              </QuoteCtaLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
