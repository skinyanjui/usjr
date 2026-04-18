import { UNIFORM_OFFERS, PRICING_LANGUAGE } from '@/lib/uniform-offers'

export interface ServicePageConfig {
  slug: string
  serviceInfo: {
    serviceName: string
    category: string
    price: string
    benefits: string[]
  }
  title: string
  description: string
  badges?: string[]
  serviceCategory?: string
  features: Array<{ iconName: string; title: string; description: string }>
  steps: Array<{ iconName: string; title: string; description: string }>
  pricing: Array<{ name: string; price: string; description?: string }>
  faqs: Array<{ question: string; answer: string }>
  relatedContent?: Array<{
    title: string
    href: string
    description: string
    type: 'service' | 'blog' | 'location'
    category?: string
  }>
  showReviewMention?: boolean
}

export const servicesData: Record<string, ServicePageConfig> = {
  'estate-cleanouts': {
    slug: 'estate-cleanouts',
    serviceInfo: {
      serviceName: 'Estate Cleanout Services',
      category: 'Estate Cleanouts',
      price: 'From $389-1,899',
      benefits: [
        'Compassionate service',
        'Licensed & insured',
        'Donation coordination',
        'Complete cleanout',
      ],
    },
    title: 'Estate Cleanouts in Evansville',
    description:
      'Compassionate estate cleanouts, house cleanouts, and property cleanout services for families during difficult times. Whether you need to clean out an inherited home, clear a deceased property, or handle a complete family home cleanout, we provide respectful and thorough service.',
    badges: ['Compassionate Service', 'Complete Cleanout', 'Donation Coordination'],
    features: [
      {
        iconName: 'Heart',
        title: 'Sensitive Approach',
        description: 'Understanding and respectful handling during difficult times',
      },
      {
        iconName: 'Home',
        title: 'Complete Service',
        description: 'Full house cleanouts from attic to basement',
      },
      {
        iconName: 'Gift',
        title: 'Value Recovery',
        description: 'Help identify valuables and coordinate donations',
      },
      {
        iconName: 'Users',
        title: 'Compassionate Service',
        description: 'Trained team sensitive to family emotions',
      },
    ],
    steps: [
      {
        iconName: 'Heart',
        title: 'Compassionate Consultation',
        description:
          'We meet with family to understand needs and provide sensitive, respectful service.',
      },
      {
        iconName: 'Gift',
        title: 'Careful Sorting',
        description: 'Methodical sorting to identify valuables, donations, and items for disposal.',
      },
      {
        iconName: 'Home',
        title: 'Complete Cleanout',
        description: 'Full property cleanout with careful handling of all belongings and memories.',
      },
      {
        iconName: 'Users',
        title: 'Thoughtful Disposition',
        description: 'Maximize donations, recycling, and ensure respectful handling of all items.',
      },
    ],
    pricing: [
      { name: 'Small Home', price: 'From $649-899', description: '1-2 bedrooms' },
      { name: 'Medium Home', price: 'From $899-1,299', description: '3-4 bedrooms' },
      { name: 'Large Home', price: 'From $1,299-1,899', description: '4+ bedrooms' },
      { name: 'Partial Cleanout', price: 'From $389-649', description: 'Selective rooms' },
    ],
    faqs: [
      {
        question: 'How do you handle sensitive family situations during estate cleanouts?',
        answer:
          'We approach every estate cleanout with compassion and respect. Our team is trained to be sensitive to family emotions and work at your pace, allowing time for decision-making about important items.',
      },
      {
        question: 'How much do house cleanouts and estate cleanup services cost in Evansville?',
        answer:
          'Estate cleanouts and property cleanout services typically cost $649-1,899 depending on home size and contents. House cleanouts for inherited properties follow similar pricing. We provide detailed estimates and work with executors and families to find solutions that fit budgets and timelines.',
      },
      {
        question: 'Can you help identify valuable items during the cleanout?',
        answer:
          'Yes, our experienced team can help identify potentially valuable items including antiques, collectibles, and jewelry. We recommend professional appraisals for high-value items and can coordinate with local appraisers.',
      },
      {
        question: 'Do you coordinate with estate sale companies?',
        answer:
          'Absolutely. We work with local estate sale companies and can coordinate timing to maximize value recovery. We can also handle post-sale cleanup and removal of remaining items.',
      },
      {
        question: 'How long does a complete estate cleanout take?',
        answer:
          'Estate cleanouts typically take 1-3 days depending on home size and contents. We work efficiently while being thorough and respectful, and can adjust our timeline to meet family needs.',
      },
    ],
    showReviewMention: false,
  },
  'garage-cleanout': {
    slug: 'garage-cleanout',
    serviceInfo: {
      serviceName: 'Garage Cleanout Services',
      category: 'Garage Cleanout',
      price: 'From $179-649',
      benefits: [
        'Same-day service',
        'Licensed & insured',
        'Donation coordination',
        'Complete cleanup',
      ],
    },
    title: 'Garage Cleanout in Evansville',
    description: 'Complete garage cleanout services with sorting, removal, and organization',
    badges: ['Same-Day Service', 'Complete Cleanout', 'Donation Coordination'],
    features: [
      {
        iconName: 'Warehouse',
        title: 'Complete Cleanout',
        description: 'Remove everything from boxes to large equipment and vehicles',
      },
      {
        iconName: 'SortAsc',
        title: 'Sorting Assistance',
        description: 'Help organize items into keep, donate, recycle, and dispose',
      },
      {
        iconName: 'Gift',
        title: 'Donation Coordination',
        description: 'Partner with local charities for usable items',
      },
      {
        iconName: 'Clock',
        title: 'Same-Day Service Available',
        description: 'Quick response for urgent cleanouts',
      },
    ],
    steps: [
      {
        iconName: 'Warehouse',
        title: 'Free Assessment',
        description: 'We evaluate your garage and provide upfront pricing for complete cleanout.',
      },
      {
        iconName: 'SortAsc',
        title: 'Sort & Organize',
        description: 'We help sort items into keep, donate, recycle, and dispose categories.',
      },
      {
        iconName: 'Clock',
        title: 'Complete Removal',
        description: 'Remove all unwanted items and debris, leaving your garage clean.',
      },
      {
        iconName: 'Gift',
        title: 'Responsible Disposal',
        description: 'Donate usable items, recycle materials, and properly dispose of waste.',
      },
    ],
    pricing: [
      {
        name: 'Single Car Garage',
        price: 'From $289-389',
        description: 'Standard single garage',
      },
      { name: 'Two Car Garage', price: 'From $389-549', description: 'Most common size' },
      { name: 'Large/Workshop Garage', price: 'From $549-649', description: 'Oversized garages' },
      { name: 'Partial Cleanout', price: 'From $179-289', description: 'Selective removal' },
    ],
    faqs: [
      {
        question: 'Do I need to sort through items before you arrive?',
        answer:
          "No, we can help you sort through items on-site. We'll work with you to identify what to keep, donate, recycle, or dispose of during the cleanout process.",
      },
      {
        question: 'How much does a garage cleanout cost in Evansville?',
        answer:
          'Garage cleanouts typically cost from $289-649 depending on the amount of items and garage size. Single-car garages start from $289, while large two-car garages can cost up to $649.',
      },
      {
        question: 'Can you remove hazardous materials from garages?',
        answer:
          "We can remove most garage items, but hazardous materials like paint, chemicals, and automotive fluids require special handling. We'll direct you to proper disposal facilities for these items.",
      },
      {
        question: 'What happens to items that are still good?',
        answer:
          'We donate usable items to local charities, recycle metals and electronics, and only dispose of items that cannot be reused or recycled. We maximize the value of your unwanted items.',
      },
      {
        question: 'How long does a garage cleanout take?',
        answer:
          'Most garage cleanouts take 2-6 hours depending on the amount of items and level of organization needed. We work efficiently while being thorough.',
      },
    ],
    showReviewMention: false,
  },
  'hot-tub-removal': {
    slug: 'hot-tub-removal',
    serviceInfo: {
      serviceName: 'Hot Tub Removal Services',
      category: 'Hot Tub Removal',
      price: 'From $389-649',
      benefits: [
        'Same-day service',
        'Safe disconnection',
        'Licensed & insured',
        'Eco-friendly disposal',
      ],
    },
    title: 'Hot Tub Removal in Evansville',
    description:
      'Professional hot tub removal, spa removal, and jacuzzi disposal with safe disconnection and eco-friendly disposal. Whether you need to get rid of an old hot tub, remove a broken spa, or dispose of a jacuzzi, we handle it all with specialized equipment.',
    badges: ['Same-Day Service', 'Safe Disconnection', 'Eco-Friendly'],
    features: [
      {
        iconName: 'Zap',
        title: 'Safe Electrical Disconnection',
        description: 'Licensed professionals handle all electrical disconnections safely',
      },
      {
        iconName: 'Wrench',
        title: 'Specialized Equipment',
        description: 'Professional tools for challenging removals and tight spaces',
      },
      {
        iconName: 'Recycle',
        title: 'Eco-Friendly Disposal',
        description: 'Maximum recycling of components and responsible disposal',
      },
      {
        iconName: 'Clock',
        title: 'Same-Day Service Available',
        description: 'Quick response for urgent removals',
      },
    ],
    steps: [
      {
        iconName: 'Clock',
        title: 'Schedule Assessment',
        description:
          "Call or text photos for instant quote. We'll assess access and disconnection needs.",
      },
      {
        iconName: 'Zap',
        title: 'Pre-Removal Inspection',
        description: 'Our team inspects electrical connections and access routes for safe removal.',
      },
      {
        iconName: 'Wrench',
        title: 'Safe Disconnection & Removal',
        description: 'Professional disconnection of electrical and plumbing, then careful removal.',
      },
      {
        iconName: 'Recycle',
        title: 'Eco-Friendly Disposal',
        description: 'We recycle components and dispose of materials at certified facilities.',
      },
    ],
    pricing: [
      { name: 'Standard Hot Tub', price: 'From $389-489', description: '6-8 person hot tubs' },
      { name: 'Large Hot Tub', price: 'From $489-649', description: '8+ person hot tubs' },
      { name: 'Swim Spa', price: 'From $649-899', description: 'Large swim spas' },
      { name: 'Difficult Access', price: '+$100-200', description: 'Additional surcharge' },
    ],
    faqs: [
      {
        question: 'Do you disconnect electrical and plumbing connections?',
        answer:
          'Yes, our team includes licensed professionals who can safely disconnect electrical connections. For complex plumbing, we recommend having a plumber disconnect water lines before our arrival.',
      },
      {
        question: 'How much does hot tub disposal and spa removal cost in Evansville?',
        answer:
          'Hot tub removal typically costs from $389-649 depending on size, access difficulty, and disconnection needs. Spa removal and jacuzzi disposal follow similar pricing. We provide upfront pricing with no hidden fees for all hot tub haul away services.',
      },
      {
        question: 'Can you remove hot tubs from tight spaces or decks?',
        answer:
          'Yes, we specialize in challenging removals including second-story decks, tight side yards, and indoor installations. We have specialized equipment for difficult access situations.',
      },
      {
        question: 'What happens to my old hot tub after removal?',
        answer:
          'We recycle all possible components including metals, plastics, and electronics. The shell and non-recyclable parts are disposed of at certified waste facilities following EPA guidelines.',
      },
      {
        question: 'How long does hot tub removal take?',
        answer:
          'Most hot tub removals take 2-4 hours including disconnection and removal. Complex installations or difficult access may require additional time.',
      },
    ],
    showReviewMention: false,
  },
  'mattress-removal': {
    slug: 'mattress-removal',
    serviceInfo: {
      serviceName: 'Mattress Removal Services',
      category: 'Mattress Removal',
      price: 'From $89-229',
      benefits: [
        'Same-day service',
        'Licensed & insured',
        'Eco-friendly disposal',
        'No hidden fees',
      ],
    },
    title: 'Mattress Removal Services in Evansville',
    description:
      'Fast, reliable mattress removal, bed disposal, and old mattress pickup throughout Southern Indiana. Whether you need to get rid of an old mattress, dispose of box springs, or remove an entire bedroom set, we provide same-day service with upfront pricing and eco-friendly disposal methods.',
    badges: [
      UNIFORM_OFFERS.SAME_DAY_SERVICE,
      UNIFORM_OFFERS.LICENSED_INSURED,
      UNIFORM_OFFERS.ECO_FRIENDLY,
    ],
    serviceCategory: 'Mattress Removal Service',
    features: [
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.LICENSED_INSURED,
        description: 'Fully licensed and insured for your protection',
      },
      {
        iconName: 'Calendar',
        title: UNIFORM_OFFERS.SAME_DAY_SERVICE,
        description: 'Call or text for same-day pickup',
      },
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.ECO_FRIENDLY,
        description: 'Materials are recycled or donated when possible',
      },
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.UPFRONT_PRICING,
        description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
      },
    ],
    steps: [
      {
        iconName: 'Phone',
        title: 'Schedule',
        description:
          'Call us or text photos for a free estimate. We offer same-day and next-day appointments throughout Evansville.',
      },
      {
        iconName: 'Truck',
        title: 'We Arrive',
        description:
          'Our professional team arrives on time, provides upfront pricing, and handles all the heavy lifting from any location in your home.',
      },
      {
        iconName: 'CheckCircle',
        title: 'We Remove & Recycle',
        description:
          'We remove your mattress, box spring, and bed frame, then dispose of everything responsibly through recycling and proper facilities.',
      },
    ],
    pricing: [
      {
        name: 'Single Mattress',
        price: 'From $89-129',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM,
      },
      {
        name: 'Mattress + Box Spring',
        price: 'From $119-179',
        description: 'Great for bedroom updates',
      },
      {
        name: 'Full Bedroom Set',
        price: 'From $149-229',
        description: 'Complete bed removal service',
      },
    ],
    faqs: [
      {
        question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for mattress removal?`,
        answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas, subject to availability.`,
      },
      {
        question: 'Do you remove mattresses from upstairs bedrooms?',
        answer:
          'Yes, we remove mattresses from any location including upstairs bedrooms, basements, and tight spaces. Our team handles all the heavy lifting and navigation.',
      },
      {
        question: 'How do you price mattress removal services?',
        answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
      },
      {
        question: 'Can you remove stained or damaged mattresses?',
        answer:
          'Yes, we remove mattresses in any condition including stained, torn, or water-damaged. We follow proper sanitation protocols and disposal methods for all mattresses.',
      },
      {
        question: 'What happens to my old mattress after removal?',
        answer:
          'We partner with local recycling facilities to break down mattresses into component materials. Springs, foam, and fabric are recycled when possible. Unusable materials go to certified disposal facilities.',
      },
    ],
    relatedContent: [
      {
        title: 'Mattress Disposal Guide',
        href: '/blog/mattress-disposal-evansville',
        description:
          'Complete guide to mattress disposal in Evansville. Learn about recycling options and disposal regulations.',
        type: 'blog' as const,
        category: 'Local Guide',
      },
      {
        title: 'Junk Removal Services',
        href: '/services/junk-removal',
        description:
          'Full-service junk removal for all household items including furniture, appliances, and more.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Appliance Removal',
        href: '/services/appliance-removal',
        description:
          'Professional appliance removal service for refrigerators, washers, dryers, and other large appliances.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Estate Cleanouts',
        href: '/services/estate-cleanouts',
        description:
          'Comprehensive estate cleanout services for inherited properties and downsizing projects.',
        type: 'service' as const,
        category: 'Related Service',
      },
    ],
    showReviewMention: true,
  },
  'holiday-tree-removal': {
    slug: 'holiday-tree-removal',
    serviceInfo: {
      serviceName: 'Holiday Tree Removal Services',
      category: 'Holiday Tree Removal',
      price: 'From $49-149',
      benefits: [
        'Same-day service',
        'Christmas tree removal',
        'Eco-friendly disposal',
        'Seasonal scheduling',
      ],
    },
    title: 'Holiday Tree Removal in Evansville',
    description: 'Convenient Christmas tree removal and seasonal landscaping cleanup services',
    badges: ['Seasonal Service', 'Eco-Friendly Disposal', 'Christmas Specialists'],
    serviceCategory: 'Seasonal Services',
    features: [
      {
        iconName: 'TreePine',
        title: 'Christmas Tree Removal',
        description: 'Quick and easy removal of Christmas trees from your home',
      },
      {
        iconName: 'Calendar',
        title: 'Seasonal Scheduling',
        description: 'Convenient scheduling during peak holiday seasons and post-holiday cleanup',
      },
      {
        iconName: 'Leaf',
        title: 'Landscaping Cleanup',
        description: 'Seasonal yard cleanup and landscaping debris removal',
      },
      {
        iconName: 'Recycle',
        title: 'Eco-Friendly Disposal',
        description: 'Trees are chipped for mulch or composted, not sent to landfills',
      },
    ],
    steps: [
      {
        iconName: 'Calendar',
        title: 'Easy Scheduling',
        description: 'Schedule your tree removal during peak holiday season.',
      },
      {
        iconName: 'TreePine',
        title: 'Safe Tree Removal',
        description: 'Careful removal of Christmas trees from any location in your home.',
      },
      {
        iconName: 'Leaf',
        title: 'Complete Cleanup',
        description: 'Clean up all fallen needles and holiday debris.',
      },
      {
        iconName: 'Recycle',
        title: 'Eco-Friendly Disposal',
        description: 'Trees are chipped for mulch or composted, never sent to landfills.',
      },
    ],
    pricing: [
      {
        name: 'Single Christmas Tree',
        price: 'From $49-79',
        description: 'Standard size Christmas trees',
      },
      {
        name: 'Large Tree + Cleanup',
        price: 'From $79-119',
        description: 'Large trees with needle cleanup',
      },
      {
        name: 'Multiple Trees/Seasonal',
        price: 'From $119-149',
        description: 'Multiple trees or seasonal cleanup',
      },
    ],
    faqs: [
      {
        question: 'When is the best time to schedule Christmas tree removal?',
        answer:
          "We're busiest the week after Christmas through mid-January. For best availability, schedule your tree removal before January 2nd or be flexible with scheduling during peak season.",
      },
      {
        question: 'Do you clean up the needles?',
        answer:
          'Yes, our standard tree removal includes cleaning up fallen needles around the tree area. We bring the necessary equipment to ensure your home is left clean.',
      },
      {
        question: 'What happens to the Christmas trees?',
        answer:
          "All trees are recycled responsibly. They're typically chipped for mulch or composted. We never send Christmas trees to landfills - they're 100% biodegradable and recyclable.",
      },
      {
        question: 'Can you remove trees from upper floors?',
        answer:
          'Yes, we can safely remove trees from second floors, apartments, and condos. Our team has experience navigating stairs and tight spaces.',
      },
    ],
    relatedContent: [],
    showReviewMention: false,
  },
  'light-demolition': {
    slug: 'light-demolition',
    serviceInfo: {
      serviceName: 'Light Demolition Services',
      category: 'Light Demolition',
      price: 'From $389-899',
      benefits: [
        'Same-day service',
        'OSHA safety compliant',
        'Selective demolition',
        'Complete cleanup',
      ],
    },
    title: 'Light Demolition Services in Evansville',
    description:
      'Professional light demolition services including interior demo, deck removal, fence removal, and selective demolition throughout Southern Indiana. Safety-first approach with complete debris removal and site cleanup.',
    badges: [
      UNIFORM_OFFERS.SAME_DAY_SERVICE,
      'OSHA safety compliant',
      UNIFORM_OFFERS.LICENSED_INSURED,
    ],
    serviceCategory: 'Light Demolition Service',
    features: [
      {
        iconName: 'CheckCircle',
        title: 'Interior Demolition',
        description: 'Walls, flooring, cabinets, bathroom and kitchen demo',
      },
      {
        iconName: 'CheckCircle',
        title: 'Exterior Structures',
        description: 'Decks, fences, small sheds, and outbuildings',
      },
      {
        iconName: 'CheckCircle',
        title: 'Selective Demolition',
        description: 'Careful removal while preserving elements you want to keep',
      },
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.UPFRONT_PRICING,
        description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
      },
    ],
    steps: [
      {
        iconName: 'Phone',
        title: 'Project Assessment',
        description:
          'We evaluate your project and provide detailed pricing and timeline estimates with same-day service available.',
      },
      {
        iconName: 'Camera',
        title: 'Safety Preparation',
        description:
          'Secure area, disconnect utilities safely, and set up proper safety measures following OSHA standards.',
      },
      {
        iconName: 'Truck',
        title: 'Careful Demolition',
        description:
          'Systematic demolition using proper tools and techniques with selective preservation of elements you want to keep.',
      },
      {
        iconName: 'Recycle',
        title: 'Complete Cleanup',
        description:
          'Remove all debris, recycle materials when possible, and leave the area clean and ready for your next project.',
      },
    ],
    pricing: [
      {
        name: 'Interior Room Demo',
        price: 'From $389-549',
        description: 'Perfect for bathroom/kitchen renovations',
      },
      {
        name: 'Deck Removal',
        price: 'From $289-649',
        description: 'Complete deck demolition and removal',
      },
      {
        name: 'Fence Removal',
        price: 'From $289-489',
        description: 'Fence and gate removal service',
      },
      {
        name: 'Kitchen/Bath Demo',
        price: 'From $549-899',
        description: 'Complete fixture and cabinet removal',
      },
      {
        name: 'Flooring Removal',
        price: 'From $3-8/sq ft',
        description: 'All flooring types and disposal',
      },
    ],
    faqs: [
      {
        question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for light demolition?`,
        answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} assessment and can often begin demolition projects the same day, subject to availability and project complexity.`,
      },
      {
        question: 'What types of light demolition do you handle?',
        answer:
          "We handle interior walls, decks, fences, small outbuildings, bathroom/kitchen demo, flooring removal, and similar projects. We don't handle structural or load-bearing demolition.",
      },
      {
        question: 'How do you price light demolition services?',
        answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. All prices include demolition, debris removal, and site cleanup. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
      },
      {
        question: 'Do you handle permits for demolition projects?',
        answer:
          "We can advise on permit requirements, but permits are typically the homeowner's responsibility. We ensure all work meets local building codes and safety standards.",
      },
      {
        question: 'What safety measures do you take during demolition?',
        answer:
          'We follow OSHA safety standards, use proper protective equipment, secure work areas, disconnect utilities safely, and ensure proper dust and debris containment.',
      },
    ],
    relatedContent: [
      {
        title: 'Junk Removal Services',
        href: '/services/junk-removal',
        description:
          'Full-service junk removal for all household items including furniture, appliances, and more.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Shed Removal',
        href: '/services/shed-removal',
        description: 'Complete demolition, removal, and cleanup for sheds and outbuildings.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Yard Waste Removal',
        href: '/services/yard-waste-removal',
        description:
          'Fast, reliable yard waste removal and landscaping debris removal with eco-friendly composting.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Estate Cleanouts',
        href: '/services/estate-cleanouts',
        description:
          'Comprehensive estate cleanout services for inherited properties and downsizing projects.',
        type: 'service' as const,
        category: 'Related Service',
      },
    ],
    showReviewMention: true,
  },
  'office-cleanouts': {
    slug: 'office-cleanouts',
    serviceInfo: {
      serviceName: 'Office Cleanout Services',
      category: 'Office Cleanout',
      price: 'From $199-899',
      benefits: [
        'Same-day service',
        'Licensed & insured',
        'IT equipment handling',
        'Document disposal',
      ],
    },
    title: 'Office Cleanouts in Evansville',
    description:
      'Professional office cleanout services for cubicles, desks, IT equipment, and complete office relocations',
    badges: ['Same-Day Service', 'IT Equipment Handling', 'Secure Document Disposal'],
    serviceCategory: 'Commercial Cleanout Services',
    features: [
      {
        iconName: 'Building',
        title: 'Complete Office Cleanouts',
        description: 'Remove cubicles, desks, chairs, filing cabinets, and all office furniture',
      },
      {
        iconName: 'Monitor',
        title: 'IT Equipment Removal',
        description: 'Safe handling and disposal of computers, servers, printers, and electronics',
      },
      {
        iconName: 'FileText',
        title: 'Secure Document Disposal',
        description: 'Confidential document destruction and secure paper disposal services',
      },
      {
        iconName: 'Clock',
        title: 'Flexible Scheduling',
        description: 'Work around your business hours including evenings and weekends',
      },
    ],
    steps: [
      {
        iconName: 'Building',
        title: 'Office Assessment',
        description: 'We evaluate the office space and coordinate with building management.',
      },
      {
        iconName: 'Monitor',
        title: 'IT Equipment Handling',
        description: 'Safe removal of computers, servers, and electronic equipment.',
      },
      {
        iconName: 'FileText',
        title: 'Document Security',
        description: 'Coordinate secure disposal of confidential documents.',
      },
      {
        iconName: 'Clock',
        title: 'Complete Cleanout',
        description: 'Remove all furniture and equipment according to schedule.',
      },
    ],
    pricing: [
      {
        name: 'Small Office (1-5 desks)',
        price: 'From $199-399',
        description: 'Small offices and suites',
      },
      {
        name: 'Medium Office (6-20 desks)',
        price: 'From $399-699',
        description: 'Mid-size office spaces',
      },
      {
        name: 'Large Office (20+ desks)',
        price: 'From $699-899',
        description: 'Large office complexes',
      },
    ],
    faqs: [
      {
        question: 'Can you handle sensitive IT equipment?',
        answer:
          'Yes, we have experience with IT equipment removal including computers, servers, and networking equipment. We can coordinate with your IT department for data security and proper equipment handling.',
      },
      {
        question: 'Do you provide secure document destruction?',
        answer:
          'We can coordinate secure document disposal services. For highly sensitive documents, we recommend working with certified document destruction services, which we can help arrange.',
      },
      {
        question: 'Can you work outside business hours?',
        answer:
          "Absolutely. We understand business operations can't be interrupted. We frequently work evenings, weekends, and holidays to accommodate office cleanouts without disrupting business.",
      },
      {
        question: 'What happens to office furniture?',
        answer:
          "We work to donate usable office furniture to local non-profits, schools, and charities. Items that can't be donated are recycled or disposed of responsibly.",
      },
    ],
    relatedContent: [],
    showReviewMention: false,
  },
  'shed-removal': {
    slug: 'shed-removal',
    serviceInfo: {
      serviceName: 'Shed Removal Services',
      category: 'Shed Removal',
      price: 'From $289-649',
      benefits: ['Same-day service', 'Licensed & insured', 'Complete demolition', 'Site cleanup'],
    },
    title: 'Shed Removal Services in Evansville',
    description:
      'Professional shed and outbuilding removal, demolition, and cleanup throughout Southern Indiana. Whether you need to remove a small storage shed, large barn, or any outbuilding, we provide complete demolition service with debris removal and site cleanup.',
    badges: [
      UNIFORM_OFFERS.SAME_DAY_SERVICE,
      UNIFORM_OFFERS.LICENSED_INSURED,
      'Complete Demolition',
    ],
    serviceCategory: 'Shed Removal Service',
    features: [
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.LICENSED_INSURED,
        description: 'Fully licensed and insured for your protection',
      },
      {
        iconName: 'Calendar',
        title: UNIFORM_OFFERS.SAME_DAY_SERVICE,
        description: 'Free assessment and quick scheduling',
      },
      {
        iconName: 'HardHat',
        title: 'Safe Demolition',
        description: 'Systematic dismantling from roof to foundation with proper safety measures',
      },
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.UPFRONT_PRICING,
        description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
      },
    ],
    steps: [
      {
        iconName: 'Phone',
        title: 'Free Assessment',
        description:
          'We evaluate shed size, materials, and access for accurate pricing and timeline estimates.',
      },
      {
        iconName: 'HardHat',
        title: 'Preparation & Safety',
        description:
          'Clear contents, disconnect utilities if needed, and set up safety perimeter for demolition work.',
      },
      {
        iconName: 'Truck',
        title: 'Careful Demolition',
        description:
          'Systematic dismantling from roof to foundation using proper tools and safety techniques with complete debris removal.',
      },
    ],
    pricing: [
      {
        name: 'Small Shed (up to 8x10)',
        price: 'From $289-389',
        description: 'Perfect for storage sheds',
      },
      {
        name: 'Medium Shed (10x12)',
        price: 'From $389-549',
        description: 'Great for garden sheds',
      },
      {
        name: 'Large Shed / Barn',
        price: 'From $549-649',
        description: 'Complete outbuilding removal',
      },
    ],
    faqs: [
      {
        question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for shed removal?`,
        answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} assessment and can often begin demolition the same day, subject to availability and project size.`,
      },
      {
        question: 'Do I need to empty my shed before removal?',
        answer:
          'Yes, please remove all contents before our arrival. We can provide junk removal for shed contents at an additional cost if needed.',
      },
      {
        question: 'How do you price shed removal services?',
        answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
      },
      {
        question: 'Can you remove sheds with concrete foundations?',
        answer:
          'Yes, we can remove concrete pads and foundations. This requires additional equipment and time, typically adding $200-400 depending on size.',
      },
      {
        question: 'What materials can you recycle from shed demolition?',
        answer:
          'We recycle metal roofing, siding, hardware, and lumber when possible. Asphalt shingles and treated lumber are disposed of at certified facilities.',
      },
    ],
    relatedContent: [
      {
        title: 'Shed Removal Guide',
        href: '/blog/shed-removal-guide-evansville',
        description:
          'Complete guide to shed removal in Evansville. Learn about permits, preparation, and disposal options.',
        type: 'blog' as const,
        category: 'Local Guide',
      },
      {
        title: 'Light Demolition',
        href: '/services/light-demolition',
        description: 'Interior demo, deck and fence removal with safety-first approach.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Junk Removal Services',
        href: '/services/junk-removal',
        description:
          'Full-service junk removal for all household items including furniture, appliances, and more.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Yard Waste Removal',
        href: '/services/yard-waste-removal',
        description:
          'Fast, reliable yard waste removal and landscaping debris removal with eco-friendly composting.',
        type: 'service' as const,
        category: 'Related Service',
      },
    ],
    showReviewMention: true,
  },
  'property-management-turnovers': {
    slug: 'property-management-turnovers',
    serviceInfo: {
      serviceName: 'Property Management Turnovers',
      category: 'Property Management Turnovers',
      price: 'From $199-799',
      benefits: [
        'Same-day service',
        'Property management coordination',
        'Complete unit clearing',
        'Fast turnaround',
      ],
    },
    title: 'Property Management Turnovers in Evansville',
    description:
      'Fast, reliable cleanout services for apartments, evictions, foreclosures, and rental property turnovers',
    badges: ['Property Manager Preferred', 'Fast Turnaround', 'Eviction Specialists'],
    serviceCategory: 'Property Management Services',
    features: [
      {
        iconName: 'Home',
        title: 'Complete Unit Cleanouts',
        description: 'Remove all contents from apartments, condos, and rental properties',
      },
      {
        iconName: 'Key',
        title: 'Property Management Coordination',
        description: 'Work directly with property managers for efficient unit turnovers',
      },
      {
        iconName: 'Users',
        title: 'Eviction & Foreclosure Services',
        description: 'Sensitive handling of eviction and foreclosure cleanout situations',
      },
      {
        iconName: 'Clock',
        title: 'Rapid Response',
        description: 'Quick service to minimize vacancy time between tenants',
      },
    ],
    steps: [
      {
        iconName: 'Key',
        title: 'Property Coordination',
        description: 'Work with property managers to schedule and coordinate access.',
      },
      {
        iconName: 'Home',
        title: 'Complete Clearance',
        description: 'Remove all contents from apartments, condos, and rental properties.',
      },
      {
        iconName: 'Users',
        title: 'Legal Compliance',
        description: 'Follow local laws for abandoned property and eviction procedures.',
      },
      {
        iconName: 'Clock',
        title: 'Quick Turnaround',
        description: 'Fast service to minimize vacancy time and prepare for new tenants.',
      },
    ],
    pricing: [
      { name: 'Studio/1BR Apartment', price: 'From $199-399', description: 'Small rental units' },
      {
        name: '2-3BR Apartment/Home',
        price: 'From $399-599',
        description: 'Standard rental properties',
      },
      {
        name: 'Large Home/Complex',
        price: 'From $599-799',
        description: 'Large properties and houses',
      },
    ],
    faqs: [
      {
        question: 'Do you offer property management discounts?',
        answer:
          'Yes, we provide special pricing for property management companies and landlords with multiple properties or regular cleanout needs. Contact us for volume pricing.',
      },
      {
        question: 'How quickly can you clear a unit?',
        answer:
          'Most units can be cleared within 4-8 hours depending on size and contents. We understand the importance of minimizing vacancy time and offer same-day service when possible.',
      },
      {
        question: 'Can you handle eviction cleanouts?',
        answer:
          'Yes, we frequently work with property managers and court officers for eviction cleanouts. We understand the legal requirements and handle these situations professionally and sensitively.',
      },
      {
        question: 'What about abandoned property laws?',
        answer:
          'We work with property managers to ensure compliance with local abandoned property laws. We can hold items for the required period or coordinate proper disposal according to legal requirements.',
      },
    ],
    relatedContent: [],
    showReviewMention: false,
  },
  'restaurant-equipment-removal': {
    slug: 'restaurant-equipment-removal',
    serviceInfo: {
      serviceName: 'Restaurant Equipment Removal',
      category: 'Restaurant Equipment Removal',
      price: 'From $299-1299',
      benefits: [
        'Commercial equipment handling',
        'Licensed & insured',
        'Disconnect coordination',
        'Scrap metal recycling',
      ],
    },
    title: 'Restaurant Equipment Removal in Evansville',
    description:
      'Professional removal of commercial kitchen equipment including ovens, refrigerators, sinks, and complete restaurant cleanouts',
    badges: ['Commercial Equipment', 'Disconnect Coordination', 'Scrap Metal Recovery'],
    serviceCategory: 'Commercial Equipment Removal',
    features: [
      {
        iconName: 'ChefHat',
        title: 'Commercial Kitchen Equipment',
        description:
          'Expert removal of ovens, fryers, grills, and all commercial cooking equipment',
      },
      {
        iconName: 'Refrigerator',
        title: 'Refrigeration Systems',
        description: 'Safe removal of walk-in coolers, reach-in refrigerators, and freezer units',
      },
      {
        iconName: 'Wrench',
        title: 'Disconnect Coordination',
        description: 'Work with utilities for gas, electric, and plumbing disconnections',
      },
      {
        iconName: 'Truck',
        title: 'Heavy Equipment Handling',
        description: 'Specialized equipment for moving large commercial kitchen items',
      },
    ],
    steps: [
      {
        iconName: 'ChefHat',
        title: 'Equipment Assessment',
        description: 'We evaluate commercial kitchen equipment and coordinate disconnections.',
      },
      {
        iconName: 'Wrench',
        title: 'Professional Disconnection',
        description: 'Coordinate with licensed technicians for gas, electric, and plumbing.',
      },
      {
        iconName: 'Truck',
        title: 'Safe Removal',
        description: 'Use specialized equipment to safely remove heavy commercial items.',
      },
      {
        iconName: 'Refrigerator',
        title: 'Responsible Disposal',
        description: 'Recycle metals and properly dispose of refrigerants and materials.',
      },
    ],
    pricing: [
      {
        name: 'Single Equipment Item',
        price: 'From $299-499',
        description: 'Individual ovens, refrigerators',
      },
      { name: 'Kitchen Section', price: 'From $499-899', description: 'Partial kitchen removal' },
      {
        name: 'Complete Restaurant',
        price: 'From $899-1299',
        description: 'Full restaurant cleanout',
      },
    ],
    faqs: [
      {
        question: 'Do you handle gas line disconnections?',
        answer:
          "We coordinate with licensed professionals for gas line disconnections. We don't perform utility disconnections ourselves but can arrange for qualified technicians as part of the service.",
      },
      {
        question: 'Can you remove walk-in coolers?',
        answer:
          'Yes, we specialize in walk-in cooler and freezer removal. These require specialized equipment and coordination with refrigeration technicians for proper coolant handling.',
      },
      {
        question: 'What happens to the scrap metal?',
        answer:
          'Commercial kitchen equipment contains valuable metals. We recycle all metal components and can often provide credit toward your service cost based on current scrap metal prices.',
      },
      {
        question: 'Do you work with restaurant closures?',
        answer:
          'Absolutely. We frequently work with restaurant owners, landlords, and property managers during restaurant closures, renovations, and equipment updates.',
      },
    ],
    relatedContent: [],
    showReviewMention: false,
  },
  'storage-unit-cleanouts': {
    slug: 'storage-unit-cleanouts',
    serviceInfo: {
      serviceName: 'Storage Unit Cleanout Services',
      category: 'Storage Unit Cleanout',
      price: 'From $149-449',
      benefits: [
        'Same-day service',
        'Licensed & insured',
        'Full unit cleanout',
        'Donation coordination',
      ],
    },
    title: 'Storage Unit Cleanouts in Evansville',
    description:
      'Professional storage unit cleanout services for abandoned units, estate storage, and facility turnovers',
    badges: ['Same-Day Service', 'Full Unit Clearing', 'High Demand Service'],
    serviceCategory: 'Cleanout Services',
    features: [
      {
        iconName: 'Package',
        title: 'Complete Unit Cleanout',
        description:
          'Remove all contents including furniture, boxes, appliances, and personal items',
      },
      {
        iconName: 'Truck',
        title: 'Professional Hauling',
        description: 'Efficient removal with proper equipment for heavy and awkward items',
      },
      {
        iconName: 'Shield',
        title: 'Facility Coordination',
        description: 'Work directly with storage facilities for seamless unit turnovers',
      },
      {
        iconName: 'Clock',
        title: 'Quick Response',
        description: 'Fast service for time-sensitive facility needs',
      },
    ],
    steps: [
      {
        iconName: 'Package',
        title: 'Unit Assessment',
        description: 'We evaluate the storage unit contents and provide upfront pricing.',
      },
      {
        iconName: 'Truck',
        title: 'Complete Removal',
        description: 'Remove all contents including furniture, boxes, and personal items.',
      },
      {
        iconName: 'Shield',
        title: 'Facility Coordination',
        description: 'Work with facility management to ensure proper procedures.',
      },
      {
        iconName: 'Clock',
        title: 'Final Cleanup',
        description: 'Basic cleaning to prepare unit for next tenant if requested.',
      },
    ],
    pricing: [
      {
        name: 'Small Unit (5x5-5x10)',
        price: 'From $149-249',
        description: 'Small storage units',
      },
      {
        name: 'Medium Unit (10x10-10x15)',
        price: 'From $249-349',
        description: 'Standard storage units',
      },
      { name: 'Large Unit (10x20+)', price: 'From $349-449', description: 'Large storage units' },
    ],
    faqs: [
      {
        question: 'Do you work with storage facilities directly?',
        answer:
          'Yes, we frequently partner with storage facilities for abandoned unit cleanouts and facility turnovers. We understand the process and can work within facility requirements and timelines.',
      },
      {
        question: 'How quickly can you clear a storage unit?',
        answer:
          'Most storage units can be cleared within 2-4 hours depending on size and contents. We offer same-day service for urgent facility needs and can schedule multiple units in sequence.',
      },
      {
        question: 'What happens to items from storage unit cleanouts?',
        answer:
          'We sort items for donation, recycling, and proper disposal. Personal documents are handled with care and can be set aside for facility management if requested.',
      },
      {
        question: 'Do you provide facility discounts?',
        answer:
          'Yes, we offer special pricing for storage facilities with multiple units or regular cleanout needs. Contact us for facility partnership rates.',
      },
    ],
    relatedContent: [],
    showReviewMention: false,
  },
  'storm-debris-cleanup': {
    slug: 'storm-debris-cleanup',
    serviceInfo: {
      serviceName: 'Storm Debris Cleanup Services',
      category: 'Storm Debris Cleanup',
      price: 'From $299-1299',
      benefits: [
        'Emergency response',
        'Licensed & insured',
        'Complete cleanup',
        'Insurance coordination',
      ],
    },
    title: 'Storm Debris Cleanup in Evansville',
    description:
      'Emergency storm debris removal including branches, fencing, shingles, and storm damage cleanup',
    badges: ['Emergency Response', 'Insurance Coordination', 'Complete Cleanup'],
    serviceCategory: 'Emergency Services',
    features: [
      {
        iconName: 'Zap',
        title: 'Emergency Response',
        description: 'Rapid response for storm damage cleanup and debris removal',
      },
      {
        iconName: 'TreePine',
        title: 'Tree & Branch Removal',
        description: 'Safe removal of fallen trees, large branches, and storm-damaged vegetation',
      },
      {
        iconName: 'Home',
        title: 'Property Damage Cleanup',
        description: 'Remove damaged fencing, shingles, siding, and structural debris',
      },
      {
        iconName: 'Clock',
        title: 'Insurance Coordination',
        description: 'Work with insurance companies and provide documentation for claims',
      },
    ],
    steps: [
      {
        iconName: 'Zap',
        title: 'Emergency Response',
        description: 'Rapid assessment of storm damage and safety hazards.',
      },
      {
        iconName: 'TreePine',
        title: 'Tree & Branch Removal',
        description: 'Safe removal of fallen trees and large storm debris.',
      },
      {
        iconName: 'Home',
        title: 'Property Cleanup',
        description: 'Remove damaged fencing, shingles, and structural debris.',
      },
      {
        iconName: 'Clock',
        title: 'Insurance Documentation',
        description: 'Provide detailed documentation and photos for insurance claims.',
      },
    ],
    pricing: [
      {
        name: 'Small Storm Cleanup',
        price: 'From $299-599',
        description: 'Minor debris and branch removal',
      },
      {
        name: 'Moderate Storm Damage',
        price: 'From $599-899',
        description: 'Significant debris and property cleanup',
      },
      {
        name: 'Major Storm Cleanup',
        price: 'From $899-1299',
        description: 'Extensive storm damage cleanup',
      },
    ],
    faqs: [
      {
        question: 'Do you provide emergency storm cleanup?',
        answer:
          'Yes, we offer emergency response for storm debris cleanup. During severe weather events, we prioritize safety hazards and work as quickly as conditions allow.',
      },
      {
        question: 'Can you help with insurance claims?',
        answer:
          "We can provide detailed documentation, photos, and estimates for insurance claims. We're experienced working with insurance adjusters and can help streamline the claims process.",
      },
      {
        question: 'What types of storm debris do you remove?',
        answer:
          'We remove fallen trees, branches, damaged fencing, roof shingles, siding, broken glass, and any storm-related property debris. We assess each situation for safety and develop an appropriate cleanup plan.',
      },
      {
        question: 'How quickly can you respond after a storm?',
        answer:
          'Response time depends on storm severity and demand, but we typically respond within 24-48 hours. Safety is our priority - we wait for conditions to be safe before beginning work.',
      },
    ],
    relatedContent: [],
    showReviewMention: false,
  },
  'warehouse-fixture-removal': {
    slug: 'warehouse-fixture-removal',
    serviceInfo: {
      serviceName: 'Warehouse & Retail Fixture Removal',
      category: 'Warehouse Fixture Removal',
      price: 'From $399-1599',
      benefits: [
        'Commercial fixture removal',
        'Licensed & insured',
        'Heavy equipment handling',
        'Scrap metal recovery',
      ],
    },
    title: 'Warehouse & Retail Fixture Removal in Evansville',
    description:
      'Professional removal of warehouse racks, retail shelving, and commercial fixtures for space reconfiguration',
    badges: ['Commercial Fixtures', 'Heavy Equipment', 'Space Reconfiguration'],
    serviceCategory: 'Commercial Fixture Removal',
    features: [
      {
        iconName: 'Package',
        title: 'Warehouse Rack Systems',
        description: 'Dismantle and remove pallet racks, cantilever racks, and shelving systems',
      },
      {
        iconName: 'Building2',
        title: 'Retail Fixture Removal',
        description:
          'Remove store shelving, display cases, checkout counters, and retail equipment',
      },
      {
        iconName: 'Wrench',
        title: 'Professional Dismantling',
        description: 'Safe dismantling of fixtures with proper tools and experienced crew',
      },
      {
        iconName: 'Truck',
        title: 'Heavy Equipment Removal',
        description: 'Specialized equipment for large commercial fixtures and systems',
      },
    ],
    steps: [
      {
        iconName: 'Package',
        title: 'Site Assessment',
        description: 'We evaluate the warehouse or retail space and fixture systems.',
      },
      {
        iconName: 'Wrench',
        title: 'Safe Dismantling',
        description: 'Professional dismantling of racks, shelving, and fixture systems.',
      },
      {
        iconName: 'Truck',
        title: 'Heavy Equipment Removal',
        description: 'Use specialized equipment for large commercial fixtures.',
      },
      {
        iconName: 'Building2',
        title: 'Scrap Metal Recovery',
        description: 'Recycle metal components and provide credit toward service cost.',
      },
    ],
    pricing: [
      {
        name: 'Small Retail Section',
        price: 'From $399-699',
        description: 'Individual aisles or sections',
      },
      {
        name: 'Large Retail/Warehouse',
        price: 'From $699-1199',
        description: 'Multiple aisles or large areas',
      },
      {
        name: 'Complete Facility',
        price: 'From $1199-1599',
        description: 'Entire warehouse or store',
      },
    ],
    faqs: [
      {
        question: 'Can you dismantle warehouse pallet racks safely?',
        answer:
          'Yes, our crew has experience with warehouse rack systems including pallet racks, cantilever racks, and drive-in systems. We follow proper dismantling procedures to ensure safety.',
      },
      {
        question: 'Do you remove retail store fixtures?',
        answer:
          'Absolutely. We handle all types of retail fixtures including gondola shelving, display cases, checkout counters, and specialized retail equipment.',
      },
      {
        question: 'What happens to the metal fixtures?',
        answer:
          'Most warehouse and retail fixtures contain valuable steel. We recycle all metal components and can often provide credit toward your service cost based on current scrap prices.',
      },
      {
        question: 'Can you work around business operations?',
        answer:
          'Yes, we understand business continuity needs. We can work in phases, during off-hours, or around operational areas to minimize business disruption.',
      },
    ],
    relatedContent: [],
    showReviewMention: false,
  },
  'yard-waste-removal': {
    slug: 'yard-waste-removal',
    serviceInfo: {
      serviceName: 'Yard Waste Removal Services',
      category: 'Yard Waste Removal',
      price: 'From $179-489',
      benefits: [
        'Same-day service',
        'Licensed & insured',
        'Eco-friendly disposal',
        'No hidden fees',
      ],
    },
    title: 'Yard Waste Removal Services in Evansville',
    description:
      'Fast, reliable yard waste removal, brush pickup, and landscaping debris removal throughout Southern Indiana. Whether you need leaves removed, tree limbs hauled away, or complete yard cleanup, we provide same-day service with 100% eco-friendly composting.',
    badges: [
      UNIFORM_OFFERS.SAME_DAY_SERVICE,
      UNIFORM_OFFERS.LICENSED_INSURED,
      UNIFORM_OFFERS.ECO_FRIENDLY,
    ],
    serviceCategory: 'Yard Waste Removal Service',
    features: [
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.LICENSED_INSURED,
        description: 'Fully licensed and insured for your protection',
      },
      {
        iconName: 'Calendar',
        title: UNIFORM_OFFERS.SAME_DAY_SERVICE,
        description: 'Call for same-day pickup of yard waste and debris',
      },
      {
        iconName: 'Recycle',
        title: UNIFORM_OFFERS.ECO_FRIENDLY,
        description: '100% composted or processed into mulch/soil amendments',
      },
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.UPFRONT_PRICING,
        description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
      },
    ],
    steps: [
      {
        iconName: 'Phone',
        title: 'Schedule',
        description:
          'Call us or text photos for a free estimate. We offer same-day appointments for yard waste removal throughout Evansville.',
      },
      {
        iconName: 'Truck',
        title: 'We Collect',
        description:
          'Our team arrives on time, provides upfront pricing, and collects yard waste from anywhere on your property including backyard areas.',
      },
      {
        iconName: 'Recycle',
        title: 'We Compost',
        description:
          "All yard waste is taken to certified composting facilities where it's processed into mulch, compost, and soil amendments. Nothing goes to landfills.",
      },
    ],
    pricing: [
      {
        name: 'Small Load',
        price: 'From $179-289',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM,
      },
      {
        name: 'Medium Load',
        price: 'From $289-389',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.QUARTER_LOAD,
      },
      {
        name: 'Large Load',
        price: 'From $389-489',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.HALF_LOAD,
      },
    ],
    faqs: [
      {
        question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for yard waste removal?`,
        answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas, subject to availability.`,
      },
      {
        question: 'What types of yard waste do you remove?',
        answer:
          'We remove leaves, grass clippings, brush, tree limbs (up to 6 inches diameter), hedge trimmings, garden debris, and other organic landscaping materials.',
      },
      {
        question: 'How do you price yard waste removal services?',
        answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
      },
      {
        question: 'Do you remove large tree limbs and branches?',
        answer:
          'Yes, we remove tree limbs up to 6 inches in diameter. Larger limbs or whole tree removal requires specialized tree service, which we can recommend local providers for.',
      },
      {
        question: 'What happens to the yard waste after removal?',
        answer:
          "All yard waste is taken to certified composting facilities where it's processed into mulch, compost, and soil amendments. Nothing goes to landfills - it's 100% recycled.",
      },
    ],
    relatedContent: [
      {
        title: 'Yard Waste Disposal Guide',
        href: '/blog/yard-waste-disposal-evansville',
        description:
          'Complete guide to yard waste disposal in Evansville. Learn about composting and local facilities.',
        type: 'blog' as const,
        category: 'Local Guide',
      },
      {
        title: 'Junk Removal Services',
        href: '/services/junk-removal',
        description:
          'Full-service junk removal for all household items including furniture, appliances, and more.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Light Demolition',
        href: '/services/light-demolition',
        description: 'Interior demo, deck and fence removal with safety-first approach.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Shed Removal',
        href: '/services/shed-removal',
        description: 'Complete demolition, removal, and cleanup for sheds and outbuildings.',
        type: 'service' as const,
        category: 'Related Service',
      },
    ],
    showReviewMention: true,
  },
  'junk-removal': {
    slug: 'junk-removal',
    serviceInfo: {
      serviceName: 'Junk Removal Services',
      category: 'Junk Removal',
      price: 'From $89-649',
      benefits: [
        'Same-day service',
        'Licensed & insured',
        'Eco-friendly disposal',
        'No hidden fees',
      ],
    },
    title: 'Junk Removal Services in Evansville',
    description:
      'Fast, reliable junk removal, trash removal, and haul away services throughout Southern Indiana. Whether you need to get rid of old furniture, clean out your house, or dispose of construction debris, we provide same-day service with upfront pricing and no hidden fees.',
    badges: [
      UNIFORM_OFFERS.SAME_DAY_SERVICE,
      UNIFORM_OFFERS.LICENSED_INSURED,
      UNIFORM_OFFERS.ECO_FRIENDLY,
    ],
    serviceCategory: 'Junk Removal Service',
    features: [
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.LICENSED_INSURED,
        description: 'Fully licensed and insured for your protection',
      },
      {
        iconName: 'Calendar',
        title: UNIFORM_OFFERS.SAME_DAY_SERVICE,
        description: 'Quick response for urgent cleanouts',
      },
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.ECO_FRIENDLY,
        description: 'Responsible recycling and donation practices',
      },
      {
        iconName: 'CheckCircle',
        title: UNIFORM_OFFERS.UPFRONT_PRICING,
        description: UNIFORM_OFFERS.NO_HIDDEN_FEES,
      },
    ],
    steps: [
      {
        iconName: 'Phone',
        title: 'Schedule',
        description:
          'Call us or book online for a free estimate. We offer same-day and next-day appointments throughout Evansville.',
      },
      {
        iconName: 'Truck',
        title: 'We Arrive',
        description:
          'Our professional team arrives on time, provides upfront pricing, and handles all the heavy lifting for you.',
      },
      {
        iconName: 'CheckCircle',
        title: 'We Clean Up',
        description:
          'We remove your junk, sweep up the area, and dispose of everything responsibly through recycling and donation.',
      },
    ],
    pricing: [
      {
        name: 'Single Item',
        price: 'From $89-149',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM,
      },
      {
        name: '1/4 Truck Load',
        price: 'From $179-249',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.QUARTER_LOAD,
      },
      {
        name: '1/2 Truck Load',
        price: 'From $289-389',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.HALF_LOAD,
      },
      {
        name: 'Full Truck Load',
        price: 'From $489-649',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.FULL_LOAD,
      },
    ],
    faqs: [
      {
        question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()}?`,
        answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas, subject to availability.`,
      },
      {
        question: 'What items do you accept for removal?',
        answer:
          'We accept most household items, furniture, appliances, construction debris, and yard waste. Whether you need to dispose of old furniture, get rid of broken appliances, or remove construction materials, we handle it all. We cannot accept hazardous materials, chemicals, or paint.',
      },
      {
        question: 'How do you price your junk removal services?',
        answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
      },
      {
        question: 'Are you licensed and insured?',
        answer:
          'Yes, Uncle Sam Junk Removal is fully licensed and insured for your protection and peace of mind.',
      },
      {
        question: 'What areas do you serve?',
        answer:
          'We serve Evansville and all of Southern Indiana, including Henderson KY, Newburgh, Boonville, and surrounding communities.',
      },
    ],
    relatedContent: [
      {
        title: 'Evansville Junk Removal Tips',
        href: '/blog/evansville-junk-removal-tips',
        description:
          'Local tips for efficient junk removal in Evansville. Learn about bulk pickup schedules and local recycling centers.',
        type: 'blog' as const,
        category: 'Local Guide',
      },
      {
        title: 'Junk Removal Cost Guide',
        href: '/blog/junk-removal-cost-tri-state',
        description:
          'Understanding junk removal pricing in the Tri-State area. Learn what factors affect costs and how to save money.',
        type: 'blog' as const,
        category: 'Pricing Guide',
      },
      {
        title: 'Appliance Removal',
        href: '/services/appliance-removal',
        description:
          'Specialized appliance removal service for refrigerators, washers, dryers, and other large appliances.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Estate Cleanouts',
        href: '/services/estate-cleanouts',
        description:
          'Comprehensive estate cleanout services for inherited properties and downsizing projects.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Light Demolition',
        href: '/services/light-demolition',
        description:
          'Shed, deck, and playset tear-downs with debris hauling for exterior cleanups.',
        type: 'service' as const,
        category: 'Alternative Service',
      },
      {
        title: 'Henderson KY Service',
        href: '/locations/henderson-ky',
        description:
          'Professional junk removal service in Henderson, Kentucky with local expertise and competitive rates.',
        type: 'location' as const,
        category: 'Service Area',
      },
    ],
    showReviewMention: true,
  },
  'appliance-removal': {
    slug: 'appliance-removal',
    serviceInfo: {
      serviceName: 'Appliance Removal Services',
      category: 'Appliance Removal',
      price: 'From $89-149',
      benefits: ['Same-day service', 'Safe disconnection', 'EPA compliant', 'No hidden fees'],
    },
    title: 'Appliance Removal Services in Evansville',
    description:
      'Professional appliance removal, old appliance pickup, and appliance disposal with safe disconnection and eco-friendly disposal throughout Southern Indiana. Whether you need refrigerator removal, washer dryer removal, or any appliance disposal, we handle it all with specialized equipment.',
    badges: [UNIFORM_OFFERS.SAME_DAY_SERVICE, 'Safe Disconnection', 'EPA Compliant'],
    serviceCategory: 'Appliance Removal Service',
    features: [
      {
        iconName: 'Truck',
        title: 'All Appliance Types',
        description: 'Refrigerators, washers, dryers, stoves, dishwashers, and more',
      },
      {
        iconName: 'Shield',
        title: 'Safe Disconnection',
        description: 'Professional handling of electrical and plumbing connections',
      },
      {
        iconName: 'Wrench',
        title: UNIFORM_OFFERS.PROFESSIONAL_TEAM,
        description: 'Specialized tools for safe removal from any location',
      },
      {
        iconName: 'Recycle',
        title: 'EPA Compliant Disposal',
        description: 'Responsible disposal following all regulations',
      },
    ],
    steps: [
      {
        iconName: 'Truck',
        title: 'Schedule Service',
        description:
          'Call for same-day pickup. We handle all appliance types and sizes with upfront pricing.',
      },
      {
        iconName: 'Shield',
        title: 'Safe Disconnection',
        description:
          'Professional disconnection of gas, electric, and water connections following safety protocols.',
      },
      {
        iconName: 'Wrench',
        title: 'Careful Removal',
        description:
          'Specialized equipment for heavy appliances and tight spaces with complete protection of your property.',
      },
      {
        iconName: 'Recycle',
        title: 'Responsible Disposal',
        description:
          'EPA-compliant disposal with maximum recycling of metals and components. Nothing goes to waste.',
      },
    ],
    pricing: [
      {
        name: 'Small Appliances',
        price: 'From $89',
        description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM,
      },
      { name: 'Washer or Dryer', price: 'From $119', description: 'Standard size appliances' },
      { name: 'Refrigerator or Stove', price: 'From $149', description: 'Large appliances' },
      {
        name: 'Multiple Appliances',
        price: '15% Discount',
        description: 'Volume pricing available',
      },
    ],
    faqs: [
      {
        question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} for appliance removal?`,
        answer: `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas for appliance removal, subject to availability.`,
      },
      {
        question: 'Do you disconnect gas and electric appliances?',
        answer:
          'Yes, our team can safely disconnect electric appliances. For gas appliances, we recommend having a licensed plumber disconnect gas lines before our arrival for safety.',
      },
      {
        question: 'How do you price appliance removal services?',
        answer: `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
      },
      {
        question: 'Can you remove built-in appliances?',
        answer:
          'Yes, we can remove built-in appliances including dishwashers, microwaves, and cooktops. This may require additional time and tools, which could affect pricing.',
      },
      {
        question: 'What do you do with old appliances?',
        answer:
          'We recycle metals, donate working appliances when possible, and ensure proper disposal of refrigerants and hazardous materials following EPA guidelines.',
      },
    ],
    relatedContent: [
      {
        title: 'Appliance Disposal Guide',
        href: '/blog/appliance-disposal-recycling-guide',
        description:
          'Complete guide to appliance disposal and recycling in the Tri-State area. Learn about EPA regulations and disposal options.',
        type: 'blog' as const,
        category: 'Local Guide',
      },
      {
        title: 'Junk Removal Services',
        href: '/services/junk-removal',
        description:
          'Full-service junk removal for all household items including furniture, appliances, and more.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Estate Cleanouts',
        href: '/services/estate-cleanouts',
        description:
          'Comprehensive estate cleanout services for inherited properties and downsizing projects.',
        type: 'service' as const,
        category: 'Related Service',
      },
      {
        title: 'Mattress Removal',
        href: '/services/mattress-removal',
        description:
          'Professional mattress removal and bed disposal service with eco-friendly disposal methods.',
        type: 'service' as const,
        category: 'Related Service',
      },
    ],
    showReviewMention: true,
  },
}

export const serviceSlugs = Object.keys(servicesData)
