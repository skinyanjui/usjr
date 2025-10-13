# Uncle Sam Junk Removal Website

A comprehensive Next.js website for Uncle Sam Junk Removal, featuring both junk removal and professional cleaning services in Evansville, IN and surrounding areas.

## Features

### Services

- **Junk Removal**: Residential and commercial junk removal with transparent pricing
- **Light Demolition**: Shed, deck, and small structure tear-down with debris hauling included
- **Residential Cleaning**: Deep cleaning, recurring service, move-in/out, specialty cleaning
- **Commercial Cleaning**: Office, retail, medical, and restaurant cleaning with after-hours service

### Key Components

- Responsive design with glassmorphic elements
- Two-step quote form with photo upload
- Comprehensive service pages with FAQs
- Location-specific pages for local SEO
- Blog section with seed content
- Before/after gallery with lightbox
- Customer testimonials slider
- CMS-like content management system
- **Reusable UI component library** for consistent design patterns
- **Template components** for rapid page development with 40-70% code reduction
- Includes `LocationPageTemplate`, `FAQSection`, and shared quote form utilities

### Technical Features

- Next.js 15.5.2 with App Router (latest secure version)
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui component library
- **Custom reusable component system** with theme support
- **Template-based architecture** for service and location pages
- **Shared form logic** with custom hooks for quote forms
- Comprehensive SEO optimization
- JSON-LD structured data
- Responsive images and lazy loading
- Accessibility compliance (WCAG AA)
- **Security headers** (X-Frame-Options, CSP, etc.)
- **Bundle analyzer** for performance monitoring
- **Testing infrastructure** with Jest and React Testing Library
- **Code quality tools** (Prettier, ESLint, Husky, lint-staged)

## Architecture

### Component System

The application uses a modular component architecture with reusable UI components:

#### Core Components

- **ServiceCard**: Standardized service display cards with color theming
- **ThemedButton**: Consistent button styling across color themes
- **GlassCard**: Glassmorphic card components with variants
- **IconContainer**: Standardized icon display containers
- **SectionHeader**: Consistent section headers with optional subtitles
- **ContactInfo**: Reusable contact information display
- **PricingCard**: Standardized pricing display cards

#### Template Components (New)

- **ServicePageTemplate**: Complete service page layout with hero, features, steps, pricing, and FAQ sections
- **LocationPageTemplate**: Standardized location pages with local information and service areas
- **FAQSection**: Reusable FAQ component for consistent question/answer displays

#### Quote Form Components (New)

- **useQuoteForm**: Custom hook managing all quote form state and logic
- **QuoteSuccessMessage**: Standardized success message for form submissions
- **ContactFields**: Reusable contact information fields
- **PhotoUpload**: Photo upload component with drag-and-drop and mobile camera support

See `docs/COMPONENTS.md` for detailed component documentation.

### Color System

The application uses a consistent 6-color theme system:

- **Red**: Primary brand color for junk removal services
- **Orange**: Light demolition services
- **Green**: Cleaning services
- **Blue**: General business/commercial elements
- **Purple**: Location-specific branding (Owensboro)
- **Teal**: Location-specific branding (Princeton)

### Refactoring Benefits

The new template and shared components provide significant improvements:

#### Code Reduction

- **Service pages**: ~70% code reduction using ServicePageTemplate
- **Location pages**: ~60% code reduction using LocationPageTemplate
- **Quote forms**: ~50% code reduction using shared hooks and components
- **FAQ sections**: ~40% code reduction using FAQSection component

#### Consistency & Maintainability

- Standardized layouts across all service and location pages
- Consistent theming and color application throughout the site
- Single source of truth for page templates and form logic
- Easy global updates by modifying template components
- Reduced risk of inconsistencies across pages

## Content Management

### Editing Services

Services are managed in `lib/cms-content.ts`. To add or edit services:

1. Open `lib/cms-content.ts`
2. Modify the `services` array
3. Set `active: true` to enable a service
4. Update pricing, descriptions, and included items as needed

### Managing FAQs

FAQs are categorized and can be edited in the same file:

1. Find the `faqs` array in `lib/cms-content.ts`
2. Add new FAQs with appropriate categories
3. Set `active: true` to display them

### Location Management

Service areas are managed in the `locations` array:

1. Add new locations with zip codes and landmarks
2. Include local SEO keywords in landmarks
3. Set `active: true` to enable location pages

### Settings Configuration

Business settings are in the `settings` object:

1. **Phone**: Update the main business phone number
2. **Square Booking URL**: Replace placeholder with actual Square booking link
3. **Service Areas**: Add or remove service locations
4. **Business Hours**: Update operating hours
5. **Social Media**: Add social media profile URLs

## Development Guidelines

### Using Template Components

For new service pages, use the ServicePageTemplate:

