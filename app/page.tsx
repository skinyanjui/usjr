import {
  CommercialSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  PopularServicesSection,
  PricingSection,
  ProcessSection,
  ServiceAreasSection,
} from "./components/home-sections";
import { QuoteSection } from "./components/quote-section";
import { SiteFooter, SiteHeader } from "./components/site-chrome";
import { homeFaqs } from "./home-data";
import {
  emailAddress,
  locations,
  phoneHref,
  services,
  siteUrl,
} from "./site-data";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: "Uncle Sam Junk Removal",
    url: siteUrl,
    telephone: phoneHref,
    email: emailAddress,
    description:
      "Veteran-owned junk and furniture removal, cleaning, property cleanouts, appliance hauling, debris cleanup, and light demolition serving Evansville and the Tri-State.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Evansville",
      addressRegion: "IN",
      addressCountry: "US",
    },
    areaServed: locations.map((location) => ({
      "@type": "City",
      name: location.name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Removal, cleanout, cleaning, and light demolition services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: `${siteUrl}/services/${service.slug}`,
        },
      })),
    },
    priceRange: "$$",
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema, faqSchema]),
        }}
      />

      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content">
        <HeroSection />
        <PopularServicesSection />
        <QuoteSection />
        <ProcessSection />
        <PricingSection />
        <ServiceAreasSection />
        <CommercialSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <SiteFooter />
    </>
  );
}
