'use client'

import { useState, useRef, useEffect } from 'react'
import { Button, PhoneButton } from '@/components/ui/button'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { settings } from '@/lib/cms-content'
import { trackQuoteClick } from '@/lib/quoteTracking'
import { NAV } from '@/lib/nav'

const ServicesDropdown = dynamic(() => import('./header-services-dropdown'), { ssr: false })
const LocationsDropdown = dynamic(() => import('./header-locations-dropdown'), { ssr: false })

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const servicesMenuId = 'services-menu'
  const locationsMenuId = 'locations-menu'

  const handleDropdownEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveDropdown(dropdown)

    // Prefetch dropdown routes eagerly when menu is opened
    const items =
      NAV.find(i => i.label === (dropdown === 'services' ? 'Services' : 'Locations'))?.children ??
      []
    for (const item of items) {
      if (item.href) {
        try {
          router.prefetch(item.href)
        } catch {}
      }
    }
  }

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeMobileMenuAndSections = () => {
    setIsMenuOpen(false)
    setIsMobileServicesOpen(false)
    setIsMobileLocationsOpen(false)
  }

  return (
    <header className="glass sticky top-0 z-50">
      <nav className="border-b border-white/20 bg-white/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center">
          {/* Logo */}
          <div className="col-span-2 flex min-w-0 items-end text-center lg:col-span-1">
            <Link
              href="/"
              className="max-w-full truncate rounded-lg bg-red-600 px-3 py-2 text-xs font-bold whitespace-nowrap text-white transition-colors hover:bg-red-700 md:text-base"
            >
              UNCLE SAM JUNK REMOVAL
            </Link>
          </div>

          {/* Centered desktop nav */}
          <div className="hidden items-center justify-center space-x-6 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600 hover:underline"
            >
              HOME
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600 hover:underline"
            >
              ABOUT
            </Link>

            <div
              className="group relative"
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-red-600 hover:underline"
                aria-haspopup="menu"
                aria-expanded={activeDropdown === 'services'}
                aria-controls={servicesMenuId}
                onClick={() => setActiveDropdown(prev => (prev === 'services' ? null : 'services'))}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveDropdown(prev => (prev === 'services' ? null : 'services'))
                  }
                }}
              >
                SERVICES
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
              {activeDropdown === 'services' && (
                <ServicesDropdown
                  servicesMenuId={servicesMenuId}
                  onMouseEnter={() => handleDropdownEnter('services')}
                  onMouseLeave={handleDropdownLeave}
                />
              )}
            </div>

            <div
              className="group relative"
              onMouseEnter={() => handleDropdownEnter('locations')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-red-600 hover:underline"
                aria-haspopup="menu"
                aria-expanded={activeDropdown === 'locations'}
                aria-controls={locationsMenuId}
                onClick={() =>
                  setActiveDropdown(prev => (prev === 'locations' ? null : 'locations'))
                }
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveDropdown(prev => (prev === 'locations' ? null : 'locations'))
                  }
                }}
              >
                LOCATIONS
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </button>
              {activeDropdown === 'locations' && (
                <LocationsDropdown
                  locationsMenuId={locationsMenuId}
                  onMouseEnter={() => handleDropdownEnter('locations')}
                  onMouseLeave={handleDropdownLeave}
                />
              )}
            </div>

            <Link
              href="/blog"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600 hover:underline"
            >
              BLOG
            </Link>

            <Link
              href="/faq"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600 hover:underline"
            >
              FAQ
            </Link>

            {/* Price Match link removed */}
          </div>

          {/* Right desktop actions */}
          <div className="ml-4 hidden items-center justify-end gap-4 pl-4 lg:flex">
            <div className="text-center">
              <PhoneButton
                href={`tel:${settings.phoneE164}`}
                size="xs"
                className="bg-transparent text-black ring-1 ring-gray-300 hover:bg-red-700/10"
              >
                <Phone className="h-3 w-3" /> {settings.phone}
              </PhoneButton>
              <div className="mt-0 text-xs">
                <a href={`sms:${settings.phoneE164}`} className="text-black hover:text-red-600">
                  Text photos for quote
                </a>
              </div>
            </div>
            <Button
              asChild
              size="xs"
              className="rounded-full bg-red-600 font-semibold text-white hover:bg-red-700"
            >
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
              >
                Get Free Quote
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="justify-self-end lg:hidden"
            onClick={() =>
              setIsMenuOpen(prev => {
                const next = !prev
                if (!next) {
                  setIsMobileServicesOpen(false)
                  setIsMobileLocationsOpen(false)
                }
                return next
              })
            }
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-nav"
            className="mt-4 max-h-[70vh] overflow-y-auto border-t border-gray-200 pb-4 lg:hidden"
          >
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                href="/"
                className="py-2 text-sm font-medium text-gray-700 hover:text-red-600"
                onClick={closeMobileMenuAndSections}
              >
                HOME
              </Link>
              <Link
                href="/about"
                className="py-2 text-sm font-medium text-gray-700 hover:text-red-600"
                onClick={closeMobileMenuAndSections}
              >
                ABOUT
              </Link>

              <div className="pt-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700"
                  aria-expanded={isMobileServicesOpen}
                  aria-controls="mobile-services-panel"
                  onClick={() => setIsMobileServicesOpen(v => !v)}
                >
                  <span>SERVICES</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isMobileServicesOpen && (
                  <div id="mobile-services-panel" className="pl-3">
                    {(NAV.find(i => i.label === 'Services')?.children ?? []).map(item => (
                      <Link
                        key={item.href}
                        href={item.href!}
                        className="block py-1.5 text-sm font-medium text-gray-700 hover:text-red-600"
                        onClick={closeMobileMenuAndSections}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700"
                  aria-expanded={isMobileLocationsOpen}
                  aria-controls="mobile-locations-panel"
                  onClick={() => setIsMobileLocationsOpen(v => !v)}
                >
                  <span>LOCATIONS</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isMobileLocationsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isMobileLocationsOpen && (
                  <div id="mobile-locations-panel" className="pl-3">
                    {(NAV.find(i => i.label === 'Locations')?.children ?? []).map(item => (
                      <Link
                        key={item.href}
                        href={item.href!}
                        className="block py-1.5 text-sm font-medium text-gray-700 hover:text-red-600"
                        onClick={closeMobileMenuAndSections}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                className="py-2 text-sm font-medium text-gray-700 hover:text-red-600"
                onClick={closeMobileMenuAndSections}
              >
                BLOG
              </Link>
              <Link
                href="/faq"
                className="py-2 text-sm font-medium text-gray-700 hover:text-red-600"
                onClick={closeMobileMenuAndSections}
              >
                FAQ
              </Link>
              <div className="pt-4">
                <Button asChild size="sm" className="w-full bg-red-600 text-white hover:bg-red-700">
                  <Link
                    href="/quote"
                    prefetch
                    onClick={() => {
                      trackQuoteClick({
                        location: 'header-mobile',
                        label: 'Get Free Quote',
                        destination: '/quote',
                      })
                      closeMobileMenuAndSections()
                    }}
                  >
                    Get Free Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