\`\`\`tsx
import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Phone, Camera, Truck, Recycle } from 'lucide-react'

<ServicePageTemplate
title="Service Name in Evansville"
description="Professional service description"
theme="blue"
features={[
{
icon: Phone,
title: "Feature Title",
description: "Feature description"
}
]}
steps={[
{
icon: Phone,
title: "Step Title",
description: "Step description"
}
]}
pricing={[
{
name: "Service Tier",
price: "From $199-299"
}
]}
faqs={[
{
question: "Common question?",
answer: "Detailed answer..."
}
]}
/>
\`\`\`

### Using Location Templates

For new location pages, use the LocationPageTemplate:

\`\`\`tsx
import { LocationPageTemplate } from "@/components/ui/location-page-template"
import { Clock, Truck, Recycle } from 'lucide-react'

<LocationPageTemplate
locationName="City Name"
state="Indiana"
tagline="Local service tagline"
theme="red"
features={[
{
icon: Clock,
title: "Local Feature",
description: "Local benefit description"
}
]}
landmarks={["Local Landmark 1", "Local Landmark 2"]}
neighborhoods={["Neighborhood 1", "Neighborhood 2"]}
/>
\`\`\`

### Component Usage

When creating new features, always use the existing reusable components:

\`\`\`tsx
// Use ServiceCard for service displays
<ServiceCard
title="Service Name"
description="Service description"
color="red"
icon={ServiceIcon}
// ... other props
/>

// Use ThemedButton for consistent styling
<ThemedButton theme="red" variant="outline">
Button Text
</ThemedButton>

// Use shared quote form logic
import { useQuoteForm, ContactFields, PhotoUpload } from "@/components/ui/quote-form-shared"

function MyQuoteForm() {
const {
formData,
setFormData,
uploadedFiles,
handleFileUpload,
removeFile,
handleSubmit
} = useQuoteForm()

return (

<form onSubmit={handleSubmit}>
<ContactFields formData={formData} setFormData={setFormData} />
<PhotoUpload 
        uploadedFiles={uploadedFiles}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
      />
</form>
)
}
\`\`\`

### Adding New Components

When creating new reusable components:

1. Place in `components/ui/` directory
2. Follow existing naming conventions
3. Support the 6-color theme system
4. Include TypeScript interfaces
5. Add to component documentation
6. Export from `components/ui/index.ts`

### Code Standards

- Use TypeScript for all components
- Follow existing naming conventions (kebab-case for files)
- Include proper accessibility attributes
- Support responsive design patterns
- Use the established color system
- Prefer template components over custom implementations
- Use shared hooks and utilities to avoid code duplication

## Development Tools

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run Jest in watch mode
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm analyze` - Analyze bundle size with webpack-bundle-analyzer

### Code Quality Tools

- **ESLint**: Configured with Next.js rules and custom performance warnings
- **Prettier**: Automated code formatting with Tailwind CSS class sorting
- **Husky**: Git hooks for pre-commit quality checks
- **lint-staged**: Run linting and formatting on staged files only
- **Jest**: Unit testing framework with React Testing Library
- **Bundle Analyzer**: Performance monitoring and dependency analysis

### Testing

Basic testing setup is configured with Jest and React Testing Library. Example:

\`\`\`tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

test('renders button with text', () => {
render(<Button>Click me</Button>)
expect(screen.getByRole('button')).toBeInTheDocument()
})
\`\`\`

### Security Features

- **Security Headers**: Automatically applied to all routes
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=()
- **Dependency Management**: Standardized on pnpm for security and performance
- **Bundle Analysis**: Regular monitoring of dependencies for security vulnerabilities

## Environment Variables

### Required Variables

\`\`\`env
SQUARE_BOOKING_URL=https://square.site/book/YOUR_BOOKING_URL
NEXT_PUBLIC_SITE_URL=https://unclesamjunkremoval.com
\`\`\`

### Optional Variables

\`\`\`env
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=XXXXXXXXXX
RECAPTCHA_SITE_KEY=XXXXXXXXXX
RECAPTCHA_SECRET_KEY=XXXXXXXXXX
\`\`\`

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Custom Domain Setup

1. Add your domain in Vercel dashboard
2. Update DNS records as instructed
3. SSL certificate will be automatically provisioned

## SEO Optimization

### Local SEO Features

- Location-specific pages with local keywords
- Google My Business schema markup
- Local business structured data
- Service area optimization
- Customer reviews and ratings

### Technical SEO

- Comprehensive sitemap generation
- Robots.txt configuration
- Meta tags and descriptions
- Open Graph and Twitter Card tags
- Page speed optimization
- Mobile-first responsive design

## Migration Guide

### Converting Existing Pages

To convert existing service pages to use templates:

1. **Service Pages**: Replace custom implementation with ServicePageTemplate
2. **Location Pages**: Replace custom implementation with LocationPageTemplate
3. **Quote Forms**: Replace custom form logic with useQuoteForm hook and shared components
4. **FAQ Sections**: Replace custom FAQ implementations with FAQSection component

See `docs/COMPONENTS.md` for detailed migration instructions.

## Maintenance

### Regular Updates

1. **Content**: Update testimonials and gallery images monthly
2. **Services**: Review pricing and service descriptions quarterly
3. **SEO**: Monitor and update local keywords as needed
4. **Blog**: Add new blog posts regularly for content freshness
5. **Components**: Review and update reusable components as needed
6. **Templates**: Update template components to benefit all pages using them

### Performance Monitoring

- Monitor Core Web Vitals
- Check mobile usability
- Review search console for errors
- Update structured data as needed
- Audit component usage for consistency
- Monitor bundle size with new component additions
- Use `pnpm analyze` to analyze bundle size and dependencies

### Code Quality

- Use template components for new pages to maintain consistency
- Regularly audit for code duplication opportunities
- Update shared components to benefit entire application
- Follow established patterns for new feature development
- Run `pnpm test` before committing changes
- Use `pnpm format` to ensure consistent code formatting
- Pre-commit hooks automatically run linting and formatting

### Security

- Security headers are automatically applied to all routes
- Regular security updates are applied to dependencies
- Bundle analysis helps identify potential security vulnerabilities in dependencies

## Support

For technical support or customization requests, contact the development team or refer to the Next.js documentation for framework-specific questions.

## License

This project is proprietary software developed for Uncle Sam Junk Removal.
