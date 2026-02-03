/**
 * @jest-environment node
 */
import { RateLimiter } from '@/lib/rate-limit'

describe('RateLimiter Cleanup Performance', () => {
  it('measures cleanup time with 50k expired entries', async () => {
    // Setup
    const N = 50000;
    const limiter = new RateLimiter({
      windowMs: 100,
      maxRequests: 5,
      cleanupIntervalMs: 50 // frequent cleanup
    });

    // Disable auto cleanup during population by setting interval very high
    (limiter as any).cleanupIntervalMs = 1000000;

    // We also need to make sure lastCleanup is set such that it doesn't trigger immediately
    // Constructor sets it to Date.now().

    const populateStart = performance.now();
    for (let i = 0; i < N; i++) {
        limiter.check(`ip-${i}`);
    }
    const populateEnd = performance.now();
    console.log(`Population took ${(populateEnd - populateStart).toFixed(2)}ms`);

    // Wait for expiration
    await new Promise(resolve => setTimeout(resolve, 200));

    // Force cleanup on next check
    (limiter as any).cleanupIntervalMs = 0; // Trigger immediately
    (limiter as any).lastCleanup = 0;

    const start = performance.now();
    // This check should trigger cleanup
    limiter.check('new-ip');
    const end = performance.now();

    const duration = end - start;
    console.log(`Cleanup duration for ${N} expired items: ${duration.toFixed(2)}ms`);

    // Verify cleanup happened (or partially happened)
    console.log(`Map size after cleanup: ${limiter.size}`);
  });
});
