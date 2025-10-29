import { POST } from '@/app/api/quote/route'
import { NextRequest } from 'next/server'

describe('Quote API Route', () => {
  // Mock environment variables
  const originalEnv = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    process.env.NODE_ENV = 'test'
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('POST /api/quote', () => {
    it('should reject requests with missing required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        body: JSON.stringify({
          name: '',
          phone: '',
          email: 'invalid-email',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.ok).toBe(false)
      expect(data.errors).toBeDefined()
    })

    it('should accept valid quote submissions', async () => {
      const validQuote = {
        name: 'John Doe',
        phone: '8124019022',
        email: 'john@example.com',
        address: '123 Main St, Evansville, IN',
        service: 'Junk Removal',
        projectSize: 'Half truck load',
        details: 'Need to remove old furniture',
        source: 'website',
      }

      const request = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        body: JSON.stringify(validQuote),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ok).toBe(true)
    })

    it('should block honeypot spam submissions', async () => {
      const spamQuote = {
        name: 'Spammer',
        phone: '1234567890',
        email: 'spam@example.com',
        service: 'Service',
        website: 'http://spam.com', // Honeypot field filled
      }

      const request = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        body: JSON.stringify(spamQuote),
      })

      const response = await POST(request)
      const data = await response.json()

      // Should return success but not actually process
      expect(response.status).toBe(200)
      expect(data.ok).toBe(true)
    })

    it('should validate email format', async () => {
      const invalidEmailQuote = {
        name: 'John Doe',
        phone: '8124019022',
        email: 'not-an-email',
        service: 'Junk Removal',
      }

      const request = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        body: JSON.stringify(invalidEmailQuote),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.ok).toBe(false)
      expect(data.errors).toBeDefined()
    })

    it('should normalize different field names', async () => {
      const quoteWithAltFields = {
        fullName: 'Jane Smith', // Alternative field name
        phoneNumber: '8124019022', // Alternative field name
        emailAddress: 'jane@example.com', // Alternative field name
        serviceNeeded: 'Cleaning',
        message: 'Need deep cleaning',
      }

      const request = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        body: JSON.stringify(quoteWithAltFields),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ok).toBe(true)
    })

    it('should enforce rate limiting', async () => {
      const validQuote = {
        name: 'John Doe',
        phone: '8124019022',
        email: 'john@example.com',
        service: 'Junk Removal',
      }

      // Make 6 requests in quick succession
      const requests = []
      for (let i = 0; i < 6; i++) {
        const request = new NextRequest('http://localhost:3000/api/quote', {
          method: 'POST',
          headers: {
            'x-forwarded-for': '192.168.1.1',
          },
          body: JSON.stringify(validQuote),
        })
        requests.push(POST(request))
      }

      const responses = await Promise.all(requests)
      const lastResponse = responses[responses.length - 1]

      // The 6th request should be rate limited
      expect(lastResponse.status).toBe(429)
      const data = await lastResponse.json()
      expect(data.error).toBe('Too many requests')
    })
  })
})
