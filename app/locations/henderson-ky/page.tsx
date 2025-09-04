import { Button } from "@/components/ui/button"
import { Clock, Truck, Recycle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"
import { StructuredData } from "@/components/structured-data"
import { UNIFORM_OFFERS } from "@/lib/uniform-offers"

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
      <PageHero title="Junk Removal in Henderson, Kentucky" description="Cross-state junk removal service from Indiana to Henderson, KY" imageSrc="/junk-removal-evansville.png" priority />

      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Henderson, KY Junk Removal Experts</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{UNIFORM_OFFERS.LICENSED_INSURED}</h3>
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
                    <h3 className="font-semibold text-gray-900">{UNIFORM_OFFERS.ECO_FRIENDLY}</h3>
                    <p className="text-gray-600">We recycle whenever possible to reduce landfill impact</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 {UNIFORM_OFFERS.CALL_NOW}
                </Button>
                <Button
                  variant="outline"
                  className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  {UNIFORM_OFFERS.TEXT_PHOTOS}
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

      {/* Local Offers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Henderson, KY Special Offers</h2>
            <p className="text-lg text-gray-600">Cross-state service deals for Henderson residents</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cross-River Discount</h3>
              <p className="text-green-600 font-bold text-lg mb-2">Save $25</p>
              <p className="text-gray-600">For Henderson County customers</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{UNIFORM_OFFERS.FREE_ESTIMATES}</h3>
              <p className="text-green-600 font-bold text-lg mb-2">Always Free</p>
              <p className="text-gray-600">Text photos for instant quote</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Henderson, KY Junk Removal FAQ</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you have a license to operate in Kentucky?</h3>
              <p className="text-gray-600">Yes! We're fully licensed and insured to operate in Kentucky. We serve Henderson County regularly and follow all local disposal regulations.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What areas of Henderson do you serve?</h3>
              <p className="text-gray-600">We serve all of Henderson including downtown, Ellis Park area, Audubon State Park vicinity, and surrounding Henderson County neighborhoods.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do you handle Kentucky disposal requirements?</h3>
              <p className="text-gray-600">We partner with local Kentucky disposal facilities and recycling centers to ensure all materials are disposed of according to Henderson County and Kentucky state regulations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <StructuredData 
        type="Service" 
        data={{
          name: "Junk Removal in Henderson, KY",
          description: "Cross-state junk removal service from Indiana to Henderson, Kentucky",
          category: "Junk Removal Service", 
          price: "Starting at $89",
          serviceArea: ["Henderson, KY", "Henderson County, KY"],
          offers: [
            {
              name: "Cross-River Discount",
              description: "Save $25 for Henderson County customers"
            },
            {
              name: UNIFORM_OFFERS.FREE_ESTIMATES,
              description: "Always free estimates via phone or text"
            }
          ]
        }}
      />
    </main>
  )
}
