import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { ThemedButton } from '@/components/ui/themed-button'
import { SectionHeader } from '@/components/ui/section-header'
import { Calendar, User, Clock, Recycle, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata: Metadata = {
  title: 'Appliance Disposal & Recycling Guide for Evansville Residents | Uncle Sam Junk Removal',
  description:
    'Learn how to properly dispose of old appliances in Evansville, IN. Recycling options, environmental benefits, and professional removal services.',
  keywords:
    'appliance disposal Evansville, appliance recycling, refrigerator removal, washer dryer disposal, eco-friendly appliance removal',
  ...buildCanonicalMetadata('/blog/appliance-disposal-recycling-guide', baseUrl),
}

export default function ApplianceDisposalGuidePage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <article className="mx-auto max-w-4xl px-4 py-16">
        <header className="mb-12">
          <SectionHeader
            title="Complete Appliance Disposal & Recycling Guide"
            subtitle="Eco-friendly appliance removal and recycling in Evansville and Southern Indiana"
          />

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>November 20, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Mike Thompson, Environmental Specialist</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>10 min read</span>
            </div>
          </div>
        </header>

        <GlassCard className="mb-8 p-8">
          <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg">
            <Image
              src="/appliance-removal-evansville.png"
              alt="Professional appliance removal and recycling"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="mb-6 text-lg text-gray-700">
              When it's time to replace that old refrigerator, washing machine, or other household
              appliance, proper disposal is crucial for both environmental protection and legal
              compliance. This guide covers everything Evansville residents need to know about
              responsible appliance disposal and recycling.
            </p>

            <div className="mb-6 border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex items-start">
                <AlertTriangle className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-yellow-600" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-yellow-800">Important Notice</h3>
                  <p className="text-yellow-700">
                    Many appliances contain refrigerants, oils, and other hazardous materials that
                    require special handling. Never attempt to dismantle appliances yourself or
                    dispose of them in regular trash.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">
              Why Proper Appliance Disposal Matters
            </h2>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">Environmental Impact</h3>
            <ul className="mb-4 list-disc pl-6">
              <li>
                <strong>Refrigerants:</strong> Old refrigerators and air conditioners contain CFCs
                and HCFCs that deplete the ozone layer
              </li>
              <li>
                <strong>Heavy metals:</strong> Lead, mercury, and cadmium can contaminate soil and
                groundwater
              </li>
              <li>
                <strong>Valuable materials:</strong> Steel, copper, and aluminum can be recycled and
                reused
              </li>
              <li>
                <strong>Energy savings:</strong> Recycling appliances saves energy compared to
                manufacturing new materials
              </li>
            </ul>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">Legal Requirements</h3>
            <p className="mb-6">
              The EPA requires proper handling of appliances containing refrigerants. In Indiana,
              it's illegal to dispose of appliances in landfills without first removing refrigerants
              and other hazardous materials.
            </p>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">
              Appliance-Specific Disposal Guidelines
            </h2>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
              🧊 Refrigerators & Freezers
            </h3>
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <p className="mb-3">
                <strong>Special Considerations:</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Must be professionally drained of refrigerants (Freon)</li>
                <li>Doors should be removed to prevent entrapment hazards</li>
                <li>Shelves and drawers can often be recycled separately</li>
                <li>Energy-efficient models may qualify for utility rebates</li>
              </ul>
            </div>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">🌀 Washers & Dryers</h3>
            <div className="mb-4 rounded-lg bg-green-50 p-4">
              <p className="mb-3">
                <strong>Preparation Steps:</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Disconnect all water and electrical connections</li>
                <li>Remove any remaining water from washers</li>
                <li>Clean lint from dryer vents and filters</li>
                <li>Steel drums and motors are highly recyclable</li>
              </ul>
            </div>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">🍽️ Dishwashers</h3>
            <div className="mb-4 rounded-lg bg-purple-50 p-4">
              <p className="mb-3">
                <strong>Removal Process:</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Shut off water and electrical supply</li>
                <li>Disconnect plumbing and drain lines</li>
                <li>Remove mounting brackets and screws</li>
                <li>Stainless steel components are valuable for recycling</li>
              </ul>
            </div>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">🔥 Stoves & Ovens</h3>
            <div className="mb-4 rounded-lg bg-orange-50 p-4">
              <p className="mb-3">
                <strong>Safety First:</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Gas appliances require professional disconnection</li>
                <li>Electric models need proper electrical disconnection</li>
                <li>Cast iron and steel components are highly recyclable</li>
                <li>Glass doors and ceramic surfaces require special handling</li>
              </ul>
            </div>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">
              Recycling Options in Evansville
            </h2>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
              Local Recycling Centers
            </h3>
            <ul className="mb-4 list-disc pl-6">
              <li>
                <strong>Alcoa Warrick Operations:</strong> Accepts aluminum and steel appliances
              </li>
              <li>
                <strong>Republic Services:</strong> Special appliance pickup programs
              </li>
              <li>
                <strong>Scrap metal dealers:</strong> Pay for valuable metals in appliances
              </li>
            </ul>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
              Utility Company Programs
            </h3>
            <p className="mb-4">
              Vectren Energy (now CenterPoint Energy) offers appliance recycling programs with
              rebates for energy-efficient replacements. Check their website for current offers and
              pickup schedules.
            </p>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
              Manufacturer Take-Back Programs
            </h3>
            <p className="mb-6">
              Many appliance manufacturers offer take-back programs when you purchase new
              appliances. Brands like Whirlpool, GE, and Samsung have established recycling
              partnerships.
            </p>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">
              Professional Appliance Removal Services
            </h2>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
              Why Choose Professional Removal?
            </h3>
            <ul className="mb-4 list-disc pl-6">
              <li>
                <strong>Safety:</strong> Proper handling of heavy appliances and hazardous materials
              </li>
              <li>
                <strong>Compliance:</strong> EPA-certified refrigerant recovery
              </li>
              <li>
                <strong>Convenience:</strong> Complete removal from any location in your home
              </li>
              <li>
                <strong>Environmental responsibility:</strong> Guaranteed proper recycling and
                disposal
              </li>
              <li>
                <strong>Property protection:</strong> Insured service with damage protection
              </li>
            </ul>

            <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800">
              What to Expect from Uncle Sam Junk Removal
            </h3>
            <ol className="mb-6 list-decimal pl-6">
              <li>
                <strong>Free estimate:</strong> Upfront pricing with no hidden fees
              </li>
              <li>
                <strong>Scheduled pickup:</strong> Convenient appointment times
              </li>
              <li>
                <strong>Professional removal:</strong> Trained technicians handle all aspects
              </li>
              <li>
                <strong>Eco-friendly disposal:</strong> Maximum recycling and donation when possible
              </li>
              <li>
                <strong>Clean-up:</strong> We leave your space clean and ready to use
              </li>
            </ol>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">Cost Considerations</h2>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-green-50 p-4">
                <h3 className="mb-3 text-lg font-semibold text-green-800">💰 Potential Savings</h3>
                <ul className="list-disc pl-6 text-sm">
                  <li>Utility rebates for old appliances</li>
                  <li>Scrap metal value recovery</li>
                  <li>Tax deductions for donations</li>
                  <li>Avoided disposal fees</li>
                </ul>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="mb-3 text-lg font-semibold text-blue-800">📋 Service Pricing</h3>
                <ul className="list-disc pl-6 text-sm">
                  <li>Single appliance: $75-$150</li>
                  <li>Multiple appliances: Volume discounts</li>
                  <li>Refrigerant recovery: Included</li>
                  <li>Same-day service: Available</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">
              Preparing for Appliance Removal
            </h2>
            <ol className="mb-6 list-decimal pl-6">
              <li>
                <strong>Clear the path:</strong> Ensure easy access to appliances
              </li>
              <li>
                <strong>Disconnect utilities:</strong> Turn off water, gas, and electricity
              </li>
              <li>
                <strong>Remove personal items:</strong> Clean out any remaining contents
              </li>
              <li>
                <strong>Take photos:</strong> Document condition for insurance if needed
              </li>
              <li>
                <strong>Schedule pickup:</strong> Book your removal appointment
              </li>
            </ol>
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <div className="mb-4 flex items-center justify-center">
            <Recycle className="mr-3 h-8 w-8 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Ready to Recycle Your Appliances?</h3>
          </div>
          <p className="mb-6 text-gray-600">
            Let Uncle Sam Junk Removal handle your appliance disposal with guaranteed eco-friendly
            recycling.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <ThemedButton asChild theme="blue" size="lg">
              <a href="/services/appliance-removal">Schedule Appliance Removal</a>
            </ThemedButton>
            <ThemedButton asChild theme="green" variant="outline" size="lg">
              <a href="/quote">Get Free Quote</a>
            </ThemedButton>
          </div>
        </GlassCard>
      </article>
    </div>
  )
}
