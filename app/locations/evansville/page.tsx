import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"

export const metadata = {
  title: "Junk Removal Evansville IN | #1 Local Service Since 2016 | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Evansville, Indiana with same-day service, transparent pricing, and eco-friendly disposal. Serving all Evansville neighborhoods with local expertise since 2016. Call ${settings.phone} for free estimates.`,
  keywords:
    "junk removal Evansville, Evansville junk removal, trash removal Evansville IN, furniture removal Evansville, appliance removal Evansville, estate cleanout Evansville, construction debris removal",
}

export default function EvansvillePage() {
  const landmarks = [
    "Downtown Evansville",
    "University of Evansville",
    "Eastland Mall",
    "Wesselman Woods",
    "Angel Mounds",
    "Ford Center",
    "Mesker Park Zoo",
    "Tropicana Evansville",
  ]

  const neighborhoods = [
    "Haynie's Corner",
    "Jacobsville",
    "Lincolnshire",
    "McCutchanville",
    "North Park",
    "Riverside",
    "Stringtown",
    "West Side",
  ]

  return (
    <main className="min-h-screen">
      <PageHero title="Professional Junk Removal in Evansville, Indiana" description="Local experts serving Evansville since 2016 with same-day service, transparent pricing, and eco-friendly disposal" imageSrc="/junk-removal-evansville.png" priority />

      {/* Local Expertise Section */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Evansville's Trusted Junk Removal Experts Since 2016</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Born and raised in the River City, we've completed over 3,000 junk removal projects across every Evansville neighborhood. From University of Evansville student move-outs to downtown business cleanouts, our local expertise ensures efficient, affordable service you can trust.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Evansville Chooses Uncle Sam Junk Removal</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Same-Day Service Across Evansville</h4>
                    <p className="text-gray-600">Call by 2 PM for same-day pickup. We serve from McCutchanville to downtown, with average response times under 3 hours for urgent requests.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Truck className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Deep Local Knowledge</h4>
                    <p className="text-gray-600">We know every Evansville neighborhood, from the historic Riverside district to new developments in the East Side. Our routes are optimized for efficiency and cost savings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Recycle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Local Environmental Partnerships</h4>
                    <p className="text-gray-600">We partner with Evansville Recycling Center, Habitat ReStore, and local charities to divert 68% of collected materials from landfills - keeping Evansville clean.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">No Travel Fees Within City Limits</h4>
                    <p className="text-gray-600">Unlike regional companies, we don't charge travel fees for service within Evansville city limits. What we quote is what you pay - guaranteed.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  <a href={`sms:${settings.phoneE164}`}>Text Photos for Instant Quote</a>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Evansville Service Areas</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {neighborhoods.map((neighborhood) => (
                  <div key={neighborhood} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-gray-700">{neighborhood}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Landmark Areas We Regularly Service</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {landmarks.map((landmark) => (
                    <div key={landmark}>• {landmark}</div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Service Guarantee</h4>
                <p className="text-sm text-red-700">If we can't provide same-day service when promised, we'll take $25 off your total - our commitment to reliable Evansville service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Real Evansville Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Jacobsville Estate Cleanout</h3>
              <p className="text-gray-600 mb-3">"After my father passed, we had 40+ years of items to clear from his Jacobsville home. Uncle Sam handled everything with sensitivity and donated usable items to local charities."</p>
              <p className="text-sm text-gray-500">- Patricia M., Jacobsville</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">UE Student Move-Out</h3>
              <p className="text-gray-600 mb-3">"Moving out of our UE apartment with tons of furniture and study materials. They came same-day, sorted recyclables, and charged exactly what they quoted."</p>
              <p className="text-sm text-gray-500">- Kevin L., University Area</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Downtown Office Cleanout</h3>
              <p className="text-gray-600 mb-3">"Our Main Street office renovation needed all furniture and equipment removed overnight. Uncle Sam coordinated after-hours service and recycled our old electronics properly."</p>
              <p className="text-sm text-gray-500">- Anderson & Associates, Downtown</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Evansville Offers */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Exclusive Evansville Offers</h2>
          <p className="text-xl text-gray-600 mb-8">
            Special pricing for our local Evansville neighbors - because community matters.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">University Discount</h3>
              <p className="text-red-600 font-bold text-xl mb-2">15% Off</p>
              <p className="text-sm text-gray-600">Students, faculty, and UE staff with valid ID</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Curbside Special</h3>
              <p className="text-red-600 font-bold text-xl mb-2">Save $35</p>
              <p className="text-sm text-gray-600">Items staged at curb for easy pickup</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Neighbor Referral</h3>
              <p className="text-red-600 font-bold text-xl mb-2">$25 Credit</p>
              <p className="text-sm text-gray-600">For each Evansville neighbor you refer</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Clean Up Evansville?</h3>
            <p className="text-gray-700 mb-4">Join hundreds of satisfied Evansville customers who trust Uncle Sam Junk Removal</p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold">
              Get Your Free Evansville Quote Today
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
