'use client'

import type React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, Share2, ArrowLeft, Tag } from 'lucide-react'
import Script from 'next/script'
import { blogPosts } from '@/lib/blog-posts'

export interface BlogPostMeta {
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  tags?: string[]
}

export interface BlogPostTemplateProps {
  meta: BlogPostMeta
  children: React.ReactNode
  relatedPosts?: Array<{
    title: string
    href: string
    excerpt: string
    category: string
  }>
  canonicalUrl?: string
}

export function BlogPostTemplate({
  meta,
  children,
  relatedPosts,
  canonicalUrl,
}: BlogPostTemplateProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: meta.title,
          text: meta.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Share cancelled')
        }
      }
    }
  }

  return (
    <article className="bg-background min-h-screen">
      {/* Linear-inspired header */}
      <header className="border-border/50 bg-background/80 border-b backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Compact hero section - Linear-style */}
      <div className="border-border/30 border-b">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* Category badge */}
          <div className="mb-4">
            <span className="bg-muted/50 text-foreground border-border/50 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide">
              <Tag className="text-muted-foreground h-3 w-3" />
              {meta.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-foreground mb-3 text-[24px] leading-tight font-semibold tracking-tight sm:text-[28px] lg:text-[32px]">
            {meta.title}
          </h1>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed sm:text-base">
            {meta.excerpt}
          </p>

          {/* Meta information */}
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5" />
              <span className="font-medium">{meta.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <time>{meta.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>{meta.readTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground ml-auto flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
              aria-label="Share article"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image - Looked up dynamically */}
      {(() => {
        const post = blogPosts.find(p => p.title === meta.title)
        return post?.image ? (
          <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="border-border/50 bg-muted/30 relative aspect-[2/1] w-full overflow-hidden rounded-xl border shadow-sm">
              <Image
                src={post.image}
                alt={meta.title}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </div>
        ) : null
      })()}

      {/* Main content with Linear-inspired typography */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="blog-content">
          <style jsx global>{`
            /* Linear-inspired blog content styles */
            .blog-content {
              font-size: 15px;
              line-height: 1.7;
              color: hsl(var(--foreground));
            }

            .blog-content > * + * {
              margin-top: 1.5em;
            }

            .blog-content h2 {
              margin-top: 2.5em;
              margin-bottom: 0.75em;
              font-size: 24px;
              font-weight: 600;
              line-height: 1.3;
              letter-spacing: -0.01em;
              color: hsl(var(--foreground));
              scroll-margin-top: 80px;
            }

            .blog-content h3 {
              margin-top: 2em;
              margin-bottom: 0.625em;
              font-size: 20px;
              font-weight: 600;
              line-height: 1.4;
              color: hsl(var(--foreground));
              scroll-margin-top: 80px;
            }

            .blog-content h4 {
              margin-top: 1.75em;
              margin-bottom: 0.5em;
              font-size: 17px;
              font-weight: 600;
              line-height: 1.4;
              color: hsl(var(--foreground));
            }

            .blog-content p {
              margin-bottom: 1.25em;
              font-size: 15px;
              line-height: 1.7;
              color: hsl(var(--foreground));
            }

            .blog-content a {
              color: rgb(30, 58, 138);
              text-decoration: none;
              font-weight: 500;
              transition: color 0.15s ease;
            }

            .blog-content a:hover {
              color: rgb(30, 64, 175);
              text-decoration: underline;
            }

            .dark .blog-content a {
              color: rgb(96, 165, 250);
            }

            .dark .blog-content a:hover {
              color: rgb(147, 197, 253);
            }

            .blog-content strong {
              font-weight: 600;
              color: hsl(var(--foreground));
            }

            .blog-content ul,
            .blog-content ol {
              margin: 1.5em 0;
              padding-left: 1.75em;
            }

            .blog-content ul {
              list-style-type: disc;
            }

            .blog-content ol {
              list-style-type: decimal;
            }

            .blog-content li {
              margin: 0.5em 0;
              padding-left: 0.375em;
              line-height: 1.7;
            }

            .blog-content li > p {
              margin: 0.375em 0;
            }

            .blog-content blockquote {
              margin: 2em 0;
              padding: 1.25em 1.5em;
              border-left: 3px solid rgb(30, 58, 138);
              background: rgb(239, 246, 255);
              border-radius: 0.5em;
              font-style: normal;
            }

            .dark .blog-content blockquote {
              border-left-color: rgb(30, 64, 175);
              background: rgba(30, 58, 138, 0.1);
            }

            .blog-content code {
              padding: 0.2em 0.4em;
              background: rgb(243, 244, 246);
              border-radius: 0.375em;
              font-size: 0.9em;
              font-family: ui-monospace, monospace;
            }

            .dark .blog-content code {
              background: rgb(31, 41, 55);
            }

            .blog-content pre {
              margin: 2em 0;
              padding: 1.25em;
              background: rgb(17, 24, 39);
              border-radius: 0.5em;
              overflow-x: auto;
              font-size: 14px;
              line-height: 1.6;
            }

            .blog-content pre code {
              padding: 0;
              background: transparent;
              color: rgb(243, 244, 246);
            }

            /* Linear-style callout boxes */
            .blog-content .callout {
              margin: 2em 0;
              padding: 1.25em 1.5em;
              background: rgba(255, 255, 255, 0.5);
              border: 1px solid rgba(0, 0, 0, 0.08);
              border-radius: 0.75em;
              box-shadow:
                0 1px 2px rgba(0, 0, 0, 0.04),
                0 0 0 1px rgba(0, 0, 0, 0.02);
            }

            .dark .blog-content .callout {
              background: rgba(255, 255, 255, 0.04);
              border: 1px solid rgba(255, 255, 255, 0.08);
              box-shadow:
                0 1px 2px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.04);
            }

            .blog-content img {
              margin: 2em 0;
              border-radius: 0.5em;
              max-width: 100%;
              height: auto;
            }

            .blog-content table {
              width: 100%;
              margin: 2em 0;
              border-collapse: collapse;
              font-size: 14px;
            }

            .blog-content th {
              padding: 0.75em 1em;
              text-align: left;
              font-weight: 600;
              border-bottom: 2px solid rgba(0, 0, 0, 0.1);
              background: rgba(0, 0, 0, 0.02);
            }

            .dark .blog-content th {
              border-bottom-color: rgba(255, 255, 255, 0.1);
              background: rgba(255, 255, 255, 0.04);
            }

            .blog-content td {
              padding: 0.75em 1em;
              border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            }

            .dark .blog-content td {
              border-bottom-color: rgba(255, 255, 255, 0.06);
            }

            @media (max-width: 640px) {
              .blog-content {
                font-size: 14px;
              }

              .blog-content h2 {
                font-size: 20px;
              }

              .blog-content h3 {
                font-size: 18px;
              }

              .blog-content h4 {
                font-size: 16px;
              }
            }
          `}</style>
          {children}
        </div>

        {/* Tags section */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="border-border/50 mt-12 border-t pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-foreground mr-2 text-xs font-semibold tracking-wider uppercase">
                Tags:
              </span>
              {meta.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground hover:border-border rounded-md border border-transparent px-2.5 py-1 text-xs font-medium transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related posts with Linear-style cards */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-foreground mb-6 text-[20px] font-semibold">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map(post => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group border-border bg-card hover:border-foreground/20 hover:bg-muted/30 block rounded-lg border p-6 transition-all"
                >
                  <div className="mb-2">
                    <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-base leading-snug font-bold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Article Schema */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: meta.title,
            description: meta.excerpt,
            author: {
              '@type': 'Person',
              name: meta.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Uncle Sam Junk Removal',
              logo: {
                '@type': 'ImageObject',
                url: 'https://unclesamjunkremoval.com/icon-512.png',
              },
            },
            datePublished: new Date(meta.date).toISOString(),
            dateModified: new Date(meta.date).toISOString(),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl || '',
            },
            keywords: meta.tags?.join(', ') || meta.category,
            articleSection: meta.category,
          }),
        }}
      />
    </article>
  )
}
