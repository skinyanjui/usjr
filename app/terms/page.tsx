import type { Metadata } from "next";
import { LegalPage } from "../components/legal-layout";
import {
  emailAddress,
  phoneDisplay,
  phoneHref,
  siteUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing quotes, bookings, cancellations, access, payment, disposal, cleaning, light demolition, and other Uncle Sam services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Uncle Sam Junk Removal",
    description:
      "Bookings, pricing, payments, customer responsibilities, prohibited materials, safety, and service limitations.",
    url: `${siteUrl}/terms`,
  },
};

const sections = [
  { href: "#agreement", label: "Agreement and services" },
  { href: "#quotes", label: "Quotes and booking" },
  { href: "#cancellations", label: "Cancellations" },
  { href: "#access", label: "Access and authority" },
  { href: "#materials", label: "Materials and disposal" },
  { href: "#demolition", label: "Light demolition" },
  { href: "#cleaning", label: "Cleaning services" },
  { href: "#payment", label: "Payment" },
  { href: "#safety", label: "Safety and property" },
  { href: "#photos", label: "Photos and reviews" },
  { href: "#legal", label: "Legal terms" },
  { href: "#contact", label: "Contact us" },
];

export default function TermsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    description:
      "Terms governing the website and services provided by Uncle Sam Junk Removal.",
    url: `${siteUrl}/terms`,
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
        title="Terms of Service"
        eyebrow="Service agreement"
        description="These terms govern use of the website and the quotes, scheduling, removal, cleaning, hauling, light-demolition, and related services provided by Uncle Sam Junk Removal."
        effectiveDate="January 1, 2025"
        updatedDate="July 26, 2026"
        currentPath="/terms"
        sections={sections}
      >
        <div className="legal-summary">
          <span>Service terms overview</span>
          <p>
            Photo estimates are preliminary. The customer approves the final
            scope and price before work starts, confirms authority over the
            property and items, and must disclose access, safety, hazardous
            material, utility, and specialty-handling concerns.
          </p>
        </div>

        <section id="agreement">
          <h2>1. Agreement and covered services</h2>
          <p>
            These Terms of Service form an agreement between the customer and
            Uncle Sam Junk Removal. By using the website, scheduling work,
            authorizing a crew to begin, or accepting completed services, you
            agree to these terms.
          </p>
          <p>
            Covered services may include junk, furniture, appliance, and
            mattress removal; cleaning; estate, garage, storage-unit, office,
            restaurant, warehouse, and property-turnover cleanouts; yard-waste,
            holiday-tree, and storm-debris pickup; and agreed light demolition
            such as certain sheds and hot tubs. The written or approved quote
            controls the actual scope of each job.
          </p>
        </section>

        <section id="quotes">
          <h2>2. Quotes, estimates, and booking</h2>
          <ul>
            <li>
              Photo, phone, text, email, and website estimates are based on the
              information available and are not final until the actual items,
              conditions, access, and scope are confirmed.
            </li>
            <li>
              Final pricing may reflect volume, weight, material type, labor,
              stairs, carrying distance, disassembly, equipment, disposal fees,
              cleaning condition, and special handling.
            </li>
            <li>
              Published price ranges are planning guides and do not guarantee a
              price for a particular job.
            </li>
            <li>
              The customer will have an opportunity to approve the final scope
              and price before work begins. Added items or changed conditions
              may require a revised quote.
            </li>
            <li>
              Appointments are subject to crew availability, route capacity,
              weather, traffic, safe access, and disposal-facility hours.
            </li>
          </ul>
        </section>

        <section id="cancellations">
          <h2>3. Cancellations, rescheduling, and arrival windows</h2>
          <p>
            Contact us as soon as possible if you need to cancel or reschedule.
            Any cancellation, missed-appointment, or dispatch charge applies
            only when it was disclosed and accepted before the appointment was
            booked.
          </p>
          <p>
            Arrival times are provided as windows rather than guaranteed exact
            times. We may call or text when the crew is en route and will make
            reasonable efforts to communicate material delays.
          </p>
        </section>

        <section id="access">
          <h2>4. Customer authority, access, and item selection</h2>
          <ul>
            <li>
              You represent that you own the items and property involved or
              have legal authority from the owner to authorize the work.
            </li>
            <li>
              You must identify what stays and what goes before loading begins.
              Removed items may be commingled, transferred, recycled, donated,
              or disposed of and generally cannot be retrieved after loading.
            </li>
            <li>
              You must provide lawful, safe, and reasonably clear access,
              including gate, elevator, loading-dock, parking, or building
              permissions when applicable.
            </li>
            <li>
              Pets, children, tenants, employees, customers, and bystanders
              must remain clear of active work areas.
            </li>
          </ul>
        </section>

        <section id="materials">
          <h2>5. Prohibited and specialty materials</h2>
          <p>
            We do not accept asbestos, biohazards, medical waste, explosives,
            fuels, oils, unidentified chemicals, or other hazardous or
            regulated materials unless we expressly confirm in writing that
            lawful handling has been arranged. Never conceal or mislabel
            hazardous material.
          </p>
          <p>
            Paint, pressurized containers, refrigerant-containing appliances,
            batteries, tires, electronics, concrete, dirt, roofing, and
            unusually heavy items may be declined, limited, or separately
            priced. Disclose these items before arrival so we can confirm
            whether they are accepted and what preparation is required.
          </p>
          <p>
            We decide the lawful disposal, recycling, donation, or transfer
            method after removal. Donation or recycling is not guaranteed
            because acceptance depends on condition, capacity, and facility
            rules.
          </p>
        </section>

        <section id="demolition">
          <h2>6. Light-demolition preparation</h2>
          <p>
            Light demolition is limited to the non-structural work identified
            in the approved quote. The customer is responsible for disclosing
            utility lines, tanks, permits, easements, shared property, hazardous
            materials, foundations, and concealed conditions.
          </p>
          <p>
            Electrical, gas, water, sewer, and other utilities must be safely
            disconnected by a qualified person when required. We may stop or
            decline work if a structure, foundation, utility, access route,
            weather condition, or hidden material creates a safety or legal
            concern.
          </p>
        </section>

        <section id="cleaning">
          <h2>7. Cleaning and turnover services</h2>
          <p>
            Cleaning is limited to the rooms, tasks, condition, and service
            level included in the approved quote. Standard cleaning is not
            mold, asbestos, sewage, hoarding-hazard, pest, biohazard, or
            environmental remediation.
          </p>
          <p>
            We do not guarantee removal of every stain, odor, discoloration, or
            pre-existing condition. The customer must identify delicate
            materials, damaged finishes, special products, restricted areas,
            and known hazards before cleaning begins.
          </p>
        </section>

        <section id="payment">
          <h2>8. Payment, invoices, and past-due amounts</h2>
          <p>
            Payment timing and the accepted payment method will be confirmed
            with the quote or booking. The amount due is based on the approved
            scope and any changes you authorize before or during the work.
            Written invoice terms provided to a commercial customer control
            when they apply.
          </p>
          <p>
            The website does not currently collect or store payment-card
            numbers. Payments handled by a third-party processor are also
            subject to that provider’s terms and privacy practices.
          </p>
        </section>

        <section id="safety">
          <h2>9. Safety, property protection, and existing conditions</h2>
          <p>
            We use reasonable care, but moving bulky items and performing
            removal work carries risk. Customers should clear pathways,
            identify fragile surfaces and concealed hazards, and protect floors,
            walls, landscaping, fixtures, and personal property when practical.
          </p>
          <p>
            We are not responsible for pre-existing damage, ordinary wear,
            concealed defects, weak or deteriorated materials, unmarked
            utilities, or conditions outside the agreed scope. We may refuse or
            stop work that is unsafe, unlawful, unsanitary, structurally risky,
            or materially different from the quote.
          </p>
        </section>

        <section id="photos">
          <h2>10. Photos, documentation, and reviews</h2>
          <p>
            We may take project photos for quoting, job documentation, safety,
            quality control, customer communication, and dispute resolution.
            We will seek permission before using identifiable customer or
            property content for marketing when permission is required.
          </p>
          <p>
            Reviews you voluntarily post on a public platform may be referenced
            or quoted with platform attribution, subject to applicable law and
            the platform’s rules.
          </p>
        </section>

        <section id="legal">
          <h2>11. Disclaimers, liability, and other legal terms</h2>
          <h3>Service disclaimer</h3>
          <p>
            Except for commitments expressly stated in an approved quote,
            services and website content are provided on an “as available”
            basis to the extent permitted by law. Website information does not
            replace an onsite assessment.
          </p>
          <h3>Limitation of liability</h3>
          <p>
            To the maximum extent permitted by applicable law, Uncle Sam Junk
            Removal will not be liable for indirect, incidental, special,
            consequential, exemplary, or punitive damages. Our aggregate
            liability arising from a particular service will not exceed the
            amount paid for that service. Nothing in these terms excludes
            liability that cannot lawfully be limited.
          </p>
          <h3>Indemnification</h3>
          <p>
            To the extent permitted by law, you agree to be responsible for
            claims, losses, or costs caused by your lack of authority,
            undisclosed hazards, unlawful instructions, or material breach of
            these terms.
          </p>
          <h3>Events beyond reasonable control</h3>
          <p>
            We are not responsible for delay or nonperformance caused by severe
            weather, accidents, traffic, labor or equipment shortages, utility
            conditions, government action, disposal-facility closures, or other
            events beyond reasonable control. We will make reasonable efforts
            to communicate and reschedule.
          </p>
          <h3>Governing law and venue</h3>
          <p>
            Indiana law governs these terms without regard to conflict-of-law
            principles. Unless applicable law requires otherwise, disputes must
            be brought in a state or federal court with jurisdiction in
            Vanderburgh County, Indiana.
          </p>
          <h3>Changes and severability</h3>
          <p>
            We may update these terms by posting a new updated date. If a
            provision is found unenforceable, the remaining provisions will
            continue to apply. Failure to enforce a provision once does not
            waive the right to enforce it later.
          </p>
        </section>

        <section id="contact">
          <h2>12. Contact us</h2>
          <p>
            Questions about these terms may be directed to Uncle Sam Junk
            Removal at <a href={`mailto:${emailAddress}`}>{emailAddress}</a>,{" "}
            <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>, or by mail to
            Uncle Sam Junk Removal, Evansville, Indiana.
          </p>
        </section>
      </LegalPage>
    </>
  );
}
