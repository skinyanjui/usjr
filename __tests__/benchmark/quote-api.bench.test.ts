/**
 * @jest-environment node
 */
import { POST } from '@/app/api/quote/route'

// Mock environment variables
process.env.RESEND_API_KEY = 're_123456789'

// Mock dependencies
jest.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: jest.fn().mockImplementation(async () => {
        await new Promise(resolve => setTimeout(resolve, 100)) // 100ms delay
        return { id: 'email_123' }
      }),
    },
  },
  EMAIL_CONFIG: {
    from: 'test@example.com',
    to: 'owner@example.com',
    customerFrom: 'test@example.com',
  },
}))

jest.mock('@/lib/rate-limit', () => ({
  RateLimiter: jest.fn().mockImplementation(() => ({
    check: jest.fn().mockReturnValue(true),
  })),
}))

describe('Quote API Benchmark', () => {
  it('measures execution time of POST request', async () => {
    const body = {
      name: 'Test User',
      phone: '555-0123',
      email: 'test@example.com',
      service: 'Junk Removal',
      address: '123 Test St',
      website: '', // honeypot
    }

    const req = new Request('http://localhost:3000/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const start = performance.now()
    const res = await POST(req)
    const end = performance.now()

    const duration = end - start
    console.log(`Benchmark Duration: ${duration.toFixed(2)}ms`)

    expect(res.status).toBe(200)

    // Verify mocks were called
    const { resend } = require('@/lib/resend')
    expect(resend.emails.send).toHaveBeenCalledTimes(2)
  })
})
