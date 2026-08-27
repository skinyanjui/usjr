import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { dumpsterCompareCopy } from "../seo-page-copy";
import { phoneHref, siteUrl } from "../site-data";

export const metadata: Metadata = {
  title: { absolute: dumpsterCompareCopy.titleAbsolute },
  description: dumpsterCompareCopy.lead,
  robots: { index: true, follow: true },
  alternates: { canonical: "/junk-removal-vs-dumpster" },
  openGraph: {
    title: dumpsterCompareCopy.titleAbsolute,
    description: dumpsterCompareCopy.lead,
    url: `${siteUrl}/junk-removal-vs-dumpster`,
    type: "website",
  },
};

export default function JunkRemovalVsDumpsterPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: dumpsterCompareCopy.h1,
      url: `${siteUrl}/junk-removal-vs-dumpster`,
      description: dumpsterCompareCopy.lead,
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
          name: "Junk removal vs a dumpster",
          item: `${siteUrl}/junk-removal-vs-dumpster`,
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
                <span aria-current="page">Junk removal vs dumpster</span>
              </nav>
              <p className="eyebrow eyebrow--light">Crew or container?</p>
              <h1>{dumpsterCompareCopy.h1}</h1>
              <p>{dumpsterCompareCopy.lead}</p>
              <div className="detail-hero__actions">
                <a className="button button--light" href={`tel:${phoneHref}`}>
                  Call now
                </a>
                <Link className="button button--outline-light" href="/faq">
                  More FAQs
                </Link>
              </div>
            </div>
            <aside className="detail-summary" aria-label="Quick take">
              <span>Honest split</span>
              <strong>Dumpster for DIY days. Crew for one visit.</strong>
              <p>
                We do not rent dumpsters. We bring the truck and take the debris
                with us.
              </p>
            </aside>
          </div>
        </section>

        <section className="section section--faq">
          <div className="shell faq-layout">
            <div className="faq-layout__header">
              <p className="eyebrow">Compare</p>
              <h2>Which option fits the job?</h2>
            </div>
            <div className="faq-list">
              {dumpsterCompareCopy.faqs.map((faq, index) => (
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

        <section className="section">
          <div className="shell">
            <div className="section-heading section-heading--tight">
              <div>
                <p className="eyebrow">Related</p>
                <h2>Choose your next step.</h2>
              </div>
              <div>
                <Link className="inline-link" href="/faq">
                  FAQ hub
                </Link>
                {" · "}
                <Link className="inline-link" href="/services/light-demolition">
                  Light demolition
                </Link>
                {" · "}
                <Link className="inline-link" href="/#pricing">
                  Pricing
                </Link>
                {" · "}
                <Link className="inline-link" href="/#quote">
                  Quote form
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
