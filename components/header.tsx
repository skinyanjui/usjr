"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const QuoteFormModal = dynamic(() => import("./quote-form-modal").then((m) => m.QuoteFormModal), { ssr: false })
const ServicesDropdown = dynamic(() => import("./header-services-dropdown"), { ssr: false })

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const servicesMenuId = "services-menu"

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
    }, 150) // 150ms delay
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
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              prefetch={false}
              className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-base hover:bg-red-700 transition-colors"
            >
              UNCLE SAM JUNK REMOVAL
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm">
              HOME
            </Link>

            <Link href="/about" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm">
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

            <Link href="/blog" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm">
              BLOG
            </Link>

            <Link href="/faq" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm">
              FAQ
            </Link>

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300">
              <div className="text-center">
                <a
                  href="tel:+18126101657"
                  className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors text-center"
                >
                  (812) 610-1657
                </a>
                <div className="text-xs text-gray-600">Text photos for quote</div>
              </div>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full font-semibold text-xs"
                onClick={() => setIsQuoteModalOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isQuoteModalOpen}
                aria-controls="quote-form-modal"
              >
                GET FREE QUOTE
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
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
            <div className="flex flex-col space-y-3 pt-4">
              <div className="text-center py-4 bg-red-50 rounded-lg mb-4">
                <a
                  href="tel:+18126101657"
                  className="text-base font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  (812) 610-1657
                </a>
                <div className="text-xs text-gray-600">Text photos for instant quote</div>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs mt-3"
                  onClick={() => setIsQuoteModalOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isQuoteModalOpen}
                  aria-controls="quote-form-modal"
                >
                  Get Free Quote
                </Button>
              </div>

              <Link href="/" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                HOME
              </Link>
              <Link href="/about" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                ABOUT
              </Link>

              <div className="text-red-600 font-bold text-xs py-1">JUNK REMOVAL</div>
              <Link href="/services/junk-removal" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium pl-4 text-sm">
                General Junk Removal
              </Link>
              <Link
                href="/services/dumpster-rental"
                prefetch={false}
                className="text-gray-700 hover:text-red-600 font-medium pl-4 text-sm"
              >
                Dumpster Rental
              </Link>
              <Link
                href="/services/hot-tub-removal"
                prefetch={false}
                className="text-gray-700 hover:text-red-600 font-medium pl-4 text-sm"
              >
                Hot Tub Removal
              </Link>

              <div className="text-green-600 font-bold text-xs py-1">CLEANING</div>
              <Link
                href="/cleaning/residential"
                prefetch={false}
                className="text-gray-700 hover:text-green-600 font-medium pl-4 text-sm"
              >
                Residential
              </Link>
              <Link href="/cleaning/commercial" prefetch={false} className="text-gray-700 hover:text-green-600 font-medium pl-4 text-sm">
                Commercial
              </Link>
              <Link href="/cleaning/deep-clean" prefetch={false} className="text-gray-700 hover:text-green-600 font-medium pl-4 text-sm">
                Deep Clean
              </Link>

              <div className="text-blue-600 font-bold text-xs py-1">LOCATIONS</div>
              <Link href="/locations/evansville" prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium pl-4 text-sm">
                Evansville
              </Link>
              <Link href="/locations/newburgh" prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium pl-4 text-sm">
                Newburgh
              </Link>
              <Link
                href="/locations/henderson-ky"
                prefetch={false}
                className="text-gray-700 hover:text-blue-600 font-medium pl-4 text-sm"
              >
                Henderson, KY
              </Link>

              <Link href="/blog" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                BLOG
              </Link>
              <Link href="/faq" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                FAQ
              </Link>
              <Link href="/emergency" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                EMERGENCY SERVICE
              </Link>
              <Link href="/compare" prefetch={false} className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                COMPARE SERVICES
              </Link>
            </div>
          </div>
        )}
      </nav>

      {isQuoteModalOpen && (
        <div id="quote-form-modal" aria-hidden={!isQuoteModalOpen}>
          <QuoteFormModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </div>
      )}
    </header>
  )
}
