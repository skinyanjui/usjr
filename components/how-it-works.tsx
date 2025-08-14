import { Camera, CheckCircle2, DollarSign, Truck } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

export function HowItWorks() {
  const steps = [
    {
      icon: DollarSign,
      title: "See price range",
      description: "View transparent ranges for typical jobs so you know what to expect.",
    },
    {
      icon: Camera,
      title: "Send photos",
      description: "Photos help confirm your exact price and save you money.",
    },
    {
      icon: CheckCircle2,
      title: "Get exact quote",
      description: "We confirm your final price by text in minutes—no surprises.",
    },
    {
      icon: Truck,
      title: "We remove your junk",
      description: "Same-day availability. We haul, dispose, and tidy up.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3">Fast, accurate pricing without the hassle</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <GlassCard key={idx} variant="white" className="p-6 text-center">
              <step.icon className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}