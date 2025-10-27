import { HeroSection } from '@/components/hero-section'
import { HomeServiceCards } from '@/components/home-service-cards'
import { ReviewsRow } from '@/components/reviews-row'
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

      {/* Emergency Service Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-3">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-white">
            <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm md:text-base font-semibold">
              <span className="font-bold">Emergency Service Available:</span> Storm cleanup, urgent junk removal & same-day response
            </p>
          </div>
          <Link
            href="/emergency"
            className="whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-bold text-orange-600 hover:bg-gray-100 transition-colors"
          >
            Get Help Now →
          </Link>
        </div>
      </div>

      <HomeServiceCards />

      {/* Simple review stats */}
      <div className="px-4 py-6 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-lg text-gray-700">
            <span className="text-2xl font-bold text-blue-800">{averageRating.toFixed(1)}/5</span>{' '}
            from {reviewCount} verified reviews
          </p>
        </div>
      </div>

      <ReviewsRow />

      {/* Simple CTA Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-gray-700">
            Get your free quote today. Same-day service available throughout the Tri-State area.
          </p>
          <Link
            href="/quote"
            className="inline-block rounded-lg bg-blue-800 px-6 py-2.5 text-base font-semibold text-white transition-all hover:bg-blue-900"
          >
            Get Free Quote
          </Link>
        </div>
      </section>

      <StructuredData type="LocalBusiness" />
    </main>
  )
}
