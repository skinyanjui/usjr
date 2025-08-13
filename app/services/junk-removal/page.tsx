import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Truck, Phone, CheckCircle, Calendar } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Junk Removal Services in Evansville, IN | Uncle Sam Junk Removal",
  description:
    "Professional junk removal services in Evansville and Southern Indiana. Same-day service, eco-friendly disposal, free estimates. Licensed and insured.",
  keywords:
    "junk removal Evansville, furniture removal Indiana, appliance disposal, construction debris, estate cleanout, Vanderburgh County",
}

export default function JunkRemovalPage() {
  return (
    <ServicePageTemplate
      theme="red"
      title="Junk Removal Services in Evansville"
      description="Fast, reliable, and eco-friendly junk removal throughout Southern Indiana. Same-day service available with upfront pricing and no hidden fees." // Changed from subtitle to description
      badges={["Same-Day Service", "Licensed & Insured", "Eco-Friendly"]} // Added badges array
      heroImage="/junk-removal-evansville.png"
      features={[
        // Added missing icon property to each feature
        {
          icon: CheckCircle,
          title: "Licensed & Insured",
          description: "Fully licensed and insured for your protection",
        },
        { icon: Calendar, title: "Same-Day Service Available", description: "Quick response for urgent cleanouts" },
        {
          icon: CheckCircle,
          title: "Eco-Friendly Disposal",
          description: "Responsible recycling and donation practices",
        },
        { icon: CheckCircle, title: "Upfront Pricing", description: "No hidden fees or surprise charges" },
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
        // Changed structure to match template (name instead of size)
        { name: "1/8 Truck Load", price: "$99", description: "Perfect for small cleanouts" },
        { name: "1/4 Truck Load", price: "$179", description: "Great for room cleanouts" },
        { name: "1/2 Truck Load", price: "$299", description: "Ideal for large cleanouts" },
        { name: "Full Truck Load", price: "$499", description: "Complete home cleanouts" },
      ]}
      faqs={[
        // Added missing FAQs array
        {
          question: "Do you provide same-day service?",
          answer:
            "Yes! We offer same-day junk removal service throughout Evansville and surrounding areas, subject to availability.",
        },
        {
          question: "What items do you accept?",
          answer:
            "We accept most household items, furniture, appliances, construction debris, and yard waste. We cannot accept hazardous materials, chemicals, or paint.",
        },
        {
          question: "How do you price your services?",
          answer:
            "Our pricing is based on the volume of junk removed, measured by truck space. We provide upfront pricing with no hidden fees.",
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
