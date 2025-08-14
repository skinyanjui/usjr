import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"

export const metadata = {
  title: "Junk Removal Henderson KY | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Henderson, Kentucky. Cross-state service from Indiana. Same-day pickup available. Call ${settings.phone}`,
  keywords: "junk removal Henderson KY, Henderson Kentucky junk removal, trash removal Henderson, Kentucky junk pickup",
}

export default function HendersonPage() {
  const landmarks = [
    "Downtown Henderson",
    "Henderson Community College",
    "Audubon State Park",
    "Central Park",
    "Henderson County Courthouse",
    "John James Audubon Museum",
    "Ellis Park Racing",
    "Henderson Riverfront",
  ]

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Junk Removal in Henderson, Kentucky</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">Cross-state junk removal service from Indiana to Henderson, KY</p>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Serving Henderson County with Indiana efficiency</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Henderson, KY Junk Removal Experts</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Cross-State Service</h3>
                    <p className="text-gray-600">Licensed to operate in Kentucky - just across the river</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Kentucky Compliant</h3>
                    <p className="text-gray-600">Following all Henderson County disposal regulations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Eco-Friendly Disposal</h3>
                    <p className="text-gray-600">We recycle whenever possible to reduce landfill impact</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  variant="outline"
                  className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Text Photos for Quote
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Henderson Service Landmarks</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {landmarks.map((landmark) => (
                  <div key={landmark}>• {landmark}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
