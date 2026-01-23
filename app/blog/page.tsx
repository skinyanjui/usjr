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
        <div className="bg-card border-border border-b relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary text-[10px] font-bold tracking-widest uppercase mb-3 inline-block bg-primary/10 px-2 py-0.5 rounded-full">
                Featured
              </span>
              <h1 className="text-foreground mt-1 text-3xl leading-tight font-bold tracking-tight lg:text-4xl mb-4 font-[family-name:var(--font-playfair)]">
                <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                  {featuredPost.title}
                </Link>
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto mb-6 line-clamp-2">
                {featuredPost.excerpt}
              </p>
              <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-4 text-xs mb-6">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-medium">{featuredPost.author}</span>
                </div>
                <div className="h-1 w-1 bg-border rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="h-1 w-1 bg-border rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-semibold transition-all hover:bg-primary/90 shadow-sm"
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
                      <span className="text-primary text-[10px] font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mb-4 text-muted-foreground text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
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
                        className="text-primary font-semibold flex items-center gap-1 hover:underline text-xs"
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
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-foreground text-xl font-bold tracking-tight">All Articles</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map(post => (
              <article
                key={post.slug}
                className="group border-border bg-card hover:border-foreground/20 overflow-hidden rounded-lg border transition-all hover:bg-muted/30 flex flex-col"
              >
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-base font-bold transition-colors leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <span className="text-foreground text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="w-3 h-3" />
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
