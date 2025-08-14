import Link from "next/link"
import Image from "next/image"
import { ThemedButton } from "@/components/ui/themed-button"
import { GlassCard } from "@/components/ui/glass-card"
import { IconContainer } from "@/components/ui/icon-container"
import { Truck, Container, Lightbulb, Phone } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/junk-removal-evansville.png"
        alt="Junk removal crew in Evansville, IN"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={40}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center text-white mb-6">
          <h2 className="text-xl md:text-3xl font-semibold mb-2 text-red-400">
            Same-Day Junk Removal & Professional Cleaning
          </h2>
          <p className="text-lg md:text-xl text-gray-200">Serving Evansville, Newburgh & Southern Indiana</p>
        </div>

        <div className="text-center mb-16">
          <ThemedButton
            theme="red"
            className="w-full sm:w-auto px-6 py-3 md:px-12 md:py-4 rounded-full font-bold text-lg md:text-xl"
            asChild
          >
            <Link href="/quote" prefetch={false}>
              GET FREE INSTANT QUOTE
            </Link>
          </ThemedButton>
          <p className="text-gray-200 mt-2">No zipcode verification required • Same-day service available</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <GlassCard
            variant="white"
            className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <IconContainer icon={Truck} color="red" className="mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Junk Removal</h3>
            <ul className="text-left space-y-2 mb-6 text-gray-700">
              <li>✓ Free Estimates Given</li>
              <li>✓ Same Day Service Available</li>
              <li>✓ Eco-Friendly Disposal</li>
              <li>✓ Licensed & Insured</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/junk-removal" prefetch={false} aria-label="Learn more about Junk Removal">
                Learn more about Junk Removal
              </Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard
            variant="white"
            className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <IconContainer icon={Container} color="red" className="mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Dumpster Rental</h3>
            <ul className="text-left space-y-2 mb-6 text-gray-700">
              <li>✓ Delivery & Pick Up | 7 Days</li>
              <li>✓ Residential & Commercial</li>
              <li>✓ All Inclusive Pricing</li>
              <li>✓ Multiple Sizes Available</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/dumpster-rental" prefetch={false} aria-label="Learn more about Dumpster Rental">
                Learn more about Dumpster Rental
              </Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard
            variant="white"
            className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <IconContainer icon={Lightbulb} color="green" className="mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Cleaning Services</h3>
            <ul className="text-left space-y-2 mb-6 text-gray-700">
              <li>✓ Natural Products Used</li>
              <li>✓ Residential & Commercial</li>
              <li>✓ Woman-Owned Business</li>
              <li>✓ Flexible Scheduling</li>
            </ul>
            <ThemedButton theme="green" fullWidth asChild>
              <Link href="/cleaning" prefetch={false} aria-label="Learn more about Cleaning Services">
                Learn more about Cleaning Services
              </Link>
            </ThemedButton>
          </GlassCard>
        </div>

        <GlassCard variant="white" className="mt-16 p-6 md:p-8 max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-base md:text-lg mb-6 text-gray-700">
            Call now for your free estimate and same-day service in Evansville and surrounding areas!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18126101657"
              className="inline-flex items-center gap-2 rounded-lg text-white ring-1 ring-white/30 px-6 sm:px-8 hover:bg-red-700/45 transition-colors font-semibold text-base sm:text-lg py-1 bg-red-600"
            >
              <Phone className="h-4 w-4" /> (812) 610-1657
            </a>
            <ThemedButton
              variant="outline"
              theme="red"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 rounded-full font-semibold text-base sm:text-lg"
              asChild
            >
              <Link href="/quote" prefetch={false}>
                GET FREE QUOTE
              </Link>
            </ThemedButton>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
