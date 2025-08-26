import type { Metadata } from "next"
import { StructuredData } from "@/components/structured-data"
import FAQClient from "./pageClient"
import { getAllFaqs } from "./data"
import { PageHero } from "@/components/ui/page-hero"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Uncle Sam Junk Removal",
  description: "Answers about junk removal, dumpster rental, and cleaning services in Southern Indiana.",
}

export default function FAQPage() {
  // Flatten FAQ items for structured data injection only
  const allFaqs = getAllFaqs()

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero title="Frequently Asked Questions" description="Answers about junk removal, dumpster rental, and cleaning services in Southern Indiana." imageSrc="/junk-removal-evansville.png" priority />
      <div className="pt-8 pb-16">
        <StructuredData
          type="FAQPage"
          data={{
            faqs: allFaqs,
          }}
        />
        <FAQClient />
      </div>
    </div>
  )
}
