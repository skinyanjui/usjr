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
} from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
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
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="About Uncle Sam Junk Removal"
        description="Veteran-owned junk removal and professional cleaning in Evansville, IN and the Tri-State."
        color="blue"
      />

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

      {/* Our Story */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">Our Story</h2>
              <div className="space-y-4 leading-relaxed text-gray-600">
                <p>
                  Founded in 2025 by <strong>Samuel Kinyanjui</strong> — a United States Marine
                  Corps veteran — Uncle Sam Junk Removal serves <strong>Evansville, IN</strong> and
                  the Tri-State with dependable, same-day junk removal and light demolition support.
                  We built this company on Marine Corps values: integrity, respect, and service.
                </p>
                <p>
                  Our professional cleaning services are provided by{' '}
                  <a
                    href="https://www.karchercleaners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>Karcher Cleaners</strong>
                  </a>{' '}
                  — a women-owned company led by <strong>Chelsey Karcher</strong>. Together, we
                  deliver spotless homes and businesses with eco-conscious products and consistent,
                  high-quality results.
                </p>
                <p>
                  Whether you need a single item picked up, a full estate cleanout, or recurring
                  office cleaning, we make it easy with clear communication, honest pricing, and
                  friendly, local professionals.
                </p>
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-lg bg-red-50 p-4">
                  <div className="text-2xl font-bold text-red-600">2025</div>
                  <div className="text-gray-600">Founded</div>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600">Satisfied Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Service Areas */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                Proudly Serving Evansville & The Tri-State
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                We’re based in Evansville and serve nearby communities across Southern Indiana and
                Western Kentucky. Expect on-time arrivals, friendly crews, and efficient
                service—every time.
              </p>
              <ul className="grid gap-3 text-gray-700 sm:grid-cols-2">
                {settings.serviceAreas.map(area => (
                  <li key={area} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="mb-4 text-xl font-bold text-gray-800">What We Do</h3>
              <div className="grid gap-4 text-sm text-gray-700 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 text-blue-600" />
                  <span>Full-service junk removal & curbside pick-ups</span>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 text-blue-600" />
                  <span>Light demolition, shed, and deck tear-downs</span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 text-red-600" />
                  <span>Estate, garage, attic, and hoarding cleanouts</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 text-green-600" />
                  <span>Commercial, office, and rental turnovers</span>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="mt-0.5 h-5 w-5 text-yellow-600" />
                  <span>Appliance, mattress, and furniture recycling</span>
                </div>
                <div className="flex items-start gap-3">
                  <Leaf className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <span>Eco-friendly residential and office cleaning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Our Values</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="glass rounded-2xl p-8 text-center">
              <Shield className="mx-auto mb-4 h-12 w-12 text-red-600" />
              <h3 className="mb-4 text-xl font-bold">Reliability</h3>
              <p className="text-gray-600">
                We show up on time, every time. Our customers count on us, and we never let them
                down.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-green-600" />
              <h3 className="mb-4 text-xl font-bold">Community</h3>
              <p className="text-gray-600">
                We're your neighbors. Supporting local families and businesses is at the heart of
                what we do.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <Award className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-4 text-xl font-bold">Excellence</h3>
              <p className="text-gray-600">
                From our first interaction to job completion, we strive for excellence in every
                detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Why Choose Uncle Sam Junk Removal?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="mb-2 font-bold">Licensed & Insured</h3>
              <p className="text-sm text-gray-600">
                Full liability insurance and proper licensing for your peace of mind
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 font-bold">Same-Day Service</h3>
              <p className="text-sm text-gray-600">
                Available 7 days a week for urgent junk removal needs
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 font-bold">Eco-Friendly</h3>
              <p className="text-sm text-gray-600">
                We donate, recycle, and dispose responsibly whenever possible
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="mb-2 font-bold">5-Star Service</h3>
              <p className="text-sm text-gray-600">
                Consistently rated 4.9/5 stars by our satisfied customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The dedicated professionals who make it all happen
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="mb-2 text-xl font-bold">Samuel Kinyanjui</h3>
              <p className="mb-3 font-medium text-red-600">Founder & Owner</p>
              <p className="text-sm text-gray-600">
                United States Marine Corps veteran and founder of Uncle Sam Junk Removal. Samuel
                leads with integrity and a commitment to reliable, professional service.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="mb-2 text-xl font-bold">Chelsey Karcher</h3>
              <p className="mb-3 font-medium text-green-600">
                Owner,{' '}
                <a
                  href="https://www.karchercleaners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Karcher Cleaners
                </a>
              </p>
              <p className="text-sm text-gray-600">
                Leads our women-owned cleaning partner, delivering professional cleaning services
                with exceptional attention to detail.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="mb-2 text-xl font-bold">Our Local Team</h3>
              <p className="mb-3 font-medium text-blue-600">Operations</p>
              <p className="text-sm text-gray-600">
                Friendly professionals serving Evansville and surrounding areas with efficient,
                respectful service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Experience the Uncle Sam Difference?
          </h2>
          <p className="mb-8 text-xl text-red-100">
            Join thousands of satisfied customers who trust Uncle Sam Junk Removal for their junk
            removal and cleaning needs.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <PhoneButton href={`tel:${settings.phoneE164}`} size="lg" className="justify-center">
              <Phone className="h-4 w-4" /> Call {settings.phone}
            </PhoneButton>
            <Button
              asChild
              className="justify-center rounded-lg bg-white px-8 py-3 text-lg font-semibold text-red-700 shadow transition-colors hover:bg-red-50"
            >
              <QuoteCtaLink location="about-page-cta" label="Get Free Quote">
                Get Free Quote
              </QuoteCtaLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
