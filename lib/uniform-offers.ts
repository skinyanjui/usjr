// Uniform offers and language constants for consistent messaging across all pages
// This ensures all pages use the same terminology for key offers and services

export const UNIFORM_OFFERS = {
  // Core service promises
  SAME_DAY_SERVICE: 'Same Day Service',
  FREE_ESTIMATES: 'Free Estimates',

  // Pricing language
  STARTING_AT: 'Starting at',
  FROM_PRICE: 'From',

  // CTA language
  GET_FREE_QUOTE: 'Get Free Quote',
  CALL_NOW: 'Call Now',
  TEXT_PHOTOS: 'Text Photos for Quote',
  SCHEDULE_SERVICE: 'Schedule Service',

  // Service guarantees and benefits
  LICENSED_INSURED: 'Licensed & Insured',
  ECO_FRIENDLY: 'Eco-Friendly Disposal',
  UPFRONT_PRICING: 'Upfront Pricing',
  NO_HIDDEN_FEES: 'No Hidden Fees',
  VETERAN_OWNED: 'Veteran-Owned',
  LOCAL_BUSINESS: 'Local Business',

  // Time-based offers
  SAME_DAY_AVAILABILITY: 'Same-day availability',
  NEXT_DAY_SERVICE: 'Next-day service available',
  FLEXIBLE_SCHEDULING: 'Flexible scheduling',

  // Quality assurance
  SATISFACTION_GUARANTEED: 'Satisfaction Guaranteed',
  PROFESSIONAL_TEAM: 'Professional Team',
  RELIABLE_SERVICE: 'Reliable Service',
} as const

// Service-specific standard descriptions
export const SERVICE_DESCRIPTIONS = {
  JUNK_REMOVAL: {
    tagline: 'Same-day junk removal service',
    features: [
      UNIFORM_OFFERS.SAME_DAY_SERVICE,
      UNIFORM_OFFERS.FREE_ESTIMATES,
      UNIFORM_OFFERS.ECO_FRIENDLY,
      UNIFORM_OFFERS.UPFRONT_PRICING,
    ],
  },
  DUMPSTER_RENTAL: {
    tagline: 'Convenient dumpster rental solutions',
    features: [
      UNIFORM_OFFERS.FLEXIBLE_SCHEDULING,
      UNIFORM_OFFERS.UPFRONT_PRICING,
      UNIFORM_OFFERS.PROFESSIONAL_TEAM,
      UNIFORM_OFFERS.LOCAL_BUSINESS,
    ],
  },
  CLEANING: {
    tagline: 'Professional cleaning services',
    features: [
      UNIFORM_OFFERS.FREE_ESTIMATES,
      UNIFORM_OFFERS.ECO_FRIENDLY,
      UNIFORM_OFFERS.SATISFACTION_GUARANTEED,
      UNIFORM_OFFERS.LICENSED_INSURED,
    ],
  },
} as const

// Location-specific offers that can be customized per area
export const LOCATION_OFFERS = {
  STANDARD: [
    {
      title: 'Curbside Pickup Discount',
      discount: 'Save $25',
      description: 'Items placed at curb',
    },
    {
      title: 'Same-Day Service',
      discount: 'Available',
      description: 'Call by 2 PM for same-day pickup',
    },
  ],
  EXTENDED_AREA: [
    {
      title: 'Extended Area Service',
      discount: 'Available',
      description: 'Advance scheduling recommended',
    },
    {
      title: 'Free Estimates',
      discount: 'Always',
      description: 'Text photos for instant quote',
    },
  ],
} as const

// Pricing tier language standardization
export const PRICING_LANGUAGE = {
  TIER_DESCRIPTORS: {
    SINGLE_ITEM: 'Perfect for 1-2 items',
    QUARTER_LOAD: 'Great for room cleanouts',
    HALF_LOAD: 'Ideal for large cleanouts',
    THREE_QUARTER_LOAD: 'Perfect for whole house cleanouts',
    FULL_LOAD: 'Complete home or office cleanouts',
  },
  PRICING_NOTES: {
    VOLUME_BASED: 'Pricing based on volume, not weight',
    INCLUDES_LABOR: 'Includes labor, loading, and disposal',
    NO_SURPRISE_FEES: 'No surprise fees or fuel charges',
    SAME_DAY_DISCOUNT: 'Same-day bookings may qualify for discounts',
  },
} as const

export type UniformOffer = keyof typeof UNIFORM_OFFERS
export type ServiceType = keyof typeof SERVICE_DESCRIPTIONS
export type LocationOfferType = keyof typeof LOCATION_OFFERS
