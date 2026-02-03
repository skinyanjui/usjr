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
    this.lastCleanup = now
    for (const [ip, timestamps] of this.ipToTimestamps.entries()) {
      if (timestamps.length === 0) {
        this.ipToTimestamps.delete(ip)
        continue
      }

      const newest = timestamps[timestamps.length - 1]
      if (newest && now - newest < this.windowMs) {
        // Optimization: Stop iterating once we find a valid entry.
        // Since we maintain insertion order on access (LRU at start), if we find a valid entry,
        // all subsequent entries must also be valid (accessed more recently).
        return
      }

      this.ipToTimestamps.delete(ip)
    }
  }

  // Expose for monitoring/testing
  get size() {
    return this.ipToTimestamps.size
  }
}
