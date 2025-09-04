import { settings } from "@/lib/cms-content"
import { LocationPageTemplate, LocationPageTemplateProps } from "@/components/ui/location-page-template"
import { locationData, LocationData } from "@/lib/location-data"

export const metadata = {
  title: "Junk Removal New Harmony IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in New Harmony, Indiana. Friendly local team, transparent pricing, eco-friendly disposal. Call ${settings.phone}`,
  keywords: "junk removal New Harmony, New Harmony junk removal, Posey County junk removal, trash removal New Harmony IN",
}

export default function NewHarmonyPage() {
  const data = locationData["new-harmony-in"] as LocationData

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
    ctaSecondary: "Text Photos for Quote"
  }

  if (data.neighborhoods) {
    templateProps.neighborhoods = data.neighborhoods
  }

  if (data.disposalNote) {
    templateProps.disposalNote = data.disposalNote
  }

  return <LocationPageTemplate {...templateProps} />
}
