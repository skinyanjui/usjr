import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Zap, Wrench, Recycle, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hot Tub Removal Evansville IN | Same-Day Service | Bulls of Indiana",
  description:
    "Professional hot tub and spa removal in Evansville, Indiana. Safe disconnection, eco-friendly disposal. Same-day service available. Call (812) 610-1657",
  keywords: "hot tub removal Evansville, spa removal Indiana, jacuzzi removal, hot tub disposal Evansville",
}

export default function HotTubRemovalPage() {
  return (
    <ServicePageTemplate
      theme="blue"
      title="Hot Tub Removal in Evansville"
      description="Professional hot tub and spa removal with safe disconnection and eco-friendly disposal" // Changed from subtitle to description
      heroImage="/hot-tub-removal-evansville.png"
      badges={["Same-Day Service", "Safe Disconnection", "Eco-Friendly"]} // Added badges array
      features={[
        {
          icon: Zap,
          title: "Safe Electrical Disconnection",
          description: "Licensed professionals handle all electrical disconnections safely",
        },
        {
          icon: Wrench,
          title: "Specialized Equipment",
          description: "Professional tools for challenging removals and tight spaces",
        },
        {
          icon: Recycle,
          title: "Eco-Friendly Disposal",
          description: "Maximum recycling of components and responsible disposal",
        },
        { icon: Clock, title: "Same-Day Service Available", description: "Quick response for urgent removals" },
      ]}
      pricing={[
        { name: "Standard Hot Tub", price: "$389-489", description: "6-8 person hot tubs" },
        { name: "Large Hot Tub", price: "$489-649", description: "8+ person hot tubs" },
        { name: "Swim Spa", price: "$649-899", description: "Large swim spas" },
        { name: "Difficult Access", price: "+$100-200", description: "Additional surcharge" },
      ]}
      steps={[
        {
          icon: Clock,
          title: "Schedule Assessment",
          description: "Call or text photos for instant quote. We'll assess access and disconnection needs.",
        },
        {
          icon: Zap,
          title: "Pre-Removal Inspection",
          description: "Our team inspects electrical connections and access routes for safe removal.",
        },
        {
          icon: Wrench,
          title: "Safe Disconnection & Removal",
          description: "Professional disconnection of electrical and plumbing, then careful removal.",
        },
        {
          icon: Recycle,
          title: "Eco-Friendly Disposal",
          description: "We recycle components and dispose of materials at certified facilities.",
        },
      ]}
      faqs={[
        {
          question: "Do you disconnect electrical and plumbing connections?",
          answer:
            "Yes, our team includes licensed professionals who can safely disconnect electrical connections. For complex plumbing, we recommend having a plumber disconnect water lines before our arrival.",
        },
        {
          question: "How much does hot tub removal cost in Evansville?",
          answer:
            "Hot tub removal typically costs $389-649 depending on size, access difficulty, and disconnection needs. We provide upfront pricing with no hidden fees.",
        },
        {
          question: "Can you remove hot tubs from tight spaces or decks?",
          answer:
            "Yes, we specialize in challenging removals including second-story decks, tight side yards, and indoor installations. We have specialized equipment for difficult access situations.",
        },
        {
          question: "What happens to my old hot tub after removal?",
          answer:
            "We recycle all possible components including metals, plastics, and electronics. The shell and non-recyclable parts are disposed of at certified waste facilities following EPA guidelines.",
        },
        {
          question: "How long does hot tub removal take?",
          answer:
            "Most hot tub removals take 2-4 hours including disconnection and removal. Complex installations or difficult access may require additional time.",
        },
      ]}
    />
  )
}
