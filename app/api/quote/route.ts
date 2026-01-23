import { z } from 'zod'
import { resend, EMAIL_CONFIG } from '@/lib/resend'
import { RateLimiter } from '@/lib/rate-limit'

// Basic in-memory rate limiting (best-effort; for production use a durable store like Upstash)
const limiter = new RateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 5,
})

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
  attachments: z
    .array(
      z.object({
        filename: z.string(),
        content: z.union([z.string(), z.instanceof(Buffer)]), // Accept Buffer or Base64 string
      })
    )
    .optional(),
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
    attachments: body?.attachments ?? [],
    website: body?.website ?? '',
  }
}

export async function POST(req: Request) {
  try {
    let raw: any = {}

    // Check Content-Type to decide how to parse
    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const attachments: { filename: string; content: Buffer }[] = []

      for (const [key, value] of formData.entries()) {
        if (key === 'attachments' && value instanceof File) {
          const arrayBuffer = await value.arrayBuffer()
          attachments.push({
            filename: value.name,
            content: Buffer.from(arrayBuffer),
          })
        } else if (typeof value === 'string') {
          raw[key] = value
        }
      }

      if (attachments.length > 0) {
        raw.attachments = attachments
      }
    } else {
      // Fallback to JSON
      try {
        raw = await req.json()
      } catch (e) {
        // ignore JSON parse error
      }
    }

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

    if (!limiter.check(ip)) {
      return new Response(JSON.stringify({ ok: false, error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const normalized = normalize(raw)
    const parsed = QuoteSchema.safeParse(normalized)
    if (!parsed.success) {
      return new Response(JSON.stringify({ ok: false, errors: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Send email notification to business owner
    try {
      if (!resend) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('RESEND_API_KEY not configured - skipping email notifications')
        }
      } else {
        const hasAttachments = parsed.data.attachments && parsed.data.attachments.length > 0

        const busRes = await resend.emails.send({
          from: EMAIL_CONFIG.from,
          to: EMAIL_CONFIG.to,
          replyTo: parsed.data.email,
          subject: `New Quote Request from ${parsed.data.name}`,
          attachments: hasAttachments ? (parsed.data.attachments as any) : undefined,
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
          ${hasAttachments ? `<p><strong>Attachments:</strong> ${parsed.data.attachments!.length} file(s) included</p>` : ''}
        `,
        })
        if (process.env.NODE_ENV !== 'production') {
          console.log('Business email send result:', busRes)
        }
      }

    // Send confirmation email to customer
    try {
      if (!resend) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('RESEND_API_KEY not configured - skipping customer confirmation email')
        }
      } else {
        const custRes = await resend.emails.send({
          from: EMAIL_CONFIG.customerFrom,
          to: parsed.data.email,
          subject: 'Your Quote Request - US Junk Removal & Cleaning',
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">Thank You for Your Quote Request!</h2>
            <p>Hi ${parsed.data.name},</p>
            <p>We've received your quote request and will get back to you within 2 hours with a detailed estimate.</p>

            <h3 style="color: #333; margin-top: 30px;">Your Quote Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Name:</td>
                <td style="padding: 10px 0;">${parsed.data.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0;">${parsed.data.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;">${parsed.data.email}</td>
              </tr>
              ${
                parsed.data.address
                  ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Property Address:</td>
                <td style="padding: 10px 0;">${parsed.data.address}</td>
              </tr>
              `
                  : ''
              }
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Service Requested:</td>
                <td style="padding: 10px 0;">${parsed.data.service}</td>
              </tr>
              ${
                parsed.data.projectSize
                  ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Project Size:</td>
                <td style="padding: 10px 0;">${parsed.data.projectSize}</td>
              </tr>
              `
                  : ''
              }
              ${
                parsed.data.details
                  ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Additional Details:</td>
                <td style="padding: 10px 0;">${parsed.data.details}</td>
              </tr>
              `
                  : ''
              }
            </table>

            <div style="margin-top: 30px; padding: 20px; background-color: #f0fdf4; border-left: 4px solid #16a34a;">
              <h3 style="margin-top: 0; color: #16a34a;">What Happens Next?</h3>
              <ul style="margin: 10px 0;">
                <li>We'll review your request carefully</li>
                <li>You'll receive a detailed quote within 2 hours</li>
                <li>Our team will answer any questions you have</li>
              </ul>
            </div>

            <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; text-align: center;">
              <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
              <p style="margin: 10px 0; font-size: 18px; color: #16a34a;">Call or text: (812) 401-9022</p>
            </div>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Thank you for choosing US Junk Removal & Cleaning. We look forward to serving you!
            </p>
          </div>
        `,
        })
        if (process.env.NODE_ENV !== 'production') {
          console.log('Customer email send result:', custRes)
        }
      }

      await Promise.allSettled([sendBusinessEmail(), sendCustomerEmail()])
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
