import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemedButton } from "@/components/ui/themed-button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
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
  const colorTextMap: Record<NonNullable<PricingCardProps["color"]>, string> = {
    red: "text-red-700",
    orange: "text-orange-700",
    green: "text-green-700",
    blue: "text-blue-700",
    purple: "text-purple-700",
    teal: "text-teal-700",
  }

  const colorBgMap: Record<NonNullable<PricingCardProps["color"]>, string> = {
    red: "bg-red-700",
    orange: "bg-orange-700",
    green: "bg-green-700",
    blue: "bg-blue-700",
    purple: "bg-purple-700",
    teal: "bg-teal-700",
  }

  return (
    <div className="relative">
      {popular && (
        <div
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-xs",
            colorBgMap[color],
          )}
        >
          Most Popular
        </div>
      )}
      <Card className={cn("pricing-card h-full flex flex-col", className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          <div className={cn("text-3xl font-bold", colorTextMap[color])}>{price}</div>
          <p className="text-sm text-gray-600">{description}</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className={cn("mt-0.5 size-4", colorTextMap[color])} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <ThemedButton asChild theme={color} className="w-full">
            <Link href={ctaLink}>{ctaText}</Link>
          </ThemedButton>
        </CardFooter>
      </Card>
    </div>
  )
}