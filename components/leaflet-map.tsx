"use client"

import { useMemo } from "react"
import { MapPin } from "lucide-react"

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

  return (
    <div className="w-full h-full relative">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=-88.2,-37.5,-86.8,38.5&layer=mapnik&marker=37.9716,-87.5711"
        className="w-full h-full border-0"
        title="Service Area Map - Evansville and Southern Indiana"
        loading="lazy"
      />

      {/* Location overlay for better UX */}
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
        <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
          <MapPin className="w-3 h-3 text-red-600" />
          <span>Service Area</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">Evansville & 50mi radius</div>
      </div>
    </div>
  )
}
