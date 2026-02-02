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
    <Card className="glass border-border hover:border-primary/50 border-2 transition-all duration-300">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-foreground mb-2 text-xl font-bold sm:text-2xl">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-foreground mb-2 font-semibold">
              {Array.isArray(pricing) && typeof pricing[0] === 'object'
                ? 'Starting Prices:'
                : 'Service Prices:'}
            </h3>
            <ul className="text-muted-foreground space-y-1 text-sm">
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
          <Button
            asChild
            className="bg-primary text-primary-foreground w-full hover:brightness-110"
          >
            <Link href={primaryLink}>{primaryButtonText}</Link>
          </Button>
          <Link href={secondaryLink}>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-accent w-full bg-transparent"
            >
              {secondaryButtonText}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
