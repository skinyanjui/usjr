import type { Metadata } from "next"
import { ServicesSection } from "@/components/services-section"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Professional Junk Removal & Cleaning Services | Uncle Sam Junk Removal",
  description:
    "Same-day junk removal, dumpster rental, and natural cleaning across Evansville & Southern Indiana. Upfront prices. Call or text (812) 610-1657 for a free quote.",
  keywords:
    "junk removal services, dumpster rental, cleaning services, Evansville Indiana, Southern Indiana, waste management, eco-friendly disposal",
}

export default function ServicesPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "JunkRemovalService", "CleaningService"],
    name: "Uncle Sam Junk Removal",
    telephone: "+1-812-610-1657",
    image: "https://unclesamjunkremoval.vercel.app/og-image.jpg",
    address: { "@type": "PostalAddress", addressLocality: "Evansville", addressRegion: "IN", addressCountry: "US" },
    areaServed: ["Evansville IN", "Newburgh IN", "Henderson KY", "Owensboro KY", "Boonville IN", "Princeton IN"],
    serviceType: ["Junk Removal", "Dumpster Rental", "Residential Cleaning", "Commercial Cleaning"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Mattress Removal" },
          priceSpecification: { "@type": "UnitPriceSpecification", price: "89", priceCurrency: "USD" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Appliance Removal" },
          priceSpecification: { "@type": "UnitPriceSpecification", price: "89", priceCurrency: "USD" },
        },
      ],
    },
  }

  const servicesFaqs = [
    {
      question: "What areas do you serve?",
      answer:
        "We serve Evansville, Newburgh, Henderson KY, Owensboro KY, Boonville, Princeton, and all of Southern Indiana.",
    },
    {
      question: "Do you offer same-day service?",
      answer: "Yes, same-day junk removal and appliance pickup is available throughout our service area.",
    },
    {
      question: "How do you determine pricing?",
      answer:
        "Pricing is based on item type, volume, labor, and disposal fees. We provide upfront, transparent quotes with no hidden fees.",
    },
    {
      question: "Do you remove hazardous materials?",
      answer:
        "No. We cannot accept paint, chemicals, oils, fuels, asbestos, biohazards, or pressurized tanks. We'll refer you to local programs.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <StructuredData type="Custom" data={localBusinessSchema} />
      <StructuredData type="FAQPage" data={{ faqs: servicesFaqs }} />

      <div className="max-w-7xl mx-auto px-4 pt-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Junk Removal, Dumpster Rental & Cleaning Services in Evansville & Southern Indiana
        </h1>
      </div>

      <ServicesSection />
    </div>
  )
}
