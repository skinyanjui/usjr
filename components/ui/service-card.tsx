import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
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
  image?: string
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
  image,
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
          title: 'text-base font-bold', // Increased from text-sm
          description: 'text-sm', // Increased from text-xs
          price: 'text-sm', // Increased from text-xs
          category: 'text-sm font-semibold uppercase tracking-wide', // Increased from text-xs
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
          price: 'text-sm', // Increased from text-xs
          category: 'text-sm font-semibold uppercase tracking-wide', // Increased from text-xs
        }
    }
  }

  const colors = getColorClasses(color)
  const sizes = getSizeClasses(size)

  return (
    <Card
      className={`linear-card linear-interactive overflow-hidden ${sizes.card} text-sm sm:text-base`}
    >
      <div className={`relative ${sizes.banner} w-full overflow-hidden`}>
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/40" />
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Icon className={`h-8 w-8 text-white drop-shadow-lg`} />
              <span className={`text-white ${sizes.category} drop-shadow-lg`}>{category}</span>
            </div>
          </>
        ) : (
          <div
            className={`flex ${sizes.banner} w-full flex-col items-center justify-center gap-2 ${colors.banner}`}
            aria-hidden
          >
            <Icon className={`h-8 w-8 ${colors.icon}`} />
            <span className={`${colors.bannerText} ${sizes.category}`}>{category}</span>
          </div>
        )}
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
