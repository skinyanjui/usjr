import Link from 'next/link'
import { NAV } from '@/lib/nav'

interface RelatedServicesProps {
  currentPath?: string
  title?: string
}

export function RelatedServices({
  currentPath,
  title = 'Related Services & Areas',
}: RelatedServicesProps) {
  const services = NAV.find(i => i.label === 'Services')?.children ?? []
  const locations = NAV.find(i => i.label === 'Locations')?.children ?? []

  const serviceLinks = services.filter(s => s.href && s.href !== currentPath).slice(0, 6)

  const locationLinks = locations.filter(l => l.href && l.href !== currentPath).slice(0, 6)

  if (serviceLinks.length === 0 && locationLinks.length === 0) return null

  return (
    <section aria-label="Related links" className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-foreground mb-6 text-2xl font-bold">{title}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {serviceLinks.length > 0 && (
            <div>
              <h3 className="text-foreground mb-3 text-lg font-semibold">Explore Our Services</h3>
              <ul className="list-disc space-y-1 pl-6 text-gray-900">
                {serviceLinks.map(s => (
                  <li key={s.href}>
                    <Link href={s.href!} className="hover:underline">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {locationLinks.length > 0 && (
            <div>
              <h3 className="text-foreground mb-3 text-lg font-semibold">Nearby Service Areas</h3>
              <ul className="list-disc space-y-1 pl-6 text-gray-900">
                {locationLinks.map(l => (
                  <li key={l.href}>
                    <Link href={l.href!} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
