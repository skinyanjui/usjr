/**
 * Unique page copy for existing canonical URLs + marketing hubs.
 * Beacon locks: do not rewrite /contact, /services/storm-debris-cleanup,
 * or /services/garage-cleanout titles beyond prior Beacon work.
 * No invented street, ZIP in body, 68% landfill, $25 guarantee, or “#1”.
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
  aboutParagraphs: string[];
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
  sectionHeading: string;
  sectionParagraphs: string[];
  faqs: FaqItem[];
};

const needToBeHomeFaq: FaqItem = {
  question: "Do I need to be home?",
  answer:
    "For anything inside, someone needs to let us in. A curb pile can be discussed when you text.",
};

function paras(...paragraphs: string[]) {
  return paragraphs;
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
    ],
    h1: "Storm damage cleanup and debris removal",
    heroLead:
      "After a storm, you need storm debris and storm damage cleanup handled safely — not a generic junk haul. Uncle Sam Junk Removal clears fallen limbs, damaged fencing, loose shingles, soaked household contents, and other non-hazardous storm debris across Evansville and the Tri-State when the site is safe for our crew.",
    aboutHeading: "Storm cleanup service when the weather clears.",
    aboutParagraphs: [
      "Once utilities and structural hazards are under control, send photos of the pile and the access path. We load and haul storm debris you need gone — cut-up branches and limbs our crew can safely handle, blown fencing and outdoor items, bagged or piled shingles by prior review, and water-damaged household contents from flooded rooms or porches. Same-day storm cleanup may be available when a nearby route has space; call or text early with photos for the best chance. We are a hauling and debris-removal crew, not a tree service or roofing contractor — standing trees, live wires, and structural repairs need the right specialist first.",
    ],
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

  // Beacon garage-cleanout — do not rewrite beyond prior Beacon lock.
  "garage-cleanout": {
    titleAbsolute:
      "Garage Cleanout in Newburgh & Evansville | Uncle Sam Junk Removal",
    description:
      "Garage cleanout service for Newburgh, Evansville, and the Tri-State. We clear boxes, broken equipment, furniture, and bulky garage clutter so you can reclaim parking and storage space.",
    keywords: [
      "garage cleanout service Newburgh IN",
      "garage cleanout Newburgh",
      "garage cleanout Evansville",
    ],
    h1: "Garage cleanouts in Newburgh, Evansville, and the Tri-State.",
    heroLead:
      "Need a garage cleanout in Newburgh or Evansville? We clear accumulated boxes, broken equipment, furniture, and bulky garage clutter across Warrick County, Vanderburgh County, and the wider Tri-State so you can park again without spending the weekend loading a trailer.",
    aboutHeading: "An easier way to reclaim the garage.",
    aboutParagraphs: [
      "Point out what stays and what goes in Newburgh, Evansville, or a nearby Tri-State community. We handle the lifting, loading, and hauling, then finish with a basic sweep of the cleared floor. Sorting help, heavy items, and same-visit furniture or appliance removal can be included when you describe the full project up front.",
    ],
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

  "appliance-removal": {
    titleAbsolute:
      "Appliance Removal in Evansville and the Tri-State | Uncle Sam Junk Removal",
    description:
      "Appliance removal for refrigerators, washers, dryers, and ranges in Evansville and the Tri-State. Quote before we lift. Text photos to (812) 610-1657.",
    keywords: [
      "appliance removal Evansville",
      "fridge removal Evansville",
      "washer dryer removal Tri-State",
    ],
    h1: "Appliance removal for refrigerators, washers, dryers, and ranges.",
    heroLead:
      "The old refrigerator, washer, dryer, range, or freezer has to come out once it is unplugged.",
    aboutHeading:
      "The old refrigerator, washer, dryer, range, or freezer has to come out once it is unplugged.",
    aboutParagraphs: paras(
      "Tell us the floor, the stairs, and whether doors need to come off. We carry the unit from Evansville homes and the Tri-State towns on our routes. Quote before we lift. Text photos to (812) 610-1657.",
      "City heavy trash in Evansville will take some appliances, but a fridge or freezer must already have refrigerant recovered and tagged, and you still have to get it to the curb. Apartments and county addresses are not on that program.",
    ),
    faqs: [
      {
        question: "Do I need to disconnect the appliance first?",
        answer:
          "Tell us whether it is unplugged and whether refrigerant, water, or gas is involved. We explain options before we quote. We do not advertise Freon recovery we have not published.",
      },
      {
        question: "Can you take a fridge from a basement?",
        answer:
          "Often yes if the stairs and path are safe. Photos of the route help us price the carry.",
      },
      {
        question: "How much is fridge removal?",
        answer:
          "A single bulky appliance often falls in the published single-item planning range of about $89–149. Stairs, weight, and refrigerant handling can change the number. You approve the onsite price before we lift.",
      },
      {
        question: "Can you combine appliance removal with a garage cleanout?",
        answer:
          "Yes. Describe the whole pile so we can quote one stop.",
      },
      {
        question: "City heavy trash vs your crew for appliances?",
        answer:
          "City heavy trash is curb-only for eligible Evansville residents, and fridges must already be recovered and tagged. We come inside and serve apartments and county addresses the city program does not cover.",
      },
      {
        question: "Do I have to empty and unplug the fridge?",
        answer:
          "Empty and unplug if you can. Tell us if it still has food, water, or gas attached. Mention refrigerant so we can explain options before we quote.",
      },
      needToBeHomeFaq,
    ],
  },

  "furniture-removal": {
    titleAbsolute:
      "Furniture Removal in Evansville and the Tri-State | Uncle Sam Junk Removal",
    description:
      "Furniture removal from inside the room in Evansville and the Tri-State. Couches, beds, desks, and more. Call (812) 610-1657.",
    keywords: [
      "furniture removal Evansville",
      "couch removal Tri-State",
      "desk pickup Evansville",
    ],
    h1: "Furniture removal from inside the room, not just the curb.",
    heroLead:
      "Sectionals, dressers, dining sets, and office desks get stuck in stairwells and tight doorways.",
    aboutHeading:
      "Sectionals, dressers, dining sets, and office desks get stuck in stairwells and tight doorways.",
    aboutParagraphs: paras(
      "We lift from inside Evansville homes, apartments, and offices, then haul the pieces as one quoted job. You do not have to drag a couch to the street. Photos of the furniture and the path out are enough to price it. Call (812) 610-1657.",
    ),
    faqs: [
      {
        question: "Will you take a sectional apart?",
        answer:
          "If sections disconnect, we usually can. Tell us about stairs and doorways in the photos.",
      },
      {
        question: "Can a bed set go in one pickup?",
        answer:
          "Yes. Mattresses, box springs, and frames can ride together when you want them gone.",
      },
      {
        question: "Do you do apartments and elevators?",
        answer:
          "Yes. Share building access rules and elevator reservations when you book.",
      },
      {
        question: "City heavy trash vs your crew for furniture?",
        answer:
          "City heavy trash is one curb item for eligible Evansville residents. We remove furniture from inside when you cannot or will not drag it to the street.",
      },
      {
        question: "Is same-day furniture pickup available?",
        answer:
          "It may be when a nearby route has space. Text photos early. It is not a promise for every address.",
      },
      needToBeHomeFaq,
    ],
  },

  "office-cleanouts": {
    titleAbsolute:
      "Office Cleanouts in Evansville and the Tri-State | Uncle Sam Junk Removal",
    description:
      "Office cleanouts planned around docks, elevators, and building hours in Evansville and the Tri-State. Call (812) 610-1657.",
    keywords: [
      "office cleanouts Evansville",
      "office furniture removal Tri-State",
      "cubicle removal Evansville",
    ],
    h1: "Office cleanouts planned around docks, elevators, and building hours.",
    heroLead:
      "A suite going empty still has desks, chairs, cubicles, shelving, and leftover electronics.",
    aboutHeading:
      "A suite going empty still has desks, chairs, cubicles, shelving, and leftover electronics.",
    aboutParagraphs: paras(
      "We clear selected rooms or a whole floor, and we can split the work if you cannot go dark in one day. Elevator reservations, loading docks, and after-hours access in Evansville commercial buildings go in the quote. (812) 610-1657. This is not household junk removal with the word “office” swapped in.",
    ),
    faqs: [
      {
        question: "Can you work after hours?",
        answer:
          "Often yes when building access allows. Put the window in the quote request.",
      },
      {
        question: "What about bolted desks or built-in benches?",
        answer:
          "Tell us how they are fastened. Non-structural tear-out can be part of the plan when photos show the work.",
      },
      {
        question: "Will you take old computers?",
        answer:
          "We can include retired electronics as part of an office cleanout. Wipe or remove drives yourself if you need data destroyed. We do not ask for passwords.",
      },
      {
        question: "Can the cleanout be phased?",
        answer:
          "Yes. We can clear wings or floors across visits when you cannot empty the suite in one day.",
      },
      {
        question: "Do you work with property managers?",
        answer:
          "Yes. For rental turnovers, see /services/property-management-turnovers as well.",
      },
      {
        question: "Are you insured? Does my building need a certificate?",
        answer:
          "We are licensed and insured. If the building or HOA needs a certificate, ask when you book.",
      },
      needToBeHomeFaq,
    ],
  },

  "restaurant-equipment-removal": {
    titleAbsolute:
      "Restaurant Equipment Removal in Evansville and the Tri-State | Uncle Sam Junk Removal",
    description:
      "Restaurant equipment removal after the kitchen is disconnected in Evansville and the Tri-State. Text photos to (812) 610-1657.",
    keywords: [
      "restaurant equipment removal Evansville",
      "commercial kitchen removal Tri-State",
    ],
    h1: "Restaurant equipment removal after the kitchen is disconnected.",
    heroLead:
      "Prep tables, booths, stainless racks, and disconnected kitchen equipment do not roll out like a couch.",
    aboutHeading:
      "Prep tables, booths, stainless racks, and disconnected kitchen equipment do not roll out like a couch.",
    aboutParagraphs: paras(
      "Closures, remodels, and tenant turnovers need dimensions, doorway width, and dock or curb access before we commit the truck. We haul retired gear from Evansville and Tri-State kitchens, not live utilities. Text photos to (812) 610-1657.",
    ),
    faqs: [
      {
        question: "Do you disconnect gas, grease lines, or refrigeration?",
        answer:
          "No. Utilities must already be disconnected. We haul retired gear after that work is done.",
      },
      {
        question: "Do you need measurements for coolers?",
        answer:
          "Yes. Send dimensions, doorway width, and loading access so we can plan the truck.",
      },
      {
        question: "Can this wait for an Owensboro or Henderson route?",
        answer:
          "Often yes. We price the haul and match it to the next Kentucky window when that is the right fit.",
      },
      {
        question: "Can dining room and kitchen go in one job?",
        answer:
          "Yes. Describe both areas so we can quote one stop.",
      },
      {
        question: "Is same-day restaurant equipment removal available?",
        answer:
          "It may be when a nearby route has space and the equipment is already disconnected. Photos first.",
      },
      needToBeHomeFaq,
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
      "Garage cleanout and junk removal in Newburgh, IN and Warrick County. Text photos to (812) 610-1657.",
    keywords: [
      "garage cleanout Newburgh IN",
      "junk removal Newburgh IN",
      "garage cleanout Warrick County",
    ],
    h1: "Garage cleanout and junk removal in Newburgh, IN.",
    heroLead:
      "Most Newburgh jobs we book start in the garage. Holiday bins, lawn gear, broken equipment, and furniture that never left the driveway.",
    sectionHeading: "Most Newburgh jobs we book start in the garage.",
    sectionParagraphs: paras(
      "Holiday bins, lawn gear, broken equipment, and furniture that never left the driveway.",
      "We empty attached and detached garages in Warrick County, then take household junk from the same house if you point us to it. Historic downtown and the Ohio River bluff streets are on this Newburgh route. This is not an Evansville page with the city name swapped.",
      "Warrick County addresses are not on Evansville’s free heavy-trash list. If the pile is more than one curb item, or you do not want to drag it to the street, text photos to (812) 610-1657.",
    ),
    faqs: [
      {
        question:
          "Do you do garage cleanouts in Newburgh, not just junk removal?",
        answer:
          "Yes. Garage cleanout is the main Newburgh job. Boxes, tools, furniture, and bulky clutter come out of the garage. We can add the rest of the house on the same stop.",
      },
      {
        question: "How much is a Newburgh garage cleanout?",
        answer:
          "Price follows how much of the truck the garage fills, plus weight, access, and any special disposal. Use the homepage ranges as a planning guide. You approve the onsite price before we load.",
      },
      {
        question: "Do I have to carry everything to the driveway?",
        answer:
          "No. If we can reach it safely, we lift from inside the garage. A clear path to the door helps.",
      },
      {
        question:
          "Can you take a fridge or mower that has been sitting in the garage?",
        answer:
          "Tell us what it is. We take most household appliances and bulky gear. Paint, fuel, and refrigerant-containing units need a heads-up so we can explain options. We do not haul hazardous materials.",
      },
      {
        question: "Are you in Newburgh the same day as Evansville?",
        answer:
          "Sometimes, if that Warrick route has space. Text photos early. If not today, we will give you the next Newburgh window.",
      },
      {
        question: "Is this the old /locations/newburgh page?",
        answer:
          "No. This is the live Newburgh page: /locations/newburgh-in. Bookmark this URL.",
      },
      needToBeHomeFaq,
    ],
  },

  "evansville-in": {
    titleAbsolute:
      "Junk Removal Evansville, IN | East Side, West Side & Downtown",
    description:
      "Junk removal in Evansville, IN. Home-base routes across Vanderburgh County. Call (812) 610-1657.",
    keywords: [
      "junk removal Evansville",
      "junk removal Evansville IN",
      "junk hauling Evansville",
      "Evansville heavy trash alternative",
    ],
    h1: "Junk removal in Evansville, from downtown to the east side.",
    // Quill lock: no hero lede — uniqueness lives in the Local-service block only.
    heroLead: "",
    sectionHeading: "Evansville is home base in Vanderburgh County.",
    sectionParagraphs: paras(
      "We clear houses, apartments, rentals, and small job sites on the east side, west side, north side, and downtown.",
      "City heavy trash (Republic / EWSU) is a good free option if you live in the city, pay trash on your water bill, can get one item to the curb, and can wait for a scheduled pickup. It does not cover apartments, county addresses, businesses, or a whole garage.",
      "We come inside, take the whole agreed pile in one stop, and check today’s Evansville route before quoting. Send the address and photos, or call (812) 610-1657.",
    ),
    faqs: [
      {
        question: "How much is junk removal in Evansville?",
        answer:
          "Planning ranges on our homepage: about $89–149 for a single bulky item, $179–249 for a ¼ load, $289–389 for a ½ load, $489–649 for a full load. Volume, weight, stairs, and special disposal change the number. You see the price before we start.",
      },
      {
        question: "Can I just use city heavy trash instead?",
        answer:
          "If you are an eligible city resident with one curb item, yes. Schedule it with Republic / EWSU. Call us when the pile is bigger than one item, you cannot lift it, you are in an apartment or outside city limits, or you need it gone from inside the house.",
      },
      {
        question: "Do you take refrigerators in Evansville?",
        answer:
          "Yes, as appliance removal. Tell us if it is still connected and whether refrigerant is involved. City heavy trash only takes fridges that are already recovered and tagged. We will explain options before we quote.",
      },
      {
        question: "Do you serve the east side, west side, and downtown?",
        answer:
          "Yes. Evansville is the home route. Send the exact street address so we can confirm today’s truck.",
      },
      {
        question: "Is same-day real?",
        answer:
          "It may be when a nearby Evansville route has space. Photos early in the day help. It is not a $25 guarantee and not a promise for every address.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes. Veteran-owned, based in Evansville. No public street address on this site.",
      },
      {
        question: "Does city heavy trash stop in the fall?",
        answer:
          "Yes. EWSU/Republic pauses heavy trash during fall leaf collection, November through mid-December. If you cannot wait, or you have more than one curb item, text photos to (812) 610-1657.",
      },
      needToBeHomeFaq,
    ],
  },

  "henderson-ky": {
    titleAbsolute: "Junk Removal in Henderson, KY | Uncle Sam Junk Removal",
    description:
      "Junk removal in Henderson, KY means a scheduled Kentucky crossing of the Ohio — not an Evansville same-day loop. Call (812) 610-1657.",
    keywords: [
      "junk removal Henderson KY",
      "Henderson County junk hauling",
      "junk removal across the Ohio",
    ],
    h1: "Junk removal in Henderson, KY.",
    heroLead:
      "Henderson pickups mean a Kentucky crossing of the Ohio, not a same-day Evansville loop.",
    sectionHeading:
      "Henderson pickups mean a Kentucky crossing of the Ohio, not a same-day Evansville loop.",
    sectionParagraphs: paras(
      "We book Henderson County houses, rentals, and shops on a scheduled run: furniture, appliances, cleanouts, and contractor debris along the river-city side of the metro.",
      "Evansville city heavy trash does not apply in Kentucky. Send the address and photos. We will give you the next Henderson window. (812) 610-1657.",
    ),
    faqs: [
      {
        question: "Do you come to Henderson every day?",
        answer:
          "We come to Henderson on a booked Kentucky route, not a daily loop.",
      },
      {
        question: "How do I get a Henderson quote?",
        answer:
          "Text photos, the address, and stairs or access notes. Approve the price before we load.",
      },
      {
        question: "Can you haul restaurant or shop equipment?",
        answer:
          "Yes if it is disconnected. Send measurements and doorway width.",
      },
      {
        question: "Is same-day Henderson pickup available?",
        answer:
          "Only if that Kentucky run has space. Photos early help us say yes or give the next window.",
      },
      {
        question: "Does someone need to meet the truck?",
        answer:
          "Someone who can give access helps, especially for indoor piles.",
      },
      {
        question: "Can I wait for Henderson’s spring cleanup instead?",
        answer:
          "City spring cleanup takes limbs, broken furniture, and yard debris on scheduled days. It will not take refrigerators, air conditioners, paint, tires, batteries, or oil. If you missed those days, or have a fridge the city will not take, we book a Henderson route. (812) 610-1657.",
      },
    ],
  },

  "owensboro-ky": {
    titleAbsolute: "Junk Removal in Owensboro, KY | Uncle Sam Junk Removal",
    description:
      "Owensboro junk removal for river-city homes, offices, and restaurant gear in Daviess County. Farther down the Ohio than Henderson. Call (812) 610-1657.",
    keywords: [
      "junk removal Owensboro KY",
      "Owensboro cleanouts",
      "Daviess County junk hauling",
    ],
    h1: "Junk removal in Owensboro, KY.",
    heroLead:
      "Owensboro sits farther down the Ohio than Henderson, so we price the Daviess County haul before the truck rolls that far.",
    sectionHeading:
      "Owensboro sits farther down the Ohio than Henderson, so we price the Daviess County haul before the truck rolls that far.",
    sectionParagraphs: paras(
      "Typical jobs: household furniture, estate cleanouts, office contents, and disconnected restaurant equipment in the river city. Photos of the pile and the path out are enough to start. Call (812) 610-1657.",
    ),
    faqs: [
      {
        question: "Can a small couch wait for the next Owensboro trip?",
        answer:
          "Often yes. We match small jobs to the next Daviess County window when that keeps the haul practical.",
      },
      {
        question: "Do you remove restaurant equipment in Owensboro?",
        answer:
          "Yes if it is disconnected. Send dimensions and access photos.",
      },
      {
        question: "Do the same volume price ranges apply?",
        answer:
          "Yes. Volume, weight, and access still drive the quote. Distance affects timing more than the published planning ranges.",
      },
      {
        question: "Is same-day Owensboro pickup likely?",
        answer:
          "Usually not. Plan on a booked route unless a nearby run already has space.",
      },
      {
        question: "Do you clear offices and shops?",
        answer: "Yes. Describe the suite or storefront and loading access.",
      },
      {
        question: "Owensboro Sanitation already does bulky pickup. Why call you?",
        answer:
          "The city special-load program is curb-only. They will not come onto the property or down the alley. If the pile is inside, you cannot lift it, or you need more than a curb set-out, we load from the house or shop. Photos first.",
      },
    ],
  },

  "princeton-in": {
    titleAbsolute: "Junk Removal in Princeton, IN | Uncle Sam Junk Removal",
    description:
      "Princeton junk removal on a Gibson County run up US 41, north of Evansville. Houses, garages, and shop contents. Call (812) 610-1657.",
    keywords: [
      "junk removal Princeton IN",
      "Gibson County junk removal",
      "US 41 junk hauling",
    ],
    h1: "Junk removal in Princeton, IN.",
    heroLead:
      "Princeton is a Gibson County run up US 41, north of Evansville.",
    sectionHeading:
      "Princeton is a Gibson County run up US 41, north of Evansville.",
    sectionParagraphs: paras(
      "We book household furniture, garage and estate cleanouts, and shop contents when they fit the next Princeton trip up the US 41 corridor. Not a daily city loop, so the street address matters. Share it with photos. (812) 610-1657.",
    ),
    faqs: [
      {
        question: "When do you come to Princeton?",
        answer:
          "When the US 41 / Gibson County route is running. Send the address so we can place you on the next trip.",
      },
      {
        question: "Houses and shops?",
        answer: "Yes. Household furniture, garages, estates, and shop contents.",
      },
      {
        question: "Can you clear a whole garage?",
        answer:
          "Yes. Volume-priced like other cleanouts. Photos help estimate the load.",
      },
      {
        question: "Should I count on same-day?",
        answer: "Do not count on it. Book the next Princeton window.",
      },
      {
        question: "What will you not take?",
        answer:
          "No fuels, unidentified chemicals, asbestos, biohazards, medical waste, or explosives. Tell us about paint and refrigerant appliances before we quote.",
      },
    ],
  },

  "boonville-in": {
    titleAbsolute: "Junk Removal in Boonville, IN | Uncle Sam Junk Removal",
    description:
      "Junk removal in Boonville, IN on the Warrick County route. Call (812) 610-1657.",
    keywords: ["junk removal Boonville IN", "Warrick County junk removal"],
    h1: "Junk removal in Boonville, IN.",
    heroLead:
      "Boonville is the Warrick County seat, inland from Newburgh’s river bluff.",
    sectionHeading:
      "Boonville is the Warrick County seat, inland from Newburgh’s river bluff.",
    sectionParagraphs: paras(
      "Jobs here are often courthouse-square houses, rentals, garages, and storage units, not waterfront cleanouts. We add Boonville stops when the Warrick route is already running. Text the address and photos to (812) 610-1657.",
    ),
    faqs: [
      {
        question: "Same crew as Newburgh?",
        answer:
          "Yes. Same Warrick County crew. Boonville is inland; Newburgh covers the river-bluff streets.",
      },
      {
        question: "Storage units and rentals?",
        answer: "Yes. We need gate codes or keys and unit access details.",
      },
      {
        question: "Do you need a key or gate code?",
        answer:
          "Yes when the pickup is behind a gate or in a locked unit. Send that with the photos.",
      },
      {
        question: "Same-day in Boonville?",
        answer:
          "Only if that Warrick run has space. Otherwise we give you the next window.",
      },
      {
        question: "How is pricing set?",
        answer:
          "Volume, weight, and access — same published homepage planning ranges. You approve the onsite price before we load.",
      },
    ],
  },

  "mount-carmel-il": {
    titleAbsolute: "Junk Removal in Mount Carmel, IL | Uncle Sam Junk Removal",
    description:
      "Junk removal in Mount Carmel, IL on a grouped Illinois route. Call (812) 610-1657.",
    keywords: ["junk removal Mount Carmel IL", "Wabash County junk removal"],
    h1: "Junk removal in Mount Carmel, IL.",
    heroLead:
      "Mount Carmel is our Illinois stop, across the Wabash in Wabash County.",
    sectionHeading:
      "Mount Carmel is our Illinois stop, across the Wabash in Wabash County.",
    sectionParagraphs: paras(
      "We group those pickups on an Illinois route rather than treating them like a Southern Indiana daily loop. Household furniture, cleanouts, and shop contents are the usual jobs. Send the address and photos for the next Mount Carmel window. (812) 610-1657.",
    ),
    faqs: [
      {
        question: "Do you really work in Illinois?",
        answer:
          "Yes. Mount Carmel is on a grouped Illinois route, not a daily Southern Indiana loop.",
      },
      {
        question: "How do you price Illinois jobs?",
        answer:
          "Volume, weight, and access still drive the quote. Timing follows the next Illinois window.",
      },
      {
        question: "Hazardous materials?",
        answer:
          "We do not haul asbestos, biohazards, medical waste, explosives, fuels, or unidentified chemicals.",
      },
      {
        question: "Same-day Mount Carmel?",
        answer: "Do not plan on same-day. Photos first for the next window.",
      },
      {
        question: "What should I send?",
        answer: "The pickup address and clear photos of the pile and path out.",
      },
    ],
  },

  "mount-vernon-in": {
    titleAbsolute: "Junk Removal in Mount Vernon, IN | Uncle Sam Junk Removal",
    description:
      "Junk removal in Mount Vernon, IN and Posey County. Call (812) 610-1657.",
    keywords: ["junk removal Mount Vernon IN", "Posey County junk removal"],
    h1: "Junk removal in Mount Vernon, IN.",
    heroLead:
      "Mount Vernon sits on the Ohio at the west edge of the metro, in Posey County.",
    sectionHeading:
      "Mount Vernon sits on the Ohio at the west edge of the metro, in Posey County.",
    sectionParagraphs: paras(
      "We schedule river-town houses, rentals, and businesses, plus yard and storm piles after high water or wind. Same Evansville crew, different county route. Send the address and photos. (812) 610-1657.",
    ),
    faqs: [
      {
        question: "Do you take storm debris in Mount Vernon?",
        answer:
          "Yes, non-hazardous storm debris when the site is safe. See also /services/storm-debris-cleanup.",
      },
      {
        question: "Is this Evansville city heavy trash?",
        answer:
          "No. Mount Vernon is Posey County. City heavy trash in Evansville does not cover this route.",
      },
      {
        question: "Houses and businesses?",
        answer: "Yes. River-town homes, rentals, and shops on the Posey route.",
      },
      {
        question: "Same-day Mount Vernon?",
        answer:
          "Only if that Posey run has space. Photos early help us confirm.",
      },
    ],
  },

  "new-harmony-in": {
    titleAbsolute: "Junk Removal in New Harmony, IN | Uncle Sam Junk Removal",
    description:
      "Junk removal in New Harmony, IN for older houses, sheds, and estates. Call (812) 610-1657.",
    keywords: ["junk removal New Harmony IN", "Posey County estate cleanout"],
    h1: "Junk removal in New Harmony, IN.",
    heroLead:
      "New Harmony is a small Posey County town of older houses, sheds, and estate contents, not a high-volume city loop.",
    sectionHeading:
      "New Harmony is a small Posey County town of older houses, sheds, and estate contents, not a high-volume city loop.",
    sectionParagraphs: paras(
      "Access can be tight on historic streets, so photos of the path out matter as much as the pile. We match the job to an upcoming Posey County route. Text (812) 610-1657.",
    ),
    faqs: [
      {
        question: "Will your truck fit?",
        answer:
          "Photos of the approach help us plan. Tight historic streets are common here.",
      },
      {
        question: "Estate cleanouts?",
        answer: "Yes. Room-by-room or phased removal is available.",
      },
      {
        question: "Same-day New Harmony?",
        answer: "Rare. Plan on the next Posey County window.",
      },
      {
        question: "Small sheds?",
        answer:
          "Yes if utilities are disconnected. See /services/shed-removal for shed-specific details.",
      },
      {
        question: "Do you carry from inside?",
        answer:
          "Yes when the path is safe. You usually do not have to stage everything at the curb.",
      },
    ],
  },
};

export const locationsIndexCopy = {
  titleAbsolute:
    "Junk Removal Locations in the Evansville Tri-State | Uncle Sam Junk Removal",
  h1: "Nine junk-removal routes dispatched from Evansville, IN.",
  paragraphs: paras(
    "We serve nine cities across Southern Indiana, Western Kentucky, and Southeast Illinois: Evansville, Newburgh, Boonville, Princeton, Mount Vernon, New Harmony, Henderson, Owensboro, and Mount Carmel.",
    "Every route uses the same local crew and phone number. Open your city for local service details, or text the pickup address to (812) 610-1657 if your town is nearby but not listed.",
  ),
  faqs: [
    {
      question: "Which cities are on listed routes?",
      answer:
        "Evansville, Newburgh, Boonville, Princeton, Mount Vernon, New Harmony, Henderson, Owensboro, and Mount Carmel. Nearby addresses may still be possible — text the pickup address.",
    },
    {
      question: "How is Evansville different from Newburgh or Kentucky?",
      answer:
        "Evansville is the home-base daily route. Newburgh and Boonville share Warrick County timing. Henderson and Owensboro are booked Kentucky crossings, not a same-day Evansville loop.",
    },
    {
      question: "Is there one phone number for every city?",
      answer: "Yes. Call or text (812) 610-1657 for every listed city.",
    },
    {
      question: "Do you publish a street address?",
      answer: "No. We are based in Evansville, IN without a public street address on this site.",
    },
    {
      question: "Is this page for booking or for coverage?",
      answer:
        "This page is where we go. The homepage quote form is how you book.",
    },
  ],
} as const;

/** Locked Beacon titles/H1 for new hubs — do not use stale brief titles. */
export const aboutPageCopy = {
  titleAbsolute: "About Uncle Sam Junk Removal | Evansville, IN",
  h1: "About Uncle Sam Junk Removal",
  paragraphs: paras(
    "Uncle Sam Junk Removal is a veteran-owned, licensed, and insured local crew dispatched from Evansville across the Tri-State.",
    "Our work is full service: you point out what needs to go, we confirm the scope and price, then the crew lifts, loads, hauls, and gives the cleared area a basic sweep. You approve the final price before work begins.",
    "We help homeowners, renters, families, property managers, contractors, offices, restaurants, and warehouses across Southern Indiana, Western Kentucky, and Southeast Illinois. One local number follows the project from the first photos through the completed pickup.",
  ),
  faqs: [
    {
      question: "Who runs the trucks?",
      answer:
        "A local veteran-owned crew, not a franchise. One number for every city we list.",
    },
    {
      question: "Where are you based?",
      answer: "Evansville, IN. No street address on this site.",
    },
    {
      question: "How does a job actually start?",
      answer:
        "Text photos and the pickup address, or use the homepage quote form. We confirm the route, then the price, then we load.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Yes. If a building or HOA needs a certificate, ask when you book.",
    },
    {
      question: "What is off limits?",
      answer:
        "Asbestos, biohazards, medical waste, explosives, fuels, unidentified chemicals, and other hazardous materials. Tell us about paint, refrigerant appliances, and pressurized containers.",
    },
  ],
} as const;

