import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { CheckCircle, Phone, Camera, Truck, Recycle } from "lucide-react"
import type { Metadata } from "next"
import { settings } from "@/lib/cms-content"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Light Demolition Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional light demolition services in Evansville, Indiana. Interior demo, deck removal, fence removal. Same-day service available. Call ${settings.phone}`,
  keywords: "light demolition Evansville, interior demolition Indiana, deck removal, fence removal Evansville",
  ...buildCanonicalMetadata("/services/light-demolition", baseUrl),
}

export default function LightDemolitionPage() {
  const features = [
    { icon: CheckCircle, title: "Interior Demolition", description: "Walls, flooring, cabinets, bathroom and kitchen demo" },
    { icon: CheckCircle, title: "Exterior Structures", description: "Decks, fences, small sheds, and outbuildings" },
    { icon: CheckCircle, title: "Selective Demolition", description: "Careful removal while preserving elements you want to keep" },
  ]

  const pricing = [
    { name: "Interior Room Demo", price: "From $389-549" },
    { name: "Deck Removal", price: "From $289-649" },
    { name: "Fence Removal", price: "From $289-489" },
    { name: "Kitchen/Bath Demo", price: "From $549-899" },
    { name: "Flooring Removal", price: "From $3-8/sq ft" },
  ]

  const steps = [
    { icon: Phone, title: "Project Assessment", description: "We evaluate your project and provide pricing and timeline." },
    { icon: Camera, title: "Safety Preparation", description: "Secure area, disconnect utilities, set up safety measures." },
    { icon: Truck, title: "Careful Demolition", description: "Systematic demolition using proper tools and techniques." },
    { icon: Recycle, title: "Complete Cleanup", description: "Remove debris, recycle materials, and leave the area clean." },
  ]

  const faqs = [
    {
      question: "What types of light demolition do you handle?",
      answer:
        "We handle interior walls, decks, fences, small outbuildings, bathroom/kitchen demo, flooring removal, and similar projects. We don't handle structural or load-bearing demolition.",
    },
    {
      question: "How much does light demolition cost in Evansville?",
      answer:
        "Light demolition costs from $389-899 depending on project size and complexity. Interior room demo from $389, while deck or fence removal ranges from $289-649.",
    },
    {
      question: "Do you handle permits for demolition projects?",
      answer:
        "We can advise on permit requirements, but permits are typically the homeowner's responsibility. We ensure all work meets local building codes and safety standards.",
    },
    {
      question: "Can you do selective demolition to save certain elements?",
      answer:
        "Yes, we specialize in careful, selective demolition to preserve elements you want to keep. This includes saving fixtures, trim, or structural elements for reuse.",
    },
    {
      question: "What safety measures do you take during demolition?",
      answer:
        "We follow OSHA safety standards, use proper protective equipment, secure work areas, disconnect utilities safely, and ensure proper dust and debris containment.",
    },
  ]

  return (
    <ServicePageTemplate
      theme="red"
      title="Light Demolition in Evansville"
      description="Interior demo, deck and fence removal with safety-first approach"
      heroImage="/light-demolition-evansville.png"
      badges={["Same-day service available", "OSHA safety compliant"]}
      features={features}
      steps={steps}
      pricing={pricing}
      pricingTitle="Light Demolition Pricing"
      pricingNote="All prices include demolition, debris removal, and site cleanup"
      faqs={faqs}
      ctaPrimary={`📞 Call ${settings.phone}`}
      ctaSecondary="Get Project Quote"
    />
  )
}
