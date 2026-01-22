'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Truck, Wrench, Sparkles, Clock, DollarSign, Users } from 'lucide-react'


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
    red: 'border-border bg-muted text-foreground',
    orange: 'border-border bg-muted text-foreground',
    green: 'border-border bg-muted text-foreground',
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
        <h1 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          Compare Our Services
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg sm:text-xl">
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
              className={`relative transition-all duration-300 hover:shadow-lg ${isSelected ? 'shadow-lg ring-2 ring-gray-400' : ''
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
                  <h4 className="text-foreground mb-2 flex items-center gap-2 font-semibold">
                    <Users className="h-4 w-4" />
                    Best For:
                  </h4>
                  <p className="text-muted-foreground">{service.bestFor}</p>
                </div>

                <div>
                  <h4 className="text-foreground mb-3 font-semibold">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 flex-shrink-0 text-gray-900" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-foreground mb-3 font-semibold">Not Included:</h4>
                  <ul className="space-y-2">
                    {service.notIncluded.map((item, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground flex items-center gap-2 text-sm"
                      >
                        <X className="text-destructive h-4 w-4 flex-shrink-0" />
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
                    className={`w-full bg-transparent ${service.color === 'red'
                      ? 'border-gray-300 text-gray-900'
                      : service.color === 'orange'
                        ? 'border-gray-300 text-gray-900'
                        : service.color === 'green'
                          ? 'border-gray-300 text-gray-900'
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


    </>
  )
}
