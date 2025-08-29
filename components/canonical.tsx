"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function Canonical() {
  const pathname = usePathname() || "/"

  useEffect(() => {
    const base = (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""))
      || window.location.origin
    const href = `${base}${pathname}`

    let linkEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!linkEl) {
      linkEl = document.createElement("link")
      linkEl.setAttribute("rel", "canonical")
      document.head.appendChild(linkEl)
    }
    linkEl.setAttribute("href", href)
  }, [pathname])

  return null
}

