import sitemap from '@/app/sitemap'

import { shouldIncludeInSitemap } from '@/lib/canonicals'

describe('sitemap generation', () => {
  it('omits the legacy HTML sitemap route', () => {
    const entries = sitemap()
    const hasLegacyHtmlSitemap = entries.some(entry => entry.url.endsWith('/html-sitemap'))

    expect(hasLegacyHtmlSitemap).toBe(false)
  })

  it('only includes URLs that pass canonical filtering', () => {
    const entries = sitemap()

    entries.forEach(entry => {
      const pathname = new URL(entry.url).pathname
      expect(shouldIncludeInSitemap(pathname)).toBe(true)
    })
  })
})
