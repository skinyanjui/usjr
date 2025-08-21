"use client"

import { Star } from "lucide-react"

type ReviewSource = {
  source: string
  rating: number
  count: number
}

const SOURCES: ReviewSource[] = [
  { source: "Google", rating: 4.9, count: 200 },
  { source: "Facebook", rating: 4.8, count: 120 },
  { source: "Yelp", rating: 4.7, count: 60 },
  { source: "Thumbtack", rating: 4.9, count: 90 },
]

export function ReviewsRow() {
  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {SOURCES.map((item) => (
            <div
              key={item.source}
              className="glass rounded-lg border border-gray-200 px-3 py-2 flex items-center gap-2 min-w-[180px] justify-center"
              aria-label={`${item.source} rating ${item.rating} out of 5 from ${item.count}+ reviews`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <div className="text-[12px] sm:text-[13px]">
                <span className="font-semibold">{item.rating.toFixed(1)}</span> on {" "}
                <span className="font-semibold">{item.source}</span>
                <span className="text-gray-500"> ({item.count}+)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

