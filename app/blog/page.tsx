import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { buildCanonicalMetadata } from '@/components/canonical'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Cleaning & Junk Removal Blog | Tips & Guides | Uncle Sam Junk Removal',
  description:
    'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners. Natural cleaning solutions and professional insights.',
  keywords:
    'cleaning tips, junk removal guides, natural cleaning, Evansville home improvement, eco-friendly cleaning, decluttering advice',
  openGraph: {
    title: 'Cleaning & Junk Removal Blog | Uncle Sam Junk Removal',
    description:
      'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.',
    url: `${baseUrl}/blog`,
    siteName: 'Uncle Sam Junk Removal',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cleaning & Junk Removal Blog | Uncle Sam Junk Removal',
    description:
      'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.',
  },
  ...buildCanonicalMetadata('/blog', baseUrl),
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  featured?: boolean
  image?: string
}

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      slug: 'evansville-junk-removal-tips',
      title: 'Essential Junk Removal Tips for Evansville Residents',
      excerpt:
        'Local expert tips for efficient, cost-effective junk removal in Evansville, IN. From preparation to disposal, make your cleanout a success.',
      author: 'Uncle Sam Team',
      date: 'January 28, 2025',
      readTime: '8 min read',
      category: 'Local Guide',
      featured: true,
    },
    {
      slug: 'spring-cleaning-checklist-southern-indiana',
      title: 'Ultimate Spring Cleaning Checklist for Southern Indiana Homes',
      excerpt:
        'Complete spring cleaning guide for Southern Indiana residents. Room-by-room checklist, eco-friendly tips, and professional cleaning services.',
      author: 'Sarah Johnson',
      date: 'March 1, 2024',
      readTime: '12 min read',
      category: 'Spring Cleaning',
      featured: true,
    },
    {
      slug: 'appliance-disposal-recycling-guide',
      title: 'Appliance Disposal & Recycling Guide for Evansville Residents',
      excerpt:
        'Learn how to properly dispose of old appliances in Evansville, IN. Recycling options, environmental benefits, and professional removal services.',
      author: 'Mike Thompson',
      date: 'November 20, 2024',
      readTime: '10 min read',
      category: 'Appliance Disposal',
    },
    {
      slug: 'junk-removal-cost-tri-state',
      title: 'How much does junk removal cost in the Tri-State? (full breakdown)',
      excerpt:
        'Complete pricing guide for junk removal services in Evansville, Henderson, and surrounding areas. Learn what factors affect cost and how to get the best value.',
      author: 'Uncle Sam Team',
      date: 'January 15, 2025',
      readTime: '8 min read',
      category: 'Pricing Guide',
    },
    {
      slug: 'estate-cleanout-guide',
      title: 'Estate cleanout guide: compassionate planning and donation options',
      excerpt:
        'A step-by-step guide to planning an estate cleanout with sensitivity, including donation and recycling strategies.',
      author: 'Uncle Sam Team',
      date: 'January 24, 2025',
      readTime: '9 min read',
      category: 'Estate Cleanouts',
    },
    {
      slug: 'mattress-disposal-evansville',
      title: 'Mattress disposal in Evansville: recycling, costs, and pickup options',
      excerpt:
        'What to do with an old mattress in Evansville. Recycling programs, professional pickup, and cost ranges to expect.',
      author: 'Uncle Sam Team',
      date: 'January 20, 2025',
      readTime: '6 min read',
      category: 'Mattress Removal',
    },
    {
      slug: 'shed-removal-guide-evansville',
      title: 'Shed removal in Evansville: permit tips, pricing, and timeline',
      excerpt:
        "From permits to pricing, here's how to plan a smooth shed removal in Evansville, including timeline expectations.",
      author: 'Uncle Sam Team',
      date: 'January 22, 2025',
      readTime: '7 min read',
      category: 'Light Demolition',
    },
    {
      slug: 'yard-waste-disposal-evansville',
      title: 'Yard waste disposal in Evansville: composting and pickup basics',
      excerpt:
        'Brush, leaves, and limbs: the simplest, most eco-friendly ways to handle yard waste in Evansville.',
      author: 'Uncle Sam Team',
      date: 'January 26, 2025',
      readTime: '6 min read',
      category: 'Yard Waste',
    },
    {
      slug: 'evansville-garage-cleanout-48-hours',
      title: 'Evansville garage cleanout in 48 hours: checklist & timeline',
      excerpt:
        'Step-by-step guide to completely clean out your garage in just 48 hours. Includes sorting strategies, disposal options, and organization tips.',
      author: 'Uncle Sam Team',
      date: 'January 12, 2025',
      readTime: '6 min read',
      category: 'How-To Guide',
    },
    {
      slug: 'hot-tub-removal-what-to-know',
      title: 'Hot tub removal: what to know before we arrive',
      excerpt:
        'Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options.',
      author: 'Uncle Sam Team',
      date: 'January 8, 2025',
      readTime: '5 min read',
      category: 'Service Guide',
    },
    {
      slug: 'property-manager-turnover-playbook',
      title: 'Property manager turnover playbook: trash-out to broom clean',
      excerpt:
        'Complete guide for property managers handling tenant turnovers. From initial assessment to final cleanup, streamline your process.',
      author: 'Uncle Sam Team',
      date: 'January 6, 2025',
      readTime: '10 min read',
      category: 'Property Management',
    },
  ]

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Uncle Sam Junk Removal Blog',
    description:
      'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.',
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Uncle Sam Junk Removal',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon-512.png`,
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Junk Removal Insights & Guides
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Expert tips, local guides, and professional insights to help you tackle any cleanup
              project with confidence
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Featured Articles</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredPosts.map(post => (
                <article
                  key={post.slug}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 p-8 text-white">
                    <div className="mb-4">
                      <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="mb-3 text-2xl leading-tight font-bold transition-transform group-hover:translate-x-1">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mb-4 text-white/90">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                      <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 font-semibold text-red-600 transition-colors hover:text-red-700"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">All Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map(post => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-red-200 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-semibold tracking-wide text-red-600 uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-red-600">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mb-4 text-gray-600">{post.excerpt}</p>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Need Junk Removal Help?
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              Get expert junk removal service for your home or business. Free quotes, same-day
              service available.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-red-700"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-red-600 bg-transparent px-8 py-4 text-lg font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
