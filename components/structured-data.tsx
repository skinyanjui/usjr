import { settings, getActiveServices, getAggregateTestimonialStats } from '@/lib/cms-content'
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'

type FaqItem = { question: string; answer: string }

interface BreadcrumbItem {
  name: string
  url: string
}

interface ServiceOffer {
  name: string
  description: string
  price?: string
  availability?: string
}

interface LocationSpecificData {
  locationName?: string | undefined
  locationOffers?: Array<{
    title: string
    discount: string
    description: string
    validFrom?: string | undefined
    validThrough?: string | undefined
  }>
  reviews?: {
    averageRating: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
}

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Service' | 'FAQPage' | 'BreadcrumbList' | 'Offer' | 'Review'
  data?:
    | ({
        name?: string
        description?: string
        price?: string
        category?: string
        offers?: ServiceOffer[]
        serviceArea?: string[]
      } & LocationSpecificData)
    | { faqs?: FaqItem[] }
    | { breadcrumbs?: BreadcrumbItem[] }
    | LocationSpecificData
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: Record<string, unknown> = {}

  switch (type) {
    case 'LocalBusiness': {
      const hours = settings.businessHours
      const openingHours = [
        `Mo ${hours.monday.replace(/\s/g, '')}`,
        `Tu ${hours.tuesday.replace(/\s/g, '')}`,
        `We ${hours.wednesday.replace(/\s/g, '')}`,
        `Th ${hours.thursday.replace(/\s/g, '')}`,
        `Fr ${hours.friday.replace(/\s/g, '')}`,
        `Sa ${hours.saturday.replace(/\s/g, '')}`,
        `Su ${hours.sunday.toLowerCase().includes('closed') ? 'closed' : hours.sunday.replace(/\s/g, '')}`,
      ]

      const activeServices = getActiveServices()
      const priceRange = (() => {
        const prices = activeServices
          .reduce((acc, s) => {
            const matches = s.price.match(/\$?\d+/g)
            if (matches) {
              matches.forEach(m => {
                const num = Number(m.replace(/[^\d]/g, ''))
                if (!Number.isNaN(num)) acc.push(num)
              })
            }
            return acc
          }, [] as number[])
          .sort((a, b) => a - b)
        if (prices.length === 0) return undefined
        const min = prices[0]
        const max = prices[prices.length - 1]
        return `$${min}${max && max !== min ? `-$${max}` : '+'}`
      })()

      const agg = getAggregateTestimonialStats()

      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://unclesamjunkremoval.com/#organization',
        name: 'Uncle Sam Junk Removal',
        description:
          'Professional residential and commercial cleaning services in Evansville, IN using natural, eco-friendly products. Veteran-owned business.',
        url: 'https://unclesamjunkremoval.com',
        telephone: settings.phoneE164,
        email: settings.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Evansville',
          addressRegion: 'IN',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '37.9747',
          longitude: '-87.5558',
        },
        openingHours,
        serviceArea: settings.serviceAreas.map(area => ({
          '@type': 'City',
          name: area,
        })),
        services: activeServices.map(service => service.name),
        priceRange: priceRange || undefined,
        paymentAccepted: ['Cash', 'Credit Card', 'Check'],
        currenciesAccepted: 'USD',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Junk Removal and Cleaning Services',
          itemListElement: activeServices.map(service => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
              category: service.category,
            },
            price: service.price,
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: service.price,
              priceCurrency: 'USD',
              valueAddedTaxIncluded: false,
            },
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validFrom: new Date().toISOString(),
            businessFunction: 'https://schema.org/Sell',
            offeredBy: {
              '@type': 'LocalBusiness',
              '@id': 'https://unclesamjunkremoval.com/#organization',
            },
            includesObject: [
              {
                '@type': 'Service',
                name: UNIFORM_OFFERS.SAME_DAY_SERVICE,
                description: 'Same-day service available for most areas',
              },
              {
                '@type': 'Service',
                name: UNIFORM_OFFERS.FREE_ESTIMATES,
                description: 'Free estimates provided for all services',
              },
            ],
          })),
        },
        aggregateRating:
          agg.reviewCount > 0
            ? {
                '@type': 'AggregateRating',
                ratingValue: String(agg.averageRating),
                reviewCount: String(agg.reviewCount),
                bestRating: '5',
                worstRating: '1',
              }
            : undefined,
        sameAs: [
          settings.socialMedia.facebook,
          settings.socialMedia.instagram,
          settings.socialMedia.google,
        ].filter(Boolean),
      }
      break
    }

    case 'Service': {
      const svc =
        (data as {
          name?: string
          description?: string
          price?: string
          category?: string
          offers?: ServiceOffer[]
          serviceArea?: string[]
        }) || {}

      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: svc.name || 'Junk Removal Service',
        description: svc.description || 'Professional junk removal service',
        provider: {
          '@type': 'LocalBusiness',
          '@id': 'https://unclesamjunkremoval.com/#organization',
          name: 'Uncle Sam Junk Removal',
          telephone: settings.phoneE164,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Evansville',
            addressRegion: 'IN',
            addressCountry: 'US',
          },
        },
        serviceArea: svc.serviceArea || settings.serviceAreas,
        offers: [
          {
            '@type': 'Offer',
            name: svc.name || 'Service',
            priceRange: svc.price || 'Contact for pricing',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validFrom: new Date().toISOString(),
            description: PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR,
            businessFunction: 'https://schema.org/Sell',
            seller: {
              '@type': 'LocalBusiness',
              '@id': 'https://unclesamjunkremoval.com/#organization',
            },
          },
          // Add standard service offers
          {
            '@type': 'Offer',
            name: UNIFORM_OFFERS.SAME_DAY_SERVICE,
            description: 'Same-day service available for most locations',
            availability: 'https://schema.org/InStock',
            businessFunction: 'https://schema.org/Sell',
          },
          {
            '@type': 'Offer',
            name: UNIFORM_OFFERS.FREE_ESTIMATES,
            description: 'Free estimates provided via phone, text, or in-person',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            businessFunction: 'https://schema.org/Sell',
          },
        ],
        category: svc.category || 'Junk Removal Service',
        serviceType: svc.category || 'Junk Removal',
        areaServed: (svc.serviceArea || settings.serviceAreas).map(area => ({
          '@type': 'City',
          name: area,
        })),
      }
      break
    }

    case 'FAQPage': {
      const f = (data as { faqs?: FaqItem[] }) || {}
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity:
          f?.faqs?.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })) || [],
      }
      break
    }

    case 'BreadcrumbList': {
      const b = (data as { breadcrumbs?: BreadcrumbItem[] }) || {}
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement:
          b?.breadcrumbs?.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
          })) || [],
      }
      break
    }

    case 'Offer': {
      const offerData = (data as LocationSpecificData) || {}
      const locationOffers = offerData.locationOffers || []

      if (locationOffers.length === 0) break

      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: locationOffers.map((offer, index) => ({
          '@type': 'Offer',
          position: index + 1,
          name: offer.title,
          description: offer.description,
          price: offer.discount,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: offer.validFrom || new Date().toISOString(),
          validThrough:
            offer.validThrough || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
          businessFunction: 'https://schema.org/Sell',
          seller: {
            '@type': 'LocalBusiness',
            '@id': 'https://unclesamjunkremoval.com/#organization',
          },
          areaServed: offerData.locationName
            ? {
                '@type': 'City',
                name: offerData.locationName,
              }
            : undefined,
        })),
      }
      break
    }

    case 'Review': {
      const reviewData = (data as LocationSpecificData) || {}
      const reviews = reviewData.reviews

      if (!reviews || reviews.reviewCount === 0) break

      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'AggregateRating',
        ratingValue: String(reviews.averageRating),
        reviewCount: String(reviews.reviewCount),
        bestRating: String(reviews.bestRating || 5),
        worstRating: String(reviews.worstRating || 1),
        itemReviewed: {
          '@type': 'LocalBusiness',
          '@id': 'https://unclesamjunkremoval.com/#organization',
          name: 'Uncle Sam Junk Removal',
        },
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
