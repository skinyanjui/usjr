import { Camera, CheckCircle2, DollarSign, Truck } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'

export function HowItWorks() {
  const steps = [
    {
      icon: DollarSign,
      title: 'See price range',
      description: 'View transparent ranges for typical jobs so you know what to expect.',
    },
    {
      icon: Camera,
      title: 'Send photos',
      description: 'Photos help confirm your exact price and save you money.',
    },
    {
      icon: CheckCircle2,
      title: 'Get exact quote',
      description: 'We confirm your final price by text in minutes—no surprises.',
    },
    {
      icon: Truck,
      title: 'We remove your junk',
      description: 'Same-day availability. We haul, dispose, and tidy up.',
    },
  ]

  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Fast, accurate pricing without the hassle
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <GlassCard key={idx} variant="white" className="p-6 text-center">
              <step.icon className="mx-auto mb-4 h-10 w-10 text-red-600" />
              <h3 className="mb-1 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
