"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemedButton } from "@/components/ui/themed-button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

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

export function PricingCard({
  title,
  price,
  description,
  features,
  popular = false,
  color = "red",
  ctaText = "Get Quote",
  ctaLink = "/quote",
  className,
}: PricingCardProps) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      red: "border-red-200 text-red-600",
      orange: "border-orange-200 text-orange-600",
      green: "border-green-200 text-green-600",
      blue: "border-blue-200 text-blue-600",
      purple: "border-purple-200 text-purple-600",
      teal: "border-teal-200 text-teal-600",
    }
    return colorMap[color] || colorMap.red
  }

  return (
    <Card className={cn("glass relative", popular && "ring-2 ring-offset-2", getColorClasses(color), className)}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white">
          Most Popular
        </Badge>
      )}

      <CardHeader className="text-center px-6 py-4 space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className={cn("text-3xl font-bold", getColorClasses(color).split(" ")[1])}>{price}</div>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardHeader>

      <CardContent className="px-6 py-4 space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <Link href={ctaLink}>
            <ThemedButton theme={color} fullWidth>
              {ctaText}
            </ThemedButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
