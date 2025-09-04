import { settings } from "@/lib/cms-content"
import { LocationPageTemplate, LocationPageTemplateProps } from "@/components/ui/location-page-template"
import { locationData, LocationData } from "@/lib/location-data"

export const metadata = {
  title: "Junk Removal Boonville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Boonville, Indiana. Serving Warrick County. Same-day service available. Call ${settings.phone}`,
  keywords: "junk removal Boonville, Boonville junk removal, Warrick County junk pickup, trash removal Boonville IN",
}

export default function BoonvillePage() {
  const data = locationData["boonville"] as LocationData

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
    ctaSecondary: "Get Free Quote"
  }

  if (data.neighborhoods) {
    templateProps.neighborhoods = data.neighborhoods
  }

  if (data.disposalNote) {
    templateProps.disposalNote = data.disposalNote
  }

  return <LocationPageTemplate {...templateProps} />
}
