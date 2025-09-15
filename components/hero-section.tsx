import Link from 'next/link'
import Image from 'next/image'
import { ThemedButton } from '@/components/ui/themed-button'
import { GlassCard } from '@/components/ui/glass-card'
import { IconContainer } from '@/components/ui/icon-container'
import { Truck, Container, Lightbulb } from 'lucide-react'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { UNIFORM_OFFERS } from '@/lib/uniform-offers'

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[80vh] items-center justify-center md:min-h-screen"
    >
      <Image
        src="/hero-background.png"
        alt="Junk removal crew in Evansville, IN"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-36 pb-20">
        <div className="mb-8 text-center text-white">
          <h1 className="my-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Same-Day Junk Removal, Dumpster Rental & Cleaning in Evansville, IN
          </h1>
          <p className="mx-auto max-w-4xl text-lg text-white sm:text-xl md:text-2xl">
            Local, veteran-owned pros serving Evansville, Newburgh & Southern Indiana
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
            <IconContainer icon={Container} color="red" className="mx-auto mb-4 md:mb-6" />
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">Dumpster Rental</h2>
            <ul className="mb-6 space-y-2 text-left text-gray-700">
              <li>✓ Delivery & Pick Up | 7 Days</li>
              <li>✓ Residential & Commercial</li>
              <li>✓ {UNIFORM_OFFERS.UPFRONT_PRICING}</li>
              <li>✓ Multiple Sizes Available</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/dumpster-rental">Explore Dumpster Rental options</Link>
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
