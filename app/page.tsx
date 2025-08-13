import { HeroSection } from "@/components/hero-section"
import { PricingGrid } from "@/components/pricing-grid"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { PricingCalculator } from "@/components/pricing-calculator"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PricingGrid />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get Instant Pricing</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Use our interactive calculator to get an immediate estimate for your project. No personal information
              required.
            </p>
          </div>
          <PricingCalculator />
        </div>
      </section>
      <ServicesSection />
      <ContactSection />
    </main>
  )
}
