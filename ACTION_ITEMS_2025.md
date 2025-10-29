# Action Items - January 2025 Audit

Quick reference for priority tasks identified in the comprehensive codebase audit.

## 🔴 High Priority (1-2 weeks)

### 1. Add Error Boundaries
**Impact:** Prevents entire app crashes
**Effort:** Low (1-2 hours)

Create these files:
- `app/error.tsx` - Route-level error boundary
- `app/global-error.tsx` - App-level error boundary

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground mt-2">{error.message}</p>
      <button onClick={reset} className="mt-4">Try again</button>
    </div>
  )
}
```

---

### 2. Expand Test Coverage
**Impact:** Reduces bugs, improves confidence
**Effort:** High (ongoing)

Priority test targets:
1. ✅ API route: `app/api/quote/route.ts` (critical path)
2. ✅ Quote form validation
3. ✅ Template components (ServicePageTemplate, LocationPageTemplate)
4. ✅ Form components (quote-form-modal, two-step-quote-form)

**Goal:** 70%+ coverage

---

### 3. Add .env.example File
**Impact:** Improves developer onboarding
**Effort:** Low (15 minutes)

```env
# .env.example

# Required
NEXT_PUBLIC_SITE_URL=https://unclesamjunkremoval.com
RESEND_API_KEY=your_resend_api_key_here

# Optional
NEXT_PUBLIC_AHREFS_KEY=your_ahrefs_key_here
```

---

### 4. Fix Console.log Statement
**Impact:** Clean production logs
**Effort:** Low (5 minutes)

File: `components/rotating-location.tsx:74`

Change:
```typescript
console.log('Could not detect location, using default')
```

To:
```typescript
if (process.env.NODE_ENV !== 'production') {
  console.log('Could not detect location, using default')
}
```

---

## 🟡 Medium Priority (1 month)

### 5. Add Loading States
**Impact:** Better UX during async operations
**Effort:** Medium (2-3 hours)

Create:
- `app/loading.tsx` - Root loading state
- `app/services/loading.tsx` - Services loading state
- `app/blog/loading.tsx` - Blog loading state

```typescript
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  )
}
```

---

### 6. Implement CSP Headers
**Impact:** Enhanced XSS protection
**Effort:** Medium (1-2 hours)

Add to `next.config.mjs`:

```javascript
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.clarity.ms *.ahrefs.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' *.google-analytics.com *.clarity.ms"
  ].join('; ')
}
```

**Note:** Test thoroughly with all analytics scripts!

---

### 7. Accessibility Improvements
**Impact:** Better for all users, legal compliance
**Effort:** Low-Medium (2-3 hours)

Tasks:
1. Add skip-to-content link
2. Verify color contrast (use axe DevTools)
3. Test with screen readers
4. Add focus-visible styles

```typescript
// app/layout.tsx - add after <body>
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4">
  Skip to main content
</a>
```

---

### 8. Upgrade Rate Limiting
**Impact:** More reliable spam protection
**Effort:** Medium (3-4 hours)

Consider:
- Upstash Redis (serverless)
- Vercel KV
- Rate limiting middleware

Current limitation: In-memory rate limiting resets on server restart

---

## 🟢 Low Priority (3 months)

### 9. Add Dependabot
**Impact:** Automated dependency updates
**Effort:** Low (30 minutes)

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

---

### 10. Performance Monitoring
**Impact:** Better insights into production performance
**Effort:** Medium (2-3 hours)

Add middleware:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const start = Date.now()
  const response = NextResponse.next()
  const duration = Date.now() - start

  response.headers.set('X-Response-Time', `${duration}ms`)

  // Log slow requests
  if (duration > 1000 && process.env.NODE_ENV === 'production') {
    console.warn(`Slow request: ${request.url} took ${duration}ms`)
  }

  return response
}
```

---

### 11. Enhanced Documentation
**Impact:** Better contributor experience
**Effort:** Medium (4-6 hours)

Tasks:
1. Document API endpoint in detail
2. Create CONTRIBUTING.md
3. Add JSDoc comments to complex functions
4. Consider Storybook for component docs

---

## Quick Wins (< 1 hour each)

- [x] Fix console.log in rotating-location.tsx
- [ ] Add .env.example file
- [ ] Add skip-to-content link
- [ ] Create basic error boundaries
- [ ] Add root loading.tsx
- [ ] Set up Dependabot

---

## Testing Priorities

### Immediate (This Week)
1. API route tests for quote submission
2. Form validation tests
3. Zod schema tests

### Next Week
1. ServicePageTemplate tests
2. LocationPageTemplate tests
3. Quote form component tests

### This Month
1. Integration tests for user flows
2. SEO metadata generation tests
3. Component interaction tests

---

## Monitoring & Alerts

Consider setting up:
1. **Sentry** - Error tracking and monitoring
2. **LogRocket** - Session replay for debugging
3. **Vercel Analytics** - Already installed, monitor Core Web Vitals
4. **Uptime monitoring** - Pingdom, UptimeRobot, or similar

---

## Security Maintenance

Regular tasks:
- [ ] Review dependencies monthly (`pnpm audit`)
- [ ] Update security headers as needed
- [ ] Review rate limiting effectiveness
- [ ] Check for new security best practices
- [ ] Monitor error logs for suspicious activity

---

## Performance Maintenance

Regular tasks:
- [ ] Run `pnpm analyze` monthly
- [ ] Monitor Core Web Vitals in Vercel
- [ ] Check bundle size trends
- [ ] Review and optimize heavy components
- [ ] Test on slower connections/devices

---

## Progress Tracking

Use this checklist to track completion:

### Week 1
- [ ] Add error boundaries (app/error.tsx, app/global-error.tsx)
- [ ] Fix console.log in rotating-location.tsx
- [ ] Add .env.example file
- [ ] Write API route tests

### Week 2
- [ ] Write form validation tests
- [ ] Add loading states (app/loading.tsx)
- [ ] Add skip-to-content link

### Month 1
- [ ] Achieve 70%+ test coverage for critical paths
- [ ] Implement CSP headers
- [ ] Complete accessibility audit
- [ ] Test with screen readers

### Month 2-3
- [ ] Set up Dependabot
- [ ] Implement performance monitoring middleware
- [ ] Consider rate limiting upgrade
- [ ] Enhance documentation

---

**Last Updated:** January 29, 2025
**Next Review:** February 12, 2025 (2 weeks)
