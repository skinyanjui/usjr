import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { settings } from "@/lib/cms-content"

export const metadata: Metadata = {
  title: "Shed Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional shed and outbuilding removal in Evansville, Indiana. Complete demolition and cleanup. Same-day service available. Call ${settings.phone}`,
  keywords: "shed removal Evansville, outbuilding removal Indiana, shed demolition, storage building removal",
}

export default function ShedRemovalPage() {
  const features = [
    { icon: CheckCircle, title: "Free Assessment", description: "We evaluate shed size, materials, and access for pricing." },
    { icon: CheckCircle, title: "Preparation & Safety", description: "Clear contents, disconnect utilities, set safety perimeter." },
    { icon: CheckCircle, title: "Careful Demolition", description: "Systematic dismantling from roof to foundation." },
  ]

  const pricing = [
    { name: "Small Shed (up to 8x10)", price: "From $289-389" },
    { name: "Medium Shed (10x12)", price: "From $389-549" },
    { name: "Large Shed / Barn", price: "From $549-649" },
  ]

  const faqs = [
    {
      question: "Do I need to empty my shed before removal?",
      answer:
        "Yes, please remove all contents before our arrival. We can provide junk removal for shed contents at an additional cost if needed.",
    },
    {
      question: "How much does shed removal cost in Evansville?",
      answer:
        "Shed removal costs from $289-649 depending on size and materials. Small storage sheds from $289, while large barns can cost up to $649. We provide free estimates.",
    },
    {
      question: "Can you remove sheds with concrete foundations?",
      answer:
        "Yes, we can remove concrete pads and foundations. This requires additional equipment and time, typically adding $200-400 depending on size.",
    },
    {
      question: "What materials can you recycle from shed demolition?",
      answer:
        "We recycle metal roofing, siding, hardware, and lumber when possible. Asphalt shingles and treated lumber are disposed of at certified facilities.",
    },
    {
      question: "How long does shed removal take?",
      answer:
        "Small sheds (8x10) take 2-3 hours, medium sheds (10x12) take 3-4 hours, and large sheds or barns can take 4-8 hours depending on complexity.",
    },
  ]

  return (
    <ServicePageTemplate
      theme="green"
      title="Shed Removal in Evansville"
      description="Complete demolition, removal, and cleanup for sheds and outbuildings"
      heroImage="/shed-removal-evansville.png"
      badges={["Same-day service available", "Licensed & Insured"]}
      features={features}
      steps={[]}
      pricing={pricing}
      pricingTitle="Shed Removal Pricing"
      pricingNote="Final pricing depends on materials and access"
      faqs={faqs}
      ctaPrimary={`📞 Call ${settings.phone}`}
      ctaSecondary="Schedule Shed Removal"
    />
  )
}
