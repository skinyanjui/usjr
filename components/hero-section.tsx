'use client'

import Link from 'next/link'
import { ThemedButton } from '@/components/ui/themed-button'
import { GlassCard } from '@/components/ui/glass-card'
import { Shield, Award } from 'lucide-react'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { UNIFORM_OFFERS } from '@/lib/uniform-offers'
import { RotatingLocation } from '@/components/rotating-location'

const LOCATIONS = [
  'Evansville',
  'Newburgh',
  'Henderson',
  'Owensboro',
  'Boonville',
  'Princeton',
  'Mount Carmel',
  'Mount Vernon',
  'New Harmony',
]

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[75vh] items-center justify-center bg-blue-800 text-white md:min-h-[90vh]"
    >
      <div className="absolute inset-0 bg-blue-800" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 pt-8 md:py-12 md:pt-12">
        <div className="mb-6 text-center text-white md:mb-8">
          <h1 className="my-2 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Same-Day Junk Removal & Cleaning in <RotatingLocation locations={LOCATIONS} />
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-base text-white/90 sm:text-lg md:text-xl lg:text-2xl">
            Local, veteran-owned pros serving the Tri-State area
          </p>
        </div>

        <div className="mb-12 text-center md:mb-16">
          <QuoteCtaLink location="hero" label={UNIFORM_OFFERS.GET_FREE_QUOTE} />
          <p className="mt-3 text-sm text-white/90 sm:text-base">
            See pricing, text photos, and get an exact quote —{' '}
            {UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} available
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
          {/* Junk Removal Card */}
          <GlassCard
            variant="white"
            className="flex flex-col p-4 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:p-6"
          >
            <div className="mb-3 flex items-center justify-center">
              <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                <Shield className="h-3.5 w-3.5" />
                Veteran Owned
              </div>
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">Junk Removal</h2>

            <p className="mb-4 text-sm text-gray-600">
              Professional junk removal services for homes and businesses in the Tri-State area.
            </p>

            <ul className="mb-4 space-y-2 text-left text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>{UNIFORM_OFFERS.FREE_ESTIMATES}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>{UNIFORM_OFFERS.SAME_DAY_SERVICE}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>{UNIFORM_OFFERS.ECO_FRIENDLY}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>{UNIFORM_OFFERS.LICENSED_INSURED}</span>
              </li>
            </ul>

            <div className="mt-auto flex flex-col gap-2 sm:flex-row">
              <ThemedButton theme="red" asChild className="flex-1">
                <Link href="/services/junk-removal" className="text-sm font-semibold">
                  View Services
                </Link>
              </ThemedButton>
              <Link
                href="/quote"
                className="flex-1 rounded-lg border-2 border-red-600 bg-transparent px-4 py-2 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
              >
                Get Quote
              </Link>
            </div>
          </GlassCard>

          {/* Cleaning Services Card */}
          <GlassCard
            variant="white"
            className="flex flex-col p-4 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:p-6"
          >
            <div className="mb-3 flex items-center justify-center">
              <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                <Award className="h-3.5 w-3.5" />
                Women Owned
              </div>
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">Cleaning Services</h2>

            <p className="mb-4 text-sm text-gray-600">
              Eco-friendly residential and commercial cleaning services tailored to your needs.
            </p>

            <ul className="mb-4 space-y-2 text-left text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>Natural Products Used</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>Residential & Commercial</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>Licensed & Insured</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span>{UNIFORM_OFFERS.FLEXIBLE_SCHEDULING}</span>
              </li>
            </ul>

            <div className="mt-auto flex flex-col gap-2 sm:flex-row">
              <ThemedButton theme="green" asChild className="flex-1">
                <Link href="/cleaning" className="text-sm font-semibold">
                  View Services
                </Link>
              </ThemedButton>
              <Link
                href="/quote"
                className="flex-1 rounded-lg border-2 border-green-600 bg-transparent px-4 py-2 text-center text-sm font-semibold text-green-600 transition-all hover:bg-green-50"
              >
                Get Quote
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
