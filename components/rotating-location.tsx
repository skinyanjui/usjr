'use client'

import { useState, useEffect } from 'react'

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
