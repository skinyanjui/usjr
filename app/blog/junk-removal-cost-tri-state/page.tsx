import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, DollarSign, Truck, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { settings } from "@/lib/cms-content"

export const metadata = {
  title: "Junk Removal Cost in Tri-State Area 2025 | Complete Pricing Guide",
  description:
    "Complete breakdown of junk removal costs in Evansville, Henderson, and Tri-State area. Learn pricing factors, get estimates, and save money on your cleanup project.",
  keywords:
    "junk removal cost Evansville, Henderson junk removal prices, Tri-State cleanup costs, junk removal pricing guide",
}

export default function JunkRemovalCostPage() {
  const pricingFactors = [
    {
      icon: Truck,
      title: "Load Size",
      description: "Single items from $89, while full truck loads can reach $649",
      impact: "High Impact",
    },
    {
      icon: Home,
      title: "Location Access",
      description: "Ground floor pickup vs. upstairs or basement removal",
      impact: "Medium Impact",
    },
    {
      icon: DollarSign,
      title: "Item Type",
      description: "Electronics and appliances may have disposal fees",
      impact: "Low Impact",
    },
  ]

  return (
    <main className="min-h-screen">
      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link href="/blog" className="text-red-600 hover:text-red-700 font-medium">
              ← Back to Blog
            </Link>
          </div>

          <header className="mb-12">
            <div className="mb-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Pricing Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How much does junk removal cost in the Tri-State? (full breakdown)
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Updated Jan 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Uncle Sam Team</span>
              </div>
            </div>
          </header>

          <div className="prose prose-red max-w-none">
            <p>
              Understanding junk removal pricing helps you budget your project and avoid surprises. This guide explains the
              factors that affect cost and provides real ranges for Evansville, Henderson, and surrounding areas.
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

            <div className="bg-red-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your Exact Quote</h3>
              <p className="text-gray-700 mb-4">
                Ready to find out exactly what your junk removal project will cost? We offer free, no-obligation
                estimates for all Tri-State area residents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold">
                  <a href={`tel:${settings.phoneE164}`}>📞 Call {settings.phone}</a>
                </Button>
                <Button asChild variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-6 py-3 font-semibold bg-transparent">
                  <a href={`sms:${settings.phoneE164}`}>Text Photos for Instant Quote</a>
                </Button>
              </div>
            </div>

            <p className="text-gray-700">
              <strong>Bottom Line:</strong> Junk removal in the Tri-State area typically costs from $89-649 depending
              on your project size. With transparent pricing, professional service, and eco-friendly disposal, Uncle Sam Junk Removal makes cleanup projects simple and affordable for Evansville and Henderson area residents.
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}
