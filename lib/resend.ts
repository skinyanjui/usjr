import { Resend } from 'resend'

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const SITE_URL = 'https://unclesamjunkremoval.com'

const configuredInboundAddress = process.env.RESEND_INBOUND_EMAIL || 'quotes@karaiveluu.resend.app'

export const EMAIL_CONFIG = {
  from: 'Uncle Sam Quotes <quotes@unclesamjunkremoval.com>',
  to: process.env.QUOTE_TO_EMAIL || 'unclesamjunkremoval@gmail.com',
  inboundDomain: configuredInboundAddress.split('@').at(-1) || 'karaiveluu.resend.app',
}

export function quoteReplyAddress(reference: string): string {
  const safeReference = reference.toLowerCase().replace(/[^a-z0-9-]/g, '')
  return `reply-${safeReference}@${EMAIL_CONFIG.inboundDomain}`
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function emailDocument(content: string, previewText: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${escapeHtml(previewText)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f1e8;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(previewText)}</div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;background-color:#f5f1e8;">
      <tr>
        <td align="center" style="padding-top:28px;padding-right:16px;padding-bottom:28px;padding-left:16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #ded8cc;border-radius:14px;">
            <tr>
              <td bgcolor="#102f49" style="background-color:#102f49;padding-top:20px;padding-right:24px;padding-bottom:20px;padding-left:24px;border-radius:14px 14px 0 0;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:24px;font-weight:700;color:#ffffff;">Uncle Sam Junk Removal</p>
              </td>
            </tr>
            <tr>
              <td style="padding-top:26px;padding-right:24px;padding-bottom:26px;padding-left:24px;">
                ${content}
              </td>
            </tr>
            <tr>
              <td bgcolor="#f8f6f0" style="background-color:#f8f6f0;padding-top:16px;padding-right:24px;padding-bottom:16px;padding-left:24px;border-radius:0 0 14px 14px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#667085;">
                  Sent by <a href="${SITE_URL}" style="color:#a92723;text-decoration:underline;">unclesamjunkremoval.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
