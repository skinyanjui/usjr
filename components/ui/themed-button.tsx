import { Button, type ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ThemedButtonProps extends ButtonProps {
  theme?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  fullWidth?: boolean
}

export const ThemedButton = forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ className, theme = "red", fullWidth = false, variant = "default", ...props }, ref) => {
    const getThemeClasses = (theme: string, variant: string) => {
      const baseClasses = "font-semibold transition-all duration-200"

      if (variant === "outline") {
        const outlineMap = {
          red: "border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent",
          orange: "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent",
          green: "border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent",
          blue: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent",
          purple: "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent",
          teal: "border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white bg-transparent",
        }
        return `${baseClasses} ${outlineMap[theme] || outlineMap.red}`
      }

      const solidMap = {
        red: "bg-red-600 hover:bg-red-700 text-white",
        orange: "bg-orange-600 hover:bg-orange-700 text-white",
        green: "bg-green-600 hover:bg-green-700 text-white",
        blue: "bg-blue-600 hover:bg-blue-700 text-white",
        purple: "bg-purple-600 hover:bg-purple-700 text-white",
        teal: "bg-teal-600 hover:bg-teal-700 text-white",
      }
      return `${baseClasses} ${solidMap[theme] || solidMap.red}`
    }

    return (
      <Button
        className={cn(getThemeClasses(theme, variant), fullWidth && "w-full", className)}
        variant={variant}
        ref={ref}
        {...props}
      />
    )
  },
)

ThemedButton.displayName = "ThemedButton"
