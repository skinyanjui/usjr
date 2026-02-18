// CMS-like content management for cleaning services
// In a real application, this would connect to a headless CMS or database

import type { SolidPanelColor } from '@/lib/solid-panel-colors'

export interface Service {
  id: string
  name: string
  category: 'residential' | 'commercial'
  description: string
  price: string
  duration: string
  includes: string[]
  active: boolean
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'residential' | 'commercial' | 'pricing'
  active: boolean
}

export interface Location {
  id: string
  name: string
  state: string
  zipCodes: string[]
  landmarks: string[]
  active: boolean
}

export interface Testimonial {
  id: string
  name: string
  location: string
  service: string
  rating: number
  text: string
  date: string
  verified: boolean
  active: boolean
}

export type GalleryPanelColor = SolidPanelColor

export interface GalleryPanel {
  label: string
  description: string
  color: GalleryPanelColor
}

export interface GalleryImage {
  id: string
  title: string
  service: string
  location: string
  summary: string
  before: GalleryPanel
  after: GalleryPanel
  active: boolean
}

export interface Settings {
  phone: string
  email: string
  squareBookingUrl: string
  businessHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  serviceAreas: string[]
  socialMedia: {
    facebook?: string
    instagram?: string
    google?: string
  }
  phoneE164: string
}

// Mock CMS data - in production, this would come from a CMS or database
export const services: Service[] = [
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    category: 'residential',
    description: 'Comprehensive one-time cleaning for your entire home',
    price: 'From $150',
    duration: '3-5 hours',
    includes: [
      'High-to-low dusting',
      'Kitchen deep clean',
      'Bathroom sanitization',
      'Floor care',
      'Baseboards and window sills',
    ],
    active: true,
  },
  {
    id: 'recurring-weekly',
    name: 'Recurring Cleaning (Weekly)',
    category: 'residential',
    description: 'Weekly maintenance cleaning for busy families',
    price: 'From $80',
    duration: '1.5-3 hours',
    includes: [
      'Regular dusting',
      'Kitchen cleaning',
      'Bathroom cleaning',
      'Floor care',
      'Trash removal',
    ],
    active: true,
  },
  {
    id: 'move-in-out',
    name: 'Move-In/Move-Out Cleaning',
    category: 'residential',
    description: 'Complete property cleaning for transitions',
    price: 'From $200',
    duration: '4-6 hours',
    includes: [
      'All deep cleaning services',
      'Inside appliances',
      'Cabinet interiors',
      'Window tracks',
      'Deep sanitization',
    ],
    active: true,
  },
  {
    id: 'office-cleaning',
    name: 'Office Cleaning',
    category: 'commercial',
    description: 'Professional office cleaning services',
    price: 'From $120',
    duration: '2-4 hours',
    includes: [
      'Desk and workstation cleaning',
      'Restroom maintenance',
      'Break room cleaning',
      'Floor care',
      'Trash removal',
    ],
    active: true,
  },
]

export const faqs: FAQ[] = [
  {
    id: 'products',
    question: 'What cleaning products do you use?',
    answer:
      'We exclusively use natural, eco-friendly cleaning products that are safe for your family and pets. All our products are non-toxic and biodegradable.',
    category: 'general',
    active: true,
  },
  {
    id: 'pricing',
    question: 'How do you determine pricing?',
    answer:
      'Our pricing is based on the size of your space, type of service, and specific requirements. We provide transparent, upfront pricing with no hidden fees.',
    category: 'pricing',
    active: true,
  },
  {
    id: 'scheduling',
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking 1-2 weeks in advance, especially during peak seasons. However, we can often accommodate same-day or next-day requests.',
    category: 'general',
    active: true,
  },
]

