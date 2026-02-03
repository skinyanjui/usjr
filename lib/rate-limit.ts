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
    // Optimization: Ensure the IP is moved to the end of the map (MRU)
    // This allows cleanup to iterate from the start (LRU) and stop early
    this.ipToTimestamps.delete(ip)
    this.ipToTimestamps.set(ip, recent)
    return true
  }

  /**
   * Removes entries that have no valid timestamps within the window.
   */
  private cleanup(now: number) {
    const DELETE_LIMIT = 1000
    let deleted = 0

    for (const [ip, timestamps] of this.ipToTimestamps.entries()) {
      // Optimization: Check the last (newest) timestamp.
      // If the newest timestamp is expired, all are expired.
      // Timestamps are sorted ascending (pushed on access).
      if (timestamps.length > 0) {
        const newest = timestamps[timestamps.length - 1]
        if (now - newest < this.windowMs) {
          // Found a valid entry. Since we iterate from LRU, all subsequent entries are valid.
          // Update lastCleanup because we are effectively clean.
          this.lastCleanup = now
          return
        }
      }

      // If we reach here, the entry is expired (or empty).
      this.ipToTimestamps.delete(ip)
      deleted++

      if (deleted >= DELETE_LIMIT) {
        // Stop early to avoid blocking.
        // We do NOT update this.lastCleanup, so cleanup will run again on the next check.
        return
      }
    }

    // If we iterated the whole map, we are done.
    this.lastCleanup = now
  }

  // Expose for monitoring/testing
  get size() {
    return this.ipToTimestamps.size
  }
}
