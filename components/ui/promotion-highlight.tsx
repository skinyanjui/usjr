import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { StructuredData } from '@/components/structured-data'
import { Percent, Clock, MapPin } from 'lucide-react'

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
  theme?: 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'teal'
  showStructuredData?: boolean
}

const themeColors = {
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    accent: 'text-red-600',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    accent: 'text-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    accent: 'text-green-600',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    accent: 'text-orange-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    accent: 'text-purple-600',
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-800',
    accent: 'text-teal-600',
  },
}

export function PromotionHighlight({
  location,
  offers,
  theme = 'red',
  showStructuredData = true,
}: PromotionHighlightProps) {
  const colors = themeColors[theme]

  if (offers.length === 0) return null

  return (
    <>
      <section className={`py-8 ${colors.bg} rounded-xl border ${colors.border}`}>
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-6 text-center">
            <h2 className={`text-2xl font-bold ${colors.text} mb-2`}>
              {location ? `Special ${location} Offers` : 'Current Promotions'}
            </h2>
            <p className="text-muted-foreground">Limited-time savings for our local customers</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {offers.map((offer, index) => (
              <Card key={index} className="bg-card shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`${colors.accent} mt-1`}>
                      {offer.locationSpecific ? (
                        <MapPin className="h-5 w-5" />
                      ) : offer.validThrough ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <Percent className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1 font-semibold">{offer.title}</h3>
                      <Badge className={`${colors.bg} ${colors.text} mb-2 border-0`}>
                        {offer.discount}
                      </Badge>
                      <p className="text-muted-foreground text-sm">{offer.description}</p>
                      {offer.validThrough && (
                        <p className="mt-2 text-xs text-gray-500">
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
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                <MapPin className="mr-1 inline h-4 w-4" />
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
            locationOffers: offers,
          }}
        />
      )}
    </>
  )
}
