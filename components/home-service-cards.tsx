'use client'

import Link from 'next/link'
import { Trash2, Sparkles, Hammer, ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Junk Removal',
    description: 'Fast, professional removal for homes, offices, and properties. Same-day service available.',
    icon: Trash2,
    link: '/services/junk-removal',
  },
  {
    title: 'Cleaning Services',
    description: 'Eco-friendly residential and commercial cleaning tailored to your needs.',
    icon: Sparkles,
    link: '/cleaning',
  },
  {
    title: 'Light Demolition',
    description: 'Shed removal, deck tear-downs, and storm debris cleanup made simple.',
    icon: Hammer,
    link: '/services/light-demolition',
  },
]

export function HomeServiceCards() {
  return (
    <section className="border-b border-border px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-foreground mb-3 text-center text-2xl font-bold sm:text-3xl">
          Our Services
        </h2>
        <p className="text-muted-foreground mb-10 text-center text-base">
          Professional junk removal and cleaning for homes and businesses
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.link}
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:bg-muted/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <service.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
