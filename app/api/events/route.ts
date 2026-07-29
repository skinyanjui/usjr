import { createHmac, timingSafeEqual } from 'node:crypto'
import { EMAIL_CONFIG, emailDocument, escapeHtml, quoteReplyAddress, resend } from '@/lib/resend'

export const runtime = 'nodejs'

type ResendEvent = {
  type: string
  created_at?: string
  data?: {
    email_id?: string
    message_id?: string
    from?: string
    to?: string[]
    subject?: string
  }
}

type SentEmailList = {
  data?: Array<{
    id: string
    to: string[]
    subject: string
  }>
}

type ReceivedEmail = {
  from?: string
  subject?: string
  text?: string | null
  html?: string | null
  message_id?: string
}

type ReceivedAttachments = {
  data?: Array<{
    filename?: string | null
    content_type?: string | null
    download_url?: string | null
  }>
}

function verifyWebhook(payload: string, request: Request): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  const id = request.headers.get('svix-id')
  const timestamp = request.headers.get('svix-timestamp')
  const signatureHeader = request.headers.get('svix-signature')

  if (!secret || !id || !timestamp || !signatureHeader) return false

  const timestampNumber = Number(timestamp)
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) {
    return false
  }

  try {
    const secretBytes = Buffer.from(secret.replace(/^whsec_/, ''), 'base64')
    const expected = createHmac('sha256', secretBytes)
      .update(`${id}.${timestamp}.${payload}`)
      .digest('base64')

    return signatureHeader
      .split(' ')
      .map(part => part.split(','))
      .some(([version, signature]) => {
        if (version !== 'v1' || !signature) return false
        const actualBuffer = Buffer.from(signature)
        const expectedBuffer = Buffer.from(expected)
        return (
          actualBuffer.length === expectedBuffer.length &&
          timingSafeEqual(actualBuffer, expectedBuffer)
        )
      })
  } catch {
    return false
  }
}

function apiHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${process.env.RESEND_API_KEY || ''}`,
    'Content-Type': 'application/json',
  }
}

function emailAddress(value: string): string {
  const match = value.match(/<([^>]+)>/)
  return (match?.[1] || value).trim().toLowerCase()
}

function safeSubject(value: string): string {
  return (
    value
      .replace(/[\r\n]+/g, ' ')
      .trim()
      .slice(0, 180) || 'Quote reply'
  )
}

async function findCustomerEmail(reference: string): Promise<string | null> {
  const response = await fetch('https://api.resend.com/emails?limit=100', {
    headers: apiHeaders(),
    cache: 'no-store',
  })
  if (!response.ok) return null

  const payload = (await response.json()) as SentEmailList
  const match = payload.data?.find(email => email.subject === `[${reference}] Request received`)
  return match?.to[0] || null
}

async function getReceivedEmail(emailId: string): Promise<ReceivedEmail | null> {
  const response = await fetch(`https://api.resend.com/emails/receiving/${emailId}`, {
    headers: apiHeaders(),
    cache: 'no-store',
  })
  if (!response.ok) return null
  return (await response.json()) as ReceivedEmail
}

async function getReceivedAttachments(
  emailId: string
): Promise<Array<{ filename: string; path: string }>> {
  const response = await fetch(
    `https://api.resend.com/emails/receiving/${emailId}/attachments?limit=20`,
    {
      headers: apiHeaders(),
      cache: 'no-store',
    }
  )
  if (!response.ok) return []

  const payload = (await response.json()) as ReceivedAttachments
  return (payload.data || [])
    .filter(attachment => {
      const type = attachment.content_type || ''
      return (
        Boolean(attachment.download_url) &&
        (type.startsWith('image/') || type === 'application/pdf')
      )
    })
    .slice(0, 8)
    .map(attachment => ({
      filename:
        (attachment.filename || 'attachment').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) ||
        'attachment',
      path: attachment.download_url || '',
    }))
}

export async function POST(request: Request): Promise<Response> {
  const payload = await request.text()

  if (!verifyWebhook(payload, request)) {
    return Response.json({ ok: false }, { status: 401 })
  }

  let event: ResendEvent
  try {
    event = JSON.parse(payload) as ResendEvent
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  if (event.type !== 'email.received') {
    return Response.json({ ok: true })
  }

  if (!resend || !event.data?.email_id) {
    return Response.json({ ok: false }, { status: 503 })
  }

  const receivingAddress = event.data.to?.find(address =>
    address.toLowerCase().endsWith(`@${EMAIL_CONFIG.inboundDomain.toLowerCase()}`)
  )
  const reference = receivingAddress
    ?.toLowerCase()
    .match(/^reply-(usjr-[a-f0-9]{8})@/)?.[1]
    ?.toUpperCase()

  if (!reference) {
    return Response.json({ ok: true, ignored: true })
  }

  const customerEmail = await findCustomerEmail(reference)
  if (!customerEmail) {
    return Response.json({ ok: false }, { status: 404 })
  }

  const received = await getReceivedEmail(event.data.email_id)
  if (!received) {
    return Response.json({ ok: false }, { status: 502 })
  }

  const sender = emailAddress(received.from || event.data.from || '')
  const customer = customerEmail.toLowerCase()
  const destination = sender === customer ? EMAIL_CONFIG.to : customerEmail
  const replyTo = quoteReplyAddress(reference)
  const attachments = await getReceivedAttachments(event.data.email_id)
  const text =
    received.text?.trim() ||
    received.html
      ?.replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() ||
    'Reply received with no text body.'
  const subject = safeSubject(received.subject || event.data.subject || 'Quote reply')
  const messageId = received.message_id || event.data.message_id

  const result = await resend.emails.send(
    {
      from: EMAIL_CONFIG.from,
      to: destination,
      replyTo,
      subject: subject.toLowerCase().startsWith('re:') ? subject : `Re: ${subject}`,
      text: `${sender || 'A quote participant'} wrote:\n\n${text}`,
      html: emailDocument(
        `<p style="margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:26px;font-weight:700;color:#102f49;">Reply for ${escapeHtml(reference)}</p>
         <p style="margin-top:0;margin-right:0;margin-bottom:16px;margin-left:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#667085;">From ${escapeHtml(sender || 'quote participant')}</p>
         <p style="margin:0;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#344054;">${escapeHtml(text)}</p>`,
        `${reference} reply`
      ),
      headers: {
        'X-Entity-Ref-ID': `${reference}-${event.data.email_id}`,
        'X-USJR-Reference': reference,
        ...(messageId ? { 'In-Reply-To': messageId, References: messageId } : {}),
      },
      tags: [
        {
          name: 'quote_ref',
          value: reference.toLowerCase().replaceAll('-', '_'),
        },
      ],
      ...(attachments.length > 0 ? { attachments } : {}),
    },
    { idempotencyKey: `quote-forward/${event.data.email_id}` }
  )

  if (result.error || !result.data?.id) {
    return Response.json({ ok: false }, { status: 502 })
  }

  return Response.json({ ok: true })
}
