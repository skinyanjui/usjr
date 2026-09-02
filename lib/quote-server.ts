import {
  computeCallbackHoldWindow,
  formatGoogleCalendarChicago,
  formatReceivedAtChicago,
} from "./quote-date";

const SITE_URL = "https://unclesamjunkremoval.com";
const BUSINESS_PHONE_DISPLAY = "(812) 610-1657";
const BUSINESS_PHONE_HREF = "+18126101657";
const DEFAULT_FROM =
  "Uncle Sam Quotes <quotes@unclesamjunkremoval.com>";
const DEFAULT_INBOUND_DOMAIN = "karaiveluu.resend.app";
const MAX_PHOTO_BYTES = 3_500_000;
const QUOTE_FORM_MINIMUM_AGE_MS = 1_500;

const allowedOrigins = new Set([
  SITE_URL,
  `https://www.${new URL(SITE_URL).hostname}`,
  "https://uncle-sam-junk-removal.bigafrica.chatgpt.site",
  "http://localhost",
  "http://127.0.0.1",
]);

const quoteServices = new Set([
  "Junk Removal",
  "Furniture Removal",
  "Cleaning",
  "Estate Cleanouts",
  "Appliance Removal",
  "Light Demolition",
  "Garage Cleanout",
  "Hot Tub Removal",
  "Mattress Removal",
  "Shed Removal",
  "Yard Waste Removal",
  "Storage Unit Cleanouts",
  "Office Cleanouts",
  "Restaurant Equipment Removal",
  "Property Management Turnovers",
  "Warehouse Fixture Removal",
  "Holiday Tree Removal",
  "Storm Debris Cleanup",
  "Something else",
]);

const urgencyValues = new Set([
  "today",
  "within-2-3-days",
  "choose-date",
  "flexible",
]);
const placementValues = new Set(["indoor", "outdoor", "both", "unsure"]);
const contactValues = new Set(["call", "text", "email"]);
const allowedPhotoTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
]);
const allowedPhotoExtensions = /\.(jpe?g|png|heic|heif)$/i;

const quoteRateLimits = new Map<
  string,
  { attempts: number; resetAt: number }
>();
const photoRateLimits = new Map<
  string,
  { attempts: number; resetAt: number }
>();

export type QuoteEnvironment = {
  QUOTE_TO_EMAIL?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  RESEND_INBOUND_EMAIL?: string;
  RESEND_WEBHOOK_SECRET?: string;
};

type QuoteData = {
  submissionId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  urgency: string;
  preferredDate: string;
  quantity: string;
  placement: string;
  access: string[];
  heavyMaterials: boolean;
  dismantling: boolean;
  heavyDetails: string;
  preferredContact: string;
  conditionalDetails: Record<string, string>;
  notes: string;
  consent: boolean;
  company: string;
  source: string;
  startedAt: number;
  planningRange: string;
};

type ResendEvent = {
  type?: string;
  data?: {
    email_id?: string;
    from?: string;
    message_id?: string;
    subject?: string;
    to?: string[];
  };
};

type ReceivedEmail = {
  from?: string;
  html?: string | null;
  message_id?: string;
  subject?: string;
  text?: string | null;
};

function stringValue(value: unknown, maximumLength = 500) {
  return typeof value === "string"
    ? value.trim().slice(0, maximumLength)
    : "";
}

function booleanValue(value: unknown) {
  return value === true || value === "true";
}

function normalizeAccess(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, 8);
}

function normalizeConditionalDetails(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .slice(0, 12)
      .map(([key, detail]) => [
        stringValue(key, 80),
        stringValue(detail, 300),
      ])
      .filter(([key, detail]) => key && detail),
  );
}

function normalizeQuote(raw: Record<string, unknown>): QuoteData {
  return {
    submissionId: stringValue(raw.submissionId, 160),
    name: stringValue(raw.name, 100),
    phone: stringValue(raw.phone, 40),
    email: stringValue(raw.email, 254).toLowerCase(),
    address: stringValue(raw.address ?? raw.location, 160),
    service: stringValue(raw.service, 100),
    urgency: stringValue(raw.urgency, 40),
    preferredDate: stringValue(raw.preferredDate, 20),
    quantity: stringValue(raw.quantity, 120),
    placement: stringValue(raw.placement, 40),
    access: normalizeAccess(raw.access),
    heavyMaterials: booleanValue(raw.heavyMaterials),
    dismantling: booleanValue(raw.dismantling),
    heavyDetails: stringValue(raw.heavyDetails, 500),
    preferredContact: stringValue(raw.preferredContact, 20),
    conditionalDetails: normalizeConditionalDetails(raw.conditionalDetails),
    notes: stringValue(raw.notes ?? raw.details, 2_000),
    consent: booleanValue(raw.consent),
    company: stringValue(raw.company, 120),
    source: stringValue(raw.source, 80) || "website-quote",
    startedAt:
      typeof raw.startedAt === "number" ? raw.startedAt : Number.NaN,
    planningRange: stringValue(raw.planningRange, 24),
  };
}

