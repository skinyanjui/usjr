import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { StructuredData } from "@/components/structured-data"
import { PhoneButton } from "@/components/ui/button"
import { settings } from "@/lib/cms-content"

export function Footer() {
  const phoneDigits = settings.phone.replace(/\D/g, "")

  return (
    <footer role="contentinfo" className="bg-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-900">
        <div className="rounded-lg p-6 mb-8 bg-red-500">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Ready to reclaim your space?</h3>
              <p className="text-red-50/90 mt-1 text-sm sm:text-base">
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
              <PhoneButton href={`tel:${phoneDigits}`} size="default" className="justify-center">
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
              <li>
                <Link href="/services/junk-removal" className="text-red-100 hover:text-white transition-colors">
                  Junk Removal
                </Link>
              </li>
              <li>
                <Link href="/services/dumpster-rental" className="text-red-100 hover:text-white transition-colors">
                  Dumpster Rental
                </Link>
              </li>
              <li>
                <Link href="/cleaning/residential" className="text-red-100 hover:text-white transition-colors">
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link href="/cleaning/commercial" className="text-red-100 hover:text-white transition-colors">
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/estate-cleanouts" className="text-red-100 hover:text-white transition-colors">
                  Estate Cleanouts
                </Link>
              </li>
              <li>
                <Link href="/services/appliance-removal" className="text-red-100 hover:text-white transition-colors">
                  Appliance Removal
                </Link>
              </li>
            </ul>
          </nav>

          {/* Service Areas */}
          <nav aria-label="Service areas">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Service Areas</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/locations/evansville" className="text-red-100 hover:text-white transition-colors">
                  Evansville, IN
                </Link>
              </li>
              <li>
                <Link href="/locations/newburgh" className="text-red-100 hover:text-white transition-colors">
                  Newburgh, IN
                </Link>
              </li>
              <li>
                <Link href="/locations/henderson-ky" className="text-red-100 hover:text-white transition-colors">
                  Henderson, KY
                </Link>
              </li>
              <li>
                <Link href="/locations/owensboro-ky" className="text-red-100 hover:text-white transition-colors">
                  Owensboro, KY
                </Link>
              </li>
              <li>
                <Link href="/locations/boonville" className="text-red-100 hover:text-white transition-colors">
                  Boonville, IN
                </Link>
              </li>
              <li>
                <Link href="/locations/princeton" className="text-red-100 hover:text-white transition-colors">
                  Princeton, IN
                </Link>
              </li>
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
                <Link href="/sitemap.xml" className="text-red-100 hover:text-white transition-colors">
                  Sitemap
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
