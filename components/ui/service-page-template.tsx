import type React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Phone, ArrowRight } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { InternalLinks } from '@/components/ui/internal-links'
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
  title: string
  description: string
  badges?: string[]
  theme?: 'primary'
  serviceCategory?: string
  serviceArea?: string[]
  features: Array<{
    icon: LucideIcon
    title: string
    description: string
  }>
  steps: ServiceStep[]
  stepsTitle?: string
  pricing: PricingTier[]
  pricingTitle?: string
  pricingNote?: string
  faqs: FAQ[]
  ctaPrimary?: string
  ctaSecondary?: string
  relatedContent?: {
    title: string
    href: string
    description: string
    type: 'service' | 'blog' | 'location'
    category?: string
  }[]
  children?: React.ReactNode
}

export function ServicePageTemplate({
  title,
  description,
  features = [],
  steps = [],
  stepsTitle = 'How It Works',
  pricing = [],
  pricingTitle = 'Pricing',
  pricingNote,
  faqs = [],
  ctaPrimary = `Call ${settings.phone}`,
  ctaSecondary = UNIFORM_OFFERS.GET_FREE_QUOTE,
  relatedContent = [],
  serviceCategory,
  serviceArea,
  children,
}: ServicePageTemplateProps) {
  return (
    <main className="min-h-screen">
      <PageHero title={title} description={description} />

      {/* Features Section */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Features */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Why Choose Uncle Sam Junk Removal?
              </h2>
              <div className="space-y-5">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <IconComponent className="h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phoneE164}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Phone className="h-4 w-4" />
                  {ctaPrimary}
                </a>
                <QuoteCtaLink
                  location="service-template"
                  label={ctaSecondary}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/80"
                >
                  {ctaSecondary}
                  <ArrowRight className="h-4 w-4" />
                </QuoteCtaLink>
              </div>
            </div>

            {/* Right: Pricing */}
            {pricing.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-6 text-xl font-bold text-foreground">{pricingTitle}</h3>
                <div className="space-y-4">
                  {pricing.map((tier, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <div>
                        <span className="font-medium text-foreground">{tier.name}</span>
                        {tier.description && (
                          <p className="text-sm text-muted-foreground">{tier.description}</p>
                        )}
                      </div>
                      <span className="font-semibold text-foreground">
                        {tier.price.startsWith('From')
                          ? tier.price
                          : `${UNIFORM_OFFERS.STARTING_AT} ${tier.price}`}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {pricingNote || `${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`}
                </p>
              </div>
            )}
          </div>

          {children}
        </div>
      </section>

      {/* Steps Section */}
      {steps.length > 0 && (
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
              {stepsTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div key={index} className="rounded-xl border border-border bg-card p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <IconComponent className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Services & Internal Links */}
      {relatedContent && relatedContent.length > 0 && (
        <section className="bg-card py-12 border-t border-border">
          <div className="mx-auto max-w-7xl px-4">
            <InternalLinks
              title="Related Services & Helpful Resources"
              links={relatedContent}
              variant="grid"
              theme="primary"
            />
          </div>
        </section>
      )}

      {/* Internal linking section (legacy support if children passed) */}
      {/* {children} is now strictly for other injected content, not links usually } */}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-2 font-semibold text-foreground">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: title,
          description: description,
          category: serviceCategory || 'Junk Removal Service',
          price: pricing.length > 0 ? pricing[0]?.price || 'Contact for pricing' : 'Contact for pricing',
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

      {faqs.length > 0 && <StructuredData type="FAQPage" data={{ faqs: faqs }} />}
    </main>
  )
}
