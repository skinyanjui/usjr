'use client'

import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import Link from 'next/link'
import { settings } from '@/lib/cms-content'
import { trackQuoteClick } from '@/lib/quoteTracking'
import { NAV } from '@/lib/nav'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-foreground text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            Uncle Sam Junk Removal
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${settings.phoneE164}`}
              className="text-foreground/80 hover:text-foreground flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              <Phone className="h-4 w-4" />
              {settings.phone}
            </a>
            <Link
              href="/quote"
              prefetch
              onClick={() =>
                trackQuoteClick({
                  location: 'header-desktop',
                  label: 'Get Free Quote',
                  destination: '/quote',
                })
              }
              className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Get Free Quote
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-nav" className="border-border mt-4 border-t pt-4 lg:hidden">
            <div className="flex flex-col space-y-1">
              {NAV.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-foreground/80 hover:bg-muted hover:text-foreground block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/quote"
                  prefetch
                  onClick={() => {
                    trackQuoteClick({
                      location: 'header-mobile',
                      label: 'Get Free Quote',
                      destination: '/quote',
                    })
                    closeMenu()
                  }}
                  className="bg-primary text-primary-foreground block w-full rounded-full py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
