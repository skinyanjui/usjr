import { z } from 'zod'
import { Resend } from 'resend'

// Lazy initialization to handle missing API key gracefully
let resend: Resend | null = null
function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

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

    // Send email notification to business owner
    try {
      const resendClient = getResendClient()
      if (!resendClient) {
        console.warn('RESEND_API_KEY not configured - skipping email notifications')
      } else {
        await resendClient.emails.send({
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
      }
    } catch (emailError) {
      console.error('Failed to send business notification email:', emailError)
      // Continue processing even if email fails - don't block the quote submission
    }

    // Send confirmation email to customer
    try {
      const resendClient = getResendClient()
      if (!resendClient) {
        console.warn('RESEND_API_KEY not configured - skipping customer confirmation email')
      } else {
        await resendClient.emails.send({
          from: 'US Junk Removal <samuel.kinyanjui.sk@gmail.com>',
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
      }
    } catch (emailError) {
      console.error('Failed to send customer confirmation email:', emailError)
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
