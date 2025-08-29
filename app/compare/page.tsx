import type { Metadata } from "next"
import CompareClient from "./pageClient"
import { PageHero } from "@/components/ui/page-hero"

export const metadata: Metadata = {
  title: "Compare Services | Uncle Sam Junk Removal",
  description: "Compare junk removal, dumpster rental, and cleaning in Evansville. See pricing, timing, and when to choose each service so you pick the best option.",
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero title="Compare Services" description="Junk removal vs dumpster rental vs cleaning" imageSrc="/dumpster-rental-evansville.png" priority />
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
        <CompareClient />
      </div>
    </div>
  )
}
