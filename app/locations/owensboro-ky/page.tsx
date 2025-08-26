import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"

export const metadata = {
  title: "Junk Removal Owensboro KY | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Owensboro, Kentucky. Extended service area from Indiana. Same-day pickup when possible. Call ${settings.phone}`,
  keywords: "junk removal Owensboro KY, Owensboro Kentucky junk removal, Daviess County junk pickup",
}

export default function OwensboroPage() {
  const landmarks = [
    "Downtown Owensboro",
    "Kentucky Wesleyan College",
    "Owensboro Community College",
    "International Bluegrass Museum",
    "Owensboro Museum of Fine Art",
    "Smothers Park",
    "Owensboro Riverfront",
    "Western Kentucky Botanical Garden",
  ]

  return (
    <main className="min-h-screen">
      <PageHero title="Junk Removal in Owensboro, Kentucky" description="Extended service area to Owensboro and Daviess County" imageSrc="/junk-removal-evansville.png" priority />

      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Owensboro Junk Removal Service</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Extended Service Area</h3>
                    <p className="text-gray-600">45-minute drive from our base - advance scheduling recommended</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Daviess County Licensed</h3>
                    <p className="text-gray-600">Fully licensed and insured for Kentucky operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Local Disposal Partners</h3>
                    <p className="text-gray-600">Working with Owensboro area recycling facilities</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Schedule Owensboro Service
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Owensboro Landmarks We Service</h3>
              <div className="grid grid-cols-1 gap-3">
                {landmarks.map((landmark) => (
                  <div key={landmark} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">{landmark}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Owensboro Service Notes</h4>
                <p className="text-sm text-gray-600">
                  Due to distance, we recommend scheduling Owensboro pickups 24-48 hours in advance for optimal service
                  timing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
