import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'
import { buildBlogMetadata } from '@/lib/seo-metadata'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const blogInfo = {
  topic: 'Evansville Junk Removal Tips',
  location: 'Evansville',
  category: 'Local Guide',
  readTime: '8 min',
}

const seoData = buildBlogMetadata(blogInfo)

export const metadata: Metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/blog/evansville-junk-removal-tips', baseUrl),
}

export default function EvansvilleJunkRemovalTipsPage() {
  return (
    <BlogPostTemplate
      meta={{
        title: 'Essential Junk Removal Tips for Evansville Residents',
        excerpt:
          'Local expert tips for efficient, cost-effective junk removal in Evansville, IN. From preparation to disposal, make your cleanout a success.',
        author: 'Uncle Sam Team',
        date: 'January 28, 2025',
        readTime: '8 min read',
        category: 'Local Guide',
        tags: ['Junk Removal', 'Evansville', 'Local Tips', 'Cost Savings'],
      }}
      relatedPosts={[
        {
          title: 'Junk Removal Cost in Tri-State Area',
          href: '/blog/junk-removal-cost-tri-state',
          excerpt: 'Complete pricing guide for junk removal services in the Tri-State area.',
          category: 'Pricing Guide',
        },
        {
          title: 'Garage Cleanout in 48 Hours',
          href: '/blog/evansville-garage-cleanout-48-hours',
          excerpt: 'Step-by-step guide to completely clean out your garage in just 48 hours.',
          category: 'How-To Guide',
        },
      ]}
    >
      <p>
        Whether you're decluttering, moving, or handling an estate cleanout, knowing local
        Evansville resources and best practices can save you time and money. These expert tips help
        you navigate junk removal efficiently.
      </p>

      <h2>Know Evansville's Bulk Pickup Schedule</h2>
      <p>
        The City of Evansville offers bulk pickup twice yearly. Check your neighborhood's schedule
        to save on disposal costs for large items. However, professional removal offers advantages:
      </p>
      <ul>
        <li>
          <strong>Same-day service:</strong> No waiting months for city pickup
        </li>
        <li>
          <strong>Indoor pickup:</strong> We remove items from any location in your home
        </li>
        <li>
          <strong>Weather protection:</strong> No leaving items at curb exposed to elements
        </li>
        <li>
          <strong>Full service:</strong> We do all the heavy lifting
        </li>
      </ul>

      <h2>Prepare Items for Efficient Removal</h2>
      <h3>Make a Clear Path</h3>
      <ul>
        <li>Clear hallways and doorways of obstacles</li>
        <li>Move fragile items out of the way</li>
        <li>Protect floors with cardboard if concerned about scuffs</li>
        <li>Have items gathered in one area when possible</li>
      </ul>

      <h3>Separate Recyclables When Possible</h3>
      <ul>
        <li>
          <strong>Metals:</strong> Appliances, scrap metal, bed frames
        </li>
        <li>
          <strong>Electronics:</strong> TVs, computers, printers
        </li>
        <li>
          <strong>Cardboard:</strong> Boxes, packaging materials
        </li>
        <li>
          <strong>Donations:</strong> Usable furniture, clothing, household items
        </li>
      </ul>

      <h2>Best Donation Options in Evansville</h2>
      <ul>
        <li>
          <strong>Habitat for Humanity ReStore:</strong> 2828 Washington Ave - Accepts furniture,
          appliances, building materials
        </li>
        <li>
          <strong>Goodwill Industries:</strong> Multiple locations - Clothing, household items,
          small furniture
        </li>
        <li>
          <strong>Catholic Charities:</strong> Furniture for families in need
        </li>
        <li>
          <strong>Salvation Army:</strong> Broad acceptance of household goods
        </li>
      </ul>

      <h2>Time Your Project Right</h2>
      <ul>
        <li>
          <strong>Spring & Fall:</strong> Peak seasons for cleanouts, book early
        </li>
        <li>
          <strong>Mid-week:</strong> Often more availability than weekends
        </li>
        <li>
          <strong>Winter months:</strong> Sometimes less busy, may have better availability
        </li>
        <li>
          <strong>Same-day service:</strong> Available for urgent needs
        </li>
      </ul>

      <h2>Cost-Saving Strategies</h2>
      <ul>
        <li>
          <strong>Consolidate pickups:</strong> Combine items into one visit
        </li>
        <li>
          <strong>Sort beforehand:</strong> Donate what you can to reduce volume
        </li>
        <li>
          <strong>Be flexible with timing:</strong> Non-urgent pickups may qualify for discounts
        </li>
        <li>
          <strong>Group with neighbors:</strong> Some companies offer multi-property discounts
        </li>
      </ul>

      <h2>What We Can (and Can't) Take</h2>
      <h3>We Accept:</h3>
      <ul>
        <li>Furniture (sofas, mattresses, dressers)</li>
        <li>Appliances (refrigerators, washers, dryers)</li>
        <li>Electronics (TVs, computers, printers)</li>
        <li>Construction debris (within reason)</li>
        <li>Yard waste and brush</li>
        <li>Hot tubs and sheds (special pricing)</li>
      </ul>

      <h3>We Cannot Accept:</h3>
      <ul>
        <li>Hazardous materials (paint, chemicals, asbestos)</li>
        <li>Tires (take to tire shops)</li>
        <li>Batteries (Lowe's and Home Depot recycle these)</li>
        <li>Concrete and dirt (specialty disposal required)</li>
      </ul>

      <h2>Questions to Ask Before Booking</h2>
      <ol>
        <li>Do you offer same-day or next-day service?</li>
        <li>Are you licensed and insured?</li>
        <li>How do you calculate pricing?</li>
        <li>What's included in your service?</li>
        <li>Do you donate or recycle items?</li>
        <li>Are there items you won't take?</li>
        <li>Do you clean up the area after removal?</li>
      </ol>

      <div className="my-8 rounded-lg border-l-4 border-gray-300 bg-gray-900 p-6">
        <p className="text-foreground text-lg font-medium">
          <strong>Local Pro Tip:</strong> Evansville's twice-yearly bulk pickup is great for small
          projects, but for anything urgent or substantial, professional junk removal saves time and
          hassle. Most local residents find the $89-649 cost worthwhile for the convenience and
          peace of mind.
        </p>
      </div>
    </BlogPostTemplate>
  )
}
