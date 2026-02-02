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
      <section className="border-border border-b py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Features */}
            <div>
              <h2 className="text-foreground mb-6 text-2xl font-bold">
                Why Choose Uncle Sam Junk Removal?
              </h2>
              <div className="space-y-5">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <IconComponent className="text-foreground h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phoneE164}`}
                  className="border-primary/30 bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  <Phone className="h-4 w-4" />
                  {ctaPrimary}
                </a>
                <QuoteCtaLink
                  location="service-template"
                  label={ctaSecondary}
                  className="border-border bg-accent text-accent-foreground hover:bg-accent/80 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors"
                >
                  {ctaSecondary}
                  <ArrowRight className="h-4 w-4" />
                </QuoteCtaLink>
              </div>
            </div>

            {/* Right: Pricing */}
            {pricing.length > 0 && (
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="text-foreground mb-6 text-xl font-bold">{pricingTitle}</h3>
                <div className="space-y-4">
                  {pricing.map((tier, index) => (
                    <div
                      key={index}
                      className="border-border flex items-center justify-between border-b pb-3 last:border-0"
                    >
                      <div>
                        <span className="text-foreground font-medium">{tier.name}</span>
                        {tier.description && (
                          <p className="text-muted-foreground text-sm">{tier.description}</p>
                        )}
                      </div>
                      <span className="text-foreground font-semibold">
                        {tier.price.startsWith('From')
                          ? tier.price
                          : `${UNIFORM_OFFERS.STARTING_AT} ${tier.price}`}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  {pricingNote ||
                    `${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`}
                </p>
              </div>
            )}
          </div>

          {children}
        </div>
      </section>

      {/* Steps Section */}
      {steps.length > 0 && (
        <section className="border-border bg-muted/30 border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-foreground mb-10 text-center text-2xl font-bold">{stepsTitle}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div
                    key={index}
                    className="border-border bg-card rounded-lg border p-6 text-center"
                  >
                    <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                      <IconComponent className="text-foreground h-6 w-6" />
                    </div>
                    <h3 className="text-foreground mb-2 font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Services & Internal Links */}
      {relatedContent && relatedContent.length > 0 && (
        <section className="bg-card border-border border-t py-12">
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
        <section className="border-border border-t py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-foreground mb-10 text-center text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-border bg-card rounded-lg border p-6">
                  <h3 className="text-foreground mb-2 font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
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

      {faqs.length > 0 && <StructuredData type="FAQPage" data={{ faqs: faqs }} />}
    </main>
  )
}
