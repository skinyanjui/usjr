import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"
import { Percent, Clock, MapPin } from "lucide-react"

interface PromotionOffer {
  title: string
  discount: string
  description: string
  validFrom?: string | undefined
  validThrough?: string | undefined
  locationSpecific?: boolean
}

interface PromotionHighlightProps {
  location?: string
  offers: PromotionOffer[]
  theme?: "red" | "blue" | "green" | "orange" | "purple" | "teal"
  showStructuredData?: boolean
}

const themeColors = {
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    accent: "text-red-600"
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200", 
    text: "text-blue-800",
    accent: "text-blue-600"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800", 
    accent: "text-green-600"
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    accent: "text-orange-600"
  },
  purple: {
    bg: "bg-purple-50", 
    border: "border-purple-200",
    text: "text-purple-800",
    accent: "text-purple-600"
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200", 
    text: "text-teal-800",
    accent: "text-teal-600"
  }
}

export function PromotionHighlight({ 
  location, 
  offers, 
  theme = "red", 
  showStructuredData = true 
}: PromotionHighlightProps) {
  const colors = themeColors[theme]
  
  if (offers.length === 0) return null

  return (
    <>
      <section className={`py-8 ${colors.bg} rounded-xl border ${colors.border}`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold ${colors.text} mb-2`}>
              {location ? `Special ${location} Offers` : "Current Promotions"}
            </h2>
            <p className="text-gray-600">
              Limited-time savings for our local customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {offers.map((offer, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`${colors.accent} mt-1`}>
                      {offer.locationSpecific ? <MapPin className="w-5 h-5" /> : 
                       offer.validThrough ? <Clock className="w-5 h-5" /> : 
                       <Percent className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {offer.title}
                      </h3>
                      <Badge className={`${colors.bg} ${colors.text} border-0 mb-2`}>
                        {offer.discount}
                      </Badge>
                      <p className="text-sm text-gray-600">
                        {offer.description}
                      </p>
                      {offer.validThrough && (
                        <p className="text-xs text-gray-500 mt-2">
                          Valid through {new Date(offer.validThrough).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {location && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                <MapPin className="w-4 h-4 inline mr-1" />
                Exclusive offers for {location} area residents
              </p>
            </div>
          )}
        </div>
      </section>

      {showStructuredData && (
        <StructuredData
          type="Offer"
          data={{
            locationName: location,
            locationOffers: offers
          }}
        />
      )}
    </>
  )
}