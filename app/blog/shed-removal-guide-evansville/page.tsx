import type { Metadata } from 'next'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildSocialMetadata } from '@/lib/seo-metadata'
import { BlogPostTemplate } from '@/components/ui/blog-post-template'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Shed Removal Evansville: Permits & Pricing | Uncle Sam',
  description:
    "From permits to pricing, here's how to plan a smooth shed removal in Evansville, including timeline expectations.",
  ...buildSocialMetadata({
    title: 'Shed Removal Evansville: Permits & Pricing | Uncle Sam',
    description:
      "From permits to pricing, here's how to plan a smooth shed removal in Evansville, including timeline expectations.",
    pathname: '/blog/shed-removal-guide-evansville',
    type: 'article',
  }),
  ...buildCanonicalMetadata('/blog/shed-removal-guide-evansville', baseUrl),
}

export default function ShedRemovalGuideBlog() {
  return (
    <BlogPostTemplate
      canonicalUrl={`${baseUrl}/blog/shed-removal-guide-evansville`}
      meta={{
        title: 'Shed Removal in Evansville: Permit Tips, Pricing, and Timeline',
        excerpt:
          "From permits to pricing, here's how to plan a smooth shed removal in Evansville, including timeline expectations.",
        author: 'Uncle Sam Team',
        date: 'January 22, 2025',
        readTime: '7 min read',
        category: 'Light Demolition',
        tags: ['Shed Removal', 'Permits', 'Demolition', 'Evansville'],
      }}
      relatedPosts={[
        {
          title: 'Hot Tub Removal: What to Know Before We Arrive',
          href: '/blog/hot-tub-removal-what-to-know',
          excerpt:
            'Essential preparation steps for hot tub removal including electrical disconnection and access requirements.',
          category: 'Service Guide',
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
        Most small sheds under 200 sq ft don't require permits in many jurisdictions, but always
        check local rules. Expect $289–649 for removal depending on size, materials, access, and
        whether concrete pads need demo.
      </p>

      <h2>Quick Planning Checklist</h2>
      <ul>
        <li>Empty the shed beforehand or ask for a cleanout quote</li>
        <li>Confirm utility disconnections (electric)</li>
        <li>Clear a 4-foot access path to the structure</li>
      </ul>

      <h2>Permit Requirements in Evansville</h2>
      <p>
        Before beginning your shed removal project, it's important to understand local permit
        requirements. While many small structures don't require permits for removal, larger sheds or
        those connected to utilities may have different requirements.
      </p>

      <h2>Pricing Factors</h2>
      <p>Several factors influence the cost of shed removal:</p>
      <ul>
        <li>
          <strong>Size:</strong> Larger sheds require more labor and disposal capacity
        </li>
        <li>
          <strong>Materials:</strong> Wood sheds are typically easier to dismantle than metal ones
        </li>
        <li>
          <strong>Access:</strong> Easy access reduces labor time and costs
        </li>
        <li>
          <strong>Foundation:</strong> Concrete pad removal adds to the total cost
        </li>
        <li>
          <strong>Contents:</strong> Empty sheds are faster and cheaper to remove
        </li>
      </ul>

      <h2>Timeline Expectations</h2>
      <p>
        Most shed removals can be completed in a single day. The process typically involves
        dismantling the structure, loading materials, and hauling away debris. Larger sheds or those
        with concrete foundations may take longer.
      </p>

      <div className="my-8 rounded-lg border-l-4 border-gray-300 bg-gray-800 p-6">
        <p className="text-foreground text-lg font-medium">
          <strong>Pro Tip:</strong> Prepare for tear-down day with clear access, utility checks, and
          a plan for debris disposal to ensure a smooth, efficient removal process.
        </p>
      </div>
    </BlogPostTemplate>
  )
}
