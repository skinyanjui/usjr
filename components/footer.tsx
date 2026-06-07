import { Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { StructuredData } from '@/components/structured-data'
import { settings } from '@/lib/cms-content'
import { NAV } from '@/lib/nav'

export function Footer() {
  const services = NAV.find(i => i.label === 'Services')?.children ?? []
  const locations = NAV.find(i => i.label === 'Locations')?.children ?? []

  return (
    <footer role="contentinfo" className="border-border bg-foreground text-background border-t">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* CTA Banner */}
        <div className="bg-background/10 mb-12 rounded-lg p-6 text-center sm:p-8">
          <h3 className="mb-2 text-xl font-bold sm:text-2xl">Ready to reclaim your space?</h3>
          <p className="text-background/80 mb-6 text-sm">Same-day service available.</p>
          <div className="flex flex-nowrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="border-foreground/30 bg-background text-foreground rounded-lg border px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 sm:px-6"
            >
              Get Free Quote
            </Link>
            <a
              href={`tel:${settings.phoneE164}`}
              className="border-background/30 hover:bg-background/10 inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6"
            >
              <Phone className="h-4 w-4" />
              {settings.phone}
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Services */}
          <nav aria-label="Services">
            <h4 className="mb-4 text-sm font-semibold">Services</h4>
            <ul className="space-y-2">
              {services.slice(0, 8).map(s => (
                <li key={s.href}>
                  <Link
                    href={s.href!}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Locations */}
          <nav aria-label="Locations">
            <h4 className="mb-4 text-sm font-semibold">Locations</h4>
            <ul className="space-y-2">
              {locations.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href!}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Get Quote
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="text-background/70 h-4 w-4" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="text-background/70 h-4 w-4" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-background/70 hover:text-background"
                >
                  {settings.email}
                </a>
              </li>
              <li className="text-background/70 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Evansville, IN</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-background/20 border-t pt-6">
          <div className="text-background/60 flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Uncle Sam Junk Removal. All rights reserved.</p>
          </div>
        </div>
      </div>

      <StructuredData type="LocalBusiness" />
    </footer>
  )
}
