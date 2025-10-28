import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/page-hero'
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

const SITEMAP_SECTIONS = {
  mainPages: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/quote', label: 'Get Free Quote' },
    { href: '/compare', label: 'Compare Services' },
    { href: '/faq', label: 'FAQ' },
    { href: '/emergency', label: 'Emergency Services' },
  ],
  junkRemovalServices: [
    { href: '/services/junk-removal', label: 'Junk Removal' },
    { href: '/services/appliance-removal', label: 'Appliance Removal' },
    { href: '/services/hot-tub-removal', label: 'Hot Tub Removal' },
    { href: '/services/mattress-removal', label: 'Mattress Removal' },
    { href: '/services/shed-removal', label: 'Shed Removal' },
    { href: '/services/garage-cleanout', label: 'Garage Cleanout' },
    { href: '/services/estate-cleanouts', label: 'Estate Cleanouts' },
    { href: '/services/yard-waste-removal', label: 'Yard Waste Removal' },
    { href: '/services/light-demolition', label: 'Light Demolition' },
  ],
  specializedServices: [
    { href: '/services/property-management-turnovers', label: 'Property Management Turnovers' },
    { href: '/services/storage-unit-cleanouts', label: 'Storage Unit Cleanouts' },
    { href: '/services/office-cleanouts', label: 'Office Cleanouts' },
    { href: '/services/restaurant-equipment-removal', label: 'Restaurant Equipment Removal' },
    { href: '/services/warehouse-fixture-removal', label: 'Warehouse Fixture Removal' },
    { href: '/services/holiday-tree-removal', label: 'Holiday Tree Removal' },
    { href: '/services/storm-debris-cleanup', label: 'Storm Debris Cleanup' },
  ],
  cleaningServices: [
    { href: '/cleaning', label: 'All Cleaning Services' },
    { href: '/cleaning/residential', label: 'Residential Cleaning' },
    { href: '/cleaning/commercial', label: 'Commercial Cleaning' },
    { href: '/cleaning/deep-clean', label: 'Deep Cleaning' },
    { href: '/cleaning/move-in-move-out', label: 'Move-In/Move-Out Cleaning' },
    { href: '/cleaning/recurring', label: 'Recurring Cleaning' },
    { href: '/cleaning/specialty', label: 'Specialty Cleaning' },
  ],
  locations: [
    { href: '/locations/evansville', label: 'Evansville, IN' },
    { href: '/locations/newburgh', label: 'Newburgh, IN' },
    { href: '/locations/henderson-ky', label: 'Henderson, KY' },
    { href: '/locations/owensboro-ky', label: 'Owensboro, KY' },
    { href: '/locations/boonville', label: 'Boonville, IN' },
    { href: '/locations/princeton', label: 'Princeton, IN' },
    { href: '/locations/mount-carmel-il', label: 'Mount Carmel, IL' },
    { href: '/locations/mount-vernon-in', label: 'Mount Vernon, IN' },
    { href: '/locations/new-harmony-in', label: 'New Harmony, IN' },
  ],
  blog: [
    { href: '/blog', label: 'All Blog Posts' },
    { href: '/blog/evansville-junk-removal-tips', label: 'Evansville Junk Removal Tips' },
    {
      href: '/blog/property-manager-turnover-playbook',
      label: 'Property Manager Turnover Playbook',
    },
    {
      href: '/blog/spring-cleaning-checklist-southern-indiana',
      label: 'Spring Cleaning Checklist',
    },
    { href: '/blog/junk-removal-cost-tri-state', label: 'Junk Removal Cost Guide' },
    { href: '/blog/mattress-disposal-evansville', label: 'Mattress Disposal Guide' },
    { href: '/blog/estate-cleanout-guide', label: 'Estate Cleanout Guide' },
    { href: '/blog/appliance-disposal-recycling-guide', label: 'Appliance Disposal Guide' },
    { href: '/blog/yard-waste-disposal-evansville', label: 'Yard Waste Disposal' },
    { href: '/blog/shed-removal-guide-evansville', label: 'Shed Removal Guide' },
    { href: '/blog/hot-tub-removal-what-to-know', label: 'Hot Tub Removal Guide' },
    { href: '/blog/evansville-garage-cleanout-48-hours', label: '48-Hour Garage Cleanout' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

function SitemapSection({
  title,
  links,
}: {
  title: string
  links: Array<{ href: string; label: string }>
}) {
  return (
    <nav aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`} className="mb-8">
      <h2
        id={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
        className="text-foreground mb-3 text-xl font-semibold"
      >
        {title}
      </h2>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {links.map(link => (
          <li key={link.href} className="flex items-start">
            <span className="mr-2 text-red-700">→</span>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-red-700 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function HtmlSitemapPage() {
  return (
    <main className="bg-muted/30 min-h-screen">
      <PageHero
        title="Sitemap"
        description="Browse every page on our site by category"
        color="neutral"
      />

      <div className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Explore Our Website</h2>
          <p className="text-muted-foreground">
            Browse all pages on our site organized by category. For search engines, see our{' '}
            <Link href="/sitemap.xml" className="text-red-700 underline">
              XML sitemap
            </Link>
            .
          </p>
        </div>

        <div className="space-y-10">
          <SitemapSection title="Main Pages" links={SITEMAP_SECTIONS.mainPages} />
          <SitemapSection
            title="Junk Removal Services"
            links={SITEMAP_SECTIONS.junkRemovalServices}
          />
          <SitemapSection
            title="Specialized Services"
            links={SITEMAP_SECTIONS.specializedServices}
          />
          <SitemapSection title="Cleaning Services" links={SITEMAP_SECTIONS.cleaningServices} />
          <SitemapSection title="Service Locations" links={SITEMAP_SECTIONS.locations} />
          <SitemapSection title="Blog & Resources" links={SITEMAP_SECTIONS.blog} />
          <SitemapSection title="Legal" links={SITEMAP_SECTIONS.legal} />
        </div>
      </div>
    </main>
  )
}
