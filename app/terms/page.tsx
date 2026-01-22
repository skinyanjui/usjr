import type { Metadata } from 'next'
import Link from 'next/link'
import { buildCanonicalMetadata } from '@/components/canonical'
import { PageHero } from '@/components/ui/page-hero'
import { settings } from '@/lib/cms-content'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Terms of Service | Uncle Sam Junk Removal',
  description:
    "Read Uncle Sam Junk Removal's terms of service covering bookings, cancellations, payments, and service limitations.",
  ...buildCanonicalMetadata('/terms', baseUrl),
}

export default function TermsPage() {
  return (
    <main className="bg-muted/30 min-h-screen">
      <PageHero
        title="Terms of Service"
        description="Bookings, cancellations, payments, and service limitations"
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="border-border bg-card mb-8 flex flex-wrap gap-4 rounded-lg border p-4 shadow-sm">
          <Link
            href="/"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900"
          >
            Home
          </Link>
          <Link
            href="/quote"
            className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Get a Quote
          </Link>
          <Link
            href="/services"
            className="text-muted-foreground border-border hover:bg-muted/30 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
          >
            Our Services
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground border-border hover:bg-muted/30 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        <p className="text-foreground mb-2 text-3xl font-bold">Service terms overview</p>
        <p className="text-muted-foreground mb-8">Effective: January 1, 2025</p>
        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Agreement to Terms</h2>
          <p className="text-muted-foreground">
            These Terms of Service ("Terms") constitute a legally binding agreement between you
            ("you" or "Customer") and Uncle Sam Junk Removal ("Company", "we", "us", or "our")
            governing your access to and use of our website and services, including junk removal,
            light demolition, and cleaning (collectively, the "Services"). By scheduling or using
            our Services, you agree to these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Quotes, Estimates & Booking</h2>
          <ul className="text-muted-foreground list-disc space-y-1 pl-6">
            <li>
              Quotes are estimates based on the information provided and/or on-site assessment
            </li>
            <li>
              Final pricing may vary based on actual volume, weight, labor time, access constraints,
              disposal fees, and materials handled
            </li>
            <li>Estimates provided via photo/text are non-binding until confirmed on site</li>
            <li>
              Scheduling is subject to availability and may be affected by weather, traffic, or
              disposal site hours
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Cancellations & Rescheduling</h2>
          <p className="text-muted-foreground">
            You can cancel or reschedule up to 24 hours in advance at no charge. Same-day
            cancellations may incur a $25 dispatch fee. Missed appointments where we are unable to
            access the property may be treated as a same-day cancellation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Arrival Windows & Access</h2>
          <ul className="text-muted-foreground list-disc space-y-1 pl-6">
            <li>We provide arrival windows; crews will call or text when en route</li>
            <li>Customer must ensure safe and legal access to items for removal</li>
            <li>We reserve the right to refuse service where conditions are unsafe or unlawful</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Payments</h2>
          <ul className="text-muted-foreground list-disc space-y-1 pl-6">
            <li>Payment is due upon completion of service unless otherwise agreed in writing</li>
            <li>We accept cash, check, and major credit/debit cards</li>
            <li>Returned checks may incur a service fee</li>
            <li>Past-due amounts may accrue late fees or interest as permitted by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Ownership & Disposal</h2>
          <ul className="text-muted-foreground list-disc space-y-1 pl-6">
            <li>
              By authorizing removal, you represent that you have lawful ownership or authority over
              items
            </li>
            <li>
              Items removed are generally not retrievable once loaded due to safety and logistical
              constraints; we are not responsible for items mistakenly included
            </li>
            <li>
              We dispose of materials in compliance with local, state, and federal regulations
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Prohibited Materials</h2>
          <p className="text-muted-foreground">
            We cannot remove hazardous materials including paint, chemicals, oils, fuels, asbestos,
            biohazards, medical waste, pressurized tanks, or any materials prohibited by law. Please
            contact us if you are unsure whether an item can be removed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">
            Property Protection & Limitations
          </h2>
          <ul className="text-muted-foreground list-disc space-y-1 pl-6">
            <li>
              We take reasonable care to avoid damage. Customer is responsible for clearing pathways
              and protecting floors, walls, and fixtures where feasible
            </li>
            <li>
              We are not liable for pre-existing conditions or concealed defects (e.g., brittle
              drywall, weak stairs, unsecured fixtures)
            </li>
            <li>
              For structural moves or tight spaces, Customer acknowledges a risk of scuffs or minor
              damage despite reasonable care
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Safety</h2>
          <p className="text-muted-foreground">
            Crews may refuse or stop work if conditions are unsafe, unsanitary, or beyond the scope
            of quoted service. Customer must keep pets and bystanders clear of work areas.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Photos, Videos & Reviews</h2>
          <ul className="text-muted-foreground list-disc space-y-1 pl-6">
            <li>
              We may take before/after photos for job documentation, quality assurance, and customer
              communication
            </li>
            <li>
              With your permission, photos/videos may be used for marketing. You can withdraw
              consent at any time by contacting us
            </li>
            <li>
              Public reviews you post may be quoted for marketing with attribution to the platform
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Warranties & Disclaimers</h2>
          <p className="text-muted-foreground">
            EXCEPT AS EXPRESSLY PROVIDED, SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
            WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Liability Limitation</h2>
          <p className="text-muted-foreground">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR LIABILITY FOR ANY CLAIMS ARISING OUT OF OR
            RELATED TO THE SERVICES WILL NOT EXCEED THE AMOUNT YOU PAID FOR THE APPLICABLE SERVICE
            GIVING RISE TO THE CLAIM. IN NO EVENT WILL WE BE LIABLE FOR INDIRECT, INCIDENTAL,
            CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Indemnification</h2>
          <p className="text-muted-foreground">
            You agree to defend, indemnify, and hold harmless the Company and its personnel from and
            against claims, damages, liabilities, and expenses arising from your use of the Services
            or breach of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Rescheduling; Force Majeure</h2>
          <p className="text-muted-foreground">
            We are not responsible for delays or failure to perform due to events beyond our
            reasonable control, including weather, accidents, traffic, labor shortages, or disposal
            facility closures. We will make reasonable efforts to reschedule promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">
            Governing Law & Dispute Resolution
          </h2>
          <p className="text-muted-foreground">
            These Terms are governed by the laws of the State of Indiana without regard to conflict
            of laws principles. You agree to resolve disputes in the state or federal courts located
            in Vanderburgh County, Indiana, and consent to personal jurisdiction and venue there.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Changes to Terms</h2>
          <p className="text-muted-foreground">
            We may update these Terms from time to time. Changes are effective when posted on our
            website with an updated "Last updated" date. Continued use of the Services after changes
            constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-foreground mb-2 text-2xl font-bold">Contact</h2>
          <p className="text-muted-foreground">
            Questions about these Terms? Email info@unclesamjunkremoval.com or call {settings.phone}
            . Mail: Uncle Sam Junk Removal, Evansville, IN.
          </p>
        </section>

        <p className="text-muted-foreground text-sm">Last updated: January 1, 2025</p>


      </div>
    </main>
  )
}
