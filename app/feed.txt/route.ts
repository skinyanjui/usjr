import { getSortedPosts } from '@/lib/blog-posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
  const posts = getSortedPosts()

  // Build plain text feed
  let textFeed = `UNCLE SAM JUNK REMOVAL BLOG
${baseUrl}/blog

Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.

Last Updated: ${new Date().toUTCString()}

================================================================================

`

  posts.forEach((post, index) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`

    textFeed += `${index + 1}. ${post.title}

   Category: ${post.category}
   Author: ${post.author}
   Date: ${post.date}
   Read Time: ${post.readTime}

   ${post.excerpt}

   Read more: ${postUrl}

================================================================================

`
  })

  textFeed += `
Total Posts: ${posts.length}

Copyright ${new Date().getFullYear()} Uncle Sam Junk Removal. All rights reserved.
`

  return new NextResponse(textFeed, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
