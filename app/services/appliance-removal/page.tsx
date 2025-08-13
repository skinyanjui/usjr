import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Truck, Shield, Wrench, Recycle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Appliance Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    "Professional appliance removal in Evansville, Indiana. Refrigerators, washers, dryers, stoves. Eco-friendly disposal. Same-day service. Call (812) 610-1657",
  keywords:
    "appliance removal Evansville, refrigerator removal Indiana, washer dryer removal, stove removal Evansville",
}

export default function ApplianceRemovalPage() {
  return (
    <ServicePageTemplate
      theme="orange"
      title="Appliance Removal in Evansville"
      description="Professional removal of all appliances with safe disconnection and eco-friendly disposal" // Changed from subtitle to description
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
        { name: "Small Appliances", price: "$89", description: "Microwave, etc." },
        { name: "Washer or Dryer", price: "$119", description: "Standard size" },
        { name: "Refrigerator or Stove", price: "$149", description: "Large appliances" },
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
          question: "How much does appliance removal cost in Evansville?",
          answer:
            "Single appliances start at $89 (small) to $149 (large). Multiple appliances get volume discounts. Refrigerators and washers are $119-149 depending on size and access.",
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
