import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Building, Clock, Shield, Users, CheckCircle, Calendar, Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: "Commercial Cleaning Services in Evansville, IN | Bulls of Indiana",
  description:
    "Reliable, insured, after-hours business cleaning in Evansville. Professional office cleaning services with natural products. Serving businesses throughout Southern Indiana.",
  keywords:
    "commercial cleaning Evansville, office cleaning, business cleaning, after-hours cleaning, janitorial services",
}

export default function CommercialCleaningPage() {
  return (
    <ServicePageTemplate
      title="Commercial Cleaning Services"
      subtitle="Reliable, insured, after-hours business cleaning."
      description="Professional commercial cleaning services in Evansville and surrounding areas. We provide reliable, after-hours cleaning for offices, retail spaces, medical facilities, and more using eco-friendly products."
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
      services={[
        {
          title: "Office Cleaning",
          description: "Regular cleaning for professional office environments",
          price: "From $120",
          href: "/cleaning/commercial",
        },
        {
          title: "Retail Cleaning",
          description: "Specialized cleaning for retail and customer-facing spaces",
          price: "From $150",
          href: "/cleaning/commercial",
        },
        {
          title: "Medical Office Cleaning",
          description: "Healthcare facility cleaning with enhanced sanitization",
          price: "From $180",
          href: "/cleaning/commercial",
        },
        {
          title: "Restaurant Cleaning",
          description: "Food service establishment cleaning and sanitization",
          price: "From $200",
          href: "/cleaning/commercial",
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
          price: "$120-200",
          description: "Regular cleaning for professional office environments",
        },
        {
          name: "Retail Cleaning",
          price: "$150-250",
          description: "Specialized cleaning for customer-facing spaces",
        },
        {
          name: "Medical Cleaning",
          price: "$180-300",
          description: "Healthcare facility cleaning with enhanced sanitization",
        },
      ]}
      faqs={[
        {
          question: "Do you offer after-hours cleaning?",
          answer:
            "Yes! We specialize in after-hours cleaning to minimize disruption to your business operations. We can work evenings, weekends, or any schedule that works best for your business.",
        },
        {
          question: "Are you insured and bonded?",
          answer:
            "Absolutely. We carry comprehensive general liability insurance and are fully bonded. We can provide certificates of insurance to your business as needed.",
        },
        {
          question: "How do you ensure security during cleaning?",
          answer:
            "All team members undergo background checks and security training. We work with your existing security systems and can provide detailed access logs and cleaning reports.",
        },
        {
          question: "What cleaning products do you use in commercial settings?",
          answer:
            "We use professional-grade, eco-friendly cleaning products that are effective yet safe for employees and customers. All products meet or exceed industry standards for commercial use.",
        },
        {
          question: "Can you customize cleaning schedules for our business?",
          answer:
            "Yes! We offer flexible scheduling including daily, weekly, bi-weekly, or monthly service. We'll work with you to create a cleaning schedule that fits your business needs and budget.",
        },
      ]}
    />
  )
}
