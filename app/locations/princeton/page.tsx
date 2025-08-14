import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Truck, Recycle } from "lucide-react"

export const metadata = {
  title: "Junk Removal Princeton IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    "Professional junk removal in Princeton, Indiana. Serving Gibson County. Same-day service available. Call (812) 610-1657",
  keywords: "junk removal Princeton, Princeton junk removal, Gibson County junk pickup, trash removal Princeton IN",
}

export default function PrincetonPage() {
  const landmarks = [
    "Downtown Princeton",
    "Gibson County Courthouse",
    "Princeton Community High School",
    "Princeton Golf Club",
    "Gibson County Fairgrounds",
    "Wabash River Access",
    "Princeton City Park",
    "Toyota Motor Manufacturing",
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Junk Removal in Princeton, Indiana</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Professional junk removal service for Princeton and Gibson County
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span>Serving Gibson County's largest city</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Princeton's Trusted Junk Removal Service</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Gibson County Coverage</h3>
                    <p className="text-gray-600">30-minute drive from Evansville - regular service to Princeton area</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Industrial Experience</h3>
                    <p className="text-gray-600">Experienced with commercial and industrial cleanouts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Recycle className="w-6 h-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">County Compliant</h3>
                    <p className="text-gray-600">Following Gibson County environmental regulations</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Schedule Princeton Service
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Princeton Service Areas</h3>
              <div className="grid grid-cols-1 gap-3">
                {landmarks.map((landmark) => (
                  <div key={landmark} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span className="text-gray-700">{landmark}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Commercial Services Available</h4>
                <p className="text-sm text-gray-600">
                  We provide commercial junk removal services for Princeton businesses, including office cleanouts and
                  industrial waste removal.
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
