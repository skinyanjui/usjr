/**
 * @jest-environment node
 */
import { POST } from '@/app/api/send/route'

// Mock dependencies
jest.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: jest.fn().mockImplementation(async () => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 200))
        return { data: { id: 'mock-id' }, error: null }
      }),
    },
  },
  EMAIL_CONFIG: {
    from: 'test@example.com',
    to: 'test@example.com',
  },
}))

// Mock next/server to handle 'after'
jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server')
  return {
    ...actual,
    after: jest.fn((cb) => {
      // Execute the callback so the logic runs, but we don't await its result
      cb()
    }),
    NextResponse: actual.NextResponse,
  }
})

describe('Send API Performance Benchmark', () => {
  it('measures response time with email sending', async () => {
    const start = performance.now()

    const req = new Request('http://localhost:3000/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Benchmark User',
        email: 'benchmark@example.com',
        message: 'Hello World',
      }),
    })

    const res = await POST(req)
    const end = performance.now()
    const duration = end - start

    console.log(`Send API Request Duration: ${duration.toFixed(2)}ms`)
    expect(res.status).toBe(200)

    // Verify optimization: response should be instant (< 50ms) despite 200ms email delay
    expect(duration).toBeLessThan(50)

    const body = await res.json()
    expect(body).toEqual({ success: true })
  })
})
