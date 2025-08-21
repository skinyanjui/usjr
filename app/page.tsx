import { HeroSection } from "@/components/hero-section"
import { BentoGrid } from "@/components/bento-grid"
import { HomeServiceCards } from "@/components/home-service-cards"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HomeServiceCards />
      <BentoGrid />
    </main>
  )
}
