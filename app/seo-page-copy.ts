/**
 * Quill/Beacon page copy overrides on existing canonical URLs.
 * Do not add doorway routes. Do not invent street addresses, landfill %,
 * $25 guarantees, awards, or prices beyond NAP already published on the site.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePageOverride = {
  titleAbsolute: string;
  description: string;
  keywords?: string[];
  h1: string;
  heroLead: string;
  aboutHeading: string;
  aboutBody: string;
  includes?: string[];
  bestFor?: string[];
  priceFactors?: string[];
  faqs?: FaqItem[];
};

export type LocationPageOverride = {
  titleAbsolute: string;
  description: string;
  keywords?: string[];
  h1: string;
  heroLead: string;
  /** H2 under the Local service eyebrow */
  sectionHeading: string;
  /** Lede under that H2 — Quill First remainder */
  sectionLede: string;
};

/** Split Quill "First" into H2 (opening sentence) + lede (rest). */
export function splitQuillFirst(first: string): {
  heading: string;
  lede: string;
  heroLead: string;
} {
  const match = first.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  if (!match) {
    return { heading: first, lede: first, heroLead: first };
  }
  return {
    heading: match[1],
    lede: match[2],
    heroLead: match[1],
  };
}

function locationOverride(
  titleAbsolute: string,
  h1: string,
  first: string,
  keywords: string[],
): LocationPageOverride {
  const { heading, lede, heroLead } = splitQuillFirst(first);
  return {
    titleAbsolute,
    description: first,
    keywords,
    h1,
    heroLead,
    sectionHeading: heading,
    sectionLede: lede,
  };
}

function serviceOverride(
  titleAbsolute: string,
  h1: string,
  first: string,
  keywords: string[],
  extras: Partial<
    Pick<
      ServicePageOverride,
      "includes" | "bestFor" | "priceFactors" | "faqs"
    >
  > = {},
): ServicePageOverride {
  const { heading, lede, heroLead } = splitQuillFirst(first);
  return {
    titleAbsolute,
    description: first,
    keywords,
    h1,
    heroLead,
    aboutHeading: heading,
    aboutBody: lede,
    ...extras,
  };
}

export const servicePageOverrides: Partial<
  Record<string, ServicePageOverride>
