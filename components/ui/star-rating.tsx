import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  className?: string
  starClassName?: string
  fillClassName?: string
  emptyClassName?: string
}

export function StarRating({
  rating,
  className,
  starClassName,
  fillClassName = "fill-yellow-400 text-yellow-400",
  emptyClassName = "text-muted-foreground"
}: StarRatingProps) {
  return (
    <div
      className={cn('flex gap-0.5', className)}
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            starClassName,
            i < Math.round(rating) ? fillClassName : emptyClassName
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
