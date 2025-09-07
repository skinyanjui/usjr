import { settings } from '@/lib/cms-content'
import {
  LocationPageTemplate,
  LocationPageTemplateProps,
} from '@/components/ui/location-page-template'
import { locationData, LocationData } from '@/lib/location-data'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata = {
  title: 'Junk Removal Mount Carmel IL | Same-Day Service | Uncle Sam Junk Removal',
  description: `Professional junk removal in Mount Carmel, Illinois. Same-day service, transparent pricing. Serving Wabash County and surrounding. Call ${settings.phone}`,
  keywords:
    'junk removal Mount Carmel, Mount Carmel junk removal, trash removal Mount Carmel IL, Wabash County junk removal',
  ...buildCanonicalMetadata('/locations/mount-carmel-il', baseUrl),
}

export default function MountCarmelPage() {
  const data = locationData['mount-carmel-il'] as LocationData

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
    ctaSecondary: 'Get Free Quote',
  }

  if (data.neighborhoods) {
    templateProps.neighborhoods = data.neighborhoods
  }

  if (data.disposalNote) {
    templateProps.disposalNote = data.disposalNote
  }

  return <LocationPageTemplate {...templateProps} />
}
