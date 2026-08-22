import {
  emailAddress,
  locations,
  phoneDisplay,
  phoneHref,
  services,
  siteUrl,
} from "./site-data";

export const BUSINESS = {
  name: "Uncle Sam Junk Removal",
  site: siteUrl,
  phoneE164: phoneHref,
  phoneDisplay,
  email: emailAddress,
  city: "Evansville",
  state: "IN",
  region:
    "Evansville Tri-State (Southern Indiana, Western Kentucky, Southeast Illinois)",
  ownership: "Veteran-owned",
  fastestPath: `Text photos to ${phoneDisplay} for the quickest, most useful estimate.`,
  promises: [
    "The final onsite price is approved before work begins",
    "The crew handles the lifting and loading",
    "A basic sweep-up is included after removal",
  ],
} as const;

export const PRICING = [
  {
    size: "single_item",
    label: "Single item / a few items",
    describes: "One or a few bulky items",
    low: 75,
    high: 150,
  },
  {
    size: "quarter_load",
    label: "¼ trailer load",
    describes: "Small room or partial cleanout",
    low: 200,
    high: 300,
  },
  {
    size: "half_load",
    label: "½ trailer load",
    describes: "Large room or garage cleanout",
    low: 350,
    high: 450,
  },
  {
    size: "three_quarter_load",
    label: "¾ trailer load",
    describes: "Large multi-room cleanout",
    low: 425,
    high: 550,
  },
  {
    size: "full_load",
    label: "Full trailer load",
    describes: "Large home, office, or property cleanout",
    low: 500,
    high: 650,
  },
] as const;

export const PRICE_INCLUDES = [
  "Labor and heavy lifting",
  "Loading and transportation",
  "Standard disposal fees",
  "A basic sweep-up",
] as const;

const SERVICE_KEYWORDS: Record<string, string[]> = {
  "junk-removal": ["junk", "clutter", "trash", "haul away", "debris"],
  "furniture-removal": [
    "couch",
    "sofa",
    "sectional",
    "recliner",
    "dresser",
    "table",
    "desk",
    "bed frame",
  ],
  "shed-removal": ["shed", "outbuilding", "playhouse"],
  "estate-cleanouts": ["estate", "inherited", "downsizing", "probate", "hoarding"],
  "appliance-removal": [
    "appliance",
    "fridge",
    "refrigerator",
    "washer",
    "dryer",
    "range",
    "stove",
    "freezer",
    "dishwasher",
  ],
  "garage-cleanout": ["garage", "carport", "workshop"],
  "storage-unit-cleanouts": ["storage unit", "locker", "self storage"],
  "mattress-removal": ["mattress", "box spring"],
  cleaning: ["cleaning", "deep clean", "scrub"],
  "property-management-turnovers": [
    "turnover",
    "rental",
    "tenant",
    "property manager",
    "eviction",
  ],
  "office-cleanouts": ["office", "cubicle", "commercial office"],
  "restaurant-equipment-removal": [
    "restaurant",
    "commercial kitchen",
    "kitchen equipment",
  ],
  "warehouse-fixture-removal": [
    "warehouse",
    "racking",
    "pallet rack",
    "shelving",
    "industrial fixture",
  ],
  "light-demolition": [
    "demo",
    "demolition",
    "tear out",
    "tear down",
    "deck",
    "fence",
  ],
  "hot-tub-removal": ["hot tub", "spa", "jacuzzi"],
  "yard-waste-removal": [
    "yard waste",
    "brush",
    "limbs",
    "branches",
    "leaves",
    "landscaping",
  ],
  "storm-debris-cleanup": [
    "storm",
    "tornado",
    "wind damage",
    "fallen tree",
    "flood debris",
  ],
  "holiday-tree-removal": ["christmas tree", "holiday tree"],
};

