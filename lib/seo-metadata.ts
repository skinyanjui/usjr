// Location-specific metadata generation for SEO optimization
import { settings } from './cms-content'

interface LocationMetadata {
  locationName: string
  state: string
  neighborhoods?: string[]
  landmarks?: string[]
  specialOffers?: string[]
}

interface ServiceMetadata {
  serviceName: string
  category: string
  price?: string
  benefits?: string[]
}

interface BlogMetadata {
  topic: string
  location?: string
  category: string
  readTime?: string
}

export function buildLocationMetadata(location: LocationMetadata, service?: string) {
  const { locationName, state, neighborhoods = [], landmarks = [], specialOffers = [] } = location
  
  const title = service 
    ? `${service} in ${locationName}, ${state} | Uncle Sam Junk Removal`
    : `Junk Removal ${locationName} ${state} | #1 Local Service | Uncle Sam Junk Removal`
    
  const landmarksList = landmarks.slice(0, 3).join(', ')
  const neighborhoodsList = neighborhoods.slice(0, 3).join(', ')
  const offersList = specialOffers.length > 0 ? ` Special offers: ${specialOffers.join(', ')}.` : ''
  
  const description = service
    ? `Professional ${service.toLowerCase()} in ${locationName}, ${state} with same-day service. Serving ${landmarksList} and all ${locationName} neighborhoods.${offersList} Call ${settings.phone} for free estimates.`
    : `Professional junk removal in ${locationName}, ${state} with same-day service, transparent pricing, and eco-friendly disposal. Serving ${landmarksList}${neighborhoodsList ? ` and neighborhoods like ${neighborhoodsList}` : ''}.${offersList} Call ${settings.phone} for free estimates.`
  
  const baseKeywords = [
    `junk removal ${locationName}`,
    `${locationName} junk removal`,
    `trash removal ${locationName} ${state}`,
    `furniture removal ${locationName}`,
    `appliance removal ${locationName}`,
    `estate cleanout ${locationName}`,
    `construction debris removal ${locationName}`
  ]
  
  const landmarkKeywords = landmarks.slice(0, 5).map(landmark => 
    `junk removal near ${landmark}`
  )
  
  const neighborhoodKeywords = neighborhoods.slice(0, 5).map(neighborhood =>
    `junk removal ${neighborhood} ${locationName}`
  )
  
  const keywords = [...baseKeywords, ...landmarkKeywords, ...neighborhoodKeywords].join(', ')
  
  return {
    title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords
  }
}

export function buildServiceMetadata(service: ServiceMetadata, location?: string) {
  const { serviceName, category, price, benefits = [] } = service
  const locationPart = location ? ` in ${location}` : ' in Evansville, IN'
  
  const title = `${serviceName}${locationPart} | Uncle Sam Junk Removal`
  
  const benefitsList = benefits.length > 0 ? ` ${benefits.slice(0, 3).join(', ')}.` : ''
  const pricePart = price ? ` Starting ${price}.` : ''
  
  const description = `Professional ${serviceName.toLowerCase()}${locationPart} with same-day service${pricePart}${benefitsList} Licensed and insured. Call ${settings.phone} for free estimates.`
  
  const baseKeywords = [
    serviceName.toLowerCase(),
    `${serviceName.toLowerCase()}${location ? ` ${location}` : ' Evansville'}`,
    `${category.toLowerCase()} service`,
    `professional ${serviceName.toLowerCase()}`,
    `${serviceName.toLowerCase()} cost`,
    `${serviceName.toLowerCase()} price`
  ]
  
  const locationKeywords = location ? [
    `${serviceName.toLowerCase()} ${location}`,
    `${location} ${serviceName.toLowerCase()}`,
    `${serviceName.toLowerCase()} near me`
  ] : []
  
  const keywords = [...baseKeywords, ...locationKeywords].join(', ')
  
  return {
    title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords
  }
}

export function buildBlogMetadata(blog: BlogMetadata) {
  const { topic, location, category, readTime } = blog
  const locationPart = location ? ` ${location}` : ' Evansville'
  
  const title = `${topic}${locationPart} Guide | Uncle Sam Junk Removal`
  
  const readTimePart = readTime ? ` ${readTime} read.` : ''
  const description = `${topic} guide for${locationPart} residents. Expert tips and local insights from Uncle Sam Junk Removal professionals.${readTimePart} Local expertise since 2025.`
  
  const baseKeywords = [
    `${topic.toLowerCase()}${locationPart.toLowerCase()}`,
    `${topic.toLowerCase()} guide`,
    `${topic.toLowerCase()} tips`,
    `${category.toLowerCase()} advice`,
    `local ${topic.toLowerCase()}`,
    `${topic.toLowerCase()} help`
  ]
  
  const locationKeywords = location ? [
    `${location.toLowerCase()} ${topic.toLowerCase()}`,
    `${topic.toLowerCase()} ${location.toLowerCase()}`,
    `local ${location.toLowerCase()} guide`
  ] : []
  
  const keywords = [...baseKeywords, ...locationKeywords].join(', ')
  
  return {
    title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords
  }
}