'use client'

import { ServiceCard } from '@/components/ui/service-card'
import { Trash2, Sparkles, Hammer } from 'lucide-react'

export function HomeServiceCards() {
  const cards = [
    {
      title: 'Junk Removal',
      description:
        'Fast, professional removal for homes, offices, and properties. Same-day service available.',
      price: 'Free quotes',
      icon: Trash2,
      color: 'primary' as const,
      link: '/services/junk-removal',
      category: 'Service',
    },
    {
      title: 'Cleaning Services',
      description: 'Eco-friendly residential and commercial cleaning tailored to your needs.',
      price: 'Free estimates',
      icon: Sparkles,
      color: 'primary' as const,
      link: '/cleaning',
      category: 'Service',
    },
    {
      title: 'Light Demolition',
      description: 'Shed removal, deck tear-downs, and storm debris cleanup made simple.',
      price: 'On-site estimates',
      icon: Hammer,
      color: 'primary' as const,
      link: '/services/light-demolition',
      category: 'Service',
    },
  ]

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-foreground mb-8 text-center text-2xl font-bold sm:text-3xl">
          Our Services
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => (
            <ServiceCard
              key={card.title}
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
