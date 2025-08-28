import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"

export const metadata = {
  title: "Junk Removal Mount Vernon IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Mount Vernon, Indiana. Same-day service and fair pricing for Posey County homes and businesses. Call ${settings.phone}`,
  keywords: "junk removal Mount Vernon, Mount Vernon junk removal, Posey County junk removal, trash removal Mount Vernon IN",
}

export default function MountVernonPage() {
  const landmarks = [
    "Downtown Mount Vernon",
    "Posey County Courthouse",
    "Alex Karras Park",
    "Hovey Lake Fish & Wildlife Area",
    "Mount Vernon Riverfront",
    "West Elementary / MVHS area",
  ]

  return (
    <main className="min-h-screen">
      <PageHero title="Junk Removal in Mount Vernon, Indiana" description="Local junk removal for Mount Vernon and Posey County" imageSrc="/junk-removal-evansville.png" priority />

      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mount Vernon's Trusted Hauling Team</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast Turnaround</h3>
                    <p className="text-gray-600">Same-day or next-day pickups across Mount Vernon</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Local Posey County Pros</h3>
                    <p className="text-gray-600">Courteous crew and careful removal in tight spaces</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Eco-Conscious Disposal</h3>
                    <p className="text-gray-600">We donate and recycle to keep Mount Vernon clean</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  <a href={`sms:${settings.phoneE164}`}>Text Photos for Quote</a>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mount Vernon Landmarks We Service</h3>
              <div className="grid grid-cols-1 gap-3">
                {landmarks.map((landmark) => (
                  <div key={landmark} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span className="text-gray-700">{landmark}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Posey County Disposal Info</h4>
                <p className="text-sm text-gray-600">We follow Posey County rules for responsible disposal and recycling.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

