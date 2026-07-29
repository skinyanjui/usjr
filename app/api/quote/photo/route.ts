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

const MAX_PHOTO_BYTES = 3_500_000
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/heic', 'image/heif'])
const ALLOWED_EXTENSIONS = /\.(jpe?g|png|heic|heif)$/i

const limiter = new RateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 40,
})

const MetadataSchema = z.object({
  reference: z.string().regex(/^USJR-[A-F0-9]{8}$/),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  index: z.coerce.number().int().min(1).max(8),
  total: z.coerce.number().int().min(3).max(8),
})

function clientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function safeFilename(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'quote-photo.jpg'
}

export async function POST(request: Request): Promise<Response> {
  if (!limiter.check(clientIp(request))) {
    return Response.json(
      {
        ok: false,
        error: 'Too many photo uploads. Please wait a few minutes.',
      },
      { status: 429 }
    )
  }

  if (!resend) {
    return Response.json(
      { ok: false, error: 'Photo delivery is temporarily unavailable.' },
      { status: 503 }
    )
  }

  try {
    const formData = await request.formData()
    const parsed = MetadataSchema.safeParse({
      reference: formData.get('reference'),
      name: formData.get('name'),
      email: formData.get('email'),
      index: formData.get('index'),
      total: formData.get('total'),
    })
    const photo = formData.get('photo')

    if (!parsed.success || !(photo instanceof File)) {
      return Response.json({ ok: false, error: 'Invalid photo upload.' }, { status: 400 })
    }

    if (
      photo.size <= 0 ||
      photo.size > MAX_PHOTO_BYTES ||
      (!ALLOWED_TYPES.has(photo.type.toLowerCase()) && !ALLOWED_EXTENSIONS.test(photo.name))
    ) {
      return Response.json(
        {
          ok: false,
          error: 'Use a JPG, PNG, or HEIC photo smaller than 3.5 MB.',
        },
        { status: 400 }
      )
    }

    const { reference, name, email, index, total } = parsed.data
    const replyTo = quoteReplyAddress(reference)
    const filename = safeFilename(photo.name)
    const content = Buffer.from(await photo.arrayBuffer()).toString('base64')
    const html = emailDocument(
      `<p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:30px;font-weight:700;color:#102f49;">Photo ${index} of ${total} for ${escapeHtml(reference)}</p>
       <p style="margin-top:0;margin-right:0;margin-bottom:18px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#475467;">Uploaded by ${escapeHtml(name)} (${escapeHtml(email)}).</p>
       <p style="margin-top:0;margin-right:0;margin-bottom:18px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#667085;">The original photo is attached to this message.</p>
       <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#667085;"><a href="${SITE_URL}/quote" style="color:#a92723;text-decoration:underline;">Open quote information</a></p>`,
      `${reference} photo ${index} of ${total}`
    )

    const result = await resend.emails.send(
      {
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.to,
        replyTo,
        subject: `[${reference}] Photo ${index} of ${total} from ${name}`,
        html,
        headers: {
          'X-Entity-Ref-ID': `${reference}-photo-${index}`,
          'X-USJR-Reference': reference,
        },
        tags: [
          {
            name: 'quote_ref',
            value: reference.toLowerCase().replaceAll('-', '_'),
          },
        ],
        attachments: [{ filename, content }],
      },
      { idempotencyKey: `quote-photo/${reference}/${index}` }
    )

    if (result.error || !result.data?.id) {
      return Response.json(
        {
          ok: false,
          error: 'The request arrived, but this photo did not. Please retry it.',
        },
        { status: 502 }
      )
    }

    return Response.json({ ok: true, emailId: result.data.id })
  } catch {
    return Response.json(
      {
        ok: false,
        error: 'The request arrived, but this photo did not. Please retry it.',
      },
      { status: 500 }
    )
  }
}
