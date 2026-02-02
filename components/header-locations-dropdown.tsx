'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { NAV } from '@/lib/nav'

interface LocationsDropdownProps {
  locationsMenuId: string
  triggerId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function LocationsDropdown({
  locationsMenuId,
  triggerId,
  onMouseEnter,
  onMouseLeave,
}: LocationsDropdownProps) {
  const locationItem = NAV.find(i => i.label === 'Locations')
  const locations = locationItem?.children ?? []

  const promo = locationItem?.promo

  // Split into 2 columns
  const midPoint = Math.ceil(locations.length / 2)
  const col1 = locations.slice(0, midPoint)
  const col2 = locations.slice(midPoint)

  return (
    <div
      id={locationsMenuId}
      role="menu"
      aria-labelledby={triggerId}
      className="absolute top-full left-1/2 z-50 mt-2 w-screen max-w-5xl -translate-x-1/2 transform px-4 sm:px-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="border-border/50 bg-background/95 overflow-hidden rounded-lg border p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl dark:ring-white/5">
        <div className={`grid gap-8 ${promo ? 'grid-cols-12' : 'grid-cols-3'}`}>
          <div className={`${promo ? 'col-span-8' : 'col-span-full'}`}>
            <h3 className="text-muted-foreground/70 mb-4 text-xs font-semibold tracking-wider uppercase">
              Our Service Areas
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                {col1.map(item => (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="group hover:bg-muted/50 hover:text-primary flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:pl-4"
                    role="menuitem"
                  >
                    <MapPin className="text-primary mr-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-1">
                {col2.map(item => (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="group hover:bg-muted/50 hover:text-primary flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:pl-4"
                    role="menuitem"
                  >
                    <MapPin className="text-primary mr-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Promo Section */}
          {promo && (
            <div className="bg-muted/30 col-span-4 rounded-lg p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                    <MapPin className="h-3 w-3" />
                    Service Area
                  </div>
                  <div>
                    <h3 className="text-foreground text-lg font-bold">{promo.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">{promo.description}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={promo.href}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md"
                  >
                    {promo.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
