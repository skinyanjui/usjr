import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StructuredData } from '@/components/structured-data'
import { StarRating } from '@/components/ui/star-rating'
import { Users, CheckCircle } from 'lucide-react'

interface ReviewMentionProps {
  averageRating: number
  reviewCount: number
  showStructuredData?: boolean
  variant?: 'compact' | 'detailed' | 'banner'
  theme?: 'primary' | 'neutral'
  location?: string
}

const themeColors = {
  primary: {
    bg: 'bg-primary/5',
    text: 'text-primary',
    border: 'border-primary/20',
  },
  neutral: {
    bg: 'bg-muted/30',
    text: 'text-foreground',
    border: 'border-border',
  },
}

export function ReviewMention({
  averageRating,
  reviewCount,
  showStructuredData = true,
  variant = 'compact',
  theme = 'primary',
  location,
}: ReviewMentionProps) {
  const colors = themeColors[theme]

  if (variant === 'compact') {
    return (
      <>
        <div className="inline-flex items-center gap-2">
          <StarRating
            rating={Math.floor(averageRating)}
            className="items-center gap-1"
            starClassName="h-3 w-3"
            fillClassName={`fill-current ${colors.text}`}
            emptyClassName="text-gray-300"
          />
          <Badge className={`${colors.bg} ${colors.text} border-0`}>
            {averageRating.toFixed(1)} from {reviewCount}+ customers
          </Badge>
        </div>

        {showStructuredData && (
          <StructuredData
            type="Review"
            data={{
              reviews: {
                averageRating,
                reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
            }}
          />
        )}
      </>
    )
  }

  if (variant === 'banner') {
    return (
      <>
        <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating
                rating={Math.floor(averageRating)}
                className="items-center gap-1"
                starClassName="h-5 w-5"
                fillClassName={`fill-current ${colors.text}`}
                emptyClassName="text-gray-300"
              />
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
            </div>
            <div className="text-muted-foreground">
              <Users className="mr-1 inline h-5 w-5" />
              {reviewCount}+ satisfied customers{location ? ` in ${location}` : ''}
            </div>
            <CheckCircle className={`h-5 w-5 ${colors.text}`} />
          </div>
        </div>

        {showStructuredData && (
          <StructuredData
            type="Review"
            data={{
              reviews: {
                averageRating,
                reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
            }}
          />
        )}
      </>
    )
  }

  // detailed variant
  return (
    <>
      <Card className={`${colors.bg} border ${colors.border}`}>
        <CardContent className="p-6 text-center">
          <StarRating
            rating={Math.floor(averageRating)}
            className="mb-4 justify-center gap-2"
            starClassName="h-6 w-6"
            fillClassName={`fill-current ${colors.text}`}
            emptyClassName="text-gray-300"
          />
          <div className="space-y-2">
            <div className="text-foreground text-3xl font-bold">{averageRating.toFixed(1)}/5.0</div>
            <p className="text-muted-foreground">
              Based on {reviewCount}+ verified customer reviews
            </p>
            {location && (
              <p className="text-sm text-gray-500">
                From satisfied customers in {location} and surrounding areas
              </p>
            )}
            <div className="mt-4 flex items-center justify-center gap-2">
              <CheckCircle className={`h-5 w-5 ${colors.text}`} />
              <span className="text-muted-foreground text-sm font-medium">
                Trusted Local Service
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {showStructuredData && (
        <StructuredData
          type="Review"
          data={{
            reviews: {
              averageRating,
              reviewCount,
              bestRating: 5,
              worstRating: 1,
            },
          }}
        />
      )}
    </>
  )
}
