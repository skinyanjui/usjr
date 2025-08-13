import type { Metadata } from "next"
import { ServicePageTemplate } from "@/components/ui/service-page-template"
import { Sparkles, Shield, Clock, CheckCircle, Star, Users, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Deep Cleaning Services in Evansville, IN | Bulls of Indiana",
  description:
    "Professional deep cleaning services in Evansville using natural products. Comprehensive one-time cleaning for your entire home. Book your deep clean today!",
  keywords: "deep cleaning Evansville, house deep cleaning, one-time cleaning, natural cleaning products",
}

export default function DeepCleaningPage() {
  return (
    <ServicePageTemplate
      title="Deep Cleaning Services"
      subtitle="Comprehensive deep cleaning for your entire home."
      description="Our thorough deep cleaning service covers every corner of your home using natural, eco-friendly products. Perfect for spring cleaning, move-ins, or when you need a fresh start."
      heroImage="/natural-deep-cleaning.png"
      theme="green"
      badges={["From $150", "3-5 Hours", "Natural Products"]}
      features={[
        {
          icon: Sparkles,
          title: "Comprehensive Clean",
          description: "Every corner of your home gets attention",
        },
        {
          icon: Shield,
          title: "Natural Products",
          description: "Safe, eco-friendly cleaning solutions",
        },
        {
          icon: Clock,
          title: "Thorough Process",
          description: "3-5 hours of detailed cleaning",
        },
        {
          icon: CheckCircle,
          title: "Quality Guarantee",
          description: "48-hour re-clean guarantee",
        },
      ]}
      services={[
        {
          title: "Kitchen Deep Clean",
          description: "Counters, cabinets, appliances, and all surfaces",
          price: "Included",
          href: "/cleaning/deep-clean",
        },
        {
          title: "Bathroom Sanitization",
          description: "Toilet, shower, tub, mirrors, and fixtures",
          price: "Included",
          href: "/cleaning/deep-clean",
        },
        {
          title: "Bedroom Cleaning",
          description: "Dusting, bed making, and floor care",
          price: "Included",
          href: "/cleaning/deep-clean",
        },
        {
          title: "Living Areas",
          description: "High-to-low dusting and detailed cleaning",
          price: "Included",
          href: "/cleaning/deep-clean",
        },
      ]}
      steps={[
        {
          icon: Home,
          title: "Assessment",
          description: "We assess your home and create a customized cleaning plan",
        },
        {
          icon: Users,
          title: "Preparation",
          description: "Set up equipment and organize supplies for efficient cleaning",
        },
        {
          icon: Sparkles,
          title: "Deep Clean",
          description: "Systematic room-by-room deep cleaning using natural products",
        },
        {
          icon: Star,
          title: "Final Check",
          description: "Quality inspection and walkthrough with you",
        },
      ]}
      pricing={[
        {
          name: "Small Home",
          price: "$150-200",
          description: "1-2 bedrooms, 1-2 bathrooms",
        },
        {
          name: "Medium Home",
          price: "$200-300",
          description: "3-4 bedrooms, 2-3 bathrooms",
        },
        {
          name: "Large Home",
          price: "$300-450",
          description: "5+ bedrooms, 3+ bathrooms",
        },
      ]}
      faqs={[
        {
          question: "How long does a deep cleaning take?",
          answer:
            "Deep cleaning typically takes 3-5 hours depending on the size of your home and its current condition. We'll provide an accurate time estimate during your quote.",
        },
        {
          question: "What's the difference between deep cleaning and regular cleaning?",
          answer:
            "Deep cleaning is more thorough and includes areas not covered in regular cleaning like baseboards, ceiling fans, inside appliances, and detailed sanitization of all surfaces.",
        },
        {
          question: "Do I need to prepare anything before you arrive?",
          answer:
            "Just clear personal items from surfaces and ensure we have access to all areas. We bring all cleaning supplies and equipment needed for the job.",
        },
        {
          question: "How often should I get a deep cleaning?",
          answer:
            "We recommend deep cleaning 2-4 times per year, or when moving into a new home. Many clients start with deep cleaning then switch to our recurring service.",
        },
        {
          question: "Are your cleaning products safe for pets and children?",
          answer:
            "Yes! We exclusively use natural, non-toxic cleaning products that are completely safe for your family and pets. All products are eco-friendly and biodegradable.",
        },
      ]}
    />
  )
}
