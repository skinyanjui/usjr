# Remote MCP compatibility

Endpoint: `https://unclesamjunkremoval.com/api/mcp`

## Supported protocol eras

- MCP `2026-07-28`: stateless request/response mode with `server/discover`, per-request `_meta`, `MCP-Protocol-Version`, `Mcp-Method`, and `Mcp-Name` on tool calls.
- Legacy compatibility: `2025-11-25`, `2025-06-18`, `2025-03-26` through `initialize` / `notifications/initialized`.

The remote surface contains public read tools plus one guarded additive write action for quote submission. It does not reserve appointments or confirm bookings.

## Tool contract

Remote tools:

1. `listServices`
2. `checkServiceArea`
3. `estimatePrice`
4. `getHaulingPolicy`
5. `getBusinessInfo`
6. `getQuoteLink`
7. `prepareQuoteRequest`
8. `submitQuoteRequest`

The first seven tools are read-only/non-destructive/idempotent. `submitQuoteRequest` declares `readOnlyHint: false`, `destructiveHint: false`, `idempotentHint: true`, and `openWorldHint: true` because it creates a lead and sends emails outside the MCP server. Tool annotations are risk hints; the server still enforces its own confirmation, validation, rate-limit, and idempotency rules.

## Quote write safety contract

`prepareQuoteRequest` performs no write. It normalizes the request, checks the service area, checks hauling policy, rejects past preferred dates, blocks items classified `not_accepted`, and returns a deterministic `confirmationId` for the exact normalized payload.

`submitQuoteRequest` succeeds only when all of the following are true:

- the request still validates;
- the supplied `confirmationId` exactly matches the current payload;
- `confirmedByCustomer` is `true` after explicit customer approval;
- `consentToContact` is `true` after explicit customer consent;
- no item is classified `not_accepted`;
- the shared quote-delivery backend accepts the request.

If any request field changes after preparation, the confirmation id changes and the caller must prepare and confirm again. Same-payload retries produce the same quote reference and reuse Resend idempotency keys.

## Official MCP Inspector

For a deployed public endpoint:

```bash
npx -y @modelcontextprotocol/inspector https://unclesamjunkremoval.com/api/mcp
```

Expected checks:

- Connect successfully over Streamable HTTP.
- `server/discover` advertises MCP `2026-07-28` and tools capability.
- Tools tab shows exactly the eight remote tools above.
- `checkServiceArea({"location":"47715"})` returns Evansville coverage.
- `checkServiceArea({"location":"99999"})` returns `unknown`, not unavailable.
- `getHaulingPolicy({"item":"old paint cans"})` returns advance notice.
- `getHaulingPolicy({"item":"needles"})` returns not accepted.
- `getQuoteLink(...)` returns a customer-review URL containing `ref=mcp`, `mcp_source`, and an opaque `mcp_trace` conversion id.
- `prepareQuoteRequest(...)` returns `submitted:false` and a `qcf_...` confirmation id without sending email.
- Repeating the same `prepareQuoteRequest(...)` returns the same confirmation id.
- A `choose-date` request with a past date is rejected before submission.
- `prepareQuoteRequest` with a `not_accepted` item is not ready to submit.
- `submitQuoteRequest(...)` without explicit customer confirmation is rejected without sending.
- A successful confirmed `submitQuoteRequest(...)` returns an `USJR-XXXXXXXX` reference.
- Unknown tools return JSON-RPC invalid-params error.
- Modern header/body mismatches return MCP header-mismatch error `-32020`.

## ChatGPT / Codex-compatible remote app

Configure the custom MCP app with the endpoint URL above and scan tools. Clients that support MCP write actions should classify `submitQuoteRequest` as a write/modify action and may request user confirmation based on their own permission model. The server does not rely on the client confirmation UI: it independently requires the preparation confirmation id and explicit confirmation/contact-consent arguments.

Suggested read prompts:

- `Does Uncle Sam Junk Removal serve ZIP 47715?`
- `Can they take a refrigerator and old paint cans?`
- `Give me a planning range for a half-load furniture removal.`
- `Create a quote link for a sectional pickup in Newburgh.`

Suggested write-flow prompt:

- `Prepare a quote request for my couch and mattress, show me exactly what will be submitted, and only submit after I confirm.`

Expected sequence: `prepareQuoteRequest` -> present normalized request -> user confirmation -> `submitQuoteRequest` -> return quote reference.

## Claude-compatible remote connector

Add the same public endpoint as a custom web connector/client where remote write tools are supported.

Expected connector behavior:

- Streamable HTTP connection succeeds.
- Eight tools appear with the annotations described above.
- Read tool calls return useful structured output and text content.
- `prepareQuoteRequest` is safe to retry and does not create external state.
- `submitQuoteRequest` is presented as an additive external-state action when the client honors annotations.
- The server rejects stale/mismatched confirmation ids and absent customer confirmation/contact consent.

## Telemetry verification

Structured runtime log events use `type: "usjr_mcp_telemetry"` and intentionally exclude customer quote contents.

Expected funnel for `getQuoteLink`:

1. `request` with `method=tools/call`, `tool=getQuoteLink`, and client family.
2. `quote_link_generated` with `conversionId`.
3. `quote_link_opened` with the same `conversionId` when the customer opens the URL.
4. `quote_converted` with the same `conversionId` only after `/api/quote` returns a successful quote reference.

Expected direct-write events:

1. `request` for `prepareQuoteRequest`.
2. `quote_prepared` with an opaque conversion id and readiness boolean.
3. `request` for `submitQuoteRequest`.
4. `quote_converted` with `conversionPath=mcp_submit_tool` and the quote reference after successful delivery.

Telemetry intentionally excludes prompts, tool arguments, quote notes, names, email addresses, phone numbers, and IP addresses.
