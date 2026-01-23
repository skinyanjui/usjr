import { Card, type CardProps } from '@/components/ui/card'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends CardProps {
  variant?: 'default' | 'elevated' | 'white'
  hover?: boolean
}

// Deprecated "GlassCard" - now just a clean Geist card
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = true, ...props }, ref) => {
    // Geist doesn't use glass. We map "glass" concepts to Geist surfaces.
    // default -> standard card (white w/ border)
    // elevated -> slightly more shadow
    // white -> standard card

    const baseClasses = cn(
      'bg-card text-card-foreground border-border', // Standard clean card
      'px-6 py-6 space-y-4',
      className
    )

    // Geist cards are usually static or have very subtle hover
    const hoverClasses = hover ? 'hover:border-foreground/20 transition-colors duration-200' : ''

    return (
      <Card
        className={cn(baseClasses, hoverClasses)}
        ref={ref}
        {...props}
      />
    )
  }
)

GlassCard.displayName = 'GlassCard'
