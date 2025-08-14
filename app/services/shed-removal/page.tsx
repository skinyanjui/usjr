import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Camera, Truck, Recycle, Clock } from "lucide-react"

export const metadata = {
  title: "Shed Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    "Professional shed and outbuilding removal in Evansville, Indiana. Complete demolition and cleanup. Same-day service available. Call (812) 610-1657",
  keywords: "shed removal Evansville, outbuilding removal Indiana, shed demolition, storage building removal",
}

export default function ShedRemovalPage() {
  const steps = [
    {
      icon: Phone,
      title: "Free Assessment",
      description: "We evaluate your shed size, materials, and access for accurate pricing.",
    },
    {
      icon: Camera,
      title: "Preparation & Safety",
      description: "Clear contents, disconnect utilities, and set up safety perimeter.",
    },
    {
      icon: Truck,
      title: "Careful Demolition",
      description: "Systematic dismantling starting from roof down to foundation.",
    },
    {
      icon: Recycle,
      title: "Complete Cleanup",
      description: "Remove all debris, recycle materials, and leave area clean.",
    },
  ]

  const faqs = [
    {
      question: "Do I need to empty my shed before removal?",
      answer: "Yes, please remove all personal items. We can assist with contents removal upon request.",
    },
    {
      question: "Do you handle permits?",
      answer: "We can advise on permits, but they are typically the homeowner's responsibility.",
    },
    {
      question: "What about the foundation?",
      answer: "We remove typical wood floors. Concrete slabs can be left in place or removed for an additional fee.",
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-16 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Shed Removal in Evansville</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">Complete demolition, hauling, and cleanup</p>
            <div className="flex items-center justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-red-600" />
                <span>Same-day service available</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Licensed & insured</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                )
              })}

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Get Shed Removal Quote
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h3>
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
