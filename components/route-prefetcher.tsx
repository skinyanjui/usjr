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

  useEffect(() => {
    if (typeof window === "undefined") return

    const isInternalHref = (href: string) => {
      if (!href) return false
      if (href.startsWith("#")) return false
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("sms:")) return false
      try {
        const url = new URL(href, window.location.origin)
        return url.origin === window.location.origin
      } catch {
        return false
      }
    }

    const prefetchHref = (href: string) => {
      try { router.prefetch(href) } catch {}
    }

    const onHover = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      const anchor = target.closest && target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''
      if (!isInternalHref(href)) return
      if ((anchor as any).dataset.__prefetched === '1') return
      (anchor as any).dataset.__prefetched = '1'
      prefetchHref(href)
    }

    window.addEventListener('mouseover', onHover, { capture: true, passive: true })
    window.addEventListener('touchstart', onHover, { capture: true, passive: true })

    return () => {
      window.removeEventListener('mouseover', onHover, { capture: true } as any)
      window.removeEventListener('touchstart', onHover, { capture: true } as any)
    }
  }, [router])

  useEffect(() => {
    if (typeof window === "undefined") return

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
    if (!('IntersectionObserver' in window)) return

    const isInternalHref = (href: string) => {
      if (!href) return false
      if (href.startsWith("#")) return false
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("sms:")) return false
      try {
        const url = new URL(href, window.location.origin)
        return url.origin === window.location.origin
      } catch {
        return false
      }
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLAnchorElement
        const href = el.getAttribute('href') || ''
        if (!isInternalHref(href)) continue
        if ((el as any).dataset.__prefetched === '1') continue
        ;(el as any).dataset.__prefetched = '1'
        try { router.prefetch(href) } catch {}
        observer.unobserve(el)
      }
    }, { rootMargin: '200px' })

    for (const a of anchors) {
      const href = a.getAttribute('href') || ''
      if (!isInternalHref(href)) continue
      if ((a as any).dataset.__prefetched === '1') continue
      observer.observe(a)
    }

    return () => observer.disconnect()
  }, [pathname, router])

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

