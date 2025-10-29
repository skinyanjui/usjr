import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconContainerProps {
  icon: LucideIcon
  variant?: 'default' | 'light' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function IconContainer({
  icon: Icon,
  variant = 'default',
  size = 'md',
  className,
}: IconContainerProps) {
  const getVariantClasses = (variant: NonNullable<IconContainerProps['variant']>) => {
    const variantMap = {
      default: 'bg-gray-900 text-white dark:bg-white dark:text-gray-900',
      light: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
      outline:
        'border-2 border-gray-300 bg-transparent text-gray-900 dark:border-gray-600 dark:text-gray-100',
    } as const
    return variantMap[variant]
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
        getVariantClasses(variant),
        getSizeClasses(size),
        className
      )}
    >
      <Icon className={getIconSize(size)} />
    </div>
  )
}
