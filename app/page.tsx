import { HeroSection } from "@/components/hero-section"
import { BentoGrid } from "@/components/bento-grid"
import { HomeServiceCards } from "@/components/home-service-cards"
import { ReviewsRow } from "@/components/reviews-row"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Shield, Clock, Star, Phone, Camera } from "lucide-react"
import { settings } from "@/lib/cms-content"
import QuoteFormClient from "@/app/quote/QuoteFormClient"


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Quote CTA Section (mirrors quote page header) */}
      <section className="bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-3 sm:gap-4 mb-8">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Leaf className="w-3 h-3 mr-1" />
              Eco-Friendly
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              Fully Insured
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              <Star className="w-3 h-3 mr-1" />
              Woman-Owned
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              <Clock className="w-3 h-3 mr-1" />
              Same-Day Service
            </Badge>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get Your Free Quote Today</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            Professional junk removal, dumpster rental, cleaning, estate cleanouts, and light demolition in Evansville and Southern Indiana.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3">
              <a href={`tel:${settings.phoneE164}`}><Phone className="w-5 h-5 mr-2" />Call {settings.phone}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-blue-800 text-blue-800 hover:bg-blue-100 px-6 sm:px-8 py-3 bg-transparent"
            >
              <a href={`sms:${settings.phoneE164}`}><Camera className="w-5 h-5 mr-2" />Text Photos for Instant Quote</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Inline Quote Form on Homepage */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <QuoteFormClient />
          </div>
        </div>
      </section>

      <HomeServiceCards />
      <ReviewsRow />
      <BentoGrid />
    </main>
  )
}