> = {
  "storm-debris-cleanup": {
    titleAbsolute:
      "Storm Damage Cleanup & Debris Removal | Evansville Tri-State",
    description:
      "Storm damage cleanup and storm debris removal for Evansville and the Tri-State. We haul fallen limbs, fencing, shingles, and soaked household contents when the site is safe — same-day after a storm when a route has space.",
    keywords: [
      "storm damage cleanup",
      "storm cleanup service",
      "storm cleanup",
      "storm debris removal",
      "storm clean up service",
      "storm debris cleanup Evansville",
      "storm damage cleanup Tri-State",
    ],
    h1: "Storm damage cleanup and debris removal",
    heroLead:
      "After a storm, you need storm debris and storm damage cleanup handled safely — not a generic junk haul. Uncle Sam Junk Removal clears fallen limbs, damaged fencing, loose shingles, soaked household contents, and other non-hazardous storm debris across Evansville and the Tri-State when the site is safe for our crew.",
    aboutHeading: "Storm cleanup service when the weather clears.",
    aboutBody:
      "Once utilities and structural hazards are under control, send photos of the pile and the access path. We load and haul storm debris you need gone — cut-up branches and limbs our crew can safely handle, blown fencing and outdoor items, bagged or piled shingles by prior review, and water-damaged household contents from flooded rooms or porches. Same-day storm cleanup may be available when a nearby route has space; call or text early with photos for the best chance. We are a hauling and debris-removal crew, not a tree service or roofing contractor — standing trees, live wires, and structural repairs need the right specialist first.",
    includes: [
      "Fallen limbs, cut branches, and brush piles",
      "Damaged fencing, outdoor furniture, and yard debris",
      "Loose or bagged shingles (flagged in advance for weight)",
      "Soaked or ruined household contents after storm damage",
    ],
    bestFor: [
      "Homes hit by wind, hail, or heavy rain",
      "Rentals and landlords after a storm",
      "Businesses clearing lots and outdoor areas",
    ],
    priceFactors: [
      "Debris volume and weight (especially wet materials)",
      "Site safety and truck access after the storm",
      "Cutting, sorting, or special disposal needs",
    ],
    faqs: [
      {
        question: "What does your storm damage cleanup include?",
        answer:
          "We remove non-hazardous storm debris your crew can safely load once the site is clear of live wires and structural hazards — fallen limbs and brush, damaged fencing and outdoor items, reviewed shingle piles, and soaked household contents. Roof repair, tree felling, and utility work are separate.",
      },
      {
        question:
          "Do you offer a storm cleanup service in Evansville and the Tri-State?",
        answer:
          "Yes. We provide storm cleanup and storm debris removal across Evansville, Newburgh, Henderson, Owensboro, and nearby Tri-State communities, scheduled by route after photos and an address check.",
      },
      {
        question: "How fast can storm cleanup start after a storm?",
        answer:
          "Same-day storm cleanup may be available when a nearby route has space. Text or call early with clear photos, your city, and access notes so we can confirm timing and an upfront price before work begins.",
      },
      {
        question:
          "What is the difference between storm debris removal and regular junk removal?",
        answer:
          "Storm debris removal focuses on weather-related piles — limbs, fencing, shingles, and water-damaged contents — often with urgent timing and heavier, wetter loads. Regular junk removal covers planned household or commercial clutter that is not tied to storm damage.",
      },
      {
        question: "Can you haul fallen trees and limbs?",
        answer:
          "We haul fallen limbs and cut branches that are safe for our crew to load. Large standing trees, technical tree work, and debris still tangled in power lines need a tree or utility professional before we can remove what is on the ground.",
      },
    ],
  },

  // Beacon garage service title/H1 retained (no Quill replacement for this URL).
  "garage-cleanout": serviceOverride(
    "Garage Cleanout in Newburgh & Evansville | Uncle Sam Junk Removal",
    "Garage cleanouts in Newburgh, Evansville, and the Tri-State.",
    "Need a garage cleanout in Newburgh or Evansville? We clear accumulated boxes, broken equipment, furniture, and bulky garage clutter across Warrick County, Vanderburgh County, and the wider Tri-State so you can park again without spending the weekend loading a trailer. Point out what stays and what goes in Newburgh, Evansville, or a nearby Tri-State community. We handle the lifting, loading, and hauling, then finish with a basic sweep of the cleared floor.",
    [
      "garage cleanout service Newburgh IN",
      "garage cleanout Newburgh",
      "garage cleanout Evansville",
      "garage cleanout Tri-State",
      "garage junk removal Newburgh IN",
    ],
    {
      faqs: [
        {
          question: "Do you offer garage cleanout service in Newburgh, IN?",
          answer:
            "Yes. We schedule garage cleanouts in Newburgh and nearby Warrick County along with Evansville and the Tri-State. Send photos and the pickup address for an upfront quote.",
        },
        {
          question: "How do I get a quote for a garage cleanout?",
          answer:
            "Text clear photos, your city, the approximate amount, and any stairs or access details. We’ll let you know whether photos are enough or a quick onsite look would help before sharing the final garage cleanout price.",
        },
        {
          question: "Do I need to move everything to the driveway?",
          answer:
            "Usually not. The crew can remove items from inside the garage when the access route is safe. Staging items near the door can reduce labor on some jobs.",
        },
        {
          question: "Are hauling and disposal included?",
          answer:
            "Yes. Standard loading, transportation, and disposal are included in the price you approve. Regulated, unusually heavy, or specialty materials may need a different plan, which we’ll explain before work begins.",
        },
      ],
    },
  ),

  "appliance-removal": serviceOverride(
    "Appliance Removal in Evansville | Fridge, Washer, Dryer, Stove",
    "Appliance removal once the old unit is unplugged and in the way.",
    "Refrigerators, washers, dryers, ranges, and freezers do not ride home in a sedan. Tell us the floor, the stairs, and whether the unit is already disconnected. We carry it out of Evansville houses, rentals, and the Tri-State towns on our routes. Quote before we lift. Text photos to (812) 610-1657.",
    [
      "appliance removal Evansville",
      "fridge removal Evansville",
      "washer dryer removal Evansville",
      "stove removal Evansville",
    ],
  ),

  "furniture-removal": serviceOverride(
    "Furniture Removal in Evansville | Couches, Beds, Desk Pickup",
    "Furniture removal from the room, not just from the curb.",
    "Sectionals, dressers, dining sets, and office desks get stuck in stairwells and tight doorways. We lift from inside Evansville homes, apartments, and offices, then haul the pieces away as one quoted job. Photos of the furniture and the path out are enough to price it. Call (812) 610-1657.",
    [
      "furniture removal Evansville",
      "couch removal Evansville",
      "desk pickup Evansville",
      "bed removal Evansville",
    ],
  ),

  "office-cleanouts": serviceOverride(
    "Office Cleanouts in Evansville | Desks, Cubicles, Suite Clear-Outs",
    "Office cleanouts planned around dock time, elevators, and building hours.",
    "A suite going empty still has desks, chairs, cubicles, shelving, and leftover electronics. We clear selected rooms or a whole floor and can split the work if you cannot go dark in one day. Elevator reservations, loading docks, and after-hours access in Evansville and nearby commercial buildings all go in the quote. (812) 610-1657.",
    [
      "office cleanouts Evansville",
      "office furniture removal Evansville",
      "cubicle removal Evansville",
      "suite clear out Evansville",
    ],
  ),

  "restaurant-equipment-removal": serviceOverride(
    "Restaurant Equipment Removal in Evansville | Closures and Remodels",
    "Restaurant equipment removal after the kitchen is disconnected.",
    "Prep tables, booths, stainless racks, and disconnected kitchen equipment do not roll out like household junk. Closures, remodels, and tenant turnovers in Evansville and the Tri-State need dimensions, doorway width, and dock or curb access before we commit the truck. We haul retired gear, not live utilities. Text photos to (812) 610-1657.",
    [
      "restaurant equipment removal Evansville",
      "commercial kitchen removal Evansville",
      "restaurant closure hauling Evansville",
    ],
  ),
};

