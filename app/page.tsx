import { HeroSection } from "@/components/hero-section"
import { PricingGrid } from "@/components/pricing-grid"
import HomeClient from "./pageClient"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PricingGrid />
      <HomeClient />
    </main>
  )
}
