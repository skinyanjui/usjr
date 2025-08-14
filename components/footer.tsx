import { Facebook, Instagram, Mail, Phone, MapPin, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { StructuredData } from "@/components/structured-data"
import { settings } from "@/lib/cms-content"

export function Footer() {
  const phoneDigits = settings.phone.replace(/\D/g, "")

  return (
    <footer role="contentinfo" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Ready to reclaim your space?</h3>
              <p className="text-red-50/90 mt-1">Same-day service, 7 days a week. Locally owned and insured.</p>
            </div>
            <div className="flex gap-3 rounded-sm">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-white text-red-700 font-semibold px-5 py-2.5 shadow hover:bg-red-50 transition-colors rounded-md"
              >
                Get a free quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${phoneDigits}`}
                className="inline-flex items-center gap-2 rounded-lg bg-red-700/35 text-white ring-1 ring-white/30 px-5 py-2.5 hover:bg-red-700/45 transition-colors"
              >
                <Phone className="h-4 w-4" /> Call {settings.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand & Social */}
          <div className="lg:col-span-2">
            <div className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-lg mb-6 w-fit">
              UNCLE SAM JUNK REMOVAL
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Evansville's premier junk removal, dumpster rental, and professional cleaning service. Locally owned and
              operated, serving Southern Indiana since 2010.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex space-x-4" aria-label="Social media">
              {settings.socialMedia.facebook && (
                <a
                  href={settings.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-gray-300" />
                </a>
              )}
              {settings.socialMedia.instagram && (
                <a
                  href={settings.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-gray-300" />
                </a>
              )}
              {settings.socialMedia.google && (
                <a
                  href={settings.socialMedia.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-gray-300"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm7.938 9h-3.27a15.94 15.94 0 0 0-1.033-5.102A8.014 8.014 0 0 1 19.938 11ZM12 4c1.38 0 2.652 2.074 3.27 5h-6.54C9.348 6.074 10.621 4 12 4ZM8.364 13h7.272a14.3 14.3 0 0 1-.615 3H8.98a14.3 14.3 0 0 1-.615-3Zm0-2a14.3 14.3 0 0 1 .615-3h6.042a14.3 14.3 0 0 1 .615 3H8.364Zm3.333 9c-1.38 0-2.652-2.074-3.27-5h6.54c-.618 2.926-1.89 5-3.27 5ZM8.365 4.898A15.94 15.94 0 0 0 7.333 10H4.062a8.014 8.014 0 0 1 4.303-5.102ZM4.062 13h3.27c.235 1.776.687 3.53 1.372 5.102A8.014 8.014 0 0 1 4.062 13Zm15.876 0a8.014 8.014 0 0 1-4.303 5.102A15.94 15.94 0 0 0 16.667 13h3.27Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Junk Removal Services */}
          <nav aria-label="Junk removal services">
            <h3 className="text-xl font-bold mb-6 text-red-400">Junk Removal</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/services/junk-removal" className="hover:text-white transition-colors">
                  General Junk Removal
                </Link>
              </li>
              <li>
                <Link href="/services/hot-tub-removal" className="hover:text-white transition-colors">
                  Hot Tub Removal
                </Link>
              </li>
              <li>
                <Link href="/services/appliance-removal" className="hover:text-white transition-colors">
                  Appliance Removal
                </Link>
              </li>
              <li>
                <Link href="/services/mattress-removal" className="hover:text-white transition-colors">
                  Mattress Removal
                </Link>
              </li>
              <li>
                <Link href="/services/shed-removal" className="hover:text-white transition-colors">
                  Shed Removal
                </Link>
              </li>
              <li>
                <Link href="/services/garage-cleanout" className="hover:text-white transition-colors">
                  Garage Cleanouts
                </Link>
              </li>
              <li>
                <Link href="/services/estate-cleanouts" className="hover:text-white transition-colors">
                  Estate Cleanouts
                </Link>
              </li>
              <li>
                <Link href="/services/light-demolition" className="hover:text-white transition-colors">
                  Light Demolition
                </Link>
              </li>
              <li>
                <Link href="/services/yard-waste-removal" className="hover:text-white transition-colors">
                  Yard Waste Removal
                </Link>
              </li>
              <li>
                <Link href="/services/dumpster-rental" className="hover:text-white transition-colors">
                  Dumpster Rental
                </Link>
              </li>
            </ul>
          </nav>

          {/* Cleaning Services */}
          <nav aria-label="Cleaning services">
            <h3 className="text-xl font-bold mb-6 text-green-400">Cleaning Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/cleaning/residential" className="hover:text-white transition-colors">
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link href="/cleaning/commercial" className="hover:text-white transition-colors">
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link href="/cleaning/deep-clean" className="hover:text-white transition-colors">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link href="/cleaning/recurring" className="hover:text-white transition-colors">
                  Recurring Cleaning
                </Link>
              </li>
              <li>
                <Link href="/cleaning/move-in-move-out" className="hover:text-white transition-colors">
                  Move-In/Move-Out
                </Link>
              </li>
              <li>
                <Link href="/cleaning/specialty" className="hover:text-white transition-colors">
                  Specialty Cleaning
                </Link>
              </li>
            </ul>
          </nav>

          {/* Service Areas */}
          <nav aria-label="Service areas">
            <h3 className="text-xl font-bold mb-6 text-blue-400">Service Areas</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/locations/evansville" className="hover:text-white transition-colors">
                  Evansville, IN
                </Link>
              </li>
              <li>
                <Link href="/locations/newburgh" className="hover:text-white transition-colors">
                  Newburgh, IN
                </Link>
              </li>
              <li>
                <Link href="/locations/henderson-ky" className="hover:text-white transition-colors">
                  Henderson, KY
                </Link>
              </li>
              <li>
                <Link href="/locations/owensboro-ky" className="hover:text-white transition-colors">
                  Owensboro, KY
                </Link>
              </li>
              <li>
                <Link href="/locations/boonville" className="hover:text-white transition-colors">
                  Boonville, IN
                </Link>
              </li>
              <li>
                <Link href="/locations/princeton" className="hover:text-white transition-colors">
                  Princeton, IN
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info + Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold">{settings.phone}</div>
                  <div className="text-sm text-gray-400">Call or Text</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-600" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-600 mt-1" />
                <span>
                  Evansville, Indiana
                  <br />& Southern Indiana
                </span>
              </div>
              <div className="bg-red-600 text-white p-3 rounded-lg text-center">
                <div className="font-bold">Same Day Service</div>
                <div className="text-sm">Available 7 Days a Week</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="hover:text-white transition-colors">
                    Get Quote
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="text-gray-400">
              <p>&copy; {new Date().getFullYear()} Uncle Sam Junk Removal. All rights reserved.</p>
            </div>
            <div className="text-right text-gray-400">
              <div className="flex items-center justify-end gap-4 text-sm">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <span>BBB A+ Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Local SEO Schema */}
      <StructuredData type="LocalBusiness" />
    </footer>
  )
}
