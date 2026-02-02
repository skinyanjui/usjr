import { resend, EMAIL_CONFIG } from '@/lib/resend'

export async function POST(request: Request) {
  if (!resend) {
    return Response.json({ error: 'Resend API key not configured' }, { status: 500 })
  }

  const { name, email, message } = await request.json()

  const { data, error } = await resend.emails.send({
    from: EMAIL_CONFIG.from,
    to: [EMAIL_CONFIG.to],
    subject: `New contact from ${name}`,
    html: `<p>From: ${email}</p><p>${message}</p>`,
  })

  if (error) return Response.json({ error }, { status: 500 })
  return Response.json(data)
}
