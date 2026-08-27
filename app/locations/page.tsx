import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { locationsIndexCopy } from "../seo-page-copy";
import {
  genericSmsHref,
  locations,
  phoneHref,
  siteUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: { absolute: locationsIndexCopy.titleAbsolute },
  description: locationsIndexCopy.paragraphs.join(" "),
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: locationsIndexCopy.titleAbsolute,
    description: locationsIndexCopy.paragraphs[0],
    url: `${siteUrl}/locations`,
  },
};

export default function LocationsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Uncle Sam Junk Removal service areas",
    itemListElement: locations.map((location, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: location.name,
      url: `${siteUrl}/locations/${location.slug}`,
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: locationsIndexCopy.faqs.map((faq) => ({
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
          __html: JSON.stringify([itemListSchema, faqSchema]),
        }}
      />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="interior-hero">
          <div className="shell interior-hero__grid">
            <div className="interior-hero__intro">
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Locations</span>
              </nav>
              <p className="eyebrow">Nine local service areas</p>
              <h1>{locationsIndexCopy.h1}</h1>
              <p>{locationsIndexCopy.paragraphs[0]}</p>
            </div>
            <aside className="interior-hero__card" aria-label="Route coverage">
              <span>Route coverage</span>
              <h2>Nine cities. One local crew.</h2>
              <p>{locationsIndexCopy.paragraphs[1]}</p>
              <div className="interior-hero__actions">
                <a className="button" href={genericSmsHref}>
                  Text address
                </a>
                <a className="button button--outline" href={`tel:${phoneHref}`}>
                  Call now
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section
          className="section section--directory section--directory-flush"
          aria-label="Local service areas"
        >
          <div className="shell">
            <div className="location-index-grid location-index-grid--hero">
              {locations.map((location, index) => (
                <Link
                  className="location-index-card"
                  href={`/locations/${location.slug}`}
                  key={location.slug}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{location.county}</p>
                  <h2>{location.name}</h2>
                  <strong>View local service</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--faq">
          <div className="shell faq-layout">
            <div className="faq-layout__header">
              <p className="eyebrow">Coverage FAQ</p>
              <h2>Where we go, how booking works.</h2>
            </div>
            <div className="faq-list">
              {locationsIndexCopy.faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section compact-explainer">
          <div className="shell compact-explainer__grid">
            <div>
              <p className="eyebrow">Outside a listed city?</p>
              <h2>Send the address before ruling it out.</h2>
            </div>
            <div>
              <p>
                Route coverage can extend beyond city limits depending on the
                project and schedule. Text the pickup address, a short
                description, and photos, and we’ll check it for you.
              </p>
              <Link className="inline-link" href="/#quote">
                Check your project and address
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
