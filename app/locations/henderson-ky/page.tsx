import { settings } from '@/lib/cms-content'
import {
  LocationPageTemplate,
  LocationPageTemplateProps,
} from '@/components/ui/location-page-template'
import { locationData, LocationData } from '@/lib/location-data'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildSocialMetadata } from '@/lib/seo-metadata'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata = {
  title: 'Junk Removal Henderson KY | Same-Day Service | Uncle Sam Junk Removal',
  description: `Professional junk removal in Henderson, Kentucky. Cross-state service from Indiana. Same-day pickup available. Call ${settings.phone}`,
  robots: 'index, follow',
  ...buildSocialMetadata({
    title: 'Junk Removal Henderson KY | Same-Day Service | Uncle Sam Junk Removal',
    description: `Professional junk removal in Henderson, Kentucky. Cross-state service from Indiana. Same-day pickup available. Call ${settings.phone}`,
    pathname: '/locations/henderson-ky',
    type: 'website',
  }),
  ...buildCanonicalMetadata('/locations/henderson-ky', baseUrl),
}

export default function HendersonPage() {
  const data = locationData['henderson-ky'] as LocationData

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
