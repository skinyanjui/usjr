import { getDistance, CITY_COORDINATES } from '@/lib/location-utils'

describe('location-utils', () => {
  describe('getDistance', () => {
    it('calculates distance between two points correctly', () => {
      // Evansville to Newburgh
      const evansville = CITY_COORDINATES['Evansville']
      const newburgh = CITY_COORDINATES['Newburgh']

      const distance = getDistance(
        evansville.lat,
        evansville.lng,
        newburgh.lat,
        newburgh.lng
      )

      // Expected distance is approx 14-15 km based on coordinates
      // Let's assert it's a number and within a reasonable range
      expect(typeof distance).toBe('number')
      expect(distance).toBeGreaterThan(10)
      expect(distance).toBeLessThan(20)
    })

    it('returns 0 for same coordinates', () => {
      const distance = getDistance(10, 10, 10, 10)
      expect(distance).toBe(0)
    })

    it('calculates roughly 10007km for quarter earth circumference', () => {
       const distance = getDistance(0, 0, 0, 90)
       expect(distance).toBeCloseTo(10007.5, 0)
    })
  })
})
