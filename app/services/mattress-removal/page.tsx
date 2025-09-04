import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { settings } from "@/lib/cms-content"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Mattress Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional mattress and box spring removal in Evansville, Indiana. Eco-friendly disposal and recycling. Same-day service available. Call ${settings.phone}`,
  keywords: "mattress removal Evansville, box spring removal Indiana, bed disposal, mattress recycling Evansville",
  ...buildCanonicalMetadata("/services/mattress-removal", baseUrl),
}

export default function MattressRemovalPage() {
  const features = [
    { icon: CheckCircle, title: "Quick Scheduling", description: "Call or text for same-day pickup. No need to bag or wrap." },
    { icon: CheckCircle, title: "Professional Pickup", description: "We handle all lifting from any location in your home." },
    { icon: CheckCircle, title: "Eco-Friendly Processing", description: "Materials are recycled or donated when possible." },
  ]

  const pricing = [
    { name: "Single Mattress", price: "From $89-129" },
    { name: "Mattress + Box Spring", price: "From $119-179" },
    { name: "Full Bedroom Set", price: "From $149-229" },
  ]

  const faqs = [
    {
      question: "Do you remove mattresses from upstairs bedrooms?",
      answer:
        "Yes, we remove mattresses from any location including upstairs bedrooms, basements, and tight spaces. Our team handles all the heavy lifting and navigation.",
    },
    {
      question: "How much does mattress removal cost in Evansville?",
      answer:
        "Single mattress removal from $89, with box springs adding $25. Full bedroom sets (mattress, box spring, frame) from $149. We offer volume discounts for multiple items.",
    },
    {
      question: "Can you remove stained or damaged mattresses?",
      answer:
        "Yes, we remove mattresses in any condition including stained, torn, or water-damaged. We follow proper sanitation protocols and disposal methods for all mattresses.",
    },
    {
      question: "What happens to my old mattress after removal?",
      answer:
        "We partner with local recycling facilities to break down mattresses into component materials. Springs, foam, and fabric are recycled when possible. Unusable materials go to certified disposal facilities.",
    },
  ]

  return (
    <ServicePageTemplate
      theme="blue"
      title="Mattress Removal in Evansville"
      description="Eco-friendly mattress and box spring removal with same-day service"
      heroImage="/mattress-removal-evansville.png"
      badges={["Same-day service available", "Licensed & Insured"]}
      features={features}
      steps={[]}
      pricing={pricing}
      pricingTitle="Mattress Removal Pricing"
      pricingNote="Final pricing depends on access and item condition"
      faqs={faqs}
      ctaPrimary={`📞 Call ${settings.phone}`}
      ctaSecondary="Get Mattress Removal Quote"
    />
  )
}
