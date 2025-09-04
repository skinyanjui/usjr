"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTopOnRouteChange() {
  const pathname = usePathname()

  // Ensure browser doesn't auto-restore scroll which can conflict with our manual scroll handling
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration
      window.history.scrollRestoration = "manual"
      return () => {
        window.history.scrollRestoration = previous
      }
    }
    return undefined
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      let raf1 = 0
      let raf2 = 0
      raf1 = window.requestAnimationFrame(() => {
        // Defer to the next frame to ensure pending layout/style work is flushed
        raf2 = window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" })
        })
      })
      return () => {
        if (raf1) cancelAnimationFrame(raf1)
        if (raf2) cancelAnimationFrame(raf2)
      }
    }
    return undefined
  }, [pathname])

  return null
}
