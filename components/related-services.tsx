import Link from 'next/link'
import { ArrowRight, MapPin, Wrench } from 'lucide-react'

interface RelatedServicesProps {
  currentPath?: string
  title?: string
}

export function RelatedServices({
  currentPath,
  title = 'Related Services & Areas',
}: RelatedServicesProps) {
  const customServices = [
    { label: 'Junk Removal', href: '/services/junk-removal' },
    { label: 'Cleaning', href: '/cleaning' },
    { label: 'Estate Cleanouts', href: '/services/estate-cleanouts' },
    { label: 'Appliance Removal', href: '/services/appliance-removal' },
    { label: 'Light Demolition', href: '/services/light-demolition' },
    { label: 'Garage Cleanout', href: '/services/garage-cleanout' },
  ]

  const customLocations = [
    { label: 'Evansville, IN', href: '/locations/evansville' },
    { label: 'Newburgh, IN', href: '/locations/newburgh' },
    { label: 'Henderson, KY', href: '/locations/henderson-ky' },
    { label: 'Owensboro, KY', href: '/locations/owensboro-ky' },
    { label: 'Boonville, IN', href: '/locations/boonville' },
    { label: 'Princeton, IN', href: '/locations/princeton' },
  ]

  // Filter out current page if needed
  const serviceLinks = customServices.filter(s => s.href !== currentPath)
  const locationLinks = customLocations.filter(l => l.href !== currentPath)

  return (
    <section aria-label="Related links" className="border-border bg-muted/20 border-t py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-foreground mb-8 text-2xl font-bold">{title}</h2>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Services Column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                <Wrench className="text-primary h-4 w-4" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">Explore Our Services</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceLinks.map(s => (
                <Link key={s.href} href={s.href} className="group">
                  <div className="border-border bg-card hover:border-primary/50 hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors">
                    <span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                      {s.label}
                    </span>
                    <ArrowRight className="text-muted-foreground h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Locations Column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                <MapPin className="text-primary h-4 w-4" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">Nearby Service Areas</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {locationLinks.map(l => (
                <Link key={l.href} href={l.href} className="group">
                  <div className="border-border bg-card hover:border-primary/50 hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors">
                    <span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                      {l.label}
                    </span>
                    <ArrowRight className="text-muted-foreground h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
