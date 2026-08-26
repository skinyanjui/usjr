import assert from "node:assert/strict";
import test from "node:test";
import {
  handleQuotePhotoRequest,
  handleQuoteRequest,
} from "../lib/quote-server.ts";

const originalFetch = globalThis.fetch;

function jpegFile(name: string, size = 1200) {
  return new File([new Uint8Array(size)], name, { type: "image/jpeg" });
}

function quotePayload(overrides: Record<string, unknown> = {}) {
  return {
    submissionId: "test-submission-single-email-001",
    name: "Sam Tester",
    phone: "8125550100",
    email: "customer@example.com",
    address: "Evansville, IN",
    service: "Junk Removal",
    urgency: "flexible",
    preferredDate: "",
    quantity: "½ trailer load",
    placement: "outdoor",
    access: [],
    heavyMaterials: false,
    dismantling: false,
    heavyDetails: "",
    preferredContact: "email",
    conditionalDetails: {},
    notes: "Please haul the pile by the garage.",
    consent: true,
    company: "",
    source: "unit-test",
    startedAt: Date.now() - 2_000,
    ...overrides,
  };
}

function mockResend() {
  const sent: Array<Record<string, unknown>> = [];
  globalThis.fetch = (async (_input, init) => {
    sent.push(JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>);
    return new Response(JSON.stringify({ id: `email_${sent.length}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return sent;
}

test("multipart quote submit sends one business email with every photo attached", async () => {
  const sent = mockResend();

  try {
    const formData = new FormData();
    formData.append("payload", JSON.stringify(quotePayload()));
    formData.append("photo", jpegFile("one.jpg"));
    formData.append("photo", jpegFile("two.jpg"));
    formData.append("photo", jpegFile("three.jpg"));

    const response = await handleQuoteRequest(
      new Request("https://unclesamjunkremoval.com/api/quote", {
        method: "POST",
        headers: { Origin: "https://unclesamjunkremoval.com" },
        body: formData,
      }),
      {
        QUOTE_TO_EMAIL: "owner@example.com",
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "Uncle Sam Quotes <quotes@unclesamjunkremoval.com>",
        RESEND_INBOUND_EMAIL: "reply@karaiveluu.resend.app",
      },
    );

    const payload = (await response.json()) as {
      ok?: boolean;
      photosSent?: number;
      reference?: string;
    };

    assert.equal(response.status, 200);
    assert.equal(payload.ok, true);
    assert.equal(payload.photosSent, 3);
    assert.match(String(payload.reference), /^USJR-[A-F0-9]{8}$/);

    assert.equal(sent.length, 2, "business + customer confirmation only");
    const business = sent[0];
    const attachments = business.attachments as Array<{ filename: string }>;
    assert.ok(Array.isArray(attachments));
    assert.equal(attachments.length, 3);
    assert.deepEqual(
      attachments.map((item) => item.filename),
      ["one.jpg", "two.jpg", "three.jpg"],
    );
    assert.match(String(business.subject), /New Junk Removal quote/);
    assert.match(String(business.text), /Photos attached: 3/);
    assert.equal(sent[1].attachments, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("JSON quote without photos still sends one business email and no attachments", async () => {
  const sent = mockResend();

  try {
    const response = await handleQuoteRequest(
      new Request("https://unclesamjunkremoval.com/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://unclesamjunkremoval.com",
        },
        body: JSON.stringify(quotePayload({ submissionId: "no-photos-002" })),
      }),
      {
        QUOTE_TO_EMAIL: "owner@example.com",
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "Uncle Sam Quotes <quotes@unclesamjunkremoval.com>",
      },
    );

    const payload = (await response.json()) as {
      ok?: boolean;
      photosSent?: number;
    };
    assert.equal(response.status, 200);
    assert.equal(payload.ok, true);
    assert.equal(payload.photosSent, 0);
    assert.equal(sent.length, 2);
    assert.equal(sent[0].attachments, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("photo retry endpoint sends one email with all attached photos", async () => {
  const sent = mockResend();

  try {
    const formData = new FormData();
    formData.append("reference", "USJR-AABBCCDD");
    formData.append("name", "Sam Tester");
    formData.append("email", "customer@example.com");
    formData.append("photo", jpegFile("retry-a.jpg"));
    formData.append("photo", jpegFile("retry-b.jpg"));
    formData.append("photo", jpegFile("retry-c.jpg"));

    const response = await handleQuotePhotoRequest(
      new Request("https://unclesamjunkremoval.com/api/quote/photo", {
        method: "POST",
        headers: { Origin: "https://unclesamjunkremoval.com" },
        body: formData,
      }),
      {
        QUOTE_TO_EMAIL: "owner@example.com",
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "Uncle Sam Quotes <quotes@unclesamjunkremoval.com>",
      },
    );

    const payload = (await response.json()) as {
      ok?: boolean;
      photosSent?: number;
    };
    assert.equal(response.status, 200);
    assert.equal(payload.ok, true);
    assert.equal(payload.photosSent, 3);
    assert.equal(sent.length, 1);
    const attachments = sent[0].attachments as Array<{ filename: string }>;
    assert.equal(attachments.length, 3);
    assert.match(String(sent[0].subject), /3 photos from Sam Tester/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
