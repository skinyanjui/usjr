import { HeroSection } from "@/components/hero-section"
import { BentoGrid } from "@/components/bento-grid"
import { HomeServiceCards } from "@/components/home-service-cards"
import { ReviewsRow } from "@/components/reviews-row"
import { StructuredData } from "@/components/structured-data"
import { getAggregateTestimonialStats } from "@/lib/cms-content"

export default function HomePage() {
  const { averageRating, reviewCount } = getAggregateTestimonialStats()
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Removed Quote CTA Section per request */}

      

      <div className="px-4 mt-4 text-center text-gray-700 text-sm">
        <span className="font-semibold">{averageRating.toFixed(1)}/5</span> from {reviewCount} verified reviews
      </div>

      <HomeServiceCards />
      <ReviewsRow />
      <BentoGrid />
      <StructuredData type="LocalBusiness" />
    </main>
  )
}
