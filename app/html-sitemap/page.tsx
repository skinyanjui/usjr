import Link from 'next/link'
import { NAV } from '@/lib/nav'
import { PageHero } from '@/components/ui/page-hero'
import type { Metadata } from 'next'
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
  const topLevel = NAV.filter(i => i.href && !['Get Quote', 'Get Free Quote'].includes(i.label))
  const services = NAV.find(i => i.label === 'Services')?.children ?? []
  const locations = NAV.find(i => i.label === 'Locations')?.children ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Sitemap"
        description="Browse all pages on our site"
        align="center"
      />
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16">
        <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Sitemap</h1>
        <p className="mb-8 text-gray-600">
          Browse all pages on our site. For search engines, see{' '}
          <Link href="/sitemap.xml" className="text-red-700 underline">
            the XML sitemap
          </Link>
          .
        </p>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">Top Pages</h2>
          <ul className="list-disc space-y-1 pl-6">
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
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">Services</h2>
          <ul className="list-disc space-y-1 pl-6">
            {services.map(s => (
              <li key={s.href}>
                <Link href={s.href!} className="text-red-700 hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Locations</h2>
          <ul className="list-disc space-y-1 pl-6">
            {locations.map(l => (
              <li key={l.href}>
                <Link href={l.href!} className="text-red-700 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
