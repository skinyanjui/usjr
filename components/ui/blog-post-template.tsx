'use client'

import type React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Share2, ArrowLeft, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { settings } from '@/lib/cms-content'

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
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <Tag className="h-3.5 w-3.5" />
              {meta.category}
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {meta.title}
          </h1>

          <p className="mb-8 text-lg text-white/90 md:text-xl">{meta.excerpt}</p>

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
              className="ml-auto flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Share article"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="prose prose-lg prose-gray mx-auto max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-3xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-2xl prose-p:mb-6 prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-6 prose-li:my-2">
          {children}
        </div>

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Tags:</span>
              {meta.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-8 md:p-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
            Need Professional Help?
          </h2>
          <p className="mb-6 text-lg text-gray-700">
            Our experienced team is ready to help with your junk removal project. Get your free
            quote today!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              className="bg-red-600 px-8 py-6 text-lg font-semibold text-white hover:bg-red-700"
            >
              <a href={`tel:${settings.phoneE164}`}>📞 Call {settings.phone}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-red-600 bg-transparent px-8 py-6 text-lg font-semibold text-red-600 hover:bg-red-600 hover:text-white"
            >
              <Link href="/quote">Get Free Quote</Link>
            </Button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map(post => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-red-200 hover:shadow-md"
                >
                  <div className="mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-red-600">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
