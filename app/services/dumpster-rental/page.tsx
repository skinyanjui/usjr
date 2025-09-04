import { ServicePageTemplate } from "@/components/ui/service-page-template"
import type { Metadata } from "next"
import { Truck, Clock, DollarSign, Package, Phone, Calendar, Trash2, CheckCircle } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { buildCanonicalMetadata } from "@/components/canonical"
import { buildKeywordString } from "@/lib/keyword-variations"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Dumpster Rental Services in Evansville, IN | Uncle Sam Junk Removal",
  description:
    "Affordable dumpster rental, roll-off container rental, and trash container rental in Evansville and Southern Indiana. Whether you need to rent a dumpster for construction, get a dumpster for home projects, or order a big trash bin, we offer multiple sizes with same-day delivery and all-inclusive pricing.",
  keywords: buildKeywordString("dumpster-rental"),
  ...buildCanonicalMetadata("/services/dumpster-rental", baseUrl),
}

export default function DumpsterRentalPage() {
  return (
    <ServicePageTemplate
      theme="blue"
      title="Dumpster Rental in Evansville"
      description="Reliable dumpster rental, roll-off container rental, and trash container rental for construction, renovation, and cleanout projects throughout Southern Indiana. Whether you need to rent a dumpster, get a construction dumpster, or order a big trash bin, we offer same-day delivery with transparent pricing."
      heroImage="/dumpster-rental-evansville.png"
      badges={["Same-Day Delivery", "All-Inclusive Pricing", "Multiple Sizes"]}
      features={[
        {
          icon: Truck,
          title: "Same-Day Delivery Available",
          description: "Quick delivery when you need it most",
        },
        {
          icon: Clock,
          title: "Flexible Rental Periods",
          description: "Keep it as long as you need",
        },
        {
          icon: DollarSign,
          title: "All-Inclusive Pricing",
          description: "No hidden fees or surprise charges",
        },
        {
          icon: Package,
          title: "Multiple Sizes Available",
          description: "Perfect size for any project",
        },
      ]}
      pricing={[
        { name: "10 Yard Dumpster", price: "From $299/week", description: "Perfect for small projects (12' L × 8' W × 4' H)" },
        { name: "20 Yard Dumpster", price: "From $399/week", description: "Great for medium projects (22' L × 8' W × 4' H)" },
        { name: "30 Yard Dumpster", price: "From $499/week", description: "Ideal for large projects (22' L × 8' W × 6' H)" },
        { name: "40 Yard Dumpster", price: "From $599/week", description: "Maximum capacity (22' L × 8' W × 8' H)" },
      ]}
      pricingNote="All prices include delivery, pickup, and disposal fees. Standard 7-day rental period included."
      steps={[
        {
          icon: Phone,
          title: "Choose Size",
          description: "Select the right dumpster size for your project. Not sure? We'll help you choose!",
        },
        {
          icon: Calendar,
          title: "Schedule Delivery",
          description: "We'll deliver your dumpster to your location in Evansville. Same-day delivery available.",
        },
        {
          icon: Trash2,
          title: "Fill It Up",
          description: "Load your debris at your own pace. Keep it for up to 7 days or call for early pickup.",
        },
        {
          icon: CheckCircle,
          title: "We Pick Up",
          description: "We'll pick up your full dumpster and handle all disposal and recycling responsibly.",
        },
      ]}
      faqs={[
        {
          question: "What size dumpster do I need?",
          answer:
            "It depends on your project size. A 10-yard is perfect for small cleanouts, 20-yard for medium renovations, 30-yard for large projects, and 40-yard for major construction or commercial work.",
        },
        {
          question: "How long can I keep the dumpster?",
          answer:
            "Our standard rental period is 7 days, but you can keep it longer for an additional daily fee. Call us if you need to extend your rental.",
        },
        {
          question: "What can't I put in the dumpster?",
          answer:
            "Hazardous materials, paint, chemicals, batteries, tires, and appliances with refrigerants are not allowed. Contact us for a complete list of prohibited items.",
        },
        {
          question: "Do you offer same-day delivery?",
          answer:
            "Yes! We offer same-day delivery throughout Evansville and Southern Indiana, subject to availability. Call us early in the day for best availability.",
        },
        {
          question: "Are there any additional fees?",
          answer:
            "Our pricing is all-inclusive with delivery, pickup, and disposal fees included. Additional fees only apply for extended rental periods or overweight loads.",
        },
      ]}
      ctaPrimary={`📞 Call ${settings.phone}`}
      ctaSecondary="Get Free Quote"
    />
  )
}
