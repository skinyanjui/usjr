import { HeroSection } from "@/components/hero-section"
import { PricingGrid } from "@/components/pricing-grid"
import { ServicesSection } from "@/components/services-section"
import HomeClient from "./pageClient"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PricingGrid />
      <HomeClient />
      <ServicesSection />
    </main>
  )
}
