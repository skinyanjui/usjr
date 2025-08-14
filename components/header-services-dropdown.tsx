"use client"

import Link from "next/link"
import { NAV } from "@/lib/nav"

interface ServicesDropdownProps {
  servicesMenuId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function ServicesDropdown({ servicesMenuId, onMouseEnter, onMouseLeave }: ServicesDropdownProps) {
  const services = NAV.find((i) => i.label === "Services")?.children ?? []

  return (
    <div
      id={servicesMenuId}
      role="menu"
      aria-labelledby={servicesMenuId}
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[320px] bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-1 gap-1 px-3">
        {services.map((item) => (
          <Link
            key={item.href}
            href={item.href!}
            prefetch={false}
            className="block py-2 px-3 rounded-md text-gray-700 hover:text-white hover:bg-red-600 transition-colors text-sm"
            role="menuitem"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
