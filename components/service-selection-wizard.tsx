"use client"

import Link from "next/link"
import { Truck, Container, Home, Broom, Hammer, Sparkles } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

const OPTIONS = [
  { label: "Junk Removal", icon: Truck, href: "/services/junk-removal" },
  { label: "Dumpster Rental", icon: Container, href: "/services/dumpster-rental" },
  { label: "Estate Cleanout", icon: Home, href: "/services/estate-cleanouts" },
  { label: "Cleaning Service", icon: Sparkles, href: "/cleaning" },
  { label: "Demolition", icon: Hammer, href: "/services/light-demolition" },
]

export function ServiceSelectionWizard() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">What do you need removed?</h2>
          <p className="text-base sm:text-lg text-gray-600 mt-2">Pick a service to jump straight to the right info or quote form</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {OPTIONS.map((opt) => (
            <GlassCard key={opt.label} variant="white" className="p-5 text-center hover:shadow-md transition-shadow">
              <Link href={opt.href} className="flex flex-col items-center gap-2" prefetch={false}>
                <opt.icon className="w-8 h-8 text-red-600" />
                <span className="text-sm font-semibold text-gray-900">{opt.label}</span>
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}