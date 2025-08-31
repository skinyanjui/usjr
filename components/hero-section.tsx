import Link from "next/link"
import Image from "next/image"
import { ThemedButton } from "@/components/ui/themed-button"
import { GlassCard } from "@/components/ui/glass-card"
import { IconContainer } from "@/components/ui/icon-container"
import { Truck, Container, Lightbulb } from "lucide-react"
import { QuoteCtaLink } from "@/components/quote-cta-link"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center">
      <Image
        src="https://source.unsplash.com/1600x900/?junk,truck"
        alt="Junk removal crew in Evansville, IN"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={40}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-36 pb-20">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white my-2">
            Same-Day Junk Removal, Dumpster Rental & Cleaning in Evansville, IN
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto">
            Local, veteran-owned pros serving Evansville, Newburgh & Southern Indiana
          </p>
        </div>

        <div className="text-center mb-16">
          <QuoteCtaLink location="hero" label="Get Free Quote" />
          <p className="text-white mt-2">
            See pricing, text photos, and get an exact quote — same-day service available
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <GlassCard
            variant="white"
            className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <IconContainer icon={Truck} color="red" className="mx-auto mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Junk Removal</h2>
            <ul className="text-left space-y-2 mb-6 text-gray-700">
              <li>✓ Free Estimates Given</li>
              <li>✓ Same Day Service Available</li>
              <li>✓ Eco-Friendly Disposal</li>
              <li>✓ Licensed & Insured</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/junk-removal">
                View Junk Removal services
              </Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard
            variant="white"
            className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <IconContainer icon={Container} color="red" className="mx-auto mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Dumpster Rental</h2>
            <ul className="text-left space-y-2 mb-6 text-gray-700">
              <li>✓ Delivery & Pick Up | 7 Days</li>
              <li>✓ Residential & Commercial</li>
              <li>✓ All Inclusive Pricing</li>
              <li>✓ Multiple Sizes Available</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/dumpster-rental">
                Explore Dumpster Rental options
              </Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard
            variant="white"
            className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <IconContainer icon={Lightbulb} color="green" className="mx-auto mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Cleaning Services</h2>
            <ul className="text-left space-y-2 mb-6 text-gray-700">
              <li>✓ Natural Products Used</li>
              <li>✓ Residential & Commercial</li>
              <li>✓ Woman-Owned Business</li>
              <li>✓ Flexible Scheduling</li>
            </ul>
            <ThemedButton theme="green" fullWidth asChild>
              <Link href="/cleaning">
                View Cleaning Services
              </Link>
            </ThemedButton>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
