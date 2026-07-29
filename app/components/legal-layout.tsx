import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { emailAddress, phoneDisplay, phoneHref } from "../site-data";

type LegalNavItem = {
  href: string;
  label: string;
};

type LegalPageProps = {
  title: string;
  eyebrow: string;
  description: string;
  effectiveDate?: string;
  updatedDate: string;
  currentPath: string;
  sections: LegalNavItem[];
  children: ReactNode;
};

const legalPages = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/accessibility", label: "Accessibility" },
];

export function LegalPage({
  title,
  eyebrow,
  description,
  effectiveDate,
  updatedDate,
  currentPath,
  sections,
  children,
}: LegalPageProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="legal-hero">
          <div className="shell">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="legal-dates" aria-label="Policy dates">
              {effectiveDate && <span>Effective: {effectiveDate}</span>}
              <span>Last updated: {updatedDate}</span>
            </div>
          </div>
        </section>

        <nav className="legal-switcher" aria-label="Legal pages">
          <div className="shell">
            {legalPages.map((page) => (
              <Link
                href={page.href}
                key={page.href}
                aria-current={currentPath === page.href ? "page" : undefined}
              >
                {page.label}
              </Link>
            ))}
          </div>
        </nav>

        <section className="section legal-section">
          <div className="shell legal-layout">
            <aside className="legal-toc">
              <span>On this page</span>
              <nav aria-label={`${title} sections`}>
                {sections.map((section) => (
                  <a href={section.href} key={section.href}>
                    {section.label}
                  </a>
                ))}
              </nav>
              <div className="legal-contact-card">
                <strong>Questions or requests?</strong>
                <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
                <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              </div>
            </aside>

            <article className="legal-document">{children}</article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
