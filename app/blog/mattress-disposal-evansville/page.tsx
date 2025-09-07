import type { Metadata } from "next"
import Script from "next/script"
import { GlassCard } from "@/components/ui/glass-card"
import { SectionHeader } from "@/components/ui/section-header"
import Image from "next/image"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Mattress Disposal in Evansville: Recycling, Costs, and Pickup Options | Uncle Sam Junk Removal",
  description:
    "Complete guide to mattress disposal in Evansville, IN. Professional removal costs $89-149, recycling options, city bulk pickup, and donation opportunities. Same-day service available.",
  keywords: "mattress disposal Evansville, mattress removal cost, mattress recycling Indiana, bulk waste pickup Evansville, donate mattress Evansville",
  robots: "index, follow",
  ...buildCanonicalMetadata("/blog/mattress-disposal-evansville", baseUrl),
}

export default function MattressDisposalBlog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Structured Data for Blog Article */}
      <Script id="mattress-disposal-blog-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Mattress Disposal in Evansville: Recycling, Costs, and Pickup Options",
          "description": "Complete guide to mattress disposal in Evansville, IN. Professional removal costs $89-149, recycling options, city bulk pickup, and donation opportunities.",
          "image": `${baseUrl}/mattress-removal-evansville.png`,
          "author": {
            "@type": "Organization",
            "name": "Uncle Sam Junk Removal"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Uncle Sam Junk Removal",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/icon-512.png`
            }
          },
          "datePublished": "2025-01-01",
          "dateModified": "2025-09-07",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/blog/mattress-disposal-evansville`
          },
          "articleSection": "Home Services",
          "keywords": ["mattress disposal", "Evansville", "recycling", "junk removal", "waste management"]
        })}
      </Script>

      <article className="max-w-4xl mx-auto px-4 py-16">
        <SectionHeader
          title="Mattress disposal in Evansville: recycling, costs, and pickup options"
          subtitle="How to handle old mattresses the right way"
        />
        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
          <Image
            src="/mattress-removal-evansville.png"
            alt="Mattress disposal and recycling options"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <GlassCard className="p-8">
          <p className="text-gray-700 mb-6">
            Old mattresses are bulky, hard to haul, and often not accepted by regular trash pickup in Evansville, IN. 
            With over 20 million mattresses disposed of annually in the US, finding the right disposal method is crucial 
            for both environmental and budget considerations. Here's your comprehensive guide to mattress disposal options 
            in the Tri-State area.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Professional Mattress Removal Services</h2>
          <p className="text-gray-700 mb-4">
            Professional mattress removal is the most convenient option for Evansville residents. Services typically 
            include pickup from any location in your home, loading, transportation, and proper disposal or recycling.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Average Costs in Evansville</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li><strong>Single mattress removal:</strong> $89-119</li>
            <li><strong>Mattress + box spring set:</strong> $114-149</li>
            <li><strong>Multiple mattresses:</strong> 10-15% discount available</li>
            <li><strong>Same-day service:</strong> Often available with no additional fee</li>
            <li><strong>Upstairs/basement pickup:</strong> Usually included in base price</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">City of Evansville Bulk Waste Options</h2>
          <p className="text-gray-700 mb-4">
            The City of Evansville offers bulk waste pickup twice per year for residents. However, this service has limitations:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Limited to specific scheduled dates (typically spring and fall)</li>
            <li>Items must be placed curbside the night before collection</li>
            <li>Weather exposure can damage mattresses before pickup</li>
            <li>Not available for immediate disposal needs</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mattress Recycling in Southern Indiana</h2>
          <p className="text-gray-700 mb-4">
            Mattress recycling is environmentally beneficial but has limited availability in the Evansville area. 
            Here's what you need to know:
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">What Can Be Recycled</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><strong>Metal springs:</strong> 100% recyclable as scrap metal</li>
            <li><strong>Wood frames:</strong> Can be processed into biomass or mulch</li>
            <li><strong>Foam padding:</strong> Some types can be recycled into carpet padding</li>
            <li><strong>Fabric covering:</strong> Limited recycling options, often downcycled</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Local Recycling Challenges</h3>
          <p className="text-gray-700 mb-6">
            While mattress recycling is ideal, the Tri-State area has limited facilities. Most professional 
            removal services will separate materials when possible, but complete recycling isn't always available locally.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Donation Opportunities</h2>
          <p className="text-gray-700 mb-4">
            Donating mattresses in good condition can benefit local families, but health regulations limit acceptance:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li><strong>Goodwill Evansville:</strong> Generally does not accept mattresses due to hygiene concerns</li>
            <li><strong>Salvation Army:</strong> Rarely accepts mattresses, call ahead to confirm</li>
            <li><strong>Local churches:</strong> Some may accept high-quality mattresses for specific needs</li>
            <li><strong>Facebook Marketplace/Craigslist:</strong> Best option for mattresses in excellent condition</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Professional Removal</h2>
          <p className="text-gray-700 mb-4">
            For most Evansville residents, professional mattress removal offers the best combination of convenience, 
            speed, and environmental responsibility:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li><strong>Same-day availability:</strong> No waiting for bulk pickup schedules</li>
            <li><strong>Indoor pickup:</strong> No need to move heavy mattresses yourself</li>
            <li><strong>Weather-independent:</strong> Service available year-round</li>
            <li><strong>Proper disposal:</strong> Licensed companies ensure legal, eco-friendly disposal</li>
            <li><strong>Insurance coverage:</strong> Professional services carry liability insurance</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Timing Your Mattress Disposal</h2>
          <p className="text-gray-700 mb-6">
            Consider these factors when planning mattress removal in Evansville:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li><strong>Moving dates:</strong> Schedule removal for the day after your new mattress delivery</li>
            <li><strong>Seasonal considerations:</strong> Spring and fall are popular times for mattress replacement</li>
            <li><strong>Holiday schedules:</strong> Some services have limited availability during major holidays</li>
            <li><strong>Same-day needs:</strong> Call early in the day for best same-day availability</li>
          </ul>

          <p className="text-gray-700 text-lg font-medium mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <strong>Bottom Line:</strong> Professional mattress removal in Evansville typically costs $89-149 and offers 
            the most convenient, reliable solution for disposing of old mattresses while ensuring proper environmental handling.
          </p>
        </GlassCard>
      </article>
    </div>
  )
}
