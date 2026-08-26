/**
 * Page-level SEO and copy overrides for GSC query gaps.
 * Keep these on existing canonical URLs — do not add doorway routes.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePageOverride = {
  titleAbsolute: string;
  description: string;
  keywords: string[];
  h1: string;
  heroLead: string;
  aboutHeading: string;
  aboutBody: string;
  includes: string[];
  bestFor: string[];
  priceFactors: string[];
  faqs: FaqItem[];
};

export type LocationPageOverride = {
  titleAbsolute: string;
  description: string;
  keywords: string[];
  h1: string;
  heroLead: string;
  garageSection: {
    eyebrow: string;
    heading: string;
    body: string;
    serviceHref: string;
    serviceLabel: string;
  };
};

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
        question: "Do you offer a storm cleanup service in Evansville and the Tri-State?",
        answer:
          "Yes. We provide storm cleanup and storm debris removal across Evansville, Newburgh, Henderson, Owensboro, and nearby Tri-State communities, scheduled by route after photos and an address check.",
      },
      {
        question: "How fast can storm cleanup start after a storm?",
        answer:
          "Same-day storm cleanup may be available when a nearby route has space. Text or call early with clear photos, your city, and access notes so we can confirm timing and an upfront price before work begins.",
      },
      {
        question: "What is the difference between storm debris removal and regular junk removal?",
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
  "garage-cleanout": {
    titleAbsolute:
      "Garage Cleanout in Newburgh & Evansville | Uncle Sam Junk Removal",
    description:
      "Garage cleanout service for Newburgh, Evansville, and the Tri-State. We clear boxes, broken equipment, furniture, and bulky garage clutter so you can reclaim parking and storage space.",
    keywords: [
      "garage cleanout service Newburgh IN",
      "garage cleanout Newburgh",
      "garage cleanout Evansville",
      "garage cleanout Tri-State",
      "garage junk removal Newburgh IN",
    ],
    h1: "Garage cleanouts in Newburgh, Evansville, and the Tri-State.",
    heroLead:
      "Need a garage cleanout in Newburgh or Evansville? We clear accumulated boxes, broken equipment, furniture, and bulky garage clutter across Warrick County, Vanderburgh County, and the wider Tri-State so you can park again without spending the weekend loading a trailer.",
    aboutHeading: "An easier way to reclaim the garage.",
    aboutBody:
      "Point out what stays and what goes in Newburgh, Evansville, or a nearby Tri-State community. We handle the lifting, loading, and hauling, then finish with a basic sweep of the cleared floor. Sorting help, heavy items, and same-visit furniture or appliance removal can be included when you describe the full project up front.",
    includes: [
      "Boxes and household overflow",
      "Old tools and equipment",
      "Furniture and bulky garage items",
    ],
    bestFor: [
      "Seasonal decluttering in Newburgh and Evansville",
      "Moving preparation",
      "Property turnovers and landlord cleanouts",
    ],
    priceFactors: ["Volume", "Heavy items", "Sorting and access"],
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
};

export const locationPageOverrides: Partial<
  Record<string, LocationPageOverride>
> = {
  "newburgh-in": {
    titleAbsolute:
      "Garage Cleanout & Junk Removal in Newburgh, IN | Uncle Sam Junk Removal",
    description:
      "Garage cleanout and junk removal in Newburgh, IN and Warrick County. Veteran-owned crew for garage clutter, furniture, appliances, and property cleanouts with an upfront quote.",
    keywords: [
      "garage cleanout service Newburgh IN",
      "garage cleanout Newburgh",
      "junk removal Newburgh IN",
      "junk hauling Newburgh",
      "property cleanout Newburgh IN",
    ],
    h1: "Garage cleanout and junk removal in Newburgh, IN.",
    heroLead:
      "Full-service garage cleanouts, junk hauling, furniture removal, and bulky-item pickup for Newburgh homeowners, renters, landlords, and businesses across Warrick County.",
    garageSection: {
      eyebrow: "Newburgh garage cleanouts",
      heading: "Clear the garage in Newburgh and Warrick County.",
      body: "From packed two-car garages near downtown Newburgh to workshops and rental turnovers across Warrick County, we haul the boxes, broken gear, and bulky items you no longer need. Tell us what stays, send a few photos, and we’ll quote the cleanout before we load — then finish with a basic sweep so you can use the space again.",
      serviceHref: "/services/garage-cleanout",
      serviceLabel: "Garage cleanout service details",
    },
  },
};
