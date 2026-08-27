import type { Metadata } from "next";
import Link from "next/link";
import { QuoteSection } from "../components/quote-section";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import {
  emailAddress,
  genericSmsHref,
  locations,
  phoneDisplay,
  phoneHref,
  siteUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Uncle Sam Junk Removal | Evansville, IN",
  },
  description:
    "Contact Uncle Sam Junk Removal in Evansville, IN. Call or text (812) 610-1657, email unclesamjunkremoval@gmail.com, or request a free quote for Tri-State junk removal.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "contact Uncle Sam Junk Removal",
    "junk removal Evansville phone",
    "junk removal Evansville contact",
    "Uncle Sam Junk Removal Evansville",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Uncle Sam Junk Removal | Evansville, IN",
    description:
      "Call, text, or email a veteran-owned Evansville Tri-State junk removal crew, or send photos for a free quote.",
    url: `${siteUrl}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Uncle Sam Junk Removal",
      url: `${siteUrl}/contact`,
      description:
        "Phone, email, and free-quote contact options for Uncle Sam Junk Removal in Evansville, IN and the Tri-State.",
    },
    {
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
      priceRange: "$$",
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
          name: "Contact",
          item: `${siteUrl}/contact`,
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
                <span aria-current="page">Contact</span>
              </nav>
              <p className="eyebrow eyebrow--light">Evansville · Tri-State</p>
              <h1>Contact Uncle Sam Junk Removal</h1>
              <p>
                Call, text, or email our veteran-owned Evansville crew, or send
                project photos through the quote form below. We serve Evansville
                and the Tri-State by route.
              </p>
              <div className="detail-hero__actions">
                <a
                  className="button button--light"
                  href={`tel:${phoneHref}`}
                >
                  Call now
                </a>
                <a className="button button--outline-light" href={genericSmsHref}>
                  Text photos
                </a>
              </div>
            </div>
            <aside className="detail-summary" aria-label="Business contact">
              <span>Reach us</span>
              <strong>Uncle Sam Junk Removal</strong>
              <p>
                <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
                <br />
                <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                <br />
                Evansville, IN
              </p>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="shell detail-layout">
            <article className="detail-content">
              <p className="eyebrow">How to reach us</p>
              <h2>Phone, text, email, or the quote form.</h2>
              <p className="detail-lead">
                The fastest path is usually a text with clear photos, your city,
                and any stairs or access notes. Prefer a call or email? Use the
                details below — we respond during normal business hours and will
                confirm coverage for your pickup address.
              </p>

              <div className="detail-list-grid">
                <section>
                  <h3>Call or text</h3>
                  <ul>
                    <li>
                      <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
                    </li>
                    <li>Same-day pickup may be available by route</li>
                    <li>Photos help us price faster</li>
                  </ul>
                </section>
                <section>
                  <h3>Email and area</h3>
                  <ul>
                    <li>
                      <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                    </li>
                    <li>Evansville, IN</li>
                    <li>Tri-State residential and commercial routes</li>
                  </ul>
                </section>
              </div>
            </article>

            <aside className="detail-aside">
              <div className="sticky-quote-card">
                <span>Free quote</span>
                <h2>Ready when you are.</h2>
                <p>
                  Use the form on this page, text photos, or call — you’ll
                  approve the final onsite price before work begins.
                </p>
                <a className="button button--full" href="#quote">
                  Quote form
                </a>
                <a
                  className="button button--ghost button--full"
                  href={`tel:${phoneHref}`}
                >
                  Call now
                </a>
              </div>
            </aside>
          </div>
        </section>

        <QuoteSection />
      </main>

      <SiteFooter />
    </>
  );
}
