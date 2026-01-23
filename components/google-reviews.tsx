'use client'

import { Star } from 'lucide-react'

export function GoogleReviews() {
  return (
    <section className="bg-card px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-foreground mb-2 text-3xl font-bold">See What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">
            Read verified reviews from our Google Business Profile
          </p>
        </div>

        <div className="border-border bg-muted/30 overflow-hidden rounded-lg border shadow-sm">
          {/* Elfsight Google Reviews Widget */}
          <div className="mx-auto max-w-4xl p-6">
            <script
              src="https://static.elfsight.com/platform/platform.js"
              data-use-service-core
              defer
            ></script>
            <div
              className="elfsight-app-ae6bd45d-9f5a-4ad3-95e7-f4f8c3b6d2a1"
              data-elfsight-app-lazy
            ></div>
          </div>

          <div className="border-t border-border bg-card px-6 py-4 text-center">
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2 font-semibold">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </span>
                <span>4.7/5 from 6 verified reviews</span>
              </div>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:block"></span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Uncle+Sam+Junk+Removal+Evansville"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-2 transition-all hover:text-primary/80 hover:underline"
              >
                View All Reviews on Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
