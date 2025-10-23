import { Feed } from 'feed'
import { getSortedPosts, parsePostDate } from '@/lib/blog-posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

  const feed = new Feed({
    title: 'Uncle Sam Junk Removal Blog',
    description:
      'Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.',
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: 'en',
    image: `${baseUrl}/icon-512.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Uncle Sam Junk Removal`,
    updated: new Date(),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
      atom: `${baseUrl}/atom.xml`,
    },
    author: {
      name: 'Uncle Sam Junk Removal',
      link: baseUrl,
    },
  })

  const posts = getSortedPosts()

  posts.forEach(post => {
    const postUrl = `${baseUrl}/blog/${post.slug}`
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      content: post.excerpt,
      author: [
        {
          name: post.author,
        },
      ],
      date: parsePostDate(post.date),
      category: [{ name: post.category }],
    })
  })

  return new NextResponse(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
