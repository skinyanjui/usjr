import { Truck, Container, Sparkles, Home, Building2, Sofa, Hammer, Calculator, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ServiceCard } from "@/components/ui/service-card"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { ThemedButton } from "@/components/ui/themed-button"

export function ServicesSection() {
  const services = [
    // Junk Removal Services (3 cards)
    {
      title: "Furniture Removal",
      description: "Quick removal of old furniture, appliances, and household items.",
      image: "/junk-removal-evansville.png",
      price: "Starting at $99",
      icon: Sofa,
      color: "red" as const,
      link: "/services/junk-removal",
      category: "Junk Removal",
    },
    {
      title: "Estate Cleanouts",
      description: "Complete property cleanouts for estates and foreclosures.",
      image: "/junk-removal-evansville.png",
      price: "Starting at $299",
      icon: Home,
      color: "red" as const,
      link: "/services/estate-cleanouts",
      category: "Junk Removal",
    },
    {
      title: "Construction Debris",
      description: "Safe removal of construction and renovation waste.",
      image: "/junk-removal-evansville.png",
      price: "Starting at $199",
      icon: Hammer,
      color: "red" as const,
      link: "/services/light-demolition",
      category: "Junk Removal",
    },
    // Dumpster Rental Services (3 cards)
    {
      title: "Residential Dumpsters",
      description: "Perfect for home cleanouts and small renovation projects.",
      image: "/placeholder-0jxh0.png",
      price: "Starting at $299",
      icon: Home,
      color: "orange" as const,
      link: "/services/dumpster-rental",
      category: "Dumpster Rental",
    },
    {
      title: "Commercial Dumpsters",
      description: "Large capacity dumpsters for business and construction sites.",
      image: "/placeholder-0jxh0.png",
      price: "Starting at $499",
      icon: Building2,
      color: "orange" as const,
      link: "/services/dumpster-rental",
      category: "Dumpster Rental",
    },
    {
      title: "Roll-Off Containers",
      description: "Flexible rental periods for ongoing projects and cleanouts.",
      image: "/placeholder-0jxh0.png",
      price: "Starting at $399",
      icon: Container,
      color: "orange" as const,
      link: "/services/dumpster-rental",
      category: "Dumpster Rental",
    },
    // Cleaning Services (3 cards)
    {
      title: "Deep Cleaning",
      description: "Comprehensive deep cleaning with natural, eco-friendly products.",
      image: "/natural-cleaning-service.png",
      price: "Starting at $149",
      icon: Sparkles,
      color: "green" as const,
      link: "/cleaning/deep-clean",
      category: "Cleaning",
    },
    {
      title: "Move-In/Move-Out",
      description: "Complete cleaning for property transitions and turnovers.",
      image: "/natural-cleaning-service.png",
      price: "Starting at $199",
      icon: Truck,
      color: "green" as const,
      link: "/cleaning/move-in-move-out",
      category: "Cleaning",
    },
    {
      title: "Commercial Cleaning",
      description: "Professional office and business cleaning after hours.",
      image: "/natural-cleaning-service.png",
      price: "Starting at $89",
      icon: Building2,
      color: "green" as const,
      link: "/cleaning/commercial",
      category: "Cleaning",
    },
  ]

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Our Services"
          description="Professional junk removal, dumpster rental, and cleaning services in Evansville, Indiana. Choose from our comprehensive range of specialized services."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
              price={service.price}
              icon={service.icon}
              color={service.color}
              link={service.link}
              category={service.category}
              size="small"
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <GlassCard className="p-6 text-center border-blue-200 bg-blue-50">
            <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compare Services</h3>
            <p className="text-gray-600 mb-4">
              Not sure which service is right for you? Compare features, pricing, and benefits side-by-side.
            </p>
            <ThemedButton theme="blue" asChild>
              <Link href="/compare">Compare All Services</Link>
            </ThemedButton>
          </GlassCard>

          <GlassCard className="p-6 text-center border-red-200 bg-red-50">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Service</h3>
            <p className="text-gray-600 mb-4">
              Need immediate junk removal? We provide 24/7 emergency response with 2-hour arrival time.
            </p>
            <ThemedButton theme="red" asChild>
              <Link href="/emergency">Emergency Service</Link>
            </ThemedButton>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
