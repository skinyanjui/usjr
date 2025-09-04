import type { Metadata } from "next"
import { GlassCard } from "@/components/ui/glass-card"
import { ThemedButton } from "@/components/ui/themed-button"
import { SectionHeader } from "@/components/ui/section-header"
import { Calendar, User, Clock } from "lucide-react"
import Image from "next/image"
import { settings } from "@/lib/cms-content"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Complete Dumpster Rental Guide for Evansville Residents | Uncle Sam Junk Removal",
  description:
    "Everything you need to know about dumpster rental in Evansville, IN. Sizes, pricing, permits, and tips for your next project.",
  keywords: "dumpster rental Evansville, dumpster sizes, construction dumpster, home renovation, Evansville permits",
  ...buildCanonicalMetadata("/blog/dumpster-rental-guide-evansville", baseUrl),
}

export default function DumpsterRentalGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
                      <SectionHeader
              title="Complete Dumpster Rental Guide for Evansville Residents"
              subtitle="Everything you need to know about choosing the right dumpster for your project"
            />

          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>December 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Uncle Sam Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </div>
        </header>

        <GlassCard className="p-8 mb-8">
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
            <Image
              src="/dumpster-rental-evansville.png"
              alt="Dumpster rental options in Evansville"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              After 8+ years of dumpster rentals in Evansville and handling over 3,000 local projects, we've learned that choosing the right dumpster size and understanding local requirements can save you hundreds of dollars and weeks of frustration. This guide shares insider knowledge from our experience with everything from small Franklin Street renovations to large commercial projects in downtown Evansville.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Local Expert Tip</h3>
              <p className="text-orange-700">
                Most Evansville homeowners overestimate the dumpster size they need. In our experience, 90% of residential projects use either a 15-yard or 20-yard dumpster. Starting smaller often saves money and you can always upgrade if needed.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Right-Sizing Your Dumpster: Real Evansville Project Examples</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10-Yard Dumpster</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Real project:</strong> Westside bathroom remodel (tub, vanity, toilet, flooring)</li>
              <li><strong>Holds:</strong> 3-5 pickup truck loads</li>
              <li><strong>Dimensions:</strong> 12' L x 8' W x 3.5' H (fits in most driveways)</li>
              <li><strong>Best for:</strong> Single-room projects, garage cleanouts, small landscaping jobs</li>
              <li><strong>Local pricing:</strong> $299-349/week including delivery, pickup, and disposal</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15-Yard Dumpster (Most Popular)</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Real project:</strong> Jacobsville kitchen renovation (cabinets, counters, appliances, flooring)</li>
              <li><strong>Holds:</strong> 4-6 pickup truck loads</li>
              <li><strong>Dimensions:</strong> 16' L x 8' W x 4' H</li>
              <li><strong>Best for:</strong> Medium renovations, basement cleanouts, deck removal</li>
              <li><strong>Local pricing:</strong> $349-399/week</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">20-Yard Dumpster</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Real project:</strong> Haynie's Corner whole-house flooring replacement</li>
              <li><strong>Holds:</strong> 6-8 pickup truck loads</li>
              <li><strong>Dimensions:</strong> 22' L x 8' W x 4.5' H</li>
              <li><strong>Best for:</strong> Large renovations, roof replacements, estate cleanouts</li>
              <li><strong>Local pricing:</strong> $399-449/week</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">30-Yard Dumpster</h3>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Real project:</strong> New construction in McCutchanville subdivision</li>
              <li><strong>Holds:</strong> 9-12 pickup truck loads</li>
              <li><strong>Dimensions:</strong> 22' L x 8' W x 6' H</li>
              <li><strong>Best for:</strong> New construction, major commercial projects, multi-room renovations</li>
              <li><strong>Local pricing:</strong> $499-599/week</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Navigating Evansville Permit Requirements (Based on 8+ Years of Local Experience)</h2>
            <p className="mb-4">
              Here's what we've learned working with the City of Evansville on hundreds of projects: Most residential dumpster rentals DON'T require permits if placed on your private property. However, Evansville's permit requirements depend on specific location factors we've encountered repeatedly.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">No Permit Needed:</h3>
              <ul className="list-disc pl-6 text-blue-700">
                <li>Dumpster placed entirely on your private property (driveway, yard)</li>
                <li>Doesn't block sidewalks or interfere with city utilities</li>
                <li>Standard residential rental periods (7-14 days)</li>
                <li>Projects in established neighborhoods (most of Evansville)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Permit Required:</h3>
              <ul className="list-disc pl-6 text-yellow-700">
                <li>Any part of dumpster on city streets or right-of-way</li>
                <li>Downtown Evansville projects (Main Street, Riverside Drive area)</li>
                <li>Historic districts like Riverside or near Angel Mounds</li>
                <li>Commercial construction projects over $10,000</li>
                <li>Projects blocking bike lanes or bus routes</li>
              </ul>
            </div>

            <p className="mb-4">
              <strong>Permit costs:</strong> $25-50 depending on location and duration. We can help coordinate permits, though permit fees are additional. Processing typically takes 2-3 business days, so plan ahead.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Can and Cannot Go in Your Dumpster</h2>

            <h3 className="text-xl font-semibold text-green-700 mt-6 mb-3">✓ Accepted Materials:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Construction debris (wood, drywall, concrete)</li>
              <li>Household furniture and appliances</li>
              <li>Yard waste and landscaping debris</li>
              <li>Roofing materials (shingles, gutters)</li>
              <li>Flooring materials (carpet, tile, hardwood)</li>
            </ul>

            <h3 className="text-xl font-semibold text-red-700 mt-6 mb-3">✗ Prohibited Items:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Hazardous materials (paint, chemicals, asbestos)</li>
              <li>Electronics and batteries</li>
              <li>Tires and automotive fluids</li>
              <li>Medical waste</li>
              <li>Propane tanks</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Insider Tips for Maximizing Your Dumpster Rental Value</h2>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Pro Loading Strategies (Learned from 3,000+ Evansville Projects):</h3>
              <ol className="list-decimal pl-6 text-green-700">
                <li className="mb-2"><strong>Load heavy items first:</strong> Concrete, drywall, and appliances go in the bottom</li>
                <li className="mb-2"><strong>Break down large items:</strong> Disassemble furniture to maximize space</li>
                <li className="mb-2"><strong>Fill gaps with debris:</strong> Use small items to fill spaces around larger pieces</li>
                <li className="mb-2"><strong>Distribute weight evenly:</strong> Don't load all heavy items on one side</li>
                <li className="mb-2"><strong>Save lightweight items for last:</strong> Insulation, carpeting on top</li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Timing Your Rental for Best Results:</h3>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Order 2-3 days ahead:</strong> Especially during busy seasons (spring/summer)</li>
              <li><strong>Schedule delivery for project start:</strong> Don't pay for days you're not using it</li>
              <li><strong>Consider weather:</strong> Wet materials weigh more and may incur overage fees</li>
              <li><strong>Plan pickup timing:</strong> Have dumpster ready for pickup to avoid extension fees</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Protecting Your Evansville Property:</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>We provide plywood boards to protect asphalt driveways (required in hot weather)</li>
              <li>Choose level placement areas to prevent settling or damage</li>
              <li>Clear overhead obstacles (tree branches, power lines) for safe delivery</li>
              <li>Mark sprinkler systems and underground utilities before delivery</li>
              <li>Keep dumpster accessible for our pickup truck (40+ feet of clearance needed)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Local Evansville Experience Matters for Dumpster Rentals</h2>
            <p className="mb-4">
              After 8+ years serving Evansville and handling everything from small Westside home projects to major downtown construction jobs, we've learned that local expertise makes a significant difference in project success and cost control.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Our Local Advantages:</h3>
                <ul className="list-disc pl-6 text-blue-700 space-y-1">
                  <li>Know all Evansville neighborhood permit requirements</li>
                  <li>Established relationships with local recycling centers</li>
                  <li>Understand seasonal demand and optimal pricing</li>
                  <li>Quick response times across all Evansville areas</li>
                  <li>Familiar with local disposal regulations and fees</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Customer Benefits:</h3>
                <ul className="list-disc pl-6 text-green-700 space-y-1">
                  <li>Transparent pricing with no hidden fees</li>
                  <li>Same-day delivery available in most areas</li>
                  <li>Eco-friendly disposal through local partnerships</li>
                  <li>Personal service from owner-operated business</li>
                  <li>Comprehensive insurance and local licensing</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Real Customer Success Story:</h3>
              <p className="text-gray-700 italic">
                "We were renovating our Jacobsville home and called three companies for quotes. Uncle Sam was the only one who knew we'd need a permit for street placement due to our narrow driveway. They handled the permit process and saved us a $150 city fine that we would have gotten with other companies. Their local knowledge was worth every penny." - Sarah M., Jacobsville
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Rent a Dumpster?</h3>
          <p className="text-gray-600 mb-6">
            Get your free quote today and let us help you choose the perfect dumpster size for your Evansville project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton asChild theme="orange" size="lg">
              <a href="/quote">Get Free Quote</a>
            </ThemedButton>
            <ThemedButton asChild theme="blue" variant="outline" size="lg">
              <a href={`tel:${settings.phoneE164}`}>Call {settings.phone}</a>
            </ThemedButton>
          </div>
        </GlassCard>
      </article>
    </div>
  )
}
