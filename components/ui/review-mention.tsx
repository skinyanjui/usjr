import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StructuredData } from "@/components/structured-data"
import { Star, Users, CheckCircle } from "lucide-react"

interface ReviewMentionProps {
  averageRating: number
  reviewCount: number
  showStructuredData?: boolean
  variant?: "compact" | "detailed" | "banner"
  theme?: "red" | "blue" | "green" | "orange" | "purple" | "teal"
  location?: string
}

const themeColors = {
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200"
  },
  blue: {
    bg: "bg-blue-50", 
    text: "text-blue-600",
    border: "border-blue-200"
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600", 
    border: "border-green-200"
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200"
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200"
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    border: "border-teal-200"
  }
}

export function ReviewMention({ 
  averageRating, 
  reviewCount, 
  showStructuredData = true,
  variant = "compact",
  theme = "red",
  location
}: ReviewMentionProps) {
  const colors = themeColors[theme]
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(averageRating))

  if (variant === "compact") {
    return (
      <>
        <div className="inline-flex items-center gap-2">
          <div className="flex items-center gap-1">
            {stars.map((filled, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${filled ? `fill-current ${colors.text}` : 'text-gray-300'}`}
              />
            ))}
          </div>
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
                worstRating: 1
              }
            }}
          />
        )}
      </>
    )
  }

  if (variant === "banner") {
    return (
      <>
        <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {stars.map((filled, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${filled ? `fill-current ${colors.text}` : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="font-semibold text-lg">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="text-gray-600">
              <Users className="w-5 h-5 inline mr-1" />
              {reviewCount}+ satisfied customers{location ? ` in ${location}` : ''}
            </div>
            <CheckCircle className={`w-5 h-5 ${colors.text}`} />
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
                worstRating: 1
              }
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
          <div className="flex items-center justify-center gap-2 mb-4">
            {stars.map((filled, index) => (
              <Star
                key={index}
                className={`w-6 h-6 ${filled ? `fill-current ${colors.text}` : 'text-gray-300'}`}
              />
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gray-900">
              {averageRating.toFixed(1)}/5.0
            </div>
            <p className="text-gray-600">
              Based on {reviewCount}+ verified customer reviews
            </p>
            {location && (
              <p className="text-sm text-gray-500">
                From satisfied customers in {location} and surrounding areas
              </p>
            )}
            <div className="flex items-center justify-center gap-2 mt-4">
              <CheckCircle className={`w-5 h-5 ${colors.text}`} />
              <span className="text-sm font-medium text-gray-700">
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
              worstRating: 1
            }
          }}
        />
      )}
    </>
  )
}