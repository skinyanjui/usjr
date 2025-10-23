import type { Metadata } from 'next'
import { ServiceCard } from '@/components/ui/service-card'
import { SectionHeader } from '@/components/ui/section-header'
import { ThemedButton } from '@/components/ui/themed-button'
import { GlassCard } from '@/components/ui/glass-card'
import { Truck, Recycle, Home, Building2, Trash2, Wrench } from 'lucide-react'
import Link from 'next/link'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
import { QuoteCtaLink } from '@/components/quote-cta-link'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Professional Junk Removal & Cleaning Services | Uncle Sam Junk Removal',
  description:
    'Comprehensive junk removal, light demolition, and cleaning services in Evansville, Indiana. Eco-friendly disposal, free estimates, and reliable service throughout Southern Indiana.',
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

  return (
    <div className="min-h-screen bg-blue-50">
      <PageHero
        title="Professional Services in Evansville"
        description="Comprehensive junk removal, light demolition, and cleaning services for Southern Indiana"
        color="blue"
      />

      {/* Top CTAs */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ThemedButton theme="red" asChild>
              <QuoteCtaLink location="services-hero" label="Get Free Quote">
                Get Free Quote
              </QuoteCtaLink>
            </ThemedButton>
            <ThemedButton theme="green" variant="outline" asChild>
              <Link href={`tel:${settings.phoneE164}`}>Call {settings.phone}</Link>
            </ThemedButton>
          </div>
        </div>
      </section>

      {/* Junk Removal Services */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Junk Removal Services"
            subtitle="Professional removal services for homes and businesses"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {junkRemovalServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                price={service.price}
                link={service.link}
                icon={service.icon}
                color="red"
                category="Junk Removal"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Services */}
      <section className="bg-white/50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Project Services"
            subtitle="Demolition, debris removal, and seasonal cleanup support"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projectServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                price={service.price}
                link={service.link}
                icon={service.icon}
                color="orange"
                category="Project"
                size="small"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Services */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Professional Cleaning Services"
            subtitle="Eco-friendly cleaning with natural products"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {cleaningServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                price={service.price}
                link={service.link}
                icon={service.icon}
                color="green"
                category="Cleaning"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-white/50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Service Areas"
            subtitle="Proudly serving Southern Indiana and Western Kentucky"
          />

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Evansville', href: '/locations/evansville' },
              { name: 'Newburgh', href: '/locations/newburgh' },
              { name: 'Henderson, KY', href: '/locations/henderson-ky' },
              { name: 'Owensboro, KY', href: '/locations/owensboro-ky' },
              { name: 'Boonville', href: '/locations/boonville' },
              { name: 'Princeton', href: '/locations/princeton' },
            ].map((location, index) => (
              <GlassCard
                key={index}
                className="p-4 text-center transition-transform hover:scale-105"
              >
                <ThemedButton theme="blue" variant="ghost" asChild className="w-full">
                  <Link href={location.href}>{location.name}</Link>
                </ThemedButton>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="mb-8 text-xl text-gray-600">
            Book your service today or get a free, no-obligation quote.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ThemedButton theme="red" asChild>
              <QuoteCtaLink location="services-cta" label="Get Free Quote">
                Get Free Quote
              </QuoteCtaLink>
            </ThemedButton>
            <ThemedButton theme="green" variant="outline" asChild>
              <Link href={`tel:${settings.phoneE164}`}>Call {settings.phone}</Link>
            </ThemedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
