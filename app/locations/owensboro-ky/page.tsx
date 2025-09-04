import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"
import { StructuredData } from "@/components/structured-data"
import { UNIFORM_OFFERS } from "@/lib/uniform-offers"

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
                    <h3 className="font-semibold text-gray-900">{UNIFORM_OFFERS.FLEXIBLE_SCHEDULING}</h3>
                    <p className="text-gray-600">45-minute drive from our base - advance scheduling recommended</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{UNIFORM_OFFERS.LICENSED_INSURED}</h3>
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
                  📞 {UNIFORM_OFFERS.CALL_NOW}
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  {UNIFORM_OFFERS.SCHEDULE_SERVICE}
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

      {/* Local Offers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Owensboro, KY Special Offers</h2>
            <p className="text-lg text-gray-600">Extended area service deals for Daviess County</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Advance Booking Discount</h3>
              <p className="text-purple-600 font-bold text-lg mb-2">Save $30</p>
              <p className="text-gray-600">Book 48 hours in advance for Owensboro service</p>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{UNIFORM_OFFERS.FREE_ESTIMATES}</h3>
              <p className="text-purple-600 font-bold text-lg mb-2">Always Free</p>
              <p className="text-gray-600">Detailed estimates for all projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Owensboro Junk Removal FAQ</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How far in advance should I schedule Owensboro service?</h3>
              <p className="text-gray-600">We recommend scheduling 24-48 hours in advance for optimal service timing. Advanced bookings also qualify for our $30 discount.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What parts of Owensboro and Daviess County do you serve?</h3>
              <p className="text-gray-600">We serve all of Owensboro including downtown, the riverfront area, Kentucky Wesleyan College vicinity, and throughout Daviess County.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you work with local Owensboro recycling facilities?</h3>
              <p className="text-gray-600">Yes! We partner with Owensboro area recycling facilities and donation centers to ensure materials are properly handled according to Daviess County guidelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <StructuredData 
        type="Service" 
        data={{
          name: "Junk Removal in Owensboro, KY",
          description: "Extended service area junk removal for Owensboro and Daviess County",
          category: "Junk Removal Service",
          price: "Starting at $89", 
          serviceArea: ["Owensboro, KY", "Daviess County, KY"],
          offers: [
            {
              name: "Advance Booking Discount",
              description: "Save $30 when you book 48 hours in advance"
            },
            {
              name: UNIFORM_OFFERS.FREE_ESTIMATES,
              description: "Free detailed estimates for all projects"
            }
          ]
        }}
      />
    </main>
  )
}
