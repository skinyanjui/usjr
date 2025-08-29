// Central mapping for canonical URLs to resolve duplicate or overlapping content
// Key: pathname (no trailing slash), Value: absolute canonical URL to index

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com").replace(/\/$/, "")

// Helper to build absolute URLs consistently
function abs(path: string): string {
  if (!path.startsWith("/")) return path
  return `${SITE_URL}${path}`
}

// Note: Include the canonical page itself in the group, pointing to itself
export const CANONICAL_OVERRIDES: Record<string, string> = {
  // Blog posts that duplicate or closely mirror service landing pages
  "/blog/mattress-disposal-evansville": abs("/services/mattress-removal"),
  "/services/mattress-removal": abs("/services/mattress-removal"),

  "/blog/shed-removal-guide-evansville": abs("/services/shed-removal"),
  "/services/shed-removal": abs("/services/shed-removal"),

  "/blog/yard-waste-disposal-evansville": abs("/services/yard-waste-removal"),
  "/services/yard-waste-removal": abs("/services/yard-waste-removal"),

  "/blog/hot-tub-removal-what-to-know": abs("/services/hot-tub-removal"),
  "/services/hot-tub-removal": abs("/services/hot-tub-removal"),

  // General junk removal pricing article vs service page: prefer the service landing for indexing
  "/blog/junk-removal-cost-tri-state": abs("/services/junk-removal"),
  "/services/junk-removal": abs("/services/junk-removal"),

  // Appliance disposal guide likely overlaps with appliance removal service page
  "/blog/appliance-disposal-recycling-guide": abs("/services/appliance-removal"),
  "/services/appliance-removal": abs("/services/appliance-removal"),

  // Dumpster rental guide overlaps with the dumpster rental service page
  "/blog/dumpster-rental-guide-evansville": abs("/services/dumpster-rental"),
  "/services/dumpster-rental": abs("/services/dumpster-rental"),

  // Estate cleanout guide overlaps with the estate cleanouts service page
  "/blog/estate-cleanout-guide": abs("/services/estate-cleanouts"),
  "/services/estate-cleanouts": abs("/services/estate-cleanouts"),

  // Garage cleanout how-to overlaps with the garage cleanout service page
  "/blog/evansville-garage-cleanout-48-hours": abs("/services/garage-cleanout"),
  "/services/garage-cleanout": abs("/services/garage-cleanout"),
}

export function getCanonicalForPath(pathname: string): string | undefined {
  const key = pathname.replace(/\/$/, "") || "/"
  return CANONICAL_OVERRIDES[key]
}

