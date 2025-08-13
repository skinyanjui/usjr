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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Information We Collect</h2>
          <p className="text-gray-700">
            We collect information you provide directly (like name, email, phone, address, and service details) and
            limited technical data (such as device/browser type) to schedule services, provide quotes, and improve our
            website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>To provide quotes, schedule services, and communicate with you</li>
            <li>To send appointment reminders and important service updates</li>
            <li>To improve our website and customer experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sharing</h2>
          <p className="text-gray-700">
            We do not sell your personal information. We may share data with trusted providers who help us operate our
            business (e.g., scheduling and payment processors) under confidentiality obligations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Security</h2>
          <p className="text-gray-700">
            We use reasonable administrative, technical, and physical safeguards to protect your information.
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
