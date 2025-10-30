import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export interface QuoteServiceCardProps {
  title: string
  description: string
  pricing: Array<{ id: string; name: string; price: string }> | string[]
  features: string[]
  primaryLink: string
  primaryButtonText: string
  secondaryLink: string
  secondaryButtonText: string
}

export function QuoteServiceCard({
  title,
  description,
  pricing,
  features,
  primaryLink,
  primaryButtonText,
  secondaryLink,
  secondaryButtonText,
}: QuoteServiceCardProps) {
  return (
    <Card className="glass border-border border-2 transition-all duration-300 hover:border-primary/50">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-foreground mb-2 text-xl font-bold sm:text-2xl">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="mb-2 font-semibold text-foreground">
              {Array.isArray(pricing) && typeof pricing[0] === 'object' ? 'Starting Prices:' : 'Service Prices:'}
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {pricing.map((item, index) => (
                <li key={typeof item === 'object' ? item.id : index}>
                  {typeof item === 'object' ? `• ${item.name}: ${item.price}` : item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="text-muted-foreground text-sm">
                • {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full bg-primary text-primary-foreground hover:brightness-110">
            <Link href={primaryLink}>{primaryButtonText}</Link>
          </Button>
          <Link href={secondaryLink}>
            <Button
              variant="outline"
              className="w-full border-border bg-transparent text-foreground hover:bg-accent"
            >
              {secondaryButtonText}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
