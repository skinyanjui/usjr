export type QuoteClickEvent = {
  location: string
  label: string
  destination: string
}

export type QuoteEventProperties = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void
    gtag?: (...args: unknown[]) => void
  }
}

export function trackQuoteEvent(name: string, properties: QuoteEventProperties = {}): void {
  if (typeof window === 'undefined') return

  const cleanProperties = Object.fromEntries(
    Object.entries(properties).filter((entry): entry is [string, string | number | boolean] => {
      return entry[1] !== undefined
    })
  )

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...cleanProperties })
    }

    if (typeof window.plausible === 'function') {
      window.plausible(name, { props: cleanProperties })
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, cleanProperties)
    }
  } catch {
    // Analytics should never interrupt the quote flow.
  }
}

export function trackQuoteClick(event: QuoteClickEvent): void {
  trackQuoteEvent('quote_cta_click', event)
}
