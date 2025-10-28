import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  price: string
  icon: LucideIcon
  color?: 'accent' | 'success' | 'warning' | 'info'
  link: string
  category: string
  size?: 'small' | 'medium' | 'large'
}

export function ServiceCard({
  title,
  description,
  price,
  icon: Icon,
  color = 'accent',
  link,
  category,
  size = 'medium',
}: ServiceCardProps) {
  const getColorClasses = (color: ServiceCardProps['color']) => {
    const colorMap = {
      accent: {
        border: 'border-red-600 dark:border-red-500',
        bg: 'bg-red-50 dark:bg-red-950/30',
        banner: 'bg-red-600 dark:bg-red-700',
        bannerText: 'text-white',
        text: 'text-red-600 dark:text-red-400',
        textStrong: 'text-red-700 dark:text-red-300',
        button: 'bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700',
        icon: 'text-red-600 dark:text-red-400',
      },
      success: {
        border: 'border-green-600 dark:border-green-500',
        bg: 'bg-green-50 dark:bg-green-950/30',
        banner: 'bg-green-600 dark:bg-green-700',
        bannerText: 'text-white',
        text: 'text-green-600 dark:text-green-400',
        textStrong: 'text-green-700 dark:text-green-300',
        button: 'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700',
        icon: 'text-green-600 dark:text-green-400',
      },
      warning: {
        border: 'border-orange-600 dark:border-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-950/30',
        banner: 'bg-orange-600 dark:bg-orange-700',
        bannerText: 'text-white',
        text: 'text-orange-600 dark:text-orange-400',
        textStrong: 'text-orange-700 dark:text-orange-300',
        button: 'bg-orange-700 hover:bg-orange-800 dark:bg-orange-600 dark:hover:bg-orange-700',
        icon: 'text-orange-600 dark:text-orange-400',
      },
      info: {
        border: 'border-blue-600 dark:border-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        banner: 'bg-blue-600 dark:bg-blue-700',
        bannerText: 'text-white',
        text: 'text-blue-600 dark:text-blue-400',
        textStrong: 'text-blue-700 dark:text-blue-300',
        button: 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700',
        icon: 'text-blue-600 dark:text-blue-400',
      },
    } as const
    return colorMap[color || 'accent']
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return {
          card: 'h-full',
          banner: 'h-36',
          content: 'px-4 py-4 space-y-3',
          title: 'text-sm font-bold',
          description: 'text-xs',
          price: 'text-xs',
          category: 'text-xs font-semibold uppercase tracking-wide',
        }
      case 'large':
        return {
          card: 'h-full',
          banner: 'h-48',
          content: 'px-6 py-6 space-y-4',
          title: 'text-xl font-bold',
          description: 'text-base',
          price: 'text-sm',
          category: 'text-sm font-semibold uppercase tracking-wide',
        }
      default:
        return {
          card: 'h-full',
          banner: 'h-32',
          content: 'px-6 py-4 space-y-4',
          title: 'text-lg font-bold',
          description: 'text-sm',
          price: 'text-xs',
          category: 'text-xs font-semibold uppercase tracking-wide',
        }
    }
  }

  const colors = getColorClasses(color)
  const sizes = getSizeClasses(size)

  return (
    <Card
      className={`glass dark:glass-dark transition-all duration-300 hover:scale-105 hover:shadow-xl ${colors.border} overflow-hidden ${sizes.card} text-[12px] sm:text-[13px] md:text-[14px]`}
    >
      <div
        className={`flex ${sizes.banner} w-full flex-col items-center justify-center gap-2 ${colors.banner}`}
        aria-hidden
      >
        <Icon className={`h-8 w-8 ${colors.icon}`} />
        <span className={`${colors.bannerText} ${sizes.category}`}>{category}</span>
      </div>
      <CardContent className={`${sizes.content}`}>
        <div className="flex items-start justify-between">
          <h3 className={`${sizes.title} text-foreground`}>{title}</h3>
          <div className={`${sizes.price} ${colors.text}`}>{price}</div>
        </div>
        <p className={`${sizes.description} text-muted-foreground`}>{description}</p>
        <div className="pt-2">
          <Button asChild size="xs" className={`${colors.button} text-primary-foreground`}>
            <Link href={link} aria-label={`View ${title} details`} title={`View ${title} details`}>
              View {title} details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
