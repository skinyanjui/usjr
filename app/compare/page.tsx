import type { Metadata } from "next"
import CompareClient from "./pageClient"

export const metadata: Metadata = {
  title: "Compare Services | Uncle Sam Junk Removal",
  description: "Compare junk removal, dumpster rental, and cleaning to pick the right service.",
}

export default function ComparePage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <CompareClient />
      </div>
    </div>
  )
}
