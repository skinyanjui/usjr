# GitHub Copilot Instructions for Uncle Sam Junk Removal

## Project Overview

This is a comprehensive Next.js website for Uncle Sam Junk Removal, featuring both junk removal and professional cleaning services in Evansville, IN and surrounding areas. The project uses Next.js 15.5.2 with the App Router, TypeScript, Tailwind CSS, and shadcn/ui components.

## Technology Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS 4.x with custom configuration
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: lucide-react
- **Package Manager**: pnpm 10.1.0
- **Testing**: Jest with React Testing Library
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Project Architecture

### Component System

The application uses a modular component architecture with reusable UI components organized into three tiers:

1. **Core Components** (`components/ui/`):
   - ServiceCard, ThemedButton, GlassCard, IconContainer
   - SectionHeader, ContactInfo, PricingCard
   - All support a 6-color theme system (red, orange, green, blue, purple, teal)

2. **Template Components**:
   - `ServicePageTemplate`: Complete service page layout
   - `LocationPageTemplate`: Standardized location pages
   - `FAQSection`: Reusable FAQ component

3. **Quote Form Components**:
   - `useQuoteForm`: Custom hook for form state management
   - `QuoteSuccessMessage`, `ContactFields`, `PhotoUpload`

### Directory Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and CMS content management
- `/styles` - Global styles and Tailwind configuration
- `/__tests__` - Jest tests organized by feature
- `/docs` - Documentation including COMPONENTS.md

### Content Management

Content is managed through `lib/cms-content.ts`:

- Services array (pricing, descriptions, status)
- FAQs categorized by topic
- Locations with service areas
- Business settings (phone, hours, social media)

## Coding Standards

### TypeScript

- **Always use strict TypeScript** with proper type definitions
- Enable all strict compiler options (already configured in tsconfig.json)
- Use explicit types for function parameters and return values
- Avoid `any` type; use `unknown` if type is truly unknown
- Use optional chaining (`?.`) and nullish coalescing (`??`) appropriately

### React/Next.js Conventions

- **Use functional components** with React hooks
- Prefer server components by default; use `"use client"` only when necessary
- Use Next.js Image component for images (not raw `<img>`)
- Follow the established file naming convention: kebab-case for files
- Component names should be PascalCase
- Use the App Router patterns (not Pages Router)

### Component Development

- **Always use existing reusable components** before creating new ones
- Support the 6-color theme system: red, orange, green, blue, purple, teal
- Include proper TypeScript interfaces for all props
- Follow accessibility best practices (ARIA labels, semantic HTML)
- Use responsive design patterns with Tailwind breakpoints (sm, md, lg, xl, 2xl)
- Prefer template components for service and location pages

### Styling

- **Use Tailwind CSS utility classes** exclusively (no custom CSS unless absolutely necessary)
- Follow the established color system from Tailwind config
- Use glassmorphic design patterns where appropriate
- Ensure responsive design for all screen sizes
- Use Tailwind's animation utilities from tw-animate-css

### File Organization

- Place reusable UI components in `components/ui/`
- Export components from `components/ui/index.ts` for easy imports
- Keep page-specific components within the page directory
- Store utilities in `lib/` directory
- Tests should mirror the structure of source files in `__tests__/`

## Development Workflow

### Setup and Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

### Code Quality

**Before committing:**

1. Run linter: `pnpm lint` or `pnpm lint:fix`
2. Format code: `pnpm format`
3. Run tests: `pnpm test`

**Pre-commit hooks are configured** to automatically:

- Format code with Prettier
- Lint code with ESLint
- Run on staged files only

### Testing

- Use Jest with React Testing Library
- Place tests in `__tests__/` directory mirroring source structure
- Test file naming: `[component-name].test.tsx` or `[feature].test.ts`
- Write focused unit tests for components and utilities
- Follow existing test patterns in the repository

Example test structure:

```tsx
import { render, screen } from '@testing-library/react'
import { ComponentName } from '@/components/ui/component-name'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### Performance Considerations

- Avoid forced synchronous layouts (ESLint will warn about offsetWidth, getBoundingClientRect, etc.)
- Use batch DOM reads via requestAnimationFrame or ResizeObserver
- Lazy load components when appropriate
- Optimize images using Next.js Image component
- Monitor bundle size with `pnpm analyze`

## Common Patterns and Guidelines

### Creating Service Pages

Use `ServicePageTemplate` for consistency:

```tsx
import { ServicePageTemplate } from "@/components/ui/service-page-template"

