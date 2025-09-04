import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { settings } from "@/lib/cms-content"
import { buildCanonicalMetadata } from "@/components/canonical"
import { buildKeywordString } from "@/lib/keyword-variations"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Yard Waste Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional yard waste removal, yard cleanup, and landscaping debris removal in Evansville, Indiana. Whether you need brush removal, tree debris removal, leaf removal, or yard trash pickup, we provide same-day service with eco-friendly disposal. Call ${settings.phone}`,
  keywords: buildKeywordString("yard-waste-removal"),
  ...buildCanonicalMetadata("/services/yard-waste-removal", baseUrl),
}

export default function YardWasteRemovalPage() {
  const features = [
    { icon: CheckCircle, title: "Quick Scheduling", description: "Call for same-day pickup of yard waste and debris." },
    { icon: CheckCircle, title: "Efficient Collection", description: "We collect yard waste from anywhere on your property." },
    { icon: CheckCircle, title: "Eco-Friendly Processing", description: "100% composted or processed into mulch/soil amendments." },
  ]

  const pricing = [
    { name: "Small Load", price: "From $179-289" },
    { name: "Medium Load", price: "From $289-389" },
    { name: "Large Load", price: "From $389-489" },
  ]

  const faqs = [
    {
      question: "What types of yard waste do you remove?",
      answer:
        "We remove leaves, grass clippings, brush, tree limbs (up to 6 inches diameter), hedge trimmings, garden debris, and other organic landscaping materials.",
    },
    {
      question: "How much does yard waste removal cost in Evansville?",
      answer:
        "Yard waste removal from $179 for small loads and up to $489 for large volumes. Tree limbs and brush may require additional fees based on size and quantity.",
    },
    {
      question: "Do you remove large tree limbs and branches?",
      answer:
        "Yes, we remove tree limbs up to 6 inches in diameter. Larger limbs or whole tree removal requires specialized tree service, which we can recommend local providers for.",
    },
    {
      question: "Can you remove yard waste during any season?",
      answer:
        "Yes, we provide year-round yard waste removal including spring cleanup, summer maintenance debris, fall leaf removal, and winter storm cleanup.",
    },
    {
      question: "What happens to the yard waste after removal?",
      answer:
        "All yard waste is taken to certified composting facilities where it's processed into mulch, compost, and soil amendments. Nothing goes to landfills - it's 100% recycled.",
    },
  ]

  return (
    <ServicePageTemplate
      theme="green"
      title="Yard Waste Removal in Evansville"
      description="Brush, leaves, and landscaping debris removal with eco-friendly processing"
      heroImage="/yard-waste-removal-evansville.png"
      badges={["Same-day service available", "Licensed & Insured"]}
      features={features}
      steps={[]}
      pricing={pricing}
      pricingTitle="Yard Waste Removal Pricing"
      pricingNote="Final pricing depends on volume and access"
      faqs={faqs}
      ctaPrimary={`📞 Call ${settings.phone}`}
      ctaSecondary="Get Yard Waste Quote"
    />
  )
}
