import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Uncle Sam Junk Removal",
  description:
    "Read Uncle Sam Junk Removal's privacy policy. Learn how we collect, use, and protect your information.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Effective: January 1, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Overview</h2>
          <p className="text-gray-700">
            This Privacy Policy explains how Uncle Sam Junk Removal ("Company", "we", "us", or "our") collects, uses,
            discloses, and safeguards information when you visit our website, request a quote, schedule service, or
            otherwise interact with us (collectively, the "Services"). By using the Services, you agree to the
            practices described here. If you do not agree, please do not use the Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Scope & Applicability</h2>
          <p className="text-gray-700">
            This policy applies to information collected online via our website and offline via phone, text, and on-site
            service interactions in the United States. Additional disclosures for certain jurisdictions (e.g.,
            California) are included below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Information We Collect</h2>
          <p className="text-gray-700 mb-2">We collect information in the following categories:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>
              Identifiers and contact information (name, email, phone, address, service location, company name if
              applicable)
            </li>
            <li>Service details (items to remove, volume/weight estimates, access notes, requested dates/times)</li>
            <li>Content you provide (messages, reviews, before/after or quote photos and videos)</li>
            <li>
              Transaction information (service records, invoices, payment status). We do not store full credit card
              numbers; payments are processed by third-party providers
            </li>
            <li>
              Device and usage data (browser and device type, pages viewed, referring/exit pages, approximate location
              derived from IP, time/date stamps)
            </li>
            <li>Cookies and similar technologies data (see Cookies & Tracking below)</li>
            <li>Communications preferences and engagement (calls, emails, text/SMS interactions)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sources of Information</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Directly from you when you submit a form, call, email, text, or speak with our team</li>
            <li>Automatically through cookies, pixels, and similar technologies when you use our website</li>
            <li>
              From service providers and partners that support scheduling, communications, analytics, advertising, and
              payment processing
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Provide quotes, schedule appointments, and deliver Services</li>
            <li>Communicate with you about appointments, updates, and customer support</li>
            <li>Process payments and send invoices/receipts</li>
            <li>Verify identity and prevent fraud, abuse, and security incidents</li>
            <li>Improve the website, Services, and customer experience</li>
            <li>Conduct analytics and measure marketing effectiveness</li>
            <li>Comply with legal obligations and enforce our terms and policies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">SMS/Text Messaging</h2>
          <p className="text-gray-700">
            By providing your phone number, you consent to receive text messages related to quotes, scheduling,
            reminders, and customer service. Message and data rates may apply. Message frequency varies. You can opt out
            at any time by replying STOP. Reply HELP for help. Carriers are not liable for delayed or undelivered
            messages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cookies & Tracking Technologies</h2>
          <p className="text-gray-700 mb-2">
            We use cookies, pixels, and similar technologies to operate the site, understand usage, and improve our
            marketing. Types of cookies include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Essential: required for core site functionality</li>
            <li>Analytics: help us understand traffic and usage</li>
            <li>Advertising: measure and improve our marketing</li>
          </ul>
          <p className="text-gray-700 mt-2">
            You can manage cookie preferences via your browser settings. If you block certain cookies, parts of the site
            may not function properly. We respond to Global Privacy Control signals where required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Advertising</h2>
          <p className="text-gray-700">
            We may use analytics (e.g., Google Analytics) and advertising tools (e.g., Meta/Facebook) to understand site
            usage and improve our marketing. These tools may set cookies or read device identifiers. You can opt out of
            certain analytics/ads cookies in your browser and through platform-specific settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How We Share Information</h2>
          <p className="text-gray-700 mb-2">
            We do not sell your personal information. We may share information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>
              Service providers who perform services on our behalf (hosting, scheduling, payment processing,
              communications, analytics, marketing). These providers are bound by obligations to protect your
              information and use it only for our purposes
            </li>
            <li>Business transfers (merger, acquisition, or asset sale)</li>
            <li>Legal compliance, safety, and security purposes</li>
            <li>With your consent or at your direction</li>
            <li>
              Aggregated/de-identified information that does not identify you reasonably is shared for analytics and
              business purposes
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Retention</h2>
          <p className="text-gray-700">
            We retain information for as long as reasonably necessary to provide Services, comply with legal obligations,
            resolve disputes, and enforce our agreements. Retention periods vary by record type (e.g., quote requests,
            service records, invoices, and communications).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Security</h2>
          <p className="text-gray-700">
            We use reasonable administrative, technical, and physical safeguards to protect information. However, no
            method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Privacy Choices & Rights</h2>
          <p className="text-gray-700 mb-2">
            Depending on where you live, you may have rights to access, correct, delete, or receive a copy of your
            information, and to opt out of certain processing (such as targeted advertising). To exercise a right or
            make a request, contact us using the information below. We may need to verify your identity before acting on
            your request. You may designate an authorized agent to submit requests on your behalf as allowed by law.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Access and portability: request a copy of certain information</li>
            <li>Correction: request we fix inaccurate information</li>
            <li>Deletion: request we delete certain information, subject to legal exceptions</li>
            <li>
              Opt-out: where applicable, opt out of targeted advertising or sharing for cross-context behavioral
              advertising
            </li>
            <li>Appeal: if we deny your request, you may appeal by replying to our response</li>
            <li>Non-discrimination: we will not discriminate for exercising your rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">California Privacy Notice</h2>
          <p className="text-gray-700 mb-2">
            If you are a California resident, the California Consumer Privacy Act (CCPA), as amended by the CPRA,
            provides additional rights. In the last 12 months, we may have collected the following categories of personal
            information for business purposes: identifiers; commercial information; internet/usage information; geolocation
            (approximate); audio/electronic communications (e.g., calls, texts); and inferences from the above. We do not
            intentionally collect or use sensitive personal information. We do not sell personal information, but we may
            "share" information for cross-context behavioral advertising as defined under California law when analytics or
            advertising tools are active. You can submit requests using the Contact details below. We honor Global Privacy
            Control signals where required.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Children's Privacy</h2>
          <p className="text-gray-700">
            Our Services are not directed to children under 13, and we do not knowingly collect personal information from
            children under 13. If you believe a child has provided us information, please contact us so we can delete it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">International Users</h2>
          <p className="text-gray-700">
            We operate in the United States. If you access the Services from outside the U.S., you understand that your
            information may be transferred to and processed in the U.S., which may have different data protection laws
            than your country of residence.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Third-Party Links</h2>
          <p className="text-gray-700">
            Our website may contain links to third-party websites or services we do not control. We are not responsible
            for the privacy practices of those third parties. We encourage you to review their policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes. We
            will update the "Last updated" date below when changes are made.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact</h2>
          <p className="text-gray-700">
            Questions or requests? Email info@unclesamjunkremoval.com or call (812) 610-1657. Mail: Uncle Sam Junk
            Removal, Evansville, IN.
          </p>
        </section>

        <p className="text-gray-500 text-sm">Last updated: January 1, 2025</p>
      </div>
    </main>
  )
}
