'use client'

import { Shield, Clock } from 'lucide-react'
import { HeroQuoteForm } from '@/components/hero-quote-form'

export function HeroSection() {
  return (
    <section className="bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Split layout: Story + Quote Form */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Story-focused content */}
          <div>
            {/* Eyebrow */}
            <p className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
              Veteran-Owned · Serving the Tri-State Area
            </p>

            {/* Main headline - Problem → Solution */}
            <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Your Space, Cleared.
              <br />
              <span className="text-muted-foreground">Your Peace of Mind, Restored.</span>
            </h1>

            {/* Supporting copy */}
            <p className="text-muted-foreground mb-8 text-lg">
              From cluttered garages to full estate cleanouts, we handle the heavy lifting
              so you can reclaim your space. Same-day service available.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Same-Day Service</span>
              </div>
            </div>
          </div>

          {/* Right: Quote Form */}
          <div className="lg:justify-self-end lg:max-w-md w-full">
            <HeroQuoteForm />
          </div>
        </div>
      </div>
    </section>
  )
}
