'use client'

import Link from 'next/link'
import { RotatingLocation } from '@/components/rotating-location'

const LOCATIONS = ['Evansville', 'Newburgh', 'Henderson', 'Owensboro']

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[60vh] items-center justify-center bg-blue-800 text-white"
    >
      <div className="absolute inset-0 bg-blue-800" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-16 text-center">
        <h1 className="mb-6 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Junk Removal & Cleaning Services in
          <br />
          <RotatingLocation locations={LOCATIONS} />
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 sm:text-xl">
          Veteran-owned and operated. Serving the Tri-State area with same-day service.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/quote"
            className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-800 transition-all hover:bg-gray-100"
          >
            Get Free Quote
          </Link>
          <Link
            href="/services/junk-removal"
            className="rounded-lg border-2 border-white bg-transparent px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-white/10"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  )
}
