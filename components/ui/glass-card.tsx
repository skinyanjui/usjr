import { Card, type CardProps } from '@/components/ui/card'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends CardProps {
  variant?: 'default' | 'colored' | 'white'
  color?: 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'teal'
  hover?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', color = 'red', hover = true, ...props }, ref) => {
    const getColorClasses = (color: NonNullable<GlassCardProps['color']>) => {
      const colorMap = {
        red: 'border-red-200 bg-red-50/50',
        orange: 'border-orange-200 bg-orange-50/50',
        green: 'border-green-200 bg-green-50/50',
        blue: 'border-blue-200 bg-blue-50/50',
        purple: 'border-purple-200 bg-purple-50/50',
        teal: 'border-teal-200 bg-teal-50/50',
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
