import { settings } from "@/lib/cms-content"
import { LocationPageTemplate, LocationPageTemplateProps } from "@/components/ui/location-page-template"
import { locationData, LocationData } from "@/lib/location-data"

export const metadata = {
  title: "Junk Removal Evansville IN | #1 Local Service Since 2016 | Uncle Sam Junk Removal",
  description:
    `Professional junk removal in Evansville, Indiana with same-day service, transparent pricing, and eco-friendly disposal. Serving all Evansville neighborhoods with local expertise since 2016. Call ${settings.phone} for free estimates.`,
  keywords:
    "junk removal Evansville, Evansville junk removal, trash removal Evansville IN, furniture removal Evansville, appliance removal Evansville, estate cleanout Evansville, construction debris removal",
}

export default function EvansvillePage() {
  const data = locationData["evansville"] as LocationData

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
    ctaSecondary: "Text Photos for Instant Quote"
  }

  if (data.neighborhoods) {
    templateProps.neighborhoods = data.neighborhoods
  }

  if (data.disposalNote) {
    templateProps.disposalNote = data.disposalNote
  }

  return <LocationPageTemplate {...templateProps} />
}
