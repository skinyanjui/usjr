// CMS-like content management for cleaning services
// In a real application, this would connect to a headless CMS or database

export interface Service {
  id: string
  name: string
  category: "residential" | "commercial"
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
  category: "general" | "residential" | "commercial" | "pricing"
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

export interface GalleryImage {
  id: string
  title: string
  beforeImage: string
  afterImage: string
  service: string
  location: string
  description: string
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
    id: "deep-cleaning",
    name: "Deep Cleaning",
    category: "residential",
    description: "Comprehensive one-time cleaning for your entire home",
    price: "From $150",
    duration: "3-5 hours",
    includes: [
      "High-to-low dusting",
      "Kitchen deep clean",
      "Bathroom sanitization",
      "Floor care",
      "Baseboards and window sills",
    ],
    active: true,
  },
  {
    id: "recurring-weekly",
    name: "Recurring Cleaning (Weekly)",
    category: "residential",
    description: "Weekly maintenance cleaning for busy families",
    price: "From $80",
    duration: "1.5-3 hours",
    includes: ["Regular dusting", "Kitchen cleaning", "Bathroom cleaning", "Floor care", "Trash removal"],
    active: true,
  },
  {
    id: "move-in-out",
    name: "Move-In/Move-Out Cleaning",
    category: "residential",
    description: "Complete property cleaning for transitions",
    price: "From $200",
    duration: "4-6 hours",
    includes: [
      "All deep cleaning services",
      "Inside appliances",
      "Cabinet interiors",
      "Window tracks",
      "Deep sanitization",
    ],
    active: true,
  },
  {
    id: "office-cleaning",
    name: "Office Cleaning",
    category: "commercial",
    description: "Professional office cleaning services",
    price: "From $120",
    duration: "2-4 hours",
    includes: [
      "Desk and workstation cleaning",
      "Restroom maintenance",
      "Break room cleaning",
      "Floor care",
      "Trash removal",
    ],
    active: true,
  },
]

export const faqs: FAQ[] = [
  {
    id: "products",
    question: "What cleaning products do you use?",
    answer:
      "We exclusively use natural, eco-friendly cleaning products that are safe for your family and pets. All our products are non-toxic and biodegradable.",
    category: "general",
    active: true,
  },
  {
    id: "pricing",
    question: "How do you determine pricing?",
    answer:
      "Our pricing is based on the size of your space, type of service, and specific requirements. We provide transparent, upfront pricing with no hidden fees.",
    category: "pricing",
    active: true,
  },
  {
    id: "scheduling",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking 1-2 weeks in advance, especially during peak seasons. However, we can often accommodate same-day or next-day requests.",
    category: "general",
    active: true,
  },
]

export const locations: Location[] = [
  {
    id: "evansville",
    name: "Evansville",
    state: "IN",
    zipCodes: [
      "47701",
      "47702",
      "47703",
      "47704",
      "47705",
      "47706",
      "47708",
      "47710",
      "47711",
      "47712",
      "47713",
      "47714",
      "47715",
      "47716",
      "47719",
      "47720",
      "47721",
      "47722",
      "47724",
      "47725",
      "47727",
      "47728",
      "47730",
      "47731",
      "47732",
      "47733",
      "47734",
      "47735",
      "47736",
      "47737",
      "47740",
      "47741",
      "47744",
      "47747",
      "47750",
    ],
    landmarks: [
      "University of Evansville",
      "Tropicana Evansville Casino",
      "Mesker Park Zoo",
      "Evansville Museum",
      "Ford Center",
      "Wesselman Woods",
      "Angel Mounds State Historic Site",
    ],
    active: true,
  },
  {
    id: "newburgh",
    name: "Newburgh",
    state: "IN",
    zipCodes: ["47630"],
    landmarks: ["Historic Newburgh", "Ohio River", "Newburgh Lock and Dam", "Castle High School"],
    active: true,
  },
  {
    id: "henderson-ky",
    name: "Henderson",
    state: "KY",
    zipCodes: ["42420"],
    landmarks: ["Henderson County Courthouse", "Audubon State Park", "Ellis Park Racing", "Henderson Riverfront"],
    active: true,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: "sarah-m",
    name: "Sarah M.",
    location: "Evansville, IN",
    service: "Deep Cleaning",
    rating: 5,
    text: "Uncle Sam Junk Removal did an amazing job with our deep cleaning! They were thorough, professional, and used natural products that didn't irritate my allergies. Highly recommend!",
    date: "2024-01-15",
    verified: true,
    active: true,
  },
  {
    id: "mike-r",
    name: "Mike R.",
    location: "Newburgh, IN",
    service: "Recurring Cleaning",
    rating: 5,
    text: "We've been using their bi-weekly service for 6 months now. The same team comes each time, they know our preferences, and our house is always spotless. Great value!",
    date: "2024-01-10",
    verified: true,
    active: true,
  },
  {
    id: "jennifer-l",
    name: "Jennifer L.",
    location: "Henderson, KY",
    service: "Move-Out Cleaning",
    rating: 5,
    text: "They helped us get our full security deposit back! The move-out cleaning was incredibly thorough - they even cleaned inside the oven and refrigerator. Professional and reliable.",
    date: "2024-01-08",
    verified: true,
    active: true,
  },
  {
    id: "david-k",
    name: "David K.",
    location: "Evansville, IN",
    service: "Office Cleaning",
    rating: 5,
    text: "Our office has never looked better! They work after hours so there's no disruption to our business. The team is trustworthy and does excellent work.",
    date: "2024-01-05",
    verified: true,
    active: true,
  },
  {
    id: "lisa-w",
    name: "Lisa W.",
    location: "Boonville, IN",
    service: "Specialty Cleaning",
    rating: 5,
    text: "They organized our entire kitchen and cleaned our refrigerator inside and out. It looks brand new! The natural products they use smell amazing too.",
    date: "2024-01-03",
    verified: true,
    active: true,
  },
  {
    id: "robert-h",
    name: "Robert H.",
    location: "Princeton, IN",
    service: "Deep Cleaning",
    rating: 5,
    text: "Veteran-owned business that really cares about quality. They went above and beyond our expectations. Will definitely use them again!",
    date: "2024-01-01",
    verified: true,
    active: true,
  },
]

