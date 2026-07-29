"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  emailAddress,
  phoneDisplay,
  phoneHref,
  services,
} from "../site-data";

const serviceGroups = [
  {
    title: "Home cleanouts",
    slugs: [
      "junk-removal",
      "furniture-removal",
      "estate-cleanouts",
      "garage-cleanout",
      "storage-unit-cleanouts",
      "mattress-removal",
      "appliance-removal",
    ],
  },
  {
    title: "Property & business",
    slugs: [
      "cleaning",
      "property-management-turnovers",
      "office-cleanouts",
      "restaurant-equipment-removal",
      "warehouse-fixture-removal",
    ],
  },
  {
    title: "Outdoor & demolition",
    slugs: [
      "light-demolition",
      "hot-tub-removal",
      "yard-waste-removal",
      "storm-debris-cleanup",
      "holiday-tree-removal",
    ],
  },
].map((group) => ({
  ...group,
  services: group.slugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service)),
}));

const popularService = services.find(
  (service) => service.slug === "shed-removal",
);

type BrandLogoProps = {
  footer?: boolean;
  onClick?: () => void;
};

function BrandLogo({ footer = false, onClick }: BrandLogoProps) {
  return (
    <Link
      className={`brand${footer ? " brand--footer" : ""}`}
      href="/"
      aria-label="Uncle Sam Junk Removal home"
      onClick={onClick}
    >
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__top">US</span>
        <span className="brand-mark__bottom">JR</span>
      </span>
      <span>
        <strong>UNCLE SAM</strong>
        <small>JUNK REMOVAL</small>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const servicesCloseTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  function cancelServicesClose() {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current);
      servicesCloseTimerRef.current = null;
    }
  }

  function openServices() {
    cancelServicesClose();
    setServicesOpen(true);
  }

  function closeServicesSoon() {
    cancelServicesClose();
    servicesCloseTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimerRef.current = null;
    }, 350);
  }

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        cancelServicesClose();
        setMenuOpen(false);
        setServicesOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        cancelServicesClose();
        setMenuOpen(false);
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      cancelServicesClose();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const mobileNavigation = window.matchMedia("(max-width: 860px)");
    const previousOverflow = document.body.style.overflow;

    function syncBodyScrollLock() {
      document.body.style.overflow = mobileNavigation.matches
        ? "hidden"
        : previousOverflow;
    }

    syncBodyScrollLock();
    mobileNavigation.addEventListener("change", syncBodyScrollLock);

    return () => {
      mobileNavigation.removeEventListener("change", syncBodyScrollLock);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  function closeNavigation() {
    cancelServicesClose();
    setMenuOpen(false);
    setServicesOpen(false);
  }

  return (
    <>
      <div className="announcement">
        <div className="shell announcement__inner">
          <span>
            <span className="status-dot" aria-hidden="true" />
            Same-day pickup may be available
          </span>
          <a href={`tel:${phoneHref}`}>Call to check today’s route</a>
        </div>
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="shell nav-wrap">
          <BrandLogo onClick={closeNavigation} />

          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => {
              setMenuOpen((current) => {
                if (current) {
                  setServicesOpen(false);
                }
                return !current;
              });
            }}
          >
            <span className="sr-only">
              {menuOpen ? "Close navigation" : "Open navigation"}
            </span>
            <span />
            <span />
          </button>

          <nav
            id="main-navigation"
            className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}
            aria-label="Main navigation"
          >
            <div
              className="nav-item nav-item--mega"
              onMouseEnter={openServices}
              onMouseLeave={closeServicesSoon}
              onFocusCapture={openServices}
              onBlurCapture={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                ) {
                  closeServicesSoon();
                }
              }}
            >
              <button
                className="nav-trigger"
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-mega-menu"
                onClick={() => {
                  cancelServicesClose();
                  setServicesOpen((current) => !current);
                }}
              >
                Services
                <span aria-hidden="true">⌄</span>
              </button>

              <div
                className="mega-menu"
                id="services-mega-menu"
                hidden={!servicesOpen}
              >
                <div className="mega-menu__header">
                  <div>
                    <span>What can we clear?</span>
                    <strong>
                      {services.length} services for homes and businesses
                    </strong>
                  </div>
                  <Link href="/services" onClick={closeNavigation}>
                    View all services
                  </Link>
                </div>

                <div className="mega-menu__grid">
                  {serviceGroups.map((group) => (
                    <div className="mega-menu__group" key={group.title}>
                      <h2>{group.title}</h2>
                      {group.services.map((service) => (
                        <Link
                          href={`/services/${service.slug}`}
                          key={service.slug}
                          onClick={closeNavigation}
                        >
                          {service.name}
                          <span aria-hidden="true">→</span>
                        </Link>
                      ))}
                    </div>
                  ))}

                  {popularService && (
                    <Link
                      className="mega-menu__feature"
                      href={`/services/${popularService.slug}`}
                      onClick={closeNavigation}
                    >
                      <span>Popular service</span>
                      <strong>{popularService.name}</strong>
                      <p>
                        Dismantling and haul-away for wood, metal, and resin
                        sheds.
                      </p>
                      <small>Explore shed removal →</small>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <Link href="/#pricing" onClick={closeNavigation}>
              Pricing
            </Link>
            <Link href="/locations" onClick={closeNavigation}>
              Locations
            </Link>
            <Link href="/#faq" onClick={closeNavigation}>
              FAQ
            </Link>
          </nav>

          <div className="nav-actions">
            <a className="text-link" href={`tel:${phoneHref}`}>
              {phoneDisplay}
            </a>
            <Link className="button button--small" href="/#quote">
              Get a free quote
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <BrandLogo footer />
            <p className="footer-identity">
              <span>Veteran-owned</span>
              <span>Evansville, Indiana</span>
            </p>
            <p>
              Friendly junk and furniture removal, cleanouts, cleaning, and
              light demolition across the Evansville Tri-State.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/services">All services</Link>
            <Link href="/locations">All locations</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/#quote">Free quote</Link>
          </div>
          <div>
            <h3>Popular services</h3>
            <Link href="/services/junk-removal">Junk removal</Link>
            <Link href="/services/furniture-removal">Furniture removal</Link>
            <Link href="/services/shed-removal">Shed removal</Link>
            <Link href="/services/estate-cleanouts">Estate cleanouts</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
            <span>Evansville, Indiana</span>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Uncle Sam Junk Removal</span>
          <div className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
          <span>Serving homes, rentals, and businesses</span>
        </div>
      </footer>

      <div className="mobile-actions" aria-label="Quick contact">
        <a href={`tel:${phoneHref}`}>Call now</a>
        <Link href="/#quote">Get quote</Link>
      </div>
    </>
  );
}
