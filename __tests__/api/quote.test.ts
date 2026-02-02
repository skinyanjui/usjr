/** @jest-environment node */
import { POST } from '@/app/api/quote/route'
import { resend } from '@/lib/resend'

// Mock resend
jest.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  },
  EMAIL_CONFIG: {
    from: 'from@example.com',
    to: 'to@example.com',
    customerFrom: 'customer@example.com',
  },
}))

// Mock rate limiter to always allow
jest.mock('@/lib/rate-limit', () => {
  return {
    RateLimiter: jest.fn().mockImplementation(() => ({
      check: jest.fn().mockReturnValue(true),
    })),
  }
})

describe('POST /api/quote', () => {
  it('should process form data with attachments correctly', async () => {
    const formData = new FormData()
    formData.append('name', 'John Doe')
    formData.append('phone', '1234567890')
    formData.append('email', 'john@example.com')
    formData.append('service', 'Junk Removal')

    // Create a dummy file
    const fileContent = Buffer.from('test content')
    const file = new File([fileContent], 'test.txt', { type: 'text/plain' })
    formData.append('attachments', file)

    const req = new Request('http://localhost/api/quote', {
      method: 'POST',
      body: formData,
    })

    const res = await POST(req)
    expect(res.status).toBe(200)

    const responseBody = await res.json()
    expect(responseBody.ok).toBe(true)

    // Check if resend was called with attachments
    expect(resend?.emails.send).toHaveBeenCalled()

    // Find the call that went to the business (contains attachments)
    const calls = (resend?.emails.send as jest.Mock).mock.calls
    // calls is Array<Array<Args>>. We want the first arg of the matching call.
    const businessCallArgs = calls.find((args: any[]) => args[0].subject.includes('New Quote Request'))

    expect(businessCallArgs).toBeDefined()
    const businessCall = businessCallArgs![0]

    expect(businessCall.attachments).toHaveLength(1)
    expect(businessCall.attachments[0].filename).toBe('test.txt')

    // Verify content
    const content = businessCall.attachments[0].content
    expect(Buffer.isBuffer(content)).toBe(true)
    expect(content.toString()).toBe('test content')
  })
})
