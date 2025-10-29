'use client'

import Link from 'next/link'
import { NAV } from '@/lib/nav'

interface ServicesDropdownProps {
  servicesMenuId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function ServicesDropdown({
  servicesMenuId,
  onMouseEnter,
  onMouseLeave,
}: ServicesDropdownProps) {
  const services = NAV.find(i => i.label === 'Services')?.children ?? []

  return (
    <div
      id={servicesMenuId}
      role="menu"
      aria-labelledby={servicesMenuId}
      className="absolute top-full left-1/2 z-50 mt-1 w-[320px] -translate-x-1/2 transform rounded-lg border border-border bg-card py-4 shadow-xl"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-1 gap-1 px-3">
        {services.map(item => (
          <Link
            key={item.href}
            href={item.href!}
            className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-red-600 hover:text-white hover:underline"
            role="menuitem"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
