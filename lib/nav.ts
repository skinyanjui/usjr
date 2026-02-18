export type NavItem = {
  label: string
  href?: string
  children?: NavItem[]
  promo?: {
    title: string
    description: string
    image?: string
    href: string
    ctaLabel: string
  }
}

export const NAV: NavItem[] = [
  {
    label: 'Services',
    promo: {
      title: 'Spring Cleaning Sale',
      description: 'Get $50 off your first whole-home deep cleaning service. Limited time offer!',
      href: '/quote',
      ctaLabel: 'Claim Offer',
      image: '/promo-image.jpg', // Placeholder, in real app we'd use a real image or omit
    },
    children: [
      { label: 'Junk Removal', href: '/services/junk-removal' },
      { label: 'Cleaning', href: '/cleaning' },
      { label: 'Estate Cleanouts', href: '/services/estate-cleanouts' },
      { label: 'Appliance Removal', href: '/services/appliance-removal' },
      { label: 'Light Demolition', href: '/services/light-demolition' },
      { label: 'Garage Cleanout', href: '/services/garage-cleanout' },
      { label: 'Hot Tub Removal', href: '/services/hot-tub-removal' },
      { label: 'Mattress Removal', href: '/services/mattress-removal' },
      { label: 'Shed Removal', href: '/services/shed-removal' },
      { label: 'Yard Waste Removal', href: '/services/yard-waste-removal' },
      { label: 'Storage Unit Cleanouts', href: '/services/storage-unit-cleanouts' },
      { label: 'Office Cleanouts', href: '/services/office-cleanouts' },
      { label: 'Restaurant Equipment Removal', href: '/services/restaurant-equipment-removal' },
      { label: 'Property Management Turnovers', href: '/services/property-management-turnovers' },
      { label: 'Warehouse Fixture Removal', href: '/services/warehouse-fixture-removal' },
      { label: 'Holiday Tree Removal', href: '/services/holiday-tree-removal' },
      { label: 'Storm Debris Cleanup', href: '/services/storm-debris-cleanup' },
    ],
  },
  {
    label: 'Locations',
    promo: {
      title: 'Full Tri-State Coverage',
      description:
        'Serving Evansville, Henderson, Owensboro, and surrounding communities with same-day service.',
      href: '/locations',
      ctaLabel: 'View All Locations',
    },
    children: [
      { label: 'Evansville, IN', href: '/locations/evansville' },
      { label: 'Newburgh, IN', href: '/locations/newburgh' },
      { label: 'Henderson, KY', href: '/locations/henderson-ky' },
      { label: 'Owensboro, KY', href: '/locations/owensboro-ky' },
      { label: 'Boonville, IN', href: '/locations/boonville' },
      { label: 'Princeton, IN', href: '/locations/princeton' },
      { label: 'Mount Carmel, IL', href: '/locations/mount-carmel-il' },
      { label: 'Mount Vernon, IN', href: '/locations/mount-vernon-in' },
      { label: 'New Harmony, IN', href: '/locations/new-harmony-in' },
    ],
  },
  {
    label: 'Company',
    promo: {
      title: 'Award Winning Service',
      description:
        'Veteran-owned and operated. We pride ourselves on honest, transparent service and eco-friendly disposal.',
      href: '/about',
      ctaLabel: 'Learn More',
    },
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
]

export const CTAS = {
  phone: { label: '(812) 610-1657', href: 'tel:+18126101657' },
  sms: { label: 'Text Photos', href: 'sms:+18126101657' },
  quote: { label: 'Get Free Quote', href: '/quote' },
  priceMatch: { label: 'Price Match', href: '/faq#price-match' },
}
