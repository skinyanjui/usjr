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

    let hits = this.ipToTimestamps.get(ip)

    if (!hits) {
      hits = []
      this.ipToTimestamps.set(ip, hits)
    } else {
      // Optimization: Ensure the IP is moved to the end of the map (MRU)
      // This allows cleanup to iterate from the start (LRU) and stop early
      this.ipToTimestamps.delete(ip)
      this.ipToTimestamps.set(ip, hits)
    }

    const windowStart = now - this.windowMs

    // Filter out timestamps that are outside the window
    // We do this on access to ensure we check against the current window
    // Optimized: In-place filtering to avoid allocating new arrays
    const validStartIndex = hits.findIndex((t) => t > windowStart)

    if (validStartIndex === -1) {
      // If no valid timestamps found, clear the array
      if (hits.length > 0) {
        hits.length = 0
      }
    } else if (validStartIndex > 0) {
      // Remove old timestamps from the beginning
      hits.splice(0, validStartIndex)
    }

    if (hits.length >= this.maxRequests) {
      return false
    }

    hits.push(now)
    return true
  }

  /**
   * Removes entries that have no valid timestamps within the window.
   */
  private cleanup(now: number) {
    this.lastCleanup = now
    const windowStart = now - this.windowMs

    for (const [ip, timestamps] of this.ipToTimestamps.entries()) {
      // Optimization: Check if the *last* timestamp (most recent) is expired.
      // If it is, then ALL timestamps for this IP are expired (sorted array).
      // This avoids allocating a new array with .filter()
      const lastTimestamp = timestamps[timestamps.length - 1]

      if (lastTimestamp === undefined || lastTimestamp <= windowStart) {
        this.ipToTimestamps.delete(ip)
      } else {
        // Optimization: Stop iterating once we find a valid entry.
        // Since we maintain insertion order on access (LRU at start), if we find a valid entry,
        // all subsequent entries must also be valid (accessed more recently).
        return
      }
    }
  }

  // Expose for monitoring/testing
  get size() {
    return this.ipToTimestamps.size
  }
}
