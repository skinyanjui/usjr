import type { Metadata } from "next"
import { ServicesSection } from "@/components/services-section"

export const metadata: Metadata = {
  title: "Professional Junk Removal & Cleaning Services | Uncle Sam Junk Removal",
  description:
    "Comprehensive junk removal, dumpster rental, and cleaning services in Evansville, Indiana. Eco-friendly disposal, free estimates, and reliable service throughout Southern Indiana.",
  keywords:
    "junk removal services, dumpster rental, cleaning services, Evansville Indiana, Southern Indiana, waste management, eco-friendly disposal",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <ServicesSection />
    </div>
  )
}