export const ZIP_HINTS: Record<string, string[]> = {
  "evansville-in": [
    "47708",
    "47710",
    "47711",
    "47712",
    "47713",
    "47714",
    "47715",
    "47716",
    "47720",
    "47725",
  ],
  "newburgh-in": ["47629", "47630"],
  "henderson-ky": ["42419", "42420"],
  "owensboro-ky": ["42301", "42303"],
  "boonville-in": ["47601"],
  "princeton-in": ["47670"],
  "mount-carmel-il": ["62863"],
  "mount-vernon-in": ["47620"],
  "new-harmony-in": ["47631"],
};

const LOCATION_ALIASES: Record<string, string[]> = {
  "mount-carmel-il": ["mt carmel"],
  "mount-vernon-in": ["mt vernon"],
};

export type HaulingVerdict =
  | "not_accepted"
  | "needs_assessment"
  | "needs_advance_notice";

export const HAULING_RULES: Array<{
  verdict: HaulingVerdict;
  category: string;
  keywords: string[];
  guidance: string;
}> = [
  {
    verdict: "not_accepted",
    category: "Asbestos-containing material",
    keywords: ["asbestos", "transite", "vermiculite insulation"],
    guidance:
      "This requires a licensed asbestos abatement provider; Uncle Sam Junk Removal should not transport it.",
  },
  {
    verdict: "needs_assessment",
    category: "Suspected asbestos",
    keywords: ["popcorn ceiling", "old floor tile", "9x9 tile", "pipe wrap"],
    guidance:
      "Older building materials may contain asbestos. Have the material assessed before removal is promised.",
  },
  {
    verdict: "not_accepted",
    category: "Biohazards and medical waste",
    keywords: [
      "biohazard",
      "medical waste",
      "sharps",
      "needles",
      "sewage",
      "blood",
      "syringe",
    ],
    guidance: "Use an appropriate licensed biohazard or medical-waste provider.",
  },
  {
    verdict: "not_accepted",
    category: "Explosives and ammunition",
    keywords: [
      "explosive",
      "ammunition",
      "ammo",
      "fireworks",
      "flare",
      "gunpowder",
    ],
    guidance:
      "Do not schedule this as ordinary junk. Use the appropriate local public-safety disposal channel.",
  },
  {
    verdict: "not_accepted",
    category: "Fuels and unidentified chemicals",
    keywords: [
      "gasoline",
      "diesel",
      "kerosene",
      "solvent",
      "pesticide",
      "unknown chemical",
      "unidentified chemical",
    ],
    guidance:
      "This is outside normal junk hauling. Use an appropriate household-hazardous-waste or licensed disposal option.",
  },
  {
    verdict: "needs_advance_notice",
    category: "Paint",
    keywords: ["paint", "stain", "varnish", "primer"],
    guidance:
      "Paint requires advance review because disposal depends on the product and condition. State the type and number of containers when requesting a quote.",
  },
  {
    verdict: "needs_advance_notice",
    category: "Refrigerant-containing appliances",
    keywords: [
      "fridge",
      "refrigerator",
      "freezer",
      "air conditioner",
      "ac unit",
      "window unit",
      "mini fridge",
      "dehumidifier",
    ],
    guidance:
      "Flag this appliance in advance so refrigerant handling and any special disposal fee can be confirmed before the job.",
  },
  {
    verdict: "needs_advance_notice",
    category: "Pressurized containers",
    keywords: [
      "propane",
      "propane tank",
      "compressed gas",
      "co2 tank",
      "oxygen tank",
      "helium tank",
    ],
    guidance:
      "Pressurized containers require advance confirmation. State the type, quantity, and whether the containers are empty.",
  },
  {
    verdict: "needs_advance_notice",
    category: "Heavy materials",
    keywords: [
      "concrete",
      "brick",
      "tile",
      "dirt",
      "soil",
      "gravel",
      "safe",
      "gun safe",
      "piano",
      "shingles",
      "roofing",
    ],
    guidance:
      "Heavy materials are constrained by weight rather than volume. Flag them before quoting so equipment, trailer capacity, and pricing can be reviewed.",
  },
  {
    verdict: "needs_advance_notice",
    category: "Utility-connected fixtures",
    keywords: [
      "hot tub",
      "spa",
      "water heater",
      "furnace",
      "hardwired",
      "gas connected",
    ],
    guidance:
      "Utilities must be safely disconnected before removal. Confirm disconnection status and access in advance.",
  },
];

