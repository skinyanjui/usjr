import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Truck, Shield, Wrench, Recycle } from "lucide-react"
import type { Metadata } from "next"
import { settings } from "@/lib/cms-content"
import { buildCanonicalMetadata } from "@/components/canonical"
import { buildKeywordString } from "@/lib/keyword-variations"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Appliance Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional appliance removal, old appliance pickup, and appliance disposal in Evansville, Indiana. Whether you need refrigerator removal, washer dryer removal, stove removal, or dishwasher removal, we provide safe disconnection and eco-friendly disposal. Same-day service. Call ${settings.phone}`,
  keywords: buildKeywordString("appliance-removal"),
  ...buildCanonicalMetadata("/services/appliance-removal", baseUrl),
}

export default function ApplianceRemovalPage() {
  return (
    <ServicePageTemplate
      theme="orange"
      title="Appliance Removal in Evansville"
      description="Professional appliance removal, old appliance pickup, and appliance disposal with safe disconnection and eco-friendly disposal. Whether you need to get rid of old appliances, remove refrigerators, or dispose of washers and dryers, we handle it all." // Changed from subtitle to description
      heroImage="/appliance-removal-evansville.png"
      badges={["Same-Day Service", "Safe Disconnection", "EPA Compliant"]} // Added badges array
      features={[
        {
          icon: Truck,
          title: "All Appliance Types",
          description: "Refrigerators, washers, dryers, stoves, dishwashers, and more",
        },
        {
          icon: Shield,
          title: "Safe Disconnection",
          description: "Professional handling of electrical and plumbing connections",
        },
        {
          icon: Wrench,
          title: "Heavy Lifting Equipment",
          description: "Specialized tools for safe removal from any location",
        },
        {
          icon: Recycle,
          title: "EPA Compliant Disposal",
          description: "Responsible disposal following all regulations",
        },
      ]}
      pricing={[
        { name: "Small Appliances", price: "From $89", description: "Microwave, etc." },
        { name: "Washer or Dryer", price: "From $119", description: "Standard size" },
        { name: "Refrigerator or Stove", price: "From $149", description: "Large appliances" },
        { name: "Multiple Appliances", price: "15% Discount", description: "Volume pricing" },
      ]}
      steps={[
        {
          icon: Truck,
          title: "Schedule Service",
          description: "Call for same-day pickup. We handle all appliance types and sizes.",
        },
        {
          icon: Shield,
          title: "Safe Disconnection",
          description: "Professional disconnection of gas, electric, and water connections.",
        },
        {
          icon: Wrench,
          title: "Careful Removal",
          description: "Specialized equipment for heavy appliances and tight spaces.",
        },
        {
          icon: Recycle,
          title: "Responsible Disposal",
          description: "EPA-compliant disposal with maximum recycling of metals and components.",
        },
      ]}
      faqs={[
        {
          question: "Do you disconnect gas and electric appliances?",
          answer:
            "Yes, our team can safely disconnect electric appliances. For gas appliances, we recommend having a licensed plumber disconnect gas lines before our arrival for safety.",
        },
        {
          question: "How much does old appliance pickup and disposal cost in Evansville?",
          answer:
            "Single appliances from $89 (small) to $149 (large). Refrigerator removal and washer dryer removal are $119-149 depending on size and access. Multiple appliances get volume discounts for appliance haul away services.",
        },
        {
          question: "Can you remove built-in appliances?",
          answer:
            "Yes, we can remove built-in appliances including dishwashers, microwaves, and cooktops. This may require additional time and tools, which could affect pricing.",
        },
        {
          question: "What do you do with old appliances?",
          answer:
            "We recycle metals, donate working appliances when possible, and ensure proper disposal of refrigerants and hazardous materials following EPA guidelines.",
        },
        {
          question: "Do you remove appliances from basements or upstairs?",
          answer:
            "Yes, we remove appliances from any location including basements, second floors, and tight spaces. We have specialized equipment for challenging removals.",
        },
      ]}
    />
  )
}
