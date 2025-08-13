"use client"

import Link from "next/link"
import Image from "next/image"
import heroImage from "@/public/junk-removal-evansville.png"
import { ThemedButton } from "@/components/ui/themed-button"
import { GlassCard } from "@/components/ui/glass-card"
import { IconContainer } from "@/components/ui/icon-container"
import { Truck, Container, Lightbulb } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      <Image
        src={heroImage}
        alt="Junk removal crew in Evansville, IN"
        fill
        priority
        sizes="100vw"
        quality={70}
        placeholder="blur"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center text-white mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">Uncle Sam Junk Removal</h1>
          <h2 className="text-xl md:text-3xl font-semibold mb-4 text-red-400">
            Same-Day Junk Removal & Professional Cleaning
          </h2>
          <p className="text-lg md:text-xl text-gray-200">Serving Evansville, Newburgh & Southern Indiana</p>
        </div>

        <div className="text-center mb-16">
          <ThemedButton theme="red" className="w-full sm:w-auto px-6 py-3 md:px-12 md:py-4 rounded-full font-bold text-lg md:text-xl" asChild>
            <Link href="/quote">GET FREE INSTANT QUOTE</Link>
          </ThemedButton>
          <p className="text-gray-200 mt-4">No zipcode verification required • Same-day service available</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <GlassCard className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300">
            <IconContainer icon={Truck} color="red" className="mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-bold mb-4">Junk Removal</h3>
            <ul className="text-left space-y-2 mb-6 text-gray-200">
              <li>✓ Free Estimates Given</li>
              <li>✓ Same Day Service Available</li>
              <li>✓ Eco-Friendly Disposal</li>
              <li>✓ Licensed & Insured</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/junk-removal" aria-label="Learn more about Junk Removal">LEARN MORE</Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300">
            <IconContainer icon={Container} color="red" className="mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-bold mb-4">Dumpster Rental</h3>
            <ul className="text-left space-y-2 mb-6 text-gray-200">
              <li>✓ Delivery & Pick Up | 7 Days</li>
              <li>✓ Residential & Commercial</li>
              <li>✓ All Inclusive Pricing</li>
              <li>✓ Multiple Sizes Available</li>
            </ul>
            <ThemedButton theme="red" fullWidth asChild>
              <Link href="/services/dumpster-rental" aria-label="Learn more about Dumpster Rental">LEARN MORE</Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard className="p-6 md:p-8 text-center hover:scale-105 transition-transform duration-300">
            <IconContainer icon={Lightbulb} color="green" className="mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-bold mb-4">Cleaning Services</h3>
            <ul className="text-left space-y-2 mb-6 text-gray-200">
              <li>✓ Natural Products Used</li>
              <li>✓ Residential & Commercial</li>
              <li>✓ Woman-Owned Business</li>
              <li>✓ Flexible Scheduling</li>
            </ul>
            <ThemedButton theme="green" fullWidth asChild>
              <Link href="/cleaning" aria-label="Learn more about Cleaning Services">LEARN MORE</Link>
            </ThemedButton>
          </GlassCard>
        </div>

        <GlassCard className="mt-16 p-6 md:p-8 max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-base md:text-lg mb-6 text-gray-200">
            Call now for your free estimate and same-day service in Evansville and surrounding areas!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton theme="red" className="w-full sm:w-auto px-6 py-3 sm:px-8 rounded-full font-semibold text-base sm:text-lg" asChild>
              <a href="tel:+18126101657">📞 (812) 610-1657</a>
            </ThemedButton>
            <ThemedButton
              variant="outline"
              theme="red"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 rounded-full font-semibold text-base sm:text-lg"
              asChild
            >
              <Link href="/quote">GET FREE QUOTE</Link>
            </ThemedButton>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
