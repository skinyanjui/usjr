"use client"

import { useState, useRef, useEffect } from "react"
import { Button, PhoneButton } from "@/components/ui/button"
import { Menu, X, ChevronDown, Phone } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { settings } from "@/lib/cms-content"
import { NAV, CTAS } from "@/lib/nav"

const ServicesDropdown = dynamic(() => import("./header-services-dropdown"), { ssr: false })
const LocationsDropdown = dynamic(() => import("./header-locations-dropdown"), { ssr: false })

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const servicesMenuId = "services-menu"
  const locationsMenuId = "locations-menu"

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
      if (e.key === "Escape") {
        setActiveDropdown(null)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="bg-white/90 backdrop-blur-md border-b border-white/20 px-4 py-3">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="flex col-span-2 lg:col-span-1 min-w-0 items-end text-center">
            <Link
              href="/"
              prefetch={false}
              className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-xs md:text-base hover:bg-red-700 transition-colors whitespace-nowrap max-w-full truncate"
            >
              UNCLE SAM JUNK REMOVAL
            </Link>
          </div>

          {/* Centered desktop nav */}
          <div className="hidden lg:flex items-center justify-center space-x-6">
            <Link
              href="/"
              prefetch={false}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
            >
              HOME
            </Link>

            <Link
              href="/about"
              prefetch={false}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
            >
              ABOUT
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => handleDropdownEnter("services")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center gap-1 text-sm"
                aria-haspopup="menu"
                aria-expanded={activeDropdown === "services"}
                aria-controls={servicesMenuId}
                onClick={() => setActiveDropdown((prev) => (prev === "services" ? null : "services"))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveDropdown((prev) => (prev === "services" ? null : "services"))
                  }
                }}
              >
                SERVICES
                <ChevronDown className="w-3 h-3" aria-hidden="true" />
              </button>
              {activeDropdown === "services" && (
                <ServicesDropdown
                  servicesMenuId={servicesMenuId}
                  onMouseEnter={() => handleDropdownEnter("services")}
                  onMouseLeave={handleDropdownLeave}
                />
              )}
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleDropdownEnter("locations")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center gap-1 text-sm"
                aria-haspopup="menu"
                aria-expanded={activeDropdown === "locations"}
                aria-controls={locationsMenuId}
                onClick={() => setActiveDropdown((prev) => (prev === "locations" ? null : "locations"))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveDropdown((prev) => (prev === "locations" ? null : "locations"))
                  }
                }}
              >
                LOCATIONS
                <ChevronDown className="w-3 h-3" aria-hidden="true" />
              </button>
              {activeDropdown === "locations" && (
                <LocationsDropdown
                  locationsMenuId={locationsMenuId}
                  onMouseEnter={() => handleDropdownEnter("locations")}
                  onMouseLeave={handleDropdownLeave}
                />
              )}
            </div>

            <Link
              href="/blog"
              prefetch={false}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
            >
              BLOG
            </Link>

            <Link
              href="/faq"
              prefetch={false}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
            >
              FAQ
            </Link>

            <Link href={CTAS.priceMatch.href} prefetch={false} className="text-gray-700 hover:text-red-600 font-medium text-sm underline underline-offset-2">
              {CTAS.priceMatch.label}
            </Link>
          </div>

          {/* Right desktop actions */}
          <div className="hidden lg:flex items-center justify-end gap-4 ml-4 border-l border-gray-300 pl-4">
            <div className="text-center">
              <PhoneButton
                href={`tel:${settings.phoneE164}`}
                size="xs"
                className="bg-transparent text-black ring-1 ring-gray-300 hover:bg-red-700/10"
              >
                <Phone className="h-3 w-3" /> {settings.phone}
              </PhoneButton>
              <div className="text-xs mt-0">
                <a href={`sms:${settings.phoneE164}`} className="text-black hover:text-red-600">Text photos for quote</a>
              </div>
            </div>
            <Button asChild size="xs" className="bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold">
              <Link href="/quote">GET FREE QUOTE</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden justify-self-end"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-nav" className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                href="/"
                prefetch={false}
                className="text-gray-700 hover:text-red-600 font-medium text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/about"
                prefetch={false}
                className="text-gray-700 hover:text-red-600 font-medium text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>

              <div className="pt-2">
                <div className="text-gray-500 text-xs mb-1">SERVICES</div>
                {(NAV.find((i) => i.label === "Services")?.children ?? []).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href!}
                    prefetch={false}
                    className="block text-gray-700 hover:text-red-600 font-medium text-sm py-1.5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <div className="text-gray-500 text-xs mb-1">LOCATIONS</div>
                {(NAV.find((i) => i.label === "Locations")?.children ?? []).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href!}
                    prefetch={false}
                    className="block text-gray-700 hover:text-red-600 font-medium text-sm py-1.5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/blog"
                prefetch={false}
                className="text-gray-700 hover:text-red-600 font-medium text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                BLOG
              </Link>
              <Link
                href="/faq"
                prefetch={false}
                className="text-gray-700 hover:text-red-600 font-medium text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-4">
                <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white w-full">
                  <Link href="/quote">Get Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
