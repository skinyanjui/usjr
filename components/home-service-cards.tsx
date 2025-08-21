"use client"

import { ServiceCard } from "@/components/ui/service-card"
import { Trash2, Truck, Sparkles } from "lucide-react"

export function HomeServiceCards() {
  const cards = [
    // Junk Removal (Residential, Commercial, Property Mgmt)
    {
      title: "Residential Junk Removal",
      description: "Furniture, appliances, garages, basements — fast, friendly haul away.",
      image: "/junk-removal-evansville.png",
      price: "Free quotes",
      icon: Trash2,
      color: "red" as const,
      link: "/services",
      category: "Residential",
    },
    {
      title: "Commercial Junk Removal",
      description: "Offices, storefronts, warehouses — clear-outs done after hours.",
      image: "/estate-cleanout-evansville.png",
      price: "Free quotes",
      icon: Trash2,
      color: "red" as const,
      link: "/services",
      category: "Commercial",
    },
    {
      title: "Property Mgmt Junk Removal",
      description: "Tenant turnovers and cleanouts to speed up your vacancy times.",
      image: "/rental-turnover-cleanup.png",
      price: "Free quotes",
      icon: Trash2,
      color: "red" as const,
      link: "/services",
      category: "Property Mgmt",
    },

    // Dumpster Rental (Residential, Commercial, Property Mgmt)
    {
      title: "Residential Dumpster Rental",
      description: "Perfect for renovations, cleanouts, and weekend projects.",
      image: "/dumpster-rental-evansville.png",
      price: "Flat-rate pricing",
      icon: Truck,
      color: "blue" as const,
      link: "/services",
      category: "Residential",
    },
    {
      title: "Commercial Dumpster Rental",
      description: "Reliable delivery and pickup for business and construction sites.",
      image: "/dumpster-rental-evansville.png",
      price: "Flat-rate pricing",
      icon: Truck,
      color: "blue" as const,
      link: "/services",
      category: "Commercial",
    },
    {
      title: "Property Mgmt Dumpster Rental",
      description: "Streamline turnovers with timely dumpster placement and removal.",
      image: "/dumpster-rental-evansville.png",
      price: "Flat-rate pricing",
      icon: Truck,
      color: "blue" as const,
      link: "/services",
      category: "Property Mgmt",
    },

    // Cleaning (Residential, Commercial, Property Mgmt)
    {
      title: "Residential Cleaning",
      description: "Natural products, deep cleans, and recurring home service.",
      image: "/natural-cleaning-service.png",
      price: "Free estimates",
      icon: Sparkles,
      color: "green" as const,
      link: "/services",
      category: "Residential",
    },
    {
      title: "Commercial Cleaning",
      description: "Professional after-hours office cleaning to fit your schedule.",
      image: "/after-hours-cleaning.png",
      price: "Free estimates",
      icon: Sparkles,
      color: "green" as const,
      link: "/services",
      category: "Commercial",
    },
    {
      title: "Property Mgmt Cleaning",
      description: "Move-out deep cleans for faster, spotless turnovers.",
      image: "/natural-deep-cleaning.png",
      price: "Free estimates",
      icon: Sparkles,
      color: "green" as const,
      link: "/services",
      category: "Property Mgmt",
    },
  ]

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={`${card.title}-${card.category}`} className="w-full max-w-[300px] mx-auto">
              <ServiceCard
                title={card.title}
                description={card.description}
                image={card.image}
                price={card.price}
                icon={card.icon}
                color={card.color}
                link={card.link}
                category={card.category}
                size="small"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

