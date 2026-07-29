import { createHash, randomUUID } from 'node:crypto'
import { z } from 'zod'
import { RateLimiter } from '@/lib/rate-limit'
import {
  EMAIL_CONFIG,
  SITE_URL,
  emailDocument,
  escapeHtml,
  quoteReplyAddress,
  resend,
} from '@/lib/resend'

export const runtime = 'nodejs'

const limiter = new RateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 6,
})

const QuoteSchema = z
  .object({
    submissionId: z.string().uuid(),
    name: z.string().trim().min(2).max(100),
    phone: z.string().trim().min(10).max(30),
    email: z.string().trim().email().max(254),
    address: z.string().trim().min(2).max(180),
    service: z.string().trim().min(1).max(80),
    urgency: z.enum(['today', 'within-2-3-days', 'choose-date', 'flexible']),
    preferredDate: z.string().trim().max(20).default(''),
    quantity: z.string().trim().max(80).default(''),
    placement: z.enum(['indoor', 'outdoor', 'both', 'unsure']),
    access: z.array(z.string().trim().max(40)).max(6).default([]),
    heavyMaterials: z.boolean().default(false),
    dismantling: z.boolean().default(false),
    heavyDetails: z.string().trim().max(500).default(''),
    preferredContact: z.enum(['call', 'text', 'email']),
    conditionalDetails: z.record(z.string()).default({}),
    notes: z.string().trim().max(1500).default(''),
    consent: z.boolean().default(false),
    source: z.string().trim().max(80).default('website'),
    company: z.string().trim().max(100).default(''),
    startedAt: z.number().int().nonnegative().optional(),
  })
  .superRefine((data, context) => {
    if (data.urgency === 'choose-date' && !data.preferredDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['preferredDate'],
        message: 'Choose a preferred date',
      })
    }

    if (data.source === 'quote-form-v2' && !data.consent) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['consent'],
        message: 'Service-contact consent is required',
      })
    }
  })

type QuoteData = z.infer<typeof QuoteSchema>

type LegacyAttachment = {
  filename: string
  content: string
}

function clientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function booleanValue(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on' || value === 'yes'
}

function normalizeStringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.fromEntries(
    Object.entries(value)
      .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
      .slice(0, 12)
  )
}

function normalizeAccess(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string').slice(0, 6)
  }

  return stringValue(value)
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .slice(0, 6)
}

async function parseRequest(
  request: Request
): Promise<{ raw: Record<string, unknown>; attachments: LegacyAttachment[] }> {
  const contentType = request.headers.get('content-type') || ''

  if (!contentType.includes('multipart/form-data')) {
    const body: unknown = await request.json()
    return {
      raw:
        body && typeof body === 'object' && !Array.isArray(body)
          ? (body as Record<string, unknown>)
          : {},
      attachments: [],
    }
  }

  const formData = await request.formData()
  const raw: Record<string, unknown> = {}
  const attachments: LegacyAttachment[] = []

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      if (
        key === 'attachments' &&
        value.size > 0 &&
        value.size <= 3_500_000 &&
        attachments.length < 8
      ) {
        attachments.push({
          filename: value.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120),
          content: Buffer.from(await value.arrayBuffer()).toString('base64'),
        })
      }
      continue
    }

    raw[key] = value
  }

  return { raw, attachments }
}

