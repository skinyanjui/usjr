'use client'

import Link from 'next/link'
import { NAV } from '@/lib/nav'

interface CompanyDropdownProps {
  companyMenuId: string
  triggerId: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function CompanyDropdown({
  companyMenuId,
  triggerId,
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
      aria-labelledby={triggerId}
      className="absolute top-full left-1/2 z-50 w-screen pt-3 max-w-3xl -translate-x-1/2 transform px-4 sm:px-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="border-border/50 bg-background/95 overflow-hidden rounded-lg border p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl dark:ring-white/5">
        <div className={`grid gap-8 ${promo ? 'grid-cols-12' : 'grid-cols-2'}`}>
          <div className={`${promo ? 'col-span-7' : 'col-span-full'}`}>
            <h3 className="text-muted-foreground/70 mb-4 text-xs font-semibold tracking-wider uppercase">
              Company
            </h3>
            <div className="space-y-1">
              {companyLinks.map(item => (
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
          </div>

          {/* Promo Section */}
          {promo && (
            <div className="bg-muted/30 col-span-5 rounded-lg p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                    Company News
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
