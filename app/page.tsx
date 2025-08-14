import { HeroSection } from "@/components/hero-section"
import { PricingGrid } from "@/components/pricing-grid"
import { ServicesSection } from "@/components/services-section"
import HomeClient from "./pageClient"
import { EmergencyBanner } from "@/components/emergency-banner"
import { HowItWorks } from "@/components/how-it-works"
import { ServiceSelectionWizard } from "@/components/service-selection-wizard"
import { ServiceArea } from "@/components/service-area"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <EmergencyBanner />
      <HeroSection />
      <PricingGrid />
      <HowItWorks />
      <ServiceSelectionWizard />
      <HomeClient />
      <ServiceArea />
      <ServicesSection />
    </main>
  )
}
