import type { Metadata } from "next"
import { GlassCard } from "@/components/ui/glass-card"
import { ThemedButton } from "@/components/ui/themed-button"
import { SectionHeader } from "@/components/ui/section-header"
import { Calendar, User, Clock, CheckCircle } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Ultimate Spring Cleaning Checklist for Southern Indiana Homes | Uncle Sam Junk Removal",
  description:
    "Complete spring cleaning guide for Southern Indiana residents. Room-by-room checklist, eco-friendly tips, and professional cleaning services.",
  keywords:
    "spring cleaning Southern Indiana, home cleaning checklist, eco-friendly cleaning, professional cleaning Evansville",
}

export default function SpringCleaningChecklistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
          <SectionHeader
            title="Ultimate Spring Cleaning Checklist for Southern Indiana Homes"
            subtitle="Transform your home with our comprehensive room-by-room cleaning guide"
          />

          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>March 1, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Sarah Johnson, Cleaning Specialist</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>12 min read</span>
            </div>
          </div>
        </header>

        <GlassCard className="p-8 mb-8">
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
            <Image
              src="/spring-cleaning-natural.png"
              alt="Spring cleaning with natural products"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Spring has arrived in Southern Indiana, and it's time to refresh your home after the long winter months.
              This comprehensive checklist will help you tackle every room systematically while using eco-friendly
              methods that are safe for your family and the environment.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Before You Begin: Essential Supplies</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Natural Cleaning Products:</h3>
                <ul className="list-disc pl-6">
                  <li>White vinegar</li>
                  <li>Baking soda</li>
                  <li>Lemon juice</li>
                  <li>Castile soap</li>
                  <li>Essential oils (tea tree, lavender)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Tools & Equipment:</h3>
                <ul className="list-disc pl-6">
                  <li>Microfiber cloths</li>
                  <li>Vacuum cleaner with attachments</li>
                  <li>Mop and bucket</li>
                  <li>Scrub brushes</li>
                  <li>Rubber gloves</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Room-by-Room Checklist</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">🏠 Living Room & Family Room</h3>
            <div className="space-y-2 mb-6">
              {[
                "Dust all surfaces, including electronics and decorations",
                "Vacuum upholstered furniture and cushions",
                "Clean windows and window sills",
                "Organize entertainment center and cable management",
                "Deep clean carpets or mop hardwood floors",
                "Wash throw pillows and blankets",
                "Clean light fixtures and ceiling fans",
              ].map((task, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">🍳 Kitchen</h3>
            <div className="space-y-2 mb-6">
              {[
                "Deep clean appliances inside and out",
                "Scrub and disinfect countertops and backsplash",
                "Clean out refrigerator and freezer",
                "Organize pantry and check expiration dates",
                "Degrease range hood and clean filters",
                "Sanitize sink and faucet",
                "Mop floors and clean baseboards",
              ].map((task, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">🛏️ Bedrooms</h3>
            <div className="space-y-2 mb-6">
              {[
                "Wash all bedding, including comforters and pillows",
                "Rotate and flip mattresses",
                "Organize closets and donate unused clothing",
                "Dust furniture and clean mirrors",
                "Vacuum under beds and in corners",
                "Clean windows and wash curtains",
                "Organize dresser drawers and nightstands",
              ].map((task, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">🚿 Bathrooms</h3>
            <div className="space-y-2 mb-6">
              {[
                "Scrub shower, tub, and tile grout",
                "Disinfect toilet inside and out",
                "Clean mirrors and medicine cabinet",
                "Replace shower curtain or clean glass doors",
                "Organize under-sink storage",
                "Wash bath mats and towels",
                "Clean exhaust fan and light fixtures",
              ].map((task, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Eco-Friendly Cleaning Recipes</h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">All-Purpose Cleaner</h3>
            <p className="mb-4">
              Mix 1 cup water, 1/2 cup white vinegar, and 10 drops of essential oil in a spray bottle.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Glass Cleaner</h3>
            <p className="mb-4">
              Combine 2 cups water, 1/2 cup vinegar, and 1/4 cup rubbing alcohol for streak-free windows.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Scrubbing Paste</h3>
            <p className="mb-6">Mix baking soda with just enough water to form a paste for tough stains and grime.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When to Call the Professionals</h2>
            <p className="mb-4">
              While this checklist covers most spring cleaning tasks, some jobs are better left to professionals:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Deep carpet cleaning and stain removal</li>
              <li>Window cleaning for multi-story homes</li>
              <li>Pressure washing exterior surfaces</li>
              <li>Cleaning hard-to-reach areas like high ceilings</li>
              <li>Organizing and decluttering large spaces</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Decluttering and Junk Removal</h2>
            <p className="mb-4">
              Spring cleaning is the perfect time to declutter your home. As you clean each room, set aside items you no
              longer need. Uncle Sam Junk Removal can help you dispose of unwanted furniture, appliances, and household
              items responsibly, with a focus on donation and recycling.
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help with Your Spring Cleaning?</h3>
          <p className="text-gray-600 mb-6">
            Let our professional cleaning team handle the heavy lifting while you focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ThemedButton asChild theme="green" size="lg">
              <a href="/cleaning/deep-clean">Book Deep Cleaning</a>
            </ThemedButton>
            <ThemedButton asChild theme="red" variant="outline" size="lg">
              <a href="/services/junk-removal">Schedule Junk Removal</a>
            </ThemedButton>
          </div>
        </GlassCard>
      </article>
    </div>
  )
}
