'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'

const ClientLeafletMap = dynamic(() => import('./leaflet-map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100" />,
})

const SUPPORTED_ZIPS = [
  '47708',
  '47710',
  '47711',
  '47712',
  '47713',
  '47714',
  '47715',
  '47720', // Evansville
  '47630', // Newburgh
  '42420', // Henderson, KY
  '47601', // Boonville
  '47670', // Princeton
  '42301', // Owensboro, KY
  '62863', // Mount Carmel, IL
  '47620', // Mount Vernon, IN
  '47631', // New Harmony, IN
]

export function ServiceArea() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<null | 'yes' | 'maybe' | 'no'>(null)

  const handleCheck = () => {
    if (zip.trim().length < 5) {
      setResult(null)
      return
    }
    if (SUPPORTED_ZIPS.includes(zip.trim())) {
      setResult('yes')
    } else {
      // light heuristic: outside list but could still be inside 50mi radius
      setResult('maybe')
    }
  }

  const message = useMemo(() => {
    switch (result) {
      case 'yes':
        return 'Yes! We serve your area. Same-day service may be available.'
      case 'maybe':
        return 'We likely cover your area. Text us your zip for confirmation.'
      case 'no':
        return 'Sorry, that zip appears outside our standard area. Please contact us to confirm.'
      default:
        return 'Enter your zip code to check coverage.'
    }
  }, [result])

  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-foreground mb-2 text-2xl font-bold sm:text-4xl">Service Area</h2>
            <p className="text-muted-foreground mb-6 text-base sm:text-lg">
              We serve Evansville and Southern Indiana within ~50 miles.
            </p>
            <ul className="text-muted-foreground mb-6 grid grid-cols-2 gap-2 text-sm">
              <li>• Evansville, IN</li>
              <li>• Newburgh, IN</li>
              <li>• Henderson, KY</li>
              <li>• Boonville, IN</li>
              <li>• Owensboro, KY</li>
              <li>• Princeton, IN</li>
              <li>• Mount Carmel, IL</li>
              <li>• Mount Vernon, IN</li>
              <li>• New Harmony, IN</li>
            </ul>
            <div className="flex gap-2">
              <input
                value={zip}
                onChange={e => setZip(e.target.value.replace(/[^0-9]/g, '').slice(0, 5))}
                placeholder="Enter ZIP"
                aria-label="ZIP code"
                className="border-border w-32 rounded-md border px-3 py-2"
              />
              <button
                type="button"
                onClick={handleCheck}
                className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white"
              >
                Check
              </button>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">{message}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Some services may be location-limited (e.g., large demolition projects).
            </p>
          </div>

          <GlassCard variant="white" className="overflow-hidden p-0">
            <div className="bg-card">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold">Coverage Map (OpenStreetMap)</span>
              </div>
              <div className="p-0">
                <div className="aspect-[3/2] w-full">
                  {/** Client-only Leaflet map for interactivity */}
                  <ClientLeafletMap />
                </div>
                <div className="text-muted-foreground px-4 py-2 text-xs">
                  <a
                    className="underline"
                    href="https://www.openstreetmap.org/?mlat=37.9716&mlon=-87.5711#map=11/37.9716/-87.5711"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View larger map on OpenStreetMap
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
