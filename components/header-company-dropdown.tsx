'use client'

import Link from 'next/link'
import { NAV } from '@/lib/nav'

interface CompanyDropdownProps {
    companyMenuId: string
    onMouseEnter: () => void
    onMouseLeave: () => void
}

export default function CompanyDropdown({
    companyMenuId,
    onMouseEnter,
    onMouseLeave,
}: CompanyDropdownProps) {
    const companyLinks = NAV.find(i => i.label === 'Company')?.children ?? []

    return (
        <div
            id={companyMenuId}
            role="menu"
            aria-labelledby={companyMenuId}
            className="absolute left-1/2 top-full z-50 mt-2 w-[240px] -translate-x-1/2 transform px-4 sm:px-0"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="overflow-hidden rounded-xl border border-border/50 bg-background/95 p-3 shadow-xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5">
                <div className="space-y-1">
                    {companyLinks.map(item => (
                        <Link
                            key={item.href}
                            href={item.href!}
                            className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground hover:pl-4"
                            role="menuitem"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
