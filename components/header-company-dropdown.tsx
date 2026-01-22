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
            className="absolute top-full left-1/2 z-50 mt-2 w-[200px] -translate-x-1/2 transform rounded-xl border border-border bg-card p-2 shadow-lg"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="space-y-0.5">
                {companyLinks.map(item => (
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
