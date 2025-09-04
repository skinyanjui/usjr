import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Truck, Phone, CheckCircle, Calendar } from "lucide-react"
import type { Metadata } from "next"
import { buildCanonicalMetadata } from "@/components/canonical"
import { buildKeywordString } from "@/lib/keyword-variations"
import { UNIFORM_OFFERS, PRICING_LANGUAGE } from "@/lib/uniform-offers"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Junk Removal Services in Evansville, IN | Uncle Sam Junk Removal",
  description:
    "Professional junk removal, trash removal, and haul away services in Evansville and Southern Indiana. Whether you need to get rid of junk, remove old furniture, or clean out your house, we provide same-day service with eco-friendly disposal. Licensed and insured hauling service.",
  keywords: buildKeywordString("junk-removal"),
  ...buildCanonicalMetadata("/services/junk-removal", baseUrl),
}

export default function JunkRemovalPage() {
  return (
    <ServicePageTemplate
      theme="red"
      title="Junk Removal Services in Evansville"
      description="Fast, reliable junk removal, trash removal, and haul away services throughout Southern Indiana. Whether you need to get rid of old furniture, clean out your house, or dispose of construction debris, we provide same-day service with upfront pricing and no hidden fees." // Changed from subtitle to description
      badges={[UNIFORM_OFFERS.SAME_DAY_SERVICE, UNIFORM_OFFERS.LICENSED_INSURED, UNIFORM_OFFERS.ECO_FRIENDLY]}
      serviceCategory="Junk Removal Service"
      heroImage="/junk-removal-evansville.png"
      features={[
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.LICENSED_INSURED,
          description: "Fully licensed and insured for your protection",
        },
        { 
          icon: Calendar, 
          title: UNIFORM_OFFERS.SAME_DAY_SERVICE, 
          description: "Quick response for urgent cleanouts" 
        },
        {
          icon: CheckCircle,
          title: UNIFORM_OFFERS.ECO_FRIENDLY,
          description: "Responsible recycling and donation practices",
        },
        { 
          icon: CheckCircle, 
          title: UNIFORM_OFFERS.UPFRONT_PRICING, 
          description: UNIFORM_OFFERS.NO_HIDDEN_FEES 
        },
      ]}
      steps={[
        // Added missing icon property and restructured to match template
        {
          icon: Phone,
          title: "Schedule",
          description:
            "Call us or book online for a free estimate. We offer same-day and next-day appointments throughout Evansville.",
        },
        {
          icon: Truck,
          title: "We Arrive",
          description:
            "Our professional team arrives on time, provides upfront pricing, and handles all the heavy lifting for you.",
        },
        {
          icon: CheckCircle,
          title: "We Clean Up",
          description:
            "We remove your junk, sweep up the area, and dispose of everything responsibly through recycling and donation.",
        },
      ]}
      pricing={[
        { name: "Single Item", price: "From $89-149", description: PRICING_LANGUAGE.TIER_DESCRIPTORS.SINGLE_ITEM },
        { name: "1/4 Truck Load", price: "From $179-249", description: PRICING_LANGUAGE.TIER_DESCRIPTORS.QUARTER_LOAD },
        { name: "1/2 Truck Load", price: "From $289-389", description: PRICING_LANGUAGE.TIER_DESCRIPTORS.HALF_LOAD },
        { name: "Full Truck Load", price: "From $489-649", description: PRICING_LANGUAGE.TIER_DESCRIPTORS.FULL_LOAD },
      ]}
      faqs={[
        // Added missing FAQs array
        {
          question: `Do you provide ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()}?`,
          answer:
            `Yes! We offer ${UNIFORM_OFFERS.SAME_DAY_SERVICE.toLowerCase()} throughout Evansville and surrounding areas, subject to availability.`,
        },
        {
          question: "What items do you accept for removal?",
          answer:
            "We accept most household items, furniture, appliances, construction debris, and yard waste. Whether you need to dispose of old furniture, get rid of broken appliances, or remove construction materials, we handle it all. We cannot accept hazardous materials, chemicals, or paint.",
        },
        {
          question: "How do you price your junk removal services?",
          answer:
            `${PRICING_LANGUAGE.PRICING_NOTES.VOLUME_BASED}. ${PRICING_LANGUAGE.PRICING_NOTES.INCLUDES_LABOR}. ${PRICING_LANGUAGE.PRICING_NOTES.NO_SURPRISE_FEES}.`,
        },
        {
          question: "Are you licensed and insured?",
          answer: "Yes, Uncle Sam Junk Removal is fully licensed and insured for your protection and peace of mind.",
        },
        {
          question: "What areas do you serve?",
          answer:
            "We serve Evansville and all of Southern Indiana, including Henderson KY, Newburgh, Boonville, and surrounding communities.",
        },
      ]}
    />
  )
}
