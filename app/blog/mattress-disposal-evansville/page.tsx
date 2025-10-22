import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title:
    'Mattress Disposal in Evansville: Recycling, Costs, and Pickup Options | Uncle Sam Junk Removal',
  description:
    'Complete guide to mattress disposal in Evansville, IN. Professional removal costs $89-149, recycling options, city bulk pickup, and donation opportunities. Same-day service available.',
  keywords:
    'mattress disposal Evansville, mattress removal cost, mattress recycling Indiana, bulk waste pickup Evansville, donate mattress Evansville',
  robots: 'index, follow',
  ...buildCanonicalMetadata('/blog/mattress-disposal-evansville', baseUrl),
}

export default function MattressDisposalBlog() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Mattress Disposal in Evansville: Recycling, Costs, and Pickup Options',
        excerpt:
          'What to do with an old mattress in Evansville. Recycling programs, professional pickup, and cost ranges to expect.',
        author: 'Uncle Sam Team',
        date: 'January 20, 2025',
        readTime: '6 min read',
        category: 'Mattress Removal',
        tags: ['Mattress Disposal', 'Recycling', 'Evansville', 'Bulk Pickup'],
      }}
      relatedPosts={[
        {
          title: 'Appliance Disposal & Recycling Guide for Evansville Residents',
          href: '/blog/appliance-disposal-recycling-guide',
          excerpt:
            'Learn how to properly dispose of old appliances in Evansville, IN. Recycling options and professional removal services.',
          category: 'Appliance Disposal',
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
        Old mattresses are bulky, hard to haul, and often not accepted by regular trash pickup in
        Evansville, IN. With over 20 million mattresses disposed of annually in the US, finding the
        right disposal method is crucial for both environmental and budget considerations.
      </p>

      <h2>Professional Mattress Removal Services</h2>
      <p>
        Professional mattress removal is the most convenient option for Evansville residents.
        Services typically include pickup from any location in your home, loading, transportation,
        and proper disposal or recycling.
      </p>

      <h3>Average Costs in Evansville</h3>
      <ul>
        <li>
          <strong>Single mattress removal:</strong> $89-119
        </li>
        <li>
          <strong>Mattress + box spring set:</strong> $114-149
        </li>
        <li>
          <strong>Multiple mattresses:</strong> 10-15% discount available
        </li>
        <li>
          <strong>Same-day service:</strong> Often available with no additional fee
        </li>
        <li>
          <strong>Upstairs/basement pickup:</strong> Usually included in base price
        </li>
      </ul>

      <h2>City of Evansville Bulk Waste Options</h2>
      <p>
        The City of Evansville offers bulk waste pickup twice per year for residents. However, this
        service has limitations:
      </p>
      <ul>
        <li>Limited to specific scheduled dates (typically spring and fall)</li>
        <li>Items must be placed curbside the night before collection</li>
        <li>Weather exposure can damage mattresses before pickup</li>
        <li>Not available for immediate disposal needs</li>
      </ul>

      <h2>Mattress Recycling in Southern Indiana</h2>
      <p>
        Mattress recycling is environmentally beneficial but has limited availability in the
        Evansville area. Here's what you need to know:
      </p>

      <h3>What Can Be Recycled</h3>
      <ul>
        <li>
          <strong>Metal springs:</strong> 100% recyclable as scrap metal
        </li>
        <li>
          <strong>Wood frames:</strong> Can be processed into biomass or mulch
        </li>
        <li>
          <strong>Foam padding:</strong> Some types can be recycled into carpet padding
        </li>
        <li>
          <strong>Fabric covering:</strong> Limited recycling options, often downcycled
        </li>
      </ul>

      <h3>Local Recycling Challenges</h3>
      <p>
        While mattress recycling is ideal, the Tri-State area has limited facilities. Most
        professional removal services will separate materials when possible, but complete recycling
        isn't always available locally.
      </p>

      <h2>Donation Opportunities</h2>
      <p>
        Donating mattresses in good condition can benefit local families, but health regulations
        limit acceptance:
      </p>
      <ul>
        <li>
          <strong>Goodwill Evansville:</strong> Generally does not accept mattresses due to hygiene
          concerns
        </li>
        <li>
          <strong>Salvation Army:</strong> Rarely accepts mattresses, call ahead to confirm
        </li>
        <li>
          <strong>Local churches:</strong> Some may accept high-quality mattresses for specific
          needs
        </li>
        <li>
          <strong>Facebook Marketplace/Craigslist:</strong> Best option for mattresses in excellent
          condition
        </li>
      </ul>

      <h2>Why Choose Professional Removal</h2>
      <p>
        For most Evansville residents, professional mattress removal offers the best combination of
        convenience, speed, and environmental responsibility:
      </p>
      <ul>
        <li>
          <strong>Same-day availability:</strong> No waiting for bulk pickup schedules
        </li>
        <li>
          <strong>Indoor pickup:</strong> No need to move heavy mattresses yourself
        </li>
        <li>
          <strong>Weather-independent:</strong> Service available year-round
        </li>
        <li>
          <strong>Proper disposal:</strong> Licensed companies ensure legal, eco-friendly disposal
        </li>
        <li>
          <strong>Insurance coverage:</strong> Professional services carry liability insurance
        </li>
      </ul>

      <div className="my-8 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
        <p className="text-lg font-medium text-gray-900">
          <strong>Bottom Line:</strong> Professional mattress removal in Evansville typically costs
          $89-149 and offers the most convenient, reliable solution for disposing of old mattresses
          while ensuring proper environmental handling.
        </p>
      </div>
    </BlogPostTemplate>
  )
}
