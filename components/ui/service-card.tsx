import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  price: string
  icon: LucideIcon
  color: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  link: string
  category: string
  size?: "small" | "medium" | "large"
}

export function ServiceCard({
  title,
  description,
  image,
  price,
  icon: Icon,
  color,
  link,
  category,
  size = "medium",
}: ServiceCardProps) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      red: {
        border: "border-red-200",
        bg: "bg-red-50",
        text: "text-red-600",
        button: "bg-red-600 hover:bg-red-700",
        icon: "text-red-600",
      },
      orange: {
        border: "border-orange-200",
        bg: "bg-orange-50",
        text: "text-orange-600",
        button: "bg-orange-600 hover:bg-orange-700",
        icon: "text-orange-600",
      },
      green: {
        border: "border-green-200",
        bg: "bg-green-50",
        text: "text-green-600",
        button: "bg-green-600 hover:bg-green-700",
        icon: "text-green-600",
      },
      blue: {
        border: "border-blue-200",
        bg: "bg-blue-50",
        text: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700",
        icon: "text-blue-600",
      },
      purple: {
        border: "border-purple-200",
        bg: "bg-purple-50",
        text: "text-purple-600",
        button: "bg-purple-600 hover:bg-purple-700",
        icon: "text-purple-600",
      },
      teal: {
        border: "border-teal-200",
        bg: "bg-teal-50",
        text: "text-teal-600",
        button: "bg-teal-600 hover:bg-teal-700",
        icon: "text-teal-600",
      },
    }
    return colorMap[color] || colorMap.red
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return {
          card: "h-auto",
          image: "h-24",
          content: "px-4 py-4 space-y-3",
          title: "text-sm font-bold",
          description: "text-xs",
          price: "text-xs",
        }
      case "large":
        return {
          card: "h-full",
          image: "h-48",
          content: "px-6 py-6 space-y-4",
          title: "text-xl font-bold",
          description: "text-base",
          price: "text-sm",
        }
      default:
        return {
          card: "h-full",
          image: "h-32",
          content: "px-6 py-4 space-y-4",
          title: "text-lg font-bold",
          description: "text-sm",
          price: "text-xs",
        }
    }
  }

  const colors = getColorClasses(color)
  const sizes = getSizeClasses(size)

  return (
    <Card
      className={`glass hover:shadow-xl transition-all duration-300 hover:scale-105 ${colors.border} overflow-hidden ${sizes.card}`}
    >
      <div className={`relative ${sizes.image} w-full`}>
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className={`absolute top-3 left-3 p-2 rounded-full ${colors.bg} shadow-lg`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-semibold`}
        >
          {category}
        </div>
      </div>
      <CardContent className={sizes.content}>
        <div className="flex items-center justify-between">
          <h3 className={`${sizes.title} text-gray-900`}>{title}</h3>
          <span className={`${sizes.price} font-semibold px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
            {price}
          </span>
        </div>
        <p className={`text-gray-600 ${sizes.description} leading-relaxed`}>{description}</p>

        <div className="flex gap-2 pt-2">
          <Button asChild size="sm" className={`flex-1 ${colors.button} text-white text-xs`}>
            <Link href={link}>Learn More</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="text-xs bg-transparent">
            <Link href="/quote">Quote</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
