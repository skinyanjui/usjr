import type { Metadata } from 'next'
import Script from 'next/script'
import {
  Shield,
  Truck,
  Users,
  Award,
  Clock,
  MapPin,
  Leaf,
  Recycle,
  Sparkles,
  Star,
} from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'


const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'About Uncle Sam Junk Removal | Local Junk Removal & Cleaning Services',
  description:
    'Veteran-owned junk removal & cleaning in Evansville, IN. Licensed, insured, eco-friendly. Serving Southern Indiana & Kentucky tri-state area.',
  keywords:
    'evansville junk removal, trash removal evansville, junk removal henderson ky, newburgh in junk removal, owensboro junk hauling, veteran owned junk removal evansville, women owned cleaning evansville, karcher cleaners, haul away service, get rid of junk, remove old furniture',
  robots: 'index, follow',
  ...buildCanonicalMetadata('/about', baseUrl),
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
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

      {/* Hero Section */}
      <section className="relative border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
              <Shield className="mr-1 h-3.5 w-3.5" />
              Veteran-Owned
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Woman-Owned Partner
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            About Uncle Sam Junk Removal
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed">
            Veteran-owned junk removal and professional cleaning serving Evansville, IN and the
            Tri-State with integrity, reliability, and excellence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Founded in 2025 by <strong className="font-semibold text-foreground">Samuel Kinyanjui</strong> — a
                  United States Marine Corps veteran — Uncle Sam Junk Removal serves{' '}
                  <strong className="font-semibold text-foreground">Evansville, IN</strong> and the Tri-State with
                  dependable, same-day junk removal and light demolition support. We built this company
                  on Marine Corps values: integrity, respect, and service.
                </p>
                <p>
                  Our professional cleaning services are provided by{' '}
                  <a
                    href="https://www.karchercleaners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline decoration-muted-foreground/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                  >
                    Karcher Cleaners
                  </a>{' '}
                  — a women-owned company led by{' '}
                  <strong className="font-semibold text-foreground">Chelsey Karcher</strong>. Together, we deliver
                  spotless homes and businesses with eco-conscious products and consistent, high-quality
                  results.
                </p>
                <p>
                  Whether you need a single item picked up, a full estate cleanout, or recurring office
                  cleaning, we make it easy with clear communication, honest pricing, and friendly, local
                  professionals.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/50 p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-foreground">2025</div>
                  <div className="text-sm font-medium text-muted-foreground">Founded</div>
                </div>
                <div className="rounded-xl bg-muted/50 p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm font-medium text-muted-foreground">Satisfied Clients</div>
                </div>
                <div className="rounded-xl bg-muted/50 p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-foreground">9</div>
                  <div className="text-sm font-medium text-muted-foreground">Service Areas</div>
                </div>
                <div className="rounded-xl bg-muted/50 p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-foreground">4.9</div>
                  <div className="text-sm font-medium text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Proudly Serving Evansville & The Tri-State
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                We're based in Evansville and serve nearby communities across Southern Indiana and
                Western Kentucky. Expect on-time arrivals, friendly crews, and efficient service—every
                time.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {settings.serviceAreas.map(area => (
                  <div key={area} className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-foreground" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-foreground">What We Do</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Truck className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                  <p className="text-muted-foreground">Full-service junk removal & curbside pick-ups</p>
                </div>
                <div className="flex gap-3">
                  <Shield className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                  <p className="text-muted-foreground">Light demolition, shed, and deck tear-downs</p>
                </div>
                <div className="flex gap-3">
                  <Users className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                  <p className="text-muted-foreground">Estate, garage, attic, and hoarding cleanouts</p>
                </div>
                <div className="flex gap-3">
                  <Truck className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                  <p className="text-muted-foreground">Commercial, office, and rental turnovers</p>
                </div>
                <div className="flex gap-3">
                  <Recycle className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-muted-foreground">Appliance, mattress, and furniture recycling</p>
                </div>
                <div className="flex gap-3">
                  <Leaf className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-muted-foreground">Eco-friendly residential and office cleaning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Our Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-foreground/20 hover:shadow-sm">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Reliability</h3>
              <p className="text-muted-foreground">
                We show up on time, every time. Our customers count on us, and we never let them down.
              </p>
            </div>

            <div className="group rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-foreground/20 hover:shadow-sm">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Community</h3>
              <p className="text-muted-foreground">
                We're your neighbors. Supporting local families and businesses is at the heart of what
                we do.
              </p>
            </div>

            <div className="group rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-foreground/20 hover:shadow-sm">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Excellence</h3>
              <p className="text-muted-foreground">
                From our first interaction to job completion, we strive for excellence in every detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Why Choose Uncle Sam Junk Removal?
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Licensed & Insured</h3>
              <p className="text-sm text-muted-foreground">
                Full liability insurance and proper licensing for your peace of mind
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Same-Day Service</h3>
              <p className="text-sm text-muted-foreground">
                Available 7 days a week for urgent junk removal needs
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Eco-Friendly</h3>
              <p className="text-sm text-muted-foreground">
                We donate, recycle, and dispose responsibly whenever possible
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-white">
                <Star className="h-8 w-8 fill-current" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">5-Star Service</h3>
              <p className="text-sm text-muted-foreground">
                Consistently rated 4.9/5 stars by our satisfied customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The dedicated professionals who make it all happen
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-bold text-foreground">
                SK
              </div>
              <h3 className="mb-1 text-xl font-bold text-foreground">Samuel Kinyanjui</h3>
              <p className="mb-4 text-sm font-medium text-foreground">Founder & Owner</p>
              <p className="text-sm text-muted-foreground">
                United States Marine Corps veteran and founder of Uncle Sam Junk Removal. Samuel leads
                with integrity and a commitment to reliable, professional service.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                CK
              </div>
              <h3 className="mb-1 text-xl font-bold text-foreground">Chelsey Karcher</h3>
              <p className="mb-4 text-sm font-medium text-foreground">
                Owner,{' '}
                <a
                  href="https://www.karchercleaners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Karcher Cleaners
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Leads our women-owned cleaning partner, delivering professional cleaning services with
                exceptional attention to detail.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="mb-1 text-xl font-bold text-foreground">Our Local Team</h3>
              <p className="mb-4 text-sm font-medium text-foreground">Operations</p>
              <p className="text-sm text-muted-foreground">
                Friendly professionals serving Evansville and surrounding areas with efficient,
                respectful service.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
