export type RateLimitConfig = {
  windowMs: number
  maxRequests: number
  cleanupIntervalMs?: number // How often to run cleanup (default: 1 minute)
}

export class RateLimiter {
  private ipToTimestamps = new Map<string, number[]>()
  private windowMs: number
  private maxRequests: number
  private cleanupIntervalMs: number
  private lastCleanup: number

  constructor(config: RateLimitConfig) {
    this.windowMs = config.windowMs
    this.maxRequests = config.maxRequests
    // Default cleanup every minute, or user provided
    this.cleanupIntervalMs = config.cleanupIntervalMs ?? 60 * 1000
    this.lastCleanup = Date.now()
  }

  /**
   * Checks if the IP is allowed.
   * Returns true if allowed, false if blocked.
   */
  check(ip: string): boolean {
    const now = Date.now()

    // Lazy cleanup: run if enough time has passed since last cleanup
    if (now - this.lastCleanup > this.cleanupIntervalMs) {
      this.cleanup(now)
    }

    const hits = this.ipToTimestamps.get(ip) || []

    // Filter out timestamps that are outside the window
    // We do this on access to ensure we check against the current window
    const recent = hits.filter(t => now - t < this.windowMs)

    if (recent.length >= this.maxRequests) {
      return false
    }

    recent.push(now)
    this.ipToTimestamps.set(ip, recent)
    return true
  }

  /**
   * Removes entries that have no valid timestamps within the window.
   */
  private cleanup(now: number) {
    for (const [ip, timestamps] of this.ipToTimestamps.entries()) {
      const valid = timestamps.filter(t => now - t < this.windowMs)
      if (valid.length === 0) {
        this.ipToTimestamps.delete(ip)
      } else {
        // Optimization: only update the map if the array reference changed (i.e. we filtered something)
        // Array.filter creates a new array, so we always update if length changed
        // Actually, since we always filter on access (in check), the array in the map *might* contain old entries
        // if that IP hasn't been seen in a while.

        // However, here we are iterating all keys.
        // If we filtered out items, we update.
        if (valid.length < timestamps.length) {
          this.ipToTimestamps.set(ip, valid)
        }
      }
    }
    this.lastCleanup = now
  }

  // Expose for monitoring/testing
  get size() {
    return this.ipToTimestamps.size
  }
}
