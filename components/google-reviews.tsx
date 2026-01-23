'use client'

import { Star, Loader2, AlertCircle } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { useLazyLoad } from '@/lib/hooks/useLazyLoad'

const STAR_ICONS = [0, 1, 2, 3, 4]

export function GoogleReviews() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useLazyLoad(containerRef, '100px')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isVisible && !error) {
      // Check if script already exists to avoid duplicate loading
      const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')

      if (existingScript) {
        return
      }

      setIsLoading(true)
      const script = document.createElement('script')
      script.src = 'https://static.elfsight.com/platform/platform.js'
      script.setAttribute('data-use-service-core', '')
      script.defer = true

      script.onload = () => {
        setIsLoading(false)
      }

      script.onerror = () => {
        setError(true)
        setIsLoading(false)
      }

      document.body.appendChild(script)
    }
  }, [isVisible, error])

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
          <div ref={containerRef} className="mx-auto min-h-[400px] max-w-4xl p-6">
            {isVisible ? (
              error ? (
                 <div className="flex h-64 flex-col items-center justify-center text-center text-red-500">
                    <AlertCircle className="mb-2 h-10 w-10" />
                    <p>Failed to load reviews. Please try refreshing the page.</p>
                 </div>
              ) : (
                <>
                  {isLoading && (
                     <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
                        <Loader2 className="mb-2 h-10 w-10 animate-spin" />
                        <p>Loading reviews...</p>
                     </div>
                  )}
                  <div
                    className="elfsight-app-ae6bd45d-9f5a-4ad3-95e7-f4f8c3b6d2a1"
                    data-elfsight-app-lazy
                  ></div>
                </>
              )
            ) : (
               <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
                  <p>Scroll to load reviews...</p>
               </div>
            )}
          </div>

          <div className="border-t border-border bg-card px-6 py-4 text-center">
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2 font-semibold">
                <span className="flex">
                  {STAR_ICONS.map(i => (
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
