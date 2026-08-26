import Image from "next/image";
import Link from "next/link";
import { homeFaqs, popularServiceSlugs, pricingTiers } from "../home-data";
import {
  genericSmsHref,
  locations,
  phoneDisplay,
  phoneHref,
  services,
} from "../site-data";
import { QuoteServiceLink } from "./quote-section";

const popularServices = popularServiceSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter(
    (service): service is (typeof services)[number] => service !== undefined,
  );

export function HeroSection() {
  return (
    <>
      <section className="hero" id="top">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <h1>
              Clear the clutter.
              <span>Keep your weekend.</span>
            </h1>
            <p className="hero__lead">
              Fast, respectful junk and furniture removal, cleanouts, cleaning,
              and light demolition for homes, rentals, offices, and job sites
              across the Tri-State.
            </p>
            <div className="hero__actions">
              <a className="button" href="#quote">
                Get a free quote
              </a>
              <a className="button button--outline" href={genericSmsHref}>
                Text photos instead
              </a>
            </div>
            <ul className="trust-list" aria-label="Service promises">
              <li>Licensed &amp; insured</li>
              <li>Upfront pricing</li>
              <li>No heavy lifting for you</li>
              <li>
                <span className="trust-list__mark" aria-hidden="true">
                  ★
                </span>
                Veteran-owned
              </li>
            </ul>
          </div>

          <div className="hero__visual">
            <Image
              src="/hero-junk-v3.webp"
              alt="Uncle Sam Junk Removal red hauling truck ready for a pickup"
              width={1024}
              height={1024}
              sizes="(max-width: 860px) calc(100vw - 32px), 50vw"
              unoptimized
              priority
            />
            <div className="hero-card hero-card--rating">
              <span className="hero-card__kicker">Need it gone today?</span>
              <strong>Same-day slots may be open</strong>
              <a href={`tel:${phoneHref}`}>Call to check availability</a>
            </div>
            <div className="hero-card hero-card--quote">
              <span className="photo-label" aria-hidden="true">
                Photo
              </span>
              <div>
                <strong>Skip the guesswork</strong>
                <small>Text photos for a faster estimate</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="take-strip" aria-label="Commonly removed items">
        <div className="shell take-strip__inner">
          <strong>We take</strong>
          <span>Furniture</span>
          <span>Appliances</span>
          <span>Mattresses</span>
          <span>Yard debris</span>
          <span>Hot tubs</span>
          <span>Renovation waste</span>
        </div>
      </section>
    </>
  );
}

