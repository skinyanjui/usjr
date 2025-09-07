import { HeroSection } from '@/components/hero-section'
import { BentoGrid } from '@/components/bento-grid'
import { HomeServiceCards } from '@/components/home-service-cards'
import { ReviewsRow } from '@/components/reviews-row'
import { StructuredData } from '@/components/structured-data'
import { getAggregateTestimonialStats } from '@/lib/cms-content'
import { HomeMap } from '@/components/home-map'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  ...buildCanonicalMetadata('/', baseUrl),
}

export default function HomePage() {
  const { averageRating, reviewCount } = getAggregateTestimonialStats()
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Removed Quote CTA Section per request */}

      <div className="mt-4 px-4 text-center text-sm text-gray-700">
        <span className="font-semibold">{averageRating.toFixed(1)}/5</span> from {reviewCount}{' '}
        verified reviews
      </div>

      <HomeServiceCards />
      <ReviewsRow />
      <BentoGrid />
      <StructuredData type="LocalBusiness" />
      {/* Defer map below-the-fold to avoid critical request chains */}
      <div className="mt-8">
        <HomeMap />
      </div>
    </main>
  )
}
