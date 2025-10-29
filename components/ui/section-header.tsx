import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', centered && 'text-center', className)}>
      {subtitle && (
        <p className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
          {subtitle}
        </p>
      )}
      <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      {description && (
        <p className="text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
