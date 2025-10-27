import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { StructuredData } from '@/components/structured-data'
import { Button, PhoneButton } from '@/components/ui/button'
import { settings } from '@/lib/cms-content'
import { NAV } from '@/lib/nav'
import { QuoteCtaLink } from '@/components/quote-cta-link'

export function Footer() {
  const phoneHref = settings.phoneE164
  const services = NAV.find(i => i.label === 'Services')?.children ?? []
  const locations = NAV.find(i => i.label === 'Locations')?.children ?? []

  return (
    <footer role="contentinfo" className="relative z-[2000] text-white">
      <div className="bg-red-900">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="mb-6 rounded-lg bg-red-600 p-4">
            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold sm:text-xl md:text-2xl">
                  Ready to reclaim your space?
                </h3>
                <p className="mt-1 text-sm text-white">
                  Same-day service, 7 days a week. Locally owned and insured.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <Button
                  asChild
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow transition-colors hover:bg-red-50 sm:px-5"
                >
                  <QuoteCtaLink location="footer-primary" label="Get Free Quote">
                    Get Free Quote
                  </QuoteCtaLink>
                </Button>
                <PhoneButton href={`tel:${phoneHref}`} size="sm" className="justify-center">
                  <Phone className="h-4 w-4" /> Call {settings.phone}
                </PhoneButton>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-4 text-white">
            {/* Services */}
            <nav
              aria-label="Our services"
              className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-0.8rem)]"
            >
              <h3 className="mb-3 text-base font-semibold sm:text-lg">Our Services</h3>
              <ul className="space-y-2 text-xs text-white sm:text-sm">
                {services.map(s => (
                  <li key={s.href}>
                    <Link
                      href={s.href!}
                      className="text-white transition-colors hover:text-red-200"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Service Areas */}
            <nav
              aria-label="Service areas"
              className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-0.8rem)]"
            >
              <h3 className="mb-3 text-base font-semibold sm:text-lg">Service Areas</h3>
              <ul className="space-y-2 text-xs text-white sm:text-sm">
                {locations.map(l => (
                  <li key={l.href}>
                    <Link
                      href={l.href!}
                      className="text-white transition-colors hover:text-red-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company Info */}
            <div className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-0.8rem)]">
              <h3 className="mb-3 text-base font-semibold sm:text-lg">Uncle Sam Junk Removal</h3>
              <p className="mb-3 text-xs text-white sm:text-sm">
                Evansville's premier junk removal service. Locally owned and operated.
              </p>
              <div className="mb-2 flex items-center gap-2 text-xs text-red-100 sm:text-sm">
                <Clock className="h-4 w-4" />
                <span>Same Day Service</span>
              </div>
              <div className="text-xs text-white sm:text-sm">Available 7 Days a Week</div>
            </div>

            {/* Quick Links */}
            <div className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-0.8rem)]">
              <h3 className="mb-3 text-base font-semibold sm:text-lg">Quick Links</h3>
              <ul className="space-y-2 text-xs text-white sm:text-sm">
                <li>
                  <Link href="/about" className="text-white transition-colors hover:text-red-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white transition-colors hover:text-red-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white transition-colors hover:text-red-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.karchercleaners.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-colors hover:text-red-200"
                  >
                    Karcher Cleaners
                  </a>
                </li>
                <li>
                  <Link href="/quote" className="text-white transition-colors hover:text-red-200">
                    Get Free Quote
                  </Link>
                </li>
                <li>
                  <a
                    href="/sitemap.xml"
                    className="text-white transition-colors hover:text-red-200"
                  >
                    XML Sitemap
                  </a>
                </li>
              </ul>
            </div>

            {/* Blog Feeds */}
            <div className="w-1/2 sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-0.8rem)]">
              <h3 className="mb-3 text-base font-semibold sm:text-lg">Blog Feeds</h3>
              <ul className="space-y-2 text-xs text-white sm:text-sm">
                <li>
                  <a
                    href="/rss.xml"
                    className="text-white transition-colors hover:text-red-200"
                  >
                    RSS 2.0
                  </a>
                </li>
                <li>
                  <a
                    href="/atom.xml"
                    className="text-white transition-colors hover:text-red-200"
                  >
                    Atom 1.0
                  </a>
                </li>
                <li>
                  <a
                    href="/atom03.xml"
                    className="text-white transition-colors hover:text-red-200"
                  >
                    Atom 0.3
                  </a>
                </li>
                <li>
                  <a
                    href="/mrss.xml"
                    className="text-white transition-colors hover:text-red-200"
                  >
                    Media RSS
                  </a>
                </li>
                <li>
                  <a
                    href="/feed.txt"
                    className="text-white transition-colors hover:text-red-200"
                  >
                    Text Feed
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-4 border-t border-red-700/60 pt-4">
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
              <div className="flex w-1/2 items-center gap-2 sm:w-[calc(33.333%-0.75rem)]">
                <Phone className="h-4 w-4" />
                <div>
                  <div className="font-semibold">{settings.phone}</div>
                  <div className="text-red-100">Call or Text</div>
                </div>
              </div>
              <div className="flex w-1/2 items-center gap-2 sm:w-[calc(33.333%-0.75rem)]">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-white transition-colors hover:text-red-200"
                >
                  {settings.email}
                </a>
              </div>
              <div className="flex w-1/2 items-center gap-2 sm:w-[calc(33.333%-0.75rem)]">
                <MapPin className="h-4 w-4" />
                <div className="text-red-100">Evansville, Indiana & Southern Indiana</div>
              </div>
            </div>
          </div>

          <div className="border-t border-red-700/60 pt-3">
            <div className="flex flex-col items-center justify-between gap-1 text-xs text-white sm:text-sm md:flex-row">
              <p>&copy; {new Date().getFullYear()} Uncle Sam Junk Removal. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-white transition-colors hover:text-red-200">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white transition-colors hover:text-red-200">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-red-100">
              <p>
                We improve our products and advertising by using Microsoft Clarity to see how you
                use our website. By using our site, you agree that we and Microsoft can collect and
                use this data. Our{' '}
                <Link href="/privacy" className="underline hover:text-white">
                  privacy statement
                </Link>{' '}
                has more details.
              </p>
            </div>
          </div>
        </div>
      </div>

      <StructuredData type="LocalBusiness" />
    </footer>
  )
}
