import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Appliance Disposal & Recycling Evansville | Uncle Sam',
  description:
    'Learn how to properly dispose of old appliances in Evansville, IN. Recycling options, environmental benefits, and professional removal services.',
  keywords:
    'appliance disposal Evansville, appliance recycling, refrigerator removal, washer dryer disposal, eco-friendly appliance removal',
  ...buildCanonicalMetadata('/blog/appliance-disposal-recycling-guide', baseUrl),
}

export default function ApplianceDisposalGuidePage() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Appliance Disposal & Recycling Guide for Evansville Residents',
        excerpt:
          'Learn how to properly dispose of old appliances in Evansville, IN. Recycling options, environmental benefits, and professional removal services.',
        author: 'Mike Thompson',
        date: 'November 20, 2024',
        readTime: '10 min read',
        category: 'Appliance Disposal',
        tags: ['Appliance Removal', 'Recycling', 'Evansville', 'Environmental'],
      }}
      relatedPosts={[
        {
          title: 'Mattress Disposal in Evansville',
          href: '/blog/mattress-disposal-evansville',
          excerpt: 'Complete guide to mattress disposal options and recycling in Evansville.',
          category: 'Mattress Removal',
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
        When it's time to replace that old refrigerator, washing machine, or other household
        appliance, proper disposal is crucial for both environmental protection and legal
        compliance. This guide covers everything Evansville residents need to know about responsible
        appliance disposal and recycling.
      </p>

      <div className="my-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-6">
        <h3 className="mb-2 text-lg font-semibold text-yellow-800">Important Notice</h3>
        <p className="text-yellow-700">
          Many appliances contain refrigerants, oils, and other hazardous materials that require
          special handling. Never attempt to dismantle appliances yourself or dispose of them in
          regular trash.
        </p>
      </div>

      <h2>Why Proper Appliance Disposal Matters</h2>

      <h3>Environmental Impact</h3>
      <ul>
        <li>
          <strong>Refrigerants:</strong> Old refrigerators and air conditioners contain CFCs and
          HCFCs that damage the ozone layer
        </li>
        <li>
          <strong>Heavy Metals:</strong> Lead, mercury, and cadmium in electronic components can
          contaminate soil and water
        </li>
        <li>
          <strong>Recyclable Materials:</strong> Appliances contain valuable metals (steel, copper,
          aluminum) that should be recovered
        </li>
        <li>
          <strong>Energy Savings:</strong> Recycling metals requires 95% less energy than mining new
          ore
        </li>
      </ul>

      <h3>Legal Requirements</h3>
      <p>
        EPA regulations require proper handling of refrigerants. Licensed technicians must remove
        and recycle refrigerants from appliances before disposal. Improper disposal can result in
        fines up to $37,500 per violation.
      </p>

      <h2>Appliance Recycling Options in Evansville</h2>

      <h3>1. Professional Appliance Removal Services</h3>
      <p>The most convenient option for most homeowners:</p>
      <ul>
        <li>We handle all lifting, loading, and transportation</li>
        <li>EPA-certified refrigerant removal included</li>
        <li>Proper recycling and disposal guaranteed</li>
        <li>Same-day or next-day service available</li>
        <li>Licensed and insured professionals</li>
      </ul>

      <p>
        <strong>Typical Cost:</strong> $89-149 per appliance, including all labor, transportation,
        and disposal fees.
      </p>

      <h3>2. Retail Take-Back Programs</h3>
      <ul>
        <li>
          <strong>Best Buy:</strong> Free haul-away with delivery of new appliance (some
          restrictions apply)
        </li>
        <li>
          <strong>Lowe's & Home Depot:</strong> $30-50 haul-away service with new appliance purchase
        </li>
        <li>
          <strong>Local appliance stores:</strong> Many offer take-back programs
        </li>
      </ul>

      <h3>3. Utility Company Rebate Programs</h3>
      <p>
        Vectren Energy Delivery offers appliance recycling rebates for energy-efficient upgrades.
        Check their current programs for refrigerators and freezers—you may qualify for $25-50
        rebates plus free pickup.
      </p>

      <h3>4. City of Evansville Bulk Pickup</h3>
      <p>
        The city offers twice-yearly bulk waste pickup that includes appliances. However, this
        option:
      </p>
      <ul>
        <li>Requires waiting for scheduled pickup dates</li>
        <li>Appliances must be placed at curb (you handle the heavy lifting)</li>
        <li>Weather exposure can damage property or create hazards</li>
        <li>Not ideal for immediate disposal needs</li>
      </ul>

      <h2>What Appliances Can Be Recycled?</h2>

      <h3>Refrigeration Appliances</h3>
      <ul>
        <li>Refrigerators and freezers</li>
        <li>Wine coolers</li>
        <li>Dehumidifiers</li>
        <li>Air conditioners (window and portable units)</li>
      </ul>

      <h3>Large Appliances</h3>
      <ul>
        <li>Washing machines and dryers</li>
        <li>Dishwashers</li>
        <li>Stoves and ranges (electric and gas)</li>
        <li>Water heaters</li>
        <li>Microwaves</li>
      </ul>

      <h3>Small Appliances</h3>
      <ul>
        <li>Toasters and toaster ovens</li>
        <li>Coffee makers</li>
        <li>Blenders and food processors</li>
        <li>Vacuum cleaners</li>
      </ul>

      <h2>Preparation for Appliance Removal</h2>

      <h3>Before Scheduling Pickup:</h3>
      <ol>
        <li>
          <strong>Empty completely:</strong> Remove all food, shelves, and drawers
        </li>
        <li>
          <strong>Disconnect safely:</strong> Unplug from electrical outlet; shut off water/gas if
          applicable
        </li>
        <li>
          <strong>Defrost if needed:</strong> Refrigerators and freezers should be defrosted 24
          hours before pickup
        </li>
        <li>
          <strong>Clean interior:</strong> Helps prevent odors and makes handling easier
        </li>
        <li>
          <strong>Clear path:</strong> Ensure clear route from appliance location to exit
        </li>
        <li>
          <strong>Measure doorways:</strong> Large appliances may need doors removed for passage
        </li>
      </ol>

      <h2>The Recycling Process</h2>

      <p>When you choose professional appliance removal, here's what happens:</p>

      <ol>
        <li>
          <strong>Collection:</strong> We remove the appliance from your home
        </li>
        <li>
          <strong>Transportation:</strong> Appliance is transported to certified recycling facility
        </li>
        <li>
          <strong>Refrigerant Recovery:</strong> EPA-certified technicians safely remove and recycle
          refrigerants
        </li>
        <li>
          <strong>Dismantling:</strong> Appliances are broken down into component materials
        </li>
        <li>
          <strong>Material Recovery:</strong> Metals, plastics, and other materials are sorted and
          sent for recycling
        </li>
        <li>
          <strong>Proper Disposal:</strong> Any non-recyclable components are disposed of according
          to regulations
        </li>
      </ol>

      <h2>Environmental Benefits by the Numbers</h2>
      <ul>
        <li>
          <strong>Steel recycling:</strong> Saves 2,500 pounds of iron ore, 1,400 pounds of coal,
          and 120 pounds of limestone per ton
        </li>
        <li>
          <strong>Aluminum recycling:</strong> Saves 95% of the energy needed to produce new
          aluminum
        </li>
        <li>
          <strong>Copper recycling:</strong> Reduces mining waste and conserves natural resources
        </li>
        <li>
          <strong>Average appliance:</strong> Contains 75% recyclable materials by weight
        </li>
      </ul>

      <div className="my-8 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
        <p className="text-lg font-medium text-gray-900">
          <strong>Bottom Line:</strong> Professional appliance removal in Evansville costs $89-149
          per appliance and ensures proper environmental handling, legal compliance, and convenient
          service. With same-day availability and guaranteed proper disposal, it's the smart choice
          for busy homeowners who care about the environment.
        </p>
      </div>
    </BlogPostTemplate>
  )
}
