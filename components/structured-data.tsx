import { settings, getActiveServices, getAggregateTestimonialStats } from "@/lib/cms-content"
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from "@/lib/uniform-offers"

type FaqItem = { question: string; answer: string }

interface BreadcrumbItem { name: string; url: string }

interface ServiceOffer {
  name: string
  description: string
  price?: string
  availability?: string
}

interface StructuredDataProps {
  type: "LocalBusiness" | "Service" | "FAQPage" | "BreadcrumbList"
  data?:
    | { 
        name?: string
        description?: string
        price?: string
        category?: string
        offers?: ServiceOffer[]
        serviceArea?: string[]
      }
    | { faqs?: FaqItem[] }
    | { breadcrumbs?: BreadcrumbItem[] }
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: Record<string, unknown> = {}

  switch (type) {
    case "LocalBusiness": {
      const hours = settings.businessHours
      const openingHours = [
        `Mo ${hours.monday.replace(/\s/g, '')}`,
        `Tu ${hours.tuesday.replace(/\s/g, '')}`,
        `We ${hours.wednesday.replace(/\s/g, '')}`,
        `Th ${hours.thursday.replace(/\s/g, '')}`,
        `Fr ${hours.friday.replace(/\s/g, '')}`,
        `Sa ${hours.saturday.replace(/\s/g, '')}`,
        `Su ${hours.sunday.toLowerCase().includes("closed") ? "closed" : hours.sunday.replace(/\s/g, '')}`,
      ]

      const activeServices = getActiveServices()
      const priceRange = (() => {
        const prices = activeServices
          .map((s) => s.price.match(/\$?\d+/g))
          .filter(Boolean)
          .flat()
          .map((p) => Number(String(p).replace(/[^\d]/g, '')))
          .filter((n) => !Number.isNaN(n))
          .sort((a, b) => a - b)
        if (prices.length === 0) return undefined
        const min = prices[0]
        const max = prices[prices.length - 1]
        return `$${min}${max && max !== min ? `-$${max}` : '+'}`
      })()

      const agg = getAggregateTestimonialStats()

      structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://unclesamjunkremoval.com/#organization",
        name: "Uncle Sam Junk Removal",
        description:
          "Professional residential and commercial cleaning services in Evansville, IN using natural, eco-friendly products. Veteran-owned business.",
        url: "https://unclesamjunkremoval.com",
        telephone: settings.phoneE164,
        email: settings.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Evansville",
          addressRegion: "IN",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "37.9747",
          longitude: "-87.5558",
        },
        openingHours,
        serviceArea: settings.serviceAreas.map((area) => ({
          "@type": "City",
          name: area,
        })),
        services: activeServices.map((service) => service.name),
        priceRange: priceRange || undefined,
        paymentAccepted: ["Cash", "Credit Card", "Check"],
        currenciesAccepted: "USD",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Junk Removal and Cleaning Services",
          itemListElement: activeServices.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
              category: service.category,
            },
            price: service.price,
            priceSpecification: {
              "@type": "PriceSpecification",
              price: service.price,
              priceCurrency: "USD",
              valueAddedTaxIncluded: false,
            },
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            businessFunction: "https://schema.org/Sell",
            offeredBy: {
              "@type": "LocalBusiness",
              "@id": "https://unclesamjunkremoval.com/#organization"
            },
            includesObject: [
              {
                "@type": "Service",
                name: UNIFORM_OFFERS.SAME_DAY_SERVICE,
                description: "Same-day service available for most areas"
              },
              {
                "@type": "Service", 
                name: UNIFORM_OFFERS.FREE_ESTIMATES,
                description: "Free estimates provided for all services"
              }
            ]
          })),
        },
        aggregateRating: agg.reviewCount > 0 ? {
          "@type": "AggregateRating",
          ratingValue: String(agg.averageRating),
          reviewCount: String(agg.reviewCount),
          bestRating: "5",
          worstRating: "1",
        } : undefined,
        sameAs: [settings.socialMedia.facebook, settings.socialMedia.instagram, settings.socialMedia.google].filter(
          Boolean,
        ),
      }
      break
    }

    case "Service": {
      const svc = (data as { 
        name?: string
        description?: string
        price?: string
        category?: string
        offers?: ServiceOffer[]
        serviceArea?: string[]
      }) || {}
      
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: svc.name || "Junk Removal Service",
        description: svc.description || "Professional junk removal service",
        provider: {
          "@type": "LocalBusiness",
          "@id": "https://unclesamjunkremoval.com/#organization",
          name: "Uncle Sam Junk Removal",
          telephone: settings.phoneE164,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Evansville",
            addressRegion: "IN",
            addressCountry: "US",
          },
        },
        serviceArea: svc.serviceArea || settings.serviceAreas,
        offers: [
          {
            "@type": "Offer",
            name: svc.name || "Service",
            priceRange: svc.price || "Contact for pricing",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            description: PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR,
            businessFunction: "https://schema.org/Sell",
            seller: {
              "@type": "LocalBusiness",
              "@id": "https://unclesamjunkremoval.com/#organization"
            }
          },
          // Add standard service offers
          {
            "@type": "Offer",
            name: UNIFORM_OFFERS.SAME_DAY_SERVICE,
            description: "Same-day service available for most locations",
            availability: "https://schema.org/InStock",
            businessFunction: "https://schema.org/Sell"
          },
          {
            "@type": "Offer", 
            name: UNIFORM_OFFERS.FREE_ESTIMATES,
            description: "Free estimates provided via phone, text, or in-person",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            businessFunction: "https://schema.org/Sell"
          }
        ],
        category: svc.category || "Junk Removal Service",
        serviceType: svc.category || "Junk Removal",
        areaServed: (svc.serviceArea || settings.serviceAreas).map(area => ({
          "@type": "City",
          name: area
        }))
      }
      break
    }

    case "FAQPage": {
      const f = (data as { faqs?: FaqItem[] }) || {}
      structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity:
          f?.faqs?.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })) || [],
      }
      break
    }

    case "BreadcrumbList": {
      const b = (data as { breadcrumbs?: BreadcrumbItem[] }) || {}
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement:
          b?.breadcrumbs?.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
          })) || [],
      }
      break
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