export function PopularServicesSection() {
  return (
    <section className="section section--services" id="services">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Popular services</p>
            <h2>Start with the job that sounds closest.</h2>
          </div>
          <p>
            Pick a common project to prefill the quote form. If yours is
            different, all {services.length} services are one click away.
          </p>
        </div>

        <div className="service-directory-grid">
          {popularServices.map((service, index) => (
            <article
              className={`service-card ${
                service.slug === "shed-removal"
                  ? "service-card--popular"
                  : ""
              }`}
              data-popular-service={service.slug}
              key={service.slug}
            >
              <div className="service-card__top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="price-pill">
                  {service.slug === "shed-removal"
                    ? "Most requested"
                    : "Popular job"}
                </span>
              </div>
              <h3>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </h3>
              <p>{service.summary}</p>
              <div className="service-card__links">
                <Link href={`/services/${service.slug}`}>See details</Link>
                <QuoteServiceLink
                  service={service.quoteValue}
                  ariaLabel={`Request a quote for ${service.name.toLowerCase()}`}
                >
                  Get quote
                </QuoteServiceLink>
              </div>
            </article>
          ))}
        </div>

        <div className="popular-services__footer">
          <Link className="button button--ghost" href="/services">
            Browse all {services.length} services
          </Link>
          <p>Not sure what to choose? “Junk Removal” is a good place to start.</p>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section
      className="section section--process"
      id="how-it-works"
      aria-labelledby="process-heading"
    >
      <div className="shell">
        <div className="section-heading section-heading--center">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="process-heading">Done in three simple steps.</h2>
          </div>
        </div>
        <ol className="process-grid">
          <li>
            <span>1</span>
            <div>
              <h3>Send the basics</h3>
              <p>
                Choose a service, share the job basics, and add optional photos
                in the form or send them later by text.
              </p>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <h3>Approve the price</h3>
              <p>
                We confirm the scope and provide the price before work starts.
                You decide whether to book.
              </p>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <h3>We clear it out</h3>
              <p>
                The crew lifts, loads, hauls, and gives the cleared area a
                basic sweep before leaving.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="section section--pricing" id="pricing">
      <div className="shell pricing-layout">
        <div className="pricing-intro">
          <p className="eyebrow">Straightforward pricing</p>
          <h2>Pay for the space your junk takes.</h2>
          <p>
            These ranges are a planning guide. The final price depends on
            volume, item type, weight, access, and special disposal needs.
          </p>
          <div className="included-list">
            <span>Every standard quote includes:</span>
            <ul>
              <li>Labor and heavy lifting</li>
              <li>Loading and transportation</li>
              <li>Standard disposal fees</li>
              <li>A basic sweep-up</li>
            </ul>
          </div>
          <a className="inline-link" href="#quote">
            Get your exact quote
          </a>
          <p className="pricing-hub-links">
            <Link className="inline-link" href="/faq">
              Pricing FAQs
            </Link>
            {" · "}
            <Link className="inline-link" href="/junk-removal-vs-dumpster">
              Junk removal vs a dumpster
            </Link>
          </p>
        </div>

        <div className="price-list">
          {pricingTiers.map((tier) => (
            <article className="price-row" key={tier.label}>
              <div
                className={`load-visual ${tier.fillClass}`}
                aria-hidden="true"
              >
                <span />
              </div>
              <div>
                <h3>{tier.label}</h3>
                <p>{tier.description}</p>
              </div>
              <strong>{tier.range}</strong>
            </article>
          ))}
          <p className="price-note">
            You’ll see and approve the final onsite price before work begins.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServiceAreasSection() {
  return (
    <section className="section section--areas" id="areas">
      <div className="shell areas-layout">
        <div className="area-copy">
          <p className="eyebrow eyebrow--light">Local service, wider reach</p>
          <h2>Proudly clearing the Tri-State.</h2>
          <p>
            Based in Evansville and serving nearby communities across Southern
            Indiana, Western Kentucky, and Southeast Illinois.
          </p>
          <a className="button button--light" href={`tel:${phoneHref}`}>
            Call to confirm coverage
          </a>
        </div>
        <div className="location-grid" aria-label="Service locations">
          {locations.map((location, index) => (
            <Link
              href={`/locations/${location.slug}`}
              key={location.slug}
              aria-label={`Junk removal in ${location.name}`}
            >
              <small>{String(index + 1).padStart(2, "0")}</small>
              {location.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommercialSection() {
  return (
    <section className="section section--commercial" id="commercial">
      <div className="shell commercial-callout">
        <div>
          <p className="eyebrow eyebrow--light">For businesses</p>
          <h2>One contact for property and commercial cleanouts.</h2>
          <p>
            Property managers, contractors, offices, restaurants, and
            warehouses can ask about recurring pickups, turnovers, access
            coordination, phased work, and completion photos.
          </p>
        </div>
        <QuoteServiceLink
          className="button button--light"
          service="Property Management Turnovers"
        >
          Request commercial service
        </QuoteServiceLink>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section section--faq" id="faq">
      <div className="shell faq-layout">
        <div className="faq-layout__header">
          <p className="eyebrow">Good to know</p>
          <h2>Questions, answered.</h2>
          <p className="faq-intro">
            Still unsure? Start the quote form with the closest service, or
            text a photo and we’ll help identify the right option.
          </p>
        </div>
        <div className="faq-list">
          {homeFaqs.map((faq, index) => (
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
  );
}

export function FinalCtaSection() {
  return (
    <section className="final-cta">
      <div className="shell final-cta__inner">
        <div>
          <p className="eyebrow eyebrow--light">Ready when you are</p>
          <h2>Let’s get that space back.</h2>
        </div>
        <div>
          <a className="button button--light" href="#quote">
            Get a free quote
          </a>
          <a
            className="button button--outline-light"
            href={`tel:${phoneHref}`}
          >
            Call {phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
