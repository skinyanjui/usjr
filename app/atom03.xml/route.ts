import { getSortedPosts, parsePostDate } from '@/lib/blog-posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'
  const posts = getSortedPosts()
  const modified = new Date().toISOString()

  // Build Atom 0.3 feed (legacy format)
  const atomEntries = posts
    .map(post => {
      const postUrl = `${baseUrl}/blog/${post.slug}`
      const issued = parsePostDate(post.date).toISOString()
      const modified = parsePostDate(post.date).toISOString()

      return `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link rel="alternate" type="text/html" href="${postUrl}" />
    <id>${postUrl}</id>
    <issued>${issued}</issued>
    <modified>${modified}</modified>
    <summary type="text/plain">${escapeXml(post.excerpt)}</summary>
    <author>
      <name>${post.author}</name>
    </author>
  </entry>`
    })
    .join('\n')

  const atom03 = `<?xml version="1.0" encoding="UTF-8"?>
<feed version="0.3" xmlns="http://purl.org/atom/ns#">
  <title>Uncle Sam Junk Removal Blog</title>
  <link rel="alternate" type="text/html" href="${baseUrl}/blog" />
  <modified>${modified}</modified>
  <author>
    <name>Uncle Sam Junk Removal</name>
  </author>
  <tagline>Expert cleaning tips, junk removal guides, and home improvement advice for Evansville homeowners.</tagline>
  <copyright>All rights reserved ${new Date().getFullYear()}, Uncle Sam Junk Removal</copyright>
${atomEntries}
</feed>`

  return new NextResponse(atom03, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
