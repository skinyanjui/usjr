'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV } from '@/lib/nav'
import { useMemo } from 'react'

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://unclesamjunkremoval.com'
}

function labelForPath(path: string, defaultLabel: string): string {
  // Exact match from NAV
  for (const item of NAV) {
    if (item.href === path) return item.label
    if (item.children) {
      for (const child of item.children) {
        if (child.href === path) return child.label
      }
    }
  }

  // Fallbacks for known sections
  if (path === '/services') return 'Services'
  if (path === '/blog') return 'Blog'
  if (path === '/faq') return 'FAQ'
  if (path === '/quote') return 'Get Free Quote'
  if (path === '/privacy') return 'Privacy Policy'
  if (path === '/terms') return 'Terms of Service'

  // If the last segment matches a NAV child, use its label
  const last = path.split('/').filter(Boolean).pop() || defaultLabel
  const humanized = last.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return humanized
}

export function BreadcrumbsAuto() {
  const pathname = usePathname() || '/'

  const crumbs = useMemo(() => {
    if (pathname === '/') return [] as Array<{ name: string; href: string }>
    const segments = pathname.split('/').filter(Boolean)
    const acc: Array<{ name: string; href: string }> = []
    let running = ''
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i] ?? ''
      running += `/${segment}`

      // Skip adding a non-existent index for certain sections (e.g., /locations has no index page)
      if (segment === 'locations' && i < segments.length - 1) {
        // Only add the final location crumb later
        continue
      }

      const name = labelForPath(running, segment)
      acc.push({ name, href: running })
    }

    // If we skipped locations parent, ensure we still add the final crumb label based on NAV
    if ((segments[0] ?? '') === 'locations' && acc.length === 0) {
      const full = `/${segments.join('/')}`
      const last = segments[segments.length - 1] ?? ''
      const name = labelForPath(full, last)
      acc.push({ name, href: full })
    }

    return acc
  }, [pathname])

  if (!crumbs.length) return null

  const base = getBaseUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: { '@id': `${base}/` } },
      ...crumbs.map((c, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: c.name,
        item: { '@id': `${base}${c.href}` },
      })),
    ],
  }

  return (
    <nav aria-label="Breadcrumb" className="border-border bg-muted/30 sticky top-0 z-40 border-b">
      <div className="mx-auto max-w-7xl px-4 py-2 text-sm">
        <ol className="text-muted-foreground flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-gray-900 hover:underline">
              Home
            </Link>
          </li>
          {crumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {index === crumbs.length - 1 ? (
                <span aria-current="page" className="text-foreground font-medium">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-gray-900 hover:underline">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  )
}
