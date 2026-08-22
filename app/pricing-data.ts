export type PublicLoadSize =
  | "single_item"
  | "quarter_load"
  | "half_load"
  | "full_load";

export const PUBLIC_PRICING = [
  {
    size: "single_item",
    label: "Single item",
    description: "1–2 bulky items",
    low: 89,
    high: 149,
    fillClass: "load-visual--single",
  },
  {
    size: "quarter_load",
    label: "¼ load",
    description: "Small room cleanout",
    low: 179,
    high: 249,
    fillClass: "load-visual--quarter",
  },
  {
    size: "half_load",
    label: "½ load",
    description: "Large room or garage",
    low: 289,
    high: 389,
    fillClass: "load-visual--half",
  },
  {
    size: "full_load",
    label: "Full load",
    description: "Home or office cleanout",
    low: 489,
    high: 649,
    fillClass: "load-visual--full",
  },
] as const satisfies ReadonlyArray<{
  size: PublicLoadSize;
  label: string;
  description: string;
  low: number;
  high: number;
  fillClass: string;
}>;

export const PUBLIC_LOAD_SIZES = PUBLIC_PRICING.map((tier) => tier.size);

export function formatPriceRange(low: number, high: number) {
  return `$${low}–${high}`;
}

export function getPublicPricingTier(size: string) {
  return PUBLIC_PRICING.find((tier) => tier.size === size) || null;
}
