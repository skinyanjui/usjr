import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { aboutPageCopy } from "../seo-page-copy";
import {
  emailAddress,
  phoneDisplay,
  phoneHref,
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
            <div>
              <nav className="breadcrumbs breadcrumbs--light" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">About</span>
              </nav>
              <p className="eyebrow eyebrow--light">Evansville · Tri-State</p>
              <h1>{aboutPageCopy.h1}</h1>
              <p>{aboutPageCopy.paragraphs[0]}</p>
              <div className="detail-hero__actions">
                <a className="button button--light" href={`tel:${phoneHref}`}>
                  Call {phoneDisplay}
                </a>
                <Link className="button button--outline-light" href="/contact">
                  Contact page
                </Link>
              </div>
            </div>
            <aside className="detail-summary" aria-label="Company summary">
              <span>Who we are</span>
              <strong>Veteran-owned. Licensed and insured.</strong>
              <p>
                Dispatched from Evansville. One number for every listed city:{" "}
                <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
              </p>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="shell detail-layout">
            <article className="detail-content">
              <p className="eyebrow">About this crew</p>
              <h2>Local trucks, Tri-State routes.</h2>
              {aboutPageCopy.paragraphs.map((paragraph) => (
                <p className="detail-lead" key={paragraph.slice(0, 48)}>
                  {paragraph}
                </p>
              ))}
              <p className="detail-lead">
                Email{" "}
                <a href={`mailto:${emailAddress}`}>{emailAddress}</a> or visit{" "}
                <Link href="/contact">the contact page</Link> for phone, text,
                and the quote form.
              </p>
            </article>
            <aside className="detail-aside">
              <div className="sticky-quote-card">
                <span>Next step</span>
                <h2>Send photos.</h2>
                <p>
                  Text the pile and pickup address, or use the homepage quote
                  form.
                </p>
                <Link className="button button--full" href="/#quote">
                  Free quote form
                </Link>
                <a
                  className="button button--ghost button--full"
                  href={`tel:${phoneHref}`}
                >
                  Call {phoneDisplay}
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--faq">
          <div className="shell faq-layout">
            <div>
              <p className="eyebrow">About FAQ</p>
              <h2>How this crew works.</h2>
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
