import { Truck, Container, Sparkles, Home, Building2, Sofa, Hammer } from "lucide-react"

export function ServicesSection() {
  const services = [
    // Junk Removal Services (3 cards)
    {
      title: "Furniture Removal",
      description: "Quick removal of old furniture, appliances, and household items.",
      image: "/junk-removal-evansville.png",
      price: "From $99",
      icon: Sofa,
      color: "red" as const,
      link: "/services/junk-removal",
      category: "Junk Removal",
    },
    {
      title: "Estate Cleanouts",
      description: "Complete property cleanouts for estates and foreclosures.",
      image: "/junk-removal-evansville.png",
      price: "From $299",
      icon: Home,
      color: "red" as const,
      link: "/services/estate-cleanouts",
      category: "Junk Removal",
    },
    {
      title: "Construction Debris",
      description: "Safe removal of construction and renovation waste.",
      image: "/junk-removal-evansville.png",
      price: "From $199",
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
      price: "From $299",
      icon: Home,
      color: "orange" as const,
      link: "/services/dumpster-rental",
      category: "Dumpster Rental",
    },
    {
      title: "Commercial Dumpsters",
      description: "Large capacity dumpsters for business and construction sites.",
      image: "/placeholder-0jxh0.png",
      price: "From $499",
      icon: Building2,
      color: "orange" as const,
      link: "/services/dumpster-rental",
      category: "Dumpster Rental",
    },
    {
      title: "Roll-Off Containers",
      description: "Flexible rental periods for ongoing projects and cleanouts.",
      image: "/placeholder-0jxh0.png",
      price: "From $399",
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
      price: "From $149",
      icon: Sparkles,
      color: "green" as const,
      link: "/cleaning/deep-clean",
      category: "Cleaning",
    },
    {
      title: "Move-In/Move-Out",
      description: "Complete cleaning for property transitions and turnovers.",
      image: "/natural-cleaning-service.png",
      price: "From $199",
      icon: Truck,
      color: "green" as const,
      link: "/cleaning/move-in-move-out",
      category: "Cleaning",
    },
    {
      title: "Commercial Cleaning",
      description: "Professional office and business cleaning after hours.",
      image: "/natural-cleaning-service.png",
      price: "From $89",
      icon: Building2,
      color: "green" as const,
      link: "/cleaning/commercial",
      category: "Cleaning",
    },
  ]

  return null
}
