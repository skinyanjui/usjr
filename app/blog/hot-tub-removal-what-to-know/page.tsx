import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Hot Tub Removal: What to Know | Uncle Sam Junk Removal',
  description:
    'Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options. Make your hot tub removal smooth and safe.',
  keywords:
    'hot tub removal preparation, spa removal Evansville, hot tub disposal, jacuzzi removal Indiana',
  ...buildCanonicalMetadata('/blog/hot-tub-removal-what-to-know', baseUrl),
}

export default function HotTubRemovalPage() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Hot Tub Removal: What to Know Before We Arrive',
        excerpt:
          'Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options.',
        author: 'Uncle Sam Team',
        date: 'January 8, 2025',
        readTime: '5 min read',
        category: 'Service Guide',
        tags: ['Hot Tub Removal', 'Preparation', 'Evansville', 'Service Guide'],
      }}
      relatedPosts={[
        {
          title: 'Shed Removal in Evansville',
          href: '/blog/shed-removal-guide-evansville',
          excerpt: 'Complete guide to shed removal with permit tips, pricing, and timeline.',
          category: 'Light Demolition',
        },
        {
          title: 'Junk Removal Cost in Tri-State Area',
          href: '/blog/junk-removal-cost-tri-state',
          excerpt: 'Complete pricing guide for junk removal services in the Tri-State area.',
          category: 'Pricing Guide',
        },
      ]}
    >
      <p>
        Hot tub removal requires careful preparation to ensure safety and efficiency. Whether your
        hot tub is broken, outdated, or you're simply ready for a change, proper preparation makes
        the removal process smooth and quick.
      </p>

      <h2>Critical Preparation Steps</h2>

      <h3>1. Electrical Disconnection (CRITICAL)</h3>
      <div className="my-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-6">
        <p className="font-semibold text-red-800">Safety First!</p>
        <p className="text-red-700">
          Hot tubs operate on 220-240V circuits. Improper disconnection can cause serious injury or
          death. Always hire a licensed electrician if you're unsure about the electrical setup.
        </p>
      </div>

      <p>Before removal day:</p>
      <ul>
        <li>Turn off power at the main circuit breaker</li>
        <li>Have a licensed electrician disconnect and cap wiring if needed</li>
        <li>Never attempt electrical work yourself unless you're qualified</li>
        <li>Provide confirmation of disconnection to removal team</li>
      </ul>

      <h3>2. Drain Completely (REQUIRED)</h3>
      <p>
        A full hot tub can weigh 2,000-6,000 pounds. Complete draining is essential for safe
        removal.
      </p>
      <ul>
        <li>
          <strong>Drain 24-48 hours before pickup:</strong> Allows time for complete drainage and
          drying
        </li>
        <li>
          <strong>Use built-in drain:</strong> Follow manufacturer instructions
        </li>
        <li>
          <strong>Remove standing water:</strong> Use wet/dry vacuum for remaining water
        </li>
        <li>
          <strong>Let it dry:</strong> Prevents mold growth and reduces weight
        </li>
      </ul>

      <h3>3. Clear Access Path (IMPORTANT)</h3>
      <p>Hot tub removal requires clear passage from its location to the truck:</p>
      <ul>
        <li>
          <strong>Measure doorways and gates:</strong> Typical hot tubs are 7-8 feet wide
        </li>
        <li>
          <strong>Remove obstacles:</strong> Furniture, plants, decorations along the route
        </li>
        <li>
          <strong>Check overhead clearance:</strong> Low-hanging branches, lights, or structures
        </li>
        <li>
          <strong>Protect flooring:</strong> We'll use floor protection, but clearing the path helps
        </li>
        <li>
          <strong>Consider crane access:</strong> For rooftop or enclosed deck hot tubs
        </li>
      </ul>

      <h2>Hot Tub Removal Methods</h2>

      <h3>Standard Removal (Most Common)</h3>
      <p>
        For hot tubs with clear access through gates or patio doors. We dismantle into manageable
        sections and carry out.
      </p>
      <ul>
        <li>
          <strong>Timeline:</strong> 2-4 hours
        </li>
        <li>
          <strong>Cost:</strong> $229-389
        </li>
        <li>
          <strong>Best for:</strong> Ground-level installations with accessible routes
        </li>
      </ul>

      <h3>Crane Removal (Specialized)</h3>
      <p>For hot tubs on rooftops, enclosed decks, or without accessible routes.</p>
      <ul>
        <li>
          <strong>Timeline:</strong> 4-6 hours
        </li>
        <li>
          <strong>Cost:</strong> $449-649 (includes crane rental)
        </li>
        <li>
          <strong>Best for:</strong> Rooftop installations, enclosed areas
        </li>
      </ul>

      <h2>Common Questions</h2>

      <h3>Can you remove the hot tub if it's still full of water?</h3>
      <p>
        No. For safety reasons, hot tubs must be drained before removal. Water adds 1,500-4,000
        pounds of weight, making safe removal impossible.
      </p>

      <h3>What if the electrical isn't disconnected?</h3>
      <p>
        We cannot proceed with removal until power is safely disconnected. We can recommend local
        electricians if needed (typically $100-200 for disconnection).
      </p>

      <h3>Do you remove the concrete pad underneath?</h3>
      <p>
        Concrete pad removal is a separate service. Hot tub removal includes only the hot tub
        itself. We can provide quotes for pad removal if needed (typically $289-649 depending on
        size).
      </p>

      <h3>What happens to the hot tub after removal?</h3>
      <p>We responsibly dispose of hot tubs through:</p>
      <ul>
        <li>Metal recycling (pumps, heaters, frames)</li>
        <li>Plastic recycling where available</li>
        <li>Proper disposal of non-recyclable components</li>
        <li>Donation if the hot tub is still functional (rare)</li>
      </ul>

      <h2>Day-of-Removal Checklist</h2>
      <ol>
        <li>✓ Power disconnected and confirmed safe</li>
        <li>✓ Hot tub completely drained and dry</li>
        <li>✓ Access path cleared of obstacles</li>
        <li>✓ Pets secured indoors</li>
        <li>✓ Gate or fence sections removed if necessary</li>
        <li>✓ Someone available to answer questions</li>
      </ol>

      <div className="my-8 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-6">
        <p className="text-lg font-medium text-gray-900">
          <strong>Pro Tip:</strong> Hot tub removal is typically completed in 2-4 hours when
          properly prepared. Taking time to drain completely and ensure safe electrical
          disconnection prevents delays and ensures the fastest, safest removal possible.
        </p>
      </div>
    </BlogPostTemplate>
  )
}
