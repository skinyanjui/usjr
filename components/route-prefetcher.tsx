"use client"

import { useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { NAV } from "@/lib/nav"

function getAllNavHrefs(): string[] {
  const hrefs: string[] = []
  for (const item of NAV) {
    if (item.href) hrefs.push(item.href)
    if (item.children) {
      for (const child of item.children) {
        if (child.href) hrefs.push(child.href)
      }
    }
  }
  return Array.from(new Set(hrefs))
}

export function RoutePrefetcher() {
  const router = useRouter()
  const pathname = usePathname()

  const targets = useMemo(() => {
    return getAllNavHrefs().filter((href) => href !== pathname)
  }, [pathname])

  useEffect(() => {
    if (typeof window === "undefined") return

    const idleCb = () => {
      for (const href of targets) {
        try {
          router.prefetch(href)
        } catch {}
      }
    }

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(idleCb, { timeout: 2000 })
      return () => (window as any).cancelIdleCallback?.(id)
    } else {
      const id = (window as any).setTimeout(idleCb, 800)
      return () => (window as any).clearTimeout(id)
    }
  }, [targets, router])

  return null
}

export function prefetchRoutes(hrefs: string[]) {
  if (typeof window === "undefined") return
  const router = (require("next/navigation") as typeof import("next/navigation")).useRouter?.()
  const unique = Array.from(new Set(hrefs))
  try {
    // If hook not available in this context, fall back to link-hover behavior elsewhere
    if (!router) return
    for (const href of unique) {
      router.prefetch(href)
    }
  } catch {}
}

