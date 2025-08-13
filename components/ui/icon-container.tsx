import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconContainerProps {
  icon: LucideIcon
  color?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function IconContainer({ icon: Icon, color = "red", size = "md", className }: IconContainerProps) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      red: "bg-red-600 text-white",
      orange: "bg-orange-600 text-white",
      green: "bg-green-600 text-white",
      blue: "bg-blue-600 text-white",
      purple: "bg-purple-600 text-white",
      teal: "bg-teal-600 text-white",
    }
    return colorMap[color] || colorMap.red
  }

  const getSizeClasses = (size: string) => {
    const sizeMap = {
      sm: "w-12 h-12",
      md: "w-16 h-16",
      lg: "w-20 h-20",
    }
    return sizeMap[size] || sizeMap.md
  }

  const getIconSize = (size: string) => {
    const iconSizeMap = {
      sm: "h-5 w-5",
      md: "h-8 w-8",
      lg: "h-10 w-10",
    }
    return iconSizeMap[size] || iconSizeMap.md
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center shadow-lg",
        getColorClasses(color),
        getSizeClasses(size),
        className,
      )}
    >
      <Icon className={getIconSize(size)} />
    </div>
  )
}
