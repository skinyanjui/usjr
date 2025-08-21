# Component Documentation

This document provides comprehensive documentation for all reusable UI components in the Uncle Sam Junk Removal website.

## Design System

### Color Themes
All components support a consistent 6-color theme system:

- `red` - Primary brand color, junk removal services
- `orange` - Dumpster rental services  
- `green` - Cleaning services
- `blue` - General business/commercial elements
- `purple` - Location-specific branding (Owensboro)
- `teal` - Location-specific branding (Princeton)

### Typography
Components use the IBM Plex Sans font family with consistent sizing:
- Headings: `text-4xl md:text-5xl font-bold`
- Subheadings: `text-2xl font-bold`
- Body text: `text-sm` to `text-lg` with `text-gray-600`

## Core Components

### ServiceCard

Standardized service display card with image, icon, pricing, and call-to-action buttons.

**Location**: `components/ui/service-card.tsx`

**Props**:
\`\`\`tsx
interface ServiceCardProps {
  title: string
  description: string
  image: string
  price: string
  icon: LucideIcon
  color: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  link: string
  category: string
  size?: "small" | "medium" | "large"
}
\`\`\`

**Usage**:
\`\`\`tsx
import { ServiceCard } from "@/components/ui/service-card"
import { Truck } from 'lucide-react'

<ServiceCard
  title="Junk Removal"
  description="Professional junk removal service"
  image="/service-image.jpg"
  price="From $99"
  icon={Truck}
  color="red"
  link="/services/junk-removal"
  category="Junk Removal"
  size="medium"
/>
\`\`\`

**Features**:
- Responsive image with overlay icon and category badge
- Color-coded theming with hover effects
- Glassmorphic styling with scale animation
- Dual call-to-action buttons (Service Details + Quote)
 
### ThemedButton

Consistent button component with theme support and variants.

**Location**: `components/ui/themed-button.tsx`

**Props**:
\`\`\`tsx
interface ThemedButtonProps extends ButtonProps {
  theme?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  fullWidth?: boolean
}
\`\`\`

**Usage**:
\`\`\`tsx
import { ThemedButton } from "@/components/ui/themed-button"

<ThemedButton theme="red" variant="outline" fullWidth>
  Get Quote
</ThemedButton>
\`\`\`

**Variants**:
- `default` - Solid background with theme color
- `outline` - Transparent background with theme-colored border

### GlassCard

Glassmorphic card component with optional color variants.

**Location**: `components/ui/glass-card.tsx`

**Props**:
\`\`\`tsx
interface GlassCardProps extends CardProps {
  variant?: "default" | "colored"
  color?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  hover?: boolean
}
\`\`\`

**Usage**:
\`\`\`tsx
import { GlassCard } from "@/components/ui/glass-card"

<GlassCard variant="colored" color="red" hover>
  <CardContent>Content here</CardContent>
</GlassCard>
\`\`\`

**Features**:
- Backdrop blur effect with transparency
- Optional color tinting
- Hover animations (scale/shadow)
- Consistent border radius and spacing

### IconContainer

Standardized circular icon container with theme colors.

**Location**: `components/ui/icon-container.tsx`

**Props**:
\`\`\`tsx
interface IconContainerProps {
  icon: LucideIcon
  color?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  size?: "sm" | "md" | "lg"
  className?: string
}
\`\`\`

**Usage**:
\`\`\`tsx
import { IconContainer } from "@/components/ui/icon-container"
import { Phone } from 'lucide-react'

<IconContainer icon={Phone} color="red" size="md" />
\`\`\`

**Sizes**:
- `sm` - 48px (12x12) container, 20px (5x5) icon
- `md` - 64px (16x16) container, 32px (8x8) icon  
- `lg` - 80px (20x20) container, 40px (10x10) icon

### SectionHeader

Consistent section header with optional subtitle and description.

**Location**: `components/ui/section-header.tsx`

**Props**:
\`\`\`tsx
interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}
\`\`\`

**Usage**:
\`\`\`tsx
import { SectionHeader } from "@/components/ui/section-header"

<SectionHeader
  subtitle="Our Services"
  title="Professional Cleaning Solutions"
  description="Comprehensive cleaning services for residential and commercial properties"
  centered
/>
\`\`\`

### ContactInfo

Reusable contact information display with icon and details.

**Location**: `components/ui/contact-info.tsx`

**Props**:
\`\`\`tsx
interface ContactInfoProps {
  icon: LucideIcon
  title: string
  primary: string
  secondary?: string
  note?: string
  color?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  className?: string
}
\`\`\`

**Usage**:
\`\`\`tsx
import { ContactInfo } from "@/components/ui/contact-info"
import { Phone } from 'lucide-react'

<ContactInfo
  icon={Phone}
  title="Phone"
  primary="(812) 555-0123"
  secondary="(812) 555-BULL"
  note="Call or text for fastest response"
  color="red"
/>
\`\`\`

### PricingCard

Standardized pricing display card with features list and CTA.

**Location**: `components/ui/pricing-card.tsx`

**Props**:
\`\`\`tsx
interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  color?: "red" | "orange" | "green" | "blue" | "purple" | "teal"
  ctaText?: string
  ctaLink?: string
  className?: string
}
\`\`\`

**Usage**:
\`\`\`tsx
import { PricingCard } from "@/components/ui/pricing-card"

<PricingCard
  title="Standard Service"
  price="From $199-299"
  description="Perfect for most projects"
  features={["Feature 1", "Feature 2", "Feature 3"]}
  popular
  color="red"
  ctaText="Get Quote"
  ctaLink="/quote"
/>
\`\`\`

**Features**:
- Optional "Most Popular" badge
- Checkmark feature list
- Theme-colored pricing display
- Integrated call-to-action button

## Template Components

### ServicePageTemplate

Comprehensive template for service pages that eliminates code duplication across all service offerings.

**Location**: `components/ui/service-page-template.tsx`

**Props**:
\`\`\`tsx
interface ServicePageTemplateProps {
  title: string
  description: string
  badges?: string[]
  heroImage?: string
  theme: "red" | "blue" | "green" | "orange" | "purple" | "teal"
  features: Array<{
    icon: LucideIcon
    title: string
    description: string
  }>
  steps: ServiceStep[]
  stepsTitle?: string
  pricing: PricingTier[]
  pricingTitle?: string
  pricingNote?: string
  faqs: FAQ[]
  ctaPrimary?: string
  ctaSecondary?: string
  children?: React.ReactNode
}
\`\`\`

**Usage**:
\`\`\`tsx
import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Phone, Camera, Truck, Recycle } from 'lucide-react'

<ServicePageTemplate
  title="Hot Tub Removal in Evansville"
  description="Professional hot tub and spa removal with safe disconnection"
  theme="blue"
  features={[
    {
      icon: Phone,
      title: "Safe Electrical Disconnection",
      description: "Licensed professionals handle all electrical connections"
    }
  ]}
  steps={[
    {
      icon: Phone,
      title: "Schedule Assessment",
      description: "Call or text photos for instant quote"
    }
  ]}
  pricing={[
    {
      name: "Standard Hot Tub (6-8 person)",
      price: "From $389-489"
    }
  ]}
  faqs={[
    {
      question: "Do you disconnect electrical connections?",
      answer: "Yes, our team includes licensed professionals..."
    }
  ]}
/>
\`\`\`

**Features**:
- Complete page layout with hero, features, steps, pricing, and FAQ sections
- Theme-based color coordination throughout all sections
- Responsive design with mobile-first approach
- Consistent typography and spacing
- Integrated call-to-action buttons
- Optional additional content via children prop

### LocationPageTemplate

Standardized template for location-specific pages with local information and service areas.

**Location**: `components/ui/location-page-template.tsx`

**Props**:
\`\`\`tsx
interface LocationPageTemplateProps {
  locationName: string
  state: string
  tagline: string
  theme: "red" | "blue" | "green" | "orange" | "purple" | "teal"
  features: LocationFeature[]
  landmarks?: string[]
  neighborhoods?: string[]
  acceptedItems?: string[]
  restrictedItems?: string[]
  disposalNote?: string
  offers?: Array<{
    title: string
    discount: string
    description: string
  }>
  ctaPrimary?: string
  ctaSecondary?: string
}
\`\`\`

**Usage**:
\`\`\`tsx
import { LocationPageTemplate } from "@/components/ui/location-page-template"
import { Clock, Truck, Recycle } from 'lucide-react'

<LocationPageTemplate
  locationName="Evansville"
  state="Indiana"
  tagline="Same-day junk removal service throughout Evansville"
  theme="red"
  features={[
    {
      icon: Clock,
      title: "Same-Day Service",
      description: "Call by 2 PM for same-day pickup"
    }
  ]}
  landmarks={["Downtown Evansville", "University of Evansville"]}
  neighborhoods={["Haynie's Corner", "Jacobsville"]}
  offers={[
    {
      title: "Curbside Pickup Discount",
      discount: "Save $25",
      description: "Items placed at curb"
    }
  ]}
/>
\`\`\`

**Features**:
- Location-specific hero section with local branding
- Service area display with landmarks and neighborhoods
- Disposal guidelines with accepted/restricted items
- Special offers section with local promotions
- Theme-based color coordination
- Responsive grid layouts for service areas

### FAQSection

Reusable FAQ section component for consistent question/answer displays.

**Location**: `components/ui/faq-section.tsx`

**Props**:
\`\`\`tsx
interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  className?: string
}
\`\`\`

**Usage**:
\`\`\`tsx
import { FAQSection } from "@/components/ui/faq-section"

<FAQSection
  title="Frequently Asked Questions"
  faqs={[
    {
      question: "How much does service cost?",
      answer: "Pricing varies based on service type and location..."
    }
  ]}
/>
\`\`\`

## Quote Form Components

### useQuoteForm Hook

Custom hook that manages all quote form state and logic, eliminating duplication across modal and standalone forms.

**Location**: `components/ui/quote-form-shared.tsx`

**Returns**:
\`\`\`tsx
interface UseQuoteFormReturn {
  formData: QuoteFormData
  setFormData: React.Dispatch<React.SetStateAction<QuoteFormData>>
  uploadedFiles: File[]
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
  isSubmitted: boolean
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
  handleSubmit: (e: React.FormEvent) => void
}
\`\`\`

**Usage**:
\`\`\`tsx
import { useQuoteForm } from "@/components/ui/quote-form-shared"

function MyQuoteForm() {
  const {
    formData,
    setFormData,
    uploadedFiles,
    handleFileUpload,
    removeFile,
    handleSubmit,
    isSubmitted
  } = useQuoteForm()

  // Use the hook's state and handlers in your form
}
\`\`\`

### QuoteSuccessMessage

Standardized success message component for quote form submissions.

**Location**: `components/ui/quote-form-shared.tsx`

**Props**:
\`\`\`tsx
interface QuoteSuccessMessageProps {
  onClose?: () => void
}
\`\`\`

**Usage**:
\`\`\`tsx
import { QuoteSuccessMessage } from "@/components/ui/quote-form-shared"

{isSubmitted && <QuoteSuccessMessage onClose={handleClose} />}
\`\`\`

### ContactFields

Reusable contact information fields for quote forms.

**Location**: `components/ui/quote-form-shared.tsx`

**Props**:
\`\`\`tsx
interface ContactFieldsProps {
  formData: QuoteFormData
  setFormData: React.Dispatch<React.SetStateAction<QuoteFormData>>
}
\`\`\`

### PhotoUpload

Reusable photo upload component with drag-and-drop and mobile camera support.

**Location**: `components/ui/quote-form-shared.tsx`

**Props**:
\`\`\`tsx
interface PhotoUploadProps {
  uploadedFiles: File[]
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeFile: (index: number) => void
  maxFiles?: number
}
\`\`\`

## Constants

### Service Arrays

Shared service constants to eliminate duplication:

\`\`\`tsx
import { RESIDENTIAL_SERVICES, COMMERCIAL_SERVICES } from "@/components/ui/quote-form-shared"

// RESIDENTIAL_SERVICES contains 9 cleaning services
// COMMERCIAL_SERVICES contains 8 business cleaning services
\`\`\`

## Usage Guidelines

### When to Use Components

**ServiceCard**: Use for any service display that needs image, pricing, and description
**ThemedButton**: Use instead of regular Button for brand consistency
**GlassCard**: Use for content containers that need glassmorphic styling
**IconContainer**: Use for any circular icon displays
**SectionHeader**: Use for all major section headers
**ContactInfo**: Use for any contact detail displays
**PricingCard**: Use for pricing tiers and service packages
**ServicePageTemplate**: Use for comprehensive service pages
**LocationPageTemplate**: Use for location-specific pages
**FAQSection**: Use for consistent FAQ displays
**QuoteSuccessMessage**: Use for standardized quote form success messages
**ContactFields**: Use for reusable contact information fields in quote forms
**PhotoUpload**: Use for reusable photo upload components in quote forms

### Color Selection

Choose colors based on service category:
- **Red**: Junk removal, primary brand actions
- **Orange**: Dumpster rental services
- **Green**: Cleaning services, eco-friendly features
- **Blue**: General business, commercial services
- **Purple/Teal**: Location-specific branding

### Accessibility

All components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- High contrast color combinations (4.5:1 minimum)
- Screen reader compatible markup
- Focus indicators for interactive elements

### Responsive Design

Components are built mobile-first with responsive breakpoints:
- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up
- `xl`: 1280px and up

### Performance

Components are optimized for performance:
- Lazy loading for images
- Minimal re-renders with proper memoization
- Efficient CSS classes with Tailwind
- Tree-shaking compatible exports

## Extending Components

### Adding New Themes

To add a new color theme:

1. Update the color type union in component interfaces
2. Add color mappings in `getColorClasses` functions
3. Test accessibility contrast ratios
4. Update documentation

### Creating New Components

When creating new reusable components:

1. Place in `components/ui/` directory
2. Use TypeScript with proper interfaces
3. Support the established color system
4. Include accessibility features
5. Add comprehensive documentation
6. Export from appropriate index files

### Best Practices

- Always use existing components before creating new ones
- Maintain consistent naming conventions
- Include proper TypeScript types
- Test across all supported browsers
- Validate accessibility compliance
- Document all props and usage examples

## Refactoring Benefits

The new template and shared components provide significant benefits:

### Code Reduction
- **Service pages**: ~70% code reduction by using ServicePageTemplate
- **Location pages**: ~60% code reduction by using LocationPageTemplate  
- **Quote forms**: ~50% code reduction by using shared hooks and components
- **FAQ sections**: ~40% code reduction by using FAQSection component

### Consistency
- Standardized layouts across all service and location pages
- Consistent theming and color application
- Uniform spacing, typography, and component behavior
- Centralized form logic and validation

### Maintainability
- Single source of truth for page templates
- Easy global updates by modifying template components
- Reduced risk of inconsistencies across pages
- Simplified testing with fewer unique implementations

### Performance
- Smaller bundle sizes due to code reuse
- Better tree-shaking with centralized exports
- Reduced memory usage from shared component instances
- Faster development with pre-built templates

## Migration Guide

### Converting Existing Service Pages

To convert an existing service page to use ServicePageTemplate:

1. Extract page-specific data (title, description, features, steps, pricing, FAQs)
2. Replace page component with ServicePageTemplate
3. Pass extracted data as props
4. Remove duplicate layout code
5. Test responsive behavior and theming

### Converting Location Pages

To convert location pages to LocationPageTemplate:

1. Extract location-specific data (name, features, landmarks, offers)
2. Replace page component with LocationPageTemplate  
3. Configure theme based on location
4. Test local information display
5. Verify special offers functionality

### Updating Quote Forms

To update quote forms to use shared components:

1. Replace form state with useQuoteForm hook
2. Replace success message with QuoteSuccessMessage component
3. Replace contact fields with ContactFields component
4. Replace photo upload with PhotoUpload component
5. Import service constants from shared file
6. Test form submission and validation
