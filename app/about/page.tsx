import type { Metadata } from 'next'
import Script from 'next/script'
import { Button, PhoneButton } from '@/components/ui/button'
import {
  Star,
  Shield,
  Truck,
  Users,
  Award,
  Clock,
  MapPin,
  Leaf,
  Recycle,
  Phone,
  Target,
  Heart,
  Zap,
  CheckCircle,
} from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'About Uncle Sam Junk Removal | Local Junk Removal & Cleaning Services',
  description:
    'Uncle Sam Junk Removal is a veteran-owned junk removal and cleaning company in Evansville, IN. Founded in 2025 by Marine Corps veteran Samuel Kinyanjui. Whether you need to get rid of junk, remove old furniture, haul away appliances, or clean out your house, we provide professional hauling services. Professional cleaning by women-owned Karcher Cleaners, led by Chelsey Karcher. Serving Evansville, Newburgh, Henderson, Owensboro, Boonville, and Princeton. Licensed & insured.',
  keywords:
    'evansville junk removal, trash removal evansville, junk removal henderson ky, newburgh in junk removal, owensboro junk hauling, veteran owned junk removal evansville, women owned cleaning evansville, karcher cleaners, haul away service, get rid of junk, remove old furniture',
  robots: 'index, follow',
  ...buildCanonicalMetadata('/about', baseUrl),
}

