import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Ultimate Spring Cleaning Checklist for Southern Indiana Homes | Uncle Sam Junk Removal',
  description:
    'Complete spring cleaning guide for Southern Indiana residents. Room-by-room checklist, eco-friendly tips, and professional cleaning services.',
  keywords:
    'spring cleaning Southern Indiana, home cleaning checklist, eco-friendly cleaning, professional cleaning Evansville',
  ...buildCanonicalMetadata('/blog/spring-cleaning-checklist-southern-indiana', baseUrl),
}

export default function SpringCleaningChecklistPage() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Ultimate Spring Cleaning Checklist for Southern Indiana Homes',
        excerpt:
          'Complete spring cleaning guide for Southern Indiana residents with room-by-room checklist and eco-friendly tips.',
        author: 'Sarah Johnson',
        date: 'March 1, 2024',
        readTime: '12 min read',
        category: 'Spring Cleaning',
        tags: ['Spring Cleaning', 'Checklist', 'Southern Indiana', 'Eco-Friendly'],
      }}
      relatedPosts={[
        {
          title: 'Garage Cleanout in 48 Hours',
          href: '/blog/evansville-garage-cleanout-48-hours',
          excerpt: 'Step-by-step guide to completely clean out your garage in just 48 hours.',
          category: 'How-To Guide',
        },
        {
          title: 'Yard Waste Disposal in Evansville',
          href: '/blog/yard-waste-disposal-evansville',
          excerpt: 'Eco-friendly ways to handle yard waste in Evansville.',
          category: 'Yard Waste',
        },
      ]}
    >
      <p>
        Spring has arrived in Southern Indiana, and it's time to refresh your home after the long winter months. This comprehensive checklist helps you tackle every room systematically while using eco-friendly methods safe for your family and environment.
      </p>

      <h2>Before You Begin: Essential Supplies</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3>Natural Cleaning Products:</h3>
          <ul>
            <li>White vinegar</li>
            <li>Baking soda</li>
            <li>Lemon juice</li>
            <li>Castile soap</li>
            <li>Essential oils (tea tree, lavender)</li>
          </ul>
        </div>
        <div>
          <h3>Tools & Equipment:</h3>
          <ul>
            <li>Microfiber cloths</li>
            <li>Vacuum with attachments</li>
            <li>Mop and bucket</li>
            <li>Scrub brushes</li>
            <li>Rubber gloves</li>
          </ul>
        </div>
      </div>

      <h2>Room-by-Room Checklist</h2>

      <h3>Living Room & Family Room</h3>
      <ul>
        <li>Dust all surfaces, electronics, and decorations</li>
        <li>Vacuum upholstered furniture and cushions</li>
        <li>Clean windows and window sills</li>
        <li>Organize entertainment center</li>
        <li>Deep clean carpets or mop hardwood</li>
        <li>Wash throw pillows and blankets</li>
        <li>Clean light fixtures and ceiling fans</li>
      </ul>

      <h3>Kitchen</h3>
      <ul>
        <li>Deep clean appliances inside and out</li>
        <li>Scrub and disinfect countertops and backsplash</li>
        <li>Clean out refrigerator and freezer</li>
        <li>Organize pantry and check expiration dates</li>
        <li>Degrease range hood and clean filters</li>
        <li>Sanitize sink and faucet</li>
        <li>Mop floors and clean baseboards</li>
      </ul>

      <h3>Bedrooms</h3>
      <ul>
        <li>Wash all bedding including comforters</li>
        <li>Rotate and flip mattresses</li>
        <li>Organize closets and donate unused clothing</li>
        <li>Dust furniture and clean mirrors</li>
        <li>Vacuum under beds and in corners</li>
        <li>Clean windows and wash curtains</li>
        <li>Organize dresser drawers</li>
      </ul>

      <h3>Bathrooms</h3>
      <ul>
        <li>Scrub shower, tub, and tile grout</li>
        <li>Disinfect toilet inside and out</li>
        <li>Clean mirrors and medicine cabinet</li>
        <li>Organize under-sink storage</li>
        <li>Wash bath mats and shower curtain</li>
        <li>Clean exhaust fan</li>
        <li>Mop floors</li>
      </ul>

      <h3>Garage & Basement</h3>
      <ul>
        <li>Sort through storage items</li>
        <li>Donate or dispose of unused items</li>
        <li>Organize tools and equipment</li>
        <li>Sweep and clean floors</li>
        <li>Check for moisture or pest issues</li>
        <li>Organize seasonal items</li>
      </ul>

      <h2>Eco-Friendly Cleaning Recipes</h2>

      <h3>All-Purpose Cleaner</h3>
      <p>Mix 1 part white vinegar with 1 part water, add 10 drops of essential oil. Great for countertops, appliances, and most surfaces.</p>

      <h3>Glass Cleaner</h3>
      <p>Combine 2 cups water, 1/4 cup white vinegar, 1/2 teaspoon dish soap. Spray and wipe with microfiber cloth for streak-free shine.</p>

      <h3>Grout Cleaner</h3>
      <p>Make paste with baking soda and water. Apply to grout, let sit 10 minutes, scrub with brush, rinse.</p>

      <h2>When to Call for Help</h2>
      <p>Professional services can assist with:</p>
      <ul>
        <li><strong>Junk removal:</strong> Clear out unwanted items during spring decluttering</li>
        <li><strong>Carpet cleaning:</strong> Professional deep clean for carpets and upholstery</li>
        <li><strong>Window washing:</strong> Exterior windows and hard-to-reach areas</li>
        <li><strong>Gutter cleaning:</strong> Prepare for spring rains</li>
        <li><strong>Garage cleanouts:</strong> Major decluttering projects</li>
      </ul>

      <h2>Southern Indiana Spring Cleaning Tips</h2>
      <ul>
        <li><strong>Pollen season:</strong> Change HVAC filters monthly during spring</li>
        <li><strong>Humidity control:</strong> Use dehumidifiers in basements to prevent mold</li>
        <li><strong>Storm preparation:</strong> Check gutters and downspouts before severe weather</li>
        <li><strong>Outdoor spaces:</strong> Clean and inspect decks, patios, and outdoor furniture</li>
      </ul>

      <h2>Making It Manageable</h2>
      <p>Don't try to do everything at once:</p>
      <ul>
        <li><strong>Week 1:</strong> Bedrooms and closets</li>
        <li><strong>Week 2:</strong> Kitchen and dining areas</li>
        <li><strong>Week 3:</strong> Living spaces and bathrooms</li>
        <li><strong>Week 4:</strong> Garage, basement, and outdoor spaces</li>
      </ul>

      <div className="my-8 rounded-lg border-l-4 border-green-500 bg-green-50 p-6">
        <p className="text-lg font-medium text-gray-900">
          <strong>Sustainability Tip:</strong> Southern Indiana has excellent donation options. Instead of trashing unwanted items, consider donating to Habitat ReStore, Goodwill, or local charities. It reduces landfill waste and helps neighbors in need.
        </p>
      </div>
    </BlogPostTemplate>
  )
}
