import { z } from 'zod'

// Basic in-memory rate limiting (best-effort; for production use a durable store like Upstash)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5
const ipToTimestamps = new Map<string, number[]>()

const QuoteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(7, 'Phone is required'),
  email: z.string().email('Valid email required'),
  address: z.string().optional().default(''),
  service: z.string().min(1, 'Service is required'),
  projectSize: z.string().optional().default(''),
  details: z.string().optional().default(''),
  source: z.string().optional().default('website'),
  timestamp: z.string().optional(),
  // Honeypot field (should remain empty)
  website: z.string().optional().default(''),
})

function normalize(body: any) {
  return {
    name: body?.name ?? body?.fullName ?? '',
    phone: body?.phone ?? body?.phoneNumber ?? '',
    email: body?.email ?? body?.emailAddress ?? '',
    address: body?.address ?? body?.serviceAddress ?? '',
    service: body?.service ?? body?.serviceNeeded ?? '',
    projectSize: body?.projectSize ?? '',
    details: body?.message ?? body?.details ?? body?.projectDetails ?? '',
    source: body?.source ?? 'website',
    timestamp: new Date().toISOString(),
  }
}

export async function POST(req: Request) {
  try {
    const raw = await req.json()

    // Honeypot check: if filled, treat as success without processing
    if (typeof raw?.website === 'string' && raw.website.trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Rate limit per IP
    const ipHeader = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const ip = (ipHeader.split(',')[0] || 'unknown').trim()
    const now = Date.now()
    const hits = ipToTimestamps.get(ip) || []
    const recent = hits.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
    if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
      return new Response(JSON.stringify({ ok: false, error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    recent.push(now)
    ipToTimestamps.set(ip, recent)
    const normalized = normalize(raw)
    const parsed = QuoteSchema.safeParse(normalized)
    if (!parsed.success) {
      return new Response(JSON.stringify({ ok: false, errors: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // In production, send to an email service, CRM, or database here.
    // Avoid logging PII in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('New quote request:', parsed.data)
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Quote API error:', err)
    return new Response(JSON.stringify({ ok: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
