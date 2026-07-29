import type { Metadata } from "next";
import { LegalPage } from "../components/legal-layout";
import {
  emailAddress,
  phoneDisplay,
  phoneHref,
  siteUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Uncle Sam Junk Removal’s accessibility goals, website measures, known limitations, and ways to request help or report a barrier.",
  alternates: {
    canonical: "/accessibility",
  },
  openGraph: {
    title: "Accessibility Statement | Uncle Sam Junk Removal",
    description:
      "Our commitment to making service information and quote options easier to use for people with disabilities.",
    url: `${siteUrl}/accessibility`,
  },
};

const sections = [
  { href: "#commitment", label: "Our commitment" },
  { href: "#status", label: "Accessibility status" },
  { href: "#measures", label: "Measures in place" },
  { href: "#limitations", label: "Known limitations" },
  { href: "#assistance", label: "Alternative access" },
  { href: "#feedback", label: "Feedback and contact" },
];

export default function AccessibilityPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Accessibility Statement",
    description:
      "Accessibility commitment and feedback process for Uncle Sam Junk Removal.",
    url: `${siteUrl}/accessibility`,
    isPartOf: {
      "@type": "WebSite",
      name: "Uncle Sam Junk Removal",
      url: siteUrl,
    },
    dateModified: "2026-07-26",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LegalPage
        title="Accessibility Statement"
        eyebrow="Access for everyone"
        description="Uncle Sam Junk Removal wants customers with disabilities to be able to understand our services, review service areas, and request help using the method that works best for them."
        updatedDate="July 26, 2026"
        currentPath="/accessibility"
        sections={sections}
      >
        <div className="legal-summary">
          <span>Need help now?</span>
          <p>
            If any part of this website is difficult to use, call{" "}
            <a href={`tel:${phoneHref}`}>{phoneDisplay}</a> or email{" "}
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>. We can
            provide service information and take a quote request through an
            alternative method.
          </p>
        </div>

        <section id="commitment">
          <h2>1. Our commitment</h2>
          <p>
            We are committed to improving digital access for people with
            visual, hearing, mobility, speech, cognitive, and neurological
            disabilities. Accessibility is an ongoing responsibility, and we
            welcome feedback from customers who encounter a barrier.
          </p>
        </section>

        <section id="status">
          <h2>2. Accessibility status</h2>
          <p>
            We aim to follow the Web Content Accessibility Guidelines (WCAG)
            2.2 Level AA where practical. This statement does not claim that
            every page, third-party service, device, or assistive-technology
            combination is fully conformant.
          </p>
          <p>
            We review the site as services and content change and prioritize
            problems that prevent customers from obtaining information or
            contacting us.
          </p>
        </section>

        <section id="measures">
          <h2>3. Accessibility measures used on this site</h2>
          <p>The current website includes:</p>
          <ul>
            <li>A skip link and semantic page landmarks.</li>
            <li>Logical heading structure and descriptive page titles.</li>
            <li>Keyboard-visible focus indicators and keyboard-operable links.</li>
            <li>Form labels, required-field indicators, and accessible status updates.</li>
            <li>High-contrast text and controls with practical touch targets.</li>
            <li>Responsive layouts for phones, tablets, laptops, and large screens.</li>
            <li>Reduced-motion support when that preference is enabled.</li>
            <li>Text alternatives for meaningful images.</li>
          </ul>
        </section>

        <section id="limitations">
          <h2>4. Known limitations and third-party services</h2>
          <p>
            Phone, text, email, map, payment, and other links may open
            applications or services controlled by third parties. Their
            accessibility is outside our direct control.
          </p>
          <p>
            The website may also display externally hosted imagery. If an image
            does not load, the surrounding text and contact options are
            intended to preserve the essential service information.
          </p>
        </section>

        <section id="assistance">
          <h2>5. Alternative ways to access our services</h2>
          <p>
            You do not have to use the online quote form. You may request a
            quote, ask about pricing, confirm a service area, or schedule help
            by phone, text, or email. Tell us if you need information read
            aloud, repeated, sent in writing, or provided through another
            reasonable communication method.
          </p>
        </section>

        <section id="feedback">
          <h2>6. Report a barrier or request assistance</h2>
          <p>
            Email <a href={`mailto:${emailAddress}`}>{emailAddress}</a> or call
            or text <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>. If
            possible, include the page or feature involved, what you were trying
            to do, and the browser, device, or assistive technology you used.
            You are not required to disclose a disability.
          </p>
          <p>
            We will make a reasonable effort to respond promptly and provide
            the requested information through an accessible alternative while
            we evaluate the barrier.
          </p>
        </section>
      </LegalPage>
    </>
  );
}
