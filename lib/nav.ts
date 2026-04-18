export type NavItem = {
  label: string
  href: string
}

export const NAV: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/locations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export const CTAS = {
  phone: { label: '(812) 610-1657', href: 'tel:+18126101657' },
  sms: { label: 'Text Photos', href: 'sms:+18126101657' },
  quote: { label: 'Get Free Quote', href: '/quote' },
  priceMatch: { label: 'Price Match', href: '/faq#price-match' },
}
