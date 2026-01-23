import Image from 'next/image'
import { Shield, Clock } from 'lucide-react'
import { HeroQuoteForm } from '@/components/hero-quote-form'
import { RotatingLocation } from '@/components/rotating-location'
import { settings } from '@/lib/cms-content'

export function HeroSection() {
  return (
    <section className="relative border-b border-border overflow-hidden bg-background">
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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-20">
        {/* Split layout: Story + Quote Form */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Story-focused content */}
          <div className="p-6">
            {/* Eyebrow */}
            <div className="text-primary mb-4 text-sm font-medium tracking-wide uppercase flex flex-row items-center gap-2">
              <span>Veteran-Owned</span>
              <span>·</span>
              <span>Serving <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4"><RotatingLocation locations={settings.serviceAreas} /></span></span>
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
              From cluttered garages to full estate cleanouts, we handle the heavy lifting
              so you can reclaim your space. Same-day service available.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center gap-3 sm:gap-6 text-foreground">
              <div className="flex items-center gap-2 rounded-lg bg-background/50 px-2.5 py-1.5 backdrop-blur-sm border border-border/50 shadow-sm shrink-0">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-background/50 px-2.5 py-1.5 backdrop-blur-sm border border-border/50 shadow-sm shrink-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">Same-Day Service</span>
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
