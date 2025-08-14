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
  const getColorClasses = (color: ServiceCardProps["color"]) => {
    const colorMap = {
      red: {
        border: "border-red-200",
        bg: "bg-red-50",
        text: "text-red-600",
        textStrong: "text-red-700",
        button: "bg-red-700 hover:bg-red-800",
        icon: "text-red-600",
      },
      orange: {
        border: "border-orange-200",
        bg: "bg-orange-50",
        text: "text-orange-600",
        textStrong: "text-orange-700",
        button: "bg-orange-700 hover:bg-orange-800",
        icon: "text-orange-600",
      },
      green: {
        border: "border-green-200",
        bg: "bg-green-50",
        text: "text-green-600",
        textStrong: "text-green-700",
        button: "bg-green-700 hover:bg-green-800",
        icon: "text-green-600",
      },
      blue: {
        border: "border-blue-200",
        bg: "bg-blue-50",
        text: "text-blue-600",
        textStrong: "text-blue-700",
        button: "bg-blue-700 hover:bg-blue-800",
        icon: "text-blue-600",
      },
      purple: {
        border: "border-purple-200",
        bg: "bg-purple-50",
        text: "text-purple-600",
        textStrong: "text-purple-700",
        button: "bg-purple-700 hover:bg-purple-800",
        icon: "text-purple-600",
      },
      teal: {
        border: "border-teal-200",
        bg: "bg-teal-50",
        text: "text-teal-600",
        textStrong: "text-teal-700",
        button: "bg-teal-700 hover:bg-teal-800",
        icon: "text-teal-600",
      },
    } as const
    return colorMap[color]
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
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={50}
          loading="lazy"
        />
        <div className={`absolute top-3 left-3 p-2 rounded-full ${colors.bg} shadow-lg`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <div
          className={`absolute top-3 right-3 px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.textStrong} text-[10px] sm:text-xs font-semibold`}
        >
          {category}
        </div>
      </div>
      <CardContent className={`${sizes.content}`}>
        <div className="flex items-start justify-between">
          <h3 className={`${sizes.title} text-gray-900`}>{title}</h3>
          <div className={`${sizes.price} ${colors.text}`}>{price}</div>
        </div>
        <p className={`${sizes.description} text-gray-600`}>{description}</p>
        <div className="pt-2">
          <Button asChild className={`${colors.button} text-white`}>
            <Link href={link} aria-label={`View ${title} details`} title={`View ${title} details`}>
              View {title} details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
