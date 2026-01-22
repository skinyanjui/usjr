import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import {
  Shield,
  Users,
  Award,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Leaf,
} from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'
import { PageHero } from '@/components/ui/page-hero'

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
    <div className="min-h-screen bg-background text-foreground">
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
          ],
        })}
      </Script>

      <PageHero
        title="About Uncle Sam Junk Removal"
        description="Veteran-owned junk removal and professional cleaning serving Evansville, IN and the Tri-State with integrity, reliability, and excellence."
        eyebrow="Founded on Service"
      />

      {/* Our Story & Stats */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2025 by <strong className="font-semibold text-foreground">Samuel Kinyanjui</strong> — a
                  United States Marine Corps veteran — Uncle Sam Junk Removal was built to serve {' '}
                  <strong className="font-semibold text-foreground">Evansville, IN</strong> and the Tri-State area with
                  dependable, military-grade precision. We apply the same values of integrity, respect, and service to every job.
                </p>
                <p>
                  We are proud to partner with{' '}
                  <a
                    href="https://www.karchercleaners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
                  >
                    Karcher Cleaners
                  </a>
                  , a women-owned company led by <strong className="font-semibold text-foreground">Chelsey Karcher</strong>.
                  This partnership allows us to offer a complete solution: junk removal coupled with deep cleaning, delivering spotless spaces for homes and businesses.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  View Our Services
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-6 text-center hover:border-foreground/20 transition-colors">
                <div className="mb-2 text-3xl font-bold text-foreground">2025</div>
                <div className="text-sm font-medium text-muted-foreground">Founded</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center hover:border-foreground/20 transition-colors">
                <div className="mb-2 text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm font-medium text-muted-foreground">Satisfied Clients</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center hover:border-foreground/20 transition-colors">
                <div className="mb-2 text-3xl font-bold text-foreground">9</div>
                <div className="text-sm font-medium text-muted-foreground">Service Areas</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center hover:border-foreground/20 transition-colors">
                <div className="mb-2 text-3xl font-bold text-foreground">4.9</div>
                <div className="text-sm font-medium text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide our work, our team, and our commitment to you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Reliability</h3>
              <p className="text-muted-foreground leading-relaxed">
                We respect your time. When we say we'll be there, we'll be there. No excuses, just results.
              </p>
            </div>

            <div className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are locally owned and operated. Supporting our neighbors and local businesses is why we exist.
              </p>
            </div>

            <div className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We don't cut corners. From the initial quote to the final sweep, we aim for perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">Why Choose Uncle Sam?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We know you have choices. Here is why homeowners and businesses in Evansville trust us with their property.
              </p>
              <ul className="space-y-4">
                {[
                  "Veteran-Owned & Operated",
                  "Fully Licensed & Insured",
                  "Same-Day & Next-Day Service",
                  "Eco-Friendly Disposal Practices",
                  "Transparent Upfront Pricing",
                  "Professional Uniformed Crew"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <Clock className="h-8 w-8 text-foreground mb-4" />
                <h3 className="font-bold text-lg mb-2">Fast Service</h3>
                <p className="text-sm text-muted-foreground">We value your time with prompt arrival windows.</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <Leaf className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">Eco-Conscious</h3>
                <p className="text-sm text-muted-foreground">Recycling and donating items whenever possible.</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">Protected</h3>
                <p className="text-sm text-muted-foreground">Fully insured against accidents or damage.</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Top Rated</h3>
                <p className="text-sm text-muted-foreground">Consistent 5-star reviews from locals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Team */}
      <section className="py-20 border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Leadership Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The dedicated professionals ensuring consistent quality on every job.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Samuel */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary ring-4 ring-background">
                  SK
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Samuel Kinyanjui</h3>
                <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wide">Founder & Owner</p>
                <p className="text-muted-foreground leading-relaxed">
                  USMC Veteran responsible for operations, logistics, and ensuring the "Uncle Sam Standard" is met on every junk removal project.
                </p>
              </div>
            </div>

            {/* Chelsey */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10 text-3xl font-bold text-purple-600 ring-4 ring-background">
                  CK
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Chelsey Karcher</h3>
                <p className="text-sm font-medium text-purple-600 mb-4 uppercase tracking-wide">
                  Owner, Karcher Cleaners
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Leads our cleaning division with meticulous attention to detail, specializing in move-out deep cleans and post-renovation tidying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area List */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">Proudly Serving Southern Indiana</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {settings.serviceAreas.map((area) => (
              <span key={area} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-foreground">
                <MapPin className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
