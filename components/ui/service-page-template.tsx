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

  // Theme - Linear.app inspired: black/white with brand accent only
  theme?: 'primary'

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
  primary: {
    background: 'bg-background',
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    accent: 'text-primary',
    icon: 'bg-primary text-primary-foreground',
    badge: 'bg-muted text-muted-foreground border-border',
  },
}

export function ServicePageTemplate({
  title,
  description,
  badges = [],
  theme = 'primary',
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
}: ServicePageTemplateProps) {
  const classes = themeClasses.primary

  return (
    <main className="min-h-screen">
      <PageHero title={title} description={description} color="primary" />
      {/* Hero Section */}
      <section className={`pt-12 pb-12 ${classes.background}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-foreground mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">
              What to Expect
            </h2>

            {badges.length > 0 && (
              <div className="text-muted-foreground flex items-center justify-center gap-4">
                {badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Clock className={`h-5 w-5 ${classes.accent}`} />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-12 grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground mb-4 text-xl font-bold sm:text-2xl">
                Why Choose Uncle Sam Junk Removal?
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <IconComponent className={`h-6 w-6 ${classes.accent} mt-1`} />
                      <div>
                        <h3 className="text-foreground font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className={`${classes.primary} px-6 py-2.5 text-base font-semibold text-white`}
                >
                  <a href={`tel:${settings.phoneE164}`}>{ctaPrimary}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`${classes.secondary} bg-transparent px-6 py-2.5 text-base font-semibold`}
                >
                  <QuoteCtaLink location="service-template" label={ctaSecondary}>
                    {ctaSecondary}
                  </QuoteCtaLink>
                </Button>
              </div>
            </div>

            {/* Pricing Card */}
            {pricing.length > 0 && (
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <h3 className="text-foreground mb-6 text-2xl font-bold">{pricingTitle}</h3>
                <div className="space-y-4">
                  {pricing.map((tier, index) => (
                    <div
                      key={index}
                      className="border-border flex items-center justify-between border-b py-3"
                    >
                      <div>
                        <span className="text-foreground font-medium">{tier.name}</span>
                        {tier.description && (
                          <div className="text-muted-foreground text-sm">{tier.description}</div>
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
                {pricingNote && <p className="text-muted-foreground mt-4 text-sm">{pricingNote}</p>}
                {!pricingNote && (
                  <p className="text-muted-foreground mt-4 text-sm">
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
        <section className="bg-card py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-foreground mb-12 text-center text-3xl font-bold">{stepsTitle}</h2>
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
                      <CardTitle className="text-foreground text-xl font-bold">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="bg-card">
        <RelatedServices />
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg font-semibold">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
