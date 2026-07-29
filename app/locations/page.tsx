import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import {
  genericSmsHref,
  locations,
  phoneDisplay,
  phoneHref,
  siteUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Junk Removal Service Areas",
  description:
    "Find local junk and furniture removal in nine communities across Southern Indiana, Western Kentucky, and Southeast Illinois.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Tri-State Junk Removal Locations | Uncle Sam Junk Removal",
    description:
      "See junk removal coverage in Evansville, Newburgh, Henderson, Owensboro, and five nearby Tri-State communities.",
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
                <span aria-current="page">Locations</span>
              </nav>
              <p className="eyebrow">Nine local service areas</p>
              <h1>Junk removal across the Evansville Tri-State.</h1>
              <p>
                We run local routes throughout Southern Indiana, Western
                Kentucky, and Southeast Illinois. Choose your city to see how
                we can help nearby.
              </p>
            </div>
            <div className="interior-hero__actions">
              <a className="button" href={genericSmsHref}>
                Text your address
              </a>
              <a className="button button--ghost" href={`tel:${phoneHref}`}>
                Call {phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <section className="section section--directory">
          <div className="shell location-index-grid">
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
