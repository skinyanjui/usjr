import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import QuoteFormClient from './QuoteFormClient'
import { settings } from '@/lib/cms-content'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Free Junk Removal Quote | Uncle Sam Junk Removal',
  description:
    'Request a free junk removal quote in Evansville and the Tri-State. Add pickup timing, access details, load size, and optional photos for faster planning.',
  robots: 'index, follow',
  ...buildCanonicalMetadata('/quote', baseUrl),
}

export default function QuotePage() {
  return (
    <main className="bg-background min-h-screen">
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <header className="mx-auto mb-7 max-w-3xl text-center">
            <p className="text-primary mb-2 text-xs font-bold uppercase tracking-[0.16em]">
              Free estimate
            </p>
            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Tell us what needs to go
            </h1>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-6 sm:text-base">
              Share the service, timing, access, and approximate load. Optional photos usually help
              us price and plan faster.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <a
                href={`tel:${settings.phoneE164}`}
                className="bg-primary text-primary-foreground inline-flex min-h-10 items-center justify-center rounded-md px-4 text-sm font-bold"
              >
                Call {settings.phone}
              </a>
              <a
                href={`sms:${settings.phoneE164}`}
                className="border-border text-foreground inline-flex min-h-10 items-center justify-center rounded-md border px-4 text-sm font-bold"
              >
                Text photos instead
              </a>
            </div>
          </header>

          <QuoteFormClient />

          <aside className="border-border mx-auto mt-7 max-w-3xl border-t pt-6">
            <h2 className="text-foreground text-sm font-bold">Planning ranges</h2>
            <div className="text-muted-foreground mt-3 grid gap-3 text-xs leading-5 sm:grid-cols-2">
              <p>
                <span className="text-foreground font-semibold">Single item:</span> typically
                $75–$150.
              </p>
              <p>
                <span className="text-foreground font-semibold">¼ truck load:</span> typically
                $200–$300.
              </p>
              <p>
                <span className="text-foreground font-semibold">½ truck load:</span> typically
                $350–$450.
              </p>
              <p>
                <span className="text-foreground font-semibold">Full truck load:</span> typically
                $500–$650.
              </p>
            </div>
            <p className="text-muted-foreground mt-3 text-[11px] leading-5">
              These are planning ranges, not final quotes. Final onsite pricing depends on the
              actual volume, materials, labor, and access.
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}
