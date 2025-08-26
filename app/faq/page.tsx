import type { Metadata } from "next"
import { StructuredData } from "@/components/structured-data"
import FAQClient from "./pageClient"
import { getAllFaqs } from "./data"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Uncle Sam Junk Removal",
  description: "Answers about junk removal, dumpster rental, and cleaning services in Southern Indiana.",
}

export default function FAQPage() {
  // Flatten FAQ items for structured data injection only
  const allFaqs = getAllFaqs()

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <StructuredData
        type="FAQPage"
        data={{
          faqs: allFaqs,
        }}
      />
      <FAQClient />
    </div>
  )
}
