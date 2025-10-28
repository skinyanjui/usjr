import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Yard Waste Disposal Evansville: Composting | Uncle Sam',
  description:
    'Brush, leaves, and limbs: the simplest, most eco-friendly ways to handle yard waste in Evansville.',
  ...buildCanonicalMetadata('/blog/yard-waste-disposal-evansville', baseUrl),
}

export default function YardWasteDisposalBlog() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Yard Waste Disposal in Evansville: Composting and Pickup Basics',
        excerpt:
          'Brush, leaves, and limbs: the simplest, most eco-friendly ways to handle yard waste in Evansville.',
        author: 'Uncle Sam Team',
        date: 'January 26, 2025',
        readTime: '6 min read',
        category: 'Yard Waste',
        tags: ['Yard Waste', 'Composting', 'Recycling', 'Evansville'],
      }}
      relatedPosts={[
        {
          title: 'Spring Cleaning Checklist for Southern Indiana Homes',
          href: '/blog/spring-cleaning-checklist-southern-indiana',
          excerpt:
            'Complete spring cleaning guide for Southern Indiana residents with room-by-room checklist.',
          category: 'Spring Cleaning',
        },
        {
          title: 'Evansville Garage Cleanout in 48 Hours',
          href: '/blog/evansville-garage-cleanout-48-hours',
          excerpt: 'Step-by-step guide to completely clean out your garage in just 48 hours.',
          category: 'How-To Guide',
        },
      ]}
    >
      <p>
        Evansville yard waste can be composted, mulched, or hauled away. For brush and limbs up to 6
        inches in diameter, we offer fast pickup and eco-friendly processing at local facilities.
      </p>

      <h2>Composting at Home</h2>
      <p>
        Composting is one of the most eco-friendly ways to handle organic yard waste. Leaves, grass
        clippings, and small twigs can be turned into nutrient-rich compost for your garden.
      </p>
      <ul>
        <li>
          <strong>Best for:</strong> Leaves, grass clippings, small plant trimmings
        </li>
        <li>
          <strong>Avoid composting:</strong> Diseased plants, treated wood, large branches
        </li>
        <li>
          <strong>Timeline:</strong> Finished compost in 3-6 months with proper maintenance
        </li>
      </ul>

      <h2>Mulching Benefits</h2>
      <p>
        Many types of yard waste can be chipped or shredded into mulch, which helps retain soil
        moisture and suppress weeds in your garden beds.
      </p>

      <h2>Pickup Tips</h2>
      <ul>
        <li>Bundle limbs where possible for faster loading</li>
        <li>Keep yard waste separate from trash to maximize recycling</li>
        <li>Ask about seasonal cleanup discounts</li>
        <li>Stack debris in an accessible location</li>
        <li>Remove any non-organic materials (wire, metal stakes, etc.)</li>
      </ul>

      <h2>Professional Yard Waste Removal</h2>
      <p>
        For large cleanup projects or ongoing maintenance, professional yard waste removal is the
        most efficient option. We handle:
      </p>
      <ul>
        <li>Brush and branch removal (up to 6 inches in diameter)</li>
        <li>Leaf and grass clipping hauling</li>
        <li>Storm debris cleanup</li>
        <li>Seasonal cleanups (spring and fall)</li>
        <li>Tree trimming debris removal</li>
      </ul>

      <h2>Eco-Friendly Processing</h2>
      <p>
        When you choose professional yard waste removal, materials are processed at local facilities
        where they're converted into mulch, compost, or biomass fuel rather than ending up in
        landfills.
      </p>

      <div className="my-8 rounded-lg border-l-4 border-green-500 bg-green-50 p-6">
        <p className="text-foreground text-lg font-medium">
          <strong>Pro Tip:</strong> Compost, mulch, or schedule a haul-away to keep limbs and leaves
          off your curb. Keeping yard waste separate from regular trash maximizes recycling
          opportunities.
        </p>
      </div>
    </BlogPostTemplate>
  )
}
