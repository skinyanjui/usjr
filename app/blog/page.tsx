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
  const featuredPost = featuredPosts[0]

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

      {/* Two-Column Hero Section with Featured Post */}
      {featuredPost && (
        <div className="bg-card border-border border-b">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              {/* Left: Featured Image */}
              <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl">
                <div className="from-primary/20 to-accent/20 absolute inset-0 bg-gradient-to-br" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <span className="bg-primary/10 text-primary inline-block rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Blog Preview */}
              <div className="space-y-6">
                <div>
                  <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                    Featured Article
                  </span>
                  <h1 className="text-foreground mt-3 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                    {featuredPost.title}
                  </h1>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all hover:brightness-110"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <div className="bg-gray-900 p-8 text-white">
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
                      className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-semibold underline-offset-2 transition-all hover:underline"
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
                    <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-bold transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-4 text-sm">
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
                    className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-semibold underline-offset-2 transition-all hover:underline"
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
                className="bg-foreground text-background inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold transition-all hover:brightness-110"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="border-border text-foreground hover:bg-accent inline-flex items-center justify-center rounded-lg border-2 bg-transparent px-6 py-2.5 text-base font-semibold transition-all"
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
