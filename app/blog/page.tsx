import Link from 'next/link'
import Image from 'next/image'
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
        <div className="bg-card border-border border-b relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left: Blog Preview */}
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-4 inline-block">
                    Featured Article
                  </span>
                  <h1 className="text-foreground mt-2 text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h1>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  {featuredPost.excerpt}
                </p>
                <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{featuredPost.author}</span>
                  </div>
                  <div className="h-1 w-1 bg-border rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="h-1 w-1 bg-border rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="bg-foreground text-background inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-all hover:bg-foreground/90"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right: Featured Image */}
              <div className="bg-muted aspect-[4/3] relative overflow-hidden rounded-xl border border-border order-1 lg:order-2">
                {featuredPost.image && (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                )}
                {!featuredPost.image && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">No Image Available</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-background/90 text-foreground backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold border border-border/50 shadow-sm">
                    {featuredPost.category}
                  </span>
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
            <h2 className="text-foreground mb-8 text-3xl font-bold tracking-tight">Featured Articles</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredPosts.map(post => (
                <article
                  key={post.slug}
                  className="group border-border bg-card hover:border-foreground/20 overflow-hidden rounded-xl border transition-all"
                >
                  <div className="bg-muted aspect-[16/9] relative overflow-hidden">
                    {/* Placeholder for image if we had one, or a nice gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="mb-4">
                        <span className="bg-background/80 text-foreground inline-block rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm border border-border/50">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">{post.title}</Link>
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 pt-4">
                    <p className="mb-4 text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section>
          <h2 className="text-foreground mb-8 text-3xl font-bold tracking-tight">All Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map(post => (
              <article
                key={post.slug}
                className="group border-border bg-card hover:border-foreground/20 overflow-hidden rounded-xl border transition-all hover:bg-muted/30"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-primary text-xs font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-3 text-lg font-bold transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
