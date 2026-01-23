'use client'

import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLazyLoad } from '@/lib/hooks/useLazyLoad'

const STAR_ICONS = [0, 1, 2, 3, 4]

export function GoogleReviews() {
  const { ref, shouldLoad } = useLazyLoad({ rootMargin: '200px' })
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (!shouldLoad || scriptLoaded) return

    // Check if script is already present
    if (document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      setScriptLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.setAttribute('data-use-service-core', '')
    script.defer = true
    script.onload = () => setScriptLoaded(true)
    script.onerror = () => console.error('Failed to load Elfsight widget')

    document.body.appendChild(script)
  }, [shouldLoad, scriptLoaded])

  return (
    <section className="bg-card px-4 py-12" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-foreground mb-2 text-3xl font-bold">See What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">
            Read verified reviews from our Google Business Profile
          </p>
        </div>

        <div className="border-border bg-muted/30 overflow-hidden rounded-lg border shadow-sm">
          {/* Elfsight Google Reviews Widget */}
          <div className="mx-auto max-w-4xl p-6 min-h-[200px]">
            {shouldLoad && (
              <div
                className="elfsight-app-ae6bd45d-9f5a-4ad3-95e7-f4f8c3b6d2a1"
                data-elfsight-app-lazy
              ></div>
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
