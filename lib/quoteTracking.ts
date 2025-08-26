export type QuoteClickEvent = {
  location: string
  label: string
  destination: string
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void
    gtag?: (...args: any[]) => void
  }
}

export function trackQuoteClick(event: QuoteClickEvent): void {
  if (typeof window === "undefined") return
  try {
    // Google Tag Manager / dataLayer
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: "quote_cta_click", ...event })
    }

    // Plausible
    if (typeof window.plausible === "function") {
      window.plausible("Quote CTA Click", { props: { ...event } })
    }

    // GA4
    if (typeof window.gtag === "function") {
      window.gtag("event", "quote_cta_click", { ...event })
    }
  } catch (err) {
    // no-op
  }
}