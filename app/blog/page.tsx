import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { buildCanonicalMetadata } from '@/components/canonical'
import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-posts'

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

export default function BlogPage() {
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
    <main className="bg-muted/30 min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <div className="bg-blue-900 text-white">
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
            <h2 className="text-foreground mb-8 text-3xl font-bold">Featured Articles</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredPosts.map(post => (
                <article
                  key={post.slug}
                  className="group border-border bg-card overflow-hidden rounded-2xl border shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="bg-blue-800 p-8 text-white">
                    <div className="mb-4">
                      <span className="bg-card/20 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
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
                      className="inline-flex items-center gap-2 font-semibold text-blue-800 transition-colors hover:text-blue-900"
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
          <h2 className="text-foreground mb-8 text-3xl font-bold">All Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map(post => (
              <article
                key={post.slug}
                className="group border-border bg-card hover:border-border overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
              >
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-semibold tracking-wide text-blue-800 uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-foreground mb-3 text-xl font-bold transition-colors group-hover:text-blue-800">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
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
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800 transition-colors hover:text-blue-900"
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
          <div className="bg-muted/30 mx-auto max-w-4xl rounded-2xl p-8 text-center md:p-12">
            <h2 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
              Need Junk Removal Help?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Get expert junk removal service for your home or business. Free quotes, same-day
              service available.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-lg bg-blue-800 px-6 py-2.5 text-base font-semibold text-white transition-colors hover:bg-blue-900"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-blue-800 bg-transparent px-6 py-2.5 text-base font-semibold text-blue-800 transition-colors hover:bg-blue-800 hover:text-white"
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
