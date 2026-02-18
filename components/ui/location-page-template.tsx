import type { ReactNode } from 'react'
import Link from 'next/link'
import { MapPin, Phone, ArrowRight, type LucideIcon } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'

export interface LocationFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface LocationOffer {
  title: string
  discount: string
  description: string
  validFrom?: string | undefined
  validThrough?: string | undefined
}

export interface LocationStory {
  title: string
  description: string
  author: string
  location: string
}

export interface LocationPageTemplateProps {
  locationName: string
  state: string
  tagline: string
  theme?: 'primary'
  features: LocationFeature[]
  landmarks?: string[]
  neighborhoods?: string[]
  offers?: LocationOffer[]
  stories?: LocationStory[]
  serviceGuarantee?: {
    title: string
    description: string
  }
  disposalNote?: string
  ctaPrimary?: string
  ctaSecondary?: string
  children?: ReactNode
}

export function LocationPageTemplate({
  locationName,
  state,
  tagline,
  features,
  landmarks = [],
  neighborhoods = [],
  stories = [],
  serviceGuarantee,
  disposalNote,
  children,
}: LocationPageTemplateProps) {
  return (
    <main className="min-h-screen">
      <PageHero
        title={`Junk Removal in ${locationName}, ${state}`}
        description={tagline}
        eyebrow="Service Area"
      />

      {/* Features Section */}
      <section className="border-border border-b py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Features */}
            <div>
              <h2 className="text-foreground mb-6 text-2xl font-bold">
                Why {locationName} Chooses Us
              </h2>
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      <feature.icon className="text-foreground h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phoneE164}`}
                  className="bg-foreground text-background inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  <Phone className="h-4 w-4" />
                  Call {settings.phone}
                </a>
                <Link
                  href="/quote"
                  className="border-border text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors"
                >
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Service Areas */}
            <div className="border-border bg-card rounded-lg border p-6">
              <h3 className="text-foreground mb-6 text-xl font-bold">
                {locationName} Service Areas
              </h3>

              {neighborhoods.length > 0 && (
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {neighborhoods.map(neighborhood => (
                    <div key={neighborhood} className="flex items-center gap-2 text-sm">
                      <MapPin className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">{neighborhood}</span>
                    </div>
                  ))}
                </div>
              )}

              {landmarks.length > 0 && (
                <div className={neighborhoods.length > 0 ? 'border-border border-t pt-6' : ''}>
                  <h4 className="text-foreground mb-3 font-semibold">Nearby Landmarks</h4>
                  <div className="text-muted-foreground grid grid-cols-2 gap-2 text-sm">
                    {landmarks.map(landmark => (
                      <div key={landmark}>• {landmark}</div>
                    ))}
                  </div>
                </div>
              )}

              {serviceGuarantee && (
                <div className="bg-muted mt-6 rounded-lg p-4">
                  <h4 className="text-foreground mb-2 font-semibold">{serviceGuarantee.title}</h4>
                  <p className="text-muted-foreground text-sm">{serviceGuarantee.description}</p>
                </div>
              )}

              {disposalNote && (
                <div className="border-border mt-6 border-t pt-6">
                  <h4 className="text-foreground mb-2 font-semibold">Local Disposal</h4>
                  <p className="text-muted-foreground text-sm">{disposalNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      {stories.length > 0 && (
        <section className="border-border bg-muted/30 border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-foreground mb-10 text-center text-2xl font-bold">
              {locationName} Customer Stories
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, index) => (
                <div key={index} className="border-border bg-card rounded-lg border p-6">
                  <h3 className="text-foreground mb-2 font-semibold">{story.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{story.description}</p>
                  <p className="text-muted-foreground text-xs">
                    — {story.author}, {story.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location-specific promotions, reviews, and other content */}
      {children && (
        <section className="border-border border-b py-10">
          <div className="mx-auto max-w-6xl space-y-6 px-4">{children}</div>
        </section>
      )}
    </main>
  )
}
