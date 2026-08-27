import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import {
  genericSmsHref,
  phoneHref,
  services,
  siteUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Junk & Furniture Removal Services",
  description:
    `Explore ${services.length} local services for junk, furniture, cleanouts, appliances, debris, cleaning, and light demolition in the Evansville Tri-State.`,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Removal and Cleanout Services | Uncle Sam Junk Removal",
    description:
      "One friendly local crew for furniture, household junk, estates, rentals, offices, appliances, debris, and light demolition.",
    url: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Uncle Sam Junk Removal services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${siteUrl}/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="interior-hero">
          <div className="shell interior-hero__grid">
            <div>
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Services</span>
              </nav>
              <p className="eyebrow">{services.length} ways we can help</p>
              <h1>Removal, cleanout, and cleaning services.</h1>
              <p>
                Pick the option that sounds closest to your project. If you’re
                not sure, send a few photos and we’ll help you choose before
                sharing an upfront quote.
              </p>
            </div>
            <div className="interior-hero__actions">
              <a className="button" href={genericSmsHref}>
                Text photos
              </a>
              <a className="button button--ghost" href={`tel:${phoneHref}`}>
                Call now
              </a>
            </div>
          </div>
        </section>

        <section className="section section--directory">
          <div className="shell">
            <div className="service-index-grid">
              {services.map((service, index) => (
                <Link
                  className={`service-index-card ${
                    service.popular ? "service-index-card--popular" : ""
                  }`}
                  href={`/services/${service.slug}`}
                  key={service.slug}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    {service.popular && (
                      <small className="popular-label">Popular service</small>
                    )}
                    <h2>{service.name}</h2>
                    <p>{service.summary}</p>
                  </div>
                  <strong aria-hidden="true">View service</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section compact-explainer">
          <div className="shell compact-explainer__grid">
            <div>
              <p className="eyebrow">Not sure which service fits?</p>
              <h2>Send the photos. We’ll sort out the category.</h2>
            </div>
            <div>
              <p>
                A short description, a few photos, and your city are usually
                enough to start. We’ll let you know what we can take, whether
                anything needs special handling, and which route may work.
              </p>
              <Link className="inline-link" href="/#quote">
                Start a quote request
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
