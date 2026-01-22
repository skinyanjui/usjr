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
}: LocationPageTemplateProps) {
  return (
    <main className="min-h-screen">
      <PageHero
        title={`Junk Removal in ${locationName}, ${state}`}
        description={tagline}
        eyebrow="Service Area"
      />

      {/* Features Section */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Features */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Why {locationName} Chooses Us
              </h2>
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <feature.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phoneE164}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  <Phone className="h-4 w-4" />
                  Call {settings.phone}
                </a>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: Service Areas */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-6 text-xl font-bold text-foreground">
                {locationName} Service Areas
              </h3>

              {neighborhoods.length > 0 && (
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {neighborhoods.map(neighborhood => (
                    <div key={neighborhood} className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{neighborhood}</span>
                    </div>
                  ))}
                </div>
              )}

              {landmarks.length > 0 && (
                <div className={neighborhoods.length > 0 ? 'border-t border-border pt-6' : ''}>
                  <h4 className="mb-3 font-semibold text-foreground">Nearby Landmarks</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {landmarks.map(landmark => (
                      <div key={landmark}>• {landmark}</div>
                    ))}
                  </div>
                </div>
              )}

              {serviceGuarantee && (
                <div className="mt-6 rounded-lg bg-muted p-4">
                  <h4 className="mb-2 font-semibold text-foreground">{serviceGuarantee.title}</h4>
                  <p className="text-sm text-muted-foreground">{serviceGuarantee.description}</p>
                </div>
              )}

              {disposalNote && (
                <div className="mt-6 border-t border-border pt-6">
                  <h4 className="mb-2 font-semibold text-foreground">Local Disposal</h4>
                  <p className="text-sm text-muted-foreground">{disposalNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      {stories.length > 0 && (
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
              {locationName} Customer Stories
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-2 font-semibold text-foreground">{story.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{story.description}</p>
                  <p className="text-xs text-muted-foreground">
                    — {story.author}, {story.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


    </main>
  )
}
