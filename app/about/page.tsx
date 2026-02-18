import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { Shield, Users, Award, Clock, MapPin, Star, CheckCircle2, Leaf } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'
import { PageHero } from '@/components/ui/page-hero'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'About Uncle Sam Junk Removal | Local Junk Removal & Cleaning Services',
  description:
    'Veteran-owned junk removal & cleaning in Evansville, IN. Licensed, insured, eco-friendly. Serving Southern Indiana & Kentucky tri-state area.',
  keywords:
    'evansville junk removal, trash removal evansville, junk removal henderson ky, newburgh in junk removal, owensboro junk hauling, veteran owned junk removal evansville, women owned cleaning evansville, haul away service, get rid of junk, remove old furniture',
  robots: 'index, follow',
  ...buildCanonicalMetadata('/about', baseUrl),
}

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* SEO: LocalBusiness JSON-LD */}
      <Script id="jsonld-localbusiness" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Uncle Sam Junk Removal',
          url: 'https://unclesamjunkremoval.com',
          telephone: settings.phoneE164,
          description:
            'Veteran-owned junk removal in Evansville, IN. Professional cleaning by a women-owned cleaning partner.',
          foundingDate: '2025',
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
          ],
        })}
      </Script>

      <PageHero
        title="About Uncle Sam Junk Removal"
        description="Veteran-owned junk removal and professional cleaning serving Evansville, IN and the Tri-State with integrity, reliability, and excellence."
        eyebrow="Founded on Service"
      />

      {/* Our Story & Stats */}
      <section className="border-border border-b py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                Our Story
              </h2>
              <div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
                <p>
                  Founded in 2025 by a United States Marine Corps veteran, Uncle Sam Junk Removal
                  was built to serve{' '}
                  <strong className="text-foreground font-semibold">Evansville, IN</strong> and the
                  Tri-State area with dependable, military-grade precision. We apply the same values
                  of integrity, respect, and service to every job.
                </p>
                <p>
                  We are proud to partner with{' '}
                  <a
                    href="https://www.karchercleaners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary decoration-border hover:decoration-primary font-medium underline underline-offset-4 transition-colors"
                  >
                    Karcher Cleaners
                  </a>
                  , a women-owned cleaning company. This partnership allows us to offer a complete
                  solution: junk removal coupled with deep cleaning, delivering spotless spaces for
                  homes and businesses.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/services"
                  className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  View Our Services
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border-border bg-card hover:border-foreground/20 rounded-xl border p-6 text-center transition-colors">
                <div className="text-foreground mb-2 text-3xl font-bold">2025</div>
                <div className="text-muted-foreground text-sm font-medium">Founded</div>
              </div>
              <div className="border-border bg-card hover:border-foreground/20 rounded-xl border p-6 text-center transition-colors">
                <div className="text-foreground mb-2 text-3xl font-bold">500+</div>
                <div className="text-muted-foreground text-sm font-medium">Satisfied Clients</div>
              </div>
              <div className="border-border bg-card hover:border-foreground/20 rounded-xl border p-6 text-center transition-colors">
                <div className="text-foreground mb-2 text-3xl font-bold">9</div>
                <div className="text-muted-foreground text-sm font-medium">Service Areas</div>
              </div>
              <div className="border-border bg-card hover:border-foreground/20 rounded-xl border p-6 text-center transition-colors">
                <div className="text-foreground mb-2 text-3xl font-bold">4.9</div>
                <div className="text-muted-foreground text-sm font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-border bg-muted/30 border-b py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide our work, our team, and our commitment to you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group border-border bg-card hover:border-primary/50 rounded-xl border p-8 transition-all hover:shadow-sm">
              <div className="bg-primary/10 text-primary mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-3 text-xl font-bold">Reliability</h3>
              <p className="text-muted-foreground leading-relaxed">
                We respect your time. When we say we'll be there, we'll be there. No excuses, just
                results.
              </p>
            </div>

            <div className="group border-border bg-card hover:border-primary/50 rounded-xl border p-8 transition-all hover:shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-3 text-xl font-bold">Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are locally owned and operated. Supporting our neighbors and local businesses is
                why we exist.
              </p>
            </div>

            <div className="group border-border bg-card hover:border-primary/50 rounded-xl border p-8 transition-all hover:shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-3 text-xl font-bold">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We don't cut corners. From the initial quote to the final sweep, we aim for
                perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="border-border border-b py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose Uncle Sam?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We know you have choices. Here is why homeowners and businesses in Evansville trust
                us with their property.
              </p>
              <ul className="space-y-4">
                {[
                  'Veteran-Owned & Operated',
                  'Fully Licensed & Insured',
                  'Same-Day & Next-Day Service',
                  'Eco-Friendly Disposal Practices',
                  'Transparent Upfront Pricing',
                  'Professional Uniformed Crew',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border-border bg-muted/30 rounded-xl border p-6">
                <Clock className="text-foreground mb-4 h-8 w-8" />
                <h3 className="mb-2 text-lg font-bold">Fast Service</h3>
                <p className="text-muted-foreground text-sm">
                  We value your time with prompt arrival windows.
                </p>
              </div>
              <div className="border-border bg-muted/30 rounded-xl border p-6">
                <Leaf className="mb-4 h-8 w-8 text-emerald-600" />
                <h3 className="mb-2 text-lg font-bold">Eco-Conscious</h3>
                <p className="text-muted-foreground text-sm">
                  Recycling and donating items whenever possible.
                </p>
              </div>
              <div className="border-border bg-muted/30 rounded-xl border p-6">
                <Shield className="mb-4 h-8 w-8 text-blue-600" />
                <h3 className="mb-2 text-lg font-bold">Protected</h3>
                <p className="text-muted-foreground text-sm">
                  Fully insured against accidents or damage.
                </p>
              </div>
              <div className="border-border bg-muted/30 rounded-xl border p-6">
                <Star className="mb-4 h-8 w-8 fill-yellow-500 text-yellow-500" />
                <h3 className="mb-2 text-lg font-bold">Top Rated</h3>
                <p className="text-muted-foreground text-sm">
                  Consistent 5-star reviews from locals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Team */}
      <section className="border-border bg-muted/30 border-b py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Leadership Team
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              The dedicated professionals ensuring consistent quality on every job.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Founder */}
            <div className="border-border bg-card overflow-hidden rounded-xl border">
              <div className="p-8 text-center">
                <div className="bg-primary/10 text-primary ring-background mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold ring-4">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="text-foreground mb-1 text-xl font-bold">Founder & Owner</h3>
                <p className="text-primary mb-4 text-sm font-medium tracking-wide uppercase">
                  USMC Veteran
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Responsible for operations, logistics, and ensuring the "Uncle Sam Standard" is
                  met on every junk removal project.
                </p>
              </div>
            </div>

            {/* Cleaning Partner */}
            <div className="border-border bg-card overflow-hidden rounded-xl border">
              <div className="p-8 text-center">
                <div className="ring-background mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10 text-3xl font-bold text-purple-600 ring-4">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-foreground mb-1 text-xl font-bold">Cleaning Partner</h3>
                <p className="mb-4 text-sm font-medium tracking-wide text-purple-600 uppercase">
                  Owner, Karcher Cleaners
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Leads our cleaning division with meticulous attention to detail, specializing in
                  move-out deep cleans and post-renovation tidying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area List */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-foreground mb-8 text-2xl font-bold">
            Proudly Serving Southern Indiana
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {settings.serviceAreas.map(area => (
              <span
                key={area}
                className="border-border bg-muted/50 text-foreground inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium"
              >
                <MapPin className="text-muted-foreground mr-1.5 h-3.5 w-3.5" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
