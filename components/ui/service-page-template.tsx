import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { settings } from "@/lib/cms-content"
import Link from "next/link"
import { trackQuoteClick } from "@/lib/quoteTracking"

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
  theme: "red" | "blue" | "green" | "orange" | "purple" | "teal"

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
    gradient: "from-red-50 to-white",
    primary: "bg-red-600 hover:bg-red-700",
    secondary: "border-red-700 text-red-700 hover:bg-red-700 hover:text-white",
    accent: "text-red-600",
    icon: "bg-red-600",
    badge: "bg-red-100 text-red-800 border-red-200",
  },
  blue: {
    gradient: "from-blue-50 to-white",
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",
    accent: "text-blue-600",
    icon: "bg-blue-600",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
  },
  green: {
    gradient: "from-green-50 to-white",
    primary: "bg-green-600 hover:bg-green-700",
    secondary: "border-green-700 text-green-700 hover:bg-green-700 hover:text-white",
    accent: "text-green-600",
    icon: "bg-green-600",
    badge: "bg-green-100 text-green-800 border-green-200",
  },
  orange: {
    gradient: "from-orange-50 to-white",
    primary: "bg-orange-600 hover:bg-orange-700",
    secondary: "border-orange-700 text-orange-700 hover:bg-orange-700 hover:text-white",
    accent: "text-orange-600",
    icon: "bg-orange-600",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
  },
  purple: {
    gradient: "from-purple-50 to-white",
    primary: "bg-purple-600 hover:bg-purple-700",
    secondary: "border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white",
    accent: "text-purple-600",
    icon: "bg-purple-600",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
  },
  teal: {
    gradient: "from-teal-50 to-white",
    primary: "bg-teal-600 hover:bg-teal-700",
    secondary: "border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white",
    accent: "text-teal-600",
    icon: "bg-teal-600",
    badge: "bg-teal-100 text-teal-800 border-teal-200",
  },
}

export function ServicePageTemplate({
  title,
  description,
  badges = [],
  theme,
  features = [],
  // Steps unused in current template; keep props for future but do not bind
  steps: _unusedSteps = [],
  stepsTitle: _unusedStepsTitle = "How It Works",
  pricing = [],
  pricingTitle = "Pricing",
  pricingNote,
  faqs = [],
  ctaPrimary = "📞 Call Now",
  ctaSecondary = "Get Free Quote",
  children,
}: ServicePageTemplateProps) {
  const classes = themeClasses[theme]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className={`pt-32 pb-16 bg-gradient-to-b ${classes.gradient}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">{description}</p>

            {badges.length > 0 && (
              <div className="flex items-center justify-center gap-4 text-gray-700">
                {badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Clock className={`w-5 h-5 ${classes.accent}`} />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Why Choose Uncle Sam Junk Removal?</h2>
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <IconComponent className={`w-6 h-6 ${classes.accent} mt-1`} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild className={`${classes.primary} w-full sm:w-auto text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold`}>
                  <a href={`tel:${settings.phoneE164}`}>{ctaPrimary}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`${classes.secondary} w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent`}
                >
                  <Link
                    href="/quote"
                    prefetch
                    onClick={() => trackQuoteClick({ location: "service-template", label: ctaSecondary, destination: "/quote" })}
                  >
                    {ctaSecondary}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Pricing Card */}
            {pricing.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{pricingTitle}</h3>
                <div className="space-y-4">
                  {pricing.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <span className="font-medium text-gray-900">{tier.name}</span>
                        {tier.description && <div className="text-sm text-gray-600">{tier.description}</div>}
                      </div>
                      <span className={`${classes.accent} font-bold`}>{tier.price}</span>
                    </div>
                  ))}
                </div>
                {pricingNote && <p className="text-sm text-gray-600 mt-4">{pricingNote}</p>}
              </div>
            )}
          </div>

          {children}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
