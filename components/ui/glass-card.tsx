import { Card, type CardProps } from '@/components/ui/card'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends CardProps {
  variant?: 'default' | 'colored' | 'white'
  color?: 'accent' | 'success' | 'warning' | 'info'
  hover?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', color = 'accent', hover = true, ...props }, ref) => {
    const getColorClasses = (color: NonNullable<GlassCardProps['color']>) => {
      const colorMap = {
        accent: 'border-red-600 dark:border-red-500 bg-red-50/50 dark:bg-red-950/30',
        success: 'border-green-600 dark:border-green-500 bg-green-50/50 dark:bg-green-950/30',
        warning: 'border-orange-600 dark:border-orange-500 bg-orange-50/50 dark:bg-orange-950/30',
        info: 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30',
      } as const
      return colorMap[color]
    }

    const baseClasses = cn(
      variant === 'white' ? 'bg-card text-foreground' : 'glass dark:glass-dark',
      'px-6 py-6 space-y-4 text-foreground'
    )
    const hoverClasses = hover ? 'hover:shadow-xl transition-all duration-300' : ''
    const colorClasses = variant === 'colored' ? getColorClasses(color) : ''

    return (
      <Card
        className={cn(baseClasses, hoverClasses, colorClasses, className)}
        ref={ref}
        {...props}
      />
    )
  }
)

GlassCard.displayName = 'GlassCard'
