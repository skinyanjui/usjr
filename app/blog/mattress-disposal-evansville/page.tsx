import type { Metadata } from "next"
import { GlassCard } from "@/components/ui/glass-card"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata: Metadata = {
  title: "Mattress Disposal in Evansville: Recycling, Costs, and Pickup Options | Uncle Sam Junk Removal",
  description:
    "What to do with an old mattress in Evansville. Recycling programs, professional pickup, and cost ranges to expect.",
}

export default function MattressDisposalBlog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <SectionHeader
          title="Mattress disposal in Evansville: recycling, costs, and pickup options"
          subtitle="How to handle old mattresses the right way"
        />
        <GlassCard className="p-8">
          <p className="text-gray-700 mb-4">
            Old mattresses are bulky, hard to haul, and often not accepted by regular trash pickup. In Evansville, you
            have a few options: professional pickup, city bulk waste days, and limited recycling programs. Here's what
            to know so you can pick the best option for your timeline and budget.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Average Costs</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Single mattress: $89</li>
            <li>Mattress + box spring: $114</li>
            <li>Multiple mattresses: 10% discount</li>
          </ul>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Recycling & Donation Notes</h2>
          <p className="text-gray-700">
            Due to sanitation rules, donation acceptance varies and depends on condition. When possible, we partner with
            local organizations to maximize reuse. Otherwise, we recycle metal springs and responsibly dispose of foam
            and fabric.
          </p>
        </GlassCard>
      </article>
    </div>
  )
}
