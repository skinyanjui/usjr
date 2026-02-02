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

const STAR_ICONS = [0, 1, 2, 3, 4]

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Professional Cleaning Evansville IN | Uncle Sam',
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
      color: 'bg-muted/30 border-border',
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
      color: 'bg-muted/30 border-border',
      includes: ['Flexible scheduling', 'Consistent team', 'Supply included', 'Quality guarantee'],
    },
    {
      title: 'Move-In/Move-Out',
      description: 'Complete property cleaning for transitions',
      price: 'From $200',
      href: '/cleaning/move-in-move-out',
      color: 'bg-muted/30 border-border',
      includes: ['Inside appliances', 'Cabinet interiors', 'Window tracks', 'Deep sanitization'],
    },
    {
      title: 'Specialty Cleaning',
      description: 'Organizing, decluttering, and specialized tasks',
      price: 'From $100',
      href: '/cleaning/specialty',
      color: 'bg-muted/30 border-border',
      includes: ['Refrigerator cleaning', 'Oven deep clean', 'Home organizing', 'Decluttering'],
    },
    {
      title: 'Office/Business',
      description: 'Professional commercial cleaning services',
      price: 'From $120',
      href: '/cleaning/commercial',
      color: 'bg-muted/30 border-border',
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
    <div className="bg-background min-h-screen">
      <PageHero
        title="Professional Cleaning Services in Evansville, IN"
        description="Veteran-led residential and commercial cleaning using natural products"
      />

      {/* Subheader badges/CTAs */}
      <section className="px-4 pt-8 pb-8">
        <div className="mx-auto max-w-7xl text-center">
          <Badge className="border-border bg-muted text-foreground mb-6">
            Natural Products • Woman-Owned • Veteran-Led
          </Badge>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background px-8 py-3 hover:brightness-110"
            >
              <a href={settings.squareBookingUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent px-8 py-3"
            >
              <Link href="/quote" prefetch>
                Get Free Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-card/50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                  <prop.icon className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">{prop.title}</h3>
                <p className="text-muted-foreground">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Our Cleaning Services
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              From deep cleaning to recurring maintenance, we provide comprehensive cleaning
              solutions for homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className={`${service.color} transition-shadow hover:shadow-lg`}>
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <CardTitle className="text-foreground text-xl font-bold">
                      {service.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-card/80">
                      {service.price}
                    </Badge>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {service.includes.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-muted-foreground flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-gray-900" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 bg-gray-900 text-white hover:bg-gray-900"
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
                      className="border-border text-foreground hover:bg-accent bg-transparent"
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
      <section className="bg-card/50 px-4 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <div className="bg-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <Shield className="text-primary-foreground h-8 w-8" />
            </div>
            <h2 className="text-foreground mb-4 text-2xl font-bold">48-Hour Re-Clean Guarantee</h2>
            <p className="text-muted-foreground mb-6">
              Not completely satisfied with our cleaning? We'll return within 48 hours to make it
              right, at no additional cost.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              {STAR_ICONS.map(i => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="text-muted-foreground ml-2">4.9/5 from 200+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <StructuredData type="LocalBusiness" />
    </div>
  )
}
