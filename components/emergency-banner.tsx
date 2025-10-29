'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(false) // Start as false to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if banner should be visible based on environment variable
    const bannerEnabled = process.env.NEXT_PUBLIC_EMERGENCY_BANNER_ENABLED !== 'false'

    if (!bannerEnabled) {
      setIsVisible(false)
      return
    }

    // Check localStorage for dismissal
    const dismissedUntil = localStorage.getItem('emergency-banner-dismissed')

    if (dismissedUntil) {
      const dismissTime = parseInt(dismissedUntil, 10)
      const now = Date.now()

      // If dismissal hasn't expired (24 hours = 86400000ms), keep it hidden
      if (now < dismissTime) {
        setIsVisible(false)
        return
      } else {
        // Clear expired dismissal
        localStorage.removeItem('emergency-banner-dismissed')
      }
    }

    // Show the banner
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Store dismissal timestamp (24 hours from now)
    const dismissUntil = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem('emergency-banner-dismissed', dismissUntil.toString())
  }

  // Don't render on server or if not visible
  if (!isClient || !isVisible) return null

  return (
    <div className="relative z-50 bg-orange-700 px-4 py-1.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-white">
          <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="truncate text-xs font-semibold">
            <span className="font-bold">Emergency Service:</span>{' '}
            <span className="hidden sm:inline">
              Storm cleanup, urgent junk removal & same-day response
            </span>
            <span className="sm:hidden">Same-day response available</span>
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link
            href="/emergency"
            className="bg-card rounded-md px-2.5 py-1 text-xs font-bold whitespace-nowrap text-orange-800 transition-colors hover:bg-gray-100"
          >
            Get Help →
          </Link>
          <button
            onClick={handleClose}
            className="p-1 text-white transition-colors hover:text-gray-200"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
