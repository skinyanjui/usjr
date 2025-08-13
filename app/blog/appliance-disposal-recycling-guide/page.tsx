import type { Metadata } from "next"
import { GlassCard } from "@/components/ui/glass-card"
import { ThemedButton } from "@/components/ui/themed-button"
import { SectionHeader } from "@/components/ui/section-header"
import { Calendar, User, Clock, Recycle, AlertTriangle } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Appliance Disposal & Recycling Guide for Evansville Residents | Uncle Sam Junk Removal",
  description:
    "Learn how to properly dispose of old appliances in Evansville, IN. Recycling options, environmental benefits, and professional removal services.",
  keywords:
    "appliance disposal Evansville, appliance recycling, refrigerator removal, washer dryer disposal, eco-friendly appliance removal",
}

export default function ApplianceDisposalGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
          <SectionHeader
            title="Complete Appliance Disposal & Recycling Guide"
            subtitle="Eco-friendly appliance removal and recycling in Evansville and Southern Indiana"
            theme="blue"
          />

          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>November 20, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Mike Thompson, Environmental Specialist</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10 min read</span>
            </div>
          </div>
        </header>

        <GlassCard className="p-8 mb-8">
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
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
            <p className="text-lg text-gray-700 mb-6">
              When it's time to replace that old refrigerator, washing machine, or other household appliance, proper
              disposal is crucial for both environmental protection and legal compliance. This guide covers everything
              Evansville residents need to know about responsible appliance disposal and recycling.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700">
                    Many appliances contain refrigerants, oils, and other hazardous materials that require special
                    handling. Never attempt to dismantle appliances yourself or dispose of them in regular trash.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Proper Appliance Disposal Matters</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Environmental Impact</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Refrigerants:</strong> Old refrigerators and air conditioners contain CFCs and HCFCs that
                deplete the ozone layer
              </li>
              <li>
                <strong>Heavy metals:</strong> Lead, mercury, and cadmium can contaminate soil and groundwater
              </li>
              <li>
                <strong>Valuable materials:</strong> Steel, copper, and aluminum can be recycled and reused
              </li>
              <li>
                <strong>Energy savings:</strong> Recycling appliances saves energy compared to manufacturing new
                materials
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Legal Requirements</h3>
            <p className="mb-6">
              The EPA requires proper handling of appliances containing refrigerants. In Indiana, it's illegal to
              dispose of appliances in landfills without first removing refrigerants and other hazardous materials.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Appliance-Specific Disposal Guidelines</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">🧊 Refrigerators & Freezers</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
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

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">🌀 Washers & Dryers</h3>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
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

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">🍽️ Dishwashers</h3>
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
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

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">🔥 Stoves & Ovens</h3>
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
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

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Recycling Options in Evansville</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Local Recycling Centers</h3>
            <ul className="list-disc pl-6 mb-4">
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

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Utility Company Programs</h3>
            <p className="mb-4">
              Vectren Energy (now CenterPoint Energy) offers appliance recycling programs with rebates for
              energy-efficient replacements. Check their website for current offers and pickup schedules.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Manufacturer Take-Back Programs</h3>
            <p className="mb-6">
              Many appliance manufacturers offer take-back programs when you purchase new appliances. Brands like
              Whirlpool, GE, and Samsung have established recycling partnerships.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Professional Appliance Removal Services</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Why Choose Professional Removal?</h3>
            <ul className="list-disc pl-6 mb-4">
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
                <strong>Environmental responsibility:</strong> Guaranteed proper recycling and disposal
              </li>
              <li>
                <strong>Property protection:</strong> Insured service with damage protection
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
              What to Expect from Uncle Sam Junk Removal
            </h3>
            <ol className="list-decimal pl-6 mb-6">
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

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cost Considerations</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">💰 Potential Savings</h3>
                <ul className="list-disc pl-6 text-sm">
                  <li>Utility rebates for old appliances</li>
                  <li>Scrap metal value recovery</li>
                  <li>Tax deductions for donations</li>
                  <li>Avoided disposal fees</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Service Pricing</h3>
                <ul className="list-disc pl-6 text-sm">
                  <li>Single appliance: $75-$150</li>
                  <li>Multiple appliances: Volume discounts</li>
                  <li>Refrigerant recovery: Included</li>
                  <li>Same-day service: Available</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Preparing for Appliance Removal</h2>
            <ol className="list-decimal pl-6 mb-6">
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
          <div className="flex items-center justify-center mb-4">
            <Recycle className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Ready to Recycle Your Appliances?</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Let Uncle Sam Junk Removal handle your appliance disposal with guaranteed eco-friendly recycling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton theme="blue" size="lg" href="/services/appliance-removal">
              Schedule Appliance Removal
            </ThemedButton>
            <ThemedButton theme="green" variant="outline" size="lg" href="/quote">
              Get Free Quote
            </ThemedButton>
          </div>
        </GlassCard>
      </article>
    </div>
  )
}
