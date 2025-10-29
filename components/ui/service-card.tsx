import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  price: string
  icon: LucideIcon
  color?: 'primary' | 'neutral'
  link: string
  category: string
  size?: 'small' | 'medium' | 'large'
}

export function ServiceCard({
  title,
  description,
  price,
  icon: Icon,
  color = 'primary',
  link,
  category,
  size = 'medium',
}: ServiceCardProps) {
  const getColorClasses = (color: ServiceCardProps['color']) => {
    const colorMap = {
      primary: {
        border: 'border-border',
        bg: 'bg-muted/30',
        banner: 'bg-primary',
        bannerText: 'text-primary-foreground',
        text: 'text-primary',
        textStrong: 'text-primary',
        button: 'bg-primary hover:bg-primary/90',
        icon: 'text-primary',
      },
      neutral: {
        border: 'border-border',
        bg: 'bg-muted/30',
        banner: 'bg-foreground',
        bannerText: 'text-background',
        text: 'text-foreground',
        textStrong: 'text-foreground',
        button: 'bg-foreground hover:bg-foreground/90',
        icon: 'text-foreground',
      },
    } as const
    return colorMap[color || 'primary']
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
