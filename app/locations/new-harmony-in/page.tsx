import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"

export const metadata = {
  title: "Junk Removal New Harmony IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in New Harmony, Indiana. Friendly local team, transparent pricing, eco-friendly disposal. Call ${settings.phone}`,
  keywords: "junk removal New Harmony, New Harmony junk removal, Posey County junk removal, trash removal New Harmony IN",
}

export default function NewHarmonyPage() {
  const landmarks = [
    "Historic New Harmony District",
    "Harmonie State Park",
    "Atheneum Visitor Center",
    "Roofless Church",
    "Wabash River Overlook",
  ]

  return (
    <main className="min-h-screen">
      <PageHero title="Junk Removal in New Harmony, Indiana" description="Careful hauling for New Harmony's historic homes and businesses" imageSrc="/junk-removal-evansville.png" priority />

      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Respectful Service in Historic New Harmony</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Prompt Scheduling</h3>
                    <p className="text-gray-600">Same-day when available or next-day guaranteed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Careful Handling</h3>
                    <p className="text-gray-600">We protect historic architecture and tight alleys during removal</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Eco-Friendly</h3>
                    <p className="text-gray-600">Donations and recycling prioritized to reduce landfill</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  <a href={`sms:${settings.phoneE164}`}>Text Photos for Quote</a>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">New Harmony Landmarks We Service</h3>
              <div className="grid grid-cols-1 gap-3">
                {landmarks.map((landmark) => (
                  <div key={landmark} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">{landmark}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Posey County Info</h4>
                <p className="text-sm text-gray-600">We follow local disposal rules and support preservation efforts in New Harmony.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

