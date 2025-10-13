import { Button } from '@/components/ui/button'
import { Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'
import { SolidPanel } from '@/components/ui/solid-panel'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata = {
  title: 'Junk Removal Cost in Tri-State Area 2025 | Complete Pricing Guide',
  description:
    'Complete breakdown of junk removal costs in Evansville, Henderson, and Tri-State area. Learn pricing factors, get estimates, and save money on your cleanup project.',
  keywords:
    'junk removal cost Evansville, Henderson junk removal prices, Tri-State cleanup costs, junk removal pricing guide',
  ...buildCanonicalMetadata('/blog/junk-removal-cost-tri-state', baseUrl),
}

export default function JunkRemovalCostPage() {
  return (
    <main className="min-h-screen">
      <article className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <Link href="/blog" className="font-medium text-red-600 hover:text-red-700">
              ← Back to Blog
            </Link>
          </div>

          <header className="mb-12">
            <div className="mb-4">
              <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                Pricing Guide
              </span>
            </div>
            <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              How much does junk removal cost in the Tri-State? (full breakdown)
            </h1>
            <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Updated Jan 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Uncle Sam Team</span>
              </div>
            </div>
            <SolidPanel color="red" label="Pricing Breakdown" className="mb-8 h-64">
              Understand how load size, access, and item type shape every junk removal quote.
            </SolidPanel>
          </header>

          <div className="prose prose-red max-w-none">
            <p>
              Understanding junk removal pricing helps you budget your project and avoid surprises.
              This guide explains the factors that affect cost and provides real ranges for
              Evansville, Henderson, and surrounding areas.
            </p>

            <h2>What affects junk removal cost?</h2>
            <ul>
              <li>
                • <strong>Load Size:</strong> The amount of space your items take up in the truck
              </li>
              <li>
                • <strong>Item Type:</strong> Appliances and electronics may have recycling fees
              </li>
              <li>
                • <strong>Access:</strong> Stairs, distance to truck, or disassembly needs
              </li>
              <li>
                • <strong>Location:</strong> Travel time and disposal facility fees
              </li>
              <li>
                • <strong>Scheduling:</strong> Same-day or after-hours service may cost more
              </li>
              <li>
                • <strong>Insurance Coverage:</strong> Protected against damage during removal
              </li>
            </ul>

            <div className="mb-8 rounded-lg bg-red-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Get Your Exact Quote</h3>
              <p className="mb-4 text-gray-700">
                Ready to find out exactly what your junk removal project will cost? We offer free,
                no-obligation estimates for all Tri-State area residents.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  className="bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                >
                  <a href={`tel:${settings.phoneE164}`}>📞 Call {settings.phone}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-red-800 bg-transparent px-6 py-3 font-semibold text-red-800 hover:bg-red-800 hover:text-white"
                >
                  <a href={`sms:${settings.phoneE164}`}>Text Photos for Instant Quote</a>
                </Button>
              </div>
            </div>

            <p className="text-gray-700">
              <strong>Bottom Line:</strong> Junk removal in the Tri-State area typically costs from
              $89-649 depending on your project size. With transparent pricing, professional
              service, and eco-friendly disposal, Uncle Sam Junk Removal makes cleanup projects
              simple and affordable for Evansville and Henderson area residents.
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}
