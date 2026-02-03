import { HeroSection } from '@/components/hero-section'
import { HomeServiceCards } from '@/components/home-service-cards'
import { ReviewsRow } from '@/components/reviews-row'
import { HomeBlogSection } from '@/components/home-blog-section'
import { StructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { getActiveTestimonials, settings } from '@/lib/cms-content'
import { headers } from 'next/headers'
import { findClosestCityIndex } from '@/lib/location-utils'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  ...buildCanonicalMetadata('/', baseUrl),
}

export default async function HomePage() {
  const reviews = getActiveTestimonials(12)
  const headersList = await headers()
  const latitude = headersList.get('x-vercel-ip-latitude')
  const longitude = headersList.get('x-vercel-ip-longitude')

  let initialIndex = 0
  if (latitude && longitude) {
    initialIndex = findClosestCityIndex(
      parseFloat(latitude),
      parseFloat(longitude),
      settings.serviceAreas
    )
  }

  return (
    <main className="min-h-screen">
      <HeroSection initialIndex={initialIndex} />

      <HomeServiceCards />

      {/* Reviews summary moved to ReviewsRow */}

      <HomeBlogSection />

      <ReviewsRow reviews={reviews} />

      <StructuredData type="LocalBusiness" />
    </main>
  )
}
