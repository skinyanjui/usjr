import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { StructuredData } from "@/components/structured-data"
import { PhoneButton } from "@/components/ui/button"
import { settings } from "@/lib/cms-content"
import { NAV } from "@/lib/nav"

export function Footer() {
  const phoneHref = settings.phoneE164
  const services = NAV.find((i) => i.label === "Services")?.children ?? []
  const locations = NAV.find((i) => i.label === "Locations")?.children ?? []

  return (
    <footer role="contentinfo" className="bg-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-900">
        <div className="rounded-lg p-6 mb-8 bg-red-500">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Ready to reclaim your space?</h3>
              <p className="text-white mt-1 text-sm sm:text-base">
                Same-day service, 7 days a week. Locally owned and insured.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-white text-red-700 font-semibold px-4 sm:px-5 py-2.5 shadow hover:bg-red-50 transition-colors rounded-lg text-sm sm:text-base justify-center"
              >
                Get Free Quote
              </Link>
              <PhoneButton href={`tel:${phoneHref}`} size="default" className="justify-center">
                <Phone className="h-4 w-4" /> Call {settings.phone}
              </PhoneButton>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-white">
          {/* Services */}
          <nav aria-label="Our services">
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
          <nav aria-label="Service areas">
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
          <div>
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
          <div>
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
                <Link href="/quote" className="text-red-100 hover:text-white transition-colors">
                  Get Quote
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

        <div className="border-t border-red-600 pt-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <div>
                <div className="font-semibold">{settings.phone}</div>
                <div className="text-red-100">Call or Text</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${settings.email}`} className="text-red-100 hover:text-white transition-colors">
                {settings.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <div className="text-red-100">Evansville, Indiana & Southern Indiana</div>
            </div>
          </div>
        </div>

        <div className="border-t border-red-600 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-red-100">
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

      <StructuredData type="LocalBusiness" />
    </footer>
  )
}
