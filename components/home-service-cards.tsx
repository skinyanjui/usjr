'use client'

import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface Service {
  title: string
  description: string
  image: string
  link: string
}

const services: Service[] = [
  {
    title: 'Junk Removal',
    description: 'Fast, professional removal for homes, offices, and properties. Same-day service available.',
    image: '/images/services/junk-removal.png?v=unified',
    link: '/services/junk-removal',
  },
  {
    title: 'Cleaning Services',
    description: 'Eco-friendly residential and commercial cleaning tailored to your needs.',
    image: '/images/services/cleaning.png?v=unified',
    link: '/cleaning',
  },
  {
    title: 'Light Demolition',
    description: 'Shed removal, deck tear-downs, and storm debris cleanup made simple.',
    image: '/images/services/demolition.png?v=unified',
    link: '/services/light-demolition',
  },
]

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.link}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-foreground/20"
    >
      {/* Background Image */}
      <div className="relative h-48 w-full bg-white border-b border-border/40">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-bold text-foreground">
          {service.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="mt-auto">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export const HomeServiceCards = memo(function HomeServiceCards() {
  return (
    <section className="border-b border-border px-4 py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            Our Services
          </h2>
          <p className="text-muted-foreground">
            Professional junk removal and cleaning for homes and businesses
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
})
