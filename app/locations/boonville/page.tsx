import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"

export const metadata = {
  title: "Junk Removal Boonville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Boonville, Indiana. Serving Warrick County. Same-day service available. Call ${settings.phone}`,
  keywords: "junk removal Boonville, Boonville junk removal, Warrick County junk pickup, trash removal Boonville IN",
}

export default function BoonvillePage() {
  const landmarks = [
    "Historic Downtown Boonville",
    "Warrick County Courthouse",
    "Boonville High School",
    "Scales Lake Park",
    "Warrick County Museum",
    "Boonville Country Club",
    "Yankeetown Nature Preserve",
    "Ohio River Access",
  ]

  return (
    <main className="min-h-screen">
      <PageHero title="Junk Removal in Boonville, Indiana" description="Reliable junk removal service for Boonville and Warrick County" imageSrc="/junk-removal-evansville.png" priority />

      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Boonville's Local Junk Removal Team</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">County Seat Service</h3>
                    <p className="text-gray-600">25-minute drive from Evansville - regular service to Boonville</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Rural Property Friendly</h3>
                    <p className="text-gray-600">Experienced with larger rural properties and farm cleanouts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Warrick County Compliant</h3>
                    <p className="text-gray-600">Following all county disposal and recycling guidelines</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Schedule Boonville Pickup
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Boonville Service Areas</h3>
              <div className="grid grid-cols-1 gap-3">
                {landmarks.map((landmark) => (
                  <div key={landmark} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-700">{landmark}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Rural Service Specialty</h4>
                <p className="text-sm text-gray-600">
                  We specialize in rural property cleanouts, farm equipment removal, and large-scale projects throughout
                  Warrick County.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
