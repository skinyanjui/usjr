import Link from 'next/link'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { locationData } from '@/lib/location-data'
import { buildCanonicalMetadata } from '@/components/canonical'
import { PageHero } from '@/components/ui/page-hero'
import { StructuredData } from '@/components/structured-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata = {
  title: 'Service Areas | Junk Removal Tri-State | Uncle Sam Junk Removal',
  description:
    'Professional junk removal across the Evansville tri-state area. Serving Indiana, Kentucky, and Illinois with same-day service, transparent pricing, and eco-friendly disposal.',
  keywords:
    'junk removal near me, junk removal service areas, Evansville tri-state junk removal, Indiana junk removal, Kentucky junk removal, Illinois junk removal, same-day junk pickup',
  openGraph: {
    title: 'Service Areas | Junk Removal Tri-State | Uncle Sam Junk Removal',
    description:
      'Professional junk removal across the Evansville tri-state area. Serving 9 communities in Indiana, Kentucky, and Illinois.',
    type: 'website' as const,
    siteName: 'Uncle Sam Junk Removal',
  },
  twitter: {
    card: 'summary' as const,
    title: 'Service Areas | Junk Removal Tri-State | Uncle Sam Junk Removal',
    description:
      'Professional junk removal across the Evansville tri-state area. Serving 9 communities in Indiana, Kentucky, and Illinois.',
  },
  ...buildCanonicalMetadata('/locations', baseUrl),
}

const locationSlugs: Record<string, string> = {
  evansville: '/locations/evansville',
  newburgh: '/locations/newburgh',
  'henderson-ky': '/locations/henderson-ky',
  'owensboro-ky': '/locations/owensboro-ky',
  boonville: '/locations/boonville',
  princeton: '/locations/princeton',
  'mount-carmel-il': '/locations/mount-carmel-il',
  'mount-vernon-in': '/locations/mount-vernon-in',
  'new-harmony-in': '/locations/new-harmony-in',
}

const stateGroups = [
  {
    state: 'Indiana',
    abbr: 'IN',
    keys: ['evansville', 'newburgh', 'boonville', 'princeton', 'mount-vernon-in', 'new-harmony-in'],
  },
  { state: 'Kentucky', abbr: 'KY', keys: ['henderson-ky', 'owensboro-ky'] },
  { state: 'Illinois', abbr: 'IL', keys: ['mount-carmel-il'] },
]

export default function LocationsPage() {
  return (
    <>
      <main className="min-h-screen">
        <PageHero
          title="Our Service Areas"
          description="Professional junk removal across the Evansville tri-state region. Same-day service, transparent pricing, and eco-friendly disposal in every community we serve."
          eyebrow="Locations"
        />

        {stateGroups.map(group => (
          <section key={group.abbr} className="border-border border-b py-16">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="text-foreground mb-8 text-2xl font-bold">{group.state}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.keys.map(key => {
                  const data = locationData[key]
                  if (!data) return null
                  const href = locationSlugs[key]
                  return (
                    <Link
                      key={key}
                      href={href ?? '#'}
                      className="border-border bg-card hover:border-foreground/20 group rounded-lg border p-6 transition-colors"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="text-foreground text-lg font-semibold">
                            {data.locationName}, {group.abbr}
                          </h3>
                          {data.driveTime && (
                            <p className="text-muted-foreground text-xs">{data.driveTime}</p>
                          )}
                        </div>
                        <ArrowRight className="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors" />
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {data.tagline}
                      </p>
                      <div className="text-muted-foreground space-y-1 text-xs">
                        {data.landmarks.slice(0, 3).map(landmark => (
                          <div key={landmark} className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span>{landmark}</span>
                          </div>
                        ))}
                      </div>
                      {data.offers.length > 0 && (
                        <div className="bg-muted mt-4 rounded px-3 py-1.5 text-xs font-medium">
                          {data.offers[0].title}: {data.offers[0].discount}
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-foreground mb-4 text-2xl font-bold">
              Don&apos;t See Your Area?
            </h2>
            <p className="text-muted-foreground mb-8">
              We regularly expand our service area. Call us to check if we can serve your location —
              we may already be on our way.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${settings.phoneE164}`}
                className="bg-foreground text-background inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-opacity hover:opacity-90"
              >
                <Phone className="h-4 w-4" />
                Call {settings.phone}
              </a>
              <Link
                href="/quote"
                className="border-border text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition-colors"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <StructuredData
        type="LocalBusiness"
        data={{
          locationName: 'Tri-State Service Area',
        }}
      />
    </>
  )
}
