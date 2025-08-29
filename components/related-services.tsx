import Link from "next/link"
import { NAV } from "@/lib/nav"

interface RelatedServicesProps {
  currentPath?: string
  title?: string
}

export function RelatedServices({ currentPath, title = "Related Services & Areas" }: RelatedServicesProps) {
  const services = NAV.find((i) => i.label === "Services")?.children ?? []
  const locations = NAV.find((i) => i.label === "Locations")?.children ?? []

  const serviceLinks = services
    .filter((s) => s.href && s.href !== currentPath)
    .slice(0, 6)

  const locationLinks = locations
    .filter((l) => l.href && l.href !== currentPath)
    .slice(0, 6)

  if (serviceLinks.length === 0 && locationLinks.length === 0) return null

  return (
    <section aria-label="Related links" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {serviceLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Explore Our Services</h3>
              <ul className="list-disc pl-6 space-y-1 text-red-700">
                {serviceLinks.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href!} className="hover:underline">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {locationLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Nearby Service Areas</h3>
              <ul className="list-disc pl-6 space-y-1 text-red-700">
                {locationLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href!} className="hover:underline">{l.label}</Link>
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

