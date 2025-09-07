import { settings } from "@/lib/cms-content"
import { LocationPageTemplate, LocationPageTemplateProps } from "@/components/ui/location-page-template"
import { locationData, LocationData } from "@/lib/location-data"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata = {
  title: "Junk Removal Owensboro KY | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Owensboro, Kentucky. Extended service area from Indiana. Same-day pickup when possible. Call ${settings.phone}`,
  keywords: "junk removal Owensboro KY, Owensboro Kentucky junk removal, Daviess County junk pickup",
  robots: "index, follow",
  ...buildCanonicalMetadata("/locations/owensboro-ky", baseUrl),
}

export default function OwensboroPage() {
  const data = locationData["owensboro-ky"] as LocationData

  const templateProps: LocationPageTemplateProps = {
    locationName: data.locationName,
    state: data.state,
    tagline: data.tagline,
    theme: data.theme,
    features: data.features,
    landmarks: data.landmarks,
    offers: data.offers,
    stories: data.stories,
    serviceGuarantee: data.serviceGuarantee,
    ctaPrimary: `📞 Call ${settings.phone}`,
    ctaSecondary: "Schedule Service"
  }

  if (data.neighborhoods) {
    templateProps.neighborhoods = data.neighborhoods
  }

  if (data.disposalNote) {
    templateProps.disposalNote = data.disposalNote
  }

  return <LocationPageTemplate {...templateProps} />
}
