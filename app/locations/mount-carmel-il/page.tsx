import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"

export const metadata = {
  title: "Junk Removal Mount Carmel IL | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Mount Carmel, Illinois. Same-day service, transparent pricing. Serving Wabash County and surrounding. Call ${settings.phone}`,
  keywords: "junk removal Mount Carmel, Mount Carmel junk removal, trash removal Mount Carmel IL, Wabash County junk removal",
}

export default function MountCarmelPage() {
  const landmarks = [
    "Downtown Mount Carmel",
    "Wabash River",
    "Mount Carmel City Park",
    "Wabash Valley College",
    "Mount Carmel Court House",
    "Franks Tract/Levee areas",
  ]

  return (
    <main className="min-h-screen">
      <PageHero title="Junk Removal in Mount Carmel, Illinois" description="Friendly, fast junk removal across Mount Carmel and Wabash County" imageSrc="/junk-removal-evansville.png" priority />

      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mount Carmel's Local Junk Removal Team</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Same-Day Availability</h3>
                    <p className="text-gray-600">Call by 2 PM for same-day pickup in Mount Carmel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Responsible Disposal</h3>
                    <p className="text-gray-600">We donate and recycle whenever possible to reduce landfill</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transparent Pricing</h3>
                    <p className="text-gray-600">Upfront quotes with no surprises—text photos for a fast estimate</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  <a href={`sms:${settings.phoneE164}`}>Text Photos for Quote</a>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mount Carmel Landmarks We Service</h3>
              <div className="grid grid-cols-1 gap-3">
                {landmarks.map((landmark) => (
                  <div key={landmark} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{landmark}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Wabash County Disposal Info</h4>
                <p className="text-sm text-gray-600">
                  We follow local guidelines for disposal and recycling throughout Mount Carmel and Wabash County.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
