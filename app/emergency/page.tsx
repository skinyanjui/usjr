import { AlertTriangle, Clock, MessageSquare, Phone, Shield, Truck, Zap } from 'lucide-react'
import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/ui/service-page-template'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildServiceMetadata } from '@/lib/seo-metadata'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const serviceInfo = {
  serviceName: 'Emergency Junk Removal',
  category: 'Emergency Junk Removal',
  price: 'From $134',
  benefits: ['24/7 dispatch', '2-hour arrival window', 'Licensed & insured'],
}

const seoData = buildServiceMetadata(serviceInfo, 'Evansville, IN')

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/emergency', baseUrl),
}

export default function EmergencyPage() {
  const features = [
    {
      icon: AlertTriangle,
      title: '24/7 Emergency Dispatch',
      description:
        'On-call crew ready to mobilize immediately for property damage, storm debris, and urgent cleanouts.',
    },
    {
      icon: Clock,
      title: 'Two-Hour Arrival Window',
      description:
        'Average arrival under two hours for calls placed before 8 PM with continuous updates from our dispatch team.',
    },
    {
      icon: Shield,
      title: 'Licensed & Insured Crew',
      description:
        'Trained professionals prepared for hazardous situations with proper disposal and documentation support.',
    },
    {
      icon: Phone,
      title: 'Direct Access to Dispatch',
      description:
        'Call or text photos to receive upfront pricing with no hidden fees before our trucks leave the warehouse.',
    },
  ]

  const steps = [
    {
      icon: Phone,
      title: 'Contact Emergency Dispatch',
      description:
        'Call or text photos anytime to trigger immediate scheduling for your situation.',
    },
    {
      icon: Clock,
      title: 'Confirm Arrival Window',
      description:
        'We provide a guaranteed arrival window and dispatch the closest available crew with real-time updates.',
    },
    {
      icon: Truck,
      title: 'Rapid On-Site Cleanup',
      description:
        'Our team handles all loading, sorting, and debris mitigation so you can focus on securing the property.',
    },
    {
      icon: Shield,
      title: 'Responsible Disposal',
      description:
        'We document the removal, donate salvageable items, and dispose of waste according to local regulations.',
    },
  ]

  const pricing = [
    {
      name: 'Small Emergency',
      price: 'From $134-224',
      description: '1-3 items • 2-hour response window',
    },
    {
      name: 'Medium Emergency',
      price: 'From $269-584',
      description: 'Room cleanout • Same-day arrival',
    },
    {
      name: 'Large Emergency',
      price: 'From $734-974',
      description: 'Full property • Immediate deployment',
    },
  ]

  const faqs = [
    {
      question: 'How fast can your team arrive?',
      answer:
        'Most emergency calls receive on-site support within two hours. When travel or weather is a factor, we keep you updated with ETA text alerts.',
    },
    {
      question: 'Is there an additional cost for emergency service?',
      answer:
        'Emergency dispatch includes a readiness surcharge of up to 50% that covers overtime labor, rapid routing, and priority access to disposal facilities. All pricing is provided upfront.',
    },
    {
      question: 'Can I text photos for a faster quote?',
      answer: `Yes. Text photos to ${settings.phone} and our dispatchers will review them immediately so we can lock in pricing before the crew arrives.`,
    },
    {
      question: 'What areas do you cover for emergency junk removal?',
      answer:
        'We dispatch to Evansville, Newburgh, Boonville, Mount Vernon, Henderson, and Owensboro with extended coverage throughout Southern Indiana and Western Kentucky.',
    },
  ]

  return (
    <ServicePageTemplate
      title="24/7 Emergency Junk Removal"
      description="Immediate junk removal response throughout Evansville and Southern Indiana. Same-day cleanouts, storm debris removal, and urgent property services with licensed professionals."
      theme="primary"
      badges={['24/7 Emergency Response', '2-Hour Arrival Window', 'Licensed & Insured']}
      features={features}
      steps={steps}
      stepsTitle="Emergency Response Process"
      pricing={pricing}
      pricingTitle="Emergency Pricing"
      pricingNote="Emergency services include up to a 50% rapid-response surcharge that covers overtime labor, dispatch coordination, and priority disposal access. All pricing is confirmed upfront."
      faqs={faqs}
      serviceCategory="Emergency Junk Removal"
      serviceArea={[
        'Evansville, IN',
        'Newburgh, IN',
        'Boonville, IN',
        'Henderson, KY',
        'Owensboro, KY',
      ]}
      ctaPrimary="📞 Call for Emergency Dispatch"
      ctaSecondary="Text Photos for Fast Quote"
    >
      <div className="mt-12 space-y-8">
        <Card className="bg-card border-red-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-foreground text-2xl font-bold">
              Immediate Support Options
            </CardTitle>
            <CardDescription>
              Reach our emergency dispatch by phone or text for instant coordination and pricing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-red-100 p-6 text-center">
                <Badge className="mb-3 inline-flex items-center gap-2 bg-red-600 px-4 py-2 text-base text-white">
                  <Phone className="h-4 w-4" />
                  Call Now
                </Badge>
                <p className="text-muted-foreground mb-4">
                  Speak directly with our on-call dispatcher for immediate scheduling and arrival
                  updates.
                </p>
                <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700">
                  <a href={`tel:${settings.phoneE164}`}>{settings.phone}</a>
                </Button>
                <p className="mt-2 text-sm text-gray-500">Available 24/7 for emergencies</p>
              </div>

              <div className="rounded-lg border border-red-100 p-6 text-center">
                <Badge className="bg-card mb-3 inline-flex items-center gap-2 px-4 py-2 text-base text-red-700 ring-1 ring-red-200">
                  <MessageSquare className="h-4 w-4" />
                  Text Photos
                </Badge>
                <p className="text-muted-foreground mb-4">
                  Send photos of the emergency to get pricing confirmed before we arrive on-site.
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-red-700 text-red-700 hover:bg-red-700 hover:text-white"
                >
                  <a href={`sms:${settings.phoneE164}`}>Text {settings.phone}</a>
                </Button>
                <p className="mt-2 text-sm text-gray-500">Receive responses in minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Emergency Situations We Handle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Property damage cleanup
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Storm debris and fallen trees
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Eviction and hoarding cleanouts
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Biohazard-adjacent junk removal support
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Commercial emergencies and shutdowns
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Emergency Service Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  2-hour response window for most calls
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  Same-day service on nights & weekends
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Licensed, insured, and background-checked crew
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-600" />
                  Specialized equipment for heavy or oversized items
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  Proper disposal with donation and recycling options
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-yellow-200 bg-yellow-50 text-center">
          <CardContent className="space-y-4 py-8">
            <Badge className="mx-auto inline-flex items-center gap-2 bg-yellow-500 px-4 py-2 text-base text-white">
              <Zap className="h-4 w-4" />
              Priority Dispatch Available
            </Badge>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Need same-hour service? Our emergency team is staffed overnight and on weekends to
              help secure properties, clear access points, and remove hazards fast.
            </p>
            <Button asChild size="lg" className="bg-red-600 text-white hover:bg-red-700">
              <QuoteCtaLink location="emergency" label="Get Emergency Quote Now">
                Get Emergency Quote Now
              </QuoteCtaLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </ServicePageTemplate>
  )
}
