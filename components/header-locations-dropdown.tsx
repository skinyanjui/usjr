'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { NAV } from '@/lib/nav'

interface LocationsDropdownProps {
  locationsMenuId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function LocationsDropdown({
  locationsMenuId,
  onMouseEnter,
  onMouseLeave,
}: LocationsDropdownProps) {
  const locationItem = NAV.find(i => i.label === 'Locations')
  const locations = locationItem?.children ?? []

  // Split into 2 columns
  const midPoint = Math.ceil(locations.length / 2)
  const col1 = locations.slice(0, midPoint)
  const col2 = locations.slice(midPoint)

  return (
    <div
      id={locationsMenuId}
      role="menu"
      aria-labelledby={locationsMenuId}
      className="absolute left-1/2 top-full z-50 mt-2 w-[500px] -translate-x-1/2 transform px-4 sm:px-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="overflow-hidden rounded-xl border border-border/50 bg-background/95 p-6 shadow-xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          Our Service Areas
        </h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            {col1.map(item => (
              <Link
                key={item.href}
                href={item.href!}
                className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground hover:pl-4"
                role="menuitem"
              >
                <MapPin className="mr-2 h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            {col2.map(item => (
              <Link
                key={item.href}
                href={item.href!}
                className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground hover:pl-4"
                role="menuitem"
              >
                <MapPin className="mr-2 h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
