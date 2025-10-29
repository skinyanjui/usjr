import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconContainerProps {
  icon: LucideIcon
  color?: 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'teal'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function IconContainer({
  icon: Icon,
  color = 'blue',
  size = 'md',
  className,
}: IconContainerProps) {
  const getColorClasses = (color: NonNullable<IconContainerProps['color']>) => {
    const colorMap = {
      red: 'bg-blue-800 text-white',
      orange: 'bg-orange-600 text-white',
      green: 'bg-green-600 text-white',
      blue: 'bg-blue-600 text-white',
      purple: 'bg-purple-600 text-white',
      teal: 'bg-teal-600 text-white',
    } as const
    return colorMap[color]
  }

  const getSizeClasses = (size: NonNullable<IconContainerProps['size']>) => {
    const sizeMap = {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-20 h-20',
    } as const
    return sizeMap[size]
  }

  const getIconSize = (size: NonNullable<IconContainerProps['size']>) => {
    const iconSizeMap = {
      sm: 'h-5 w-5',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    } as const
    return iconSizeMap[size]
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full shadow-lg',
        getColorClasses(color),
        getSizeClasses(size),
        className
      )}
    >
      <Icon className={getIconSize(size)} />
    </div>
  )
}
