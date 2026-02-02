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

      {/* Featured Header - Compact */}
      {featuredPost && (
        <div className="bg-card border-border relative overflow-hidden border-b">
          <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-primary bg-primary/10 mb-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                Featured
              </span>
              <h1 className="text-foreground mt-1 mb-4 font-[family-name:var(--font-playfair)] text-3xl leading-tight font-bold tracking-tight lg:text-4xl">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {featuredPost.title}
                </Link>
              </h1>
              <p className="text-muted-foreground mx-auto mb-6 line-clamp-2 max-w-xl text-base leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="text-muted-foreground mb-6 flex flex-wrap items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-medium">{featuredPost.author}</span>
                </div>
                <div className="bg-border h-1 w-1 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="bg-border h-1 w-1 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-semibold shadow-sm transition-all"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        {/* Featured Posts List - Compact */}
        {featuredPosts.length > 1 && (
          <section className="mb-10">
            <h2 className="text-foreground mb-5 text-xl font-bold tracking-tight">More Featured</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {featuredPosts.slice(1).map(post => (
                <article
                  key={post.slug}
                  className="group border-border bg-card hover:border-foreground/20 overflow-hidden rounded-lg border transition-all hover:shadow-sm"
                >
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-1 text-lg font-bold tracking-tight transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="text-muted-foreground border-border/50 flex flex-wrap items-center justify-between gap-4 border-t pt-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary flex items-center gap-1 text-xs font-semibold hover:underline"
                      >
                        Read Article
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts Grid - Compact & Uniform */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-foreground text-xl font-bold tracking-tight">All Articles</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map(post => (
              <article
                key={post.slug}
                className="group border-border bg-card hover:border-foreground/20 hover:bg-muted/30 flex flex-col overflow-hidden rounded-lg border transition-all"
              >
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-base leading-snug font-bold transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2 flex-1 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="border-border/50 mt-auto flex items-center justify-between border-t pt-3">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <span className="text-foreground flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
