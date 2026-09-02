import assert from "node:assert/strict";
import test from "node:test";
import {
  computeCallbackHoldWindow,
  dateFromChicagoWallTime,
  formatGoogleCalendarChicago,
} from "../lib/quote-date.ts";
import { buildCallbackCalendarUrl } from "../lib/quote-server.ts";

function sampleQuote(overrides: Record<string, unknown> = {}) {
  return {
    submissionId: "calendar-test-submission",
    name: "Sam Tester",
    phone: "(812) 555-0100",
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
    notes: "Garage pile",
    consent: true,
    company: "",
    source: "unit-test",
    startedAt: Date.now() - 2_000,
    planningRange: "$289–389",
    ...overrides,
  };
}

test("callback hold rounds up thirty minutes after receipt during business hours", () => {
  const received = dateFromChicagoWallTime(2025, 9, 2, 10, 7);
  const { start, end } = computeCallbackHoldWindow(received);

  assert.equal(formatGoogleCalendarChicago(start), "20250902T110000");
  assert.equal(formatGoogleCalendarChicago(end), "20250902T113000");
});

test("callback hold starts at eight on weekday mornings before open", () => {
  const received = dateFromChicagoWallTime(2025, 9, 3, 7, 15);
  const { start } = computeCallbackHoldWindow(received);

  assert.equal(formatGoogleCalendarChicago(start), "20250903T080000");
});

test("callback hold defers Sunday requests to Monday at eight", () => {
  const received = dateFromChicagoWallTime(2025, 8, 31, 11, 0);
  const { start } = computeCallbackHoldWindow(received);

  assert.equal(formatGoogleCalendarChicago(start), "20250901T080000");
});

test("callback hold defers after four thirty to the next Monday at eight", () => {
  const received = dateFromChicagoWallTime(2025, 9, 6, 16, 45);
  const { start } = computeCallbackHoldWindow(received);

  assert.equal(formatGoogleCalendarChicago(start), "20250908T080000");
});

test("callback calendar url includes hold details and skips test quotes", () => {
  const received = dateFromChicagoWallTime(2025, 9, 2, 10, 0);
  const reference = "USJR-ABCDEF01";
  const url = buildCallbackCalendarUrl(
    sampleQuote() as never,
    reference,
    received,
  );

  assert.ok(url);
  assert.match(url!, /calendar\.google\.com\/calendar\/render\?action=TEMPLATE/);
  assert.match(url!, /text=Call\+Sam\+Tester\+.*USJR-ABCDEF01/);
  assert.match(url!, /location=Evansville\+IN/);
  assert.match(url!, /ctz=America%2FChicago/);
  assert.match(url!, /dates=20250902T103000%2F20250902T110000/);
  assert.match(
    url!,
    /details=.*Callback\+hold.*not\+a\+confirmed\+job.*tel%3A8125550100.*mailto%3Acustomer%40example\.com/s,
  );

  assert.equal(
    buildCallbackCalendarUrl(
      sampleQuote({ name: "TEST Sam" }) as never,
      reference,
      received,
    ),
    null,
  );
  assert.equal(
    buildCallbackCalendarUrl(
      sampleQuote({ notes: "DO NOT SCHEDULE this one" }) as never,
      reference,
      received,
    ),
    null,
  );
});
