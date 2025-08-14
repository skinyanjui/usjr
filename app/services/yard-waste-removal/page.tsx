import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Camera, Truck, Recycle, Clock } from "lucide-react"

export const metadata = {
  title: "Yard Waste Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    "Professional yard waste removal in Evansville, Indiana. Brush, leaves, tree limbs, landscaping debris. Same-day service available. Call (812) 610-1657",
  keywords: "yard waste removal Evansville, brush removal Indiana, tree limb removal, landscaping debris Evansville",
}

export default function YardWasteRemovalPage() {
  const steps = [
    {
      icon: Phone,
      title: "Quick Scheduling",
      description: "Call for same-day pickup of yard waste and landscaping debris.",
    },
    {
      icon: Camera,
      title: "Efficient Collection",
      description: "Our team collects all yard waste from anywhere on your property.",
    },
    {
      icon: Truck,
      title: "Proper Loading",
      description: "Specialized equipment for handling large volumes of organic waste.",
    },
    {
      icon: Recycle,
      title: "Eco-Friendly Processing",
      description: "All yard waste is composted or processed into mulch and soil amendments.",
    },
  ]

  const faqs = [
    {
      question: "What types of yard waste do you remove?",
      answer: "Brush, leaves, branches, lawn clippings, and general landscaping debris.",
    },
    {
      question: "Do you offer curbside pickup discounts?",
      answer: "Yes, curbside placement can reduce labor and may reduce your quote.",
    },
    {
      question: "Can you chip branches on-site?",
      answer: "We typically haul debris. On-site chipping may be available upon request.",
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Yard Waste Removal in Evansville</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">Brush, leaves, limbs, and landscaping debris hauled away</p>
            <div className="flex items-center justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Same-day service available</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Eco-friendly disposal</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                )
              })}

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Get Yard Waste Quote
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <ul className="space-y-2 text-gray-700">
                {faqs.map((faq) => (
                  <li key={faq.question}>• <span className="font-semibold">{faq.question}</span> — {faq.answer}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
