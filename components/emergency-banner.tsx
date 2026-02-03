'use client'

import Link from 'next/link'
import { X, AlertTriangle, Megaphone, Info, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Banner types with different visual treatments
type BannerType = 'emergency' | 'promo' | 'info' | 'announcement'

export interface BannerConfig {
  type: BannerType
  title: string
  message: string
  mobileMessage?: string
  ctaText: string
  ctaLink: string
  dismissible: boolean
  dismissDuration?: number // in hours, defaults to 24
}

// Default configuration - easily customizable
export const DEFAULT_CONFIG: BannerConfig = {
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

interface EmergencyBannerProps {
  config?: Partial<BannerConfig>
  initialIsVisible?: boolean
}

export function EmergencyBanner({ config = DEFAULT_CONFIG, initialIsVisible = true }: EmergencyBannerProps) {
  const [isVisible, setIsVisible] = useState(initialIsVisible)

  useEffect(() => {
    if (document.cookie.split('; ').some((row) => row.startsWith('emergency-banner-dismissed='))) {
      setIsVisible(false)
    }
  }, [])

  // Merge with defaults
  const fullConfig: BannerConfig = { ...DEFAULT_CONFIG, ...config }
  const styles = BANNER_STYLES[fullConfig.type]
  const Icon = styles.icon

  const handleClose = () => {
    setIsVisible(false)

    // Store dismissal in cookie
    const dismissDurationHours = fullConfig.dismissDuration || 24
    const maxAge = dismissDurationHours * 60 * 60

    // Set cookie with max-age
    document.cookie = `emergency-banner-dismissed=true; path=/; max-age=${maxAge}; SameSite=Lax`
  }

  // Don't render if not visible
  if (!isVisible) return null

  return (
    <>
      <div id="emergency-banner" className={cn('relative z-50 px-4 py-2', styles.background)}>
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
    <script
        dangerouslySetInnerHTML={{
          __html: `if (document.cookie.indexOf('emergency-banner-dismissed=true') > -1) { var b = document.getElementById('emergency-banner'); if (b) b.style.display = 'none'; }`,
        }}
      />
    </>
  )
}
