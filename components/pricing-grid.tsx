import { Star, Phone } from "lucide-react"
import { PricingCard } from "@/components/ui/pricing-card"
import { GlassCard } from "@/components/ui/glass-card"
import { ThemedButton } from "@/components/ui/themed-button"
import { IconContainer } from "@/components/ui/icon-container"
import { Check } from "lucide-react"

export function PricingGrid() {
  const pricingTiers = [
    {
      id: "single",
      name: "Single Item",
      price: "$89-149",
      description: "Perfect for 1-2 items",
      features: ["1-2 items removal", "Labor included", "Hauling & disposal", "Same-day service", "No hidden fees"],
      popular: false,
      examples: "Couch, mattress, appliance",
    },
    {
      id: "quarter",
      name: "¼ Truck Load",
      price: "$179-249",
      description: "Small pickup truck load",
      features: [
        "¼ truck capacity",
        "Labor included",
        "Hauling & disposal",
        "Same-day service",
        "Eco-friendly disposal",
      ],
      popular: false,
      examples: "Small furniture set, boxes",
    },
    {
      id: "half",
      name: "½ Truck Load",
      price: "$289-389",
      description: "Half pickup truck load",
      features: ["½ truck capacity", "2-person crew", "Labor included", "Hauling & disposal", "Same-day service"],
      popular: true,
      examples: "Bedroom set, office cleanout",
    },
    {
      id: "three-quarter",
      name: "¾ Truck Load",
      price: "$389-489",
      description: "Large pickup truck load",
      features: ["¾ truck capacity", "2-person crew", "Labor included", "Hauling & disposal", "Free estimates"],
      popular: false,
      examples: "Garage cleanout, renovation debris",
    },
    {
      id: "full",
      name: "Full Truck Load",
      price: "$489-649",
      description: "Complete truck load",
      features: ["Full truck capacity", "2-3 person crew", "Labor included", "Hauling & disposal", "Volume discounts"],
      popular: false,
      examples: "Whole house cleanout, estate",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Transparent Pricing - No Surprises</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            Unlike other companies, we show you exactly what you'll pay
          </p>
          <p className="text-base sm:text-lg text-gray-500">All prices include labor, hauling, and dump fees</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-gray-600 ml-2">4.9/5 from 200+ customers</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              title={tier.name}
              price={tier.price}
              description={`${tier.description} • ${tier.examples}`}
              features={tier.features}
              popular={tier.popular}
              color="red"
              ctaText="Get Quote"
              ctaLink="/quote"
            />
          ))}
        </div>

        <GlassCard variant="colored" color="red" className="p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Why Choose Our Transparent Pricing?</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3">
              <IconContainer icon={Check} color="red" size="sm" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">No Hidden Fees</h4>
                <p className="text-gray-600 text-sm">
                  Our prices include everything - labor, hauling, dump fees, and disposal costs.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IconContainer icon={Check} color="red" size="sm" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Upfront Estimates</h4>
                <p className="text-gray-600 text-sm">
                  Know exactly what you'll pay before we start. No surprises or last-minute charges.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IconContainer icon={Check} color="red" size="sm" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Price Match Guarantee</h4>
                <p className="text-gray-600 text-sm">
                  Find a lower price? We'll match it and beat it by 10% on comparable service.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-red-200">
            <p className="text-gray-700 font-medium mb-4">Ready to see exactly what your project will cost?</p>
            <div className="flex flex-row gap-4 justify-center">
              <a
                href="tel:+18126101657"
                className="inline-flex items-center justify-center gap-2 rounded-lg text-white ring-1 ring-white/30 h-11 px-6 hover:bg-red-700/45 transition-colors font-semibold flex-1 sm:flex-initial min-w-0 text-center bg-red-700"
              >
                <Phone className="h-4 w-4" /> Call (812) 610-1657
              </a>
              <ThemedButton
                variant="outline"
                theme="red"
                size="lg"
                className="flex-1 sm:flex-initial font-semibold min-w-0"
              >
                Text Photos for Instant Quote
              </ThemedButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
