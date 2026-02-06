import { after } from 'next/server'
import { resend, EMAIL_CONFIG } from '@/lib/resend'

export async function POST(request: Request) {
  if (!resend) {
    return Response.json({ error: 'Resend API key not configured' }, { status: 500 })
  }

  const { name, email, message } = await request.json()

  const mailer = resend

  after(async () => {
    try {
      const { error } = await mailer.emails.send({
        from: EMAIL_CONFIG.from,
        to: [EMAIL_CONFIG.to],
        subject: `New contact from ${name}`,
        html: `<p>From: ${email}</p><p>${message}</p>`,
      })

      if (error) {
        console.error('Failed to send email:', error)
      }
    } catch (err) {
      console.error('Error sending email:', err)
    }
  })

  return Response.json({ success: true })
}
