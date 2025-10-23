'use client'

import { useState, useEffect } from 'react'

interface RotatingLocationProps {
  locations: string[]
  interval?: number
}

// City coordinates for distance calculation
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Evansville: { lat: 37.9716, lng: -87.5711 },
  Newburgh: { lat: 37.9445, lng: -87.4053 },
  Henderson: { lat: 37.8361, lng: -87.59 },
  Owensboro: { lat: 37.7742, lng: -87.1114 },
  Boonville: { lat: 38.0489, lng: -87.2736 },
  Princeton: { lat: 38.3556, lng: -87.5681 },
  'Mount Carmel': { lat: 38.4106, lng: -87.7614 },
  'Mount Vernon': { lat: 37.9325, lng: -87.8947 },
  'New Harmony': { lat: 38.1292, lng: -87.9347 },
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function findClosestCityIndex(userLat: number, userLng: number, locations: string[]): number {
  let closestIndex = 0
  let minDistance = Infinity

  locations.forEach((location, index) => {
    const coords = CITY_COORDINATES[location]
    if (coords) {
      const distance = getDistance(userLat, userLng, coords.lat, coords.lng)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    }
  })

  return closestIndex
}

export function RotatingLocation({ locations, interval = 3000 }: RotatingLocationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  // Detect user location and set starting city
  useEffect(() => {
    async function detectLocation() {
      try {
        // Try to get user's approximate location from IP
        const response = await fetch('https://ipapi.co/json/')
        if (response.ok) {
          const data = await response.json()
          if (data.latitude && data.longitude) {
            const closestIndex = findClosestCityIndex(data.latitude, data.longitude, locations)
            setCurrentIndex(closestIndex)
          }
        }
      } catch (error) {
        // Silently fail and use default (index 0)
        console.log('Could not detect location, using default')
      } finally {
        setIsInitialized(true)
      }
    }

    detectLocation()
  }, [locations])

  // Start rotation after initialization
  useEffect(() => {
    if (!isInitialized) return

    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % locations.length)
    }, interval)

    return () => clearInterval(timer)
  }, [locations.length, interval, isInitialized])

  return (
    <span className="inline-block min-w-[180px] transition-opacity duration-500">
      {locations[currentIndex]}
    </span>
  )
}