export function normalizeAgentText(value: unknown) {
  return String(value || "")
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchAgentService(input: unknown) {
  const query = normalizeAgentText(input);
  if (!query) return null;
  return (
    services.find((service) => service.slug === query) ||
    services.find((service) => normalizeAgentText(service.name) === query) ||
    services.find(
      (service) =>
        normalizeAgentText(service.name).includes(query) ||
        query.includes(normalizeAgentText(service.name)),
    ) ||
    services.find((service) =>
      (SERVICE_KEYWORDS[service.slug] || []).some((keyword) =>
        query.includes(keyword),
      ),
    ) ||
    services.find((service) =>
      normalizeAgentText(
        `${service.name} ${service.summary} ${service.includes.join(" ")} ${service.bestFor.join(" ")}`,
      ).includes(query),
    ) ||
    null
  );
}

export function matchAgentArea(input: unknown) {
  const query = normalizeAgentText(input);
  if (!query) return null;
  const zip = query.match(/\b(\d{5})\b/)?.[1];
  if (zip) {
    const byZip = locations.find((location) =>
      (ZIP_HINTS[location.slug] || []).includes(zip),
    );
    if (byZip) return byZip;
  }
  return (
    locations.find((location) => query.includes(normalizeAgentText(location.city))) ||
    locations.find((location) =>
      (LOCATION_ALIASES[location.slug] || []).some((alias) =>
        query.includes(normalizeAgentText(alias)),
      ),
    ) ||
    null
  );
}

export function classifyHaulingItem(input: unknown) {
  const query = normalizeAgentText(input);
  if (!query) return null;
  const matches = HAULING_RULES.filter((rule) =>
    rule.keywords.some((keyword) => query.includes(keyword)),
  );
  if (matches.length === 0) return null;
  const rank: Record<HaulingVerdict, number> = {
    not_accepted: 3,
    needs_assessment: 2,
    needs_advance_notice: 1,
  };
  return matches.sort((a, b) => rank[b.verdict] - rank[a.verdict])[0];
}

export function contactBlock() {
  return {
    phone: BUSINESS.phoneDisplay,
    call: `tel:${BUSINESS.phoneE164}`,
    text: `sms:${BUSINESS.phoneE164}`,
    email: BUSINESS.email,
    note: BUSINESS.fastestPath,
  };
}

export function quantityForLoadSize(loadSize: string) {
  return PRICING.find((price) => price.size === loadSize)?.label ||
    (loadSize === "unsure" ? "Not sure" : "Not sure");
}

export function buildAgentQuoteUrl(input: {
  service?: unknown;
  location?: unknown;
  loadSize?: unknown;
  timing?: unknown;
  notes?: unknown;
}) {
  const service = matchAgentService(input.service);
  const params = new URLSearchParams();
  if (service) params.set("service", service.quoteValue);
  if (typeof input.location === "string" && input.location.trim()) {
    params.set("location", input.location.trim().slice(0, 160));
  }
  if (
    typeof input.loadSize === "string" &&
    (PRICING.some((price) => price.size === input.loadSize) ||
      input.loadSize === "unsure")
  ) {
    params.set("size", input.loadSize);
  }
  if (
    typeof input.timing === "string" &&
    ["today", "2-3 days", "within-2-3-days", "flexible"].includes(
      input.timing,
    )
  ) {
    params.set("when", input.timing);
  }
  if (typeof input.notes === "string" && input.notes.trim()) {
    params.set("notes", input.notes.trim().slice(0, 400));
  }
  params.set("ref", "agent");
  return `${BUSINESS.site}/?${params.toString()}#quote`;
}

export { locations, services };
