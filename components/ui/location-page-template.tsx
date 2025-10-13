import { Button } from '@/components/ui/button'
import { MapPin, LucideIcon } from 'lucide-react'
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
  theme: 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'teal'
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

const themeConfig = {
  red: {
    background: 'bg-red-50',
    primary: 'text-red-600',
    button: 'bg-red-600 hover:bg-red-700',
    outline: 'border-red-800 text-red-800 hover:bg-red-800',
    accent: 'bg-red-50',
    accentText: 'text-red-800',
    accentTextLight: 'text-red-700',
    ctaBackground: 'bg-red-100',
  },
  blue: {
    background: 'bg-blue-50',
    primary: 'text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700',
    outline: 'border-blue-800 text-blue-800 hover:bg-blue-800',
    accent: 'bg-blue-50',
    accentText: 'text-blue-800',
    accentTextLight: 'text-blue-700',
    ctaBackground: 'bg-blue-100',
  },
  green: {
    background: 'bg-green-50',
    primary: 'text-green-600',
    button: 'bg-green-600 hover:bg-green-700',
    outline: 'border-green-800 text-green-800 hover:bg-green-800',
    accent: 'bg-green-50',
    accentText: 'text-green-800',
    accentTextLight: 'text-green-700',
    ctaBackground: 'bg-green-100',
  },
  orange: {
    background: 'bg-orange-50',
    primary: 'text-orange-600',
    button: 'bg-orange-600 hover:bg-orange-700',
    outline: 'border-orange-800 text-orange-800 hover:bg-orange-800',
    accent: 'bg-orange-50',
    accentText: 'text-orange-800',
    accentTextLight: 'text-orange-700',
    ctaBackground: 'bg-orange-100',
  },
  purple: {
    background: 'bg-purple-50',
    primary: 'text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700',
    outline: 'border-purple-800 text-purple-800 hover:bg-purple-800',
    accent: 'bg-purple-50',
    accentText: 'text-purple-800',
    accentTextLight: 'text-purple-700',
    ctaBackground: 'bg-purple-100',
  },
  teal: {
    background: 'bg-teal-50',
    primary: 'text-teal-600',
    button: 'bg-teal-600 hover:bg-teal-700',
    outline: 'border-teal-800 text-teal-800 hover:bg-teal-800',
    accent: 'bg-teal-50',
    accentText: 'text-teal-800',
    accentTextLight: 'text-teal-700',
    ctaBackground: 'bg-teal-100',
  },
}

export function LocationPageTemplate({
  locationName,
  state,
  tagline,
  theme,
  features,
  landmarks = [],
  neighborhoods = [],
  offers = [],
  stories = [],
  serviceGuarantee,
  disposalNote,
  ctaPrimary = `📞 Call ${settings.phone}`,
  ctaSecondary = 'Text Photos for Instant Quote',
}: LocationPageTemplateProps) {
  const colors = themeConfig[theme]
  const heroColors = {
    red: 'red',
    blue: 'blue',
    green: 'green',
    orange: 'orange',
    purple: 'purple',
    teal: 'teal',
  } as const

  return (
    <main className="min-h-screen">
      <PageHero
        title={`Professional Junk Removal in ${locationName}, ${state}`}
        description={tagline}
        color={heroColors[theme] ?? 'blue'}
      />

      {/* Local Expertise Section */}
      <section className={`py-16 ${colors.background}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {locationName}'s Trusted Junk Removal Experts Since 2025
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Local experts serving {locationName} with comprehensive junk removal services. We know
              every neighborhood and provide efficient, affordable service you can trust.
            </p>
          </div>

          <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Why {locationName} Chooses Uncle Sam Junk Removal
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <feature.icon className={`h-6 w-6 ${colors.primary} mt-1 flex-shrink-0`} />
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                  className={`${colors.button} w-full px-6 py-3 text-base font-semibold text-white sm:w-auto sm:px-8 sm:py-4 sm:text-lg`}
                >
                  {ctaPrimary}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`${colors.outline} w-full bg-transparent px-6 py-3 text-base font-semibold hover:text-white sm:w-auto sm:px-8 sm:py-4 sm:text-lg`}
                >
                  <a href={`sms:${settings.phoneE164}`}>{ctaSecondary}</a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Comprehensive {locationName} Service Areas
              </h3>

              {neighborhoods.length > 0 && (
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {neighborhoods.map(neighborhood => (
                    <div key={neighborhood} className="flex items-center gap-2">
                      <MapPin className={`h-4 w-4 ${colors.primary}`} />
                      <span className="text-gray-700">{neighborhood}</span>
                    </div>
                  ))}
                </div>
              )}

              {landmarks.length > 0 && (
                <div className={neighborhoods.length > 0 ? 'border-t border-gray-200 pt-6' : ''}>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    {neighborhoods.length > 0
                      ? 'Landmark Areas We Regularly Service'
                      : `${locationName} Landmarks We Service`}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    {landmarks.map(landmark => (
                      <div key={landmark}>• {landmark}</div>
                    ))}
                  </div>
                </div>
              )}

              {serviceGuarantee && (
                <div className={`mt-6 p-4 ${colors.accent} rounded-lg`}>
                  <h4 className={`font-semibold ${colors.accentText} mb-2`}>
                    {serviceGuarantee.title}
                  </h4>
                  <p className={`text-sm ${colors.accentTextLight}`}>
                    {serviceGuarantee.description}
                  </p>
                </div>
              )}

              {disposalNote && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h4 className="mb-3 font-semibold text-gray-900">Local Disposal Info</h4>
                  <p className="text-sm text-gray-600">{disposalNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      {stories.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Real {locationName} Success Stories
            </h2>
            <div className="mb-12 grid gap-8 md:grid-cols-3">
              {stories.map((story, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 font-semibold text-gray-900">{story.title}</h3>
                  <p className="mb-3 text-gray-600">{story.description}</p>
                  <p className="text-sm text-gray-500">
                    - {story.author}, {story.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Location Offers */}
      {offers.length > 0 && (
        <section className={`py-16 ${colors.accent}`}>
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Exclusive {locationName} Offers
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Special pricing for our local {locationName} neighbors - because community matters.
            </p>

            <div className="mb-8 grid gap-6 md:grid-cols-3">
              {offers.map((offer, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 font-semibold text-gray-900">{offer.title}</h3>
                  <p className={`${colors.primary} mb-2 text-xl font-bold`}>{offer.discount}</p>
                  <p className="text-sm text-gray-600">{offer.description}</p>
                </div>
              ))}
            </div>

            <div className={`rounded-lg p-6 ${colors.ctaBackground}`}>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Ready to Clean Up {locationName}?
              </h3>
              <p className="mb-4 text-gray-700">
                Join hundreds of satisfied {locationName} customers who trust Uncle Sam Junk Removal
              </p>
              <Button className={`${colors.button} px-8 py-3 font-semibold text-white`}>
                Get Your Free {locationName} Quote Today
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