function normalizeQuote(raw: Record<string, unknown>): QuoteData {
  const source = stringValue(raw.source) || 'website'
  const legacy = source !== 'quote-form-v2'
  const conditionalDetails = normalizeStringRecord(raw.conditionalDetails)

  return {
    submissionId: stringValue(raw.submissionId) || randomUUID(),
    name: stringValue(raw.name) || stringValue(raw.fullName),
    phone: stringValue(raw.phone) || stringValue(raw.phoneNumber),
    email: stringValue(raw.email) || stringValue(raw.emailAddress),
    address:
      stringValue(raw.address) ||
      stringValue(raw.serviceAddress) ||
      stringValue(raw.location) ||
      'Not provided',
    service:
      stringValue(raw.service) || stringValue(raw.serviceNeeded) || stringValue(raw.projectSize),
    urgency:
      raw.urgency === 'today' ||
      raw.urgency === 'within-2-3-days' ||
      raw.urgency === 'choose-date' ||
      raw.urgency === 'flexible'
        ? raw.urgency
        : 'flexible',
    preferredDate: stringValue(raw.preferredDate),
    quantity: stringValue(raw.quantity) || stringValue(raw.projectSize),
    placement:
      raw.placement === 'indoor' ||
      raw.placement === 'outdoor' ||
      raw.placement === 'both' ||
      raw.placement === 'unsure'
        ? raw.placement
        : 'unsure',
    access: normalizeAccess(raw.access),
    heavyMaterials: booleanValue(raw.heavyMaterials),
    dismantling: booleanValue(raw.dismantling),
    heavyDetails: stringValue(raw.heavyDetails),
    preferredContact:
      raw.preferredContact === 'call' ||
      raw.preferredContact === 'text' ||
      raw.preferredContact === 'email'
        ? raw.preferredContact
        : 'call',
    conditionalDetails,
    notes:
      stringValue(raw.notes) ||
      stringValue(raw.details) ||
      stringValue(raw.projectDetails) ||
      stringValue(raw.message),
    consent: legacy || booleanValue(raw.consent),
    source,
    company: stringValue(raw.company) || stringValue(raw.website),
    ...(typeof raw.startedAt === 'number' ? { startedAt: raw.startedAt } : {}),
  }
}

function createReference(submissionId: string): string {
  const digest = createHash('sha256').update(submissionId).digest('hex').slice(0, 8)
  return `USJR-${digest.toUpperCase()}`
}

function label(value: string): string {
  const labels: Record<string, string> = {
    today: 'Today',
    'within-2-3-days': 'Within 2–3 days',
    'choose-date': 'Choose a date',
    flexible: 'Flexible',
    indoor: 'Indoor',
    outdoor: 'Outdoor',
    both: 'Indoor and outdoor',
    unsure: 'Not sure',
    call: 'Call',
    text: 'Text',
    email: 'Email',
  }

  return labels[value] || value
}

