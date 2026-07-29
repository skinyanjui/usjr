export const phoneDisplay = "(812) 610-1657";
export const phoneHref = "+18126101657";
export const emailAddress = "unclesamjunkremoval@gmail.com";
export const siteUrl = "https://unclesamjunkremoval.com";

export const genericSmsHref = `sms:${phoneHref}?body=${encodeURIComponent(
  "Hi Uncle Sam Junk Removal — I’d like a free quote. I can send photos next.",
)}`;

type QuoteFormOptions = {
  location?: string;
  service?: string;
};

export function quoteFormHref({ location, service }: QuoteFormOptions = {}) {
  const params = new URLSearchParams();

  if (service) {
    params.set("service", service);
  }

  if (location) {
    params.set("location", location);
  }

  const query = params.toString();
  return `/${query ? `?${query}` : ""}#quote`;
}

export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  quoteValue: string;
  popular?: boolean;
  includes: string[];
  bestFor: string[];
  priceFactors: string[];
};

export const services: Service[] = [
  {
    slug: "junk-removal",
    name: "Junk Removal",
    summary:
      "Full-service lifting, loading, hauling, and responsible disposal for homes and businesses.",
    description:
      "Point out what needs to go, and we’ll take it from there. We can clear one bulky item, a room, or an entire property, provide the price before work begins, and sweep the cleared area when the job is done.",
    quoteValue: "Junk Removal",
    includes: ["Furniture and household clutter", "Boxes and bulky items", "Residential and commercial loads"],
    bestFor: ["Homeowners", "Renters and landlords", "Businesses and contractors"],
    priceFactors: ["Volume", "Weight and item type", "Access and special handling"],
  },
  {
    slug: "furniture-removal",
    name: "Furniture Removal",
    summary:
      "Easy pickup and hauling for couches, tables, dressers, recliners, and other bulky furniture.",
    description:
      "Ready to make room? Tell us which pieces are going and where they are located. We handle the lifting from homes, apartments, offices, or curbside pickup areas and haul everything away as part of the quoted service.",
    quoteValue: "Furniture Removal",
    includes: ["Couches, recliners, and sectionals", "Tables, chairs, dressers, and shelving", "Home and office furniture"],
    bestFor: ["Moving or downsizing", "Furniture delivery and room updates", "Rental, office, and estate cleanouts"],
    priceFactors: ["Number and size of pieces", "Stairs, elevators, and doorways", "Disassembly and carrying distance"],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    summary:
      "Practical cleaning support for move-outs, turnovers, offices, and cleared spaces.",
    description:
      "Need the space ready for what comes next? Pair your cleanout with cleaning for a move-out, turnover, office, or recently cleared room. Tell us the size and condition so we can match the quote to the level of cleaning you need.",
    quoteValue: "Cleaning",
    includes: ["Move-out and turnover cleaning", "Post-cleanout resets", "Home and office cleaning"],
    bestFor: ["Rental turnovers", "Estate projects", "Homes and small businesses"],
    priceFactors: ["Square footage", "Condition of the space", "Requested cleaning level"],
  },
  {
    slug: "estate-cleanouts",
    name: "Estate Cleanouts",
    summary:
      "Respectful, organized removal for inherited homes, downsizing, and estate transitions.",
    description:
      "Estate cleanouts can feel like a lot at once. We can work room by room, follow clear keep-and-remove instructions, and plan the project in stages when one visit is not the right fit.",
    quoteValue: "Estate Cleanouts",
    includes: ["Furniture and household contents", "Garage, attic, and basement items", "Multi-room or phased removal"],
    bestFor: ["Families and executors", "Realtors", "Property owners preparing a sale"],
    priceFactors: ["Property size", "Volume and sorting needs", "Stairs, distance, and access"],
  },
  {
    slug: "appliance-removal",
    name: "Appliance Removal",
    summary:
      "Safe hauling for refrigerators, washers, dryers, ranges, and other bulky appliances.",
    description:
      "Replacing an appliance or clearing a property? Tell us what needs to go, whether it is disconnected, and where it is located. We’ll arrive ready to move it safely through the available route.",
    quoteValue: "Appliance Removal",
    includes: ["Refrigerators and freezers", "Washers and dryers", "Ranges, dishwashers, and small appliances"],
    bestFor: ["Appliance replacements", "Move-outs", "Landlord and property turnovers"],
    priceFactors: ["Appliance type", "Disconnection status", "Stairs and carrying distance"],
  },
  {
    slug: "light-demolition",
    name: "Light Demolition",
    summary:
      "Non-structural tear-out and debris removal for sheds, hot tubs, playsets, and similar projects.",
    description:
      "For small, non-structural tear-outs, send photos of the project and the access route. We’ll review the materials and utility connections, explain what we can handle, then dismantle and haul away the agreed structure.",
    quoteValue: "Light Demolition",
    includes: ["Small sheds and playsets", "Hot tubs and select decking", "Non-structural interior tear-outs"],
    bestFor: ["Backyard projects", "Renovation preparation", "Damaged small structures"],
    priceFactors: ["Size and materials", "Utility disconnection", "Access and debris volume"],
  },
  {
    slug: "garage-cleanout",
    name: "Garage Cleanout",
    summary:
      "Clear accumulated boxes, broken equipment, furniture, and bulky garage clutter.",
    description:
      "Reclaim parking, storage, or workshop space without spending your weekend loading. Point out what stays and what goes; we handle the lifting, hauling, and a basic sweep after removal.",
    quoteValue: "Garage Cleanout",
    includes: ["Boxes and household overflow", "Old tools and equipment", "Furniture and bulky items"],
    bestFor: ["Seasonal decluttering", "Moving preparation", "Property turnovers"],
    priceFactors: ["Volume", "Heavy items", "Sorting and access"],
  },
  {
    slug: "hot-tub-removal",
    name: "Hot Tub Removal",
    summary:
      "Dismantling, loading, and hauling for above-ground hot tubs and related debris.",
    description:
      "Ready to reclaim your patio or yard? Hot tubs often need to be cut into manageable sections, so we’ll check the access route, deck placement, and utility disconnection before giving you a clear plan.",
    quoteValue: "Hot Tub Removal",
    includes: ["Above-ground hot tubs", "Covers and steps", "Dismantling and haul-away"],
    bestFor: ["Failed or unused spas", "Backyard renovations", "Home sale preparation"],
    priceFactors: ["Tub size and material", "Access route", "Electrical and deck conditions"],
  },
  {
    slug: "mattress-removal",
    name: "Mattress Removal",
    summary:
      "Convenient pickup for mattresses, box springs, bed frames, and related bedroom items.",
    description:
      "Whether it is one mattress or a full bedroom set, tell us the sizes, quantity, floor, and elevator access. We’ll plan the pickup around the space and can include other household items in the same load.",
    quoteValue: "Mattress Removal",
    includes: ["Twin through king mattresses", "Box springs and foundations", "Bed frames and headboards"],
    bestFor: ["New mattress delivery", "Moves", "Rental and hotel turnovers"],
    priceFactors: ["Quantity and size", "Stairs or elevator access", "Additional bedroom items"],
  },
  {
    slug: "shed-removal",
    name: "Shed Removal",
    summary:
      "Careful dismantling and removal of small outdoor sheds and their contents.",
    description:
      "Ready for the old shed to go? Send photos of its size, materials, foundation, contents, and access route. We’ll explain the plan, dismantle the agreed structure, haul away the debris, and clear the immediate footprint.",
    quoteValue: "Shed Removal",
    popular: true,
    includes: ["Wood, metal, and resin sheds", "Interior shelving and contents", "Dismantling and debris hauling"],
    bestFor: ["Damaged sheds", "Backyard redesigns", "Property sale preparation"],
    priceFactors: ["Dimensions and construction", "Foundation type", "Contents and equipment access"],
  },
  {
    slug: "yard-waste-removal",
    name: "Yard Waste Removal",
    summary:
      "Hauling for brush, branches, bagged leaves, and non-hazardous outdoor debris.",
    description:
      "Clear storm leftovers, pruning piles, and landscape debris that your regular collection will not take. Send photos so we can estimate volume and confirm acceptable materials.",
    quoteValue: "Yard Waste Removal",
    includes: ["Branches and brush", "Bagged leaves and clippings", "Non-hazardous landscape debris"],
    bestFor: ["Seasonal cleanup", "Landscape projects", "Pre-sale curb appeal"],
    priceFactors: ["Pile volume", "Material type and weight", "Distance from loading area"],
  },
  {
    slug: "storage-unit-cleanouts",
    name: "Storage Unit Cleanouts",
    summary:
      "Efficient removal of unwanted furniture, boxes, inventory, and abandoned unit contents.",
    description:
      "Clearing a storage unit? We can remove a few large pieces or empty the full space. Mark anything that stays, share the unit size and access details, and coordinate entry with the facility before we arrive.",
    quoteValue: "Storage Unit Cleanouts",
    includes: ["Boxes and household goods", "Furniture and appliances", "Abandoned or business inventory"],
    bestFor: ["Ending a rental", "Auction buyers", "Business inventory reduction"],
    priceFactors: ["Unit size and fullness", "Elevator and loading access", "Heavy or specialty items"],
  },
  {
    slug: "office-cleanouts",
    name: "Office Cleanouts",
    summary:
      "Removal for desks, chairs, shelving, electronics, and commercial office contents.",
    description:
      "Moving, downsizing, or refreshing the workspace? We can clear selected areas, a suite, or a floor while working around building access and business hours. Phased removal and completion photos are available by request.",
    quoteValue: "Office Cleanouts",
    includes: ["Desks, chairs, and cubicles", "Shelving and office contents", "Select electronics and equipment"],
    bestFor: ["Relocations", "Lease endings", "Renovations and downsizing"],
    priceFactors: ["Volume and disassembly", "Elevator and dock access", "Scheduling requirements"],
  },
  {
    slug: "restaurant-equipment-removal",
    name: "Restaurant Equipment Removal",
    summary:
      "Heavy-item removal for retired restaurant equipment, fixtures, furniture, and supplies.",
    description:
      "Heavy restaurant equipment takes a little planning. Send the dimensions, estimated weight, utility status, doorway measurements, and loading access so we can recommend a safe, practical pickup plan.",
    quoteValue: "Restaurant Equipment Removal",
    includes: ["Tables, seating, and shelving", "Disconnected kitchen equipment", "Fixtures and non-hazardous supplies"],
    bestFor: ["Restaurant closures", "Equipment upgrades", "Remodels and tenant turnovers"],
    priceFactors: ["Weight and dimensions", "Disconnection and disassembly", "Dock, doorway, and stair access"],
  },
  {
    slug: "property-management-turnovers",
    name: "Property Management Turnovers",
    summary:
      "Responsive cleanout and cleaning support for apartments, rentals, and managed properties.",
    description:
      "Need a rental ready for the next occupant? Use one point of contact for unwanted contents and the cleaning included in your quote. We can coordinate access, document completion, and discuss recurring service.",
    quoteValue: "Property Management Turnovers",
    includes: ["Abandoned contents", "Furniture and appliance removal", "Turnover cleaning by scope"],
    bestFor: ["Property managers", "Landlords", "Realtors and maintenance teams"],
    priceFactors: ["Unit condition and volume", "Cleaning scope", "Access and deadline"],
  },
  {
    slug: "warehouse-fixture-removal",
    name: "Warehouse Fixture Removal",
    summary:
      "Planned removal of shelving, workstations, displays, and approved warehouse fixtures.",
    description:
      "Share the fixture dimensions, fastening method, equipment needs, dock access, and site rules. We’ll build the quote around the non-structural work you need and coordinate a plan that fits the facility.",
    quoteValue: "Warehouse Fixture Removal",
    includes: ["Shelving and workstations", "Retail or warehouse displays", "Approved non-structural fixtures"],
    bestFor: ["Facility reconfiguration", "Tenant exits", "Inventory and equipment transitions"],
    priceFactors: ["Fixture size and fastening", "Equipment and labor needs", "Dock access and scheduling"],
  },
  {
    slug: "holiday-tree-removal",
    name: "Holiday Tree Removal",
    summary:
      "Seasonal pickup for natural holiday trees, stands, and bagged decorating debris.",
    description:
      "Skip the needles in your vehicle and arrange a convenient post-holiday pickup. Remove decorations and lights before arrival, then place the tree where the crew can safely access it.",
    quoteValue: "Holiday Tree Removal",
    includes: ["Natural holiday trees", "Tree stands by request", "Bagged non-hazardous decorating debris"],
    bestFor: ["Homes and apartments", "Offices", "Property managers"],
    priceFactors: ["Tree size", "Indoor or curbside access", "Multiple-property routing"],
  },
  {
    slug: "storm-debris-cleanup",
    name: "Storm Debris Cleanup",
    summary:
      "Prompt hauling for fallen branches, damaged outdoor items, and non-hazardous storm debris.",
    description:
      "Once the area is safe, send photos and note any access concerns. We can haul debris that is safe for our crew to handle and will let you know when utility, tree, roofing, or hazardous-material help is the better next call.",
    quoteValue: "Storm Debris Cleanup",
    includes: ["Branches and brush", "Damaged outdoor furniture", "Non-hazardous loose debris"],
    bestFor: ["Residential properties", "Rentals and businesses", "Post-storm yard clearing"],
    priceFactors: ["Volume and weight", "Safety and access", "Required cutting or equipment"],
  },
];

