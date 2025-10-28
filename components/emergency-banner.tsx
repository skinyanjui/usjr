'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { useState } from 'react'

export function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-orange-700 px-4 py-1.5">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-white flex-1 min-w-0">
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
          <p className="text-xs font-semibold truncate">
            <span className="font-bold">Emergency Service:</span>{' '}
            <span className="hidden sm:inline">Storm cleanup, urgent junk removal & same-day response</span>
            <span className="sm:hidden">Same-day response available</span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/emergency"
            className="whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-xs font-bold text-orange-800 hover:bg-gray-100 transition-colors"
          >
            Get Help →
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
