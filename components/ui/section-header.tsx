import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, description, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {subtitle && <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{subtitle}</p>}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
      {description && <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>}
    </div>
  )
}
