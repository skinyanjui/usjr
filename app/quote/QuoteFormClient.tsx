'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const QuoteFormStandalone = dynamic(
  () => import('@/components/quote-form-standalone').then(m => m.QuoteFormStandalone),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-4xl">
        <div className="bg-card animate-pulse rounded-lg border p-6 sm:p-8">
          <div className="bg-muted mb-4 h-6 w-56 rounded" />
          <div className="space-y-3">
            <div className="bg-muted/50 h-10 rounded" />
            <div className="bg-muted/50 h-10 rounded" />
            <div className="bg-muted/50 h-10 rounded" />
          </div>
        </div>
      </div>
    ),
  }
)

export default function QuoteFormClient() {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShowForm(true)
          }
        }
      },
      { rootMargin: '200px 0px' }
    )

    if (triggerRef.current) observer.observe(triggerRef.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={triggerRef}>{showForm ? <QuoteFormStandalone /> : null}</div>
}
