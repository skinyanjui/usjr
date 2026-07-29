import {
  emailAddress,
  locations,
  phoneDisplay,
  services,
  siteUrl,
} from "./site-data";

export function buildLlmsSummary() {
  return `# Uncle Sam Junk Removal

> Veteran-owned junk removal, furniture hauling, cleanouts, cleaning, appliance removal, debris cleanup, and light demolition serving Evansville and the surrounding Tri-State.

## Primary pages

- [Request a free quote](${siteUrl}/#quote): Share contact details, timing, load size, access notes, preferred contact method, and optional project photos.
- [All services](${siteUrl}/services): Browse all ${services.length} residential and commercial services.
- [Service locations](${siteUrl}/locations): Browse all ${locations.length} published service-area pages.
- [Pricing guide](${siteUrl}/#pricing): Review planning ranges and what standard quotes include.
- [Frequently asked questions](${siteUrl}/#faq): Read pricing, scheduling, accepted-item, and project guidance.

## Popular services

- [Junk Removal](${siteUrl}/services/junk-removal)
- [Furniture Removal](${siteUrl}/services/furniture-removal)
- [Shed Removal](${siteUrl}/services/shed-removal)
- [Estate Cleanouts](${siteUrl}/services/estate-cleanouts)
- [Appliance Removal](${siteUrl}/services/appliance-removal)
- [Garage Cleanout](${siteUrl}/services/garage-cleanout)

## Contact

- Phone: ${phoneDisplay}
- Email: ${emailAddress}
- Home base: Evansville, Indiana

## Detailed index

- [Full AI-readable service and location index](${siteUrl}/llms-full.txt)
`;
}

export function buildLlmsFull() {
  const serviceIndex = services
    .map(
      (service) =>
        `### ${service.name}\n\n- URL: ${siteUrl}/services/${service.slug}\n- Summary: ${service.summary}\n- Best for: ${service.bestFor.join("; ")}\n- Price factors: ${service.priceFactors.join("; ")}`,
    )
    .join("\n\n");
  const locationIndex = locations
    .map(
      (location) =>
        `### ${location.name}\n\n- URL: ${siteUrl}/locations/${location.slug}\n- County: ${location.county}\n- Summary: ${location.summary}`,
    )
    .join("\n\n");

  return `# Uncle Sam Junk Removal: Full Service and Location Index

## Business overview

Uncle Sam Junk Removal is a veteran-owned local hauling business based in Evansville, Indiana. The company serves published communities in Southern Indiana, Western Kentucky, and Southeast Illinois. Services include residential and commercial junk removal, furniture removal, property cleanouts, cleaning, appliance hauling, debris cleanup, and small non-structural demolition.

Customers can request a free, no-pressure quote at ${siteUrl}/#quote. The one-page form asks for contact details, service, timing, approximate load size, indoor or outdoor placement, access constraints, heavy-material or dismantling needs, and a preferred contact method. Relevant project questions appear after the service is selected. Customers may optionally upload three to eight JPG, PNG, HEIC, or HEIF photos. No payment is collected through the website. The final onsite price is presented for approval before work begins.

## Contact

- Phone: ${phoneDisplay}
- Email: ${emailAddress}
- Website: ${siteUrl}

## Services

${serviceIndex}

## Locations

${locationIndex}

## Safety and material notes

Uncle Sam Junk Removal handles most non-hazardous household and commercial items. The company does not haul asbestos, biohazards, medical waste, explosives, fuels, unidentified chemicals, or other hazardous materials. Customers should identify paint, refrigerant-containing appliances, pressurized containers, unusually heavy items, and utility-connected projects before service. Shed, hot tub, and light-demolition projects should include photos of the construction, utility status, and access route.

## Policies

- [Privacy Policy](${siteUrl}/privacy)
- [Terms of Service](${siteUrl}/terms)
- [Accessibility Statement](${siteUrl}/accessibility)
- [Sitemap](${siteUrl}/sitemap.xml)
- [Crawler rules](${siteUrl}/robots.txt)
`;
}
