import { HeroSection } from '@/components/hero-section'
import { HomeServiceCards } from '@/components/home-service-cards'
import { ReviewsRow } from '@/components/reviews-row'
import { GoogleReviews } from '@/components/google-reviews'
import { StructuredData } from '@/components/structured-data'
import { getAggregateTestimonialStats } from '@/lib/cms-content'
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

      <HomeServiceCards />

      {/* Reviews summary */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-muted-foreground text-lg">
            <span className="text-foreground text-3xl font-bold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">/5</span>
            {' '}from {reviewCount} verified reviews
          </p>
        </div>
      </section>

      <GoogleReviews />

      <ReviewsRow />



      <StructuredData type="LocalBusiness" />
    </main>
  )
}
