import { Phone } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GlassCard } from '@/components/ui/glass-card'
import { IconContainer } from '@/components/ui/icon-container'
import { Check } from 'lucide-react'
import { PriceMatchTerms } from '@/components/price-match-terms'
import { settings } from '@/lib/cms-content'
import { junkRemovalTiers } from '@/lib/pricing'

const STAR_ICONS = [0, 1, 2, 3, 4]

export function PricingGrid() {
  const baseTiers = [
    {
      id: 'single',
      name: 'Single Item',
      price: '',
      description: 'Perfect for 1-2 items',
      features: [
        '1-2 items removal',
        'Labor included',
        'Hauling & disposal',
        'Same-day service',
        'No hidden fees',
      ],
      popular: false,
      examples: 'Couch, mattress, appliance',
    },
    {
      id: 'quarter',
      name: '¼ Truck Load',
      price: '',
      description: 'Small pickup truck load',
      features: [
        '¼ truck capacity',
        'Labor included',
        'Hauling & disposal',
        'Same-day service',
        'Eco-friendly disposal',
      ],
      popular: false,
      examples: 'Small furniture set, boxes',
    },
    {
      id: 'half',
      name: '½ Truck Load',
      price: '',
      description: 'Half pickup truck load',
      features: [
        '½ truck capacity',
        '2-person crew',
        'Labor included',
        'Hauling & disposal',
        'Same-day service',
      ],
      popular: true,
      examples: 'Bedroom set, office cleanout',
    },
    {
      id: 'three-quarter',
      name: '¾ Truck Load',
      price: '',
      description: 'Large pickup truck load',
      features: [
        '¾ truck capacity',
        '2-person crew',
        'Labor included',
        'Hauling & disposal',
        'Free estimates',
      ],
      popular: false,
      examples: 'Garage cleanout, renovation debris',
    },
    {
      id: 'full',
      name: 'Full Truck Load',
      price: '',
      description: 'Complete truck load',
      features: [
        'Full truck capacity',
        '2-3 person crew',
        'Labor included',
        'Hauling & disposal',
        'Volume discounts',
      ],
      popular: false,
      examples: 'Whole house cleanout, estate',
    },
  ] as const

  const priceMap = new Map(junkRemovalTiers.map(t => [t.id, t.price]))
  const pricingTiers = baseTiers.map(t => ({ ...t, price: priceMap.get(t.id) || t.price }))

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Transparent Pricing - No Surprises
          </h2>
          <p className="text-muted-foreground mb-2 text-lg sm:text-xl">
            Unlike other companies, we show you exactly what you'll pay
          </p>
          <p className="text-muted-foreground text-base sm:text-lg">
            All prices include labor, hauling, and dump fees
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <div className="flex">
              {STAR_ICONS.map(i => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-current text-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-muted-foreground">4.9/5 from 200+ customers</span>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Prices shown are typical ranges. Photos help confirm your exact price and can save you
              money.
            </p>
          </div>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pricingTiers.map(tier => (
            <Card key={tier.id} className={`glass ${tier.popular ? 'ring-2 ring-gray-400' : ''}`}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center justify-between text-lg font-bold">
                  <span>{tier.name}</span>
                  <span className="text-gray-900">{tier.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  {tier.description} • {tier.examples}
                </p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  {tier.features.map(f => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <GlassCard variant="elevated" className="p-6 text-center md:p-8">
          <h3 className="text-foreground mb-4 text-xl font-bold md:text-2xl">
            Why Choose Our Transparent Pricing?
          </h3>
          <div className="grid gap-6 text-left sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <IconContainer icon={Check} variant="default" size="sm" />
              <div>
                <h4 className="text-foreground mb-1 font-semibold">No Hidden Fees</h4>
                <p className="text-muted-foreground text-sm">
                  Our prices include everything - labor, hauling, dump fees, and disposal costs.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IconContainer icon={Check} variant="default" size="sm" />
              <div>
                <h4 className="text-foreground mb-1 font-semibold">Upfront Estimates</h4>
                <p className="text-muted-foreground text-sm">
                  Know exactly what you'll pay before we start. No surprises or last-minute charges.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IconContainer icon={Check} variant="default" size="sm" />
              <div>
                <h4 className="text-foreground mb-1 font-semibold">Price Match Guarantee</h4>
                <p className="text-muted-foreground text-sm">
                  Find a lower written quote for the same service? We’ll match it.{' '}
                  <PriceMatchTerms
                    trigger={
                      <span className="cursor-pointer font-semibold text-gray-900 underline">
                        See terms
                      </span>
                    }
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-300 pt-6">
            <p className="text-muted-foreground mb-4 font-medium">
              Ready to see exactly what your project will cost?
            </p>
            <div className="flex flex-row justify-center gap-4">
              <a
                href={`tel:${settings.phoneE164}`}
                className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 text-center font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-gray-900/45 sm:flex-initial"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {settings.phone}
              </a>
              <a
                href={`sms:${settings.phoneE164}`}
                className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-transparent px-6 text-center font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:flex-initial"
              >
                Text Photos for Instant Quote
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
