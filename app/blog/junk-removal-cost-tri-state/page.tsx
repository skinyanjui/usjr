import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Junk Removal Cost in Tri-State Area 2025 | Complete Pricing Guide',
  description:
    'Complete breakdown of junk removal costs in Evansville, Henderson, and Tri-State area. Learn pricing factors, get estimates, and save money on your cleanup project.',
  keywords:
    'junk removal cost Evansville, Henderson junk removal prices, Tri-State cleanup costs, junk removal pricing guide',
  ...buildCanonicalMetadata('/blog/junk-removal-cost-tri-state', baseUrl),
}

export default function JunkRemovalCostPage() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'How Much Does Junk Removal Cost in the Tri-State? (Full Breakdown)',
        excerpt:
          'Complete pricing guide for junk removal services in Evansville, Henderson, and surrounding areas.',
        author: 'Uncle Sam Team',
        date: 'January 15, 2025',
        readTime: '8 min read',
        category: 'Pricing Guide',
        tags: ['Pricing', 'Tri-State', 'Evansville', 'Cost Guide'],
      }}
      relatedPosts={[
        {
          title: 'Essential Junk Removal Tips for Evansville Residents',
          href: '/blog/evansville-junk-removal-tips',
          excerpt:
            'Local expert tips for efficient, cost-effective junk removal in Evansville, IN.',
          category: 'Local Guide',
        },
        {
          title: 'Mattress Disposal in Evansville',
          href: '/blog/mattress-disposal-evansville',
          excerpt:
            'Complete guide to mattress disposal in Evansville with pricing and recycling options.',
          category: 'Mattress Removal',
        },
      ]}
    >
      <p>
        Understanding junk removal pricing helps you budget your project and avoid surprises. This
        guide explains the factors that affect cost and provides real ranges for Evansville,
        Henderson, and surrounding areas.
      </p>

      <h2>What Affects Junk Removal Cost?</h2>
      <ul>
        <li>
          <strong>Load Size:</strong> The amount of space your items take up in the truck
        </li>
        <li>
          <strong>Item Type:</strong> Appliances and electronics may have recycling fees
        </li>
        <li>
          <strong>Access:</strong> Stairs, distance to truck, or disassembly needs
        </li>
        <li>
          <strong>Location:</strong> Travel time and disposal facility fees
        </li>
        <li>
          <strong>Scheduling:</strong> Same-day or after-hours service may cost more
        </li>
        <li>
          <strong>Insurance Coverage:</strong> Protected against damage during removal
        </li>
      </ul>

      <h2>Typical Pricing Ranges in the Tri-State Area</h2>
      <ul>
        <li>
          <strong>Minimum service:</strong> $89 (single item or small load)
        </li>
        <li>
          <strong>1/4 truck load:</strong> $149-229
        </li>
        <li>
          <strong>1/2 truck load:</strong> $289-389
        </li>
        <li>
          <strong>3/4 truck load:</strong> $429-529
        </li>
        <li>
          <strong>Full truck load:</strong> $549-649
        </li>
      </ul>

      <h2>Common Item Pricing</h2>
      <ul>
        <li>
          <strong>Single mattress:</strong> $89-119
        </li>
        <li>
          <strong>Appliance removal:</strong> $89-149 per item
        </li>
        <li>
          <strong>Couch or sofa:</strong> $89-149
        </li>
        <li>
          <strong>Hot tub removal:</strong> $229-449
        </li>
        <li>
          <strong>Shed removal:</strong> $289-649
        </li>
      </ul>

      <h2>Ways to Save Money</h2>
      <ul>
        <li>
          <strong>Consolidate pickups:</strong> Combine multiple items into one visit
        </li>
        <li>
          <strong>Prepare in advance:</strong> Have items ready for quick loading
        </li>
        <li>
          <strong>Flexible scheduling:</strong> Non-urgent pickups may qualify for discounts
        </li>
        <li>
          <strong>Separate recyclables:</strong> Donate or recycle what you can beforehand
        </li>
        <li>
          <strong>Clear access:</strong> Easy access reduces labor time
        </li>
      </ul>

      <h2>What's Included in the Price?</h2>
      <p>Professional junk removal services typically include:</p>
      <ul>
        <li>All labor for loading and hauling</li>
        <li>Transportation to disposal facilities</li>
        <li>Proper disposal and recycling fees</li>
        <li>Liability insurance coverage</li>
        <li>Cleaning up the area after removal</li>
      </ul>

      <div className="my-8 rounded-lg border-l-4 border-red-500 bg-blue-50 p-6">
        <p className="text-foreground text-lg font-medium">
          <strong>Bottom Line:</strong> Junk removal in the Tri-State area typically costs from
          $89-649 depending on your project size. With transparent pricing, professional service,
          and eco-friendly disposal, Uncle Sam Junk Removal makes cleanup projects simple and
          affordable for Evansville and Henderson area residents.
        </p>
      </div>
    </BlogPostTemplate>
  )
}
