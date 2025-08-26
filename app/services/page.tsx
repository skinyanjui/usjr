import type { Metadata } from "next"
import { ServiceCard } from "@/components/ui/service-card"
import { SectionHeader } from "@/components/ui/section-header"
import { ThemedButton } from "@/components/ui/themed-button"
import { GlassCard } from "@/components/ui/glass-card"
import { Truck, Recycle, Home, Building2, Trash2, Wrench } from "lucide-react"
import Link from "next/link"
import { settings } from "@/lib/cms-content"
import { trackQuoteClick } from "@/lib/quoteTracking"

export const metadata: Metadata = {
  title: "Professional Junk Removal & Cleaning Services | Uncle Sam Junk Removal",
  description:
    "Comprehensive junk removal, dumpster rental, and cleaning services in Evansville, Indiana. Eco-friendly disposal, free estimates, and reliable service throughout Southern Indiana.",
  keywords:
    "junk removal services, dumpster rental, cleaning services, Evansville Indiana, Southern Indiana, waste management, eco-friendly disposal",
}

export default function ServicesPage() {
  const junkRemovalServices = [
    {
      title: "General Junk Removal",
      description: "Complete household and office junk removal with eco-friendly disposal",
      image: "/junk-removal-evansville.png",
      price: "From $99",
      link: "/services/junk-removal",
      icon: Truck,
    },
    {
      title: "Hot Tub Removal",
      description: "Professional hot tub dismantling and removal service",
      image: "/hot-tub-removal-evansville.png",
      price: "From $299",
      link: "/services/hot-tub-removal",
      icon: Home,
    },
    {
      title: "Appliance Removal",
      description: "Safe removal and recycling of old appliances",
      image: "/appliance-removal-evansville.png",
      price: "From $75",
      link: "/services/appliance-removal",
      icon: Wrench,
    },
    {
      title: "Garage Cleanouts",
      description: "Complete garage cleaning and organization service",
      image: "/garage-cleanout-evansville.png",
      price: "From $199",
      link: "/services/garage-cleanout",
      icon: Building2,
    },
    {
      title: "Estate Cleanouts",
      description: "Compassionate and thorough estate cleanout services",
      image: "/estate-cleanout-evansville.png",
      price: "From $399",
      link: "/services/estate-cleanouts",
      icon: Home,
    },
    {
      title: "Mattress Removal",
      description: "Eco-friendly mattress disposal and recycling",
      image: "/mattress-removal-evansville.png",
      price: "From $49",
      link: "/services/mattress-removal",
      icon: Trash2,
    },
  ]

  const rentalServices = [
    {
      title: "Dumpster Rental",
      description: "Flexible dumpster rental for projects of all sizes",
      image: "/dumpster-rental-evansville.png",
      price: "From $299/week",
      link: "/services/dumpster-rental",
      icon: Truck,
    },
    {
      title: "Light Demolition",
      description: "Safe demolition services for small structures",
      image: "/light-demolition-evansville.png",
      price: "From $499",
      link: "/services/light-demolition",
      icon: Wrench,
    },
    {
      title: "Shed Removal",
      description: "Complete shed dismantling and removal",
      image: "/shed-removal-evansville.png",
      price: "From $199",
      link: "/services/shed-removal",
      icon: Building2,
    },
    {
      title: "Yard Waste Removal",
      description: "Seasonal yard cleanup and debris removal",
      image: "/yard-waste-removal-evansville.png",
      price: "From $149",
      link: "/services/yard-waste-removal",
      icon: Recycle,
    },
  ]

  const cleaningServices = [
    {
      title: "Residential Cleaning",
      description: "Professional home cleaning with natural products",
      image: "/natural-cleaning-service.png",
      price: "From $89",
      link: "/cleaning/residential",
      icon: Home,
    },
    {
      title: "Commercial Cleaning",
      description: "After-hours business cleaning services",
      image: "/commercial-office-cleaning.png",
      price: "From $149",
      link: "/cleaning/commercial",
      icon: Building2,
    },
    {
      title: "Deep Cleaning",
      description: "Comprehensive deep cleaning for homes and offices",
      image: "/natural-deep-cleaning.png",
      price: "From $199",
      link: "/cleaning/deep-clean",
      icon: Recycle,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeader
            title="Professional Services in Evansville"
            subtitle="Comprehensive junk removal, dumpster rental, and cleaning services for Southern Indiana"
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton theme="blue" size="lg" asChild>
              <Link
                href="/quote"
                prefetch
                onClick={() => trackQuoteClick({ location: "services-hero", label: "Get Free Quote", destination: "/quote" })}
              >
                Get Free Quote
              </Link>
            </ThemedButton>
            <ThemedButton theme="green" variant="outline" size="lg" asChild>
              <Link href={`tel:${settings.phoneE164}`}>Call {settings.phone}</Link>
            </ThemedButton>
          </div>
        </div>
      </section>

      {/* Junk Removal Services */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Junk Removal Services"
            subtitle="Professional removal services for homes and businesses"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {junkRemovalServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                price={service.price}
                link={service.link}
                icon={service.icon}
                color="red"
                category="Junk Removal"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dumpster & Demolition Services */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Dumpster & Demolition Services"
            subtitle="Rental and demolition solutions for larger projects"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {rentalServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                price={service.price}
                link={service.link}
                icon={service.icon}
                color="orange"
                category="Dumpster & Demo"
                size="small"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Services */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Professional Cleaning Services"
            subtitle="Eco-friendly cleaning with natural products"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {cleaningServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                price={service.price}
                link={service.link}
                icon={service.icon}
                color="green"
                category="Cleaning"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Service Areas"
            subtitle="Proudly serving Southern Indiana and Western Kentucky"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {[
              { name: "Evansville", href: "/locations/evansville" },
              { name: "Newburgh", href: "/locations/newburgh" },
              { name: "Henderson, KY", href: "/locations/henderson-ky" },
              { name: "Owensboro, KY", href: "/locations/owensboro-ky" },
              { name: "Boonville", href: "/locations/boonville" },
              { name: "Princeton", href: "/locations/princeton" },
            ].map((location, index) => (
              <GlassCard key={index} className="text-center p-4 hover:scale-105 transition-transform">
                <ThemedButton theme="blue" variant="ghost" asChild className="w-full">
                  <Link href={location.href}>{location.name}</Link>
                </ThemedButton>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get your free estimate today and experience the Uncle Sam difference. Professional, reliable, and
              eco-friendly service guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ThemedButton theme="red" size="lg" asChild>
                <Link
                  href="/quote"
                  prefetch
                  onClick={() => trackQuoteClick({ location: "services-cta", label: "Get Free Quote", destination: "/quote" })}
                >
                  Get Free Quote
                </Link>
              </ThemedButton>
              <ThemedButton theme="blue" variant="outline" size="lg" asChild>
                <Link href={`tel:${settings.phoneE164}`}>Call Now: {settings.phone}</Link>
              </ThemedButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
