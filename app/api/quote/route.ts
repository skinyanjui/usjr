import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Send email notification
    try {
      await resend.emails.send({
        from: 'Quote Form <samuel.kinyanjui.sk@gmail.com>',
        to: 'samuel.kinyanjui.sk@gmail.com',
        replyTo: parsed.data.email,
        subject: `New Quote Request from ${parsed.data.name}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Phone:</strong> ${parsed.data.phone}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Address:</strong> ${parsed.data.address || 'Not provided'}</p>
          <p><strong>Service:</strong> ${parsed.data.service}</p>
          <p><strong>Project Size:</strong> ${parsed.data.projectSize || 'Not specified'}</p>
          <p><strong>Details:</strong> ${parsed.data.details || 'No additional details provided'}</p>
          <p><strong>Source:</strong> ${parsed.data.source}</p>
          <p><strong>Timestamp:</strong> ${parsed.data.timestamp || new Date().toISOString()}</p>
        `,
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Continue processing even if email fails - don't block the quote submission
    }

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