export type ServiceLocation = {
  slug: string;
  name: string;
  city: string;
  state: string;
  county: string;
  summary: string;
  localIntro: string;
  nearby: string[];
};

export const locations: ServiceLocation[] = [
  {
    slug: "evansville-in",
    name: "Evansville, IN",
    city: "Evansville",
    state: "IN",
    county: "Vanderburgh County",
    summary:
      "Local junk removal, furniture pickup, cleanouts, appliance hauling, and light demolition throughout Evansville.",
    localIntro:
      "Evansville is our home base. We help clear houses, apartments, rental properties, offices, and job sites across the city and nearby Vanderburgh County. Send the address and a few photos, and we’ll check the route for you.",
    nearby: ["Newburgh, IN", "Henderson, KY", "Mount Vernon, IN"],
  },
  {
    slug: "newburgh-in",
    name: "Newburgh, IN",
    city: "Newburgh",
    state: "IN",
    county: "Warrick County",
    summary:
      "Full-service junk hauling, furniture removal, property cleanouts, and bulky-item pickup in Newburgh.",
    localIntro:
      "We help Newburgh homeowners, renters, landlords, and businesses with bulky-item pickups, garage and estate cleanouts, rental turnovers, and small non-structural demolition throughout the community and nearby Warrick County.",
    nearby: ["Evansville, IN", "Boonville, IN", "Owensboro, KY"],
  },
  {
    slug: "henderson-ky",
    name: "Henderson, KY",
    city: "Henderson",
    state: "KY",
    county: "Henderson County",
    summary:
      "Residential and commercial junk removal, furniture pickup, and cleanouts in Henderson.",
    localIntro:
      "We cross the Ohio River for scheduled Henderson routes, helping homeowners, landlords, businesses, and contractors clear unwanted items without renting a truck or handling the lifting.",
    nearby: ["Evansville, IN", "Newburgh, IN", "Owensboro, KY"],
  },
  {
    slug: "owensboro-ky",
    name: "Owensboro, KY",
    city: "Owensboro",
    state: "KY",
    county: "Daviess County",
    summary:
      "Junk removal, furniture pickup, cleanouts, and commercial hauling for Owensboro.",
    localIntro:
      "Need something cleared in Owensboro? Send a few photos for a faster estimate on household junk, furniture, estate cleanouts, office contents, restaurant equipment, or property turnovers.",
    nearby: ["Newburgh, IN", "Henderson, KY", "Boonville, IN"],
  },
  {
    slug: "boonville-in",
    name: "Boonville, IN",
    city: "Boonville",
    state: "IN",
    county: "Warrick County",
    summary:
      "Convenient junk pickup, garage cleanouts, and debris hauling in Boonville.",
    localIntro:
      "Boonville customers can request single-item pickups or larger cleanouts for homes, rentals, garages, storage spaces, and small businesses across the area.",
    nearby: ["Newburgh, IN", "Evansville, IN", "Princeton, IN"],
  },
  {
    slug: "princeton-in",
    name: "Princeton, IN",
    city: "Princeton",
    state: "IN",
    county: "Gibson County",
    summary:
      "Junk removal, furniture and appliance pickup, and property cleanouts in Princeton.",
    localIntro:
      "We schedule Princeton pickups for household items, furniture, estate and garage cleanouts, commercial contents, yard debris, and small non-structural demolition. Share the address so we can check the next route.",
    nearby: ["Boonville, IN", "Evansville, IN", "Mount Carmel, IL"],
  },
  {
    slug: "mount-carmel-il",
    name: "Mount Carmel, IL",
    city: "Mount Carmel",
    state: "IL",
    county: "Wabash County",
    summary:
      "Tri-State junk hauling and cleanout service for Mount Carmel, Illinois.",
    localIntro:
      "We group Mount Carmel stops by route to keep service practical. Send the project address and photos, and we’ll let you know about coverage, timing, and the best way to estimate the job.",
    nearby: ["Princeton, IN", "Evansville, IN", "New Harmony, IN"],
  },
  {
    slug: "mount-vernon-in",
    name: "Mount Vernon, IN",
    city: "Mount Vernon",
    state: "IN",
    county: "Posey County",
    summary:
      "Junk removal, furniture pickup, and property cleanouts serving Mount Vernon and Posey County.",
    localIntro:
      "From a couch or appliance to a full property cleanout, we schedule Mount Vernon routes for homes, rentals, and businesses. We can also help with storm debris and small non-structural demolition.",
    nearby: ["Evansville, IN", "New Harmony, IN", "Henderson, KY"],
  },
  {
    slug: "new-harmony-in",
    name: "New Harmony, IN",
    city: "New Harmony",
    state: "IN",
    county: "Posey County",
    summary:
      "Careful junk removal and cleanout service for New Harmony properties.",
    localIntro:
      "We help New Harmony customers clear household junk, furniture, estate contents, garages, appliances, and yard debris. Send the address and photos so we can match the project to an upcoming route.",
    nearby: ["Mount Vernon, IN", "Evansville, IN", "Mount Carmel, IL"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export function serviceSmsHref(serviceName: string, location?: string) {
  const locationLine = location ? ` in ${location}` : "";
  return `sms:${phoneHref}?body=${encodeURIComponent(
    `Hi Uncle Sam Junk Removal — I’d like a quote for ${serviceName}${locationLine}. I can send photos next.`,
  )}`;
}
