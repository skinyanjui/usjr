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
  theme?: 'primary' | 'neutral'
  showStructuredData?: boolean
}

const themeColors = {
  primary: {
    bg: 'bg-primary/5',
    border: 'border-primary/20',
    text: 'text-primary',
    accent: 'text-primary',
  },
  neutral: {
    bg: 'bg-muted/30',
    border: 'border-border',
    text: 'text-foreground',
    accent: 'text-muted-foreground',
  },
}

export function PromotionHighlight({
  location,
  offers,
  theme = 'primary',
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
