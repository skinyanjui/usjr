'use client'

import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { settings } from '@/lib/cms-content'
import { trackQuoteClick } from '@/lib/quoteTracking'
import { NAV } from '@/lib/nav'

const ServicesDropdown = dynamic(() => import('./header-services-dropdown'), { ssr: false })
const LocationsDropdown = dynamic(() => import('./header-locations-dropdown'), { ssr: false })
const CompanyDropdown = dynamic(() => import('./header-company-dropdown'), { ssr: false })

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const servicesMenuId = 'services-menu'
  const locationsMenuId = 'locations-menu'
  const companyMenuId = 'company-menu'

  const servicesButtonId = 'services-button'
  const locationsButtonId = 'locations-button'
  const companyButtonId = 'company-button'

  const handleDropdownEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveDropdown(dropdown)

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
    <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="bg-foreground text-background rounded-lg px-3 py-2 text-xs font-bold transition-opacity hover:opacity-90 sm:text-sm"
          >
            UNCLE SAM JUNK REMOVAL
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                id={servicesButtonId}
                type="button"
                className="hover:text-primary flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors"
                aria-haspopup="menu"
                aria-expanded={activeDropdown === 'services'}
                aria-controls={servicesMenuId}
                onClick={() => setActiveDropdown(prev => (prev === 'services' ? null : 'services'))}
              >
                Services
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {activeDropdown === 'services' && (
                <ServicesDropdown
                  servicesMenuId={servicesMenuId}
                  triggerId={servicesButtonId}
                  onMouseEnter={() => handleDropdownEnter('services')}
                  onMouseLeave={handleDropdownLeave}
                />
              )}
            </div>

            <div className="bg-border h-4 w-px" aria-hidden="true" />

            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('locations')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                id={locationsButtonId}
                type="button"
                className="hover:text-primary flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors"
                aria-haspopup="menu"
                aria-expanded={activeDropdown === 'locations'}
                aria-controls={locationsMenuId}
                onClick={() =>
                  setActiveDropdown(prev => (prev === 'locations' ? null : 'locations'))
                }
              >
                Locations
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {activeDropdown === 'locations' && (
                <LocationsDropdown
                  locationsMenuId={locationsMenuId}
                  triggerId={locationsButtonId}
                  onMouseEnter={() => handleDropdownEnter('locations')}
                  onMouseLeave={handleDropdownLeave}
                />
              )}
            </div>

            <div className="bg-border h-4 w-px" aria-hidden="true" />

            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('company')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                id={companyButtonId}
                type="button"
                className="hover:text-primary flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors"
                aria-haspopup="menu"
                aria-expanded={activeDropdown === 'company'}
                aria-controls={companyMenuId}
                onClick={() => setActiveDropdown(prev => (prev === 'company' ? null : 'company'))}
              >
                Company
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {activeDropdown === 'company' && (
                <CompanyDropdown
                  companyMenuId={companyMenuId}
                  triggerId={companyButtonId}
                  onMouseEnter={() => handleDropdownEnter('company')}
                  onMouseLeave={handleDropdownLeave}
                />
              )}
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${settings.phoneE164}`}
              className="hover:text-primary flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors"
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
              className="border-primary/30 bg-primary text-primary-foreground rounded-lg border px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => {
              setIsMenuOpen(prev => {
                if (!prev === false) {
                  setIsMobileServicesOpen(false)
                  setIsMobileLocationsOpen(false)
                }
                return !prev
              })
            }}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-nav"
            className="border-border mt-4 max-h-[70vh] overflow-y-auto border-t pt-4 lg:hidden"
          >
            <div className="flex flex-col space-y-1">
              {/* Services accordion */}
              <div>
                <button
                  type="button"
                  className="hover:bg-muted hover:text-primary flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors"
                  aria-expanded={isMobileServicesOpen}
                  onClick={() => setIsMobileServicesOpen(v => !v)}
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isMobileServicesOpen && (
                  <div className="border-border mt-1 ml-3 space-y-1 border-l pl-3">
                    {(NAV.find(i => i.label === 'Services')?.children ?? []).map(item => (
                      <Link
                        key={item.href}
                        href={item.href!}
                        className="hover:bg-muted hover:text-primary block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors"
                        onClick={closeMobileMenuAndSections}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Locations accordion */}
              <div>
                <button
                  type="button"
                  className="hover:bg-muted hover:text-primary flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors"
                  aria-expanded={isMobileLocationsOpen}
                  onClick={() => setIsMobileLocationsOpen(v => !v)}
                >
                  Locations
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isMobileLocationsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isMobileLocationsOpen && (
                  <div className="border-border mt-1 ml-3 space-y-1 border-l pl-3">
                    {(NAV.find(i => i.label === 'Locations')?.children ?? []).map(item => (
                      <Link
                        key={item.href}
                        href={item.href!}
                        className="hover:bg-muted hover:text-primary block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors"
                        onClick={closeMobileMenuAndSections}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Company accordion - simplified for mobile as direct links or accordion? Let's do accordion for consistency */}
              <div>
                <div className="border-border mt-1 ml-3 space-y-1 border-l pl-3">
                  {(NAV.find(i => i.label === 'Company')?.children ?? []).map(item => (
                    <Link
                      key={item.href}
                      href={item.href!}
                      className="hover:bg-muted hover:text-primary block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors"
                      onClick={closeMobileMenuAndSections}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

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
                    closeMobileMenuAndSections()
                  }}
                  className="border-primary/30 bg-primary text-primary-foreground block w-full rounded-lg border py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90"
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
