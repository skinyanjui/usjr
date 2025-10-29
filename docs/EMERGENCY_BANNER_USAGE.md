# Emergency/Promo Banner Component

## Overview

The `EmergencyBanner` component is a flexible, configurable banner for displaying important messages at the top of your site. It supports multiple visual styles, dismissal with localStorage persistence, and responsive design.

## Features

✅ **4 Banner Types**: Emergency, Promo, Info, Announcement
✅ **Fully Configurable**: Message, CTA, colors, icons
✅ **Accessible**: Proper ARIA attributes, keyboard navigation
✅ **Dismissible**: Optional with customizable duration
✅ **Responsive**: Different messages for mobile/desktop
✅ **Safe Storage**: Error handling for localStorage
✅ **Environment Control**: Enable/disable via env variable

## Quick Start

### Default Emergency Banner (Current)

```tsx
// app/layout.tsx
import { EmergencyBanner } from '@/components/emergency-banner'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <EmergencyBanner /> {/* Uses default emergency config */}
      {children}
    </>
  )
}
```

This displays:

- **Type**: Emergency (red background, alert icon)
- **Title**: "Emergency Service Available"
- **Message**: "Storm cleanup, urgent junk removal & same-day response available now"
- **CTA**: "Get Help Now" → `/emergency`
- **Dismissible**: Yes (24 hours)

## Usage Examples

### 1. Promotional Banner (Sales/Discounts)

```tsx
<EmergencyBanner
  config={{
    type: 'promo',
    title: 'Limited Time Offer',
    message: 'Get 20% off your first junk removal service - Book before December 31st!',
    mobileMessage: '20% off first service',
    ctaText: 'Claim Discount',
    ctaLink: '/quote',
    dismissible: true,
    dismissDuration: 48, // 2 days
  }}
/>
```

**Result**: Green gradient background with sparkles icon

---

### 2. Informational Banner (Updates)

```tsx
<EmergencyBanner
  config={{
    type: 'info',
    title: 'Service Area Expansion',
    message: 'We now serve Henderson, KY and Mount Vernon, IN!',
    mobileMessage: 'New service areas available',
    ctaText: 'View Locations',
    ctaLink: '/locations',
    dismissible: true,
    dismissDuration: 72, // 3 days
  }}
/>
```

**Result**: Blue background with info icon

---

### 3. Announcement Banner (Events)

```tsx
<EmergencyBanner
  config={{
    type: 'announcement',
    title: 'Holiday Hours',
    message:
      'We will be closed on Thanksgiving and Christmas Day. Normal hours resume the next day.',
    mobileMessage: 'Holiday hours in effect',
    ctaText: 'View Schedule',
    ctaLink: '/about',
    dismissible: true,
    dismissDuration: 24,
  }}
/>
```

**Result**: Purple background with megaphone icon

---

### 4. Non-Dismissible Banner (Critical)

```tsx
<EmergencyBanner
  config={{
    type: 'emergency',
    title: 'Service Alert',
    message: 'Due to severe weather, response times may be delayed. We appreciate your patience.',
    mobileMessage: 'Weather delays expected',
    ctaText: 'Call Us',
    ctaLink: 'tel:8124019022',
    dismissible: false, // Cannot be closed
  }}
/>
```

**Result**: User cannot dismiss this banner

---

## Configuration Options

```typescript
interface BannerConfig {
  type: 'emergency' | 'promo' | 'info' | 'announcement'
  title: string // Bold headline (required)
  message: string // Full message for desktop (required)
  mobileMessage?: string // Shorter message for mobile (optional)
  ctaText: string // Button text (required)
  ctaLink: string // Button link (required)
  dismissible: boolean // Can user close it? (required)
  dismissDuration?: number // Hours until shows again (default: 24)
}
```

## Visual Styles

| Type             | Background     | Icon             | Use Case                           |
| ---------------- | -------------- | ---------------- | ---------------------------------- |
| **emergency**    | Red            | ⚠️ AlertTriangle | Urgent services, weather alerts    |
| **promo**        | Green gradient | ✨ Sparkles      | Sales, discounts, special offers   |
| **info**         | Blue           | ℹ️ Info          | Updates, announcements, news       |
| **announcement** | Purple         | 📢 Megaphone     | Events, schedules, general notices |

