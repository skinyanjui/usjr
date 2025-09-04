// Keyword variations for different user search behaviors
// Based on the principle that users with different knowledge levels use different search terms

export interface KeywordMapping {
  primary: string
  expertTerms: string[]  // Terms used by knowledgeable users
  noviceTerms: string[]  // Terms used by newcomers/general public
  actionTerms: string[]  // Action-oriented search terms
  localVariations: string[] // Local/regional terminology
}

export const serviceKeywords: Record<string, KeywordMapping> = {
  "junk-removal": {
    primary: "junk removal",
    expertTerms: [
      "waste hauling",
      "debris removal", 
      "bulk waste pickup",
      "construction debris removal"
    ],
    noviceTerms: [
      "trash removal",
      "garbage pickup", 
      "stuff removal",
      "old furniture removal",
      "haul away service",
      "clean out service"
    ],
    actionTerms: [
      "get rid of junk",
      "remove old furniture",
      "haul away trash",
      "clean out house",
      "dispose of items"
    ],
    localVariations: [
      "Evansville junk removal",
      "Southern Indiana hauling",
      "Tri-State junk pickup"
    ]
  },
  
  "mattress-removal": {
    primary: "mattress removal",
    expertTerms: [
      "mattress disposal",
      "bedding removal",
      "sleep system disposal"
    ],
    noviceTerms: [
      "old mattress pickup",
      "bed removal",
      "mattress haul away",
      "get rid of old mattress",
      "mattress disposal service"
    ],
    actionTerms: [
      "dispose of mattress",
      "throw away mattress",
      "remove old bed",
      "get mattress picked up"
    ],
    localVariations: [
      "Evansville mattress removal",
      "Indiana mattress disposal",
      "Tri-State bed removal"
    ]
  },

  "hot-tub-removal": {
    primary: "hot tub removal",
    expertTerms: [
      "spa removal",
      "jacuzzi removal",
      "hydrotherapy unit removal"
    ],
    noviceTerms: [
      "hot tub disposal",
      "hot tub haul away",
      "get rid of hot tub",
      "old spa removal",
      "broken hot tub removal"
    ],
    actionTerms: [
      "remove hot tub",
      "dispose of spa",
      "haul away jacuzzi",
      "get hot tub picked up"
    ],
    localVariations: [
      "Evansville hot tub removal",
      "Indiana spa removal",
      "Southern Indiana jacuzzi removal"
    ]
  },

  "appliance-removal": {
    primary: "appliance removal",
    expertTerms: [
      "white goods removal",
      "major appliance disposal",
      "kitchen appliance removal"
    ],
    noviceTerms: [
      "old appliance pickup",
      "refrigerator removal",
      "washer dryer removal",
      "stove removal",
      "dishwasher removal",
      "appliance haul away"
    ],
    actionTerms: [
      "get rid of old appliances",
      "dispose of refrigerator",
      "remove old washer",
      "haul away stove"
    ],
    localVariations: [
      "Evansville appliance removal",
      "Indiana appliance disposal",
      "Tri-State appliance pickup"
    ]
  },

  "estate-cleanouts": {
    primary: "estate cleanouts",
    expertTerms: [
      "estate liquidation cleanup",
      "probate property cleanup", 
      "estate sale cleanup"
    ],
    noviceTerms: [
      "house cleanout",
      "property cleanout",
      "deceased property cleanup",
      "estate cleanup service",
      "whole house cleanout",
      "family home cleanout"
    ],
    actionTerms: [
      "clean out house",
      "empty deceased property",
      "clear out estate",
      "clean inherited home"
    ],
    localVariations: [
      "Evansville estate cleanouts",
      "Southern Indiana estate cleanup",
      "Tri-State property cleanout"
    ]
  },

  "garage-cleanout": {
    primary: "garage cleanout",
    expertTerms: [
      "garage organization",
      "garage clearing service"
    ],
    noviceTerms: [
      "garage cleanup",
      "clean out garage",
      "garage junk removal",
      "messy garage cleanup",
      "garage decluttering"
    ],
    actionTerms: [
      "clean out garage",
      "organize garage",
      "clear garage space",
      "remove garage clutter"
    ],
    localVariations: [
      "Evansville garage cleanout",
      "Indiana garage cleanup",
      "Southern Indiana garage service"
    ]
  },

  "yard-waste-removal": {
    primary: "yard waste removal",
    expertTerms: [
      "landscape debris removal",
      "organic waste disposal",
      "green waste pickup"
    ],
    noviceTerms: [
      "yard cleanup",
      "brush removal",
      "tree debris removal",
      "leaf removal",
      "yard trash pickup",
      "landscaping cleanup"
    ],
    actionTerms: [
      "clean up yard",
      "remove yard debris",
      "haul away branches",
      "dispose of yard waste"
    ],
    localVariations: [
      "Evansville yard cleanup",
      "Indiana yard waste",
      "Southern Indiana landscape cleanup"
    ]
  },

  "shed-removal": {
    primary: "shed removal",
    expertTerms: [
      "outbuilding removal",
      "structure demolition"
    ],
    noviceTerms: [
      "shed disposal",
      "old shed removal",
      "shed haul away",
      "get rid of shed",
      "shed cleanup"
    ],
    actionTerms: [
      "remove old shed",
      "tear down shed",
      "dispose of shed",
      "haul away shed"
    ],
    localVariations: [
      "Evansville shed removal",
      "Indiana shed disposal",
      "Tri-State shed service"
    ]
  },

  "dumpster-rental": {
    primary: "dumpster rental",
    expertTerms: [
      "roll-off container rental",
      "waste container service",
      "temporary dumpster"
    ],
    noviceTerms: [
      "dumpster for rent",
      "trash container rental",
      "big trash bin",
      "construction dumpster",
      "home project dumpster"
    ],
    actionTerms: [
      "rent a dumpster",
      "get a dumpster",
      "order dumpster",
      "need dumpster"
    ],
    localVariations: [
      "Evansville dumpster rental",
      "Indiana dumpster service",
      "Southern Indiana roll-off"
    ]
  }
}

// Helper function to get all keyword variations for a service
export function getAllKeywords(serviceId: string): string[] {
  const mapping = serviceKeywords[serviceId]
  if (!mapping) return []
  
  return [
    mapping.primary,
    ...mapping.expertTerms,
    ...mapping.noviceTerms,
    ...mapping.actionTerms,
    ...mapping.localVariations
  ]
}

// Helper function to build keyword string for meta tags
export function buildKeywordString(serviceId: string): string {
  const keywords = getAllKeywords(serviceId)
  return keywords.join(", ")
}

// Helper function to get natural language variations for content
export function getContentVariations(serviceId: string): {
  primary: string
  variations: string[]
} {
  const mapping = serviceKeywords[serviceId]
  if (!mapping) return { primary: "", variations: [] }
  
  return {
    primary: mapping.primary,
    variations: [
      ...mapping.noviceTerms.slice(0, 3), // Top 3 novice terms
      ...mapping.actionTerms.slice(0, 2)  // Top 2 action terms
    ]
  }
}