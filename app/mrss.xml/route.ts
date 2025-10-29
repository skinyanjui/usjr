import { getSortedPosts, parsePostDate } from '@/lib/blog-posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
  const posts = getSortedPosts()
  const buildDate = new Date().toUTCString()

  // Build mRSS feed with Media RSS namespace
  const rssItems = posts
    .map(post => {
      const postUrl = `${baseUrl}/blog/${post.slug}`
      const pubDate = parsePostDate(post.date).toUTCString()
      const imageUrl = post.image || `${baseUrl}/icon-512.png`

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <author>${post.author}</author>
      <pubDate>${pubDate}</pubDate>
      <media:content url="${imageUrl}" medium="image" type="image/png">
        <media:title type="html">${post.title}</media:title>
        <media:description type="html">${post.excerpt}</media:description>
      </media:content>
      <media:thumbnail url="${imageUrl}" />
    </item>`
    })
    .join('\n')

  const mrss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Uncle Sam Junk Removal Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.</description>
    <language>en-us</language>
    <copyright>All rights reserved ${new Date().getFullYear()}, Uncle Sam Junk Removal</copyright>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <image>
      <url>${baseUrl}/icon-512.png</url>
      <title>Uncle Sam Junk Removal Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
    <atom:link href="${baseUrl}/mrss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`

  return new NextResponse(mrss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
