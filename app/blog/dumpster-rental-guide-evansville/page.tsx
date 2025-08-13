import type { Metadata } from "next"
import { GlassCard } from "@/components/ui/glass-card"
import { ThemedButton } from "@/components/ui/themed-button"
import { SectionHeader } from "@/components/ui/section-header"
import { Calendar, User, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Complete Dumpster Rental Guide for Evansville Residents | Uncle Sam Junk Removal",
  description:
    "Everything you need to know about dumpster rental in Evansville, IN. Sizes, pricing, permits, and tips for your next project.",
  keywords: "dumpster rental Evansville, dumpster sizes, construction dumpster, home renovation, Evansville permits",
}

export default function DumpsterRentalGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
          <SectionHeader
            title="Complete Dumpster Rental Guide for Evansville Residents"
            subtitle="Everything you need to know about choosing the right dumpster for your project"
            theme="orange"
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
          <img
            src="/dumpster-rental-evansville.png"
            alt="Dumpster rental options in Evansville"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Planning a home renovation, construction project, or major cleanout in Evansville? Choosing the right
              dumpster rental can make or break your project timeline and budget. This comprehensive guide covers
              everything you need to know about dumpster rentals in the Tri-State area.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Dumpster Sizes and Capacity</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10-Yard Dumpster</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Perfect for: Small bathroom renovations, garage cleanouts, minor landscaping</li>
              <li>Holds: 3-5 pickup truck loads</li>
              <li>Dimensions: 12' L x 8' W x 3.5' H</li>
              <li>Price: Starting at $299/week</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">20-Yard Dumpster</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Perfect for: Kitchen renovations, flooring projects, deck removal</li>
              <li>Holds: 6-8 pickup truck loads</li>
              <li>Dimensions: 22' L x 8' W x 4.5' H</li>
              <li>Price: Starting at $399/week</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">30-Yard Dumpster</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Perfect for: Whole home cleanouts, large renovations, new construction</li>
              <li>Holds: 9-12 pickup truck loads</li>
              <li>Dimensions: 22' L x 8' W x 6' H</li>
              <li>Price: Starting at $499/week</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">40-Yard Dumpster</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Perfect for: Commercial projects, large construction sites</li>
              <li>Holds: 12-16 pickup truck loads</li>
              <li>Dimensions: 22' L x 8' W x 8' H</li>
              <li>Price: Starting at $599/week</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Evansville Permit Requirements</h2>
            <p className="mb-4">
              In most cases, you won't need a permit if the dumpster is placed on your private property. However, if you
              need to place the dumpster on a public street or right-of-way in Evansville, you'll need to obtain a
              permit from the City of Evansville.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">When You Need a Permit:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Dumpster placement on city streets</li>
              <li>Blocking sidewalks or bike lanes</li>
              <li>Extended rental periods (over 30 days)</li>
              <li>Commercial construction projects</li>
            </ul>

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

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Maximizing Your Dumpster Rental</h2>
            <ol className="list-decimal pl-6 mb-6">
              <li className="mb-2">
                <strong>Plan ahead:</strong> Schedule delivery 2-3 days before you need it
              </li>
              <li className="mb-2">
                <strong>Load efficiently:</strong> Break down large items and fill gaps with smaller debris
              </li>
              <li className="mb-2">
                <strong>Stay within weight limits:</strong> Heavy materials like concrete have lower weight limits
              </li>
              <li className="mb-2">
                <strong>Keep it accessible:</strong> Ensure our truck can easily reach the dumpster for pickup
              </li>
              <li className="mb-2">
                <strong>Protect your property:</strong> We provide boards to protect driveways and landscaping
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Uncle Sam Junk Removal?</h2>
            <p className="mb-4">
              As a locally owned business serving Evansville and Southern Indiana for over 10 years, we understand the
              unique needs of our community. Our transparent pricing, reliable service, and commitment to eco-friendly
              disposal make us the preferred choice for dumpster rentals in the Tri-State area.
            </p>

            <ul className="list-disc pl-6 mb-6">
              <li>Same-day and next-day delivery available</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Eco-friendly disposal and recycling</li>
              <li>Local expertise and personalized service</li>
              <li>Fully licensed and insured</li>
            </ul>
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Rent a Dumpster?</h3>
          <p className="text-gray-600 mb-6">
            Get your free quote today and let us help you choose the perfect dumpster size for your Evansville project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton theme="orange" size="lg" href="/quote">
              Get Free Quote
            </ThemedButton>
            <ThemedButton theme="blue" variant="outline" size="lg" href="tel:812-555-0123">
              Call (812) 555-0123
            </ThemedButton>
          </div>
        </GlassCard>
      </article>
    </div>
  )
}