export const galleryImages: GalleryImage[] = [
  {
    id: "kitchen-deep-clean",
    title: "Kitchen Deep Clean Transformation",
    beforeImage: "/gallery/kitchen-before.jpg",
    afterImage: "/gallery/kitchen-after.jpg",
    service: "Deep Cleaning",
    location: "Evansville, IN",
    description: "Complete kitchen deep clean including appliances, cabinets, and countertops",
    active: true,
  },
  {
    id: "bathroom-renovation-clean",
    title: "Post-Renovation Bathroom Cleaning",
    beforeImage: "/gallery/bathroom-before.jpg",
    afterImage: "/gallery/bathroom-after.jpg",
    service: "Move-In Cleaning",
    location: "Newburgh, IN",
    description: "Move-in cleaning after bathroom renovation with construction dust removal",
    active: true,
  },
  {
    id: "office-space-clean",
    title: "Commercial Office Deep Clean",
    beforeImage: "/gallery/office-before.jpg",
    afterImage: "/gallery/office-after.jpg",
    service: "Commercial Cleaning",
    location: "Henderson, KY",
    description: "Complete office cleaning including workstations, conference rooms, and common areas",
    active: true,
  },
]

export const settings: Settings = {
  phone: "(812) 610-1657",
  phoneE164: "+18126101657",
  email: "info@unclesamjunkremoval.com",
  squareBookingUrl: "https://square.site/book/PLACEHOLDER_BOOKING_URL",
  businessHours: {
    monday: "8:00 AM - 6:00 PM",
    tuesday: "8:00 AM - 6:00 PM",
    wednesday: "8:00 AM - 6:00 PM",
    thursday: "8:00 AM - 6:00 PM",
    friday: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  serviceAreas: ["Evansville, IN", "Newburgh, IN", "Henderson, KY", "Owensboro, KY", "Boonville, IN", "Princeton, IN"],
  socialMedia: {
    facebook: "https://facebook.com/unclesamjunkremoval",
    instagram: "https://instagram.com/unclesamjunkremoval",
    google: "https://g.page/unclesamjunkremoval",
  },
}

// Helper functions for CMS operations
export function getActiveServices(category?: "residential" | "commercial"): Service[] {
  return services.filter((service) => service.active && (!category || service.category === category))
}

export function getActiveFAQs(category?: string): FAQ[] {
  return faqs.filter((faq) => faq.active && (!category || faq.category === category))
}

export function getActiveLocations(): Location[] {
  return locations.filter((location) => location.active)
}

export function getActiveTestimonials(limit?: number): Testimonial[] {
  const active = testimonials.filter((testimonial) => testimonial.active && testimonial.verified)
  return limit ? active.slice(0, limit) : active
}

export function getActiveGalleryImages(limit?: number): GalleryImage[] {
  const active = galleryImages.filter((image) => image.active)
  return limit ? active.slice(0, limit) : active
}

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id && service.active)
}

export function getLocationById(id: string): Location | undefined {
  return locations.find((location) => location.id === id && location.active)
}
