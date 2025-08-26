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