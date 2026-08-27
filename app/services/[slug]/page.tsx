import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import { servicePageOverrides } from "../../seo-page-copy";
import {
  getService,
  locations,
  phoneHref,
  quoteFormHref,
  services,
  serviceSmsHref,
  siteUrl,
} from "../../site-data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  const override = servicePageOverrides[service.slug];

  if (override) {
    return {
      title: { absolute: override.titleAbsolute },
      description: override.description,
      keywords: override.keywords,
      robots: { index: true, follow: true },
      alternates: {
        canonical: `/services/${service.slug}`,
      },
      openGraph: {
        title: override.titleAbsolute,
        description: override.description,
        url: `${siteUrl}/services/${service.slug}`,
        type: "website",
      },
    };
  }

  return {
    title: `${service.name} Evansville`,
    description: `${service.summary} Veteran-owned service in Evansville, Newburgh, Henderson, Owensboro, and nearby Tri-State communities.`,
    keywords: [
      `${service.name} Evansville IN`,
      `${service.name} near me`,
      `${service.name} Newburgh IN`,
      `${service.name} Henderson KY`,
      `${service.name} Owensboro KY`,
    ],
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | Uncle Sam Junk Removal`,
      description: service.summary,
      url: `${siteUrl}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const override = servicePageOverrides[service.slug];
  const currentIndex = services.findIndex((item) => item.slug === service.slug);
  const relatedServices = [1, 2, 3].map(
    (offset) => services[(currentIndex + offset) % services.length],
  );
  const smsHref = serviceSmsHref(service.name);
  const quoteHref = quoteFormHref({ service: service.quoteValue });
  const includes = override?.includes ?? service.includes;
  const bestFor = override?.bestFor ?? service.bestFor;
  const priceFactors = override?.priceFactors ?? service.priceFactors;
  const heroLead = override?.heroLead ?? service.summary;
  const aboutHeading =
    override?.aboutHeading ??
    `An easier way to handle ${service.name.toLowerCase()}.`;
  const aboutParagraphs = override?.aboutParagraphs ?? [service.description];
  const h1 =
    override?.h1 ?? `${service.name} in Evansville and the Tri-State.`;
  const defaultFaqs = [
    {
      question: `How do I get a quote for ${service.name.toLowerCase()}?`,
      answer: `Text clear photos, your city, the approximate amount, and any stairs or access details. We’ll let you know whether photos are enough or a quick onsite look would be more helpful before sharing the final ${service.name.toLowerCase()} price.`,
    },
    {
      question: "Do I need to move everything outside?",
      answer:
        "Usually not. The crew can remove the items you want gone from inside, outside, or a commercial space when the access route is safe. Curbside placement may reduce labor for some pickups.",
    },
    {
      question: "Are hauling and disposal included?",
      answer:
        "Yes. Standard loading, transportation, and disposal are included in the price you approve. Regulated, unusually heavy, or specialty materials may need a different plan, which we’ll explain before work begins.",
    },
    {
      question: "Can I combine this with another service?",
      answer:
        "Often, yes. Tell us about the whole project, and we’ll see whether removal, cleanout, cleaning, or small non-structural demolition can be handled together.",
    },
  ];
  const serviceFaqs = override?.faqs ?? defaultFaqs;
  const includeFaqSchema = Boolean(override?.faqs);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: override?.description ?? service.summary,
      url: `${siteUrl}/services/${service.slug}`,
      areaServed: locations.map((location) => ({
        "@type": "City",
        name: location.name,
      })),
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
          name: "Services",
          item: `${siteUrl}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.name,
          item: `${siteUrl}/services/${service.slug}`,
        },
      ],
    },
    ...(includeFaqSchema
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: serviceFaqs.map((faq) => ({
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
        <section className="detail-hero">
          <div className="shell detail-hero__grid detail-hero__grid--stacked">
            <div>
              <nav className="breadcrumbs breadcrumbs--light" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/services">Services</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{service.name}</span>
              </nav>
              <p className="eyebrow eyebrow--light">
                Veteran-owned · Free quote
              </p>
              <h1>{h1}</h1>
              <p>{heroLead}</p>
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
                aria-label="Service summary"
              >
                <span>What to expect</span>
                <strong>A clear plan, an upfront price, and a respectful crew.</strong>
                <p>
                  Tell us what needs to go and where it is. We’ll walk through the
                  plan, and you’ll approve the final price before work begins.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="detail-layout detail-layout--stacked">
              <article className="detail-content">
                <p className="eyebrow">About this service</p>
                <h2>{aboutHeading}</h2>
                {aboutParagraphs.map((paragraph) => (
                  <p className="detail-lead" key={paragraph.slice(0, 64)}>
                    {paragraph}
                  </p>
                ))}
              </article>

              <aside className="detail-aside">
                <div className="sticky-quote-card">
                  <span>Free quote</span>
                  <h2>Show us the project.</h2>
                  <p>
                    Text photos, your city, and any access details for a faster
                    response.
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
              <div className="detail-list-grid">
                <section>
                  <h3>What we can help with</h3>
                  <ul>
                    {includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3>Who we often help</h3>
                  <ul>
                    {bestFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="price-factors">
                <h3>What helps us price it</h3>
                <p>
                  Photos are a great start. The final price reflects the actual
                  project, with these factors making the biggest difference:
                </p>
                <ol>
                  {priceFactors.map((factor, index) => (
                    <li key={factor}>
                      <span>{index + 1}</span>
                      {factor}
                    </li>
                  ))}
                </ol>
              </section>
            </article>
          </div>
        </section>

        <section className="section section--areas">
          <div className="shell service-area-links">
            <div>
              <p className="eyebrow eyebrow--light">Where we work</p>
              <h2>{service.name} across nine Tri-State communities.</h2>
              <p>
                Choose your city for local service information, or call to
                confirm an address near the listed areas.
              </p>
            </div>
            <div className="location-link-list">
              {locations.map((location) => (
                <Link href={`/locations/${location.slug}`} key={location.slug}>
                  {location.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--faq">
          <div className="shell faq-layout">
            <div className="faq-layout__header">
              <p className="eyebrow">Service FAQ</p>
              <h2>A few helpful answers.</h2>
            </div>
            <div className="faq-list">
              {serviceFaqs.map((faq, index) => (
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
                <p className="eyebrow">Related services</p>
                <h2>Keep the project moving.</h2>
              </div>
              <Link className="inline-link" href="/services">
                View all {services.length} services
              </Link>
            </div>
            <div className="related-grid">
              {relatedServices.map((item) => (
                <Link href={`/services/${item.slug}`} key={item.slug}>
                  <span>Explore</span>
                  <h3>{item.name}</h3>
                  <p>{item.summary}</p>
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
