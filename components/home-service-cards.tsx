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
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
    },
    {
      title: 'Cleaning Services',
      description: 'Eco-friendly residential and commercial cleaning tailored to your needs.',
      price: 'Free estimates',
      icon: Sparkles,
      color: 'primary' as const,
      link: '/cleaning',
      category: 'Service',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Light Demolition',
      description: 'Shed removal, deck tear-downs, and storm debris cleanup made simple.',
      price: 'On-site estimates',
      icon: Hammer,
      color: 'primary' as const,
      link: '/services/light-demolition',
      category: 'Service',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop',
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
              image={card.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
