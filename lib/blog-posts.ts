export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  featured?: boolean
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'evansville-junk-removal-tips',
    title: 'Essential Junk Removal Tips for Evansville Residents',
    excerpt:
      'Local expert tips for efficient, cost-effective junk removal in Evansville, IN. From preparation to disposal, make your cleanout a success.',
    author: 'Uncle Sam Team',
    date: 'January 28, 2025',
    readTime: '8 min read',
    category: 'Local Guide',
    featured: true,
  },
  {
    slug: 'spring-cleaning-checklist-southern-indiana',
    title: 'Ultimate Spring Cleaning Checklist for Southern Indiana Homes',
    excerpt:
      'Complete spring cleaning guide for Southern Indiana residents. Room-by-room checklist, eco-friendly tips, and professional cleaning services.',
    author: 'Sarah Johnson',
    date: 'March 1, 2024',
    readTime: '12 min read',
    category: 'Spring Cleaning',
    featured: true,
  },
  {
    slug: 'appliance-disposal-recycling-guide',
    title: 'Appliance Disposal & Recycling Guide for Evansville Residents',
    excerpt:
      'Learn how to properly dispose of old appliances in Evansville, IN. Recycling options, environmental benefits, and professional removal services.',
    author: 'Mike Thompson',
    date: 'November 20, 2024',
    readTime: '10 min read',
    category: 'Appliance Disposal',
  },
  {
    slug: 'junk-removal-cost-tri-state',
    title: 'How much does junk removal cost in the Tri-State? (full breakdown)',
    excerpt:
      'Complete pricing guide for junk removal services in Evansville, Henderson, and surrounding areas. Learn what factors affect cost and how to get the best value.',
    author: 'Uncle Sam Team',
    date: 'January 15, 2025',
    readTime: '8 min read',
    category: 'Pricing Guide',
  },
  {
    slug: 'estate-cleanout-guide',
    title: 'Estate cleanout guide: compassionate planning and donation options',
    excerpt:
      'A step-by-step guide to planning an estate cleanout with sensitivity, including donation and recycling strategies.',
    author: 'Uncle Sam Team',
    date: 'January 24, 2025',
    readTime: '9 min read',
    category: 'Estate Cleanouts',
  },
  {
    slug: 'mattress-disposal-evansville',
    title: 'Mattress disposal in Evansville: recycling, costs, and pickup options',
    excerpt:
      'What to do with an old mattress in Evansville. Recycling programs, professional pickup, and cost ranges to expect.',
    author: 'Uncle Sam Team',
    date: 'January 20, 2025',
    readTime: '6 min read',
    category: 'Mattress Removal',
  },
  {
    slug: 'shed-removal-guide-evansville',
    title: 'Shed removal in Evansville: permit tips, pricing, and timeline',
    excerpt:
      "From permits to pricing, here's how to plan a smooth shed removal in Evansville, including timeline expectations.",
    author: 'Uncle Sam Team',
    date: 'January 22, 2025',
    readTime: '7 min read',
    category: 'Light Demolition',
  },
  {
    slug: 'yard-waste-disposal-evansville',
    title: 'Yard waste disposal in Evansville: composting and pickup basics',
    excerpt:
      'Brush, leaves, and limbs: the simplest, most eco-friendly ways to handle yard waste in Evansville.',
    author: 'Uncle Sam Team',
    date: 'January 26, 2025',
    readTime: '6 min read',
    category: 'Yard Waste',
  },
  {
    slug: 'evansville-garage-cleanout-48-hours',
    title: 'Evansville garage cleanout in 48 hours: checklist & timeline',
    excerpt:
      'Step-by-step guide to completely clean out your garage in just 48 hours. Includes sorting strategies, disposal options, and organization tips.',
    author: 'Uncle Sam Team',
    date: 'January 12, 2025',
    readTime: '6 min read',
    category: 'How-To Guide',
  },
  {
    slug: 'hot-tub-removal-what-to-know',
    title: 'Hot tub removal: what to know before we arrive',
    excerpt:
      'Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options.',
    author: 'Uncle Sam Team',
    date: 'January 8, 2025',
    readTime: '5 min read',
    category: 'Service Guide',
  },
  {
    slug: 'property-manager-turnover-playbook',
    title: 'Property manager turnover playbook: trash-out to broom clean',
    excerpt:
      'Complete guide for property managers handling tenant turnovers. From initial assessment to final cleanup, streamline your process.',
    author: 'Uncle Sam Team',
    date: 'January 6, 2025',
    readTime: '10 min read',
    category: 'Property Management',
  },
  {
    slug: 'commercial-office-cleaning-guide-evansville',
    title: 'Commercial Office Cleaning in Evansville: Complete Business Guide',
    excerpt:
      'Comprehensive guide to commercial cleaning for Evansville businesses. Scheduling, costs, eco-friendly options, and maintaining a professional workplace.',
    author: 'Uncle Sam Team',
    date: 'October 27, 2025',
    readTime: '9 min read',
    category: 'Commercial Cleaning',
    featured: true,
  },
  {
    slug: 'summer-cleanup-checklist-tri-state',
    title: 'Summer Cleanup Checklist for Tri-State Homes & Yards',
    excerpt:
      'Beat the heat with this complete summer cleanup guide. Outdoor maintenance, garage organization, and preparing your property for fall.',
    author: 'Sarah Johnson',
    date: 'October 27, 2025',
    readTime: '8 min read',
    category: 'Seasonal Guide',
  },
  {
    slug: 'moving-cleanout-guide-evansville',
    title: 'Moving & Relocation Cleanout Guide for Evansville Residents',
    excerpt:
      'Complete moving cleanout checklist from decluttering to final walkthrough. Make your move easier with professional junk removal and cleaning services.',
    author: 'Uncle Sam Team',
    date: 'October 27, 2025',
    readTime: '10 min read',
    category: 'Moving Guide',
  },
  {
    slug: 'fall-cleanup-checklist-tri-state',
    title: 'Fall Cleanup Checklist for Tri-State Homeowners',
    excerpt:
      'Comprehensive guide to preparing your Tri-State home for fall and winter. From leaf removal to storm preparation, get your property ready for the cold months ahead.',
    author: 'Uncle Sam Team',
    date: 'September 15, 2024',
    readTime: '12 min read',
    category: 'Seasonal Tips',
    featured: true,
  },
  {
    slug: 'winter-storm-cleanup-guide-tri-state',
    title: 'Winter Storm Cleanup Guide for Tri-State Homeowners',
    excerpt:
      'Complete guide to winter storm preparation, cleanup, and recovery in the Tri-State area. From ice storm damage to snow removal, learn how to protect your property and respond to winter emergencies.',
    author: 'Uncle Sam Team',
    date: 'November 1, 2024',
    readTime: '13 min read',
    category: 'Emergency Services',
    featured: true,
  },
]

// Helper function to convert date string to Date object
export function parsePostDate(dateString: string): Date {
  return new Date(dateString)
}

// Get posts sorted by date (newest first)
export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => {
    return parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime()
  })
}
