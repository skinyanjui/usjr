"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { getActiveTestimonials, type Testimonial } from "@/lib/cms-content"

interface TestimonialsSliderProps {
  limit?: number
  autoPlay?: boolean
  showNavigation?: boolean
}

export function TestimonialsSlider({ limit = 6, autoPlay = true, showNavigation = true }: TestimonialsSliderProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setTestimonials(getActiveTestimonials(limit))
  }, [limit])

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]
  if (!currentTestimonial) return null

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center">
            {/* Rating Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < currentTestimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg text-gray-700 mb-6 italic">"{currentTestimonial.text}"</blockquote>

            {/* Customer Info */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-semibold text-gray-900">{currentTestimonial.name}</span>
              <span className="text-gray-500">•</span>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{currentTestimonial.location}</span>
              </div>
            </div>

            {/* Service Type */}
            <div className="text-sm text-green-600 font-medium">{currentTestimonial.service}</div>

            {/* Date */}
            <div className="text-xs text-gray-500 mt-2">
              {new Date(currentTestimonial.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      {showNavigation && testimonials.length > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button variant="outline" size="sm" onClick={prevTestimonial} className="bg-white/80" aria-label="Previous testimonial">
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-green-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={nextTestimonial} className="bg-white/80" aria-label="Next testimonial">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Counter */}
      <div className="text-center mt-4 text-sm text-gray-500">
        {currentIndex + 1} of {testimonials.length}
      </div>
    </div>
  )
}