<ServicePageTemplate
  title="Service Name"
  description="Service description"
  theme="blue"
  features={[...]}
  steps={[...]}
  pricing={[...]}
  faqs={[...]}
/>
```

### Creating Location Pages

Use `LocationPageTemplate`:

```tsx
import { LocationPageTemplate } from "@/components/ui/location-page-template"

<LocationPageTemplate
  locationName="City Name"
  state="Indiana"
  theme="red"
  features={[...]}
  landmarks={[...]}
  neighborhoods={[...]}
/>
```

### Using Themed Components

All themed components accept a `theme` prop with color options:

```tsx
<ThemedButton theme="red" variant="outline">
  Click Me
</ThemedButton>

<ServiceCard
  title="Service"
  color="blue"
  icon={IconComponent}
/>
```

### Form Handling

Use the shared quote form hook:

```tsx
import { useQuoteForm, ContactFields, PhotoUpload } from '@/components/ui/quote-form-shared'

const { formData, setFormData, uploadedFiles, handleFileUpload, removeFile, handleSubmit } =
  useQuoteForm()
```

## SEO and Accessibility

### SEO Requirements

- Include proper meta tags and Open Graph data
- Add JSON-LD structured data for local business
- Use semantic HTML5 elements
- Include descriptive alt text for all images
- Optimize page titles and descriptions for local search

### Accessibility

- Use semantic HTML (header, nav, main, footer, article, etc.)
- Include ARIA labels where appropriate
- Ensure keyboard navigation works correctly
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Test with screen readers
- Follow WCAG AA standards

## Security Best Practices

- Never commit sensitive data or API keys
- Use environment variables for configuration
- Security headers are automatically applied via Next.js config
- Validate and sanitize all user inputs
- Use HTTPS for all external resources

## Documentation

### When Adding New Features

1. Update relevant documentation in `/docs` if adding complex features
2. Add JSDoc comments to exported functions and components
3. Update README.md if adding new scripts or major features
4. Document any new environment variables

### Code Comments

- Write self-documenting code with clear variable/function names
- Add comments only when code intent is not obvious
- Document complex algorithms or business logic
- Explain "why" rather than "what" in comments

## Common Tasks

### Adding a New Service

1. Edit `lib/cms-content.ts`
2. Add service to `services` array with all required fields
3. Set `active: true` to enable
4. Create dedicated page using `ServicePageTemplate` if needed

### Adding a New Location

1. Edit `lib/cms-content.ts`
2. Add location to `locations` array
3. Create page using `LocationPageTemplate`
4. Include local landmarks and neighborhoods

### Creating a New Reusable Component

1. Create in `components/ui/[component-name].tsx`
2. Include TypeScript interface for props
3. Support theme system if applicable
4. Export from `components/ui/index.ts`
5. Document in `docs/COMPONENTS.md`
6. Add tests in `__tests__/components/ui/`

## Troubleshooting

### Build Issues

- Run `pnpm install` to ensure dependencies are up to date
- Clear `.next` directory and rebuild: `rm -rf .next && pnpm build`
- Check for TypeScript errors: `pnpm build` will surface type issues

### Test Issues

- Run tests in watch mode: `pnpm test:watch`
- Clear Jest cache if tests fail unexpectedly: `pnpm test --clearCache`
- Ensure test files follow naming convention: `*.test.tsx` or `*.test.ts`

### Linting Issues

- Auto-fix when possible: `pnpm lint:fix`
- Format code: `pnpm format`
- Check Prettier issues: `pnpm format:check`

## Additional Resources

- Next.js App Router: https://nextjs.org/docs/app
- shadcn/ui Components: https://ui.shadcn.com/
- Tailwind CSS: https://tailwindcss.com/docs
- Project Components: See `/docs/COMPONENTS.md`

## Notes for AI Assistants

- **Prefer using existing components** rather than creating new ones
- **Follow the template pattern** for service and location pages
- **Maintain consistency** with the established 6-color theme system
- **Test thoroughly** before marking tasks as complete
- **Keep changes minimal** and focused on the specific task
- **Document any breaking changes** or new patterns introduced
