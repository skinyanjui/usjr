'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ThemedButton } from '@/components/ui/themed-button'
import { GlassCard } from '@/components/ui/glass-card'
import { IconContainer } from '@/components/ui/icon-container'
import { Truck, Hammer, Lightbulb } from 'lucide-react'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { UNIFORM_OFFERS } from '@/lib/uniform-offers'

const HERO_CITIES = [
  'Evansville, IN',
  'Newburgh, IN',
  'Henderson, KY',
  'Owensboro, KY',
  'Boonville, IN',
]

const ROTATION_INTERVAL_MS = 5000

function useRotatingCity() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches)
    }

    setShouldReduceMotion(mediaQuery.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }

    mediaQuery.addListener(handleChange)

    return () => {
      mediaQuery.removeListener(handleChange)
    }
  }, [])

  useEffect(() => {
    if (HERO_CITIES.length < 2 || shouldReduceMotion) {
      return
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex(index => (index + 1) % HERO_CITIES.length)
    }, ROTATION_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [shouldReduceMotion])

  return HERO_CITIES[currentIndex]
}

export function HeroSection() {
  const rotatingCity = useRotatingCity()

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
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div className="order-2 text-center text-white md:order-1 md:text-left">
            <h1 className="my-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Same-Day Junk Removal & Cleaning in{' '}
              <span
                aria-live="polite"
                className="inline-block min-w-[14ch] text-white transition-opacity duration-500"
              >
                {rotatingCity}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl md:mx-0 md:text-2xl">
              Local, veteran-owned pros serving Evansville, Newburgh & Southern Indiana with
              full-service hauling and light demolition support
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-start">
              <QuoteCtaLink location="hero" label={UNIFORM_OFFERS.GET_FREE_QUOTE} />
              <p className="max-w-sm text-sm text-white/80 md:text-base">
                See pricing, text photos, and get an exact quote —{' '}
                {UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} available
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative mx-auto w-full max-w-xl">
              <div className="relative z-10 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[3rem] bg-red-600 shadow-[0_40px_90px_rgba(15,23,42,0.55)]">
                <span className="text-2xl font-semibold tracking-[0.3em] text-white/70 uppercase sm:text-3xl">
                  Uniform Pros
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
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
