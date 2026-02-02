/** @jest-environment node */
import { POST } from '@/app/api/quote/route';
import { resend } from '@/lib/resend';
import { RateLimiter } from '@/lib/rate-limit';

// Mock lib/resend
jest.mock('@/lib/resend', () => ({
  resend: {
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'mock-id' }),
    },
  },
  EMAIL_CONFIG: {
    from: 'test@example.com',
    to: 'business@example.com',
    customerFrom: 'test@example.com',
  },
}));

// Mock lib/rate-limit
jest.mock('@/lib/rate-limit', () => {
  return {
    RateLimiter: jest.fn().mockImplementation(() => ({
      check: jest.fn().mockReturnValue(true),
    })),
  };
});

describe('Quote API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process a valid quote request and send two emails', async () => {
    const body = {
      name: 'John Doe',
      phone: '1234567890',
      email: 'john@example.com',
      service: 'Junk Removal',
      website: '', // Honeypot empty
    };

    const req = new Request('http://localhost/api/quote', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.ok).toBe(true);

    // Verify two emails were sent
    expect(resend!.emails.send).toHaveBeenCalledTimes(2);
  });

  it('should return 400 for invalid data', async () => {
      const body = {
          name: '', // Invalid
      };

      const req = new Request('http://localhost/api/quote', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
              'content-type': 'application/json',
          },
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      expect(resend!.emails.send).not.toHaveBeenCalled();
  });
});
