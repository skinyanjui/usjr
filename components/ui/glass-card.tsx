import { Card, type CardProps } from '@/components/ui/card'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends CardProps {
  variant?: 'default' | 'elevated' | 'white'
  hover?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = true, ...props }, ref) => {
    const baseClasses = cn(
      variant === 'white'
        ? 'bg-card text-foreground'
        : variant === 'elevated'
          ? 'bg-popover text-popover-foreground border-border'
          : 'glass dark:glass-dark',
      'px-6 py-6 space-y-4 text-foreground'
    )
    const hoverClasses = hover ? 'hover:shadow-xl transition-all duration-300' : ''

    return <Card className={cn(baseClasses, hoverClasses, className)} ref={ref} {...props} />
  }
)

GlassCard.displayName = 'GlassCard'
