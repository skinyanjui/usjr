import { HeroSection } from '@/components/hero-section'
import { HomeServiceCards } from '@/components/home-service-cards'
import { ReviewsRow } from '@/components/reviews-row'
import { HomeBlogSection } from '@/components/home-blog-section'
import { StructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { getActiveTestimonials } from '@/lib/cms-content'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  ...buildCanonicalMetadata('/', baseUrl),
}

export default function HomePage() {
  const reviews = getActiveTestimonials(12)

  return (
    <main className="min-h-screen">
      <HeroSection />

      <HomeServiceCards />

      {/* Reviews summary moved to ReviewsRow */}

      <HomeBlogSection />

      <ReviewsRow reviews={reviews} />

      <StructuredData type="LocalBusiness" />
    </main>
  )
}
