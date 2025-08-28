"use client"

import { useEffect, useMemo, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"

type LocationPin = {
  name: string
  href: string
  latitude: number
  longitude: number
}

export default function GoogleMap() {
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
    []
  )

  const center: [number, number] = [37.99, -87.5]
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let isMounted = true
    let map: any
    let infoWindow: any

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY || "",
      version: "weekly",
    })

    loader
      .importLibrary("maps")
      .then(async (maps: any) => {
        if (!isMounted || !mapRef.current) return

        map = new maps.Map(mapRef.current, {
          center: { lat: center[0], lng: center[1] },
          zoom: 9,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })

        const { Marker } = (await loader.importLibrary("marker")) as any
        infoWindow = new maps.InfoWindow()

        locations.forEach((loc) => {
          const marker = new Marker({
            map,
            position: { lat: loc.latitude, lng: loc.longitude },
            title: loc.name,
          })

          marker.addListener("click", () => {
            infoWindow.setContent(
              `<div class="text-sm"><div class="font-semibold">${loc.name}</div><a href="${loc.href}" class="text-red-700 underline">View location</a></div>`
            )
            infoWindow.open({ anchor: marker, map })
          })
        })
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [locations])

  return <div ref={mapRef} className="w-full h-full" />
}

