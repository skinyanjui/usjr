import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Leaf, Users, Clock, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import { StructuredData } from '@/components/structured-data'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Professional Cleaning Services in Evansville, IN | Uncle Sam Junk Removal',
  description:
    'Veteran-led residential and commercial cleaning services in Evansville. Natural products, flexible scheduling, and spotless results. Book your cleaning today!',
  keywords:
    'cleaning services Evansville, residential cleaning, commercial cleaning, natural cleaning products, woman-owned business',
  ...buildCanonicalMetadata('/cleaning', baseUrl),
}

export default function CleaningHub() {
  const services = [
    {
      title: 'Deep Cleaning',
      description: 'Comprehensive one-time cleaning for your entire home',
      price: 'From $150',
      href: '/cleaning/deep-clean',
      color: 'bg-blue-50 border-blue-200',
      includes: [
        'High-to-low dusting',
        'Kitchen deep clean',
        'Bathroom sanitization',
        'Floor care',
      ],
    },
    {
      title: 'Recurring Cleaning',
      description: 'Weekly, bi-weekly, or monthly maintenance cleaning',
      price: 'From $80',
      href: '/cleaning/recurring',
      color: 'bg-green-50 border-green-200',
      includes: ['Flexible scheduling', 'Consistent team', 'Supply included', 'Quality guarantee'],
    },
    {
      title: 'Move-In/Move-Out',
      description: 'Complete property cleaning for transitions',
      price: 'From $200',
      href: '/cleaning/move-in-move-out',
      color: 'bg-purple-50 border-purple-200',
      includes: ['Inside appliances', 'Cabinet interiors', 'Window tracks', 'Deep sanitization'],
    },
    {
      title: 'Specialty Cleaning',
      description: 'Organizing, decluttering, and specialized tasks',
      price: 'From $100',
      href: '/cleaning/specialty',
      color: 'bg-orange-50 border-orange-200',
      includes: ['Refrigerator cleaning', 'Oven deep clean', 'Home organizing', 'Decluttering'],
    },
    {
      title: 'Office/Business',
      description: 'Professional commercial cleaning services',
      price: 'From $120',
      href: '/cleaning/commercial',
      color: 'bg-gray-50 border-gray-200',
      includes: ['After-hours service', 'Disinfection', 'Restroom restocking', 'Quality sign-off'],
    },
  ]

  const valueProps = [
    { icon: Users, title: 'Local Team', description: 'Evansville-based, trusted professionals' },
    { icon: Clock, title: 'Flexible Scheduling', description: 'Work around your busy schedule' },
    { icon: Leaf, title: 'Green Cleaning', description: 'Natural, eco-friendly products only' },
    {
      icon: Shield,
      title: 'Attention to Detail',
      description: 'Thorough, consistent results every time',
    },
  ]

  return (
    <div className="min-h-screen bg-green-50">
      <PageHero
        title="Professional Cleaning Services in Evansville, IN"
        description="Veteran-led residential and commercial cleaning using natural products"
        color="green"
      />

      {/* Subheader badges/CTAs */}
      <section className="px-4 pt-8 pb-8">
        <div className="mx-auto max-w-7xl text-center">
          <Badge className="mb-6 border-green-200 bg-green-100 text-green-800">
            Natural Products • Woman-Owned • Veteran-Led
          </Badge>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >
              <a href={settings.squareBookingUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-green-800 bg-transparent px-8 py-3 text-green-800 hover:bg-green-100"
            >
              <Link href="/quote" prefetch>
                Get Free Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-white/50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <prop.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Cleaning Services
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              From deep cleaning to recurring maintenance, we provide comprehensive cleaning
              solutions for homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className={`${service.color} transition-shadow hover:shadow-lg`}>
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-white/80">
                      {service.price}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-700">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Link
                        href={service.href}
                        aria-label={`${service.title} details and pricing`}
                        title={`${service.title} details and pricing`}
                      >
                        View {service.title} details
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-green-800 bg-transparent text-green-800 hover:bg-green-100"
                    >
                      <Link href="/quote" prefetch>
                        Quote
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-white/50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">48-Hour Re-Clean Guarantee</h2>
            <p className="mb-6 text-gray-600">
              Not completely satisfied with our cleaning? We'll return within 48 hours to make it
              right, at no additional cost.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="ml-2 text-gray-700">4.9/5 from 200+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready for a Spotless Space?</h2>
          <p className="mb-8 text-xl text-gray-600">
            Book your cleaning service today or get a free, no-obligation quote.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >
              <a href={settings.squareBookingUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-green-800 bg-transparent px-8 py-3 text-green-800 hover:bg-green-100"
            >
              <Link href="/quote" prefetch>
                Get Free Quote
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="px-8 py-3 text-green-800 hover:bg-green-100"
            >
              <a href={`tel:${settings.phoneE164}`}>Call {settings.phone}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <StructuredData type="LocalBusiness" />
    </div>
  )
}
