import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Summer Cleanup Checklist Tri-State | Uncle Sam',
  description:
    'Beat the heat with this complete summer cleanup guide. Outdoor maintenance, garage organization, and preparing your property for fall.',
  keywords:
    'summer cleanup, outdoor maintenance, garage organization, yard cleanup, Tri-State area, Evansville',
  ...buildCanonicalMetadata('/blog/summer-cleanup-checklist-tri-state', baseUrl),
}

export default function SummerCleanupChecklistPage() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Summer Cleanup Checklist for Tri-State Homes & Yards',
        excerpt:
          'Beat the heat with this complete summer cleanup guide. Outdoor maintenance, garage organization, and preparing your property for fall.',
        author: 'Sarah Johnson',
        date: 'October 27, 2025',
        readTime: '8 min read',
        category: 'Seasonal Guide',
        tags: ['Summer Cleanup', 'Outdoor Maintenance', 'Garage', 'Tri-State Area'],
      }}
      relatedPosts={[
        {
          title: 'Spring Cleaning Checklist',
          href: '/blog/spring-cleaning-checklist-southern-indiana',
          excerpt: 'Complete spring cleaning guide for Southern Indiana homes.',
          category: 'Spring Cleaning',
        },
        {
          title: 'Yard Waste Disposal',
          href: '/blog/yard-waste-disposal-evansville',
          excerpt: 'Eco-friendly ways to handle yard waste in Evansville.',
          category: 'Yard Waste',
        },
      ]}
    >
      <p>
        Summer in the Tri-State area means hot temperatures, outdoor living, and the perfect time to
        tackle those outdoor cleanup projects you've been putting off. This comprehensive checklist
        helps you make the most of summer while preparing your home for fall.
      </p>

      <h2>Why Summer Cleanup Matters</h2>
      <p>
        Summer provides the ideal window for outdoor projects—long days, dry weather, and
        comfortable working conditions. Plus, addressing maintenance now prevents costly repairs
        come fall and winter. A well-maintained outdoor space also increases property value and
        creates a safer, more enjoyable environment for your family.
      </p>

      <h2>Outdoor Living Spaces</h2>

      <h3>Deck & Patio Maintenance</h3>
      <ul>
        <li>
          <strong>Power wash surfaces:</strong> Remove dirt, mildew, and grime from decking, siding,
          and concrete
        </li>
        <li>
          <strong>Inspect for damage:</strong> Check for loose boards, rusted fasteners, or
          structural issues
        </li>
        <li>
          <strong>Apply sealant or stain:</strong> Protect wood surfaces from sun and moisture
          damage
        </li>
        <li>
          <strong>Clean outdoor furniture:</strong> Wash cushions, tighten hardware, apply rust
          protection
        </li>
        <li>
          <strong>Check railings & stairs:</strong> Ensure stability and safety
        </li>
      </ul>

      <h3>Grill & Outdoor Kitchen</h3>
      <ul>
        <li>Deep clean grill grates and burners</li>
        <li>Check gas lines for leaks (soap test)</li>
        <li>Replace worn-out cooking surfaces</li>
        <li>Clean exterior and storage areas</li>
        <li>Inspect and clean outdoor refrigerator if applicable</li>
      </ul>

      <h2>Garage Organization & Cleanup</h2>

      <h3>Decluttering Strategy</h3>
      <p>
        <strong>The Four-Box Method:</strong> Set up boxes labeled Keep, Donate, Sell, and Trash.
        Work through one section at a time to avoid overwhelm.
      </p>

      <h3>Seasonal Storage Rotation</h3>
      <ul>
        <li>Move winter items to back/high shelves</li>
        <li>Bring summer equipment to easy-access areas</li>
        <li>Store holiday decorations properly</li>
        <li>Label all storage containers clearly</li>
      </ul>

      <h3>Garage Deep Clean Tasks</h3>
      <ul>
        <li>
          <strong>Sweep & power wash floor:</strong> Remove oil stains with degreaser
        </li>
        <li>
          <strong>Organize tools:</strong> Install pegboards or wall-mounted tool racks
        </li>
        <li>
          <strong>Check stored items:</strong> Dispose of old paint, chemicals, expired products
        </li>
        <li>
          <strong>Install better lighting:</strong> LED fixtures for energy efficiency
        </li>
        <li>
          <strong>Create zones:</strong> Lawn care, sports equipment, automotive, seasonal storage
        </li>
      </ul>

      <h2>Yard & Landscaping Maintenance</h2>

      <h3>Lawn Care</h3>
      <ul>
        <li>Mow at proper height (2.5-3 inches in summer heat)</li>
        <li>Water deeply but infrequently (1 inch per week)</li>
        <li>Apply summer fertilizer (slow-release nitrogen)</li>
        <li>Address bare patches with grass seed</li>
        <li>Edge along walkways and beds for crisp appearance</li>
      </ul>

      <h3>Trees & Shrubs</h3>
      <ul>
        <li>
          <strong>Remove dead branches:</strong> Improves appearance and prevents storm damage
        </li>
        <li>
          <strong>Trim overgrown shrubs:</strong> Maintain shape and promote healthy growth
        </li>
        <li>
          <strong>Check for disease/pests:</strong> Address issues before they spread
        </li>
        <li>
          <strong>Mulch around bases:</strong> Retain moisture and suppress weeds (2-3 inch layer)
        </li>
      </ul>

      <h3>Garden Beds & Flower Areas</h3>
      <ul>
        <li>Weed regularly (easier in summer when soil is soft)</li>
        <li>Deadhead flowers to encourage new blooms</li>
        <li>Add fresh mulch to retain moisture</li>
        <li>Check irrigation systems for leaks or clogs</li>
        <li>Plant heat-tolerant annuals for late summer color</li>
      </ul>

      <h2>Exterior Home Maintenance</h2>

      <h3>Siding & Windows</h3>
      <ul>
        <li>Power wash siding, paying attention to north-facing walls (most mildew)</li>
        <li>Clean windows inside and out</li>
        <li>Check caulking around windows and doors</li>
        <li>Inspect for insect damage or nests</li>
        <li>Touch up exterior paint as needed</li>
      </ul>

      <h3>Gutters & Drainage</h3>
      <ul>
        <li>Clean gutters and downspouts</li>
        <li>Check for proper drainage away from foundation</li>
        <li>Repair any leaks or loose sections</li>
        <li>Install gutter guards to reduce future maintenance</li>
      </ul>

      <h2>Shed & Storage Areas</h2>

      <h3>Shed Organization</h3>
      <ul>
        <li>Remove everything and sweep/clean interior</li>
        <li>Check for water damage, rot, or pest issues</li>
        <li>Install shelving or wall organizers</li>
        <li>Properly store lawn equipment and chemicals</li>
        <li>Ensure good ventilation to prevent moisture buildup</li>
      </ul>

      <h3>Equipment Maintenance</h3>
      <ul>
        <li>Service lawn mower (change oil, sharpen blade, new spark plug)</li>
        <li>Clean and sharpen garden tools</li>
        <li>Check power equipment for wear</li>
        <li>Organize extension cords and hoses</li>
        <li>Properly store gasoline and chemicals</li>
      </ul>

      <h2>Preparing for Fall</h2>

      <h3>Late Summer Tasks (August)</h3>
      <ul>
        <li>Plant fall-blooming perennials</li>
        <li>Overseed lawn for fall growth</li>
        <li>Begin composting summer yard waste</li>
        <li>Inspect heating systems before cold weather</li>
        <li>Schedule chimney cleaning</li>
      </ul>

      <h2>When to Call Professionals</h2>
      <p>Some tasks are best left to experts:</p>
      <ul>
        <li>
          <strong>Large tree removal or major trimming:</strong> Requires proper equipment and
          safety measures
        </li>
        <li>
          <strong>Deck repairs/reconstruction:</strong> Structural work needs professional
          assessment
        </li>
        <li>
          <strong>Major garage cleanouts:</strong> Overwhelming projects benefit from professional
          help
        </li>
        <li>
          <strong>Hazardous material disposal:</strong> Old paint, chemicals, electronics require
          proper disposal
        </li>
        <li>
          <strong>Storm debris cleanup:</strong> Especially after severe weather events
        </li>
      </ul>

      <h2>Summer Cleanup Timeline</h2>
      <p>
        <strong>Early Summer (June):</strong> Focus on outdoor living spaces, deck maintenance,
        garage organization
      </p>
      <p>
        <strong>Mid-Summer (July):</strong> Yard maintenance, shed organization, equipment care
      </p>
      <p>
        <strong>Late Summer (August):</strong> Final outdoor projects, fall preparation, lawn
        overseeding
      </p>
    </BlogPostTemplate>
  )
}