export const faqHubCopy = {
  titleAbsolute: "Junk Removal FAQs | Uncle Sam Junk Removal",
  h1: "Junk removal questions, answered",
  lead:
    "Compare city heavy trash, dumpsters, appliance rules, access, pricing, and scheduling before you request a pickup.",
  faqs: [
    {
      question: "Is Evansville city heavy trash free for my address?",
      answer:
        "If you live in the city, pay trash on your water bill, and can get one item to the curb, EWSU/Republic heavy trash is free. Apartments, mobile home parks, businesses, and county addresses are not eligible. Call us when the pile is inside, bigger than one item, or outside city limits.",
    },
    {
      question: "Do I have to be home when you arrive?",
      answer:
        "For anything inside, someone needs to let us in. A curb-only pile can be discussed when you text.",
    },
    {
      question: "Will you haul a refrigerator that still has refrigerant?",
      answer:
        "Tell us before we quote. City heavy trash only takes fridges that are already recovered and tagged. We explain options. We do not advertise Freon recovery we have not published.",
    },
    {
      question: "Do stairs or a long carry change the price?",
      answer:
        "Yes. Volume is the base. Stairs, tight turns, and long carries add labor. Photos of the path help. You approve the onsite price before we load.",
    },
    {
      question: "Should I rent a dumpster instead of calling a crew?",
      answer:
        "A dumpster can cost less if you have days, a driveway, and you will load it yourself. Call us when the pile is inside, heavy, or you need it gone in one visit. Full split: /junk-removal-vs-dumpster.",
    },
    {
      question: "Do I need to empty and unplug an appliance first?",
      answer:
        "Empty and unplug if you can. Tell us if it still has food, water, or gas attached.",
    },
    {
      question: "Can my building or HOA get a certificate of insurance?",
      answer:
        "We are licensed and insured. Ask when you book if they need a certificate.",
    },
    {
      question: "Does city heavy trash stop during leaf season?",
      answer:
        "Yes. EWSU pauses heavy trash November through mid-December for leaf collection. If you cannot wait, text photos.",
    },
    {
      question: "Do you go to Newburgh, Henderson, and Owensboro?",
      answer:
        "Yes, on listed routes, plus Boonville, Princeton, Mount Vernon, New Harmony, and Mount Carmel. Coverage is by route, not a daily loop in every city. See /locations.",
    },
    {
      question:
        "If the photo quote and the onsite pile differ, which price do I pay?",
      answer:
        "The price you approve on site. Photos get you in the right range. If the pile grew or access is worse, we say so before we load.",
    },
  ],
} as const;

export const dumpsterCompareCopy = {
  titleAbsolute: "Junk Removal vs a Dumpster | Evansville Tri-State",
  h1: "Junk removal vs renting a dumpster",
  lead:
    "A dumpster can cost less when you have several days, driveway space, and can load it yourself. A removal crew handles the lifting and clears the project in one visit. We do not rent dumpsters.",
  faqs: [
    {
      question: "Which option is cheaper for a small inside job?",
      answer:
        "Usually a crew. You are not paying for a dumpster you will not fill, and you are not doing the lifting.",
    },
    {
      question: "Which option is cheaper for a week-long remodel?",
      answer:
        "Usually a dumpster you load yourself, if you have driveway space.",
    },
    {
      question: "Can you load a dumpster I already rented?",
      answer:
        "Ask. Our normal job is we bring the truck and take the debris with us.",
    },
    {
      question: "Where does Evansville city heavy trash fit?",
      answer:
        "Third option, Evansville city residents only, one curb item at a time. Not a dumpster and not a full-service crew.",
    },
    {
      question: "How do I decide in one text?",
      answer:
        "Photo of the pile, whether you can lift it, and whether it has to vanish today. We will tell you if we are the wrong tool.",
    },
  ],
} as const;
