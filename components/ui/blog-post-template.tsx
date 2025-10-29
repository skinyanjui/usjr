'use client'

import type React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Share2, ArrowLeft, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { settings } from '@/lib/cms-content'
import Script from 'next/script'

// Helper function to add visual breaks in content
export function addContentBreaks() {
  return (
    <div className="my-12 flex items-center justify-center">
      <div className="h-px w-32 bg-gray-300"></div>
    </div>
  )
}

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
}

export function BlogPostTemplate({ meta, children, relatedPosts }: BlogPostTemplateProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: meta.title,
          text: meta.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    }
  }

  return (
    <article className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white dark:bg-blue-950">
        <div className="mx-auto max-w-4xl px-6 py-6 md:px-4 md:py-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-4">
            <span className="bg-card/20 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <Tag className="h-3.5 w-3.5" />
              {meta.category}
            </span>
          </div>

          <h1 className="mb-4 text-2xl leading-tight font-bold sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
            {meta.title}
          </h1>

          <p className="mb-6 text-base leading-relaxed text-white/90 sm:text-lg md:mb-8 md:text-xl">
            {meta.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{meta.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time>{meta.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{meta.readTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="bg-card/10 hover:bg-card/20 ml-auto flex items-center gap-2 rounded-lg px-3 py-1.5 backdrop-blur-sm transition-colors"
              aria-label="Share article"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-10 md:px-4 md:py-16">
        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-3xl prose-h2:leading-tight prose-h2:scroll-mt-20 prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-2xl prose-h3:leading-snug prose-h3:scroll-mt-20 prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-xl prose-h4:scroll-mt-20 prose-p:mb-6 prose-p:leading-relaxed prose-p:text-base prose-a:font-medium prose-a:text-blue-800 dark:prose-a:text-blue-400 prose-a:no-underline prose-a:transition-colors hover:prose-a:underline hover:prose-a:text-blue-900 dark:hover:prose-a:text-blue-300 prose-strong:font-semibold prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-2 prose-li:pl-2 prose-li:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-blue-700 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic prose-code:rounded prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 mx-auto max-w-3xl">
          <style jsx global>{`
            /* Enhanced callout boxes */
            .prose .my-6.rounded-lg,
            .prose .my-8.rounded-lg {
              box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
              margin-top: 2rem;
              margin-bottom: 2rem;
            }

            /* Better list spacing within callout boxes */
            .prose .rounded-lg ul {
              margin-top: 0.75rem;
              margin-bottom: 0;
            }

            .prose .rounded-lg ul li {
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
            }

            /* Better ol styling within callout boxes */
            .prose .rounded-lg ol {
              margin-top: 0.75rem;
              margin-bottom: 0;
            }

            .prose .rounded-lg ol li {
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
            }

            /* Smooth scroll behavior for anchor links */
            html {
              scroll-behavior: smooth;
            }

            /* Better table styling if any */
            .prose table {
              border-collapse: collapse;
              width: 100%;
              margin: 2rem 0;
            }

            .prose th {
              background-color: #f9fafb;
              font-weight: 600;
              text-align: left;
              padding: 0.75rem 1rem;
              border-bottom: 2px solid #e5e7eb;
            }

            .prose td {
              padding: 0.75rem 1rem;
              border-bottom: 1px solid #e5e7eb;
            }

            /* Mobile-specific improvements */
            @media (max-width: 640px) {
              .prose h2 {
                font-size: 1.75rem;
                margin-top: 3rem;
              }

              .prose h3 {
                font-size: 1.375rem;
              }

              .prose h4 {
                font-size: 1.125rem;
              }

              .prose p {
                font-size: 1rem;
                line-height: 1.75;
              }

              .prose ul,
              .prose ol {
                padding-left: 1.25rem;
              }

              .prose .my-6.rounded-lg,
              .prose .my-8.rounded-lg {
                padding: 1.25rem;
                margin-left: -0.5rem;
                margin-right: -0.5rem;
                border-radius: 0.5rem;
              }
            }

            /* Improve readability on all screens */
            .prose {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            /* Better focus states for accessibility */
            .prose a:focus-visible {
              outline: 2px solid #dc2626;
              outline-offset: 2px;
              border-radius: 2px;
            }
          `}</style>
          {children}
        </div>

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="border-border mt-12 border-t pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-foreground text-sm font-semibold">Tags:</span>
              {meta.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl bg-blue-50 p-8 md:p-10 dark:bg-blue-950/30">
          <h2 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
            Need Professional Help?
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Our experienced team is ready to help with your junk removal project. Get your free
            quote today!
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-blue-800 px-6 py-2.5 text-base font-semibold text-white hover:bg-blue-900"
            >
              <a href={`tel:${settings.phoneE164}`}>📞 Call {settings.phone}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-blue-800 bg-transparent px-6 py-2.5 text-base font-semibold text-blue-800 hover:bg-blue-800 hover:text-white"
            >
              <Link href="/quote">Get Free Quote</Link>
            </Button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-foreground mb-8 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map(post => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group border-border bg-card rounded-xl border p-6 shadow-sm transition-all hover:border-blue-800 hover:shadow-md dark:hover:border-blue-400"
                >
                  <div className="mb-2">
                    <span className="text-xs font-semibold tracking-wide text-blue-800 uppercase dark:text-blue-400">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-bold group-hover:text-blue-800 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
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
              '@id': typeof window !== 'undefined' ? window.location.href : '',
            },
            keywords: meta.tags?.join(', ') || meta.category,
            articleSection: meta.category,
          }),
        }}
      />
    </article>
  )
}
