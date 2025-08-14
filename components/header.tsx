"use client"

import { useState, useRef, useEffect } from "react"
import { Button, PhoneButton } from "@/components/ui/button"
import { Menu, X, ChevronDown, Phone } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { PriceMatchTerms } from "@/components/price-match-terms"

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

            <PriceMatchTerms
              trigger={
                <button className="text-gray-700 hover:text-red-600 font-medium text-sm underline underline-offset-2">
                  Price Match
                </button>
              }
            />
          </div>

          {/* Right desktop actions */}
          <div className="hidden lg:flex items-center justify-end gap-4 ml-4 border-l border-gray-300 pl-4">
            <div className="text-center">
              <PhoneButton
                href="tel:+18126101657"
                size="xs"
                className="bg-transparent text-black ring-1 ring-gray-300 hover:bg-red-700/10"
              >
                <Phone className="h-3 w-3" /> (812) 610-1657
              </PhoneButton>
              <div className="text-xs text-black mt-0">Text photos for quote</div>
            </div>
            <Button
              size="xs"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold"
              onClick={() => setIsQuoteModalOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isQuoteModalOpen}
              aria-controls="quote-form-modal"
            >
              GET FREE QUOTE
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
              <Link
                href="/services"
                prefetch={false}
                className="text-gray-700 hover:text-red-600 font-medium text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICES
              </Link>
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
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setIsQuoteModalOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isQuoteModalOpen}
                  aria-controls="quote-form-modal"
                >
                  Get Free Quote
                </Button>
              </div>
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
