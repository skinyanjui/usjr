import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Star } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
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
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Junk Removal Services */}
          <div>
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
          </div>

          {/* Cleaning Services */}
          <div>
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
          </div>

          {/* Service Areas */}
          <div>
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
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold">(812) 610-1657</div>
                  <div className="text-sm text-gray-400">Call or Text</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-600" />
                <span>info@unclesamjunkremoval.com</span>
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
                  <Link href="/quote" className="hover:text-white transition-colors">
                    Get Quote
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="text-gray-400">
              <p>&copy; 2024 Uncle Sam Junk Removal. All rights reserved.</p>
              <p className="text-sm">Licensed & Insured | Indiana Waste Hauler License #WH-2024-001</p>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Uncle Sam Junk Removal",
            alternateName: "Uncle Sam Junk Removal & Cleaning",
            url: "https://unclesamjunkremoval.com",
            logo: "https://unclesamjunkremoval.com/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "(812) 610-1657",
              contactType: "customer service",
              areaServed: "US-IN",
              availableLanguage: "English",
            },
            sameAs: [
              "https://www.facebook.com/unclesamjunkremoval",
              "https://www.instagram.com/unclesamjunkremoval",
              "https://www.twitter.com/unclesamjunkremoval",
            ],
          }),
        }}
      />
    </footer>
  )
}
