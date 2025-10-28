import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  price: string
  icon: LucideIcon
  color: 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'teal'
  link: string
  category: string
  size?: 'small' | 'medium' | 'large'
}

export function ServiceCard({
  title,
  description,
  price,
  icon: Icon,
  color,
  link,
  category,
  size = 'medium',
}: ServiceCardProps) {
  const getColorClasses = (color: ServiceCardProps['color']) => {
    const colorMap = {
      red: {
        border: 'border-red-200',
        bg: 'bg-red-50',
        banner: 'bg-red-200',
        bannerText: 'text-red-900',
        text: 'text-red-600',
        textStrong: 'text-red-700',
        button: 'bg-red-700 hover:bg-red-800',
        icon: 'text-red-600',
      },
      orange: {
        border: 'border-orange-200',
        bg: 'bg-orange-50',
        banner: 'bg-orange-200',
        bannerText: 'text-orange-900',
        text: 'text-orange-700',
        textStrong: 'text-orange-800',
        button: 'bg-orange-700 hover:bg-orange-800',
        icon: 'text-orange-700',
      },
      green: {
        border: 'border-green-200',
        bg: 'bg-green-50',
        banner: 'bg-green-200',
        bannerText: 'text-green-900',
        text: 'text-green-600',
        textStrong: 'text-green-700',
        button: 'bg-green-700 hover:bg-green-800',
        icon: 'text-green-600',
      },
      blue: {
        border: 'border-blue-200',
        bg: 'bg-blue-50',
        banner: 'bg-blue-200',
        bannerText: 'text-blue-900',
        text: 'text-blue-600',
        textStrong: 'text-blue-700',
        button: 'bg-blue-700 hover:bg-blue-800',
        icon: 'text-blue-600',
      },
      purple: {
        border: 'border-purple-200',
        bg: 'bg-purple-50',
        banner: 'bg-purple-200',
        bannerText: 'text-purple-900',
        text: 'text-purple-600',
        textStrong: 'text-purple-700',
        button: 'bg-purple-700 hover:bg-purple-800',
        icon: 'text-purple-600',
      },
      teal: {
        border: 'border-teal-200',
        bg: 'bg-teal-50',
        banner: 'bg-teal-200',
        bannerText: 'text-teal-900',
        text: 'text-teal-600',
        textStrong: 'text-teal-700',
        button: 'bg-teal-700 hover:bg-teal-800',
        icon: 'text-teal-600',
      },
    } as const
    return colorMap[color]
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
