import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { aboutPageCopy } from "../seo-page-copy";
import {
  emailAddress,
  genericSmsHref,
  locations,
  phoneDisplay,
  phoneHref,
  services,
  siteUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: { absolute: aboutPageCopy.titleAbsolute },
  description: aboutPageCopy.paragraphs[0],
  robots: { index: true, follow: true },
  alternates: { canonical: "/about" },
  openGraph: {
    title: aboutPageCopy.titleAbsolute,
    description: aboutPageCopy.paragraphs[0],
    url: `${siteUrl}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: aboutPageCopy.h1,
      url: `${siteUrl}/about`,
      description: aboutPageCopy.paragraphs[0],
      isPartOf: {
        "@type": "WebSite",
        name: "Uncle Sam Junk Removal",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${siteUrl}/about`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="detail-hero">
          <div className="shell detail-hero__grid">
            <div className="detail-hero__intro">
              <nav className="breadcrumbs breadcrumbs--light" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">About</span>
              </nav>
              <p className="eyebrow eyebrow--light">Evansville · Tri-State</p>
              <h1>{aboutPageCopy.h1}</h1>
              <p>{aboutPageCopy.paragraphs[0]}</p>
              <div className="detail-hero__actions">
                <a className="button button--light" href={genericSmsHref}>
                  Text photos
                </a>
                <a
                  className="button button--outline-light"
                  href={`tel:${phoneHref}`}
                >
                  Call now
                </a>
              </div>
            </div>
            <aside className="detail-summary" aria-label="Company summary">
              <span>Who we are</span>
              <strong>Local, veteran-owned, and built for the Tri-State.</strong>
              <p>
                One crew and one number from the first photos to the final sweep:{" "}
                <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>.
              </p>
            </aside>
          </div>
        </section>

        <section className="about-facts" aria-label="Company facts">
          <div className="shell about-facts__grid">
            <article>
              <span>Local base</span>
              <strong>Evansville, IN</strong>
            </article>
            <article>
              <span>Coverage</span>
              <strong>{locations.length} listed cities</strong>
            </article>
            <article>
              <span>Service menu</span>
              <strong>{services.length} ways we help</strong>
            </article>
            <article>
              <span>Company</span>
              <strong>Licensed and insured</strong>
            </article>
          </div>
        </section>

        <section className="section about-story">
          <div className="shell detail-layout detail-layout--stacked">
            <article className="detail-content">
              <p className="eyebrow">About this crew</p>
              <h2>Straightforward from first photos to final sweep.</h2>
              {aboutPageCopy.paragraphs.slice(1).map((paragraph) => (
                <p className="detail-lead" key={paragraph.slice(0, 64)}>
                  {paragraph}
                </p>
              ))}
              <div className="detail-list-grid">
                <section>
                  <h3>Before we arrive</h3>
                  <ul>
                    <li>Photos and project details</li>
                    <li>Route and access confirmation</li>
                    <li>Price approval before loading</li>
                  </ul>
                </section>
                <section>
                  <h3>At the property</h3>
                  <ul>
                    <li>Lifting, loading, and hauling</li>
                    <li>Respectful work around the property</li>
                    <li>A basic sweep of the cleared area</li>
                  </ul>
                </section>
              </div>
              <p className="detail-lead about-contact-line">
                Questions? Email{" "}
                <a href={`mailto:${emailAddress}`}>{emailAddress}</a> or visit{" "}
                <Link href="/contact">the contact page</Link>.
              </p>
            </article>
            <aside className="detail-aside">
              <div className="sticky-quote-card">
                <span>Get a quote</span>
                <h2>Show us what needs to go.</h2>
                <p>
                  Text photos, your city, and any stairs or access notes for the
                  fastest response.
                </p>
                <a className="button button--full" href={genericSmsHref}>
                  Text photos
                </a>
                <Link className="button button--ghost button--full" href="/#quote">
                  Quote form
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--faq">
          <div className="shell faq-layout">
            <div className="faq-layout__header">
              <p className="eyebrow">About FAQ</p>
              <h2>What customers ask about the company.</h2>
            </div>
            <div className="faq-list">
              {aboutPageCopy.faqs.map((faq, index) => (
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
      </main>

      <SiteFooter />
    </>
  );
}
