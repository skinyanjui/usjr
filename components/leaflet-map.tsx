"use client"

import { useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

;(L.Icon.Default.prototype as any)._getIconUrl = function () {
  return this.options.iconUrl
}
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

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
    ],
    []
  )

  const center: [number, number] = [37.99, -87.5]

  return (
    <MapContainer center={center} zoom={9} scrollWheelZoom={false} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.name} position={[loc.latitude, loc.longitude]}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{loc.name}</div>
              <a href={loc.href} className="text-red-700 underline">View location</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

