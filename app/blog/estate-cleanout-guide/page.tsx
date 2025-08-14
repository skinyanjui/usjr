import type { Metadata } from "next"
import { GlassCard } from "@/components/ui/glass-card"
import { SectionHeader } from "@/components/ui/section-header"

export const metadata: Metadata = {
  title: "Estate Cleanout Guide: Compassionate Planning and Donation Options | Uncle Sam Junk Removal",
  description:
    "A step-by-step guide to planning an estate cleanout with sensitivity, including donation and recycling strategies.",
}

export default function EstateCleanoutGuideBlog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <SectionHeader
          title="Estate cleanout guide: compassionate planning and donation options"
          subtitle="Supportive steps during a difficult time"
        />
        <GlassCard className="p-8">
          <p className="text-gray-700 mb-4">
            Estate cleanouts require careful planning and empathy. Start with important documents, identify items with
            sentimental value, and separate donations to maximize reuse and reduce costs.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Where to Start</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Gather legal documents and secure valuables</li>
            <li>Sort items into keep, donate, recycle, and dispose</li>
            <li>Ask for donation receipts where available</li>
          </ul>
        </GlassCard>
      </article>
    </div>
  )
}
