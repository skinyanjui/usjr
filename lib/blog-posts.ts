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
    date: 'February 10, 2026',
    readTime: '8 min read',
    category: 'Local Guide',
    featured: true,
    image: '/images/blog/junk-removal-tips.png?v=unified',
  },
  {
    slug: 'spring-cleaning-checklist-southern-indiana',
    title: 'Ultimate Spring Cleaning Checklist for Southern Indiana Homes',
    excerpt:
      'Complete spring cleaning guide for Southern Indiana residents. Room-by-room checklist, eco-friendly tips, and professional cleaning services.',
    author: 'Sarah Johnson',
    date: 'February 14, 2026',
    readTime: '12 min read',
    category: 'Spring Cleaning',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'appliance-disposal-recycling-guide',
    title: 'Appliance Disposal & Recycling Guide for Evansville Residents',
    excerpt:
      'Learn how to properly dispose of old appliances in Evansville, IN. Recycling options, environmental benefits, and professional removal services.',
    author: 'Mike Thompson',
    date: 'January 20, 2026',
    readTime: '10 min read',
    category: 'Appliance Disposal',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'junk-removal-cost-tri-state',
    title: 'How much does junk removal cost in the Tri-State? (full breakdown)',
    excerpt:
      'Complete pricing guide for junk removal services in Evansville, Henderson, and surrounding areas. Learn what factors affect cost and how to get the best value.',
    author: 'Uncle Sam Team',
    date: 'February 3, 2026',
    readTime: '8 min read',
    category: 'Pricing Guide',
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'estate-cleanout-guide',
    title: 'Estate cleanout guide: compassionate planning and donation options',
    excerpt:
      'A step-by-step guide to planning an estate cleanout with sensitivity, including donation and recycling strategies.',
    author: 'Uncle Sam Team',
    date: 'January 28, 2026',
    readTime: '9 min read',
    category: 'Estate Cleanouts',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop',
  },
  {
    slug: 'mattress-disposal-evansville',
    title: 'Mattress disposal in Evansville: recycling, costs, and pickup options',
    excerpt:
      'What to do with an old mattress in Evansville. Recycling programs, professional pickup, and cost ranges to expect.',
    author: 'Uncle Sam Team',
    date: 'January 15, 2026',
    readTime: '6 min read',
    category: 'Mattress Removal',
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'shed-removal-guide-evansville',
    title: 'Shed removal in Evansville: permit tips, pricing, and timeline',
    excerpt:
      "From permits to pricing, here's how to plan a smooth shed removal in Evansville, including timeline expectations.",
    author: 'Uncle Sam Team',
    date: 'February 5, 2026',
    readTime: '7 min read',
    category: 'Light Demolition',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop',
  },
  {
    slug: 'yard-waste-disposal-evansville',
    title: 'Yard waste disposal in Evansville: composting and pickup basics',
    excerpt:
      'Brush, leaves, and limbs: the simplest, most eco-friendly ways to handle yard waste in Evansville.',
    author: 'Uncle Sam Team',
    date: 'February 12, 2026',
    readTime: '6 min read',
    category: 'Yard Waste',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'evansville-garage-cleanout-48-hours',
    title: 'Evansville garage cleanout in 48 hours: checklist & timeline',
    excerpt:
      'Step-by-step guide to completely clean out your garage in just 48 hours. Includes sorting strategies, disposal options, and organization tips.',
    author: 'Uncle Sam Team',
    date: 'January 22, 2026',
    readTime: '6 min read',
    category: 'How-To Guide',
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'hot-tub-removal-what-to-know',
    title: 'Hot tub removal: what to know before we arrive',
    excerpt:
      'Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options.',
    author: 'Uncle Sam Team',
    date: 'January 10, 2026',
    readTime: '5 min read',
    category: 'Service Guide',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'property-manager-turnover-playbook',
    title: 'Property manager turnover playbook: trash-out to broom clean',
    excerpt:
      'Complete guide for property managers handling tenant turnovers. From initial assessment to final cleanup, streamline your process.',
    author: 'Uncle Sam Team',
    date: 'January 8, 2026',
    readTime: '10 min read',
    category: 'Property Management',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
  },
  {
    slug: 'commercial-office-cleaning-guide-evansville',
    title: 'Commercial Office Cleaning in Evansville: Complete Business Guide',
    excerpt:
      'Comprehensive guide to commercial cleaning for Evansville businesses. Scheduling, costs, eco-friendly options, and maintaining a professional workplace.',
    author: 'Uncle Sam Team',
    date: 'February 17, 2026',
    readTime: '9 min read',
    category: 'Commercial Cleaning',
    featured: true,
    image: '/images/blog/office-cleaning.png?v=unified',
  },
  {
    slug: 'summer-cleanup-checklist-tri-state',
    title: 'Summer Cleanup Checklist for Tri-State Homes & Yards',
    excerpt:
      'Beat the heat with this complete summer cleanup guide. Outdoor maintenance, garage organization, and preparing your property for fall.',
    author: 'Sarah Johnson',
    date: 'June 15, 2025',
    readTime: '8 min read',
    category: 'Seasonal Guide',
    image: '/images/blog/summer-cleanup.png?v=unified',
  },
  {
    slug: 'moving-cleanout-guide-evansville',
    title: 'Moving & Relocation Cleanout Guide for Evansville Residents',
    excerpt:
      'Complete moving cleanout checklist from decluttering to final walkthrough. Make your move easier with professional junk removal and cleaning services.',
    author: 'Uncle Sam Team',
    date: 'February 6, 2026',
    readTime: '10 min read',
    category: 'Moving Guide',
    image: '/images/blog/moving-cleanout.png?v=unified',
  },
  {
    slug: 'fall-cleanup-checklist-tri-state',
    title: 'Fall Cleanup Checklist for Tri-State Homeowners',
    excerpt:
      'Comprehensive guide to preparing your Tri-State home for fall and winter. From leaf removal to storm preparation, get your property ready for the cold months ahead.',
    author: 'Uncle Sam Team',
    date: 'September 10, 2025',
    readTime: '12 min read',
    category: 'Seasonal Tips',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop',
  },
  {
    slug: 'winter-storm-cleanup-guide-tri-state',
    title: 'Winter Storm Cleanup Guide for Tri-State Homeowners',
    excerpt:
      'Complete guide to winter storm preparation, cleanup, and recovery in the Tri-State area. From ice storm damage to snow removal, learn how to protect your property and respond to winter emergencies.',
    author: 'Uncle Sam Team',
    date: 'November 15, 2025',
    readTime: '13 min read',
    category: 'Emergency Services',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=2070&auto=format&fit=crop',
  },
]

// Helper function to convert date string to Date object
export function parsePostDate(dateString: string): Date {
  return new Date(dateString)
}

// Pre-sort posts once at module level
const sortedPosts = blogPosts
  .map((post) => ({ post, time: parsePostDate(post.date).getTime() }))
  .sort((a, b) => b.time - a.time)
  .map((item) => item.post)

// Get posts sorted by date (newest first)
export function getSortedPosts(): BlogPost[] {
  return sortedPosts
}
