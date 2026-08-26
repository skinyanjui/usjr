import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { faqHubCopy } from "../seo-page-copy";
import { phoneDisplay, phoneHref, siteUrl } from "../site-data";

export const metadata: Metadata = {
  title: { absolute: faqHubCopy.titleAbsolute },
  description: faqHubCopy.lead,
  robots: { index: true, follow: true },
  alternates: { canonical: "/faq" },
  openGraph: {
    title: faqHubCopy.titleAbsolute,
    description: faqHubCopy.lead,
    url: `${siteUrl}/faq`,
    type: "website",
  },
};

export default function FaqPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqHubCopy.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
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
          name: "FAQ",
          item: `${siteUrl}/faq`,
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
                <span aria-current="page">FAQ</span>
              </nav>
              <p className="eyebrow eyebrow--light">Before you book</p>
              <h1>{faqHubCopy.h1}</h1>
              <p>{faqHubCopy.lead}</p>
              <div className="detail-hero__actions">
                <Link className="button button--light" href="/#quote">
                  Get a free quote
                </Link>
                <a
                  className="button button--outline-light"
                  href={`tel:${phoneHref}`}
                >
                  Call {phoneDisplay}
                </a>
              </div>
            </div>
            <aside className="detail-summary" aria-label="FAQ shortcuts">
              <span>Also see</span>
              <strong>Compare options and cities.</strong>
              <p>
                <Link href="/junk-removal-vs-dumpster">
                  Junk removal vs a dumpster
                </Link>
                <br />
                <Link href="/locations">Tri-State locations</Link>
                <br />
                <Link href="/#pricing">Homepage pricing ranges</Link>
              </p>
            </aside>
          </div>
        </section>

        <section className="section section--faq">
          <div className="shell faq-layout">
            <div className="faq-layout__header">
              <p className="eyebrow">FAQ hub</p>
              <h2>Unique questions for this page.</h2>
            </div>
            <div className="faq-list">
              {faqHubCopy.faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>
                    {faq.question.includes("dumpster") ? (
                      <>
                        A dumpster can cost less if you have days, a driveway,
                        and you will load it yourself. Call us when the pile is
                        inside, heavy, or you need it gone in one visit. Full
                        split:{" "}
                        <Link href="/junk-removal-vs-dumpster">
                          /junk-removal-vs-dumpster
                        </Link>
                        .
                      </>
                    ) : faq.question.includes("Newburgh, Henderson") ? (
                      <>
                        Yes, on listed routes, plus Boonville, Princeton, Mount
                        Vernon, New Harmony, and Mount Carmel. Coverage is by
                        route, not a daily loop in every city. See{" "}
                        <Link href="/locations">/locations</Link>.
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Ready?</p>
                <h2>Send photos or call.</h2>
              </div>
              <Link className="button" href="/#quote">
                Open the quote form
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