export default function AboutPage() {
  const stats = [
    { icon: Users, number: '5000+', label: 'Happy Customers', color: 'from-blue-500 to-cyan-500' },
    {
      icon: Truck,
      number: '500+',
      label: 'Satisfied Clients',
      color: 'from-purple-500 to-pink-500',
    },
    { icon: Star, number: '4.9', label: 'Star Rating', color: 'from-yellow-500 to-orange-500' },
    { icon: Award, number: '2025', label: 'Founded', color: 'from-red-500 to-rose-500' },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Reliability',
      description:
        'We show up on time, every time. Our customers count on us, and we never let them down.',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        "We're your neighbors. Supporting local families and businesses is at the heart of what we do.",
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Award,
      title: 'Excellence',
      description:
        'From our first interaction to job completion, we strive for excellence in every detail.',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description:
        'Honest pricing, clear communication, and ethical practices in everything we do.',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
    },
  ]

  const features = [
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Full liability insurance and proper licensing for your peace of mind',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      icon: Clock,
      title: 'Same-Day Service',
      description: 'Available 7 days a week for urgent junk removal needs',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Recycle,
      title: 'Eco-Friendly',
      description: 'We donate, recycle, and dispose responsibly whenever possible',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Star,
      title: '5-Star Service',
      description: 'Consistently rated 4.9/5 stars by our satisfied customers',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ]

  const services = [
    { icon: Truck, text: 'Full-service junk removal & curbside pick-ups', color: 'text-blue-600' },
    { icon: Zap, text: 'Light demolition, shed, and deck tear-downs', color: 'text-purple-600' },
    {
      icon: Shield,
      text: 'Estate, garage, attic, and hoarding cleanouts',
      color: 'text-red-600',
    },
    {
      icon: Users,
      text: 'Commercial, office, and rental turnovers',
      color: 'text-green-600',
    },
    {
      icon: Recycle,
      text: 'Appliance, mattress, and furniture recycling',
      color: 'text-yellow-600',
    },
    { icon: Leaf, text: 'Eco-friendly residential and office cleaning', color: 'text-emerald-600' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* SEO: LocalBusiness JSON-LD */}
      <Script id="jsonld-localbusiness" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Uncle Sam Junk Removal',
          url: 'https://unclesamjunkremoval.com',
          telephone: settings.phoneE164,
          description:
            'Veteran-owned junk removal in Evansville, IN. Professional cleaning by women-owned Karcher Cleaners.',
          foundingDate: '2025',
          founder: {
            '@type': 'Person',
            name: 'Samuel Kinyanjui',
          },
          areaServed: settings.serviceAreas,
          sameAs: Object.values(settings.socialMedia || {}),
          knowsAbout: [
            'junk removal',
            'appliance removal',
            'estate cleanouts',
            'yard waste removal',
            'trash removal',
            'residential cleaning',
            'commercial cleaning',
            'storage unit cleanouts',
            'office cleanouts',
            'restaurant equipment removal',
            'property management turnovers',
            'warehouse fixture removal',
            'holiday tree removal',
            'storm debris cleanup',
          ],
        })}
      </Script>

      {/* Modern Hero Section with Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 py-24 text-white">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-semibold">Veteran-Owned & Locally Operated</span>
            </div>

            <h1 className="mb-6 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
              About{' '}
              <span className="bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                Uncle Sam
              </span>
              <br />
              Junk Removal
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-red-100 md:text-2xl">
              Serving Evansville, IN and the Tri-State with integrity, reliability, and exceptional
              service since 2025
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="group rounded-full bg-white px-8 py-6 text-lg font-semibold text-red-700 shadow-xl transition-all hover:scale-105 hover:bg-red-50"
              >
                <QuoteCtaLink location="about-hero" label="Get Free Quote">
                  Get Free Quote
                  <CheckCircle className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                </QuoteCtaLink>
              </Button>

              <PhoneButton
                href={`tel:${settings.phoneE164}`}
                size="lg"
                className="group rounded-full border-2 border-white bg-transparent px-8 py-6 text-lg text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                {settings.phone}
              </PhoneButton>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute right-0 bottom-0 left-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="relative -mt-16 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl md:p-8"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />
                  <div className="relative">
                    <div
                      className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-3`}
                    >
                      <Icon className="h-6 w-6 text-white md:h-8 md:w-8" />
                    </div>
                    <div
                      className={`mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-3xl font-bold text-transparent md:text-4xl`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-gray-600 md:text-base">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section - Modern Design */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white">
                  Our Story
                </div>
                <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
                  Built on{' '}
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Marine Corps Values
                  </span>
                </h2>
              </div>

              <div className="space-y-4 text-lg leading-relaxed text-gray-600">
                <p>
                  Founded in 2025 by <strong className="text-gray-900">Samuel Kinyanjui</strong> — a
                  United States Marine Corps veteran — Uncle Sam Junk Removal serves{' '}
                  <strong className="text-gray-900">Evansville, IN</strong> and the Tri-State with
                  dependable, same-day junk removal and light demolition support.
                </p>
                <p>
                  We built this company on Marine Corps values:{' '}
                  <strong className="text-red-600">integrity</strong>,{' '}
                  <strong className="text-red-600">respect</strong>, and{' '}
                  <strong className="text-red-600">service</strong>.
                </p>
                <p>
                  Our professional cleaning services are provided by{' '}
                  <a
                    href="https://www.karchercleaners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                  >
                    Karcher Cleaners
                  </a>{' '}
                  — a women-owned company led by{' '}
                  <strong className="text-gray-900">Chelsey Karcher</strong>. Together, we deliver
                  spotless homes and businesses with eco-conscious products and consistent,
                  high-quality results.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Decorative gradient blob */}
              <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-gradient-to-br from-red-400 to-orange-400 opacity-20 blur-3xl" />
              <div className="absolute -bottom-4 -left-4 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-20 blur-3xl" />

              <div className="relative space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-1">
                  <div className="rounded-xl bg-white p-8">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-4">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-gray-900">2025</div>
                        <div className="text-gray-600">Founded</div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Bringing military precision and dedication to every job
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-1">
                  <div className="rounded-xl bg-white p-8">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-gray-900">500+</div>
                        <div className="text-gray-600">Satisfied Clients</div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Building trust one job at a time in our community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Modern Cards */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white">
              What We Do
            </div>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`rounded-xl bg-gradient-to-br p-3 ${service.color.replace('text-', 'from-')} to-${service.color.split('-')[1]}-400`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="flex-1 font-medium text-gray-700">{service.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Areas - Modern Layout */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white">
                Service Areas
              </div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Proudly Serving{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  The Tri-State
                </span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                We're based in Evansville and serve nearby communities across Southern Indiana and
                Western Kentucky. Expect on-time arrivals, friendly crews, and efficient
                service—every time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {settings.serviceAreas.map(area => (
                <div
                  key={area}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-br from-red-500 to-orange-500 p-2">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">{area}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Modern Grid */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-white/20 to-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              Our Values
            </div>
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              The Principles That{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Guide Us
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-400">
              Built on a foundation of integrity and service
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:from-white/15 hover:to-white/10"
                >
                  <div
                    className={`mb-6 inline-flex rounded-xl bg-gradient-to-br ${value.color} p-4`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Modern Features Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white">
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
              The{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Uncle Sam
              </span>{' '}
              Difference
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />
                  <div className="relative">
                    <div
                      className={`mx-auto mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-4`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section - Modern Cards */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white">
              Our Team
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Meet The{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                People
              </span>{' '}
              Behind Our Success
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Dedicated professionals committed to exceptional service
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-red-500 to-orange-500 opacity-10 blur-3xl" />
              <div className="relative">
                <div className="mb-6 inline-flex rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-1">
                  <div className="rounded-full bg-white p-4">
                    <Shield className="h-12 w-12 text-red-600" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Samuel Kinyanjui</h3>
                <p className="mb-4 font-semibold text-red-600">Founder & Owner</p>
                <p className="text-gray-600">
                  United States Marine Corps veteran and founder of Uncle Sam Junk Removal. Samuel
                  leads with integrity and a commitment to reliable, professional service.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-green-500 to-emerald-500 opacity-10 blur-3xl" />
              <div className="relative">
                <div className="mb-6 inline-flex rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-1">
                  <div className="rounded-full bg-white p-4">
                    <Users className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Chelsey Karcher</h3>
                <p className="mb-4 font-semibold text-green-600">
                  Owner,{' '}
                  <a
                    href="https://www.karchercleaners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors hover:text-green-700"
                  >
                    Karcher Cleaners
                  </a>
                </p>
                <p className="text-gray-600">
                  Leads our women-owned cleaning partner, delivering professional cleaning services
                  with exceptional attention to detail.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 blur-3xl" />
              <div className="relative">
                <div className="mb-6 inline-flex rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1">
                  <div className="rounded-full bg-white p-4">
                    <Heart className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Our Local Team</h3>
                <p className="mb-4 font-semibold text-blue-600">Operations</p>
                <p className="text-gray-600">
                  Friendly professionals serving Evansville and surrounding areas with efficient,
                  respectful service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-orange-600 py-20 text-white">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm">
            <Target className="h-5 w-5" />
            <span className="text-sm font-semibold">Ready to Get Started?</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Experience The Uncle Sam{' '}
            <span className="bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>

          <p className="mb-10 text-xl text-red-100 md:text-2xl">
            Join thousands of satisfied customers who trust Uncle Sam Junk Removal for their junk
            removal and cleaning needs.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <PhoneButton
              href={`tel:${settings.phoneE164}`}
              size="lg"
              className="group justify-center rounded-full bg-white px-8 py-6 text-lg font-semibold text-red-700 shadow-xl transition-all hover:scale-105 hover:bg-red-50"
            >
              <Phone className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              Call {settings.phone}
            </PhoneButton>

            <Button
              asChild
              className="group justify-center rounded-full border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/10"
            >
              <QuoteCtaLink location="about-page-cta" label="Get Free Quote">
                Get Free Quote
                <CheckCircle className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              </QuoteCtaLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
