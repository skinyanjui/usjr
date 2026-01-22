'use client'

import Link from 'next/link'
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
  const locations = NAV.find(i => i.label === 'Locations')?.children ?? []

  return (
    <div
      id={locationsMenuId}
      role="menu"
      aria-labelledby={locationsMenuId}
      className="absolute top-full left-1/2 z-50 mt-2 w-[240px] -translate-x-1/2 transform rounded-xl border border-border bg-card p-2 shadow-lg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="space-y-0.5">
        {locations.map(item => (
          <Link
            key={item.href}
            href={item.href!}
            className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            role="menuitem"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
