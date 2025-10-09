'use client'

import { ServiceCard } from '@/components/ui/service-card'
import { Trash2, Truck, Sparkles } from 'lucide-react'

export function HomeServiceCards() {
  const cards = [
    // Junk Removal (Residential, Commercial, Property Mgmt)
    {
      title: 'Residential Junk Removal',
      description: 'Furniture, appliances, garages, basements — fast, friendly haul away.',
      price: 'Free quotes',
      icon: Trash2,
      color: 'red' as const,
      link: '/services/junk-removal',
      category: 'Residential',
    },
    {
      title: 'Commercial Junk Removal',
      description: 'Offices, storefronts, warehouses — clear-outs done after hours.',
      price: 'Free quotes',
      icon: Trash2,
      color: 'red' as const,
      link: '/services/junk-removal',
      category: 'Commercial',
    },
    {
      title: 'Property Mgmt Junk Removal',
      description: 'Tenant turnovers and cleanouts to speed up your vacancy times.',
      price: 'Free quotes',
      icon: Trash2,
      color: 'red' as const,
      link: '/services/property-management-turnovers',
      category: 'Property Mgmt',
    },

    // Light Demolition
    {
      title: 'Light Demolition Projects',
      description: 'Shed tear-downs, deck removals, and swing set demos made simple.',
      price: 'On-site estimates',
      icon: Truck,
      color: 'orange' as const,
      link: '/services/light-demolition',
      category: 'Exterior',
    },
    {
      title: 'Shed & Playset Removal',
      description: 'We dismantle, haul away debris, and leave your yard clean.',
      price: 'From $399',
      icon: Truck,
      color: 'orange' as const,
      link: '/services/shed-removal',
      category: 'Backyard',
    },
    {
      title: 'Storm Debris Cleanup',
      description: 'Branches, limbs, and light demolition debris cleared fast.',
      price: 'Emergency ready',
      icon: Truck,
      color: 'orange' as const,
      link: '/services/storm-debris-cleanup',
      category: 'Rapid Response',
    },

    // Cleaning (Residential, Commercial, Property Mgmt)
    {
      title: 'Residential Cleaning',
      description: 'Natural products, deep cleans, and recurring home service.',
      price: 'Free estimates',
      icon: Sparkles,
      color: 'green' as const,
      link: '/cleaning/residential',
      category: 'Residential',
    },
    {
      title: 'Commercial Cleaning',
      description: 'Professional after-hours office cleaning to fit your schedule.',
      price: 'Free estimates',
      icon: Sparkles,
      color: 'green' as const,
      link: '/cleaning/commercial',
      category: 'Commercial',
    },
    {
      title: 'Property Mgmt Cleaning',
      description: 'Move-out deep cleans for faster, spotless turnovers.',
      price: 'Free estimates',
      icon: Sparkles,
      color: 'green' as const,
      link: '/cleaning/move-in-move-out',
      category: 'Property Mgmt',
    },
  ]

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => (
            <ServiceCard
              key={`${card.title}-${card.category}`}
              title={card.title}
              description={card.description}
              price={card.price}
              icon={card.icon}
              color={card.color}
              link={card.link}
              category={card.category}
              size="small"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
