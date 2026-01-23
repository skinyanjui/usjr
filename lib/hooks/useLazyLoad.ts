import { useState, useEffect, RefObject } from 'react'

export function useLazyLoad(ref: RefObject<HTMLElement | null>, rootMargin = '0px') {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, rootMargin])

  return isVisible
}
