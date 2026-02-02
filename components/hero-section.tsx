import Image from 'next/image'
import { Shield, Clock } from 'lucide-react'
import { HeroQuoteForm } from '@/components/hero-quote-form'
import { RotatingLocation } from '@/components/rotating-location'
import { settings } from '@/lib/cms-content'

export function HeroSection() {
  return (
    <section className="border-border bg-background relative overflow-hidden border-b">
      {/* Background Image - Opacity 20% */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-junk-v3.png"
          alt="Professional red junk removal truck"
          fill
          className="object-cover object-center opacity-80"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="from-background via-background/50 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-20">
        {/* Split layout: Story + Quote Form */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Story-focused content */}
          <div className="p-6">
            {/* Eyebrow */}
            <div className="text-primary mb-4 flex flex-row flex-nowrap items-center gap-1 text-xs font-medium tracking-wide uppercase sm:gap-2 sm:text-sm">
              <span className="shrink-0">Veteran-Owned</span>
              <span className="shrink-0">·</span>
              <span className="shrink-0">
                Serving{' '}
                <span className="text-foreground decoration-primary/30 font-bold underline underline-offset-4">
                  <RotatingLocation locations={settings.serviceAreas} />
                </span>
              </span>
            </div>

            {/* Main headline - Problem → Solution */}
            <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Your Space, <span className="text-primary">Cleared</span>.
              <br />
              <span className="text-foreground font-medium">Your Peace of Mind, </span>
              <span className="text-primary">Restored</span>.
            </h1>

            {/* Supporting copy */}
            <p className="text-foreground mb-8 text-lg font-medium">
              From cluttered garages to full estate cleanouts, we handle the heavy lifting so you
              can reclaim your space. Same-day service available.
            </p>

            {/* Trust indicators */}
            <div className="text-foreground flex items-center gap-3 sm:gap-6">
              <div className="bg-background/50 border-border/50 flex shrink-0 items-center gap-2 rounded-lg border px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
                <Shield className="text-primary h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="text-xs font-semibold whitespace-nowrap sm:text-sm">
                  Licensed & Insured
                </span>
              </div>
              <div className="bg-background/50 border-border/50 flex shrink-0 items-center gap-2 rounded-lg border px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
                <Clock className="text-primary h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="text-xs font-semibold whitespace-nowrap sm:text-sm">
                  Same-Day Service
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quote Form */}
          <div className="w-full lg:max-w-md lg:justify-self-end">
            <HeroQuoteForm />
          </div>
        </div>
      </div>
    </section>
  )
}
