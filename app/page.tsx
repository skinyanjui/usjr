import { HeroSection } from '@/components/hero-section'
import { HomeServiceCards } from '@/components/home-service-cards'
import { ReviewsRow } from '@/components/reviews-row'
import { GoogleReviews } from '@/components/google-reviews'
import { StructuredData } from '@/components/structured-data'
import { getAggregateTestimonialStats } from '@/lib/cms-content'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import Link from 'next/link'

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

      {/* Simple review stats */}
      <div className="px-4 py-6 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-muted-foreground text-lg">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-900">
              {averageRating.toFixed(1)}/5
            </span>{' '}
            from {reviewCount} verified reviews
          </p>
        </div>
      </div>

      <GoogleReviews />

      <ReviewsRow />

      {/* Simple CTA Section */}
      <section className="bg-muted px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Get your free quote today. Same-day service available throughout the Tri-State area.
          </p>
          <Link
            href="/quote"
            className="inline-flex min-h-[48px] items-center rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gray-900"
          >
            Get Free Quote
          </Link>
        </div>
      </section>

      <StructuredData type="LocalBusiness" />
    </main>
  )
}
