import type { Metadata } from "next";
import { LegalPage } from "../components/legal-layout";
import {
  emailAddress,
  phoneDisplay,
  phoneHref,
  siteUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Uncle Sam Junk Removal handles quote, scheduling, service, payment, website, text, email, and customer information.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Uncle Sam Junk Removal",
    description:
      "How customer information is collected, used, protected, retained, and shared.",
    url: `${siteUrl}/privacy`,
  },
};

const sections = [
  { href: "#scope", label: "Scope" },
  { href: "#information", label: "Information we collect" },
  { href: "#quote-flow", label: "Quote form and photos" },
  { href: "#use", label: "How we use information" },
  { href: "#communications", label: "Calls, texts, and email" },
  { href: "#technology", label: "Website technology" },
  { href: "#sharing", label: "How we share information" },
  { href: "#retention", label: "Retention and security" },
  { href: "#choices", label: "Your choices and rights" },
  { href: "#other", label: "Other disclosures" },
  { href: "#contact", label: "Contact us" },
];

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Privacy practices for Uncle Sam Junk Removal website and services.",
    url: `${siteUrl}/privacy`,
    isPartOf: {
      "@type": "WebSite",
      name: "Uncle Sam Junk Removal",
      url: siteUrl,
    },
    dateModified: "2026-07-29",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LegalPage
        title="Privacy Policy"
        eyebrow="Your information"
        description="This policy explains what information Uncle Sam Junk Removal receives through this website and during quotes, scheduling, payment, and service—and what we do with it."
        effectiveDate="January 1, 2025"
        updatedDate="July 29, 2026"
        currentPath="/privacy"
        sections={sections}
      >
        <div className="legal-summary">
          <span>Plain-language summary</span>
          <p>
            We collect the information needed to quote, schedule, and complete
            requested work. When you submit the website quote form, its contents
            are securely emailed to our local team through Resend. This website
            does not sell personal information, create customer accounts, or
            collect payment through the quote form.
          </p>
        </div>

        <section id="scope">
          <h2>1. Scope</h2>
          <p>
            This Privacy Policy applies when you visit this website, request a
            quote, call, text, email, schedule service, make a payment, or
            interact with Uncle Sam Junk Removal in connection with junk
            removal, cleaning, cleanouts, appliance hauling, debris cleanup,
            light demolition, and related services.
          </p>
          <p>
            It covers online and offline interactions in the United States. It
            does not control the independent privacy practices of your phone
            carrier, email provider, payment processor, or a third-party site
            you choose to visit.
          </p>
        </section>

        <section id="information">
          <h2>2. Information we collect</h2>
          <p>Depending on how you interact with us, we may receive:</p>
          <ul>
            <li>
              Contact details such as your name, phone number, email address,
              service address, city, ZIP code, and company name.
            </li>
            <li>
              Project details such as the requested service, item descriptions,
              estimated volume, access notes, preferred dates, and safety
              information.
            </li>
            <li>
              Content you provide, including messages, photos, videos, reviews,
              and before-and-after documentation.
            </li>
            <li>
              Service and transaction records, including appointments, work
              completed, invoices, payment status, and customer-support history.
            </li>
            <li>
              Basic technical information processed by hosting and security
              providers, such as IP address, browser or device type, requested
              pages, timestamps, and security events.
            </li>
          </ul>
          <p>
            Please do not send Social Security numbers, account passwords,
            full payment-card numbers, medical records, or other highly
            sensitive information through the quote form, text, or ordinary
            email.
          </p>
        </section>

        <section id="quote-flow">
          <h2>3. How this website’s quote flow works</h2>
          <p>
            When you select “Get my free quote,” the contact details, pickup
            area, requested service, timing, estimated quantity, access details,
            preferred contact method, project notes, and consent selection you
            entered are sent through our website host and email-delivery
            provider, Resend, to our business inbox. The website does not create
            a customer account, charge a card, or place the request in a public
            directory.
          </p>
          <p>
            Photos are optional. If you add photos, the form accepts three to
            eight JPG, PNG, HEIC, or HEIF files, prepares compatible images in
            your browser, and sends those photos together with your quote
            details through the website host and Resend to our business inbox.
            You may instead send photos by text or email. Information sent by
            text or email is also handled by the applicable carrier or email
            provider and becomes part of our business communications.
          </p>
          <p>
            Each submitted request receives a reference number. Replies sent to
            the unique reply address may be processed by Resend and forwarded
            between the customer and our local team so additional details and
            photos stay associated with that request.
          </p>
        </section>

        <section id="use">
          <h2>4. How we use information</h2>
          <p>We may use information to:</p>
          <ul>
            <li>Respond to questions and prepare or confirm quotes.</li>
            <li>Schedule, route, provide, document, and support services.</li>
            <li>Communicate about arrival windows, access, changes, and follow-up.</li>
            <li>Process payments and maintain invoices and service records.</li>
            <li>Protect customers, crews, property, and business operations.</li>
            <li>Prevent fraud, misuse, security incidents, and unlawful activity.</li>
            <li>Improve our website, service quality, and customer experience.</li>
            <li>Meet tax, accounting, insurance, disposal, and legal obligations.</li>
          </ul>
        </section>

        <section id="communications">
          <h2>5. Calls, texts, and email</h2>
          <p>
            When you call, text, or email us, we use the contact information you
            provide to respond to your request and communicate about quotes,
            scheduling, arrival, service, payment, and support. Message and data
            rates may apply, and carriers are not responsible for delayed or
            undelivered messages.
          </p>
          <p>
            Customer-initiated quote and scheduling messages are service
            communications. We do not treat a quote request as permission for
            unrelated automated marketing. You may ask us to stop nonessential
            texts at any time, including by replying STOP. Reply HELP or contact
            us directly for assistance.
          </p>
        </section>

        <section id="technology">
          <h2>6. Website technology, logs, and cookies</h2>
          <p>
            This version of the website does not intentionally run advertising
            pixels or personalized-ad tracking. Hosting, security, and network
            providers may process standard connection logs and use technologies
            needed to deliver, protect, and troubleshoot the site.
          </p>
          <p>
            Your browser may also store ordinary cache, preferences, or similar
            technical data. If we later add material analytics, advertising, or
            session-replay tools, we will update this policy and provide any
            choices required by applicable law.
          </p>
        </section>

        <section id="sharing">
          <h2>7. How we disclose information</h2>
          <p>We may disclose information only as reasonably needed:</p>
          <ul>
            <li>
              To service providers supporting hosting and email delivery,
              including Resend, and providers supporting communications,
              scheduling, payments, accounting, insurance, analytics, or
              business operations.
            </li>
            <li>
              To contractors, disposal facilities, recyclers, or other partners
              involved in completing an approved service.
            </li>
            <li>
              To comply with law, legal process, safety duties, or requests from
              authorized public officials.
            </li>
            <li>
              To protect rights, property, safety, customers, crews, or the
              public, or to investigate fraud and misuse.
            </li>
            <li>
              In connection with a merger, financing, reorganization, sale, or
              transfer of all or part of the business.
            </li>
            <li>With your consent or at your direction.</li>
          </ul>
          <p>
            We do not sell personal information for money. We may use or share
            aggregated information that does not reasonably identify an
            individual.
          </p>
        </section>

        <section id="retention">
          <h2>8. Retention and security</h2>
          <p>
            We keep information only as long as reasonably necessary for the
            purposes described in this policy, including service records,
            customer support, accounting, tax, insurance, dispute resolution,
            safety, and legal compliance. Retention periods vary by record type.
          </p>
          <p>
            We use reasonable administrative, technical, and physical
            safeguards appropriate to the information we maintain. No
            transmission or storage system is completely secure, so we cannot
            guarantee absolute security.
          </p>
        </section>

        <section id="choices">
          <h2>9. Your choices and privacy requests</h2>
          <p>
            Depending on where you live and subject to legal exceptions, you
            may ask to access, correct, delete, or receive a copy of certain
            personal information. You may also ask about how information was
            used or disclosed.
          </p>
          <p>
            Send a request to{" "}
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a> or call{" "}
            <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>. We may need to
            verify your identity and authority before completing a request.
            We will not discriminate against you for exercising an applicable
            privacy right.
          </p>
        </section>

        <section id="other">
          <h2>10. Children, third-party links, and policy changes</h2>
          <h3>Children</h3>
          <p>
            Our website and services are not directed to children under 13, and
            we do not knowingly collect personal information from children
            under 13. Contact us if you believe a child provided information.
          </p>
          <h3>Third-party services</h3>
          <p>
            Links and actions that open a phone, text, email, map, payment, or
            other third-party service are governed by that provider’s terms and
            privacy practices.
          </p>
          <h3>Changes to this policy</h3>
          <p>
            We may update this policy to reflect changes in our website,
            operations, service providers, or legal obligations. The updated
            date at the top will show when the policy changed.
          </p>
        </section>

        <section id="contact">
          <h2>11. Contact us</h2>
          <p>
            Privacy questions and requests may be directed to Uncle Sam Junk
            Removal at <a href={`mailto:${emailAddress}`}>{emailAddress}</a>,{" "}
            <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>, or by mail to
            Uncle Sam Junk Removal, Evansville, Indiana.
          </p>
        </section>
      </LegalPage>
    </>
  );
}
