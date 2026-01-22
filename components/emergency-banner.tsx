'use client'

import Link from 'next/link'
import { X, AlertTriangle, Megaphone, Info, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Banner types with different visual treatments
type BannerType = 'emergency' | 'promo' | 'info' | 'announcement'

interface BannerConfig {
  type: BannerType
  title: string
  message: string
  mobileMessage?: string
  ctaText: string
  ctaLink: string
  dismissible: boolean
  dismissDuration?: number // in hours, defaults to 24
}

// Safe localStorage wrapper with error handling
function getStorageItem(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(key)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('localStorage access failed:', error)
    }
    return null
  }
}

function setStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('localStorage write failed:', error)
    }
  }
}

function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(key)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('localStorage remove failed:', error)
    }
  }
}

// Default configuration - easily customizable
const DEFAULT_CONFIG: BannerConfig = {
  type: 'emergency',
  title: 'Emergency Service Available',
  message: 'Storm cleanup, urgent junk removal & same-day response available now',
  mobileMessage: 'Same-day emergency response available',
  ctaText: 'Get Help Now',
  ctaLink: '/emergency',
  dismissible: true,
  dismissDuration: 24, // hours
}

// Style configurations for different banner types
const BANNER_STYLES = {
  emergency: {
    background: 'bg-destructive',
    text: 'text-destructive-foreground',
    icon: AlertTriangle,
    ctaButton: 'bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90',
    closeButton: 'text-destructive-foreground hover:text-destructive-foreground/80',
  },
  promo: {
    background: 'bg-gradient-to-r from-green-600 to-emerald-600',
    text: 'text-white',
    icon: Sparkles,
    ctaButton: 'bg-white text-green-600 hover:bg-gray-100',
    closeButton: 'text-white hover:text-green-100',
  },
  info: {
    background: 'bg-blue-600',
    text: 'text-white',
    icon: Info,
    ctaButton: 'bg-white text-blue-600 hover:bg-gray-100',
    closeButton: 'text-white hover:text-blue-100',
  },
  announcement: {
    background: 'bg-purple-600',
    text: 'text-white',
    icon: Megaphone,
    ctaButton: 'bg-white text-purple-600 hover:bg-gray-100',
    closeButton: 'text-white hover:text-purple-100',
  },
}

export function EmergencyBanner({ config = DEFAULT_CONFIG }: { config?: Partial<BannerConfig> }) {
  const [isVisible, setIsVisible] = useState(false) // Start as false to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false)

  // Merge with defaults
  const fullConfig: BannerConfig = { ...DEFAULT_CONFIG, ...config }
  const styles = BANNER_STYLES[fullConfig.type]
  const Icon = styles.icon

  useEffect(() => {
    setIsClient(true)

    // Check if banner should be visible based on environment variable
    const bannerEnabled = process.env.NEXT_PUBLIC_EMERGENCY_BANNER_ENABLED !== 'false'

    if (!bannerEnabled) {
      setIsVisible(false)
      return
    }

    // Check localStorage for dismissal (with error handling)
    const dismissedUntil = getStorageItem('emergency-banner-dismissed')

    if (dismissedUntil) {
      const dismissTime = parseInt(dismissedUntil, 10)
      const now = Date.now()

      // If dismissal hasn't expired, keep it hidden
      if (now < dismissTime) {
        setIsVisible(false)
        return
      } else {
        // Clear expired dismissal
        removeStorageItem('emergency-banner-dismissed')
      }
    }

    // Show the banner
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)

    // Store dismissal timestamp
    const dismissDurationMs = (fullConfig.dismissDuration || 24) * 60 * 60 * 1000
    const dismissUntil = Date.now() + dismissDurationMs
    setStorageItem('emergency-banner-dismissed', dismissUntil.toString())
  }

  // Don't render on server or if not visible
  if (!isClient || !isVisible) return null

  return (
    <div className={cn('relative z-50 px-4 py-2', styles.background)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Icon + Message */}
        <div className={cn('flex min-w-0 flex-1 items-center gap-2.5', styles.text)}>
          <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              <span className="font-bold">{fullConfig.title}:</span>{' '}
              <span className="hidden font-normal sm:inline">{fullConfig.message}</span>
              {fullConfig.mobileMessage && (
                <span className="font-normal sm:hidden">{fullConfig.mobileMessage}</span>
              )}
            </p>
          </div>
        </div>

        {/* CTA + Close Button */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link
            href={fullConfig.ctaLink}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-semibold whitespace-nowrap shadow-sm transition-all duration-200 hover:shadow-md',
              styles.ctaButton
            )}
          >
            {fullConfig.ctaText}
          </Link>
          {fullConfig.dismissible && (
            <button
              onClick={handleClose}
              className={cn('rounded p-1.5 transition-colors', styles.closeButton)}
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
