'use client'

import { memo } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { NAV } from '@/lib/nav'

interface ServicesDropdownProps {
  servicesMenuId: string
  triggerId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const ServicesDropdown = memo(function ServicesDropdown({
  servicesMenuId,
  triggerId,
  onMouseEnter,
  onMouseLeave,
}: ServicesDropdownProps) {
  const serviceItem = NAV.find(i => i.label === 'Services')
  const services = serviceItem?.children ?? []
  const promo = serviceItem?.promo

  // Split services into columns for better readability
  // We'll aim for about 6-7 items per column
  const itemsPerColumn = 7
  const columns = []
  for (let i = 0; i < services.length; i += itemsPerColumn) {
    columns.push(services.slice(i, i + itemsPerColumn))
  }

  return (
    <div
      id={servicesMenuId}
      role="menu"
      aria-labelledby={triggerId}
      className="absolute top-full left-1/2 z-50 mt-2 w-screen max-w-5xl -translate-x-1/2 transform px-4 sm:px-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="border-border/50 bg-background/95 overflow-hidden rounded-lg border p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl dark:ring-white/5">
        <div className={`grid gap-8 ${promo ? 'grid-cols-12' : 'grid-cols-3'}`}>
          {/* Main Links Section */}
          <div className={`${promo ? 'col-span-8' : 'col-span-full'}`}>
            <h3 className="text-muted-foreground/70 mb-4 text-xs font-semibold tracking-wider uppercase">
              Our Services
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 lg:grid-cols-3">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-1">
                  {column.map(item => (
                    <Link
                      key={item.href}
                      href={item.href!}
                      className="group hover:bg-muted/50 hover:text-primary flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:pl-4"
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div className="border-border/50 mt-6 flex items-center gap-2 border-t pt-4">
              <Link
                href="/services"
                className="text-primary hover:text-primary/80 flex items-center text-sm font-medium transition-colors"
              >
                View all services <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Promo Section */}
          {promo && (
            <div className="bg-muted/30 col-span-4 rounded-lg p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                    <Sparkles className="h-3 w-3" />
                    Special Offer
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
})

export default ServicesDropdown