export const locationPageOverrides: Partial<
  Record<string, LocationPageOverride>
> = {
  "evansville-in": locationOverride(
    "Junk Removal Evansville, IN | Local Pickup from Home Base",
    "Junk removal in Evansville, from downtown to the east side.",
    "Evansville is home base, not a satellite stop. We clear houses, apartments, rentals, and small job sites across Vanderburgh County: east side, west side, north side, and downtown. Send the street address and a few photos, and we will check today’s route before quoting. Call or text (812) 610-1657.",
    [
      "junk removal Evansville IN",
      "junk removal Evansville",
      "junk hauling Evansville",
      "Evansville home base junk removal",
    ],
  ),
  "newburgh-in": locationOverride(
    "Garage Cleanout in Newburgh, IN | Junk Removal & Hauling",
    "Garage cleanouts in Newburgh, plus the rest of the house if you want it gone.",
    "Most Newburgh jobs we book start in the garage: holiday bins, lawn gear, broken equipment, and furniture that never left the driveway. We empty attached and detached garages in Warrick County, then take household junk and bulky furniture on the same stop if you point us to it. Historic downtown and the river-bluff streets are on the same Newburgh route. Text photos to (812) 610-1657.",
    [
      "garage cleanout Newburgh IN",
      "garage cleanout Newburgh",
      "junk removal Newburgh IN",
      "junk hauling Newburgh",
    ],
  ),
  "henderson-ky": locationOverride(
    "Junk Removal in Henderson, KY | Scheduled Ohio River Pickups",
    "Henderson junk removal on a booked Kentucky route, not a daily loop.",
    "Henderson is across the Ohio from Evansville, so pickups follow a scheduled Henderson County run. We haul from houses, rentals, and shops once the address is on the route: furniture, appliances, cleanouts, and contractor debris. Timing depends on the next Kentucky crossing, not a standing daily loop. Send the address and photos, and we will give you the next Henderson window. (812) 610-1657.",
    [
      "junk removal Henderson KY",
      "junk hauling Henderson",
      "Henderson County junk removal",
    ],
  ),
  "owensboro-ky": locationOverride(
    "Junk Removal in Owensboro, KY | Homes, Shops, and Cleanouts",
    "Owensboro junk removal for river-city homes, offices, and restaurant gear.",
    "Owensboro sits farther down the Ohio than Henderson, so we price the haul before the truck rolls that far. Typical Daviess County jobs: household furniture, estate cleanouts, office contents, and disconnected restaurant equipment. Photos of the pile and the access path are enough to start. Call (812) 610-1657.",
    [
      "junk removal Owensboro KY",
      "junk hauling Owensboro",
      "Owensboro cleanouts",
    ],
  ),
  "princeton-in": locationOverride(
    "Junk Removal in Princeton, IN | Gibson County Route",
    "Princeton junk removal for houses, garages, and shop contents.",
    "Princeton is a Gibson County run up US 41, north of Evansville. We book household furniture, garage and estate cleanouts, and shop contents when they fit the next Princeton trip. This is not a daily city loop, so the street address matters. Share it with photos and we will put you on the next run. (812) 610-1657.",
    [
      "junk removal Princeton IN",
      "Gibson County junk removal",
      "Princeton IN junk hauling",
    ],
  ),
};

export const locationsIndexCopy = {
  titleAbsolute: "Junk Removal Near Evansville | Nine Tri-State Service Cities",
  h1: "Nine junk-removal routes dispatched from Evansville, IN.",
  first:
    "We dispatch from Evansville and cover the Tri-State by county route: Vanderburgh, Warrick, Gibson, and Posey in Indiana; Henderson and Daviess in Kentucky; Wabash County in Illinois. Same crew and same number in every city. The pages below are for local timing and typical jobs. If your town is not listed, still text the pickup address to (812) 610-1657.",
} as const;
