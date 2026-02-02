import { RateLimiter } from '@/lib/rate-limit'

describe('RateLimiter', () => {
  let limiter: RateLimiter

  beforeEach(() => {
    // Basic config for testing
    limiter = new RateLimiter({
      windowMs: 1000,
      maxRequests: 2,
      cleanupIntervalMs: 10000, // Manual cleanup for most tests
    })
  })

  it('allows requests under the limit', () => {
    expect(limiter.check('1.2.3.4')).toBe(true)
    expect(limiter.check('1.2.3.4')).toBe(true)
  })

  it('blocks requests over the limit', () => {
    expect(limiter.check('1.2.3.4')).toBe(true)
    expect(limiter.check('1.2.3.4')).toBe(true)
    expect(limiter.check('1.2.3.4')).toBe(false)
  })

  it('tracks IPs independently', () => {
    expect(limiter.check('1.1.1.1')).toBe(true)
    expect(limiter.check('1.1.1.1')).toBe(true)
    expect(limiter.check('1.1.1.1')).toBe(false)

    expect(limiter.check('2.2.2.2')).toBe(true)
  })

  it('cleans up expired entries', async () => {
    // Short window for this test
    const shortLimiter = new RateLimiter({
      windowMs: 50,
      maxRequests: 5,
      cleanupIntervalMs: 10, // Cleanup often
    })

    shortLimiter.check('1.2.3.4')
    expect(shortLimiter.size).toBe(1)

    // Wait for window to expire
    await new Promise(r => setTimeout(r, 60))

    // Trigger cleanup
    shortLimiter.check('5.6.7.8')

    // Should have removed 1.2.3.4, and added 5.6.7.8. Size should be 1.
    expect(shortLimiter.size).toBe(1)
  })

  it('maintains LRU order and cleans up correctly', async () => {
    const limiter = new RateLimiter({
      windowMs: 100,
      maxRequests: 5,
      cleanupIntervalMs: 10,
    })

    // T=0. Add A.
    limiter.check('A')
    // T=50. Add B.
    await new Promise(r => setTimeout(r, 50))
    limiter.check('B')

    // T=120. A is expired (120 > 0+100). B is valid (120 < 50+100).
    await new Promise(r => setTimeout(r, 70))

    // Trigger cleanup (via check C)
    limiter.check('C')

    // A should be gone. B should be present. C should be present.
    expect(limiter.size).toBe(2)
  })
})
