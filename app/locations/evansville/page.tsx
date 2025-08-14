import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Truck, Recycle, Building2, Home } from "lucide-react"
import { settings } from "@/lib/cms-content"

export const metadata = {
  title: "Junk Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Evansville, Indiana. Same-day service, transparent pricing, eco-friendly disposal. Serving all Evansville neighborhoods. Call ${settings.phone}`,
  keywords:
    "junk removal Evansville, Evansville junk removal, trash removal Evansville IN, furniture removal Evansville, appliance removal Evansville",
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Junk Removal in Evansville, Indiana</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Same-day junk removal service throughout Evansville and surrounding areas
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>Proudly serving Evansville since 2020</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Uncle Sam Junk Removal in Evansville?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Same-Day Service</h3>
                    <p className="text-gray-600">Call by 2 PM for same-day pickup throughout Evansville</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Local Evansville Team</h3>
                    <p className="text-gray-600">Born and raised in the River City - we know every neighborhood</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Eco-Friendly Disposal</h3>
                    <p className="text-gray-600">Partner with Evansville recycling centers and donation facilities</p>
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
                  <a href={`sms:${settings.phoneE164}`}>Text Photos for Quote</a>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Evansville Service Areas</h3>
              <div className="grid grid-cols-2 gap-3">
                {neighborhoods.map((neighborhood) => (
                  <div key={neighborhood} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-gray-700">{neighborhood}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Popular Landmarks We Service</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {landmarks.map((landmark) => (
                    <div key={landmark}>• {landmark}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Evansville Disposal Guidelines & Regulations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  What We Accept in Evansville
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Furniture and appliances</li>
                  <li>✓ Electronics and computers</li>
                  <li>✓ Construction debris (non-hazardous)</li>
                  <li>✓ Yard waste and landscaping materials</li>
                  <li>✓ Hot tubs and exercise equipment</li>
                  <li>✓ Mattresses and box springs</li>
                  <li>✓ Office furniture and equipment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-red-600" />
                  Evansville Disposal Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>✗ Hazardous chemicals and paint</li>
                  <li>✗ Asbestos-containing materials</li>
                  <li>✗ Medical waste and pharmaceuticals</li>
                  <li>✗ Automotive fluids and batteries</li>
                  <li>✗ Propane tanks and compressed gases</li>
                  <li>✗ Tires (contact Vanderburgh County)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  For hazardous waste disposal, contact Vanderburgh County Solid Waste District at (812) 435-5624
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Clean Up Evansville?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of satisfied Evansville customers who trust Uncle Sam Junk Removal for their junk removal needs.
          </p>

          <div className="bg-red-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Evansville Special Offers</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Curbside Pickup Discount</h4>
                <p className="text-red-600 font-bold text-lg">Save $25</p>
                <p className="text-sm text-gray-600">Items placed at curb</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Veteran & First Responder</h4>
                <p className="text-red-600 font-bold text-lg">10% Off</p>
                <p className="text-sm text-gray-600">Thank you for your service</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Same-Day Guarantee</h4>
                <p className="text-red-600 font-bold text-lg">$25 Off</p>
                <p className="text-sm text-gray-600">If we can't come today</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
