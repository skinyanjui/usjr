import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/ui/page-hero'
import { buildCanonicalMetadata } from '@/components/canonical'
import { locationData } from '@/lib/location-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Service Areas | Uncle Sam Junk Removal',
  description:
    'Junk removal across the Tri-State: Evansville, Newburgh, Henderson, Owensboro, and nearby communities.',
  ...buildCanonicalMetadata('/locations', baseUrl),
}

export default function LocationsIndexPage() {
  const locations = Object.entries(locationData)

  return (
    <main className="min-h-screen">
      <PageHero title="Service Areas" description="Same-day junk removal across the Tri-State." />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <ul className="divide-border divide-y">
          {locations.map(([slug, data]) => (
            <li key={slug}>
              <Link
                href={`/locations/${slug}`}
                prefetch={false}
                className="group flex items-center justify-between py-5 transition-opacity hover:opacity-80"
              >
                <span className="text-foreground text-lg font-medium">
                  {data.locationName}, {data.state}
                </span>
                <ArrowRight className="text-muted-foreground h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
