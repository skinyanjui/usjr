'use client'

import { useState, useEffect } from 'react'

interface RotatingLocationProps {
  locations: string[]
  interval?: number
}

export function RotatingLocation({ locations, interval = 3000 }: RotatingLocationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % locations.length)
    }, interval)

    return () => clearInterval(timer)
  }, [locations.length, interval])

  return (
    <span className="inline-block min-w-[180px] transition-opacity duration-500">
      {locations[currentIndex]}
    </span>
  )
}
