import { z } from "zod"

const QuoteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Phone is required"),
  email: z.string().email("Valid email required"),
  address: z.string().optional().default(""),
  service: z.string().min(1, "Service is required"),
  projectSize: z.string().optional().default(""),
  details: z.string().optional().default(""),
  source: z.string().optional().default("website"),
  timestamp: z.string().optional(),
})

function normalize(body: any) {
  return {
    name: body?.name ?? body?.fullName ?? "",
    phone: body?.phone ?? body?.phoneNumber ?? "",
    email: body?.email ?? body?.emailAddress ?? "",
    address: body?.address ?? body?.serviceAddress ?? "",
    service: body?.service ?? body?.serviceNeeded ?? "",
    projectSize: body?.projectSize ?? "",
    details: body?.message ?? body?.details ?? body?.projectDetails ?? "",
    source: body?.source ?? "website",
    timestamp: new Date().toISOString(),
  }
}

export async function POST(req: Request) {
  try {
    const raw = await req.json()
    const normalized = normalize(raw)
    const parsed = QuoteSchema.safeParse(normalized)
    if (!parsed.success) {
      return new Response(JSON.stringify({ ok: false, errors: parsed.error.flatten() }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // In production, send to an email service, CRM, or database here.
    // For now, log to server console.
    console.log("New quote request:", parsed.data)

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Quote API error:", err)
    return new Response(JSON.stringify({ ok: false, error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
