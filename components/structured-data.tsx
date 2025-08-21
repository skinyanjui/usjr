import { settings, getActiveServices } from "@/lib/cms-content"

type FaqItem = { question: string; answer: string }

interface BreadcrumbItem { name: string; url: string }

interface StructuredDataProps {
  type: "LocalBusiness" | "Service" | "FAQPage" | "BreadcrumbList"
  data?:
    | { name?: string; description?: string; price?: string; category?: string }
    | { faqs?: FaqItem[] }
    | { breadcrumbs?: BreadcrumbItem[] }
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: Record<string, unknown> = {}

  switch (type) {
    case "LocalBusiness": {
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
        openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-16:00", "Su closed"],
        serviceArea: settings.serviceAreas.map((area) => ({
          "@type": "City",
          name: area,
        })),
        services: getActiveServices().map((service) => service.name),
        priceRange: "From $80-$200",
        paymentAccepted: ["Cash", "Credit Card", "Check"],
        currenciesAccepted: "USD",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cleaning Services",
          itemListElement: getActiveServices().map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
            },
            price: service.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
          })),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "200",
          bestRating: "5",
          worstRating: "1",
        },
        sameAs: [settings.socialMedia.facebook, settings.socialMedia.instagram, settings.socialMedia.google].filter(
          Boolean,
        ),
      }
      break
    }

    case "Service": {
      const svc = (data as { name?: string; description?: string; price?: string; category?: string }) || {}
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: svc.name || "Cleaning Service",
        description: svc.description || "Professional cleaning service",
        provider: {
          "@type": "LocalBusiness",
          name: "Uncle Sam Junk Removal",
          telephone: settings.phoneE164,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Evansville",
            addressRegion: "IN",
            addressCountry: "US",
          },
        },
        serviceArea: settings.serviceAreas,
        offers: {
          "@type": "Offer",
          priceRange: svc.price || "From $80+",
          availability: "https://schema.org/InStock",
          validFrom: new Date().toISOString(),
        },
        category: svc.category || "Cleaning Service",
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
