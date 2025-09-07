import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { SectionHeader } from '@/components/ui/section-header'
import Image from 'next/image'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Compassionate Estate Cleanout Guide | Step-by-Step Planning | Uncle Sam Junk Removal',
  description:
    'Comprehensive estate cleanout guide with 8+ years of experience. Step-by-step planning, local donation options, legal considerations, and emotional support strategies for Southern Indiana families.',
  keywords:
    'estate cleanout, estate planning, donation options Evansville, family estate cleanup, compassionate cleanout service, probate cleanout',
  ...buildCanonicalMetadata('/blog/estate-cleanout-guide', baseUrl),
}

export default function EstateCleanoutGuideBlog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <article className="mx-auto max-w-4xl px-4 py-16">
        <SectionHeader
          title="Estate cleanout guide: compassionate planning and donation options"
          subtitle="Supportive steps during a difficult time"
        />
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg">
          <Image
            src="/estate-cleanout-evansville.png"
            alt="Estate cleanout planning and donation options"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <SectionHeader
          title="Compassionate Estate Cleanout Guide: Honoring Memory While Moving Forward"
          subtitle="Professional guidance from 8+ years of helping Southern Indiana families through difficult transitions"
        />

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>📅 January 24, 2025</span>
          <span>👤 Uncle Sam Team</span>
          <span>🕒 12 min read</span>
          <span>💚 Based on 200+ estate cleanouts</span>
        </div>

        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg">
          <Image
            src="/estate-cleanout-evansville.png"
            alt="Compassionate estate cleanout service with dignity and respect"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <GlassCard className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 text-lg text-gray-700">
              After helping over 200 Southern Indiana families through estate cleanouts, we
              understand that this process is about much more than clearing belongings—it's about
              honoring a lifetime of memories while helping families move forward during one of
              life's most difficult transitions. This comprehensive guide shares what we've learned
              about handling estate cleanouts with dignity, efficiency, and care.
            </p>

            <div className="mb-8 border-l-4 border-blue-400 bg-blue-50 p-6">
              <h3 className="mb-2 text-lg font-semibold text-blue-800">Our Promise to Families</h3>
              <p className="text-blue-700">
                We treat every estate cleanout with the same respect and care we'd want for our own
                family's belongings. We're here to support you, not rush you, through this emotional
                process.
              </p>
            </div>

            <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-900">
              Phase 1: Emotional and Legal Preparation (Week 1-2)
            </h2>

            <h3 className="mt-6 mb-4 text-xl font-semibold text-gray-800">
              Give Yourself Time to Grieve
            </h3>
            <p className="mb-4">
              The most important advice we give families is this: don't rush. We've seen families
              regret hasty decisions made in the immediate aftermath of loss. If possible, wait at
              least a few weeks before beginning major cleanout decisions. Secure the property,
              gather important documents, but allow yourself emotional space.
            </p>

            <div className="mb-6 rounded-lg bg-yellow-50 p-6">
              <h4 className="mb-2 font-semibold text-yellow-800">Essential First Steps:</h4>
              <ul className="list-disc space-y-1 pl-6 text-yellow-700">
                <li>
                  Secure all important documents (will, insurance policies, deeds, financial
                  records)
                </li>
                <li>Change locks and ensure property security</li>
                <li>Notify utilities and insurance companies</li>
                <li>Check for family heirlooms or items specifically mentioned in wills</li>
                <li>Take photos of valuable or sentimental items for family discussions</li>
              </ul>
            </div>

            <h3 className="mt-6 mb-4 text-xl font-semibold text-gray-800">
              Understanding Legal Requirements
            </h3>
            <p className="mb-4">
              In Indiana, probate law affects what can be removed and when. We recommend consulting
              with the estate attorney before beginning major cleanouts. Generally, you'll need:
            </p>
            <ul className="mb-6 list-disc space-y-1 pl-6">
              <li>Letter of administration or executor authority</li>
              <li>Clear understanding of what items are specifically bequeathed</li>
              <li>Documentation for valuable items (for estate tax purposes)</li>
              <li>
                Approval from all beneficiaries for disposal of items not specifically mentioned
              </li>
            </ul>

            <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-900">
              Phase 2: Family Communication and Planning (Week 2-4)
            </h2>

            <h3 className="mt-6 mb-4 text-xl font-semibold text-gray-800">
              The Family Meeting Approach
            </h3>
            <p className="mb-4">
              We've found that successful estate cleanouts always involve clear family
              communication. Schedule a family meeting (in-person or virtual) before anyone begins
              removing items. Our experience shows this prevents misunderstandings and hurt feelings
              later.
            </p>

            <div className="mb-6 rounded-lg bg-green-50 p-6">
              <h4 className="mb-2 font-semibold text-green-800">
                Recommended Family Meeting Agenda:
              </h4>
              <ol className="list-decimal space-y-2 pl-6 text-green-700">
                <li>Review will and specific bequests</li>
                <li>Identify items with strong sentimental value to family members</li>
                <li>
                  Discuss donation preferences (local charities, causes important to deceased)
                </li>
                <li>Set timeline and assign responsibilities</li>
                <li>Agree on professional services needed (cleanout, appraisal, etc.)</li>
                <li>Plan for items that multiple people want</li>
              </ol>
            </div>

            <h3 className="mt-6 mb-4 text-xl font-semibold text-gray-800">
              Creating a Systematic Approach
            </h3>
            <p className="mb-4">
              Based on our experience with hundreds of estates, we recommend a room-by-room,
              category-based approach:
            </p>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-800">Start with These Areas:</h4>
                <ul className="list-disc space-y-1 pl-6 text-gray-700">
                  <li>Master bedroom (documents, jewelry, personal items)</li>
                  <li>Home office (financial records, important papers)</li>
                  <li>Kitchen (family recipes, special dishes)</li>
                  <li>Living areas (photographs, books, collections)</li>
                </ul>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 font-semibold text-gray-800">Save for Later:</h4>
                <ul className="list-disc space-y-1 pl-6 text-gray-700">
                  <li>Basement and attic (often overwhelming)</li>
                  <li>Garage and outbuildings</li>
                  <li>Workshop areas with tools and equipment</li>
                  <li>Areas with delayed emotional impact</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-900">
              Phase 3: Sorting and Decision Making
            </h2>

            <h3 className="mt-6 mb-4 text-xl font-semibold text-gray-800">
              The Five-Category System
            </h3>
            <p className="mb-4">
              We teach families our proven five-category sorting system, refined through years of
              estate work:
            </p>

            <div className="mb-6 space-y-4">
              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-blue-800">1. Keep (Family)</h4>
                <p className="text-gray-700">
                  Items with sentimental value or practical use for family members
                </p>
              </div>
              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="font-semibold text-green-800">2. Donate (Good Condition)</h4>
                <p className="text-gray-700">
                  Usable items that can benefit others in the community
                </p>
              </div>
              <div className="border-l-4 border-purple-400 pl-4">
                <h4 className="font-semibold text-purple-800">3. Sell (Valuable)</h4>
                <p className="text-gray-700">Items with significant monetary value worth selling</p>
              </div>
              <div className="border-l-4 border-orange-400 pl-4">
                <h4 className="font-semibold text-orange-800">4. Recycle</h4>
                <p className="text-gray-700">
                  Materials that can be recycled rather than thrown away
                </p>
              </div>
              <div className="border-l-4 border-gray-400 pl-4">
                <h4 className="font-semibold text-gray-800">5. Dispose</h4>
                <p className="text-gray-700">Items that cannot be reused, donated, or recycled</p>
              </div>
            </div>

            <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-900">
              Local Southern Indiana Donation and Recycling Options
            </h2>

            <p className="mb-6">
              After working with local charities for 8+ years, we've built strong relationships that
              benefit families during estate cleanouts. Here are our trusted local partners:
            </p>

            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-blue-800">
                  Furniture & Household Items
                </h3>
                <ul className="space-y-3">
                  <li>
                    <strong>Habitat for Humanity ReStore</strong>
                    <br />
                    <span className="text-sm text-blue-700">
                      2828 Washington Ave, Evansville
                      <br />
                      Furniture, appliances, building materials
                    </span>
                  </li>
                  <li>
                    <strong>Goodwill Industries</strong>
                    <br />
                    <span className="text-sm text-blue-700">
                      Multiple locations
                      <br />
                      Clothing, household items, electronics
                    </span>
                  </li>
                  <li>
                    <strong>Catholic Charities</strong>
                    <br />
                    <span className="text-sm text-blue-700">
                      Furniture bank for families in need
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-green-800">Specialized Items</h3>
                <ul className="space-y-3">
                  <li>
                    <strong>Books & Media</strong>
                    <br />
                    <span className="text-sm text-green-700">
                      Evansville Library, local schools
                    </span>
                  </li>
                  <li>
                    <strong>Medical Equipment</strong>
                    <br />
                    <span className="text-sm text-green-700">Area churches, senior centers</span>
                  </li>
                  <li>
                    <strong>Art & Collectibles</strong>
                    <br />
                    <span className="text-sm text-green-700">
                      Local museums, schools, community centers
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-900">
              When to Call Professionals
            </h2>

            <p className="mb-4">
              While families can handle much of the sorting themselves, professional help becomes
              valuable when:
            </p>

            <ul className="mb-6 list-disc space-y-2 pl-6">
              <li>The volume is overwhelming (40+ years of accumulation)</li>
              <li>Family members live far from the estate property</li>
              <li>There are safety concerns (hoarding, structural issues, hazardous materials)</li>
              <li>Time constraints require quick completion</li>
              <li>Emotional difficulty makes progress slow</li>
              <li>Heavy items need removal (furniture, appliances, exercise equipment)</li>
            </ul>

            <div className="mb-8 border-l-4 border-red-400 bg-red-50 p-6">
              <h3 className="mb-2 text-lg font-semibold text-red-800">
                Our Estate Cleanout Process
              </h3>
              <p className="mb-3 text-red-700">
                We've developed a compassionate, systematic approach based on years of family
                feedback:
              </p>
              <ol className="list-decimal space-y-1 pl-6 text-red-700">
                <li>Initial consultation to understand family wishes and timeline</li>
                <li>Careful sorting with family oversight and approval</li>
                <li>Coordination with local charities for maximum donation impact</li>
                <li>Proper recycling and environmentally responsible disposal</li>
                <li>Final cleaning and property preparation if needed</li>
                <li>Documentation and receipts for tax purposes</li>
              </ol>
            </div>

            <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-900">
              Handling Emotional Challenges
            </h2>

            <p className="mb-4">
              In our experience, emotional challenges often arise unexpectedly during estate
              cleanouts. Here's what we've learned about supporting families through difficult
              moments:
            </p>

            <div className="mb-6 rounded-lg bg-purple-50 p-6">
              <h4 className="mb-2 font-semibold text-purple-800">Common Emotional Triggers:</h4>
              <ul className="list-disc space-y-1 pl-6 text-purple-700">
                <li>Finding unexpected personal items (letters, photos, journals)</li>
                <li>Discovering items that bring back specific memories</li>
                <li>Family disagreements about sentimental items</li>
                <li>Feeling guilty about "getting rid of" someone's belongings</li>
                <li>Overwhelm from the sheer volume of items</li>
              </ul>
            </div>

            <h3 className="mt-6 mb-4 text-xl font-semibold text-gray-800">
              Practical Emotional Support Strategies:
            </h3>
            <ul className="mb-6 list-disc space-y-2 pl-6">
              <li>
                <strong>Take breaks:</strong> Don't try to complete everything in one weekend
              </li>
              <li>
                <strong>Bring support:</strong> Have friends or family members present for emotional
                support
              </li>
              <li>
                <strong>Honor memories:</strong> Create a memory box or photo album of special items
              </li>
              <li>
                <strong>Share stories:</strong> Talk about memories associated with items as you
                sort
              </li>
              <li>
                <strong>Consider timing:</strong> Avoid anniversaries or emotionally difficult dates
              </li>
              <li>
                <strong>Practice self-care:</strong> Plan pleasant activities between sorting
                sessions
              </li>
            </ul>

            <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-900">
              Final Thoughts: Honoring a Life Well-Lived
            </h2>

            <p className="mb-6">
              After helping hundreds of Southern Indiana families through estate cleanouts, we've
              learned that this process, while difficult, can also be healing. It's an opportunity
              to honor someone's life, share memories with family, and ensure that their belongings
              continue to serve others in the community.
            </p>

            <p className="mb-6">
              Remember that there's no "right" timeline for this process. Some families complete
              estate cleanouts in a few weeks, others take months. What matters is moving at a pace
              that feels respectful to your loved one's memory and manageable for your family's
              emotional well-being.
            </p>

            <div className="rounded-lg bg-gray-100 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">How We Can Help</h3>
              <p className="mb-4 text-gray-700">
                Uncle Sam Junk Removal specializes in compassionate estate cleanouts. We work at
                your pace, respect your family's wishes, and ensure that as many items as possible
                find new life through donations to local Southern Indiana charities.
              </p>
              <p className="text-gray-700">
                Whether you need help with the entire process or just the final removal and disposal
                phase, we're here to support your family during this difficult time.
              </p>
            </div>
          </div>
        </GlassCard>
      </article>
    </div>
  )
}
