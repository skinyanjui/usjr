import { Check } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemedButton } from "@/components/ui/themed-button"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  color?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  ctaText?: string
  ctaLink?: string
  className?: string
}

const colorToClasses: Record<NonNullable<PricingCardProps["color"]>, string> = {
  red: "text-red-700 border-red-200",
  orange: "text-orange-700 border-orange-200",
  green: "text-green-700 border-green-200",
  blue: "text-blue-700 border-blue-200",
  purple: "text-purple-700 border-purple-200",
  teal: "text-teal-700 border-teal-200",
}

export function PricingCard({
  title,
  price,
  description,
  features,
  popular,
  color = "red",
  ctaText = "Get Quote",
  ctaLink = "/quote",
  className,
}: PricingCardProps) {
  const colorClasses = colorToClasses[color]

  return (
    <Card
      className={cn(
        "relative h-full flex flex-col border pricing-card",
        popular ? "bg-red-50/70 border-red-200" : "bg-white/90",
        className
      )}
    >
      {popular && (
        <div className="absolute -top-2 right-4">
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-600 text-white shadow-xs">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn("text-2xl font-extrabold", colorClasses)}>{price}</div>
        <p className="text-sm text-gray-600">{description}</p>
        <ul className="space-y-2 text-sm">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className={cn("size-4 mt-0.5", colorClasses.split(" ")[0])} />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <ThemedButton asChild theme={color} variant="outline" className="w-full font-semibold">
            <Link href={ctaLink}>{ctaText}</Link>
          </ThemedButton>
        </div>
      </CardContent>
    </Card>
  )
}