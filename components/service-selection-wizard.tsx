'use client'

import Link from 'next/link'
import { Truck, Home, Hammer, Sparkles, Building2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'

const OPTIONS = [
  { label: 'Junk Removal', icon: Truck, href: '/services/junk-removal' },
  { label: 'Commercial Cleanouts', icon: Building2, href: '/services/office-cleanouts' },
  { label: 'Estate Cleanout', icon: Home, href: '/services/estate-cleanouts' },
  { label: 'Cleaning Service', icon: Sparkles, href: '/cleaning' },
  { label: 'Demolition', icon: Hammer, href: '/services/light-demolition' },
]

export function ServiceSelectionWizard() {
  return (
    <section className="bg-card py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-foreground text-2xl font-bold sm:text-4xl">
            What do you need removed?
          </h2>
          <p className="text-muted-foreground mt-2 text-base sm:text-lg">
            Pick a service to jump straight to the right info or quote form
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {OPTIONS.map(opt => (
            <GlassCard
              key={opt.label}
              variant="white"
              className="p-5 text-center transition-shadow hover:shadow-md"
            >
              <Link href={opt.href} className="flex flex-col items-center gap-2">
                <opt.icon className="h-8 w-8 text-gray-900" />
                <span className="text-foreground text-sm font-semibold">{opt.label}</span>
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
