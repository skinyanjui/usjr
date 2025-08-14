import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemedButton } from "@/components/ui/themed-button"

interface PricingCardProps {
  title: string
  price: string
  description?: string
  features?: string[]
  popular?: boolean
  color?: string
  ctaText?: string
  ctaLink?: string
  className?: string
}

export function PricingCard({ title, price, description, features = [], popular = false, color = "red", ctaText = "Get Quote", ctaLink = "/quote", className }: PricingCardProps) {
  return (
    <Card className={cn("relative flex h-full flex-col border", className)}>
      {popular ? (
        <div className="absolute right-3 top-3 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-semibold text-gray-900">Most popular</div>
      ) : null}
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">{title}</CardTitle>
        <div className="text-2xl font-extrabold text-gray-900">{price}</div>
        {description ? <p className="text-sm text-gray-600">{description}</p> : null}
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        {features?.length ? (
          <ul className="space-y-2 text-sm text-gray-700">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1 inline-block size-1.5 rounded-full" style={{ backgroundColor: color === "red" ? "#b91c1c" : undefined }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="pt-3">
          <ThemedButton asChild theme={color as any} className="w-full">
            <Link href={ctaLink}>{ctaText}</Link>
          </ThemedButton>
        </div>
      </CardContent>
    </Card>
  )
}