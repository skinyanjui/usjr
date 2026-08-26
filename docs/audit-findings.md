# Uncle Sam Junk Removal — security & quality audit

**Target:** [skinyanjui/usjr](https://github.com/skinyanjui/usjr)  
**Live site:** https://unclesamjunkremoval.com  
**Vercel project:** `unclesamjunkremoval` (Hobby team `skinyanjuis-projects`)  
**Audit date:** 2026-08-26  
**Scope:** Read-only investigation of repository code plus live HTTP verification. **No application behavior changes** in this PR.

## Stack (verified)

| Layer | What the repo / production actually use |
| --- | --- |
| Production host | **Vercel** (`server: Vercel` on live responses); framework detected as **Next.js** |
| App framework | **Next.js 16.2.11** App Router + **React 19.2.6** (`package.json`) |
| Alternate / Sites path | **vinext 0.0.50** + **Vite 8** + Cloudflare Worker entry (`worker/index.ts`, `vite.config.ts`, README) for OpenAI Sites / ChatGPT site hosting |
| Data / email | No app database in use (`db/schema.ts` empty). Quotes/photos go out through **Resend** (`lib/quote-server.ts`) to `QUOTE_TO_EMAIL` (Gmail per `.env.example` / privacy copy) |
| Agent surface | Public **MCP** at `/api/mcp` with write tool `submitQuoteRequest` (`lib/mcp-write-tools.ts`, `public/.well-known/mcp.json`) |

`vercel.json` sets `"buildCommand": "next build"` while `package.json` `"build"` runs the Sites/vinext verified build. Production is clearly Next-on-Vercel today; the dual path is a configuration footgun (see Medium).

## Method

- Static review of API routes, quote/MCP/webhook code, headers, redirects, workflows, env examples, and public metadata.
- Secret pattern scan of the working tree (no live API keys or GitHub PATs found committed).
- Live probes against `https://unclesamjunkremoval.com` (headers, CORS, quote, photo, MCP, robots/sitemap, attached Vercel domains).
- Vercel project/domain/protection metadata for `unclesamjunkremoval`.

**Operational note:** A GitHub PAT pasted in an earlier chat must be treated as **burned**. This audit did not use or commit any conversation token. Rotate/revoke that PAT in GitHub if it has not been revoked already. No evidence it was committed to this repo.

**Inbox note from verification:** Live probes intentionally exercised production write paths and may have delivered test quote/photo messages to the business Resend/Gmail inbox (e.g. reference `USJR-19CC02F2`, photo tagged `USJR-DEADBEEF`). Discard those as audit traffic.

---

## Severity summary

| Severity | Count | Themes |
| --- | --- | --- |
| Critical | 2 | Unauthenticated quote spam; unbound photo upload to business email |
| High | 4 | MCP write abuse; ineffective rate limits; MIME spoof; stray Vercel domain |
| Medium | 8 | Headers/CSP/CORS, dual stack, PII-via-email, deps, reference entropy, CI live writes |
| Low | 7 | Structure, a11y/SEO polish, README drift, Permissions-Policy, metadata noise |

---

## Critical

### C1. Quote API accepts Origin-less POSTs and will email real leads

- **Evidence:** `rejectDisallowedOrigin` in `lib/quote-server.ts` only rejects when an `Origin` header is **present and not allowlisted**. Missing `Origin` is treated as allowed. Live verification:

  ```bash
  curl -s -X POST https://unclesamjunkremoval.com/api/quote \
    -H 'Content-Type: application/json' \
    -d '{...valid quote fields, no Origin...}'
  # => {"ok":true,"reference":"USJR-19CC02F2","confirmationSent":false}
  ```

  Cross-site `Origin: https://evil.example` correctly returns 403 (good), but bots/scripts omit `Origin`.

- **Impact:** Anyone can flood the business inbox and burn Resend quota with forged customer PII. Client-controlled `startedAt` / `submissionId` also make the timing anti-bot check trivial to satisfy. For a local junk-removal business, inbox spam directly disrupts dispatch.

- **Suggested fix:** Require a trusted browser signal (strict allowlisted `Origin` **or** `Sec-Fetch-Site`/`Sec-Fetch-Mode` checks), add a server-issued CSRF/session token for the form, and/or put quote writes behind Turnstile/hCaptcha. Reject requests with no `Origin` unless they present a separate server-verified capability (e.g. MCP mTLS / shared secret — not the current open MCP path).

### C2. Photo upload is unbound from real quotes and emails arbitrary files to the business

- **Evidence:** `handleQuotePhotoRequest` in `lib/quote-server.ts` accepts any `USJR-[A-F0-9]{8}` reference plus name/email; it does **not** verify that the reference was issued, belongs to that email, or that a quote exists. Live:

  ```bash
  curl -s -X POST https://unclesamjunkremoval.com/api/quote/photo \
    -F 'reference=USJR-DEADBEEF' -F 'name=Audit' -F 'email=a@example.com' \
    -F 'index=1' -F 'total=3' -F 'photo=@favicon.svg;type=image/png'
  # => {"ok":true}
  ```

  Acceptance logic is OR of MIME type **or** extension (`allowedPhotoTypes` / `allowedPhotoExtensions`), so spoofed `Content-Type: image/png` accepts non-image bytes (including `.svg` / `.exe` names).

- **Impact:** Attackers can attach malware, large payloads (up to 3.5 MB × many requests), or harassment content to the business mailbox under fake quote references. No Origin required (same gap as C1).

- **Suggested fix:** Issue an unguessable photo-upload token when the quote is created; require that token (or signed reference) on `/api/quote/photo`. Validate magic bytes server-side (not client MIME). Cap concurrent uploads per reference; store or scan before emailing if feasible.

---

## High

### H1. Public MCP `submitQuoteRequest` can create real leads with caller-asserted “consent”

- **Evidence:** `public/.well-known/mcp.json` declares `"authentication": "none"` and `"readOnly": false`. `submitQuote` in `lib/mcp-write-tools.ts` recomputes a deterministic `confirmationId` (SHA-256 of the payload) and accepts `confirmedByCustomer` / `consentToContact` as **booleans supplied by the caller**. It then calls `handleQuoteRequest` with a synthetic Request that **omits Origin**, bypassing the browser Origin gate. Live `tools/list` and `prepareQuoteRequest` succeed without credentials.

- **Impact:** Any internet client that can POST JSON to `/api/mcp` can spam production leads/emails after setting two flags to `true`. The “show the customer then confirm” contract is honor-system, not enforcement. Documented intentionally for agent UX (`docs/mcp-compatibility.md`) but unsafe as a public unauthenticated write.

- **Suggested fix:** Require MCP auth (OAuth / bearer / Vercel Firewall / allowlisted client credentials), bind confirmation to a short-lived server-stored nonce (not a pure hash of attacker-chosen fields), add stronger abuse controls, and consider making remote submit prepare-only with human completion on the website.

### H2. In-memory rate limits are ineffective on Vercel serverless

- **Evidence:** `quoteRateLimits` / `photoRateLimits` are process-local `Map`s in `lib/quote-server.ts` (8 quotes / 48 photos per key per 15 minutes). Vercel Node serverless instances do not share that memory. Client IP is taken from `CF-Connecting-IP` / `X-Forwarded-For` / `X-Real-IP` (spoofable if the platform does not overwrite them).

- **Impact:** C1/C2/H1 can be amplified across instances; limits give a false sense of protection in the MCP docs (“rate-limit… rules”).

- **Suggested fix:** Use durable limiting (Vercel KV/Upstash Redis, Resend-side caps, or Vercel WAF/Firewall rate rules) keyed on a platform-trusted IP header only.

### H3. Photo content-type / extension OR-check enables content spoofing

- **Evidence:** Reject condition in `handleQuotePhotoRequest`:

  ```ts
  (!allowedPhotoTypes.has(photo.type.toLowerCase()) &&
    !allowedPhotoExtensions.test(photo.name))
  ```

  Spoofed MIME **or** a matching extension alone is enough. Combined with C2, non-images reach the inbox as “photos.”

- **Impact:** Malicious or misleading attachments in a high-trust mailbox used for dispatch.

- **Suggested fix:** Require both allowlisted extension **and** sniffed image magic bytes; re-encode images server-side before attach when possible; block SVG/HTML/PDF unless explicitly needed (PDF is allowed on inbound webhook forwards).

### H4. Stray Vercel domain `v0-bullsoftx-website-clone.vercel.app` serves this marketing site

- **Evidence:** Vercel project `unclesamjunkremoval` domain list includes `v0-bullsoftx-website-clone.vercel.app`. Live fetch returns the Uncle Sam Junk Removal homepage (same title/body length as apex).

- **Impact:** Brand confusion, accidental indexing of a non-canonical host, leftover from an unrelated v0 clone name. Weakens trust and SEO canonical hygiene even though apex redirects `www`.

- **Suggested fix:** Remove unused/legacy domains from the Vercel project; keep only apex, `www`, and intentional preview hostnames. Confirm Search Console / sitemap host consistency.

---

## Medium

### M1. CSP allows `'unsafe-inline'` for scripts and styles

- **Evidence:** `next.config.ts` and `worker/index.ts` set  
  `script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'`. Observed on live HTML responses.

- **Impact:** Weakens XSS containment if a markup injection ever appears (JSON-LD `dangerouslySetInnerHTML` sites are usually safe when `JSON.stringify`’d from trusted data, but CSP will not stop inline script gadgets).

- **Suggested fix:** Move to nonce- or hash-based CSP compatible with Next.js; drop `'unsafe-inline'` for scripts at minimum.

### M2. Production HTML responses send `Access-Control-Allow-Origin: *`

- **Evidence:** Live `curl -sI https://unclesamjunkremoval.com/` includes `access-control-allow-origin: *`. MCP routes intentionally set `*` in `lib/mcp-server.ts` / `lib/mcp-write-tools.ts`. Quote routes reflect allowlisted origins only.

- **Impact:** For public marketing HTML this is mostly low risk, but it is overly permissive as a default posture and confusing next to the stricter quote CORS. Ensure authenticated or sensitive JSON never inherits `*`.

- **Suggested fix:** Remove blanket `*` from document responses if project/platform configurable; keep MCP CORS explicit and documented; never combine `*` with credentials.

### M3. Quote CORS allowlist includes `http://localhost` and a ChatGPT Sites origin

- **Evidence:** `allowedOrigins` in `lib/quote-server.ts` includes `http://localhost`, `http://127.0.0.1`, and `https://uncle-sam-junk-removal.bigafrica.chatgpt.site`. Live OPTIONS with `Origin: http://localhost` returns that ACAO. `http://localhost:3000` is correctly rejected (exact-match quirk).

- **Impact:** Production accepts browser calls from any page that can set Origin to the allowlisted chatgpt.site host (or exact `http://localhost`). Cross-origin quote posts from Sites are intentional (`quoteApiUrl` in `app/components/quote-section.tsx`), but production should not permanently allow open localhost origins.

- **Suggested fix:** Gate localhost origins to non-production; pin Sites origins via env; prefer same-origin proxy on the Sites host.

### M4. Dual Next/Vercel vs vinext/Cloudflare configuration drift

- **Evidence:** `vercel.json` → `next build`; `package.json` scripts/README center on vinext + Wrangler; `worker/index.ts` duplicates quote/webhook routing and security headers (including HSTS) that `next.config.ts` partially overlaps.

- **Impact:** Fixes applied on one path may not ship on the other; header/behavior divergence; higher chance of “works on Sites, broken on Vercel” regressions.

- **Suggested fix:** Document a single source of truth for production; share header/quote handlers; align `vercel.json` build with the intended pipeline; add a CI check that production headers match the policy file.

### M5. Customer PII handling is email-centric with limited retention control in-app

- **Evidence:** Privacy policy (`app/privacy/page.tsx`) accurately describes Resend → business inbox; no application datastore (`db/schema.ts`). Photos and quote bodies become ordinary email. Webhook forwarding pulls recent Resend messages via `GET https://api.resend.com/emails?limit=100` (`findCustomerEmail`).

- **Impact:** PII retention, search, and deletion depend on Gmail/Resend; list-last-100 matching is brittle under volume and widens API key blast radius if `RESEND_API_KEY` leaks.

- **Suggested fix:** Prefer storing lead metadata in a private store with retention TTL; scope Resend key; document deletion process; avoid scanning broad email lists to map references (encode recipient in reply address metadata instead).

### M6. Quote reference IDs are only 32 bits of public identifier

- **Evidence:** `createReference` hashes `submissionId` and keeps **8 hex chars** (`USJR-` + 4 bytes) in `lib/quote-server.ts`.

- **Impact:** With C2, references are guessable enough for opportunistic photo attachment / social engineering (“reply about USJR-…”) over time. Not a cryptographic auth secret today, but treated like one by the photo API.

- **Suggested fix:** Longer random references (128-bit+) and/or separate upload capability tokens.

### M7. Dependency advisory: `nanoid` &lt; 3.3.18 (high)

- **Evidence:** `npm audit --omit=dev` on the lockfile reports GHSA-2v37-7h3g-55p8 via transitive `nanoid`.

- **Impact:** Supply-chain / DoS class issue in a transitive package; severity depends on whether the vulnerable API is reachable in this app’s usage (often low practical exploitability, still should be cleared).

- **Suggested fix:** Bump via `npm audit fix` / lockfile refresh; add Dependabot or similar.

### M8. CI can (and does) perform live production MCP submits

- **Evidence:** `.github/workflows/mcp-production-smoke.yml` hits `https://unclesamjunkremoval.com/api/mcp` and, outside PR guard-only mode, submits real `submitQuoteRequest` traffic to production with business phone/email. Browser smoke workflow similarly can live-submit.

- **Impact:** Noise in the real lead inbox; accidental scheduling confusion; demonstrates that production writes are reachable without deploy-time secrets (reinforces H1).

- **Suggested fix:** Point smoke at a protected preview with test Resend project, or require a staging flag that disables outbound email.

---

## Low

### L1. No committed production secrets found (positive) — keep hygiene

- **Evidence:** `.gitignore` ignores `.env*`; only `.env.example` placeholders; tests use `re_test` / `whsec_test`. Tree scan found no `ghp_` / `github_pat_` / live `re_` / `whsec_` secrets. Webhook verification fails closed without `RESEND_WEBHOOK_SECRET` (`verifyWebhook`).

- **Impact:** N/A (good). Residual risk is env misconfiguration on Vercel and the burned chat PAT (rotate).

- **Suggested fix:** Confirm Vercel env scoping (Production/Preview/Development); enable secret scanning alerts on the GitHub repo; revoke the pasted PAT.

### L2. ChatGPT auth helpers trust platform identity headers

- **Evidence:** `app/chatgpt-auth.ts` reads `oai-authenticated-user-email` / full-name headers. `return_to` is safely constrained to same-origin relative paths (good open-redirect hygiene). Helpers do not appear wired into the public marketing pages.

- **Impact:** Low on current public site; if reused on Vercel without the OpenAI dispatch header injector, clients could spoof identity headers unless the edge strips them.

- **Suggested fix:** Only enable SIWC routes behind the Sites dispatcher; strip `oai-*` headers at Vercel if unused.

### L3. Accessibility & UX — solid baseline with polish gaps

- **Evidence:** Skip link, `main` landmark, many `aria-*` attributes, `aria-invalid`, honeypot, `prefers-reduced-motion` rules in `app/globals.css`. Homepage HTML shows only one `alt=` occurrence in a large page; hero/content images may be under-described relative to decorative vs informative needs.

- **Impact:** Generally usable; residual risk of incomplete image text alternatives and a very large client quote form (`quote-section.tsx` ~1783 lines) that is harder to QA for a11y regressions.

- **Suggested fix:** Audit image alts; break the quote UI into smaller components; run axe/Lighthouse a11y on key routes.

### L4. Performance / structure

- **Evidence:** Monolithic client quote section + multiple WebMCP client components mounted globally in `app/layout.tsx`. Hero asset `public/hero-junk-v3.webp` is modest (~46 KB). Good for LCP vs heavy carousels, but global client bridges add JS on every page.

- **Impact:** Extra JS on legal/service pages that may not need WebMCP; maintenance cost.

- **Suggested fix:** Load WebMCP bridges only where needed; code-split the quote form; consider React Server Components for static marketing chrome.

### L5. SEO — generally strong; minor drift

- **Evidence:** LocalBusiness + FAQ JSON-LD on home; `sitemap.ts` / `robots.ts` disallow `/api/`; canonical metadata; `www` → apex redirect in `next.config.ts`. Sitemap `lastmod` values appear stuck at `2026-07-29`. Meta `keywords` still present (mostly ignored by Google). Production metadata includes `codex-preview: development` (`app/layout.tsx`).

- **Impact:** Minor crawl/quality signals; confusing “development” preview meta on production.

- **Suggested fix:** Drop or gate `codex-preview`; refresh `lastmod`; ensure only canonical host is indexed (related to H4).

### L6. Permissions-Policy allows `camera=(self)` without camera use

- **Evidence:** `next.config.ts` / `worker/index.ts`; no `getUserMedia` usage found. Quote photos use file input, not camera APIs.

- **Impact:** Unnecessary permission surface.

- **Suggested fix:** Set `camera=()`.

### L7. README / starter drift and example D1 notes API

- **Evidence:** README still describes vinext-starter / Sites lifecycle. `examples/d1/app/api/notes/route.ts` is an unauthenticated notes CRUD example (not mounted as the live Next `app/` tree, but present in-repo and included in `tsconfig` patterns).

- **Impact:** Onboarding confusion; risk someone copies the example into production routes without auth.

- **Suggested fix:** Rewrite README for the real dual-host setup; keep examples clearly non-deployed or delete if unused.

---

## Positive controls observed

- Disallowed browser `Origin` on `/api/quote` returns 403 (verified).
- Resend webhook signature + timestamp window verification (`handleResendWebhook` / `verifyWebhook`); unsigned webhooks rejected in tests and code path.
- HTML email bodies escape user fields (`escapeHtml`); subject newlines stripped (`safeSubject`); filenames sanitized (`safeFilename`).
- Honeypot `company` field short-circuits bots that fill it.
- Service/urgency/placement enums validated server-side.
- Production `/api/mcp/self-test` returns 404 when `NODE_ENV=production` and not a Vercel preview.
- Security headers present on Vercel responses: CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, HSTS (platform +/or config).
- Preview deployments: Vercel SSO protection enabled for `all_except_custom_domains`.
- `chatgpt-auth` return URL open-redirect hardening.
- Robots disallow `/api/` for major AI/search crawlers.

---

## Suggested remediation order

1. **C1 + C2 + H3:** Harden quote/photo write APIs (Origin/CSRF/captcha + bound upload tokens + MIME sniffing).
2. **H1 + H2 + M8:** Authenticate or isolate MCP writes; durable rate limits; stop live production email in CI.
3. **H4 + M4 + M1/M2/M3:** Clean domains, unify deploy/header config, tighten CSP/CORS.
4. **M5–M7 + Lows:** PII retention design, longer references, dependency bumps, README/a11y/perf polish.

---

## Out of scope / not found

- No admin/login/dashboard surface in the live App Router tree.
- No classic open redirect in `legacy-redirects.ts` (fixed internal paths only); www host redirect is explicit.
- No payment-card collection on the quote form (per privacy copy and code).
- No evidence of committed Resend live keys or GitHub PATs in the repository snapshot audited.
