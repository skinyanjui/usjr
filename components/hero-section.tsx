import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { RotatingLocation } from '@/components/rotating-location'
import { settings } from '@/lib/cms-content'

interface HeroSectionProps {
  initialIndex?: number
}

export function HeroSection({ initialIndex }: HeroSectionProps) {
  return (
    <section className="bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-junk-v3.png"
          alt=""
          fill
          className="object-cover object-center opacity-30"
          priority
          sizes="100vw"
        />
        <div className="from-background via-background/70 to-background/30 absolute inset-0 bg-gradient-to-b" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
        <p className="text-muted-foreground mb-6 text-sm font-medium tracking-wide uppercase">
          Serving{' '}
          <span className="text-foreground font-semibold">
            <RotatingLocation locations={settings.serviceAreas} initialIndex={initialIndex ?? 0} />
          </span>
        </p>

        <h1 className="text-foreground mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Your space, cleared.
        </h1>

        <p className="text-muted-foreground mb-10 max-w-xl text-lg sm:text-xl">
          Same-day junk removal across the Tri-State. Transparent pricing, zero hassle.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/quote"
            prefetch
            className="bg-primary text-primary-foreground rounded-full px-8 py-3 text-base font-semibold transition-opacity hover:opacity-90"
          >
            Get a free quote
          </Link>
          <a
            href={`tel:${settings.phoneE164}`}
            className="text-foreground flex items-center gap-2 px-4 py-3 text-base font-medium transition-opacity hover:opacity-80"
          >
            <Phone className="h-4 w-4" />
            {settings.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
