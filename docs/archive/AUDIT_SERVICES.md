## Services Pages Audit

Date: 2025-08-28

### Scope

- `app/services/page.tsx`
- `app/services/*` individual pages
- `components/ui/service-page-template.tsx`
- `lib/nav.ts`, `components/header-services-dropdown.tsx`
- `components/ui/page-hero.tsx`

### Findings

1. Metadata consistency

- Mixed usage of explicit `Metadata` typing vs inferred. Functionally OK but inconsistent.

2. Template usage inconsistency

- Using `ServicePageTemplate`: junk-removal, estate-cleanouts, garage-cleanout, appliance-removal, hot-tub-removal, storm-debris-cleanup.
- Not using template (custom layout): mattress-removal, shed-removal, yard-waste-removal, light-demolition.

3. Theme consistency

- Template supports: red, blue, green, orange, purple, teal. Template pages adhere; manual pages hardcode colors, risking drift.

4. Duplicate H1 risk

- `PageHero` renders an H1. Manual pages also add an H1 below the hero, causing duplicate H1s (SEO/accessibility): mattress-removal, shed-removal, yard-waste-removal, light-demolition.

5. CTA consistency

- Template provides consistent phone/quote CTAs with prefetch. Manual pages vary text/structure, sometimes missing Link-asChild usage and `prefetch`.

6. Navigation coverage

- `lib/nav.ts` Services menu misses live pages: Hot Tub Removal, Garage Cleanout, Mattress Removal, Shed Removal, Yard Waste Removal.

7. Pricing/badges consistency

- Template supports pricing tiers and optional `pricingNote`, plus `badges`. Manual pages reimplement these, causing style variance.

### Recommendations

- Migrate manual pages to `ServicePageTemplate` to unify hero, CTAs, pricing, FAQ. Use `children` for unique content.
- Remove extra `<h1>` in pages that render `PageHero` to avoid duplicates.
- Standardize metadata typing (either all typed `Metadata` or inferred) across service pages.
- Update `lib/nav.ts` to include:
  - Hot Tub Removal → `/services/hot-tub-removal`
  - Garage Cleanout → `/services/garage-cleanout`
  - Mattress Removal → `/services/mattress-removal`
  - Shed Removal → `/services/shed-removal`
  - Yard Waste Removal → `/services/yard-waste-removal`
- Prefer `ctaPrimary`/`ctaSecondary` props on template for consistent copy and behavior.

### Quick Wins

- Convert mattress-removal, shed-removal, yard-waste-removal, light-demolition to `ServicePageTemplate`.
- Add missing services to `lib/nav.ts` to match live routes.
- Align hero images across pages to service-specific assets.
