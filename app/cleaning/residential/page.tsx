import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Home, Sparkles, Clock, Shield, Star, Calendar, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Residential Cleaning Services in Evansville, IN | Bulls of Indiana",
  description:
    "Veteran-led, spotless results using natural products. Deep cleaning, recurring service, move-in/out cleaning in Evansville and surrounding areas.",
  keywords:
    "residential cleaning Evansville, house cleaning, deep cleaning, recurring cleaning, natural cleaning products",
}

export default function ResidentialCleaning() {
  return (
    <ServicePageTemplate
      title="Residential Cleaning Services"
      subtitle="Veteran-led, spotless results using natural products."
      description="Professional residential cleaning services in Evansville and surrounding areas. We use only natural, eco-friendly products to keep your home spotless and your family safe."
      heroImage="/natural-cleaning-service.png"
      theme="green"
      badges={["From $80", "Natural Products", "Veteran-Led"]}
      features={[
        {
          icon: Home,
          title: "Local Team",
          description: "Evansville-based, trusted professionals",
        },
        {
          icon: Clock,
          title: "Flexible Scheduling",
          description: "Work around your busy schedule",
        },
        {
          icon: Sparkles,
          title: "Green Cleaning",
          description: "Natural, eco-friendly products only",
        },
        {
          icon: Shield,
          title: "Attention to Detail",
          description: "Thorough, consistent results every time",
        },
      ]}
      services={[
        {
          title: "Deep Cleaning",
          description: "Comprehensive one-time cleaning for your entire home",
          price: "From $150",
          href: "/cleaning/deep-clean",
        },
        {
          title: "Recurring Cleaning",
          description: "Weekly, bi-weekly, or monthly maintenance",
          price: "From $80",
          href: "/cleaning/recurring",
        },
        {
          title: "Move-In/Move-Out",
          description: "Complete property cleaning for transitions",
          price: "From $200",
          href: "/cleaning/move-in-move-out",
        },
        {
          title: "Specialty Cleaning",
          description: "Organizing, decluttering, and specialized tasks",
          price: "From $100",
          href: "/cleaning/specialty",
        },
      ]}
      steps={[
        {
          icon: Calendar,
          title: "Book Online",
          description: "Schedule your cleaning service online or call us directly",
        },
        {
          icon: Users,
          title: "We Arrive",
          description: "Our team arrives with all supplies and equipment needed",
        },
        {
          icon: Sparkles,
          title: "We Clean",
          description: "Thorough cleaning using natural, eco-friendly products",
        },
        {
          icon: Star,
          title: "Enjoy",
          description: "Relax in your spotless, naturally clean home",
        },
      ]}
      pricing={[
        {
          name: "Recurring Cleaning",
          price: "$80-120",
          description: "Weekly, bi-weekly, or monthly maintenance cleaning",
        },
        {
          name: "Deep Cleaning",
          price: "$150-250",
          description: "Comprehensive one-time cleaning for entire home",
        },
        {
          name: "Move-In/Out",
          price: "$200-300",
          description: "Complete property cleaning for transitions",
        },
      ]}
      faqs={[
        {
          question: "What cleaning products do you use?",
          answer:
            "We exclusively use natural, eco-friendly cleaning products that are safe for your family and pets. All our products are non-toxic and biodegradable.",
        },
        {
          question: "Do I need to be home during the cleaning?",
          answer:
            "No, you don't need to be home. Many of our clients provide us with access and go about their day. We're fully insured and bonded for your peace of mind.",
        },
        {
          question: "How long does a typical cleaning take?",
          answer:
            "Deep cleaning typically takes 3-5 hours depending on home size. Recurring cleanings are usually 1.5-3 hours. We'll provide an accurate estimate during your quote.",
        },
        {
          question: "What if I'm not satisfied with the cleaning?",
          answer:
            "We offer a 48-hour re-clean guarantee. If you're not completely satisfied, we'll return within 48 hours to make it right at no additional cost.",
        },
        {
          question: "Do you bring your own supplies and equipment?",
          answer:
            "Yes, we bring all necessary cleaning supplies and equipment. Our natural products and professional-grade tools ensure the best results for your home.",
        },
      ]}
    />
  )
}
