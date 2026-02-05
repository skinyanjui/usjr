'use client'

import { useState, useEffect } from 'react'
import { findClosestCityIndex } from '@/lib/location-utils'

interface RotatingLocationProps {
  locations: string[]
  interval?: number
  initialIndex?: number
}

export function RotatingLocation({
  locations,
  interval = 3000,
  initialIndex = 0,
}: RotatingLocationProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Detect user location and set starting city (Client-side fallback)
  useEffect(() => {
    // Only attempt client-side detection if server-side didn't provide a specific index (0 is default)
    // or if we want to ensure we get the best location even if server defaulted.
    // Assuming 0 is the fallback/default index.
    if (initialIndex !== 0) return

    const detectLocation = async () => {
      try {
        // Check session storage first
        const cachedIndex = sessionStorage.getItem('user_location_index')
        if (cachedIndex !== null) {
          const index = parseInt(cachedIndex, 10)
          if (!isNaN(index) && index >= 0 && index < locations.length) {
            setCurrentIndex(index)
            return
          }
        }

        // Fetch from API
        const response = await fetch('/api/geo')
        if (!response.ok) return

        const data = await response.json()
        if (data.latitude && data.longitude) {
          const closestIndex = findClosestCityIndex(data.latitude, data.longitude, locations)
          setCurrentIndex(closestIndex)
          sessionStorage.setItem('user_location_index', closestIndex.toString())
        }
      } catch (error) {
        // Silent failure, fallback to default rotation
        console.error('Location detection failed:', error)
      }
    }

    detectLocation()
  }, [initialIndex, locations])

  // Start rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % locations.length)
    }, interval)

    return () => clearInterval(timer)
  }, [locations.length, interval])

  return (
    <span className="inline-block transition-opacity duration-500 sm:min-w-[180px]">
      {locations[currentIndex]}
    </span>
  )
}
