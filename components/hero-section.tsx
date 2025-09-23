import Link from 'next/link'
import { ThemedButton } from '@/components/ui/themed-button'
import { GlassCard } from '@/components/ui/glass-card'
import { IconContainer } from '@/components/ui/icon-container'
import { Truck, Hammer, Lightbulb } from 'lucide-react'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { UNIFORM_OFFERS } from '@/lib/uniform-offers'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white md:min-h-[75vh]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]" />
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.08)_80%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-16">
        <div className="mb-8 text-center text-white">
          <h1 className="my-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Same-Day Junk Removal & Cleaning in Evansville, IN
          </h1>
          <p className="mx-auto max-w-4xl text-lg text-white sm:text-xl md:text-2xl">
            Local, veteran-owned pros serving Evansville, Newburgh & Southern Indiana with
            full-service hauling and light demolition support
          </p>
        </div>

        <div className="mb-16 text-center">
          <QuoteCtaLink location="hero" label={UNIFORM_OFFERS.GET_FREE_QUOTE} />
          <p className="mt-2 text-white">
            See pricing, text photos, and get an exact quote —{' '}
            {UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} available
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <GlassCard
            variant="white"
            className="p-6 text-center transition-transform duration-300 hover:scale-105 md:p-8"
          >
            <IconContainer icon={Truck} color="red" className="mx-auto mb-4 md:mb-6" />
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">Junk Removal</h2>
            <ul className="mb-6 space-y-2 text-left text-gray-700">
              <li>✓ {UNIFORM_OFFERS.FREE_ESTIMATES}</li>
              <li>✓ {UNIFORM_OFFERS.SAME_DAY_SERVICE}</li>
              <li>✓ {UNIFORM_OFFERS.ECO_FRIENDLY}</li>
              <li>✓ {UNIFORM_OFFERS.LICENSED_INSURED}</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/junk-removal">View Junk Removal services</Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard
            variant="white"
            className="p-6 text-center transition-transform duration-300 hover:scale-105 md:p-8"
          >
            <IconContainer icon={Hammer} color="orange" className="mx-auto mb-4 md:mb-6" />
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">Light Demolition</h2>
            <ul className="mb-6 space-y-2 text-left text-gray-700">
              <li>✓ Structure tear-down & haul away</li>
              <li>✓ Safe, insured crew</li>
              <li>✓ {UNIFORM_OFFERS.UPFRONT_PRICING}</li>
              <li>✓ Debris cleanup included</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/light-demolition">Explore Light Demolition</Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard
            variant="white"
            className="p-6 text-center transition-transform duration-300 hover:scale-105 md:p-8"
          >
            <IconContainer icon={Lightbulb} color="green" className="mx-auto mb-4 md:mb-6" />
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">Cleaning Services</h2>
            <ul className="mb-6 space-y-2 text-left text-gray-700">
              <li>✓ Natural Products Used</li>
              <li>✓ Residential & Commercial</li>
              <li>✓ {UNIFORM_OFFERS.VETERAN_OWNED}</li>
              <li>✓ {UNIFORM_OFFERS.FLEXIBLE_SCHEDULING}</li>
            </ul>
            <ThemedButton theme="green" fullWidth asChild>
              <Link href="/cleaning">View Cleaning Services</Link>
            </ThemedButton>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
