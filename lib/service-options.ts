import { serviceSlugs, servicesData } from './services-data'

export type ServiceOption = {
  value: string
  label: string
  href: string
}

export const getServiceOptions = (): ServiceOption[] =>
  serviceSlugs.map(slug => ({
    value: slug,
    label: servicesData[slug]!.serviceInfo.category,
    href: `/services/${slug}`,
  }))
