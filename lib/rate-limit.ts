export type RateLimitConfig = {
  windowMs: number
  maxRequests: number
  cleanupIntervalMs?: number // How often to run cleanup (default: 1 minute)
}

type RateLimitEntry = {
  timestamps: number[]
  startIndex: number
}

export class RateLimiter {
  private ipToTimestamps = new Map<string, RateLimitEntry>()
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

    let entry = this.ipToTimestamps.get(ip)

    if (!entry) {
      entry = { timestamps: [], startIndex: 0 }
      this.ipToTimestamps.set(ip, entry)
    } else {
      // Optimization: Ensure the IP is moved to the end of the map (MRU)
      // This allows cleanup to iterate from the start (LRU) and stop early
      this.ipToTimestamps.delete(ip)
      this.ipToTimestamps.set(ip, entry)
    }

    const windowStart = now - this.windowMs

    // Advance startIndex to skip expired timestamps
    // We check timestamps[startIndex] because it's the oldest one we care about
    while (
      entry.startIndex < entry.timestamps.length &&
      entry.timestamps[entry.startIndex] <= windowStart
    ) {
      entry.startIndex++
    }

    // Lazy compaction: If we have accumulated too much "garbage" at the start,
    // we slice the array to free memory and reset startIndex.
    // Heuristic: If garbage is > 100 items AND > 50% of the array is garbage.
    if (entry.startIndex > 100 && entry.startIndex > entry.timestamps.length / 2) {
      entry.timestamps = entry.timestamps.slice(entry.startIndex)
      entry.startIndex = 0
    }

    const count = entry.timestamps.length - entry.startIndex

    if (count >= this.maxRequests) {
      return false
    }

    entry.timestamps.push(now)
    return true
  }

  /**
   * Removes entries that have no valid timestamps within the window.
   */
  private cleanup(now: number) {
    this.lastCleanup = now
    const windowStart = now - this.windowMs

    for (const [ip, entry] of this.ipToTimestamps.entries()) {
      // Optimization: Check if the *last* timestamp (most recent) is expired.
      // If it is, then ALL timestamps for this IP are expired (sorted array).
      const lastTimestamp = entry.timestamps[entry.timestamps.length - 1]

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
