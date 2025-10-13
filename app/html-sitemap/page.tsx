import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/page-hero'
import { NAV } from '@/lib/nav'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Sitemap | Uncle Sam Junk Removal - All Pages',
  description:
    'Browse all pages on the Uncle Sam Junk Removal website. Find services, locations, blog posts, and more.',
  keywords: 'sitemap, site navigation, junk removal services, Evansville pages',
  robots: 'noindex, follow',
  ...buildCanonicalMetadata('/html-sitemap', baseUrl),
}

export default function HtmlSitemapPage() {
  const topLevel = NAV.filter(
    item => item.href && !['Get Quote', 'Get Free Quote'].includes(item.label)
  )
  const services = NAV.find(item => item.label === 'Services')?.children ?? []
  const locations = NAV.find(item => item.label === 'Locations')?.children ?? []

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title="Sitemap"
        description="Browse every page on our site by category"
        color="slate"
      />

      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16">

        <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Explore the sitemap</h2>
        <p className="mb-8 text-gray-600">
          Browse all pages on our site. For search engines, see{' '}
          <Link href="/sitemap.xml" className="text-red-700 underline">
            XML sitemap
          </Link>{' '}
          for crawling.
        </p>

        <nav aria-labelledby="top-pages-heading" className="mb-10">
          <h2 id="top-pages-heading" className="mb-3 text-xl font-semibold text-gray-900">
            Top pages
          </h2>
          <ul className="list-disc space-y-1 pl-6 text-gray-700">
            {topLevel.map(item => (
              <li key={item.label}>
                <Link href={item.href!} className="text-red-700 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="text-red-700 hover:underline">
                Get Quote
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="services-heading" className="mb-10">
          <h2 id="services-heading" className="mb-3 text-xl font-semibold text-gray-900">
            Services
          </h2>
          <ul className="list-disc space-y-1 pl-6 text-gray-700">
            {services.map(service => (
              <li key={service.href}>
                <Link href={service.href!} className="text-red-700 hover:underline">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="locations-heading">
          <h2 id="locations-heading" className="mb-3 text-xl font-semibold text-gray-900">
            Locations
          </h2>
          <ul className="list-disc space-y-1 pl-6 text-gray-700">
            {locations.map(location => (
              <li key={location.href}>
                <Link href={location.href!} className="text-red-700 hover:underline">
                  {location.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  )
}
