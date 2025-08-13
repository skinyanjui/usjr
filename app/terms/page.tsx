import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Uncle Sam Junk Removal",
  description:
    "Read Uncle Sam Junk Removal's terms of service covering bookings, cancellations, payments, and service limitations.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Effective: January 1, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking & Cancellations</h2>
          <p className="text-gray-700">
            You can cancel or reschedule up to 24 hours in advance at no charge. Same-day cancellations may incur a
            $25 dispatch fee.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payments</h2>
          <p className="text-gray-700">
            Payment is due upon completion of service. We accept cash, check, and major credit cards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Limitations</h2>
          <p className="text-gray-700">
            We cannot remove hazardous materials including paint, chemicals, oils, fuels, asbestos, biohazards, or
            pressurized tanks. We follow all local disposal regulations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact</h2>
          <p className="text-gray-700">
            Questions? Email info@unclesamjunkremoval.com or call (812) 610-1657. We aim to respond within 1–2
            business days.
          </p>
        </section>

        <p className="text-gray-500 text-sm">Last updated: January 1, 2025</p>
      </div>
    </main>
  )
}