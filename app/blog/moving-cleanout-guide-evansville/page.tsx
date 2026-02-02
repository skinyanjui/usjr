import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Moving & Relocation Cleanout Guide Evansville | Uncle Sam',
  description:
    'Complete moving cleanout checklist from decluttering to final walkthrough. Make your move easier with professional junk removal and cleaning services.',
  keywords:
    'moving cleanout, relocation services, move-out cleaning, junk removal moving, Evansville movers, decluttering',
  ...buildCanonicalMetadata('/blog/moving-cleanout-guide-evansville', baseUrl),
}

export default function MovingCleanoutGuidePage() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Moving & Relocation Cleanout Guide for Evansville Residents',
        excerpt:
          'Complete moving cleanout checklist from decluttering to final walkthrough. Make your move easier with professional junk removal and cleaning services.',
        author: 'Uncle Sam Team',
        date: 'October 27, 2025',
        readTime: '10 min read',
        category: 'Moving Guide',
        tags: ['Moving', 'Relocation', 'Cleanout', 'Evansville', 'Decluttering'],
      }}
      relatedPosts={[
        {
          title: 'Move-In/Move-Out Cleaning',
          href: '/cleaning/move-in-move-out',
          excerpt: 'Professional move-in/move-out cleaning services in Evansville.',
          category: 'Service',
        },
        {
          title: 'Estate Cleanout Guide',
          href: '/blog/estate-cleanout-guide',
          excerpt: 'Compassionate estate cleanout planning and donation options.',
          category: 'Estate Cleanouts',
        },
      ]}
    >
      <p>
        Moving is one of life's most stressful events, but with the right plan, you can streamline
        the process and save time, money, and energy. This comprehensive guide covers everything
        from decluttering weeks before your move to final walkthrough checklist—specifically
        tailored for Evansville and Tri-State area residents.
      </p>

      <h2>8 Weeks Before Moving: Start Decluttering</h2>
      <p>
        The earlier you start, the less overwhelming the process becomes. Begin with areas you use
        least frequently.
      </p>

      <h3>The 3-Box Rule</h3>
      <p>
        For each room, use three boxes labeled: <strong>Keep</strong>, <strong>Donate/Sell</strong>,
        and <strong>Trash/Recycle</strong>. Be honest about what you actually use—if you haven't
        used it in a year, you probably don't need it.
      </p>

      <h3>Start with Storage Areas</h3>
      <ul>
        <li>
          <strong>Attic:</strong> Sort through holiday decorations, old toys, stored furniture
        </li>
        <li>
          <strong>Basement:</strong> Old appliances, exercise equipment, stored items
        </li>
        <li>
          <strong>Garage:</strong> Tools, lawn equipment, automotive supplies, sports gear
        </li>
        <li>
          <strong>Closets:</strong> Clothes you haven't worn, shoes, accessories
        </li>
      </ul>

      <h2>6 Weeks Before: Major Furniture & Large Items</h2>

      <h3>Furniture Assessment</h3>
      <p>Consider the cost of moving vs. replacing:</p>
      <ul>
        <li>Old sofas and recliners (especially if damaged)</li>
        <li>Worn mattresses and box springs</li>
        <li>Outdated entertainment centers</li>
        <li>Damaged or mismatched pieces</li>
        <li>Items that won't fit new space</li>
      </ul>

      <h3>Large Item Disposal Options</h3>
      <ul>
        <li>
          <strong>Professional junk removal:</strong> Quick, convenient, handles everything (from
          $89-649)
        </li>
        <li>
          <strong>Donation:</strong> Goodwill, Habitat ReStore, Salvation Army (free pickup often
          available)
        </li>
        <li>
          <strong>Sell:</strong> Facebook Marketplace, Craigslist, garage sale
        </li>
        <li>
          <strong>Curbside pickup:</strong> Check Evansville bulk trash schedule
        </li>
      </ul>

      <h2>4 Weeks Before: Room-by-Room Decluttering</h2>

      <h3>Kitchen</h3>
      <ul>
        <li>Duplicate utensils, dishes, and cookware</li>
        <li>Small appliances you never use</li>
        <li>Expired pantry items and spices</li>
        <li>Plastic containers without lids</li>
        <li>Old refrigerator magnets and junk drawer items</li>
      </ul>

      <h3>Bathrooms</h3>
      <ul>
        <li>Expired medications and toiletries</li>
        <li>Old towels and linens</li>
        <li>Excess cleaning products</li>
        <li>Unused hair tools and accessories</li>
      </ul>

      <h3>Bedrooms</h3>
      <ul>
        <li>Clothes that don't fit or aren't worn</li>
        <li>Old bedding and pillows</li>
        <li>Books you won't re-read</li>
        <li>Unused electronics and chargers</li>
      </ul>

      <h3>Living Areas</h3>
      <ul>
        <li>Decorative items you don't love</li>
        <li>Old electronics and media</li>
        <li>Magazines, papers, and outdated documents</li>
        <li>Kid's toys and outgrown items</li>
      </ul>

      <h2>2 Weeks Before: Deep Cleaning Begins</h2>

      <h3>Why Clean Before Moving?</h3>
      <ul>
        <li>Protect your security deposit (renters)</li>
        <li>Help sell your home faster (sellers)</li>
        <li>Show respect to new occupants</li>
        <li>Avoid last-minute stress</li>
      </ul>

      <h3>Deep Cleaning Checklist</h3>
      <ul>
        <li>
          <strong>Walls & ceilings:</strong> Remove marks, dust corners, clean light fixtures
        </li>
        <li>
          <strong>Windows:</strong> Inside and out, tracks, and screens
        </li>
        <li>
          <strong>Floors:</strong> Deep clean carpets, mop hard surfaces, clean baseboards
        </li>
        <li>
          <strong>Kitchen:</strong> Deep clean appliances (inside ovens, refrigerators), cabinets,
          counters
        </li>
        <li>
          <strong>Bathrooms:</strong> Scrub tiles, clean grout, sanitize all surfaces
        </li>
      </ul>

      <h2>1 Week Before: Final Preparations</h2>

      <h3>Utility & Service Transfers</h3>
      <ul>
        <li>Schedule utility disconnection/connection dates</li>
        <li>Arrange mail forwarding with USPS</li>
        <li>Update address with banks, subscriptions, etc.</li>
        <li>Schedule final meter readings</li>
      </ul>

      <h3>Last-Minute Decluttering</h3>
      <ul>
        <li>Food pantry and refrigerator contents</li>
        <li>Cleaning supplies (keep essentials only)</li>
        <li>Outdoor items (hoses, planters, decorations)</li>
        <li>Anything that won't fit in the moving truck</li>
      </ul>

      <h2>Moving Day: Final Walkthrough</h2>

      <h3>Before You Leave Checklist</h3>
      <ul>
        <li>Check all rooms, closets, cabinets</li>
        <li>Look in attic, basement, garage</li>
        <li>Check outdoor areas (shed, patio, yard)</li>
        <li>Test all lights and appliances one final time</li>
        <li>Ensure all windows and doors are locked</li>
        <li>Take final photos for your records</li>
      </ul>

      <h3>Property Condition Documentation</h3>
      <ul>
        <li>Photograph every room from multiple angles</li>
        <li>Document appliance conditions</li>
        <li>Note any existing damage</li>
        <li>Keep copies of cleaning receipts if applicable</li>
      </ul>

      <h2>Professional Services That Make Moving Easier</h2>

      <h3>Junk Removal Services</h3>
      <p>
        <strong>Cost:</strong> $89-649 depending on volume
      </p>
      <p>
        <strong>Benefits:</strong> Quick removal of unwanted items, no truck rental needed, proper
        disposal guaranteed
      </p>
      <p>
        <strong>Best For:</strong> Large furniture, appliances, bulk items, last-minute cleanouts
      </p>

      <h3>Move-Out Cleaning Services</h3>
      <p>
        <strong>Cost:</strong> $200-500 for standard home
      </p>
      <p>
        <strong>Benefits:</strong> Professional-level clean, protects security deposit, saves time
        and energy
      </p>
      <p>
        <strong>Best For:</strong> Renters, sellers, anyone pressed for time
      </p>

      <h3>Full-Service Moving & Cleanout</h3>
      <p>
        <strong>Cost:</strong> Custom quotes based on scope
      </p>
      <p>
        <strong>Benefits:</strong> One-stop solution, coordinated services, stress-free experience
      </p>
      <p>
        <strong>Best For:</strong> Major relocations, downsizing, estate situations
      </p>

      <h2>Evansville-Specific Moving Tips</h2>

      <h3>Best Times to Move</h3>
      <ul>
        <li>
          <strong>Spring & Fall:</strong> Mild weather, better availability
        </li>
        <li>
          <strong>Mid-month:</strong> Lower demand = better rates
        </li>
        <li>
          <strong>Weekdays:</strong> Often 15-20% cheaper than weekends
        </li>
      </ul>

      <h3>Local Resources</h3>
      <ul>
        <li>
          <strong>Donation Centers:</strong> Goodwill (multiple locations), Habitat for Humanity
          ReStore, Salvation Army
        </li>
        <li>
          <strong>Recycling:</strong> Evansville Solid Waste District (electronics, hazardous
          materials)
        </li>
        <li>
          <strong>Storage:</strong> If needed between moves, compare local facilities
        </li>
      </ul>

      <h2>Common Moving Mistakes to Avoid</h2>
      <ul>
        <li>
          <strong>Starting too late:</strong> Begin decluttering 8+ weeks before move date
        </li>
        <li>
          <strong>Underestimating junk volume:</strong> Most people have 30-40% more than estimated
        </li>
        <li>
          <strong>Waiting until moving day:</strong> Professional cleanout before moving day reduces
          stress
        </li>
        <li>
          <strong>Not getting quotes:</strong> Compare costs of moving vs. replacing items
        </li>
        <li>
          <strong>Forgetting outdoor areas:</strong> Sheds, garages, and yards often hold forgotten
          items
        </li>
      </ul>

      <h2>Final Tips for a Smooth Move</h2>
      <ul>
        <li>Create a detailed timeline and stick to it</li>
        <li>Declutter progressively—don't wait until the end</li>
        <li>Use professional services strategically to save time</li>
        <li>Document everything for security deposits/records</li>
        <li>Plan for unexpected items and last-minute disposal needs</li>
      </ul>
    </BlogPostTemplate>
  )
}
