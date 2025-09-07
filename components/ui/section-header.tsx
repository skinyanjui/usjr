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
        <p className="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">
          {subtitle}
        </p>
      )}
      <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-4xl md:text-5xl">{title}</h2>
      {description && (
        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">{description}</p>
      )}
    </div>
  )
}
