"use client"
import { useEffect, useMemo, useRef } from "react"
import { MapPin } from "lucide-react"
import L from "leaflet"

type LocationPin = {
  name: string
  href: string
  latitude: number
  longitude: number
}

export default function LeafletMap() {
  const locations: LocationPin[] = useMemo(
    () => [
      { name: "Evansville, IN", href: "/locations/evansville", latitude: 37.9716, longitude: -87.5711 },
      { name: "Newburgh, IN", href: "/locations/newburgh", latitude: 37.9445, longitude: -87.405 },
      { name: "Henderson, KY", href: "/locations/henderson-ky", latitude: 37.8362, longitude: -87.59 },
      { name: "Owensboro, KY", href: "/locations/owensboro-ky", latitude: 37.7742, longitude: -87.1133 },
      { name: "Boonville, IN", href: "/locations/boonville", latitude: 38.0495, longitude: -87.2739 },
      { name: "Princeton, IN", href: "/locations/princeton", latitude: 38.3556, longitude: -87.5675 },
      { name: "Mount Carmel, IL", href: "/locations/mount-carmel-il", latitude: 38.4106, longitude: -87.7617 },
      { name: "Mount Vernon, IN", href: "/locations/mount-vernon-in", latitude: 37.9334, longitude: -87.8956 },
      { name: "New Harmony, IN", href: "/locations/new-harmony-in", latitude: 38.1292, longitude: -87.9334 },
    ],
    [],
  )

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Ensure default marker icons load correctly in Next.js
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    })

    const map = L.map(mapContainerRef.current, {
      center: [37.9716, -87.5711],
      zoom: 9,
      scrollWheelZoom: true,
      attributionControl: true,
    })
    mapRef.current = map

    const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    const markerGroup = L.layerGroup().addTo(map)

    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude]).addTo(markerGroup)
      const label: string = location.name.split(",")[0] ?? location.name
      marker.bindTooltip(label, {
        permanent: true,
        direction: "top",
        offset: [0, -10],
        opacity: 0.9,
        className: "bg-white/90 px-1 py-[2px] rounded text-[10px] font-medium text-gray-700 shadow",
      })
      marker.on("click", () => {
        window.location.href = location.href
      })
    })

    // Fit map to show all locations nicely
    const bounds = L.latLngBounds(
      locations.map((l) => [l.latitude, l.longitude] as [number, number]),
    )
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
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full" aria-label="Service Area Map" />

      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
        <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
          <MapPin className="w-3 h-3 text-red-600" />
          <span>Service Area</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">{locations.length} cities served</div>
      </div>
    </div>
  )
}
