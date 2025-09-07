export type NavItem = { label: string; href?: string; children?: NavItem[] }

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    children: [
      { label: "Junk Removal", href: "/services/junk-removal" },
      { label: "Dumpster Rental", href: "/services/dumpster-rental" },
      { label: "Cleaning", href: "/cleaning" },
      { label: "Estate Cleanouts", href: "/services/estate-cleanouts" },
      { label: "Appliance Removal", href: "/services/appliance-removal" },
      { label: "Light Demolition", href: "/services/light-demolition" },
      { label: "Garage Cleanout", href: "/services/garage-cleanout" },
      { label: "Hot Tub Removal", href: "/services/hot-tub-removal" },
      { label: "Mattress Removal", href: "/services/mattress-removal" },
      { label: "Shed Removal", href: "/services/shed-removal" },
      { label: "Yard Waste Removal", href: "/services/yard-waste-removal" },
      { label: "Storage Unit Cleanouts", href: "/services/storage-unit-cleanouts" },
      { label: "Office Cleanouts", href: "/services/office-cleanouts" },
      { label: "Restaurant Equipment Removal", href: "/services/restaurant-equipment-removal" },
      { label: "Property Management Turnovers", href: "/services/property-management-turnovers" },
      { label: "Warehouse Fixture Removal", href: "/services/warehouse-fixture-removal" },
      { label: "Holiday Tree Removal", href: "/services/holiday-tree-removal" },
      { label: "Storm Debris Cleanup", href: "/services/storm-debris-cleanup" },
    ],
  },
  {
    label: "Locations",
    children: [
      { label: "Evansville, IN", href: "/locations/evansville" },
      { label: "Newburgh, IN", href: "/locations/newburgh" },
      { label: "Henderson, KY", href: "/locations/henderson-ky" },
      { label: "Owensboro, KY", href: "/locations/owensboro-ky" },
      { label: "Boonville, IN", href: "/locations/boonville" },
      { label: "Princeton, IN", href: "/locations/princeton" },
      { label: "Mount Carmel, IL", href: "/locations/mount-carmel-il" },
      { label: "Mount Vernon, IN", href: "/locations/mount-vernon-in" },
      { label: "New Harmony, IN", href: "/locations/new-harmony-in" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Get Free Quote", href: "/quote" },
]

export const CTAS = {
  phone: { label: "(812) 610-1657", href: "tel:+18126101657" },
  sms: { label: "Text Photos", href: "sms:+18126101657" },
  quote: { label: "Get Free Quote", href: "/quote" },
  priceMatch: { label: "Price Match", href: "/faq#price-match" },
}
