import type { Metadata } from "next"
import { ServiceCard } from "@/components/ui/service-card"
import { SectionHeader } from "@/components/ui/section-header"
import { ThemedButton } from "@/components/ui/themed-button"
import { GlassCard } from "@/components/ui/glass-card"
import { Truck, Recycle, Home, Building2, Trash2, Wrench } from "lucide-react"

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
      price: "Starting at $99",
      href: "/services/junk-removal",
      icon: Truck,
    },
    {
      title: "Hot Tub Removal",
      description: "Professional hot tub dismantling and removal service",
      image: "/hot-tub-removal-evansville.png",
      price: "Starting at $299",
      href: "/services/hot-tub-removal",
      icon: Home,
    },
    {
      title: "Appliance Removal",
      description: "Safe removal and recycling of old appliances",
      image: "/appliance-removal-evansville.png",
      price: "Starting at $75",
      href: "/services/appliance-removal",
      icon: Wrench,
    },
    {
      title: "Garage Cleanouts",
      description: "Complete garage cleaning and organization service",
      image: "/garage-cleanout-evansville.png",
      price: "Starting at $199",
      href: "/services/garage-cleanout",
      icon: Building2,
    },
    {
      title: "Estate Cleanouts",
      description: "Compassionate and thorough estate cleanout services",
      image: "/estate-cleanout-evansville.png",
      price: "Starting at $399",
      href: "/services/estate-cleanouts",
      icon: Home,
    },
    {
      title: "Mattress Removal",
      description: "Eco-friendly mattress disposal and recycling",
      image: "/mattress-removal-evansville.png",
      price: "Starting at $49",
      href: "/services/mattress-removal",
      icon: Trash2,
    },
  ]

  const rentalServices = [
    {
      title: "Dumpster Rental",
      description: "Flexible dumpster rental for projects of all sizes",
      image: "/dumpster-rental-evansville.png",
      price: "Starting at $299/week",
      href: "/services/dumpster-rental",
      icon: Truck,
    },
    {
      title: "Light Demolition",
      description: "Safe demolition services for small structures",
      image: "/light-demolition-evansville.png",
      price: "Starting at $499",
      href: "/services/light-demolition",
      icon: Wrench,
    },
    {
      title: "Shed Removal",
      description: "Complete shed dismantling and removal",
      image: "/shed-removal-evansville.png",
      price: "Starting at $199",
      href: "/services/shed-removal",
      icon: Building2,
    },
    {
      title: "Yard Waste Removal",
      description: "Seasonal yard cleanup and debris removal",
      image: "/yard-waste-removal-evansville.png",
      price: "Starting at $149",
      href: "/services/yard-waste-removal",
      icon: Recycle,
    },
  ]

  const cleaningServices = [
    {
      title: "Residential Cleaning",
      description: "Professional home cleaning with natural products",
      image: "/natural-cleaning-service.png",
      price: "Starting at $89",
      href: "/cleaning/residential",
      icon: Home,
    },
    {
      title: "Commercial Cleaning",
      description: "After-hours business cleaning services",
      image: "/commercial-office-cleaning.png",
      price: "Starting at $149",
      href: "/cleaning/commercial",
      icon: Building2,
    },
    {
      title: "Deep Cleaning",
      description: "Comprehensive deep cleaning for homes and offices",
      image: "/natural-deep-cleaning.png",
      price: "Starting at $199",
      href: "/cleaning/deep-clean",
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
            theme="blue"
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton theme="blue" size="lg" href="/quote">
              Get Free Quote
            </ThemedButton>
            <ThemedButton theme="green" variant="outline" size="lg" href="tel:812-555-0123">
              Call (812) 555-0123
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
            theme="red"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {junkRemovalServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                price={service.price}
                href={service.href}
                icon={service.icon}
                theme="red"
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
            theme="orange"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {rentalServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                price={service.price}
                href={service.href}
                icon={service.icon}
                theme="orange"
                size="sm"
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
            theme="green"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {cleaningServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                price={service.price}
                href={service.href}
                icon={service.icon}
                theme="green"
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
            theme="blue"
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
                <ThemedButton theme="blue" variant="ghost" href={location.href} className="w-full">
                  {location.name}
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
              <ThemedButton theme="red" size="lg" href="/quote">
                Get Free Quote
              </ThemedButton>
              <ThemedButton theme="blue" variant="outline" size="lg" href="tel:812-555-0123">
                Call Now: (812) 555-0123
              </ThemedButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
