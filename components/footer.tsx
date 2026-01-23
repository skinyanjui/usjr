import { Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { StructuredData } from '@/components/structured-data'
import { settings } from '@/lib/cms-content'
import { NAV } from '@/lib/nav'

export function Footer() {
  const services = NAV.find(i => i.label === 'Services')?.children ?? []
  const locations = NAV.find(i => i.label === 'Locations')?.children ?? []

  return (
    <footer role="contentinfo" className="border-t border-border bg-foreground text-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">


        {/* CTA Banner */}
        <div className="mb-12 rounded-lg bg-background/10 p-6 text-center sm:p-8">
          <h3 className="mb-2 text-xl font-bold sm:text-2xl">
            Ready to reclaim your space?
          </h3>
          <p className="mb-6 text-sm text-background/80">
            Same-day service available. Locally owned and insured.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="rounded-lg border border-foreground/30 bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Get Free Quote
            </Link>
            <a
              href={`tel:${settings.phoneE164}`}
              className="inline-flex items-center gap-2 rounded-lg border border-background/30 px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-background/10"
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
                    className="text-sm text-background/70 transition-colors hover:text-background"
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
                    className="text-sm text-background/70 transition-colors hover:text-background"
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
                <Link href="/about" className="text-sm text-background/70 transition-colors hover:text-background">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-background/70 transition-colors hover:text-background">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-background/70 transition-colors hover:text-background">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-background/70 transition-colors hover:text-background">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-sm text-background/70 transition-colors hover:text-background">
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
                <Link href="/privacy" className="text-sm text-background/70 transition-colors hover:text-background">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-background/70 transition-colors hover:text-background">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-sm text-background/70 transition-colors hover:text-background">
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
                <Phone className="h-4 w-4 text-background/70" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-background/70" />
                <a href={`mailto:${settings.email}`} className="text-background/70 hover:text-background">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4" />
                <span>Evansville, IN</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-background/60 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Uncle Sam Junk Removal. All rights reserved.</p>
            <p>Veteran-Owned · Licensed & Insured</p>
          </div>
        </div>
      </div>

      <StructuredData type="LocalBusiness" />
    </footer>
  )
}
