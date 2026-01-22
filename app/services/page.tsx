import type { Metadata } from 'next'
import { Truck, Recycle, Home, Building2, Trash2, Wrench, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { PageHero } from '@/components/ui/page-hero'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Professional Junk Removal & Cleaning Services | Uncle Sam Junk Removal',
  description:
    'Junk removal, light demolition & cleaning in Evansville, IN. Eco-friendly disposal, free estimates. Serving Southern Indiana.',
  keywords:
    'junk removal services, light demolition, cleaning services, Evansville Indiana, Southern Indiana, waste management, eco-friendly disposal',
  ...buildCanonicalMetadata('/services', baseUrl),
}

export default function ServicesPage() {
  const junkRemovalServices = [
    {
      title: 'General Junk Removal',
      description: 'Complete household and office junk removal with eco-friendly disposal',
      price: 'From $99',
      link: '/services/junk-removal',
      icon: Truck,
    },
    {
      title: 'Hot Tub Removal',
      description: 'Professional hot tub dismantling and removal service',
      price: 'From $299',
      link: '/services/hot-tub-removal',
      icon: Home,
    },
    {
      title: 'Appliance Removal',
      description: 'Safe removal and recycling of old appliances',
      price: 'From $75',
      link: '/services/appliance-removal',
      icon: Wrench,
    },
    {
      title: 'Garage Cleanouts',
      description: 'Complete garage cleaning and organization service',
      price: 'From $199',
      link: '/services/garage-cleanout',
      icon: Building2,
    },
    {
      title: 'Estate Cleanouts',
      description: 'Compassionate and thorough estate cleanout services',
      price: 'From $399',
      link: '/services/estate-cleanouts',
      icon: Home,
    },
    {
      title: 'Mattress Removal',
      description: 'Eco-friendly mattress disposal and recycling',
      price: 'From $49',
      link: '/services/mattress-removal',
      icon: Trash2,
    },
  ]

  const projectServices = [
    {
      title: 'Light Demolition',
      description: 'Safe dismantling for sheds, decks, and small structures',
      price: 'From $499',
      link: '/services/light-demolition',
      icon: Wrench,
    },
    {
      title: 'Shed Removal',
      description: 'Complete shed tear-down and debris hauling',
      price: 'From $199',
      link: '/services/shed-removal',
      icon: Building2,
    },
    {
      title: 'Storm Debris Cleanup',
      description: 'Rapid response for branches, limbs, and exterior debris',
      price: 'Emergency ready',
      link: '/services/storm-debris-cleanup',
      icon: Truck,
    },
    {
      title: 'Yard Waste Removal',
      description: 'Seasonal yard cleanup and debris removal',
      price: 'From $149',
      link: '/services/yard-waste-removal',
      icon: Recycle,
    },
  ]

  const cleaningServices = [
    {
      title: 'Residential Cleaning',
      description: 'Professional home cleaning with natural products',
      price: 'From $89',
      link: '/cleaning/residential',
      icon: Home,
    },
    {
      title: 'Commercial Cleaning',
      description: 'After-hours business cleaning services',
      price: 'From $149',
      link: '/cleaning/commercial',
      icon: Building2,
    },
    {
      title: 'Deep Cleaning',
      description: 'Comprehensive deep cleaning for homes and offices',
      price: 'From $199',
      link: '/cleaning/deep-clean',
      icon: Recycle,
    },
  ]

  const serviceAreas = [
    { name: 'Evansville', href: '/locations/evansville' },
    { name: 'Newburgh', href: '/locations/newburgh' },
    { name: 'Henderson, KY', href: '/locations/henderson-ky' },
    { name: 'Owensboro, KY', href: '/locations/owensboro-ky' },
    { name: 'Boonville', href: '/locations/boonville' },
    { name: 'Princeton', href: '/locations/princeton' },
  ]

  return (
    <div className="min-h-screen">
      <PageHero
        title="Professional Services"
        description="Comprehensive junk removal, light demolition, and cleaning services for Southern Indiana"
        eyebrow="What We Do"
      />

      {/* Junk Removal Services */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground">Junk Removal Services</h2>
            <p className="text-muted-foreground">Professional removal services for homes and businesses</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {junkRemovalServices.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {service.price}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                <div className="flex items-center text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Project Services */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground">Project Services</h2>
            <p className="text-muted-foreground">Demolition, debris removal, and seasonal cleanup support</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projectServices.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-bold text-foreground">{service.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{service.description}</p>
                <p className="text-xs font-medium text-foreground/80">{service.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Services */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground">Cleaning Services</h2>
            <p className="text-muted-foreground">Eco-friendly cleaning with natural products</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {cleaningServices.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{service.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                <div className="flex items-center text-sm font-medium text-foreground">
                  View Details
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground">Service Areas</h2>
            <p className="text-muted-foreground">Proudly serving Southern Indiana and Western Kentucky</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {serviceAreas.map((location, index) => (
              <Link
                key={index}
                href={location.href}
                className="flex items-center justify-center rounded-xl border border-border bg-card p-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                {location.name}
              </Link>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