export const locations: Location[] = [
  {
    id: 'evansville',
    name: 'Evansville',
    state: 'IN',
    zipCodes: [
      '47701',
      '47702',
      '47703',
      '47704',
      '47705',
      '47706',
      '47708',
      '47710',
      '47711',
      '47712',
      '47713',
      '47714',
      '47715',
      '47716',
      '47719',
      '47720',
      '47721',
      '47722',
      '47724',
      '47725',
      '47727',
      '47728',
      '47730',
      '47731',
      '47732',
      '47733',
      '47734',
      '47735',
      '47736',
      '47737',
      '47740',
      '47741',
      '47744',
      '47747',
      '47750',
    ],
    landmarks: [
      'University of Evansville',
      'Tropicana Evansville Casino',
      'Mesker Park Zoo',
      'Evansville Museum',
      'Ford Center',
      'Wesselman Woods',
      'Angel Mounds State Historic Site',
    ],
    active: true,
  },
  {
    id: 'newburgh',
    name: 'Newburgh',
    state: 'IN',
    zipCodes: ['47630'],
    landmarks: ['Historic Newburgh', 'Ohio River', 'Newburgh Lock and Dam', 'Castle High School'],
    active: true,
  },
  {
    id: 'henderson-ky',
    name: 'Henderson',
    state: 'KY',
    zipCodes: ['42420'],
    landmarks: [
      'Henderson County Courthouse',
      'Audubon State Park',
      'Ellis Park Racing',
      'Henderson Riverfront',
    ],
    active: true,
  },
  {
    id: 'mount-carmel-il',
    name: 'Mount Carmel',
    state: 'IL',
    zipCodes: ['62863'],
    landmarks: [
      'Wabash River',
      'Wabash Valley College',
      'Mount Carmel City Park',
      'Downtown Mount Carmel',
    ],
    active: true,
  },
  {
    id: 'mount-vernon-in',
    name: 'Mount Vernon',
    state: 'IN',
    zipCodes: ['47620'],
    landmarks: [
      'Posey County Courthouse',
      'Hovey Lake',
      'Mount Vernon Riverfront',
      'Alex Karras Park',
    ],
    active: true,
  },
  {
    id: 'new-harmony-in',
    name: 'New Harmony',
    state: 'IN',
    zipCodes: ['47631'],
    landmarks: [
      'Harmonie State Park',
      'Roofless Church',
      'Atheneum Visitor Center',
      'Historic District',
    ],
    active: true,
  },
  {
    id: 'boonville',
    name: 'Boonville',
    state: 'IN',
    zipCodes: ['47601'],
    landmarks: [
      'Warrick County Courthouse',
      'Scales Lake Park',
      'Warrick County Museum',
      'Historic Downtown Boonville',
    ],
    active: true,
  },
  {
    id: 'princeton',
    name: 'Princeton',
    state: 'IN',
    zipCodes: ['47670'],
    landmarks: [
      'Gibson County Courthouse',
      'Toyota Manufacturing',
      'Princeton Community Park',
      'Patoka River Access',
    ],
    active: true,
  },
  {
    id: 'owensboro-ky',
    name: 'Owensboro',
    state: 'KY',
    zipCodes: ['42301', '42302', '42303'],
    landmarks: [
      'Smothers Park',
      'Bluegrass Music Hall of Fame',
      'Owensboro Museum of Fine Art',
      'Daviess County Courthouse',
    ],
    active: true,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'sarah-m',
    name: 'Sarah M.',
    location: 'Evansville, IN',
    service: 'Deep Cleaning',
    rating: 5,
    text: 'They scrubbed baseboards, vents, and even inside the microwave. The house smelled fresh (not chemical) when they finished. Friendly crew and clear communication.',
    date: '2025-03-14',
    verified: true,
    active: true,
  },
  {
    id: 'mike-r',
    name: 'Mike R.',
    location: 'Newburgh, IN',
    service: 'Recurring Cleaning',
    rating: 5,
    text: "We switched to a bi‑weekly schedule and it's been consistent. Same two cleaners most visits; one week there was a new person and they left a note explaining the change. House looks great every time.",
    date: '2025-03-05',
    verified: true,
    active: true,
  },
  {
    id: 'jennifer-l',
    name: 'Jennifer L.',
    location: 'Henderson, KY',
    service: 'Move-Out Cleaning',
    rating: 5,
    text: 'Landlord walkthrough went smoothly. Oven and fridge were spotless and cabinets wiped inside. A couple scuffs on the wall (not part of cleaning) but everything that was quoted was done well.',
    date: '2025-02-26',
    verified: true,
    active: true,
  },
  {
    id: 'david-k',
    name: 'David K.',
    location: 'Evansville, IN',
    service: 'Office Cleaning',
    rating: 4,
    text: 'After‑hours cleaning has been reliable for our office. One week a couple of trash bins were missed in a conference room, but they came back the next morning to fix it. Overall very good.',
    date: '2025-02-18',
    verified: true,
    active: true,
  },
  {
    id: 'lisa-w',
    name: 'Lisa W.',
    location: 'Boonville, IN',
    service: 'Specialty Cleaning',
    rating: 5,
    text: 'Fridge deep clean + pantry organizing. They labeled a few bins so we can keep it tidy. Finished about 20 minutes earlier than estimated and checked everything with me before leaving.',
    date: '2025-02-10',
    verified: true,
    active: true,
  },
  {
    id: 'robert-h',
    name: 'Robert H.',
    location: 'Princeton, IN',
    service: 'Deep Cleaning',
    rating: 4,
    text: 'Team was on time and careful with our wood floors. One window track was still dusty in a corner; I texted and they came back the same afternoon to finish. Would hire again.',
    date: '2025-01-28',
    verified: true,
    active: true,
  },
]

