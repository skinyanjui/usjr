import type React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { RelatedServices } from '@/components/related-services'
import { StructuredData } from '@/components/structured-data'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'

export interface ServiceStep {
  icon: LucideIcon
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface PricingTier {
  name: string
  price: string
  description?: string
}

export interface ServicePageTemplateProps {
  // Hero section
  title: string
  description: string
  badges?: string[]
  heroImage?: string

  // Theme
  theme: 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'teal'

  // Structured data
  serviceCategory?: string
  serviceArea?: string[]

  // Features section
  features: Array<{
    icon: LucideIcon
    title: string
    description: string
  }>

  // Steps/Process section
  steps: ServiceStep[]
  stepsTitle?: string

  // Pricing section
  pricing: PricingTier[]
  pricingTitle?: string
  pricingNote?: string

  // FAQ section
  faqs: FAQ[]

  // CTA section
  ctaPrimary?: string
  ctaSecondary?: string

  // Additional content
  children?: React.ReactNode
}

const themeClasses = {
  red: {
    background: 'bg-red-50',
    primary: 'bg-red-600 hover:bg-red-700',
    secondary: 'border-red-700 text-red-700 hover:bg-red-700 hover:text-white',
    accent: 'text-red-600',
    icon: 'bg-red-600',
    badge: 'bg-red-100 text-red-800 border-red-200',
  },
  blue: {
    background: 'bg-blue-50',
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white',
    accent: 'text-blue-600',
    icon: 'bg-blue-600',
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  green: {
    background: 'bg-green-50',
    primary: 'bg-green-600 hover:bg-green-700',
    secondary: 'border-green-700 text-green-700 hover:bg-green-700 hover:text-white',
    accent: 'text-green-600',
    icon: 'bg-green-600',
    badge: 'bg-green-100 text-green-800 border-green-200',
  },
  orange: {
    background: 'bg-orange-50',
    primary: 'bg-orange-600 hover:bg-orange-700',
    secondary: 'border-orange-700 text-orange-700 hover:bg-orange-700 hover:text-white',
    accent: 'text-orange-600',
    icon: 'bg-orange-600',
    badge: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  purple: {
    background: 'bg-purple-50',
    primary: 'bg-purple-600 hover:bg-purple-700',
    secondary: 'border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white',
    accent: 'text-purple-600',
    icon: 'bg-purple-600',
    badge: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  teal: {
    background: 'bg-teal-50',
    primary: 'bg-teal-600 hover:bg-teal-700',
    secondary: 'border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white',
    accent: 'text-teal-600',
    icon: 'bg-teal-600',
    badge: 'bg-teal-100 text-teal-800 border-teal-200',
  },
}

export function ServicePageTemplate({
  title,
  description,
  badges = [],
  theme,
  serviceCategory,
  serviceArea,
  features = [],
  steps = [],
  stepsTitle = 'How It Works',
  pricing = [],
  pricingTitle = 'Pricing',
  pricingNote,
  faqs = [],
  ctaPrimary = `📞 ${UNIFORM_OFFERS.CALL_NOW}`,
  ctaSecondary = UNIFORM_OFFERS.GET_FREE_QUOTE,
  children,
  heroImage,
}: ServicePageTemplateProps) {
  const classes = themeClasses[theme]

  return (
    <main className="min-h-screen">
      {heroImage && (
        <PageHero title={title} description={description} imageSrc={heroImage} priority />
      )}
      {/* Hero Section */}
      <section className={`pt-32 pb-16 ${classes.background}`}>
        <div className="mx-auto max-w-7xl px-4">
          {!heroImage && (
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mb-6 text-lg text-gray-600 sm:text-xl">{description}</p>

              {badges.length > 0 && (
                <div className="flex items-center justify-center gap-4 text-gray-700">
                  {badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Clock className={`h-5 w-5 ${classes.accent}`} />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                Why Choose Uncle Sam Junk Removal?
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <IconComponent className={`h-6 w-6 ${classes.accent} mt-1`} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                  asChild
                  className={`${classes.primary} w-full px-6 py-3 text-base font-semibold text-white sm:w-auto sm:px-8 sm:py-4 sm:text-lg`}
                >
                  <a href={`tel:${settings.phoneE164}`}>{ctaPrimary}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`${classes.secondary} w-full bg-transparent px-6 py-3 text-base font-semibold sm:w-auto sm:px-8 sm:py-4 sm:text-lg`}
                >
                  <QuoteCtaLink location="service-template" label={ctaSecondary}>
                    {ctaSecondary}
                  </QuoteCtaLink>
                </Button>
              </div>
            </div>

            {/* Pricing Card */}
            {pricing.length > 0 && (
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">{pricingTitle}</h3>
                <div className="space-y-4">
                  {pricing.map((tier, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-200 py-3"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{tier.name}</span>
                        {tier.description && (
                          <div className="text-sm text-gray-600">{tier.description}</div>
                        )}
                      </div>
                      <span className={`${classes.accent} font-bold`}>
                        {tier.price.startsWith('From')
                          ? tier.price
                          : `${UNIFORM_OFFERS.STARTING_AT} ${tier.price}`}
                      </span>
                    </div>
                  ))}
                </div>
                {pricingNote && <p className="mt-4 text-sm text-gray-600">{pricingNote}</p>}
                {!pricingNote && (
                  <p className="mt-4 text-sm text-gray-600">
                    {PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}.{' '}
                    {PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.
                  </p>
                )}
              </div>
            )}
          </div>

          {children}
        </div>
      </section>

      {/* Steps Section */}
      {steps.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">{stepsTitle}</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <Card
                    key={index}
                    className="glass text-center transition-transform duration-300 hover:scale-105"
                  >
                    <CardHeader>
                      <div
                        className={`${classes.icon} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="bg-white">
        <RelatedServices />
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: title,
          description: description,
          category: serviceCategory || 'Junk Removal Service',
          price:
            pricing.length > 0 ? pricing[0]?.price || 'Contact for pricing' : 'Contact for pricing',
          serviceArea: serviceArea || settings.serviceAreas,
          offers: [
            {
              name: UNIFORM_OFFERS.SAME_DAY_SERVICE,
              description: 'Same-day service available for most locations',
            },
            {
              name: UNIFORM_OFFERS.FREE_ESTIMATES,
              description: 'Free estimates provided via phone, text, or in-person',
              price: 'Free',
            },
          ],
        }}
      />

      {/* FAQ Structured Data */}
      {faqs.length > 0 && <StructuredData type="FAQPage" data={{ faqs: faqs }} />}
    </main>
  )
}
