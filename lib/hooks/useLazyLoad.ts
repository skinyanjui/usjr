import { useState, useEffect, useRef } from 'react'

export function useLazyLoad<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { rootMargin: '100px' }
) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const ref = useRef<T>(null)

  const { root, rootMargin, threshold } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { root, rootMargin, threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [root, rootMargin, JSON.stringify(threshold)])

  return { ref, shouldLoad }
}
