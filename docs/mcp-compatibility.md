# Remote MCP compatibility

Endpoint: `https://unclesamjunkremoval.com/api/mcp`

## Supported protocol eras

- MCP `2026-07-28`: stateless request/response mode with `server/discover`, per-request `_meta`, `MCP-Protocol-Version`, `Mcp-Method`, and `Mcp-Name` on tool calls.
- Legacy compatibility: `2025-11-25`, `2025-06-18`, `2025-03-26` through `initialize` / `notifications/initialized`.

The remote tool surface is read-only. It does not submit quotes, check consent, reserve appointments, or book work.

## Tool contract

Remote tools:

1. `listServices`
2. `checkServiceArea`
3. `estimatePrice`
4. `getHaulingPolicy`
5. `getBusinessInfo`
6. `getQuoteLink`

Every tool declares a title plus `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, and `openWorldHint: false`.

## Official MCP Inspector

For a deployed public endpoint:

```bash
npx -y @modelcontextprotocol/inspector https://unclesamjunkremoval.com/api/mcp
```

Expected checks:

- Connect successfully over Streamable HTTP.
- `server/discover` advertises MCP `2026-07-28` and tools capability.
- Tools tab shows exactly the six remote tools above.
- `checkServiceArea({"location":"47715"})` returns Evansville coverage.
- `checkServiceArea({"location":"99999"})` returns `unknown`, not unavailable.
- `getHaulingPolicy({"item":"old paint cans"})` returns advance notice.
- `getHaulingPolicy({"item":"needles"})` returns not accepted.
- `getQuoteLink(...)` returns a customer-review URL containing `ref=mcp`, `mcp_source`, and an opaque `mcp_trace` conversion id.
- Unknown tools return JSON-RPC invalid-params error.
- Modern header/body mismatches return MCP header-mismatch error `-32020`.

## ChatGPT / Codex-compatible remote app

ChatGPT custom MCP apps connect to remote MCP endpoints. Configure the app with the endpoint URL above and scan tools. No `search` or `fetch` compatibility tools are required for this read-only server.

Expected scan result: six read-only tools, with no write/modify actions.

Suggested prompts:

- `Does Uncle Sam Junk Removal serve ZIP 47715?`
- `Can they take a refrigerator and old paint cans?`
- `Give me a planning range for a half-load furniture removal.`
- `Create a quote link for a sectional pickup in Newburgh.`

The last prompt should return a link for customer review; ChatGPT should not be offered any MCP action that submits the form.

## Claude-compatible remote connector

Add the same public endpoint as a custom web connector. Claude remote connectors are cloud-originated, so the production endpoint must be publicly reachable.

Expected connector behavior:

- Streamable HTTP connection succeeds.
- Six tools appear with read-only/non-destructive annotations.
- Tool calls return useful structured output and text content.
- No OAuth is required because the server exposes only public business information.
- No tool can modify external state.

## Telemetry verification

Structured runtime log events use `type: "usjr_mcp_telemetry"`.

Expected funnel for `getQuoteLink`:

1. `request` with `method=tools/call`, `tool=getQuoteLink`, and client family.
2. `quote_link_generated` with `conversionId`.
3. `quote_link_opened` with the same `conversionId` when the customer opens the URL.
4. `quote_converted` with the same `conversionId` only after `/api/quote` returns a successful quote reference.

Telemetry intentionally excludes prompts, tool arguments, quote notes, names, email addresses, phone numbers, and IP addresses.
