import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import { locationPageOverrides } from "../../seo-page-copy";
import {
  getLocation,
  locations,
  phoneHref,
  quoteFormHref,
  services,
  serviceSmsHref,
  siteUrl,
} from "../../site-data";

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    return {};
  }

  const override = locationPageOverrides[location.slug];

  if (override) {
    return {
      title: { absolute: override.titleAbsolute },
      description: override.description,
      keywords: override.keywords,
      robots: { index: true, follow: true },
      alternates: {
        canonical: `/locations/${location.slug}`,
      },
      openGraph: {
        title: override.titleAbsolute,
        description: override.description,
        url: `${siteUrl}/locations/${location.slug}`,
        type: "website",
      },
    };
  }

  return {
    title: `Junk Removal in ${location.name}`,
    description: `${location.summary} Get an upfront quote from a veteran-owned Tri-State hauling crew.`,
    keywords: [
      `junk removal ${location.name}`,
      `furniture removal ${location.name}`,
      `junk hauling ${location.city}`,
      `property cleanout ${location.city}`,
      `appliance removal ${location.city}`,
    ],
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
    openGraph: {
      title: `Junk Removal in ${location.name} | Uncle Sam`,
      description: location.summary,
      url: `${siteUrl}/locations/${location.slug}`,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const override = locationPageOverrides[location.slug];
  const smsHref = serviceSmsHref("junk removal or a cleanout", location.name);
  const quoteHref = quoteFormHref({ location: location.name });
  const nearbyLocations = location.nearby
    .map((name) => locations.find((item) => item.name === name))
    .filter((item) => item !== undefined);
  const featuredLocalServices = [
    "junk-removal",
    "furniture-removal",
    "shed-removal",
    "estate-cleanouts",
    "appliance-removal",
    "garage-cleanout",
    "cleaning",
    "light-demolition",
    "mattress-removal",
  ]
    .map((serviceSlug) =>
      services.find((service) => service.slug === serviceSlug),
    )
    .filter(
      (service): service is (typeof services)[number] => service !== undefined,
    );
  const h1 = override?.h1 ?? `Junk removal in ${location.name}.`;
  const heroLead = override ? override.heroLead : location.summary;
  const localHeading =
    override?.sectionHeading ??
    `A simpler way to clear a property in ${location.city}.`;
  const localParagraphs = override?.sectionParagraphs ?? [location.localIntro];
  const defaultFaqs = [
    {
      question: `Do you serve every address in ${location.city}?`,
      answer: `We serve ${location.city} by route, but timing can vary with distance, schedule, and project size. Send the exact address before booking, and we’ll check coverage for you.`,
    },
    {
      question: `Is same-day pickup available in ${location.city}?`,
      answer:
        "It may be when a nearby route has space. Call or text early with photos for the best chance of same-day or next-day scheduling.",
    },
    {
      question: "How is the price calculated?",
      answer:
        "Pricing reflects volume, weight, item type, access, labor, and any special disposal needs. You’ll see and approve the final price before the crew starts.",
    },
    {
      question: "Can you clean after removing the items?",
      answer:
        "Cleaning can be added to many move-out, estate, rental, and commercial projects. Describe the space and the result you need, and we’ll include the right cleaning scope in your quote.",
    },
  ];
  const locationFaqs = override?.faqs ?? defaultFaqs;
  const includeFaqSchema = Boolean(override?.faqs);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: override?.h1
        ? override.h1.replace(/\.$/, "")
        : `Junk Removal in ${location.name}`,
      serviceType: "Junk removal and property cleanout",
      description: override?.description ?? location.summary,
      url: `${siteUrl}/locations/${location.slug}`,
      areaServed: {
        "@type": "City",
        name: location.name,
      },
      provider: {
        "@type": "LocalBusiness",
        name: "Uncle Sam Junk Removal",
        telephone: phoneHref,
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
          name: "Locations",
          item: `${siteUrl}/locations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: location.name,
          item: `${siteUrl}/locations/${location.slug}`,
        },
      ],
    },
    ...(includeFaqSchema
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: locationFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
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
        <section className="detail-hero detail-hero--location">
          <div className="shell detail-hero__grid detail-hero__grid--stacked">
            <div>
              <nav className="breadcrumbs breadcrumbs--light" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/locations">Locations</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{location.name}</span>
              </nav>
              <p className="eyebrow eyebrow--light">{location.county}</p>
              <h1>{h1}</h1>
              {heroLead ? <p>{heroLead}</p> : null}
              <div className="detail-hero__actions">
                <a className="button button--light" href={smsHref}>
                  Text photos
                </a>
                <a
                  className="button button--outline-light"
                  href={`tel:${phoneHref}`}
                >
                  Call now
                </a>
              </div>
              <aside
                className="detail-summary detail-summary--inline"
                aria-label="Location summary"
              >
                <span>Local route</span>
                <strong>We’ll check your address before you book.</strong>
                <p>
                  Share the pickup address and project details, and we’ll help
                  match the job to the right route and timing.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="detail-layout detail-layout--stacked">
              <article className="detail-content">
                <p className="eyebrow">Local service</p>
                <h2>{localHeading}</h2>
                {localParagraphs.map((paragraph) => (
                  <p className="detail-lead" key={paragraph.slice(0, 64)}>
                    {paragraph}
                  </p>
                ))}
              </article>

              <aside className="detail-aside">
                <div className="sticky-quote-card">
                  <span>{location.name}</span>
                  <h2>Request local service.</h2>
                  <p>
                    Include your address, photos, and any stairs or access
                    restrictions.
                  </p>
                  <a className="button button--full" href={smsHref}>
                    Text photos
                  </a>
                  <Link
                    className="button button--ghost button--full"
                    href={quoteHref}
                  >
                    Quote form
                  </Link>
                </div>
              </aside>
            </div>

            <article className="detail-content detail-content--continued">
              <div className="local-service-grid">
                {featuredLocalServices.map((service) => (
                  <Link href={`/services/${service.slug}`} key={service.slug}>
                    <h3>{service.name}</h3>
                    <p>{service.summary}</p>
                  </Link>
                ))}
              </div>
              <Link className="inline-link" href="/services">
                View all {services.length} services
              </Link>
            </article>
          </div>
        </section>

        <section className="section section--process">
          <div className="shell">
            <div className="section-heading section-heading--center">
              <div>
                <p className="eyebrow">How local booking works</p>
                <h2>Three steps from photos to cleared space.</h2>
              </div>
            </div>
            <ol className="process-grid">
              <li>
                <span>1</span>
                <div>
                  <h3>Send the address</h3>
                  <p>
                    Add photos and a short description so we can confirm the
                    {` ${location.city}`} route and project type.
                  </p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <h3>Confirm scope and price</h3>
                  <p>
                    We’ll talk through access, special items, timing, and the
                    price before work begins.
                  </p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <h3>We load and haul</h3>
                  <p>
                    The crew removes the agreed items and completes a basic
                    sweep of the cleared area.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section section--faq">
          <div className="shell faq-layout">
            <div className="faq-layout__header">
              <p className="eyebrow">{location.city} FAQ</p>
              <h2>Local questions, answered.</h2>
            </div>
            <div className="faq-list">
              {locationFaqs.map((faq, index) => (
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

        <section className="section related-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Nearby routes</p>
                <h2>Other service areas.</h2>
              </div>
              <Link className="inline-link" href="/locations">
                View all nine locations
              </Link>
            </div>
            <div className="related-grid">
              {nearbyLocations.map((nearby) => (
                <Link href={`/locations/${nearby.slug}`} key={nearby.slug}>
                  <span>{nearby.county}</span>
                  <h3>{nearby.name}</h3>
                  <p>{nearby.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
