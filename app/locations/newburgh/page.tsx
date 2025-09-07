import { settings } from "@/lib/cms-content"
import { LocationPageTemplate, LocationPageTemplateProps } from "@/components/ui/location-page-template"
import { locationData, LocationData } from "@/lib/location-data"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata = {
  title: "Junk Removal Newburgh IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Newburgh, Indiana. Same-day service, transparent pricing. Serving Newburgh and Warrick County. Call ${settings.phone}`,
  keywords: "junk removal Newburgh, Newburgh junk removal, Warrick County junk removal, trash removal Newburgh IN",
  ...buildCanonicalMetadata("/locations/newburgh", baseUrl),
}

export default function NewburghPage() {
  const data = locationData["newburgh"] as LocationData

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
    ctaSecondary: "Schedule Newburgh Pickup"
  }

  if (data.neighborhoods) {
    templateProps.neighborhoods = data.neighborhoods
  }

  if (data.disposalNote) {
    templateProps.disposalNote = data.disposalNote
  }

  return <LocationPageTemplate {...templateProps} />
}
