import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Commercial Office Cleaning Evansville | Uncle Sam',
  description:
    'Comprehensive guide to commercial cleaning for Evansville businesses. Scheduling, costs, eco-friendly options, and maintaining a professional workplace.',
  keywords:
    'commercial cleaning Evansville, office cleaning services, business cleaning, janitorial services Evansville, professional cleaning',
  ...buildCanonicalMetadata('/blog/commercial-office-cleaning-guide-evansville', baseUrl),
}

export default function CommercialOfficeCleaningPage() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Commercial Office Cleaning in Evansville: Complete Business Guide',
        excerpt:
          'Comprehensive guide to commercial cleaning for Evansville businesses. Scheduling, costs, eco-friendly options, and maintaining a professional workplace.',
        author: 'Uncle Sam Team',
        date: 'February 17, 2026',
        readTime: '9 min read',
        category: 'Commercial Cleaning',
        tags: ['Commercial Cleaning', 'Office Cleaning', 'Business Services', 'Evansville'],
      }}
      relatedPosts={[
        {
          title: 'Property Manager Turnover Playbook',
          href: '/blog/property-manager-turnover-playbook',
          excerpt: 'Complete guide for property managers handling tenant turnovers.',
          category: 'Property Management',
        },
        {
          title: 'Office Cleanouts',
          href: '/services/office-cleanouts',
          excerpt: 'Professional office cleanout services for businesses.',
          category: 'Service',
        },
      ]}
    >
      <p>
        Maintaining a clean, professional office environment is essential for employee productivity,
        client impressions, and workplace health. This comprehensive guide helps Evansville business
        owners and office managers choose the right commercial cleaning solutions.
      </p>

      <h2>Why Professional Commercial Cleaning Matters</h2>
      <p>
        A clean office isn't just about appearances—it impacts your bottom line. Studies show that
        employees in clean workspaces are 15% more productive, take fewer sick days, and report
        higher job satisfaction. For client-facing businesses, first impressions matter, and a
        well-maintained office signals professionalism and attention to detail.
      </p>

      <h2>Types of Commercial Cleaning Services</h2>

      <h3>Daily Janitorial Services</h3>
      <p>
        <strong>What's Included:</strong> Trash removal, restroom cleaning and restocking, break
        room maintenance, vacuuming high-traffic areas, dusting desks and surfaces, emptying
        recycling bins.
      </p>
      <p>
        <strong>Best For:</strong> Offices with 10+ employees, medical offices, retail spaces,
        restaurants.
      </p>
      <p>
        <strong>Cost Range:</strong> $150-400/day depending on square footage
      </p>

      <h3>Weekly Deep Cleaning</h3>
      <p>
        <strong>What's Included:</strong> Complete vacuuming and mopping, comprehensive restroom
        sanitization, break room deep clean, dusting all surfaces including high areas, window
        cleaning (interior), conference room maintenance.
      </p>
      <p>
        <strong>Best For:</strong> Small offices (5-10 employees), startups, co-working spaces.
      </p>
      <p>
        <strong>Cost Range:</strong> $200-500/week
      </p>

      <h3>Bi-Weekly Maintenance</h3>
      <p>
        <strong>What's Included:</strong> Thorough cleaning of all office spaces, restroom deep
        cleaning, kitchen/break room sanitization, floor care (vacuum/mop), surface disinfection.
      </p>
      <p>
        <strong>Best For:</strong> Professional offices, accounting firms, insurance agencies.
      </p>
      <p>
        <strong>Cost Range:</strong> $300-650 per visit
      </p>

      <h3>Monthly Specialty Services</h3>
      <p>
        <strong>What's Included:</strong> Carpet shampooing, hard floor stripping and waxing, window
        cleaning (exterior), high dusting, air vent cleaning, upholstery cleaning.
      </p>
      <p>
        <strong>Best For:</strong> All businesses as supplemental service
      </p>
      <p>
        <strong>Cost Range:</strong> $400-1,200 depending on services
      </p>

      <h2>Scheduling Options for Businesses</h2>

      <h3>After-Hours Cleaning (5 PM - 7 AM)</h3>
      <ul>
        <li>No disruption to workflow</li>
        <li>Complete access to all areas</li>
        <li>Most popular option (60% of clients choose this)</li>
        <li>Slightly lower rates</li>
      </ul>

      <h3>During Business Hours</h3>
      <ul>
        <li>Immediate response to spills/issues</li>
        <li>Restroom restocking throughout day</li>
        <li>Professional appearance maintained constantly</li>
        <li>Requires staff coordination</li>
      </ul>

      <h3>Flexible Hybrid Schedule</h3>
      <ul>
        <li>Light maintenance during business hours</li>
        <li>Deep cleaning after hours</li>
        <li>Best of both approaches</li>
        <li>Premium pricing (10-15% higher)</li>
      </ul>

      <h2>Cost Breakdown: What You'll Pay</h2>
      <p>
        Commercial cleaning costs in Evansville typically range from $0.10-0.30 per square foot per
        cleaning, depending on:
      </p>
      <ul>
        <li>
          <strong>Office Size:</strong> Small office (under 2,000 sq ft): $200-400/cleaning
        </li>
        <li>
          <strong>Medium Office:</strong> (2,000-5,000 sq ft): $400-800/cleaning
        </li>
        <li>
          <strong>Large Office:</strong> (5,000-10,000 sq ft): $800-1,500/cleaning
        </li>
        <li>
          <strong>Frequency Discounts:</strong> Daily service: 20-30% discount per visit
        </li>
        <li>
          <strong>Contract Length:</strong> 1-year contracts: 10-15% savings
        </li>
      </ul>

      <h2>Eco-Friendly Cleaning Options</h2>
      <p>
        Green cleaning isn't just better for the environment—it improves indoor air quality and
        reduces allergic reactions. We offer:
      </p>
      <ul>
        <li>EPA-certified green cleaning products</li>
        <li>HEPA-filter vacuums to capture allergens</li>
        <li>Microfiber cleaning cloths (reduce chemical use by 95%)</li>
        <li>Plant-based disinfectants</li>
        <li>Sustainable practices (reduced water waste, recycling programs)</li>
      </ul>

      <h2>Industry-Specific Considerations</h2>

      <h3>Medical Offices</h3>
      <p>
        Requires OSHA-compliant bloodborne pathogen protocols, EPA-registered hospital-grade
        disinfectants, exam room sanitization between patients, and waiting room high-touch surface
        disinfection.
      </p>

      <h3>Retail Spaces</h3>
      <p>
        Focus on customer-facing areas, after-hours or early morning scheduling, high-traffic floor
        care, and window and entrance area maintenance.
      </p>

      <h3>Professional Services (Legal, Accounting, Insurance)</h3>
      <p>
        Emphasis on conference rooms, client waiting areas, restrooms, and maintaining a polished,
        professional appearance.
      </p>

      <h2>Questions to Ask Before Hiring</h2>
      <ol>
        <li>
          <strong>Are you licensed and insured?</strong> Verify general liability and workers'
          compensation coverage.
        </li>
        <li>
          <strong>Who will be cleaning my office?</strong> Ask about background checks and employee
          training.
        </li>
        <li>
          <strong>What products do you use?</strong> Ensure they align with your eco-friendly or
          health requirements.
        </li>
        <li>
          <strong>What's your quality control process?</strong> Regular inspections ensure
          consistent service.
        </li>
        <li>
          <strong>Can you provide references?</strong> Ask for at least 3 local business references.
        </li>
      </ol>

      <h2>Getting Started with Commercial Cleaning</h2>
      <p>
        Ready to maintain a cleaner, healthier office? Contact us for a free walkthrough and
        customized quote. We'll assess your space, understand your needs, and create a cleaning plan
        that fits your budget and schedule.
      </p>
      <p>
        Our veteran-owned business serves Evansville and the Tri-State area with professional,
        reliable commercial cleaning services. Same-day service available for urgent needs.
      </p>

      <div className="mt-8 rounded-lg bg-gray-900 p-6">
        <h3 className="mb-3 text-xl font-bold text-gray-900">
          Free Commercial Cleaning Consultation
        </h3>
        <p className="text-muted-foreground mb-4">
          Get a customized cleaning plan and quote for your Evansville office. No obligation.
        </p>
        <a
          href="/quote"
          className="inline-block rounded-lg bg-gray-900 px-6 py-2.5 font-semibold text-white hover:bg-gray-900"
        >
          Request Free Quote
        </a>
      </div>
    </BlogPostTemplate>
  )
}
