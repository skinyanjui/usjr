import { NextRequest } from 'next/server'
import { z } from 'zod'

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
  location: z.string().optional().default(''),
  hasPhotos: z.boolean().optional().default(false),
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
    location: body?.location ?? '',
    hasPhotos: body?.hasPhotos ?? false,
    timestamp: new Date().toISOString(),
  }
}

async function sendEmailNotification(data: any) {
  // Using Resend (recommended) or SendGrid
  const emailBody = `
    New Quote Request from ${data.name}
    
    Contact Information:
    - Name: ${data.name}
    - Phone: ${data.phone}
    - Email: ${data.email}
    - Service Address: ${data.address || 'Not provided'}
    
    Service Details:
    - Service Needed: ${data.service}
    - Project Size: ${data.projectSize || 'Not specified'}
    - Location: ${data.location || 'Not specified'}
    - Source: ${data.source}
    - Has Photos: ${data.hasPhotos ? 'Yes' : 'No'}
    
    Project Details:
    ${data.details || 'No additional details provided'}
    
    Submitted: ${data.timestamp}
  `

  try {
    // Option 1: Using Resend (Recommended)
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'quotes@unclesamjunkremoval.com', // Your verified domain
          to: ['sam@sandalwoodmedical.com'],
          subject: `New Quote Request from ${data.name} - ${data.service}`,
          text: emailBody,
          html: emailBody.replace(/\n/g, '<br>'),
        }),
      })
      return response.ok
    }
    
    // Option 2: Using SendGrid as fallback
    if (process.env.SENDGRID_API_KEY) {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: 'sam@sandalwoodmedical.com' }],
            subject: `New Quote Request from ${data.name} - ${data.service}`,
          }],
          from: { email: 'quotes@unclesamjunkremoval.com' },
          content: [{
            type: 'text/plain',
            value: emailBody,
          }],
        }),
      })
      return response.ok
    }
    
    return false
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()

    // Honeypot check
    if (typeof raw?.website === 'string' && raw.website.trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Rate limiting
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

    // Validate and normalize data
    const normalized = normalize(raw)
    const parsed = QuoteSchema.safeParse(normalized)
    
    if (!parsed.success) {
      return new Response(JSON.stringify({ ok: false, errors: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Send email notification
    const emailSent = await sendEmailNotification(parsed.data)
    
    if (!emailSent) {
      console.error('Failed to send email notification')
      // Don't fail the request, but log it for monitoring
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
