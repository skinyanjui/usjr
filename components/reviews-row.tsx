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

  useEffect(() => {
    setReviews(getActiveTestimonials(12))
  }, [])

  // Compute and cache card offsets in one read pass to avoid repeated reflows
  const getCardOffsets = (): number[] => {
    if (cachedOffsetsRef.current) return cachedOffsetsRef.current
    const container = carouselRef.current
    if (!container) return []
    const children = Array.from(container.children) as HTMLElement[]
    cachedOffsetsRef.current = children.map(child => child.offsetLeft)
    return cachedOffsetsRef.current
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

  // Recompute snapping target on resize to keep alignment
  useEffect(() => {
    const handle = () => {
      // Re-align to current index after layout changes
      cachedOffsetsRef.current = null
      scrollToIndex(currentIndex)
    }
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              className="glass flex min-w-[160px] shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 sm:min-w-[180px] sm:gap-2.5 sm:px-3.5 sm:py-2.5 md:min-w-[200px] md:px-4 md:py-3"
              aria-label={`${item.source} rating ${item.rating} out of 5 from ${item.count}+ reviews`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${i < Math.round(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`}
                  />
                ))}
              </div>
              <div className="text-[12px] sm:text-[13px] md:text-sm">
                <span className="font-semibold">{item.rating.toFixed(1)}</span> on{' '}
                <span className="font-semibold">{item.source}</span>
                <span className="text-gray-600"> ({item.count}+)</span>
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
                className="w-64 shrink-0 snap-start rounded-lg border border-gray-300 bg-white/90 p-3 shadow-sm backdrop-blur-sm sm:w-72 sm:p-4 md:w-80 md:p-5 lg:w-96"
              >
                <div className="mb-1 flex items-center gap-1 sm:mb-2 sm:gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`}
                    />
                  ))}
                </div>
                <p className="text-[12px] text-gray-700 sm:text-[13px] md:text-sm">"{t.text}"</p>
                <div className="mt-2 text-[12px] text-gray-600 sm:text-[12.5px] md:text-[13px]">
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
            className="absolute top-1/2 left-0 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={goToNext}
            className="absolute top-1/2 right-0 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
