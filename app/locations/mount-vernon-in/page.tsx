import { settings } from "@/lib/cms-content"
import { LocationPageTemplate, LocationPageTemplateProps } from "@/components/ui/location-page-template"
import { locationData, LocationData } from "@/lib/location-data"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata = {
  title: "Junk Removal Mount Vernon IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Mount Vernon, Indiana. Same-day service and fair pricing for Posey County homes and businesses. Call ${settings.phone}`,
  keywords: "junk removal Mount Vernon, Mount Vernon junk removal, Posey County junk removal, trash removal Mount Vernon IN",
  ...buildCanonicalMetadata("/locations/mount-vernon-in", baseUrl),
}

export default function MountVernonPage() {
  const data = locationData["mount-vernon-in"] as LocationData

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
