import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Building, Clock, Shield, Users, CheckCircle, Calendar, Briefcase } from "lucide-react"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata: Metadata = {
  title: "Commercial Cleaning Services in Evansville, IN | Uncle Sam Junk Removal",
  description:
    "Reliable, insured, after-hours business cleaning in Evansville. Professional office cleaning services with natural products. Serving businesses throughout Southern Indiana.",
  keywords:
    "commercial cleaning Evansville, office cleaning, business cleaning, after-hours cleaning, janitorial services",
  ...buildCanonicalMetadata("/cleaning/commercial", baseUrl),
}

export default function CommercialCleaningPage() {
  return (
    <ServicePageTemplate
        title="Commercial Cleaning Services"
        description="Reliable, insured, after-hours business cleaning. Professional commercial cleaning services in Evansville and surrounding areas. We provide reliable, after-hours cleaning for offices, retail spaces, medical facilities, and more using eco-friendly products."
        heroImage="/commercial-office-cleaning.png"
        theme="blue"
      badges={["From $120", "After-Hours Available", "Fully Insured"]}
      features={[
        {
          icon: Building,
          title: "Professional Service",
          description: "Experienced team serving businesses of all sizes",
        },
        {
          icon: Clock,
          title: "After-Hours Service",
          description: "Flexible scheduling to minimize business disruption",
        },
        {
          icon: Shield,
          title: "Insured & Bonded",
          description: "Full insurance coverage and bonded team members",
        },
        {
          icon: Users,
          title: "Trusted Team",
          description: "Background-checked, trained professionals",
        },
      ]}
      steps={[
        {
          icon: Briefcase,
          title: "Site Assessment",
          description: "Evaluate your facility and create a customized cleaning plan",
        },
        {
          icon: Calendar,
          title: "Schedule Setup",
          description: "Coordinate cleaning schedule with your business operations",
        },
        {
          icon: Users,
          title: "Professional Service",
          description: "Consistent, thorough cleaning by trained professionals",
        },
        {
          icon: CheckCircle,
          title: "Quality Check",
          description: "Quality assurance inspection and detailed reporting",
        },
      ]}
      pricing={[
        {
          name: "Office Cleaning",
          price: "From $120-200",
          description: "Regular cleaning for professional office environments",
        },
        {
          name: "Retail Cleaning",
          price: "From $150-250",
          description: "Specialized cleaning for customer-facing spaces",
        },
        {
          name: "Medical Cleaning",
          price: "From $180-300",
          description: "Healthcare facility cleaning with enhanced sanitization",
        },
      ]}
      faqs={[
        {
          question: "Do you offer after-hours cleaning?",
          answer:
            "Yes! We specialize in after-hours cleaning to minimize disruption to your business operations. We can work evenings, weekends, or any schedule that works best for your business. Our teams follow your site-specific security protocols and access requirements.",
        },
        {
          question: "Are you insured and bonded?",
          answer:
            "Absolutely. We carry comprehensive general liability insurance and are fully bonded. We can provide certificates of insurance to your business as needed, including adding your business as a certificate holder.",
        },
        {
          question: "How do you ensure security during cleaning?",
          answer:
            "All team members undergo background checks and security training. We work with your existing security systems and can provide detailed access logs and cleaning reports. Key control and alarm procedures are documented for each client site.",
        },
        {
          question: "What cleaning products do you use in commercial settings?",
          answer:
            "We use professional-grade, eco-friendly cleaning products that are effective yet safe for employees and customers. All products meet or exceed industry standards for commercial use. SDS sheets are available upon request for all products used on-site.",
        },
        {
          question: "Can you customize cleaning schedules for our business?",
          answer:
            "Yes! We offer flexible scheduling including daily, weekly, bi-weekly, or monthly service. We'll work with you to create a cleaning schedule that fits your business needs and budget, with scope-of-work checklists tailored to each area.",
        },
      ]}
    />
  )
}
