"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { getActiveTestimonials, type Testimonial } from "@/lib/cms-content"

type ReviewSource = {
  source: string
  rating: number
  count: number
}

const SOURCES: ReviewSource[] = [
  { source: "Google", rating: 4.8, count: 46 },
  { source: "Facebook", rating: 4.9, count: 18 },
  { source: "Yelp", rating: 4.6, count: 7 },
  { source: "Thumbtack", rating: 4.8, count: 12 },
]

export function ReviewsRow() {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reviews, setReviews] = useState<Testimonial[]>([])

  useEffect(() => {
    setReviews(getActiveTestimonials(12))
  }, [])

  // Compute and cache card offsets for reliable snapping across responsive widths
  const getCardOffsets = (): number[] => {
    const container = carouselRef.current
    if (!container) return []
    const children = Array.from(container.children) as HTMLElement[]
    return children.map((child) => child.offsetLeft)
  }

  const scrollToIndex = (index: number) => {
    const container = carouselRef.current
    if (!container) return
    const offsets = getCardOffsets()
    if (offsets.length === 0) return
    const safeIndex = ((index % offsets.length) + offsets.length) % offsets.length
    const target = offsets[safeIndex]
    if (typeof target !== "number") return
    container.scrollTo({ left: target, behavior: "smooth" as ScrollBehavior })
  }

  const goToNext = () => {
    const container = carouselRef.current
    const count = container ? container.children.length : 0
    if (count === 0) return
    setCurrentIndex((prev) => (prev + 1) % count)
  }

  const goToPrev = () => {
    const container = carouselRef.current
    const count = container ? container.children.length : 0
    if (count === 0) return
    setCurrentIndex((prev) => (prev - 1 + count) % count)
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
      scrollToIndex(currentIndex)
    }
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-nowrap items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Ratings summary badges */}
          {SOURCES.map((item) => (
            <div
              key={item.source}
              className="glass rounded-lg border border-gray-200 px-3 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-3 flex items-center gap-2 sm:gap-2.5 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] justify-center shrink-0"
              aria-label={`${item.source} rating ${item.rating} out of 5 from ${item.count}+ reviews`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${i < Math.round(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                ))}
              </div>
              <div className="text-[12px] sm:text-[13px] md:text-sm">
                <span className="font-semibold">{item.rating.toFixed(1)}</span> on {" "}
                <span className="font-semibold">{item.source}</span>
                <span className="text-gray-600"> ({item.count}+)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Review cards carousel */}
        <div className="mt-4 relative">
          {/* Carousel viewport */}
          <div
            ref={carouselRef}
            className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {reviews.map((t) => (
              <div key={t.id} className="shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 rounded-lg border border-gray-300 bg-white/90 backdrop-blur-sm shadow-sm p-3 sm:p-4 md:p-5 snap-start">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                  ))}
                </div>
                <p className="text-[12px] sm:text-[13px] md:text-sm text-gray-700">"{t.text}"</p>
                <div className="mt-2 text-[12px] sm:text-[12.5px] md:text-[13px] text-gray-600">— {t.name} • {t.location}</div>
              </div>
            ))}
          </div>

          {/* Arrow controls - show on md+ */}
          <button
            type="button"
            aria-label="Previous review"
            onClick={goToPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 items-center justify-center h-9 w-9 rounded-full bg-white/90 border border-gray-200 shadow-sm hover:bg-white text-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={goToNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center h-9 w-9 rounded-full bg-white/90 border border-gray-200 shadow-sm hover:bg-white text-gray-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
