import { Star, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlassCard } from "@/components/ui/glass-card"
import { IconContainer } from "@/components/ui/icon-container"
import { Check } from "lucide-react"
import { PriceMatchTerms } from "@/components/price-match-terms"
import { settings } from "@/lib/cms-content"
import { junkRemovalTiers } from "@/lib/pricing"

export function PricingGrid() {
  const baseTiers = [
    {
      id: "single",
      name: "Single Item",
      price: "",
      description: "Perfect for 1-2 items",
      features: ["1-2 items removal", "Labor included", "Hauling & disposal", "Same-day service", "No hidden fees"],
      popular: false,
      examples: "Couch, mattress, appliance",
    },
    {
      id: "quarter",
      name: "¼ Truck Load",
      price: "",
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
      price: "",
      description: "Half pickup truck load",
      features: ["½ truck capacity", "2-person crew", "Labor included", "Hauling & disposal", "Same-day service"],
      popular: true,
      examples: "Bedroom set, office cleanout",
    },
    {
      id: "three-quarter",
      name: "¾ Truck Load",
      price: "",
      description: "Large pickup truck load",
      features: ["¾ truck capacity", "2-person crew", "Labor included", "Hauling & disposal", "Free estimates"],
      popular: false,
      examples: "Garage cleanout, renovation debris",
    },
    {
      id: "full",
      name: "Full Truck Load",
      price: "",
      description: "Complete truck load",
      features: ["Full truck capacity", "2-3 person crew", "Labor included", "Hauling & disposal", "Volume discounts"],
      popular: false,
      examples: "Whole house cleanout, estate",
    },
  ] as const

  const priceMap = new Map(junkRemovalTiers.map((t) => [t.id, t.price]))
  const pricingTiers = baseTiers.map((t) => ({ ...t, price: priceMap.get(t.id) || t.price }))

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Transparent Pricing - No Surprises</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            Unlike other companies, we show you exactly what you'll pay
          </p>
          <p className="text-base sm:text-lg text-gray-600">All prices include labor, hauling, and dump fees</p>
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-600">4.9/5 from 200+ customers</span>
            <p className="text-sm text-gray-600 max-w-2xl">
              Prices shown are typical ranges. Photos help confirm your exact price and can save you money.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {pricingTiers.map((tier) => (
            <Card key={tier.id} className={`glass ${tier.popular ? "ring-2 ring-red-600" : ""}`}>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center justify-between">
                  <span>{tier.name}</span>
                  <span className="text-red-700">{tier.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{tier.description} • {tier.examples}</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {tier.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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
                  Find a lower written quote for the same service? We’ll match it. <PriceMatchTerms trigger={<span className="underline text-red-700 font-semibold cursor-pointer">See terms</span>} />
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-red-200">
            <p className="text-gray-700 font-medium mb-4">Ready to see exactly what your project will cost?</p>
            <div className="flex flex-row gap-4 justify-center">
              <a
                href={`tel:${settings.phoneE164}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg text-white ring-1 ring-white/30 h-11 px-6 hover:bg-red-700/45 transition-colors font-semibold flex-1 sm:flex-initial min-w-0 text-center bg-red-700"
              >
                <Phone className="h-4 w-4" /> Call {settings.phone}
              </a>
              <a
                href={`sms:${settings.phoneE164}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-800 text-red-800 hover:bg-red-800 hover:text-white h-11 px-6 transition-colors font-semibold flex-1 sm:flex-initial min-w-0 text-center bg-transparent"
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