function validPlanningRange(value: string) {
  return /^\$\d+–\d+$/.test(value);
}

function customerEmailSubject(reference: string) {
  return `Your quote request ${reference} | Uncle Sam Junk Removal`;
}

function customerPlanningCopy(planningRange: string) {
  if (validPlanningRange(planningRange)) {
    return `Planning range for this kind of job: ${planningRange}. You approve the final price before we load.`;
  }

  return "We'll price it from the photos and access details you sent. You approve the final price before we load.";
}

function customerFirstName(name: string) {
  return name.split(/\s+/)[0] || name;
}

function customerPhoneDigits(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function safeSubject(value: string) {
  return (
    value.replace(/[\r\n]+/g, " ").trim().slice(0, 180) || "Quote reply"
  );
}

function safeFilename(value: string) {
  return (
    value.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) ||
    "quote-photo.jpg"
  );
}

function getOrigin(request: Request) {
  const origin = request.headers.get("Origin")?.replace(/\/$/, "") || "";
  return allowedOrigins.has(origin) ? origin : "";
}

function corsHeaders(request: Request) {
  const origin = getOrigin(request);
  return {
    ...(origin ? { "Access-Control-Allow-Origin": origin } : {}),
    "Access-Control-Allow-Headers": "Content-Type, Svix-Id, Svix-Signature, Svix-Timestamp",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin",
    "X-Content-Type-Options": "nosniff",
  };
}

function jsonResponse(
  request: Request,
  body: unknown,
  status = 200,
  additionalHeaders?: HeadersInit,
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request),
      ...Object.fromEntries(new Headers(additionalHeaders)),
    },
  });
}

function rejectDisallowedOrigin(request: Request) {
  const suppliedOrigin = request.headers.get("Origin");
  return Boolean(suppliedOrigin && !getOrigin(request));
}

function clientKey(request: Request) {
  return (
    request.headers.get("CF-Connecting-IP")?.trim() ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    request.headers.get("X-Real-IP")?.trim() ||
    "unknown"
  );
}

function consumeRateLimit(
  limits: Map<string, { attempts: number; resetAt: number }>,
  request: Request,
  maximum: number,
) {
  const now = Date.now();
  const key = clientKey(request);
  const current = limits.get(key);

  if (limits.size > 2_000) {
    for (const [entryKey, entry] of limits) {
      if (entry.resetAt <= now) {
        limits.delete(entryKey);
      }
    }
  }

  if (!current || current.resetAt <= now) {
    limits.set(key, { attempts: 1, resetAt: now + 15 * 60 * 1_000 });
    return null;
  }

  if (current.attempts >= maximum) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1_000));
  }

  current.attempts += 1;
  return null;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function fromAddress(env: QuoteEnvironment) {
  const configured = stringValue(env.RESEND_FROM_EMAIL, 200);
  if (
    configured &&
    /@unclesamjunkremoval\.com>?$/i.test(configured) &&
    !/\bno-?reply\b/i.test(configured)
  ) {
    return configured;
  }

  return DEFAULT_FROM;
}

function inboundDomain(env: QuoteEnvironment) {
  const configured = stringValue(env.RESEND_INBOUND_EMAIL, 254)
    .replace(/^.*@/, "")
    .toLowerCase();
  return configured || DEFAULT_INBOUND_DOMAIN;
}

function quoteReplyAddress(reference: string, env: QuoteEnvironment) {
  return `reply-${reference.toLowerCase()}@${inboundDomain(env)}`;
}

function label(value: string) {
  const labels: Record<string, string> = {
    today: "Today",
    "within-2-3-days": "Within 2–3 days",
    "choose-date": "Choose a date",
    flexible: "Flexible",
    indoor: "Indoor",
    outdoor: "Outdoor",
    both: "Indoor and outdoor",
    unsure: "Not sure",
    call: "Call",
    text: "Text",
    email: "Email",
  };

  return labels[value] || value;
}

