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
      className="border-border bg-card absolute top-full left-1/2 z-50 mt-1 w-[320px] -translate-x-1/2 transform rounded-lg border py-4 shadow-xl"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-1 gap-1 px-3">
        {services.map(item => (
          <Link
            key={item.href}
            href={item.href!}
            className="text-muted-foreground block rounded-md px-3 py-2 text-sm transition-colors hover:bg-blue-800 hover:text-white hover:underline"
            role="menuitem"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