export const galleryImages: GalleryImage[] = [
  {
    id: 'kitchen-deep-clean',
    title: 'Kitchen Deep Clean Transformation',
    service: 'Deep Cleaning',
    location: 'Evansville, IN',
    summary: 'Complete kitchen deep clean including appliances, cabinets, and countertops',
    before: {
      label: 'Before',
      description:
        'Grease buildup on the stove, cluttered counters, and dull stainless appliances.',
      color: 'neutral',
    },
    after: {
      label: 'After',
      description:
        'Sanitized surfaces, polished appliances, and organized cabinets ready for cooking.',
      color: 'primary',
    },
    active: true,
  },
  {
    id: 'bathroom-renovation-clean',
    title: 'Post-Renovation Bathroom Cleaning',
    service: 'Move-In Cleaning',
    location: 'Newburgh, IN',
    summary: 'Move-in cleaning after bathroom renovation with construction dust removal',
    before: {
      label: 'Before',
      description: 'Dust-covered tile, paint splatters on fixtures, and debris in the shower.',
      color: 'neutral',
    },
    after: {
      label: 'After',
      description:
        'Crystal-clear glass, sanitized tile and grout, and sparkling fixtures throughout.',
      color: 'primary',
    },
    active: true,
  },
  {
    id: 'office-space-clean',
    title: 'Commercial Office Deep Clean',
    service: 'Commercial Cleaning',
    location: 'Henderson, KY',
    summary: 'Complete office cleaning including workstations, conference rooms, and common areas',
    before: {
      label: 'Before',
      description: 'Overflowing trash bins, dusty desks, and streaked conference room glass.',
      color: 'neutral',
    },
    after: {
      label: 'After',
      description: 'Freshly sanitized work areas, reset conference rooms, and shining entryways.',
      color: 'primary',
    },
    active: true,
  },
]

export const settings: Settings = {
  phone: '(812) 610-1657',
  phoneE164: '+18126101657',
  email: 'unclesamjunkremoval@gmail.com',
  squareBookingUrl: 'https://square.site/book/PLACEHOLDER_BOOKING_URL',
  businessHours: {
    monday: '8:00 AM - 6:00 PM',
    tuesday: '8:00 AM - 6:00 PM',
    wednesday: '8:00 AM - 6:00 PM',
    thursday: '8:00 AM - 6:00 PM',
    friday: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 4:00 PM',
    sunday: 'Closed',
  },
  serviceAreas: [
    'Evansville, IN',
    'Newburgh, IN',
    'Henderson, KY',
    'Owensboro, KY',
    'Boonville, IN',
    'Princeton, IN',
    'Mount Carmel, IL',
    'Mount Vernon, IN',
    'New Harmony, IN',
  ],
  socialMedia: {
    facebook: 'https://facebook.com/unclesamjunkremoval',
    instagram: 'https://instagram.com/unclesamjunkremoval',
    google: 'https://g.page/unclesamjunkremoval',
  },
}

// Helper functions for CMS operations
export function getActiveServices(category?: 'residential' | 'commercial'): Service[] {
  return services.filter(service => service.active && (!category || service.category === category))
}

export function getActiveFAQs(category?: string): FAQ[] {
  return faqs.filter(faq => faq.active && (!category || faq.category === category))
}

export function getActiveLocations(): Location[] {
  return locations.filter(location => location.active)
}

export function getActiveTestimonials(limit?: number): Testimonial[] {
  const active = testimonials.filter(testimonial => testimonial.active && testimonial.verified)
  return limit ? active.slice(0, limit) : active
}

export function getAggregateTestimonialStats(): { averageRating: number; reviewCount: number } {
  const active = testimonials.filter(testimonial => testimonial.active && testimonial.verified)
  const reviewCount = active.length
  if (reviewCount === 0) return { averageRating: 0, reviewCount }
  const sum = active.reduce((total, t) => total + t.rating, 0)
  const average = sum / reviewCount
  return { averageRating: Number(average.toFixed(1)), reviewCount }
}

export function getActiveGalleryImages(limit?: number): GalleryImage[] {
  const active = galleryImages.filter(image => image.active)
  return limit ? active.slice(0, limit) : active
}

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id && service.active)
}

export function getLocationById(id: string): Location | undefined {
  return locations.find(location => location.id === id && location.active)
}
