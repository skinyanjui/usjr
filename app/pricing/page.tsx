import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Truck,
  Trash2,
  CheckCircle,
  Award,
  Camera,
  MessageSquare,
  ArrowRight,
  XCircle,
  Check,
  HelpCircle,
} from 'lucide-react'

import { PageHero } from '@/components/ui/page-hero'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Junk Removal Pricing in Evansville, IN | Upfront & Transparent',
  description:
    'See our transparent junk removal pricing. Volume-based rates, no hidden fees. Mattress removal from $89. Serving Evansville, Newburgh, and surrounding areas.',
  keywords:
    'junk removal pricing, light demolition cost, mattress removal price, evansville junk removal rates',
  ...buildCanonicalMetadata('/pricing', baseUrl),
}

export default function PricingPage() {
  const volumePricing = [
    {
      size: 'Minimum Load',
      price: '$89',
      description: 'The perfect size for single items.',
      examples: 'Verified Load: A mattress, a recliner, OR 4-5 large trash bags.',
      load: '10%',
      icon: Trash2,
      popular: false,
    },
    {
      size: '1/4 Truck',
      price: '$179-249',
      description: 'Great for small room decluttering.',
      examples: 'Fits: A sofa + loveseat OR a washing machine + dryer + various boxes.',
      load: '25%',
      icon: Truck,
      popular: true,
    },
    {
      size: '1/2 Truck',
      price: '$289-389',
      description: 'Ideal for garage or basement cleanouts.',
      examples: 'Fits: A queen bedroom set + living room furniture + 10-15 boxes.',
      load: '50%',
      icon: Truck,
      popular: false,
    },
    {
      size: 'Full Truck',
      price: '$489-649',
      description: 'Complete home cleanout solution.',
      examples: 'Fits: 4-5 pickup truck loads. Entire garage, attic, or large basement cleanout.',
      load: '100%',
      icon: Truck,
      popular: false,
    },
  ]

  const itemPricing = [
    {
      name: 'Mattress Removal',
      price: 'From $89',
      description: 'Includes box spring disposal options',
    },
    {
      name: 'Appliance Removal',
      price: 'From $89',
      description: 'Washers, dryers, refrigerators',
    },
    {
      name: 'Hot Tub Removal',
      price: 'From $389',
      description: 'Safe disconnection and removal',
    },
    {
      name: 'Shed Removal',
      price: 'From $289',
      description: 'Demolition and debris hauling',
    },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 1. HERO - Establish Trust */}
      <PageHero
        title="Fair Pricing, No Guesswork"
        description="We believe you shouldn't have to guess what IT costs. Our volume-based pricing means you only pay for the space you use."
        eyebrow="Simple & Transparent"
      />

      {/* 2. EDUCATIONAL - The Concept */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="border-primary/20 bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium">
                <HelpCircle className="h-4 w-4" />
                <span>How It Works</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Pay for Space, Not Time
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Many companies charge hourly rates that can skyrocket if the job takes longer than
                expected. We don't do that.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">All-Inclusive Rates</h3>
                    <p className="text-muted-foreground text-sm">
                      Labor, loading, transport, and disposal fees are all included in one price.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">No Surprise Fees</h3>
                    <p className="text-muted-foreground text-sm">
                      The price we quote is the price you pay. No hidden fuel surcharges or booking
                      fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md">
              <div className="from-primary/5 absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-50" />
              <div className="relative p-8 text-center">
                {/* Truck Visualization */}
                <div className="mx-auto mb-8 flex items-center justify-center">
                  <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-xl">
                    <Image
                      src="/images/red-truck.png"
                      alt="Our Big Red Junk Removal Truck"
                      fill
                      sizes="(max-width: 640px) 100vw, 384px"
                      className="transform object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                <h3 className="text-foreground mb-2 text-xl font-bold">Our 15-Yard Dump Truck</h3>
                <div className="bg-primary mx-auto mb-4 h-1 w-12 rounded-full" />

                <h3 className="text-foreground mb-2 text-xl font-bold">Our 15-Yard Dump Truck</h3>
                <div className="bg-primary mx-auto mb-4 h-1 w-12 rounded-full" />

                <div className="grid gap-4 text-left sm:grid-cols-2">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                      Dimensions
                    </p>
                    <p className="text-foreground font-medium">12ft x 8ft x 5ft</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                      Capacity
                    </p>
                    <p className="text-foreground font-medium">~5 Pickup Loads</p>
                  </div>
                </div>

                <p className="text-muted-foreground mt-6 text-sm">
                  We fill it up, you watch the junk disappear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE MENU - Volume Pricing */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Volume Rates</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Select a size to see what typically fits. Prices are estimates and confirmed onsite.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {volumePricing.map((tier, index) => (
              <Card
                key={index}
                className={`border-border bg-card hover:border-primary/20 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
                  tier.popular ? 'ring-primary ring-offset-background ring-2 ring-offset-2' : ''
                }`}
              >
                {tier.popular && (
                  <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="bg-muted text-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <tier.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="mb-2 w-fit">
                    {tier.size}
                  </Badge>
                  <CardTitle className="text-primary text-3xl font-bold">{tier.price}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground mb-4 text-base font-medium">
                    {tier.description}
                  </CardDescription>
                  <div className="bg-muted text-muted-foreground mb-6 rounded-lg p-3 text-sm">
                    <span className="text-foreground font-semibold">What fits: </span>
                    {tier.examples}
                  </div>
                  {/* Visual Load Indicator */}
                  <div className="bg-muted/50 flex h-2 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full" style={{ width: tier.load }} />
                  </div>
                  <p className="text-muted-foreground mt-2 text-right text-xs font-medium">
                    {tier.load} Load
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* MID-FUNNEL CTA */}
          <div className="bg-primary text-primary-foreground mt-16 rounded-2xl px-6 py-12 text-center sm:px-12">
            <div className="mx-auto max-w-2xl">
              <Camera className="mx-auto mb-4 h-12 w-12 opacity-90" />
              <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Not sure how much you have?</h3>
              <p className="mb-8 text-lg font-medium opacity-90">
                Text us a photo of your junkpile! We'll reply with a quick, free estimate so you
                know exactly what to expect.
              </p>
              <Button asChild size="lg" variant="secondary" className="w-full font-bold sm:w-auto">
                <Link href={`sms:${settings.phoneE164}`}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Text A Photo {settings.phone}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE COMPARISON - Us vs Them */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Volume Pricing Wins</h2>
            <p className="text-muted-foreground">Compare us against renting a dumpster yourself.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Dumpster Rental */}
            <div className="border-border bg-muted/20 rounded-xl border p-8">
              <h3 className="text-muted-foreground mb-6 flex items-center gap-2 text-xl font-bold">
                <XCircle className="h-6 w-6" /> Dumpster Rental
              </h3>
              <ul className="space-y-4">
                <li className="text-muted-foreground flex items-start gap-3">
                  <XCircle className="text-muted-foreground mt-1 h-4 w-4 shrink-0" />
                  <span>You do all the heavy lifting and loading yourself.</span>
                </li>
                <li className="text-muted-foreground flex items-start gap-3">
                  <XCircle className="text-muted-foreground mt-1 h-4 w-4 shrink-0" />
                  <span>Ugly dumpster sits in your driveway for days/weeks.</span>
                </li>
                <li className="text-muted-foreground flex items-start gap-3">
                  <XCircle className="text-muted-foreground mt-1 h-4 w-4 shrink-0" />
                  <span>Risk of damage to driveway or lawn.</span>
                </li>
                <li className="text-muted-foreground flex items-start gap-3">
                  <XCircle className="text-muted-foreground mt-1 h-4 w-4 shrink-0" />
                  <span>Pay full price even if you only fill it halfway.</span>
                </li>
              </ul>
            </div>

            {/* Uncle Sam */}
            <div className="border-primary bg-card relative rounded-xl border-2 p-8 shadow-lg">
              <div className="bg-primary text-primary-foreground absolute top-0 right-0 -mt-3 -mr-3 rounded-full px-4 py-1 text-sm font-bold shadow-md">
                Best Value
              </div>
              <h3 className="text-primary mb-6 flex items-center gap-2 text-xl font-bold">
                <CheckCircle className="h-6 w-6" /> Uncle Sam Junk Removal
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                  <span className="font-medium">We do ALL the work. You don't lift a finger.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                  <span className="font-medium">Same-day service. Gone in minutes, not days.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                  <span className="font-medium">
                    Zero damage risk. We carry items out carefully.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                  <span className="font-medium">Pay ONLY for the space you use. Save money.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ITEM SPECIFIC */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Single Item Rates</h2>
              <p className="text-muted-foreground">
                Simple flat rates for common individual items.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/services">
                See All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {itemPricing.map((item, index) => (
              <div
                key={index}
                className="border-border bg-card flex items-center justify-between rounded-xl border p-5"
              >
                <div>
                  <h3 className="text-foreground font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <span className="text-primary font-bold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRUST & FAQ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            {/* Trust Badges Sidebar */}
            <div>
              <h3 className="mb-6 text-xl font-bold">Why Neighbors Trust Us</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Satisfaction Guaranteed</h4>
                    <p className="text-muted-foreground text-sm">
                      If you're not happy, we make it right.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div>
              <h3 className="mb-6 text-xl font-bold">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Do you offer free onsite estimates?</AccordionTrigger>
                  <AccordionContent>
                    Yes! The best way to get an accurate price is for us to see your items in
                    person. We provide free, no-obligation onsite estimates. If you like the price,
                    we can often do the work right then and there.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What forms of payment do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards, cash, and checks. Payment is processed only
                    after the job is completed to your satisfaction.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Why is volume-based pricing better?</AccordionTrigger>
                  <AccordionContent>
                    Volume pricing is fair because you only pay for the space you use. Unlike hourly
                    rates that can fluctuate or flat fees that might overcharge for small loads,
                    volume pricing ensures you get the best value for your specific removal needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Are there any hidden fees?</AccordionTrigger>
                  <AccordionContent>
                    No. Our upfront price includes all labor, loading, transport, and disposal fees.
                    The only additional surcharges are for specific items that cost us more to
                    dispose of (like tires, TVs, or paint), which we disclose upfront.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
