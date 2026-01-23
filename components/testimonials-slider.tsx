'use client'

import { useState, useEffect, memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { type Testimonial } from '@/lib/cms-content'
import { cn } from '@/lib/utils'

const STAR_ICONS = [0, 1, 2, 3, 4]

interface TestimonialsSliderProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  showNavigation?: boolean
}

export const TestimonialsSlider = memo(function TestimonialsSlider({
  testimonials,
  autoPlay = true,
  showNavigation = true,
}: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!autoPlay || isPaused || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, isPaused, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]
  if (!currentTestimonial) return null

  return (
    <div
      className="relative mx-auto max-w-4xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div
            className="text-center testimonial-content"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Rating Stars */}
            <div className="mb-4 flex justify-center">
              {STAR_ICONS.map(i => (
                <Star
                  key={i}
                  className={cn(
                    'h-3.5 w-3.5',
                    i < currentTestimonial.rating
                      ? 'fill-current text-yellow-400'
                      : 'text-gray-500'
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-muted-foreground mb-6 text-lg italic">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Customer Info */}
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-foreground font-semibold">
                {currentTestimonial.name}
              </span>
              <span className="text-muted-foreground">•</span>
              <div className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm">{currentTestimonial.location}</span>
              </div>
            </div>

            {/* Service Type */}
            <div className="text-sm font-medium text-gray-900">
              {currentTestimonial.service}
            </div>

            {/* Date */}
            <div className="text-muted-foreground mt-2 text-xs">
              {new Date(currentTestimonial.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      {showNavigation && testimonials.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="bg-card/80"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors',
                  index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-pressed={index === currentIndex}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="bg-card/80"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}

      {/* Counter */}
      <div className="text-muted-foreground mt-4 text-center text-sm">
        {currentIndex + 1} of {testimonials.length}
      </div>
    </div>
  )
})
