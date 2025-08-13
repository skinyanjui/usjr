"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { QuoteFormModal } from "./quote-form-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="bg-white/90 backdrop-blur-md border-b border-white/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-base hover:bg-red-700 transition-colors"
            >
              UNCLE SAM JUNK REMOVAL
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm">
              HOME
            </Link>

            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm">
              ABOUT
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => handleDropdownEnter("services")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center gap-1 text-sm">
                SERVICES
                <ChevronDown className="w-3 h-3" />
              </button>
              {activeDropdown === "services" && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[500px] bg-white rounded-lg shadow-xl border border-gray-200 py-6 z-50"
                  onMouseEnter={() => handleDropdownEnter("services")}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="grid grid-cols-3 gap-6 px-6">
                    <div>
                      <h4 className="font-bold text-red-600 mb-3 text-sm">JUNK REMOVAL</h4>
                      <Link
                        href="/services/junk-removal"
                        className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs"
                      >
                        General Junk Removal
                      </Link>
                      <Link
                        href="/services/dumpster-rental"
                        className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs"
                      >
                        Dumpster Rental
                      </Link>
                      <Link
                        href="/services/hot-tub-removal"
                        className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs"
                      >
                        Hot Tub Removal
                      </Link>
                      <Link
                        href="/services/appliance-removal"
                        className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs"
                      >
                        Appliance Removal
                      </Link>
                      <Link
                        href="/services/garage-cleanout"
                        className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs"
                      >
                        Garage Cleanouts
                      </Link>
                      <Link
                        href="/services/estate-cleanouts"
                        className="block py-1 text-gray-600 hover:text-red-600 transition-colors text-xs"
                      >
                        Estate Cleanouts
                      </Link>
                      <div className="border-t border-gray-200 mt-3 pt-3">
                        <Link
                          href="/compare"
                          className="block py-1 text-blue-600 hover:text-blue-700 transition-colors text-xs font-medium"
                        >
                          Compare Services
                        </Link>
                        <Link
                          href="/emergency"
                          className="block py-1 text-red-600 hover:text-red-700 transition-colors text-xs font-medium"
                        >
                          Emergency Service
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-600 mb-3 text-sm">CLEANING</h4>
                      <Link
                        href="/cleaning/residential"
                        className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs"
                      >
                        Residential Cleaning
                      </Link>
                      <Link
                        href="/cleaning/commercial"
                        className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs"
                      >
                        Commercial Cleaning
                      </Link>
                      <Link
                        href="/cleaning/deep-clean"
                        className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs"
                      >
                        Deep Cleaning
                      </Link>
                      <Link
                        href="/cleaning/recurring"
                        className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs"
                      >
                        Recurring Cleaning
                      </Link>
                      <Link
                        href="/cleaning/move-in-move-out"
                        className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs"
                      >
                        Move-In/Move-Out
                      </Link>
                      <Link
                        href="/cleaning/specialty"
                        className="block py-1 text-gray-600 hover:text-green-600 transition-colors text-xs"
                      >
                        Specialty Cleaning
                      </Link>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-600 mb-3 text-sm">LOCATIONS</h4>
                      <Link
                        href="/locations/evansville"
                        className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs"
                      >
                        Evansville, IN
                      </Link>
                      <Link
                        href="/locations/newburgh"
                        className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs"
                      >
                        Newburgh, IN
                      </Link>
                      <Link
                        href="/locations/henderson-ky"
                        className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs"
                      >
                        Henderson, KY
                      </Link>
                      <Link
                        href="/locations/owensboro-ky"
                        className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs"
                      >
                        Owensboro, KY
                      </Link>
                      <Link
                        href="/locations/boonville"
                        className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs"
                      >
                        Boonville, IN
                      </Link>
                      <Link
                        href="/locations/princeton"
                        className="block py-1 text-gray-600 hover:text-blue-600 transition-colors text-xs"
                      >
                        Princeton, IN
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm">
              BLOG
            </Link>

            <Link href="/faq" className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm">
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
              >
                GET FREE QUOTE
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
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
                >
                  Get Free Quote
                </Button>
              </div>

              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                HOME
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                ABOUT
              </Link>

              <div className="text-red-600 font-bold text-xs py-1">JUNK REMOVAL</div>
              <Link href="/services/junk-removal" className="text-gray-700 hover:text-red-600 font-medium pl-4 text-sm">
                General Junk Removal
              </Link>
              <Link
                href="/services/dumpster-rental"
                className="text-gray-700 hover:text-red-600 font-medium pl-4 text-sm"
              >
                Dumpster Rental
              </Link>
              <Link
                href="/services/hot-tub-removal"
                className="text-gray-700 hover:text-red-600 font-medium pl-4 text-sm"
              >
                Hot Tub Removal
              </Link>

              <div className="text-green-600 font-bold text-xs py-1">CLEANING</div>
              <Link
                href="/cleaning/residential"
                className="text-gray-700 hover:text-green-600 font-medium pl-4 text-sm"
              >
                Residential
              </Link>
              <Link href="/cleaning/commercial" className="text-gray-700 hover:text-green-600 font-medium pl-4 text-sm">
                Commercial
              </Link>
              <Link href="/cleaning/deep-clean" className="text-gray-700 hover:text-green-600 font-medium pl-4 text-sm">
                Deep Clean
              </Link>

              <div className="text-blue-600 font-bold text-xs py-1">LOCATIONS</div>
              <Link href="/locations/evansville" className="text-gray-700 hover:text-blue-600 font-medium pl-4 text-sm">
                Evansville
              </Link>
              <Link href="/locations/newburgh" className="text-gray-700 hover:text-blue-600 font-medium pl-4 text-sm">
                Newburgh
              </Link>
              <Link
                href="/locations/henderson-ky"
                className="text-gray-700 hover:text-blue-600 font-medium pl-4 text-sm"
              >
                Henderson, KY
              </Link>

              <Link href="/blog" className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                BLOG
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                FAQ
              </Link>
              <Link href="/emergency" className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                EMERGENCY SERVICE
              </Link>
              <Link href="/compare" className="text-gray-700 hover:text-red-600 font-medium text-sm py-2">
                COMPARE SERVICES
              </Link>

            </div>
          </div>
        )}
      </nav>

      <QuoteFormModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </header>
  )
}
