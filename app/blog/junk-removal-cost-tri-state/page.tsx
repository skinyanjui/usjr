import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
      <Header />

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
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
              <Image
                src="/junk-removal-pricing.png"
                alt="Junk removal pricing guide"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              If you're planning a cleanup project in Evansville, Henderson, or anywhere in the Tri-State area, you're
              probably wondering: "How much will junk removal cost?" The answer depends on several factors, but we'll
              break down everything you need to know to budget for your project.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Average Junk Removal Costs in the Tri-State</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Evansville Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Single item: $89-149</li>
                    <li>• ¼ truck load: $179-249</li>
                    <li>• ½ truck load: $289-389</li>
                    <li>• ¾ truck load: $389-489</li>
                    <li>• Full truck load: $489-649</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Henderson, KY</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Single item: $99-159</li>
                    <li>• ¼ truck load: $189-259</li>
                    <li>• ½ truck load: $299-399</li>
                    <li>• ¾ truck load: $399-499</li>
                    <li>• Full truck load: $499-659</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">*Slightly higher due to cross-state service</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Affects Junk Removal Pricing?</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {pricingFactors.map((factor, index) => {
                const Icon = factor.icon
                return (
                  <Card key={index} className="glass text-center">
                    <CardHeader>
                      <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">{factor.title}</CardTitle>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          factor.impact === "High Impact"
                            ? "bg-red-100 text-red-700"
                            : factor.impact === "Medium Impact"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {factor.impact}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{factor.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Save Money on Junk Removal</h2>

            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Money-Saving Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Curbside Pickup:</strong> Save $25 by placing items at the curb instead of inside your home
                </li>
                <li>
                  <strong>Combine Projects:</strong> Schedule multiple rooms or neighbors together for volume discounts
                </li>
                <li>
                  <strong>Sort Items:</strong> Separate donations and recyclables to reduce disposal volume
                </li>
                <li>
                  <strong>Flexible Scheduling:</strong> Non-urgent pickups may qualify for off-peak pricing
                </li>
                <li>
                  <strong>Veterans & First Responders:</strong> Ask about our 10% discount for service members
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Professional Junk Removal?</h2>

            <p className="text-gray-700 mb-4">
              While DIY disposal might seem cheaper upfront, professional junk removal offers significant value:
            </p>

            <ul className="space-y-2 text-gray-700 mb-8">
              <li>
                • <strong>Time Savings:</strong> What takes you a weekend, we complete in hours
              </li>
              <li>
                • <strong>Heavy Lifting:</strong> No risk of injury from appliances, furniture, or debris
              </li>
              <li>
                • <strong>Proper Disposal:</strong> We handle recycling, donations, and hazardous materials correctly
              </li>
              <li>
                • <strong>No Hidden Costs:</strong> Our prices include labor, hauling, and disposal fees
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
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 font-semibold bg-transparent"
                >
                  Text Photos for Instant Quote
                </Button>
              </div>
            </div>

            <p className="text-gray-700">
              <strong>Bottom Line:</strong> Junk removal in the Tri-State area typically costs between $89-649 depending
              on your project size. With transparent pricing, professional service, and eco-friendly disposal, Uncle Sam Junk Removal makes cleanup projects simple and affordable for Evansville and Henderson area residents.
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
