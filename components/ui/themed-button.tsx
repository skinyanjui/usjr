import { Button, type ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ThemedButtonProps extends ButtonProps {
  theme?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  fullWidth?: boolean
}

export const ThemedButton = forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ className, theme = "red", fullWidth = false, variant = "default", ...props }, ref) => {
    const getThemeClasses = (theme: NonNullable<ThemedButtonProps["theme"]>, variant: string) => {
      const baseClasses = "font-semibold transition-all duration-200"

      if (variant === "outline") {
        const outlineMap = {
          red: "border-red-800 text-red-800 hover:bg-red-800 hover:text-white bg-transparent",
          orange: "border-orange-800 text-orange-800 hover:bg-orange-800 hover:text-white bg-transparent",
          green: "border-green-800 text-green-800 hover:bg-green-800 hover:text-white bg-transparent",
          blue: "border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white bg-transparent",
          purple: "border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white bg-transparent",
          teal: "border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white bg-transparent",
        } as const
        return `${baseClasses} ${outlineMap[theme]}`
      }

      const solidMap = {
        red: "bg-red-700 hover:bg-red-800 text-white",
        orange: "bg-orange-700 hover:bg-orange-800 text-white",
        green: "bg-green-700 hover:bg-green-800 text-white",
        blue: "bg-blue-700 hover:bg-blue-800 text-white",
        purple: "bg-purple-700 hover:bg-purple-800 text-white",
        teal: "bg-teal-700 hover:bg-teal-800 text-white",
      } as const
      return `${baseClasses} ${solidMap[theme]}`
    }

    return (
      <Button
        className={cn(getThemeClasses(theme, (variant as string) || "default"), fullWidth && "w-full", className)}
        variant={variant}
        ref={ref}
        {...props}
      />
    )
  },
)

ThemedButton.displayName = "ThemedButton"
