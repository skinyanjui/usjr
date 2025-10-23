import { z } from 'zod'
import { Resend } from 'resend'

// Initialize Resend
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
  // Additional form fields
  segment: z.string().optional().default(''),
  sector: z.string().optional().default(''),
  sqft: z.string().optional().default(''),
  bedrooms: z.string().optional().default(''),
  bathrooms: z.string().optional().default(''),
  businessType: z.string().optional().default(''),
  suiteAccess: z.string().optional().default(''),
  preferredDate: z.string().optional().default(''),
  preferredTime: z.string().optional().default(''),
  ecoFriendly: z.boolean().optional().default(false),
  message: z.string().optional().default(''),
  // Junk removal fields
  loadSize: z.string().optional().default(''),
  itemsDescription: z.string().optional().default(''),
  // Light demolition fields
  structureType: z.string().optional().default(''),
  approxSize: z.string().optional().default(''),
  utilitiesDisconnected: z.boolean().optional().default(false),
  demolitionMaterial: z.string().optional().default(''),
  haulAway: z.boolean().optional().default(false),
  // Estate cleanout fields
  estatePropertyType: z.string().optional().default(''),
  estateRooms: z.string().optional().default(''),
  estateAccess: z.string().optional().default(''),
  estateTimeline: z.string().optional().default(''),
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
    // Additional fields
    segment: body?.segment ?? '',
    sector: body?.sector ?? '',
    sqft: body?.sqft ?? '',
    bedrooms: body?.bedrooms ?? '',
    bathrooms: body?.bathrooms ?? '',
    businessType: body?.businessType ?? '',
    suiteAccess: body?.suiteAccess ?? '',
    preferredDate: body?.preferredDate ?? '',
    preferredTime: body?.preferredTime ?? '',
    ecoFriendly: body?.ecoFriendly ?? false,
    message: body?.message ?? '',
    loadSize: body?.loadSize ?? '',
    itemsDescription: body?.itemsDescription ?? '',
    structureType: body?.structureType ?? '',
    approxSize: body?.approxSize ?? '',
    utilitiesDisconnected: body?.utilitiesDisconnected ?? false,
    demolitionMaterial: body?.demolitionMaterial ?? '',
    haulAway: body?.haulAway ?? false,
    estatePropertyType: body?.estatePropertyType ?? '',
    estateRooms: body?.estateRooms ?? '',
    estateAccess: body?.estateAccess ?? '',
    estateTimeline: body?.estateTimeline ?? '',
  }
}

function formatQuoteEmail(data: z.infer<typeof QuoteSchema>): string {
  let html = `
    <h2>New Quote Request</h2>

    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      ${data.address ? `<li><strong>Address:</strong> ${data.address}</li>` : ''}
    </ul>

    <h3>Service Details</h3>
    <ul>
      ${data.segment ? `<li><strong>Segment:</strong> ${data.segment}</li>` : ''}
      ${data.sector ? `<li><strong>Sector:</strong> ${data.sector}</li>` : ''}
      <li><strong>Service:</strong> ${data.service}</li>
      ${data.preferredDate ? `<li><strong>Preferred Date:</strong> ${data.preferredDate}</li>` : ''}
      ${data.preferredTime ? `<li><strong>Preferred Time:</strong> ${data.preferredTime}</li>` : ''}
    </ul>
  `

  // Property details
  if (data.sqft || data.bedrooms || data.bathrooms || data.businessType) {
    html += `
      <h3>Property Details</h3>
      <ul>
        ${data.sqft ? `<li><strong>Square Footage:</strong> ${data.sqft}</li>` : ''}
        ${data.bedrooms ? `<li><strong>Bedrooms:</strong> ${data.bedrooms}</li>` : ''}
        ${data.bathrooms ? `<li><strong>Bathrooms:</strong> ${data.bathrooms}</li>` : ''}
        ${data.businessType ? `<li><strong>Business Type:</strong> ${data.businessType}</li>` : ''}
        ${data.suiteAccess ? `<li><strong>Suite Access:</strong> ${data.suiteAccess}</li>` : ''}
      </ul>
    `
  }

  // Junk removal details
  if (data.loadSize || data.itemsDescription) {
    html += `
      <h3>Junk Removal Details</h3>
      <ul>
        ${data.loadSize ? `<li><strong>Load Size:</strong> ${data.loadSize}</li>` : ''}
        ${data.itemsDescription ? `<li><strong>Items Description:</strong> ${data.itemsDescription}</li>` : ''}
      </ul>
    `
  }

  // Light demolition details
  if (data.structureType || data.approxSize || data.demolitionMaterial) {
    html += `
      <h3>Light Demolition Details</h3>
      <ul>
        ${data.structureType ? `<li><strong>Structure Type:</strong> ${data.structureType}</li>` : ''}
        ${data.approxSize ? `<li><strong>Approximate Size:</strong> ${data.approxSize}</li>` : ''}
        ${data.demolitionMaterial ? `<li><strong>Primary Material:</strong> ${data.demolitionMaterial}</li>` : ''}
        <li><strong>Utilities Disconnected:</strong> ${data.utilitiesDisconnected ? 'Yes' : 'No'}</li>
        <li><strong>Include Debris Haul-Away:</strong> ${data.haulAway ? 'Yes' : 'No'}</li>
      </ul>
    `
  }

  // Estate cleanout details
  if (data.estatePropertyType || data.estateRooms || data.estateAccess || data.estateTimeline) {
    html += `
      <h3>Estate Cleanout Details</h3>
      <ul>
        ${data.estatePropertyType ? `<li><strong>Property Type:</strong> ${data.estatePropertyType}</li>` : ''}
        ${data.estateRooms ? `<li><strong>Rooms/Areas:</strong> ${data.estateRooms}</li>` : ''}
        ${data.estateAccess ? `<li><strong>Access Constraints:</strong> ${data.estateAccess}</li>` : ''}
        ${data.estateTimeline ? `<li><strong>Timeline/Urgency:</strong> ${data.estateTimeline}</li>` : ''}
      </ul>
    `
  }

  // Additional information
  if (data.message || data.ecoFriendly) {
    html += `
      <h3>Additional Information</h3>
      <ul>
        ${data.ecoFriendly ? `<li><strong>Eco-Friendly Products Preferred:</strong> Yes</li>` : ''}
        ${data.message ? `<li><strong>Message:</strong> ${data.message}</li>` : ''}
      </ul>
    `
  }

  html += `
    <hr>
    <p><em>Submitted on: ${data.timestamp || new Date().toISOString()}</em></p>
    <p><em>Source: ${data.source}</em></p>
  `

  return html
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

    // Send email via Resend
    try {
      const emailHtml = formatQuoteEmail(parsed.data)

      await resend.emails.send({
        from: 'Quote Form <onboarding@resend.dev>',
        to: 'info@unclesamjunkremoval.com',
        subject: `New Quote Request from ${parsed.data.name} - ${parsed.data.sector || 'General Service'}`,
        html: emailHtml,
        reply_to: parsed.data.email,
      })

      // Avoid logging PII in production
      if (process.env.NODE_ENV !== 'production') {
        console.log('New quote request:', parsed.data)
      }
    } catch (emailError) {
      console.error('Failed to send email via Resend:', emailError)
      // Still return success to user, but log the error
      // You might want to implement a fallback notification system here
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
