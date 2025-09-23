'use client'

import { ServiceCard } from '@/components/ui/service-card'
import { Trash2, Sparkles } from 'lucide-react'

export function HomeServiceCards() {
  const cards = [
    // Junk Removal (Residential, Commercial, Property Mgmt)
    {
      title: 'Residential Junk Removal',
      description: 'Furniture, appliances, garages, basements — fast, friendly haul away.',
      image: '/junk-removal-evansville.png',
      price: 'Free quotes',
      icon: Trash2,
      color: 'red' as const,
      link: '/services',
      category: 'Residential',
    },
    {
      title: 'Commercial Junk Removal',
      description: 'Offices, storefronts, warehouses — clear-outs done after hours.',
      image: '/estate-cleanout-evansville.png',
      price: 'Free quotes',
      icon: Trash2,
      color: 'red' as const,
      link: '/services',
      category: 'Commercial',
    },
    {
      title: 'Property Mgmt Junk Removal',
      description: 'Tenant turnovers and cleanouts to speed up your vacancy times.',
      image: '/rental-turnover-cleanup.png',
      price: 'Free quotes',
      icon: Trash2,
      color: 'red' as const,
      link: '/services',
      category: 'Property Mgmt',
    },

    // Cleaning (Residential, Commercial, Property Mgmt)
    {
      title: 'Residential Cleaning',
      description: 'Natural products, deep cleans, and recurring home service.',
      image: '/natural-cleaning-service.png',
      price: 'Free estimates',
      icon: Sparkles,
      color: 'green' as const,
      link: '/services',
      category: 'Residential',
    },
    {
      title: 'Commercial Cleaning',
      description: 'Professional after-hours office cleaning to fit your schedule.',
      image: '/after-hours-cleaning.png',
      price: 'Free estimates',
      icon: Sparkles,
      color: 'green' as const,
      link: '/services',
      category: 'Commercial',
    },
    {
      title: 'Property Mgmt Cleaning',
      description: 'Move-out deep cleans for faster, spotless turnovers.',
      image: '/natural-deep-cleaning.png',
      price: 'Free estimates',
      icon: Sparkles,
      color: 'green' as const,
      link: '/services',
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
              image={card.image}
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
