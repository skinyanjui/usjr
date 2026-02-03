/**
 * @jest-environment node
 */
import { POST } from '@/app/api/quote/route'

// Mock dependencies
jest.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: jest.fn().mockImplementation(async () => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 200))
        return { id: 'mock-id' }
      }),
    },
  },
  EMAIL_CONFIG: {
    from: 'test@example.com',
    to: 'test@example.com',
    customerFrom: 'test@example.com',
  },
}))

jest.mock('@/lib/rate-limit', () => ({
  RateLimiter: jest.fn().mockImplementation(() => ({
    check: jest.fn().mockReturnValue(true),
  })),
}))

// Mock next/server to handle 'after'
jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server')
  return {
    ...actual,
    after: jest.fn((cb) => {
      // Execute the callback so the logic runs, but we don't await its result
      // This mimics the fire-and-forget nature (relative to the response)
      cb()
    }),
    NextResponse: actual.NextResponse,
  }
})

describe('Quote API Performance Benchmark', () => {
  it('measures response time with email sending', async () => {
    const start = performance.now()

    const req = new Request('http://localhost:3000/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Benchmark User',
        phone: '1234567890',
        email: 'benchmark@example.com',
        service: 'Junk Removal',
      }),
    })

    const res = await POST(req)
    const end = performance.now()
    const duration = end - start

    console.log(`Quote API Request Duration: ${duration.toFixed(2)}ms`)
    expect(res.status).toBe(200)

    // Verify non-blocking behavior (optimization)
    // It should take significantly less than the 200ms delay
    expect(duration).toBeLessThan(100)
  })
})