function quoteRows(data: QuoteData) {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Pickup area", data.address],
    ["Service", data.service],
    [
      "Timing",
      data.urgency === "choose-date" && data.preferredDate
        ? `${label(data.urgency)}: ${data.preferredDate}`
        : label(data.urgency),
    ],
    ["Quantity / load", data.quantity],
    ["Indoor / outdoor", label(data.placement)],
    [
      "Access",
      data.access.length > 0
        ? data.access.join(", ")
        : "No difficult access noted",
    ],
    [
      "Heavy work",
      [
        data.heavyMaterials ? "Heavy materials" : "",
        data.dismantling ? "Dismantling required" : "",
        data.heavyDetails,
      ]
        .filter(Boolean)
        .join(" — ") || "None noted",
    ],
    ["Preferred contact", label(data.preferredContact)],
  ];

  for (const [key, value] of Object.entries(data.conditionalDetails)) {
    rows.push([key, value]);
  }

  if (data.notes) {
    rows.push(["Additional notes", data.notes]);
  }

  return rows;
}

function textRows(data: QuoteData) {
  return quoteRows(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function businessHtmlRows(data: QuoteData) {
  return quoteRows(data)
    .map(([key, value]) => {
      let cellHtml = escapeHtml(value);
      if (key === "Phone") {
        cellHtml = `<a href="tel:${escapeHtml(customerPhoneDigits(value))}" style="color:#102a43">${escapeHtml(value)}</a>`;
      } else if (key === "Email") {
        cellHtml = `<a href="mailto:${escapeHtml(value)}" style="color:#102a43">${escapeHtml(value)}</a>`;
      }

      return `
        <tr>
          <td style="padding:9px 12px 9px 0;border-bottom:1px solid #e8e4db;font:700 13px/19px Arial,sans-serif;color:#102a43;vertical-align:top">${escapeHtml(key)}</td>
          <td style="padding:9px 0 9px 12px;border-bottom:1px solid #e8e4db;font:400 13px/19px Arial,sans-serif;color:#3d5263;vertical-align:top;white-space:pre-wrap">${cellHtml}</td>
        </tr>`;
    })
    .join("");
}

function emailDocument(title: string, body: string) {
  return `<!doctype html>
    <html lang="en">
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
      <body style="margin:0;padding:24px;background:#f5f2ea">
        <div style="max-width:680px;margin:0 auto;padding:28px;border:1px solid #ddd8cd;border-radius:16px;background:#ffffff;color:#102a43">
          <p style="margin:0 0 8px;font:800 12px/18px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#b5231f">Uncle Sam Junk Removal</p>
          ${body}
          <p style="margin:26px 0 0;padding-top:18px;border-top:1px solid #e8e4db;font:400 12px/18px Arial,sans-serif;color:#647482">
            <a href="${SITE_URL}" style="color:#102a43">unclesamjunkremoval.com</a> ·
            <a href="tel:${BUSINESS_PHONE_HREF}" style="color:#102a43">${BUSINESS_PHONE_DISPLAY}</a>
          </p>
        </div>
      </body>
    </html>`;
}

function isTestQuote(data: QuoteData) {
  if (/^test/i.test(data.name.trim())) {
    return true;
  }

  const notes = data.notes.toUpperCase();
  return notes.includes("TEST") || notes.includes("DO NOT SCHEDULE");
}

function quoteTimingLabel(data: QuoteData) {
  return data.urgency === "choose-date" && data.preferredDate
    ? `${label(data.urgency)}: ${data.preferredDate}`
    : label(data.urgency);
}

function callbackCalendarDescription(data: QuoteData, reference: string) {
  const phoneDigits = customerPhoneDigits(data.phone);
  const lines = [
    "Callback hold — not a confirmed job. Use this block to follow up; confirm details before scheduling removal.",
    "",
    `Reference: ${reference}`,
    `Phone: ${data.phone} (tel:${phoneDigits})`,
    `Email: ${data.email} (mailto:${data.email})`,
    `Pickup area: ${data.address}`,
    `Service: ${data.service}`,
    `Size / load: ${data.quantity}`,
    `Timing: ${quoteTimingLabel(data)}`,
  ];

  if (data.notes) {
    lines.push(`Notes: ${data.notes}`);
  }

  return lines.join("\n");
}

export function buildCallbackCalendarUrl(
  data: QuoteData,
  reference: string,
  receivedAt: Date,
) {
  if (isTestQuote(data)) {
    return null;
  }

  const { start, end } = computeCallbackHoldWindow(receivedAt);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Call ${data.name} — ${reference}`,
    dates: `${formatGoogleCalendarChicago(start)}/${formatGoogleCalendarChicago(end)}`,
    details: callbackCalendarDescription(data, reference),
    location: "Evansville IN",
    ctz: "America/Chicago",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function businessEmailTextExtras(
  data: QuoteData,
  reference: string,
  receivedAt: Date,
) {
  const calendarUrl = buildCallbackCalendarUrl(data, reference, receivedAt);
  return calendarUrl
    ? `\n\nAdd callback to Calendar: ${calendarUrl}`
    : "";
}

function businessEmailCalendarLink(
  data: QuoteData,
  reference: string,
  receivedAt: Date,
) {
  const calendarUrl = buildCallbackCalendarUrl(data, reference, receivedAt);
  if (!calendarUrl) {
    return "";
  }

  return `<a href="${escapeHtml(calendarUrl)}" style="display:inline-block;margin-left:10px;padding:11px 18px;border-radius:999px;border:1px solid #ddd8cd;font:700 14px/18px Arial,sans-serif;color:#102a43;text-decoration:none">Add callback to Calendar</a>`;
}

function businessEmail(
  data: QuoteData,
  reference: string,
  photoCount = 0,
  receivedAt = new Date(),
) {
  const receivedLabel = formatReceivedAtChicago(receivedAt);
  const photoLine =
    photoCount > 0
      ? `<p style="margin:0 0 20px;font:400 14px/21px Arial,sans-serif;color:#475a69">${photoCount} project photo${photoCount === 1 ? "" : "s"} attached to this email.</p>`
      : "";

  return emailDocument(
    `${reference} new quote`,
    `<h1 style="margin:0 0 8px;font:800 26px/32px Arial,sans-serif;color:#102a43">New quote ${escapeHtml(reference)}</h1>
     <p style="margin:0 0 8px;font:400 14px/21px Arial,sans-serif;color:#657583">Received: ${escapeHtml(receivedLabel)}</p>
     <p style="margin:0 0 20px;font:400 14px/21px Arial,sans-serif;color:#657583">Submitted from ${escapeHtml(data.source)}.</p>
     ${photoLine}
     <table role="presentation" style="width:100%;border-collapse:collapse">${businessHtmlRows(data)}</table>
     <p style="margin:22px 0 0">
       <a href="tel:${escapeHtml(customerPhoneDigits(data.phone))}" style="display:inline-block;padding:11px 18px;border-radius:999px;background:#b5231f;font:700 14px/18px Arial,sans-serif;color:#fff;text-decoration:none">Call customer</a>
       <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;margin-left:10px;padding:11px 18px;border-radius:999px;border:1px solid #ddd8cd;font:700 14px/18px Arial,sans-serif;color:#102a43;text-decoration:none">Email customer</a>
       ${businessEmailCalendarLink(data, reference, receivedAt)}
     </p>
     <p style="margin:16px 0 0;font:400 13px/20px Arial,sans-serif;color:#657583">Reply to continue the ${escapeHtml(reference)} email thread.</p>`,
  );
}

function customerEmailText(data: QuoteData, reference: string) {
  const planningCopy = customerPlanningCopy(data.planningRange);

  return [
    `Hi ${customerFirstName(data.name)},`,
    "",
    "We got your quote request. This message is not the final price. We'll call or text during shop hours (Monday–Saturday, 8 a.m.–5 p.m.) to confirm the job and the onsite price.",
    "",
    `Your reference: ${reference}`,
    "",
    planningCopy,
    "",
    `Need to add photos or change the pile? Reply to this email, or call or text ${BUSINESS_PHONE_DISPLAY}.`,
    "",
    "Uncle Sam Junk Removal",
    "Evansville, IN",
    BUSINESS_PHONE_DISPLAY,
  ].join("\n");
}

function customerEmail(data: QuoteData, reference: string) {
  const planningCopy = customerPlanningCopy(data.planningRange);

  return emailDocument(
    customerEmailSubject(reference),
    `<p style="margin:0 0 16px;font:400 15px/23px Arial,sans-serif;color:#475a69">Hi ${escapeHtml(customerFirstName(data.name))},</p>
     <p style="margin:0 0 16px;font:400 15px/23px Arial,sans-serif;color:#475a69">We got your quote request. This message is not the final price. We&rsquo;ll call or text during shop hours (Monday&ndash;Saturday, 8&nbsp;a.m.&ndash;5&nbsp;p.m.) to confirm the job and the onsite price.</p>
     <p style="margin:0 0 16px;font:400 15px/23px Arial,sans-serif;color:#475a69"><strong>Your reference:</strong> ${escapeHtml(reference)}</p>
     <p style="margin:0 0 16px;font:400 15px/23px Arial,sans-serif;color:#475a69">${escapeHtml(planningCopy)}</p>
     <p style="margin:0 0 16px;font:400 15px/23px Arial,sans-serif;color:#475a69">Need to add photos or change the pile? Reply to this email, or call or text <a href="tel:${BUSINESS_PHONE_HREF}" style="color:#102a43">${BUSINESS_PHONE_DISPLAY}</a>.</p>
     <p style="margin:24px 0 0;font:400 14px/22px Arial,sans-serif;color:#475a69">
       Uncle Sam Junk Removal<br>
       Evansville, IN<br>
       <a href="tel:${BUSINESS_PHONE_HREF}" style="color:#102a43">${BUSINESS_PHONE_DISPLAY}</a>
     </p>`,
  );
}

async function sendEmail(
  env: QuoteEnvironment,
  payload: Record<string, unknown>,
  idempotencyKey: string,
) {
  if (!env.RESEND_API_KEY) {
    return { ok: false, status: 503 };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    });

    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false, status: 502 };
  }
}

async function createReference(submissionId: string) {
  const bytes = new TextEncoder().encode(submissionId);
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  const shortHash = [...digest.slice(0, 4)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `USJR-${shortHash}`;
}

function validateQuote(data: QuoteData) {
  const phoneDigits = data.phone.replace(/\D/g, "");
  const age = Date.now() - data.startedAt;

  if (
    data.submissionId.length < 8 ||
    data.name.length < 2 ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15 ||
    !validEmail(data.email) ||
    data.address.length < 2 ||
    !quoteServices.has(data.service) ||
    !urgencyValues.has(data.urgency) ||
    !placementValues.has(data.placement) ||
    !contactValues.has(data.preferredContact) ||
    data.quantity.length < 1 ||
    !data.consent
  ) {
    return "Please check the highlighted quote details and try again.";
  }

  if (
    data.urgency === "choose-date" &&
    !validDate(data.preferredDate)
  ) {
    return "Please choose a preferred pickup date.";
  }

  if (
    !Number.isFinite(data.startedAt) ||
    age < QUOTE_FORM_MINIMUM_AGE_MS ||
    age > 4 * 60 * 60 * 1_000
  ) {
    return "Please refresh the page and try the quote form again.";
  }

  return "";
}

export function handleQuoteOptions(request: Request) {
  if (rejectDisallowedOrigin(request)) {
    return jsonResponse(request, { ok: false }, 403);
  }

  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function handleQuoteRequest(
  request: Request,
  env: QuoteEnvironment,
) {
  if (request.method === "OPTIONS") {
    return handleQuoteOptions(request);
  }

  if (request.method !== "POST") {
    return jsonResponse(
      request,
      { error: "Use the quote form to submit a request." },
      405,
    );
  }

  if (rejectDisallowedOrigin(request)) {
    return jsonResponse(
      request,
      { error: "Request origin was not accepted." },
      403,
    );
  }

  const contentType = request.headers.get("Content-Type") || "";
  const isMultipart = contentType.includes("multipart/form-data");
  const isJson = contentType.includes("application/json");

  if (!isMultipart && !isJson) {
    return jsonResponse(
      request,
      { error: "Please submit the website quote form." },
      415,
    );
  }

  let raw: Record<string, unknown>;
  let photos: File[] = [];

  if (isMultipart) {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return jsonResponse(
        request,
        { error: "The quote request could not be read." },
        400,
      );
    }

    const payloadValue = formData.get("payload");
    if (typeof payloadValue !== "string") {
      return jsonResponse(
        request,
        { error: "Please submit the website quote form." },
        400,
      );
    }

    try {
      raw = JSON.parse(payloadValue) as Record<string, unknown>;
    } catch {
      return jsonResponse(
        request,
        { error: "The quote request could not be read." },
        400,
      );
    }

    photos = collectPhotoFiles(formData);
    const photoError = validatePhotoFiles(photos);
    if (photoError) {
      return jsonResponse(request, { ok: false, error: photoError }, 400);
    }
  } else {
    try {
      raw = (await request.json()) as Record<string, unknown>;
    } catch {
      return jsonResponse(
        request,
        { error: "The quote request could not be read." },
        400,
      );
    }
  }

  const data = normalizeQuote(raw);

  if (data.company) {
    return jsonResponse(request, { ok: true });
  }

  const validationError = validateQuote(data);
  if (validationError) {
    return jsonResponse(request, { ok: false, error: validationError }, 400);
  }

  const retryAfter = consumeRateLimit(quoteRateLimits, request, 8);
  if (retryAfter !== null) {
    return jsonResponse(
      request,
      {
        ok: false,
        error:
          "We received several requests from this connection. Please call or try again in a few minutes.",
      },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL) {
    return jsonResponse(
      request,
      {
        ok: false,
        error:
          "Online delivery is temporarily unavailable. Please call or text us.",
      },
      503,
    );
  }

  const reference = await createReference(data.submissionId);
  const replyTo = quoteReplyAddress(reference, env);
  const receivedAt = new Date();
  const attachments =
    photos.length > 0 ? await photoAttachments(photos) : [];
  const common = {
    from: fromAddress(env),
    reply_to: replyTo,
    headers: {
      "X-Entity-Ref-ID": reference,
      "X-USJR-Reference": reference,
    },
    tags: [
      { name: "source", value: "website_quote" },
      {
        name: "quote_ref",
        value: reference.toLowerCase().replaceAll("-", "_"),
      },
    ],
  };

  const business = await sendEmail(
    env,
    {
      ...common,
      to: [env.QUOTE_TO_EMAIL],
      subject: `[${reference}] New ${data.service} quote — ${data.address}`,
      text: `New quote ${reference}\n\nReceived: ${formatReceivedAtChicago(receivedAt)}\n\n${textRows(data)}\n\nCall customer: ${data.phone}\nEmail customer: ${data.email}${
        attachments.length > 0
          ? `\n\nPhotos attached: ${attachments.length}`
          : ""
      }${businessEmailTextExtras(data, reference, receivedAt)}`,
      html: businessEmail(data, reference, attachments.length, receivedAt),
      ...(attachments.length > 0 ? { attachments } : {}),
    },
    `quote/${reference}/business`,
  );

  if (!business.ok) {
    return jsonResponse(
      request,
      {
        ok: false,
        error:
          "We could not deliver the request online. Please call or text us instead.",
      },
      502,
    );
  }

  const confirmation = data.email.trim()
    ? await sendEmail(
        env,
        {
          ...common,
          to: [data.email],
          subject: customerEmailSubject(reference),
          text: customerEmailText(data, reference),
          html: customerEmail(data, reference),
        },
        `quote/${reference}/customer`,
      )
    : { ok: false };

  return jsonResponse(request, {
    ok: true,
    reference,
    confirmationSent: confirmation.ok,
    photosSent: attachments.length,
  });
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(buffer).toString("base64");
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

function isAllowedPhotoFile(photo: File) {
  return (
    photo.size >= 1 &&
    photo.size <= MAX_PHOTO_BYTES &&
    (allowedPhotoTypes.has(photo.type.toLowerCase()) ||
      allowedPhotoExtensions.test(photo.name))
  );
}

function collectPhotoFiles(formData: FormData) {
  return formData
    .getAll("photo")
    .filter((value): value is File => value instanceof File);
}

function validatePhotoFiles(
  photos: File[],
  options?: { minimumWhenPresent?: number },
) {
  if (photos.length === 0) {
    return options?.minimumWhenPresent ? "Add at least one photo." : "";
  }

  const minimum = options?.minimumWhenPresent ?? 1;
  if (photos.length < minimum || photos.length > 8) {
    return "Use 1–8 JPG, PNG, or HEIC photos smaller than 3.5 MB each.";
  }

  if (!photos.every(isAllowedPhotoFile)) {
    return "Use 1–8 JPG, PNG, or HEIC photos smaller than 3.5 MB each.";
  }

  return "";
}

async function photoAttachments(photos: File[]) {
  return Promise.all(
    photos.map(async (photo) => ({
      filename: safeFilename(photo.name),
      content: arrayBufferToBase64(await photo.arrayBuffer()),
    })),
  );
}

function photoBatchIdempotencyKey(reference: string, photos: File[]) {
  const fingerprint = photos
    .map((photo) => `${safeFilename(photo.name)}:${photo.size}`)
    .join("|");
  let hash = 0;
  for (let index = 0; index < fingerprint.length; index += 1) {
    hash = (hash * 31 + fingerprint.charCodeAt(index)) >>> 0;
  }
  return `quote-photo/${reference}/batch-${photos.length}-${hash.toString(16)}`;
}

export async function handleQuotePhotoRequest(
  request: Request,
  env: QuoteEnvironment,
) {
  if (request.method === "OPTIONS") {
    return handleQuoteOptions(request);
  }

  if (request.method !== "POST") {
    return jsonResponse(request, { ok: false }, 405);
  }

  if (rejectDisallowedOrigin(request)) {
    return jsonResponse(request, { ok: false }, 403);
  }

  const retryAfter = consumeRateLimit(photoRateLimits, request, 48);
  if (retryAfter !== null) {
    return jsonResponse(
      request,
      { ok: false, error: "Too many photo uploads. Please wait a few minutes." },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL) {
    return jsonResponse(
      request,
      { ok: false, error: "Photo delivery is temporarily unavailable." },
      503,
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse(
      request,
      { ok: false, error: "Invalid photo upload." },
      400,
    );
  }

  const reference = stringValue(formData.get("reference"), 20).toUpperCase();
  const name = stringValue(formData.get("name"), 100);
  const email = stringValue(formData.get("email"), 254).toLowerCase();
  const photos = collectPhotoFiles(formData);
  const photoError = validatePhotoFiles(photos, { minimumWhenPresent: 1 });

  if (
    !/^USJR-[A-F0-9]{8}$/.test(reference) ||
    name.length < 2 ||
    !validEmail(email) ||
    photoError
  ) {
    return jsonResponse(
      request,
      {
        ok: false,
        error:
          photoError ||
          "Use 1–8 JPG, PNG, or HEIC photos smaller than 3.5 MB each.",
      },
      400,
    );
  }

  const attachments = await photoAttachments(photos);
  const photoLabel = `${photos.length} photo${photos.length === 1 ? "" : "s"}`;
  const result = await sendEmail(
    env,
    {
      from: fromAddress(env),
      to: [env.QUOTE_TO_EMAIL],
      reply_to: quoteReplyAddress(reference, env),
      subject: `[${reference}] ${photoLabel} from ${name}`,
      text: `${photoLabel} for ${reference}, uploaded by ${name} (${email}).`,
      html: emailDocument(
        `${reference} photos`,
        `<h1 style="margin:0 0 10px;font:800 24px/30px Arial,sans-serif;color:#102a43">${escapeHtml(photoLabel)} for ${escapeHtml(reference)}</h1>
         <p style="margin:0;font:400 14px/21px Arial,sans-serif;color:#475a69">Uploaded by ${escapeHtml(name)} (${escapeHtml(email)}). All photos from this upload are attached to this email.</p>`,
      ),
      attachments,
      headers: {
        "X-Entity-Ref-ID": `${reference}-photos`,
        "X-USJR-Reference": reference,
      },
      tags: [
        {
          name: "quote_ref",
          value: reference.toLowerCase().replaceAll("-", "_"),
        },
      ],
    },
    photoBatchIdempotencyKey(reference, photos),
  );

  if (!result.ok) {
    return jsonResponse(
      request,
      {
        ok: false,
        error:
          "The request arrived, but the photos did not. Please retry them.",
      },
      502,
    );
  }

  return jsonResponse(request, { ok: true, photosSent: photos.length });
}

function decodeBase64(value: string) {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(value, "base64"));
  }

  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function verifyWebhook(payload: string, request: Request, secret?: string) {
  const id = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signatureHeader = request.headers.get("svix-signature");

  if (!secret || !id || !timestamp || !signatureHeader) {
    return false;
  }

  const timestampNumber = Number(timestamp);
  if (
    !Number.isFinite(timestampNumber) ||
    Math.abs(Date.now() / 1_000 - timestampNumber) > 300
  ) {
    return false;
  }

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      decodeBase64(secret.replace(/^whsec_/, "")),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = new Uint8Array(
      await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(`${id}.${timestamp}.${payload}`),
      ),
    );
    const expected = arrayBufferToBase64(signature.buffer);

    return signatureHeader
      .split(" ")
      .map((part) => part.split(","))
      .some(([version, supplied]) => {
        if (version !== "v1" || !supplied || supplied.length !== expected.length) {
          return false;
        }

        let difference = 0;
        for (let index = 0; index < expected.length; index += 1) {
          difference |= expected.charCodeAt(index) ^ supplied.charCodeAt(index);
        }
        return difference === 0;
      });
  } catch {
    return false;
  }
}

function resendHeaders(env: QuoteEnvironment) {
  return {
    Authorization: `Bearer ${env.RESEND_API_KEY || ""}`,
    "Content-Type": "application/json",
  };
}

function extractEmailAddress(value: string) {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] || value).trim().toLowerCase();
}

async function findCustomerEmail(
  reference: string,
  env: QuoteEnvironment,
) {
  const response = await fetch("https://api.resend.com/emails?limit=100", {
    headers: resendHeaders(env),
  });
  if (!response.ok) {
    return "";
  }

  const payload = (await response.json()) as {
    data?: Array<{ subject?: string; to?: string[] }>;
  };
  return (
    payload.data?.find(
      (email) => email.subject === customerEmailSubject(reference),
    )?.to?.[0] || ""
  );
}

async function getReceivedEmail(emailId: string, env: QuoteEnvironment) {
  const response = await fetch(
    `https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`,
    { headers: resendHeaders(env) },
  );
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as ReceivedEmail;
}

async function getReceivedAttachments(
  emailId: string,
  env: QuoteEnvironment,
) {
  const response = await fetch(
    `https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}/attachments?limit=20`,
    { headers: resendHeaders(env) },
  );
  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as {
    data?: Array<{
      content_type?: string;
      download_url?: string;
      filename?: string;
    }>;
  };

  return (payload.data || [])
    .filter(
      (attachment) =>
        Boolean(attachment.download_url) &&
        (attachment.content_type?.startsWith("image/") ||
          attachment.content_type === "application/pdf"),
    )
    .slice(0, 8)
    .map((attachment) => ({
      filename: safeFilename(attachment.filename || "attachment"),
      path: attachment.download_url,
    }));
}

export async function handleResendWebhook(
  request: Request,
  env: QuoteEnvironment,
) {
  if (request.method === "OPTIONS") {
    return handleQuoteOptions(request);
  }

  if (request.method !== "POST") {
    return jsonResponse(request, { ok: false }, 405);
  }

  const payload = await request.text();
  if (
    !(await verifyWebhook(payload, request, env.RESEND_WEBHOOK_SECRET))
  ) {
    return jsonResponse(request, { ok: false }, 401);
  }

  let event: ResendEvent;
  try {
    event = JSON.parse(payload) as ResendEvent;
  } catch {
    return jsonResponse(request, { ok: false }, 400);
  }

  if (event.type !== "email.received") {
    return jsonResponse(request, { ok: true });
  }

  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL || !event.data?.email_id) {
    return jsonResponse(request, { ok: false }, 503);
  }

  const domain = inboundDomain(env);
  const receivingAddress = event.data.to?.find((address) =>
    address.toLowerCase().endsWith(`@${domain}`),
  );
  const reference = receivingAddress
    ?.toLowerCase()
    .match(/^reply-(usjr-[a-f0-9]{8})@/)?.[1]
    ?.toUpperCase();

  if (!reference) {
    return jsonResponse(request, { ok: true, ignored: true });
  }

  const customerEmail = await findCustomerEmail(reference, env);
  const received = await getReceivedEmail(event.data.email_id, env);
  if (!customerEmail || !received) {
    return jsonResponse(request, { ok: false }, 502);
  }

  const sender = extractEmailAddress(
    received.from || event.data.from || "",
  );
  const destination =
    sender === customerEmail.toLowerCase()
      ? env.QUOTE_TO_EMAIL
      : customerEmail;
  const message =
    received.text?.trim() ||
    received.html
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim() ||
    "Reply received with no text body.";
  const subject = safeSubject(
    received.subject || event.data.subject || "Quote reply",
  );
  const attachments = await getReceivedAttachments(event.data.email_id, env);

  const result = await sendEmail(
    env,
    {
      from: fromAddress(env),
      to: [destination],
      reply_to: quoteReplyAddress(reference, env),
      subject: subject.toLowerCase().startsWith("re:")
        ? subject
        : `Re: ${subject}`,
      text: `${sender || "A quote participant"} wrote:\n\n${message}`,
      html: emailDocument(
        `${reference} reply`,
        `<h1 style="margin:0 0 10px;font:800 22px/28px Arial,sans-serif;color:#102a43">Reply for ${escapeHtml(reference)}</h1>
         <p style="margin:0 0 16px;font:400 13px/20px Arial,sans-serif;color:#657583">From ${escapeHtml(sender || "quote participant")}</p>
         <p style="margin:0;white-space:pre-wrap;font:400 14px/22px Arial,sans-serif;color:#344d60">${escapeHtml(message)}</p>`,
      ),
      ...(attachments.length > 0 ? { attachments } : {}),
      headers: {
        "X-Entity-Ref-ID": `${reference}-${event.data.email_id}`,
        "X-USJR-Reference": reference,
        ...(received.message_id
          ? {
              "In-Reply-To": received.message_id,
              References: received.message_id,
            }
          : {}),
      },
    },
    `quote-forward/${event.data.email_id}`,
  );

  return jsonResponse(request, { ok: result.ok }, result.ok ? 200 : 502);
}
