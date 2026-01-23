'use client'
import { useEffect, useMemo, useRef, useId } from 'react'
import { MapPin } from 'lucide-react'
import L from 'leaflet'

type LocationPin = {
  name: string
  href: string
  latitude: number
  longitude: number
}

export default function LeafletMap() {
  const locations: LocationPin[] = useMemo(
    () => [
      {
        name: 'Evansville, IN',
        href: '/locations/evansville',
        latitude: 37.9716,
        longitude: -87.5711,
      },
      { name: 'Newburgh, IN', href: '/locations/newburgh', latitude: 37.9445, longitude: -87.405 },
      {
        name: 'Henderson, KY',
        href: '/locations/henderson-ky',
        latitude: 37.8362,
        longitude: -87.59,
      },
      {
        name: 'Owensboro, KY',
        href: '/locations/owensboro-ky',
        latitude: 37.7742,
        longitude: -87.1133,
      },
      {
        name: 'Boonville, IN',
        href: '/locations/boonville',
        latitude: 38.0495,
        longitude: -87.2739,
      },
      {
        name: 'Princeton, IN',
        href: '/locations/princeton',
        latitude: 38.3556,
        longitude: -87.5675,
      },
      {
        name: 'Mount Carmel, IL',
        href: '/locations/mount-carmel-il',
        latitude: 38.4106,
        longitude: -87.7617,
      },
      {
        name: 'Mount Vernon, IN',
        href: '/locations/mount-vernon-in',
        latitude: 37.9334,
        longitude: -87.8956,
      },
      {
        name: 'New Harmony, IN',
        href: '/locations/new-harmony-in',
        latitude: 38.1292,
        longitude: -87.9334,
      },
    ],
    []
  )

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const mapId = useId()

  useEffect(() => {
    // Ensure Leaflet CSS is loaded non-blockingly when the map mounts on client
    const existing = document.querySelector(
      'link[data-leaflet-css="true"]'
    ) as HTMLLinkElement | null
    if (!existing) {
      const preload = document.createElement('link')
      preload.rel = 'preload'
      preload.as = 'style'
      preload.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      preload.setAttribute('data-leaflet-css', 'true')
      document.head.appendChild(preload)

      const stylesheet = document.createElement('link')
      stylesheet.rel = 'stylesheet'
      stylesheet.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      stylesheet.media = 'print'
      stylesheet.onload = () => {
        stylesheet.media = 'all'
      }
      stylesheet.setAttribute('data-leaflet-css', 'true')
      document.head.appendChild(stylesheet)
    }

    if (!mapContainerRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: [37.9716, -87.5711],
      zoom: 9,
      scrollWheelZoom: true,
      attributionControl: true,
    })
    mapRef.current = map

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    const markerGroup = L.layerGroup().addTo(map)

    locations.forEach(location => {
      const marker = L.circleMarker([location.latitude, location.longitude], {
        radius: 6,
        color: '#ffffff',
        weight: 2,
        fillColor: '#dc2626',
        fillOpacity: 1,
        opacity: 1,
      }).addTo(markerGroup)
      const label: string = location.name.split(',')[0] ?? location.name
      marker.bindTooltip(label, {
        permanent: true,
        direction: 'top',
        offset: [0, -12],
        opacity: 0.9,
        className:
          'bg-card/90 px-1 py-[2px] rounded text-[10px] font-medium text-muted-foreground shadow',
      })
      marker.on('click', () => {
        window.location.href = location.href
      })

      // Keyboard accessibility
      const element = marker.getElement()
      if (element) {
        element.setAttribute('tabindex', '0')
        element.setAttribute('role', 'button')
        element.setAttribute('aria-label', `View details for ${location.name}`)

        element.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            window.location.href = location.href
          }
        })
        element.addEventListener('focus', () => {
          marker.openTooltip()
        })
        element.addEventListener('blur', () => {
          marker.closeTooltip()
        })
      }
    })

    // Fit map to show all locations nicely
    const bounds = L.latLngBounds(locations.map(l => [l.latitude, l.longitude] as [number, number]))
    map.fitBounds(bounds, { padding: [24, 24] })

    return () => {
      markerGroup.clearLayers()
      map.removeLayer(markerGroup)
      tileLayer.remove()
      map.remove()
      mapRef.current = null
    }
  }, [locations])

  return (
    <div className="relative h-full w-full">
      <div
        id={mapId}
        ref={mapContainerRef}
        className="h-full w-full"
        aria-label="Interactive map of service areas. Use Tab to navigate between location markers. Press Enter to view details."
        role="application"
      />

      <div className="bg-card/90 absolute top-2 left-2 rounded-lg p-2 shadow-sm backdrop-blur-sm">
        <div className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
          <MapPin className="h-3 w-3 text-gray-900" />
          <span>Service Area</span>
        </div>
        <div className="text-muted-foreground mt-1 text-xs">{locations.length} cities served</div>
      </div>
    </div>
  )
}