function detailRows(data: QuoteData): string {
  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Service address', data.address],
    ['Service', data.service],
    [
      'Timing',
      data.urgency === 'choose-date' && data.preferredDate
        ? `${label(data.urgency)}: ${data.preferredDate}`
        : label(data.urgency),
    ],
    ['Quantity / load', data.quantity || 'Not sure'],
    ['Location', label(data.placement)],
    ['Access', data.access.length > 0 ? data.access.map(label).join(', ') : 'No issue noted'],
    [
      'Heavy work',
      [
        data.heavyMaterials ? 'Heavy materials' : '',
        data.dismantling ? 'Dismantling needed' : '',
        data.heavyDetails,
      ]
        .filter(Boolean)
        .join(' — ') || 'None noted',
    ],
    ['Preferred contact', label(data.preferredContact)],
  ]

  for (const [key, value] of Object.entries(data.conditionalDetails)) {
    if (value) rows.push([key, value])
  }

  if (data.notes) rows.push(['Additional notes', data.notes])

  return rows
    .map(
      ([rowLabel, value]) => `<tr>
        <td style="padding-top:9px;padding-right:12px;padding-bottom:9px;padding-left:0;border-bottom:1px solid #ece7df;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;font-weight:700;color:#102f49;vertical-align:top;">${escapeHtml(rowLabel)}</td>
        <td style="padding-top:9px;padding-right:0;padding-bottom:9px;padding-left:12px;border-bottom:1px solid #ece7df;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;color:#344054;vertical-align:top;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join('')
}

function customerEmail(data: QuoteData, reference: string): string {
  return emailDocument(
    `<p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:30px;font-weight:700;color:#102f49;">Request ${escapeHtml(reference)} received</p>
     <p style="margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;color:#475467;">Hi ${escapeHtml(data.name)}, we have your request. We normally respond as soon as possible during business hours.</p>
     <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;margin-bottom:22px;">${detailRows(data)}</table>
     <table cellpadding="0" cellspacing="0" border="0" role="presentation">
       <tr>
         <td bgcolor="#a92723" style="background-color:#a92723;border-radius:999px;">
           <a href="${SITE_URL}/quote" style="display:inline-block;padding-top:11px;padding-right:18px;padding-bottom:11px;padding-left:18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:700;color:#ffffff;text-decoration:none;">View quote information</a>
         </td>
       </tr>
     </table>
     <p style="margin-top:22px;margin-right:0;margin-bottom:0;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#667085;">Urgent? Call <a href="tel:+18126101657" style="color:#102f49;text-decoration:underline;">(812) 610-1657</a>. Reply to this email to add information or photos.</p>`,
    `${reference} quote request received`
  )
}

function businessEmail(data: QuoteData, reference: string, attachmentCount: number): string {
  const phoneHref = data.phone.replace(/[^\d+]/g, '')
  const attachmentNote =
    attachmentCount > 0
      ? `<p style="margin-top:0;margin-right:0;margin-bottom:18px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#475467;">${attachmentCount} legacy form photo${attachmentCount === 1 ? '' : 's'} attached.</p>`
      : ''

  return emailDocument(
    `<p style="margin-top:0;margin-right:0;margin-bottom:8px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:30px;font-weight:700;color:#102f49;">New quote ${escapeHtml(reference)}</p>
     <p style="margin-top:0;margin-right:0;margin-bottom:18px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#475467;">Source: ${escapeHtml(data.source)}</p>
     ${attachmentNote}
     <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;margin-bottom:22px;">${detailRows(data)}</table>
     <table cellpadding="0" cellspacing="0" border="0" role="presentation">
       <tr>
         <td bgcolor="#a92723" style="background-color:#a92723;border-radius:999px;">
           <a href="tel:${escapeHtml(phoneHref)}" style="display:inline-block;padding-top:11px;padding-right:18px;padding-bottom:11px;padding-left:18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:700;color:#ffffff;text-decoration:none;">Call customer</a>
         </td>
       </tr>
     </table>
     <p style="margin-top:20px;margin-right:0;margin-bottom:0;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#667085;">Reply to this message to continue the ${escapeHtml(reference)} email thread.</p>`,
    `${reference} new quote request`
  )
}

export async function POST(request: Request): Promise<Response> {
  if (!limiter.check(clientIp(request))) {
    return Response.json(
      {
        ok: false,
        error: 'Too many requests. Please wait a few minutes or call us.',
      },
      { status: 429 }
    )
  }

  if (!resend) {
    return Response.json(
      {
        ok: false,
        error: 'Online requests are temporarily unavailable. Please call us.',
      },
      { status: 503 }
    )
  }

  try {
    const { raw, attachments } = await parseRequest(request)

    if (stringValue(raw.company).trim() || stringValue(raw.website).trim()) {
      return Response.json({ ok: true })
    }

    if (
      typeof raw.startedAt === 'number' &&
      raw.startedAt > 0 &&
      Date.now() - raw.startedAt < 1_500
    ) {
      return Response.json({ ok: true })
    }

    const parsed = QuoteSchema.safeParse(normalizeQuote(raw))

    if (!parsed.success) {
      return Response.json(
        {
          ok: false,
          error: 'Please check the highlighted quote details and try again.',
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = parsed.data
    const reference = createReference(data.submissionId)
    const replyTo = quoteReplyAddress(reference)
    const commonHeaders = {
      'X-Entity-Ref-ID': reference,
      'X-USJR-Reference': reference,
    }
    const tags = [
      {
        name: 'quote_ref',
        value: reference.toLowerCase().replaceAll('-', '_'),
      },
    ]

    const [businessResult, customerResult] = await Promise.all([
      resend.emails.send(
        {
          from: EMAIL_CONFIG.from,
          to: EMAIL_CONFIG.to,
          replyTo,
          subject: `[${reference}] New quote: ${data.name}`,
          html: businessEmail(data, reference, attachments.length),
          headers: commonHeaders,
          tags,
          ...(attachments.length > 0 ? { attachments } : {}),
        },
        { idempotencyKey: `quote-business/${data.submissionId}` }
      ),
      resend.emails.send(
        {
          from: EMAIL_CONFIG.from,
          to: data.email,
          replyTo,
          subject: `[${reference}] Request received`,
          html: customerEmail(data, reference),
          headers: commonHeaders,
          tags,
        },
        { idempotencyKey: `quote-customer/${data.submissionId}` }
      ),
    ])

    if (businessResult.error || !businessResult.data?.id) {
      return Response.json(
        {
          ok: false,
          error: 'We could not deliver the request. Please call or text us instead.',
        },
        { status: 502 }
      )
    }

    return Response.json({
      ok: true,
      reference,
      replyTo,
      confirmationSent: Boolean(customerResult.data?.id && !customerResult.error),
    })
  } catch {
    return Response.json(
      {
        ok: false,
        error: 'Something went wrong. Please try again or call us.',
      },
      { status: 500 }
    )
  }
}
