'use client'

import { memo } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Service {
  title: string
  description: string
  link: string
}

const services: Service[] = [
  {
    title: 'Junk Removal',
    description:
      'Fast, professional removal for homes, offices, and properties. Same-day service available.',
    link: '/services/junk-removal',
  },
  {
    title: 'Cleaning Services',
    description: 'Eco-friendly residential and commercial cleaning tailored to your needs.',
    link: '/cleaning',
  },
  {
    title: 'Light Demolition',
    description: 'Shed removal, deck tear-downs, and storm debris cleanup made simple.',
    link: '/services/light-demolition',
  },
]

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group border-border hover:border-foreground/20 relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-foreground mb-3 text-xl font-bold">
          <Link href={service.link} className="hover:text-primary transition-colors">
            {service.title}
          </Link>
        </h3>
        <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
          {service.description}
        </p>
        <div className="mt-auto">
          <Link
            href={service.link}
            className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2"
          >
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export const HomeServiceCards = memo(function HomeServiceCards() {
  return (
    <section className="border-border border-b px-4 py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-foreground mb-2 text-2xl font-bold sm:text-3xl">Our Services</h2>
          <p className="text-muted-foreground">
            Professional junk removal and cleaning for homes and businesses
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {services.map(service => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
})
