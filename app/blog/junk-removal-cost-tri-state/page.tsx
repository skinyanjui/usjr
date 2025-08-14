import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, DollarSign, Truck, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
      description: "Single items start at $89, while full truck loads can reach $649",
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
                <User className="w-4 h-4" />
                <span>Uncle Sam Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>January 15, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>
          </header>

          <div className="prose prose-neutral max-w-none">
            <p>
              Junk removal pricing in the Tri-State varies based on load size, location access, item type, and urgency. This guide breaks down the key factors that influence cost and how to get the best value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            {pricingFactors.map((factor, index) => (
              <Card key={index} className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <factor.icon className="w-4 h-4 text-red-600" />
                    {factor.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{factor.description}</p>
                  <span className="inline-block mt-3 text-xs text-gray-700">{factor.impact}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
            <Image
              src="/junk-removal-pricing.png"
              alt="Junk removal pricing chart"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={50}
            />
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Get Your Exact Price?</h2>
            <p className="text-gray-700 mb-4">Text photos or call us now for an on-the-spot estimate.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-red-600 hover:bg-red-700 text-white">📞 Call (812) 610-1657</Button>
              <Link href="/quote">
                <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white bg-transparent">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
