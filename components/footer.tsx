import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { StructuredData } from "@/components/structured-data"
import { Button, PhoneButton } from "@/components/ui/button"
import { settings } from "@/lib/cms-content"
import { NAV } from "@/lib/nav"
import { QuoteCtaLink } from "@/components/quote-cta-link"

export function Footer() {
  const phoneHref = settings.phoneE164
  const services = NAV.find((i) => i.label === "Services")?.children ?? []
  const locations = NAV.find((i) => i.label === "Locations")?.children ?? []

  return (
    <footer role="contentinfo" className="text-white">
      <div className="bg-red-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="rounded-lg p-4 mb-6 bg-red-600">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Ready to reclaim your space?</h3>
              <p className="text-white mt-1 text-sm">
                Same-day service, 7 days a week. Locally owned and insured.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button asChild className="inline-flex items-center gap-2 bg-white text-red-700 font-semibold px-4 sm:px-5 py-2 shadow hover:bg-red-50 transition-colors rounded-lg text-sm justify-center">
                <QuoteCtaLink location="footer-primary" label="Get Free Quote">Get Free Quote</QuoteCtaLink>
              </Button>
              <PhoneButton href={`tel:${phoneHref}`} size="sm" className="justify-center">
                <Phone className="h-4 w-4" /> Call {settings.phone}
              </PhoneButton>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-white">
          {/* Services */}
          <nav aria-label="Our services" className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Our Services</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href!} className="text-red-100 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service Areas */}
          <nav aria-label="Service areas" className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Service Areas</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {locations.map((l) => (
                <li key={l.href}>
                  <Link href={l.href!} className="text-red-100 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Info */}
          <div className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Uncle Sam Junk Removal</h3>
            <p className="text-red-100 text-xs sm:text-sm mb-3">
              Evansville's premier junk removal service. Locally owned and operated.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-red-100 mb-2">
              <Clock className="h-4 w-4" />
              <span>Same Day Service</span>
            </div>
            <div className="text-xs sm:text-sm text-red-100">Available 7 Days a Week</div>
          </div>

          {/* Quick Links */}
          <div className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="text-red-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-red-100 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-red-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="https://www.karchercleaners.com/" target="_blank" rel="noopener noreferrer" className="text-red-100 hover:text-white transition-colors">
                  Karcher Cleaners
                </a>
              </li>
              <li>
                <Link href="/quote" className="text-red-100 hover:text-white transition-colors">
                  Get Free Quote
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-red-100 hover:text-white transition-colors">
                  Sitemap (HTML)
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-red-100 hover:text-white transition-colors">
                  Sitemap (XML)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-700/60 pt-4 mb-4">
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 w-1/2 sm:w-[calc(33.333%-0.75rem)]">
              <Phone className="h-4 w-4" />
              <div>
                <div className="font-semibold">{settings.phone}</div>
                <div className="text-red-100">Call or Text</div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-1/2 sm:w-[calc(33.333%-0.75rem)]">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${settings.email}`} className="text-red-100 hover:text-white transition-colors">
                {settings.email}
              </a>
            </div>
            <div className="flex items-center gap-2 w-1/2 sm:w-[calc(33.333%-0.75rem)]">
              <MapPin className="h-4 w-4" />
              <div className="text-red-100">Evansville, Indiana & Southern Indiana</div>
            </div>
          </div>
        </div>

        <div className="border-t border-red-700/60 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-1 text-xs sm:text-sm text-red-100">
            <p>&copy; {new Date().getFullYear()} Uncle Sam Junk Removal. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>

      <StructuredData type="LocalBusiness" />
    </footer>
  )
}
