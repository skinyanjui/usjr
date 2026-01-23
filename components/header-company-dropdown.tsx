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
    const companyItem = NAV.find(i => i.label === 'Company')
    const companyLinks = companyItem?.children ?? []
    const promo = companyItem?.promo

    return (
        <div
            id={companyMenuId}
            role="menu"
            aria-labelledby={companyMenuId}
            className="absolute left-1/2 top-full z-50 mt-2 w-screen max-w-3xl -translate-x-1/2 transform px-4 sm:px-0"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="overflow-hidden rounded-lg border border-border/50 bg-background/95 p-6 shadow-xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5">
                <div className={`grid gap-8 ${promo ? 'grid-cols-12' : 'grid-cols-2'}`}>
                    <div className={`${promo ? 'col-span-7' : 'col-span-full'}`}>
                        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                            Company
                        </h3>
                        <div className="space-y-1">
                            {companyLinks.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href!}
                                    className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-muted/50 hover:text-primary hover:pl-4"
                                    role="menuitem"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Promo Section */}
                    {promo && (
                        <div className="col-span-5 rounded-lg bg-muted/30 p-6">
                            <div className="flex h-full flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                        Company News
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">
                                            {promo.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {promo.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        href={promo.href}
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
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