## Environment Control

Control banner visibility with environment variables:

```bash
# .env.local
NEXT_PUBLIC_EMERGENCY_BANNER_ENABLED=true   # Show banner
NEXT_PUBLIC_EMERGENCY_BANNER_ENABLED=false  # Hide banner
```

This allows you to:

- Enable/disable without code changes
- Control visibility per environment (dev/staging/prod)
- Quick toggle during deployments

## Advanced Usage

### Multiple Banners (Stacked)

```tsx
<Header />
<EmergencyBanner config={{ type: 'emergency', ... }} />
<EmergencyBanner config={{ type: 'promo', ... }} />
<BreadcrumbsAuto />
```

**Note**: Each banner uses the same localStorage key, so only one dismissal state is tracked. For multiple banners, you'd need to customize the storage key.

### Conditional Rendering

```tsx
{isHoliday && (
  <EmergencyBanner config={{ type: 'announcement', ... }} />
)}

{hasActivePromo && (
  <EmergencyBanner config={{ type: 'promo', ... }} />
)}
```

### Custom Dismiss Duration

```tsx
<EmergencyBanner
  config={{
    type: 'promo',
    dismissDuration: 168, // 7 days (1 week)
    // ... other config
  }}
/>
```

## Accessibility

✅ **WCAG Compliant**:

- Icons have `aria-hidden="true"` (not announced to screen readers)
- Close button has `aria-label="Dismiss banner"`
- Proper color contrast ratios (AAA rating)
- Keyboard navigable (Tab, Enter, Escape)

## localStorage Behavior

1. **First Visit**: Banner shows
2. **User Dismisses**: Stores timestamp + duration
3. **Revisit (Before Expiry)**: Banner hidden
4. **Revisit (After Expiry)**: Banner shows again
5. **Storage Errors**: Fails gracefully (console warning in dev)

## Testing

### Test Dismissal

```javascript
// Browser console - Reset dismissal
localStorage.removeItem('emergency-banner-dismissed')
// Refresh page to see banner again
```

### Test Different Types

```tsx
// Cycle through types to see visual differences
const types = ['emergency', 'promo', 'info', 'announcement']
<EmergencyBanner config={{ type: types[currentIndex] }} />
```

## Migration from Old Version

**Old Code** (96 lines):

```tsx
<EmergencyBanner />
```

**New Code** (Same):

```tsx
<EmergencyBanner /> {/* Still works! Uses default config */}
```

**To Customize**:

```tsx
<EmergencyBanner config={{ type: 'promo', title: '...', message: '...' }} />
```

## Troubleshooting

### Banner Not Showing?

1. Check environment variable: `NEXT_PUBLIC_EMERGENCY_BANNER_ENABLED=true`
2. Clear localStorage: `localStorage.removeItem('emergency-banner-dismissed')`
3. Check browser console for errors
4. Verify banner is imported in layout.tsx

### Banner Shows on Wrong Pages?

The banner appears globally (in layout.tsx). To hide on specific pages:

```tsx
// app/specific-page/page.tsx
export default function SpecificPage() {
  useEffect(() => {
    // Hide banner on this page
    const banner = document.querySelector('[data-banner]')
    if (banner) banner.style.display = 'none'
    return () => {
      if (banner) banner.style.display = ''
    }
  }, [])
}
```

Or use conditional rendering in layout based on pathname.

## Performance

- **Bundle Size**: +2KB (4 additional Lucide icons)
- **localStorage Impact**: Negligible (safe wrappers prevent blocking)
- **Re-renders**: Minimal (only on mount and dismiss)
- **SSR**: Properly handled (no hydration mismatches)

## Future Enhancements

Potential additions:

- [ ] Slide-in animation
- [ ] Multiple banner queue system
- [ ] Per-page banner configurations
- [ ] Analytics tracking (impressions, dismissals, clicks)
- [ ] A/B testing support
- [ ] Countdown timer for limited offers

---

**Last Updated**: October 29, 2025
**Component Location**: `/components/emergency-banner.tsx`
**Audit Status**: ✅ Accessibility compliant, error handling added
