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
        <div className="flex flex-nowrap items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Ratings summary badges */}
          {SOURCES.map((item) => (
            <div
              key={item.source}
              className="glass rounded-lg border border-gray-200 px-3 py-2 flex items-center gap-2 min-w-[180px] justify-center shrink-0"
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

        {/* Review cards carousel */}
        <div className="mt-4 flex gap-4 overflow-x-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="shrink-0 w-72 rounded-lg border border-gray-300 bg-white/85 backdrop-blur-sm shadow-sm p-3">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-[12px] text-gray-700">
                "Fantastic service! They arrived on time, worked quickly, and left everything spotless. Highly recommend!"
              </p>
              <div className="mt-2 text-[12px] text-gray-500">— Evansville Customer</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

