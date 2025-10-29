import {
  services,
  getServiceBySlug,
  getActiveServices,
  getAggregateTestimonialStats,
} from '@/lib/cms-content'

describe('CMS Content', () => {
  describe('services', () => {
    it('should have services defined', () => {
      expect(services).toBeDefined()
      expect(services.length).toBeGreaterThan(0)
    })

    it('should have required service properties', () => {
      services.forEach((service) => {
        expect(service).toHaveProperty('id')
        expect(service).toHaveProperty('title')
        expect(service).toHaveProperty('slug')
        expect(service).toHaveProperty('description')
        expect(service).toHaveProperty('active')
      })
    })

    it('should have unique service IDs', () => {
      const ids = services.map((s) => s.id)
      const uniqueIds = new Set(ids)
      expect(ids.length).toBe(uniqueIds.size)
    })

    it('should have unique service slugs', () => {
      const slugs = services.map((s) => s.slug)
      const uniqueSlugs = new Set(slugs)
      expect(slugs.length).toBe(uniqueSlugs.size)
    })
  })

  describe('getServiceBySlug', () => {
    it('should return service for valid slug', () => {
      const service = getServiceBySlug('junk-removal')
      expect(service).toBeDefined()
      expect(service?.slug).toBe('junk-removal')
    })

    it('should return undefined for invalid slug', () => {
      const service = getServiceBySlug('non-existent-service')
      expect(service).toBeUndefined()
    })
  })

  describe('getActiveServices', () => {
    it('should return only active services', () => {
      const activeServices = getActiveServices()
      activeServices.forEach((service) => {
        expect(service.active).toBe(true)
      })
    })

    it('should return array of services', () => {
      const activeServices = getActiveServices()
      expect(Array.isArray(activeServices)).toBe(true)
      expect(activeServices.length).toBeGreaterThan(0)
    })
  })

  describe('getAggregateTestimonialStats', () => {
    it('should return valid rating statistics', () => {
      const stats = getAggregateTestimonialStats()

      expect(stats).toHaveProperty('averageRating')
      expect(stats).toHaveProperty('reviewCount')

      expect(stats.averageRating).toBeGreaterThanOrEqual(0)
      expect(stats.averageRating).toBeLessThanOrEqual(5)
      expect(stats.reviewCount).toBeGreaterThanOrEqual(0)
    })

    it('should have reasonable rating values', () => {
      const stats = getAggregateTestimonialStats()

      // Average rating should be a number with reasonable precision
      expect(typeof stats.averageRating).toBe('number')
      expect(Number.isFinite(stats.averageRating)).toBe(true)

      // Review count should be a positive integer
      expect(typeof stats.reviewCount).toBe('number')
      expect(Number.isInteger(stats.reviewCount)).toBe(true)
      expect(stats.reviewCount).toBeGreaterThan(0)
    })
  })
})
