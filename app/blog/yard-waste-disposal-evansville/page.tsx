import type { Metadata } from "next"
import { GlassCard } from "@/components/ui/glass-card"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata: Metadata = {
  title: "Yard Waste Disposal in Evansville: Composting and Pickup Basics | Uncle Sam Junk Removal",
  description:
    "Brush, leaves, and limbs: the simplest, most eco-friendly ways to handle yard waste in Evansville.",
}

export default function YardWasteDisposalBlog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <SectionHeader
          title="Yard waste disposal in Evansville: composting and pickup basics"
          subtitle="Seasonal cleanup made simple"
          theme="green"
        />
        <GlassCard className="p-8">
          <p className="text-gray-700 mb-4">
            Evansville yard waste can be composted, mulched, or hauled away. For brush and limbs up to 6 inches in
            diameter, we offer fast pickup and eco-friendly processing at local facilities.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Pickup Tips</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Bundle limbs where possible for faster loading</li>
            <li>Keep yard waste separate from trash to maximize recycling</li>
            <li>Ask about seasonal cleanup discounts</li>
          </ul>
        </GlassCard>
      </article>
    </div>
  )
}