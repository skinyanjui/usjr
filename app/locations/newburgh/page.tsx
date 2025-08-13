import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"

export const metadata = {
  title: "Junk Removal Newburgh IN | Same-Day Service | Bulls of Indiana",
  description:
    "Professional junk removal in Newburgh, Indiana. Same-day service, transparent pricing. Serving Newburgh and Warrick County. Call (812) 610-1657",
  keywords: "junk removal Newburgh, Newburgh junk removal, trash removal Newburgh IN, Warrick County junk removal",
}

export default function NewburghPage() {
  const landmarks = [
    "Historic Downtown Newburgh",
    "Newburgh Riverfront",
    "Castle High School",
    "Newburgh Town Hall",
    "Ohio River Scenic Byway",
    "Newburgh Museum",
    "Friedman Park",
    "Newburgh Lock and Dam",
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Junk Removal in Newburgh, Indiana</h1>
            <p className="text-xl text-gray-600 mb-6">
              Trusted junk removal service for Newburgh and Warrick County residents
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Serving historic Newburgh with pride</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Newburgh's Trusted Junk Removal Team</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Quick Response Time</h3>
                    <p className="text-gray-600">15-minute drive from Evansville - fast service to Newburgh</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Historic District Friendly</h3>
                    <p className="text-gray-600">Careful handling in Newburgh's historic neighborhoods</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Warrick County Compliant</h3>
                    <p className="text-gray-600">Following all local disposal regulations and guidelines</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold mr-4">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent"
                >
                  Schedule Newburgh Pickup
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Newburgh Landmarks We Service</h3>
              <div className="grid grid-cols-1 gap-3">
                {landmarks.map((landmark) => (
                  <div key={landmark} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">{landmark}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Warrick County Disposal Info</h4>
                <p className="text-sm text-gray-600">
                  We work with Warrick County Solid Waste Management for proper disposal and recycling of all materials
                  collected in Newburgh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
