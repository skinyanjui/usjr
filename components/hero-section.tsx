'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    <section id="home" className="relative min-h-[60vh] overflow-hidden">
      {/* Background Image - Full junk removal truck */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/1051816/pexels-photo-1051816.jpeg?auto=compress&cs=tinysrgb&w=2070"
          alt="Professional dump truck for junk removal services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
          <h1 className="mb-6 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Junk Removal & Cleaning Services in
            <br />
            <RotatingLocation locations={LOCATIONS} />
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 sm:text-xl">
            Veteran-owned and operated. Serving the Tri-State area with same-day service.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="linear-button flex min-h-[48px] items-center"
            >
              Get Free Quote
            </Link>
            <Link
              href="/services/junk-removal"
              className="linear-border flex min-h-[48px] items-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10 hover:shadow-lg"
            >
              View Services
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="font-medium">Veteran-Owned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
