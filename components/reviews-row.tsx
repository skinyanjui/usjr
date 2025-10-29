'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getActiveTestimonials, type Testimonial } from '@/lib/cms-content'

type ReviewSource = {
  source: string
  rating: number
  count: number
}

const SOURCES: ReviewSource[] = [
  { source: 'Google', rating: 4.8, count: 46 },
  { source: 'Facebook', rating: 4.9, count: 18 },
  { source: 'Yelp', rating: 4.6, count: 7 },
  { source: 'Thumbtack', rating: 4.8, count: 12 },
]

export function ReviewsRow() {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reviews, setReviews] = useState<Testimonial[]>([])
  const cachedOffsetsRef = useRef<number[] | null>(null)
  const writeFrameRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    setReviews(getActiveTestimonials(12))
  }, [])

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

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="no-scrollbar flex flex-nowrap items-center gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4">
          {/* Ratings summary badges */}
          {SOURCES.map(item => (
            <div
              key={item.source}
              className="glass border-border flex min-w-[160px] shrink-0 items-center justify-center gap-2 rounded-lg border px-3 py-2 sm:min-w-[180px] sm:gap-2.5 sm:px-3.5 sm:py-2.5 md:min-w-[200px] md:px-4 md:py-3"
              aria-label={`${item.source} rating ${item.rating} out of 5 from ${item.count}+ reviews`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${i < Math.round(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
              <div className="text-sm sm:text-base">
                <span className="font-semibold">{item.rating.toFixed(1)}</span> on{' '}
                <span className="font-semibold">{item.source}</span>
                <span className="text-muted-foreground"> ({item.count}+)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Review cards carousel */}
        <div className="relative mt-4">
          {/* Carousel viewport */}
          <div
            ref={carouselRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 md:gap-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {reviews.map(t => (
              <div
                key={t.id}
                className="border-border bg-card/90 w-64 shrink-0 snap-start rounded-lg border p-3 shadow-sm backdrop-blur-sm sm:w-72 sm:p-4 md:w-80 md:p-5 lg:w-96"
              >
                <div className="mb-1 flex items-center gap-1 sm:mb-2 sm:gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">"{t.text}"</p>
                <div className="text-muted-foreground mt-2 text-sm">
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
            className="border-border bg-card/90 text-muted-foreground hover:bg-card absolute top-1/2 left-0 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={goToNext}
            className="border-border bg-card/90 text-muted-foreground hover:bg-card absolute top-1/2 right-0 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
