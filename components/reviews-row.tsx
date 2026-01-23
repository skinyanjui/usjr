'use client'

import { useEffect, useRef, useState, memo } from 'react'
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { type Testimonial } from '@/lib/cms-content'



const STAR_INDICES = [0, 1, 2, 3, 4]

interface ReviewsRowProps {
  reviews: Testimonial[]
}

export const ReviewsRow = memo(function ReviewsRow({ reviews }: ReviewsRowProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const cachedOffsetsRef = useRef<number[] | null>(null)
  const writeFrameRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  // Compute and cache card offsets using ResizeObserver to avoid forced synchronous layout
  const updateCardOffsets = () => {
    requestAnimationFrame(() => {
      const container = carouselRef.current
      if (!container) return
      const children = Array.from(container.children) as HTMLElement[]
      cachedOffsetsRef.current = children.map(child => {
        // eslint-disable-next-line no-restricted-syntax
        const childRect = child.getBoundingClientRect()
        // eslint-disable-next-line no-restricted-syntax
        const containerRect = container.getBoundingClientRect()
        // eslint-disable-next-line no-restricted-syntax
        return childRect.left - containerRect.left + container.scrollLeft
      })
    })
  }

  const getCardOffsets = (): number[] => {
    if (cachedOffsetsRef.current) return cachedOffsetsRef.current
    return []
  }

  const scrollToIndex = (index: number) => {
    const container = carouselRef.current
    if (!container) return
    const offsets = getCardOffsets()
    if (offsets.length === 0) return
    const safeIndex = ((index % offsets.length) + offsets.length) % offsets.length
    const target = offsets[safeIndex]
    if (typeof target !== 'number') return
    if (writeFrameRef.current !== null) cancelAnimationFrame(writeFrameRef.current)
    writeFrameRef.current = requestAnimationFrame(() => {
      container.scrollTo({ left: target, behavior: 'smooth' as ScrollBehavior })
    })
  }

  const goToNext = () => {
    const container = carouselRef.current
    const count = container ? container.children.length : 0
    if (count === 0) return
    setCurrentIndex(prev => (prev + 1) % count)
  }

  const goToPrev = () => {
    const container = carouselRef.current
    const count = container ? container.children.length : 0
    if (count === 0) return
    setCurrentIndex(prev => (prev - 1 + count) % count)
  }

  // Set up ResizeObserver to update offsets when layout changes
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    // Initial offset calculation
    updateCardOffsets()

    // Set up ResizeObserver to recalculate on layout changes
    resizeObserverRef.current = new ResizeObserver(() => {
      cachedOffsetsRef.current = null
      updateCardOffsets()
    })

    resizeObserverRef.current.observe(container)

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [reviews])

  // Sync scrolling when index changes
  useEffect(() => {
    scrollToIndex(currentIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      goToNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [isPaused])

  // Cleanup any scheduled writes on unmount
  useEffect(() => {
    return () => {
      if (writeFrameRef.current !== null) cancelAnimationFrame(writeFrameRef.current)
    }
  }, [])

  const currentReview = reviews[currentIndex]

  return (
    <section className="px-4 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 sm:gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex">
              {STAR_INDICES.map(i => (
                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              ))}
            </span>
            <span className="text-sm sm:text-base">4.7/5 from 6 verified reviews</span>
          </div>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:block"></span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Uncle+Sam+Junk+Removal+Evansville"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-2 transition-all hover:text-primary/80 hover:underline sm:text-base"
          >
            View All Reviews on Google
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Review cards carousel */}
        <div
          className="relative mt-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Carousel viewport */}
          <div
            ref={carouselRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 md:gap-5"
          >
            {reviews.map(t => (
              <div
                key={t.id}
                className="border-border bg-card/90 w-56 shrink-0 snap-start rounded-md border p-2.5 shadow-sm backdrop-blur-sm sm:w-64 sm:p-3 md:w-72 md:p-4"
              >
                <div className="mb-1 flex items-center gap-0.5 sm:gap-1">
                  {STAR_INDICES.map((_, i) => (
                    <Star
                      key={i}
                      className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground line-clamp-3 text-xs sm:text-sm">"{t.text}"</p>
                <div className="text-muted-foreground mt-1.5 text-xs">
                  — {t.name} • {t.location}
                </div>
              </div>
            ))}
          </div>

          {/* Arrow controls - show on md+ */}
          <button
            type="button"
            aria-label="Previous review"
            onClick={goToPrev}
            className="border-border bg-card/90 text-muted-foreground hover:bg-card absolute top-1/2 left-0 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm md:flex"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={goToNext}
            className="border-border bg-card/90 text-muted-foreground hover:bg-card absolute top-1/2 right-0 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm md:flex"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Screen reader announcement for auto-playing reviews */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {currentReview &&
            `Review ${currentIndex + 1} of ${reviews.length}: ${currentReview.name} says ${currentReview.text}`}
        </div>
      </div>
    </section>
  )
})
