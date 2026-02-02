import React from 'react'
import { render } from '@testing-library/react'
import { StructuredData } from '@/components/structured-data'
import { getActiveServices, settings, getAggregateTestimonialStats } from '@/lib/cms-content'

// Mock the dependencies
jest.mock('@/lib/cms-content', () => ({
  settings: {
    businessHours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed',
    },
    serviceAreas: ['Evansville'],
    phoneE164: '+1234567890',
    email: 'test@example.com',
    socialMedia: { facebook: '', instagram: '', google: '' },
  },
  getActiveServices: jest.fn(),
  getAggregateTestimonialStats: jest.fn(),
  UNIFORM_OFFERS: {},
}))

// Mock uniform offers if it was imported separately, but here it is imported from lib/uniform-offers
// We need to check if StructuredData imports UNIFORM_OFFERS from another file.
// It imports UNIFORM_OFFERS from '@/lib/uniform-offers'

jest.mock('@/lib/uniform-offers', () => ({
  UNIFORM_OFFERS: {
    SAME_DAY_SERVICE: 'Same Day Service',
    FREE_ESTIMATES: 'Free Estimates',
  },
  PRICING_LANGUAGE: {
    PRICING_NOTES: {
      INCLUDES_LABOR: 'Includes labor',
    },
  },
}))

describe('StructuredData Component', () => {
  beforeEach(() => {
    ;(getAggregateTestimonialStats as jest.Mock).mockReturnValue({
      averageRating: 5,
      reviewCount: 10,
    })
  })

  it('correctly calculates price range for LocalBusiness', () => {
    // specific inputs
    ;(getActiveServices as jest.Mock).mockReturnValue([
      { name: 'Service A', price: 'From $150', description: 'Desc A', category: 'residential' },
      { name: 'Service B', price: 'From $80', description: 'Desc B', category: 'residential' },
      {
        name: 'Service C',
        price: 'From $200 to $500',
        description: 'Desc C',
        category: 'residential',
      },
      { name: 'Service D', price: 'Contact us', description: 'Desc D', category: 'residential' }, // Ignored
      { name: 'Service E', price: '$120', description: 'Desc E', category: 'residential' },
    ])

    const { container } = render(<StructuredData type="LocalBusiness" />)

    const scriptTag = container.querySelector('script[type="application/ld+json"]')
    expect(scriptTag).not.toBeNull()

    if (scriptTag) {
      const json = JSON.parse(scriptTag.innerHTML)
      // Expected sorted prices: 80, 120, 150, 200, 500
      // Min: 80, Max: 500
      // Expected string: "$80-$500"
      expect(json.priceRange).toBe('$80-$500')
    }
  })

  it('handles single price correctly', () => {
    ;(getActiveServices as jest.Mock).mockReturnValue([
      { name: 'Service A', price: '$100', description: 'Desc A', category: 'residential' },
    ])

    const { container } = render(<StructuredData type="LocalBusiness" />)
    const scriptTag = container.querySelector('script[type="application/ld+json"]')
    if (scriptTag) {
      const json = JSON.parse(scriptTag.innerHTML)
      // Min: 100, Max: 100
      // Logic: `$${min}${max && max !== min ? `-$${max}` : '+'}`
      // If max == min, it returns "$100+"
      expect(json.priceRange).toBe('$100+')
    }
  })

  it('handles empty prices correctly', () => {
    ;(getActiveServices as jest.Mock).mockReturnValue([])

    const { container } = render(<StructuredData type="LocalBusiness" />)
    const scriptTag = container.querySelector('script[type="application/ld+json"]')
    if (scriptTag) {
      const json = JSON.parse(scriptTag.innerHTML)
      expect(json.priceRange).toBeUndefined()
    }
  })
})
