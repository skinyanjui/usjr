'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { getActiveTestimonials, type Testimonial } from '@/lib/cms-content'

interface TestimonialsSliderProps {
  limit?: number
  autoPlay?: boolean
  showNavigation?: boolean
}

export function TestimonialsSlider({
  limit = 6,
  autoPlay = true,
  showNavigation = true,
}: TestimonialsSliderProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setTestimonials(getActiveTestimonials(limit))
  }, [limit])

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, testimonials.length])

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
    <div className="relative mx-auto max-w-4xl">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center">
            {/* Rating Stars */}
            <div className="mb-4 flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < currentTestimonial.rating ? 'fill-current text-yellow-400' : 'text-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="mb-6 text-lg text-gray-700 italic">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Customer Info */}
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="font-semibold text-gray-900">{currentTestimonial.name}</span>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{currentTestimonial.location}</span>
              </div>
            </div>

            {/* Service Type */}
            <div className="text-sm font-medium text-green-600">{currentTestimonial.service}</div>

            {/* Date */}
            <div className="mt-2 text-xs text-gray-600">
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
            className="bg-white/80"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-pressed={index === currentIndex}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="bg-white/80"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Counter */}
      <div className="mt-4 text-center text-sm text-gray-600">
        {currentIndex + 1} of {testimonials.length}
      </div>
    </div>
  )
}
