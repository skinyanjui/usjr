'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Truck, Wrench, Sparkles, Clock, DollarSign, Users } from 'lucide-react'
import { settings } from '@/lib/cms-content'

const services = [
  {
    id: 'junk-removal',
    name: 'Junk Removal',
    icon: Truck,
    description: 'Full-service junk removal with labor included',
    priceRange: '$89-$649',
    timeframe: 'Same day available',
    bestFor: 'Single items to full cleanouts',
    features: [
      'Labor included',
      'Same-day service',
      'Eco-friendly disposal',
      'Free estimates',
      'Licensed & insured',
      'No hidden fees',
    ],
    notIncluded: ['Hazardous materials', 'Construction debris over 1 ton', 'Liquids or chemicals'],
    color: 'red',
  },
  {
    id: 'light-demolition',
    name: 'Light Demolition',
    icon: Wrench,
    description: 'Shed, deck, and playset tear-down with debris hauling',
    priceRange: 'From $399',
    timeframe: 'Scheduled within 3-5 days',
    bestFor: 'Small structure removal & exterior projects',
    features: [
      'Careful dismantling',
      'Debris hauling included',
      'Permit guidance when needed',
      'Licensed & insured crew',
      'Responsible disposal',
      'Transparent quotes',
    ],
    notIncluded: ['Major structural demo', 'Hazardous materials', 'Utility disconnects'],
    color: 'orange',
  },
  {
    id: 'cleaning',
    name: 'Professional Cleaning',
    icon: Sparkles,
    description: 'Eco-friendly residential and commercial cleaning',
    priceRange: '$99-$399',
    timeframe: 'Flexible scheduling',
    bestFor: 'Regular maintenance, deep cleaning, move-outs',
    features: [
      'Natural products used',
      'Woman-owned business',
      'Flexible scheduling',
      'Residential & commercial',
      'Recurring services available',
      'Satisfaction guaranteed',
    ],
    notIncluded: ['Junk removal', 'Heavy lifting', 'Exterior cleaning'],
    color: 'green',
  },
] as const

type Service = (typeof services)[number]

function getColorClasses(color: Service['color']) {
  const colors = {
    red: 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400',
    orange: 'border-orange-600 dark:border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400',
    green: 'border-green-600 dark:border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400',
  }
  return colors[color]
}

export default function CompareClient() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    )
  }

  return (
    <>
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          Compare Our Services
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
          Not sure which service is right for you? Compare features, pricing, and benefits to make
          the best choice for your project.
        </p>
      </div>

      <div className="mb-12 grid gap-8 lg:grid-cols-3">
        {services.map(service => {
          const Icon = service.icon
          const isSelected = selectedServices.includes(service.id)

          return (
            <Card
              key={service.id}
              className={`relative transition-all duration-300 hover:shadow-lg ${
                isSelected ? 'shadow-lg ring-2 ring-blue-500' : ''
              }`}
            >
              <CardHeader className="pb-4 text-center">
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${getColorClasses(
                    service.color
                  )}`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                <p className="text-muted-foreground">{service.description}</p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {service.priceRange}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {service.timeframe}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                    <Users className="h-4 w-4" />
                    Best For:
                  </h4>
                  <p className="text-muted-foreground">{service.bestFor}</p>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-foreground">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-foreground">Not Included:</h4>
                  <ul className="space-y-2">
                    {service.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <X className="h-4 w-4 flex-shrink-0 text-red-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <Button
                    onClick={() => toggleService(service.id)}
                    variant={isSelected ? 'default' : 'outline'}
                    className="w-full"
                  >
                    {isSelected ? 'Selected for Comparison' : 'Select for Comparison'}
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className={`w-full bg-transparent ${
                      service.color === 'red'
                        ? 'border-red-700 text-red-700'
                        : service.color === 'orange'
                          ? 'border-orange-700 text-orange-700'
                          : service.color === 'green'
                            ? 'border-green-700 text-green-700'
                            : ''
                    }`}
                  >
                    <Link
                      href={service.id === 'cleaning' ? '/cleaning' : `/services/${service.id}`}
                      aria-label={`${service.name} details`}
                      title={`${service.name} details`}
                    >
                      View {service.name} details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedServices.length > 0 && (
        <Card className="border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30">
          <CardContent className="p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground">Ready to Get Started?</h3>
            <p className="mb-6 text-muted-foreground">
              You've selected {selectedServices.length} service
              {selectedServices.length > 1 ? 's' : ''}. Get a free quote or bundle multiple services
              for potential savings.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/quote" prefetch>
                  Get Free Quote
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${settings.phoneE164}`}>Call {settings.phone}</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-12">
        <CardContent className="p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            Still Not Sure Which Service You Need?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Our team can help you choose the right service for your project. Get personalized
            recommendations based on your specific needs.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/quote" prefetch>
                Get Personalized Quote
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
