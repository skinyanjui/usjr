import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Wrench, BookOpen, MapPin } from 'lucide-react'

interface InternalLink {
  title: string
  href: string
  description: string
  type: 'service' | 'blog' | 'location'
  category?: string
}

interface InternalLinksProps {
  title?: string
  links: InternalLink[]
  variant?: 'grid' | 'list' | 'compact'
  theme?: 'primary' | 'neutral'
}

const themeColors = {
  primary: {
    button: 'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    badge: 'bg-primary/10 text-primary border-primary/20',
  },
  neutral: {
    button: 'border-border text-foreground hover:bg-muted',
    badge: 'bg-muted text-muted-foreground border-border',
  },
}

const getIcon = (type: InternalLink['type']) => {
  switch (type) {
    case 'service':
      return Wrench
    case 'blog':
      return BookOpen
    case 'location':
      return MapPin
    default:
      return ArrowRight
  }
}

export function InternalLinks({
  title = 'Related Content',
  links,
  variant = 'grid',
  theme = 'primary',
}: InternalLinksProps) {
  const colors = themeColors[theme]

  if (links.length === 0) return null

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {links.map((link, index) => {
            const Icon = getIcon(link.type)
            return (
              <Link key={index} href={link.href}>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${colors.button} group bg-transparent`}
                >
                  <Icon className="mr-1 h-4 w-4" />
                  {link.title}
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        <h3 className="text-foreground text-xl font-bold">{title}</h3>
        <div className="space-y-3">
          {links.map((link, index) => {
            const Icon = getIcon(link.type)
            return (
              <Card key={index} className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <Link href={link.href} className="group">
                    <div className="flex items-start gap-3">
                      <Icon className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-foreground font-semibold transition-colors group-hover:text-blue-600">
                            {link.title}
                          </h4>
                          <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" />
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">{link.description}</p>
                        {link.category && (
                          <Badge className={`${colors.badge} mt-2 text-xs`}>{link.category}</Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  // grid variant (default)
  return (
    <div className="space-y-4">
      <h3 className="text-foreground text-xl font-bold">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link, index) => {
          const Icon = getIcon(link.type)
          return (
            <Card key={index} className="group transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <Link href={link.href}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className="text-muted-foreground h-5 w-5" />
                      {link.category && (
                        <Badge className={`${colors.badge} text-xs`}>{link.category}</Badge>
                      )}
                    </div>
                    <h4 className="text-foreground font-semibold transition-colors group-hover:text-blue-600">
                      {link.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{link.description}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 transition-colors group-hover:text-blue-600">
                      <span>Learn more</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
