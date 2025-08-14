import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Camera, Truck, Recycle, Clock } from "lucide-react"
import { settings } from "@/lib/cms-content"

export const metadata = {
  title: "Shed Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional shed and outbuilding removal in Evansville, Indiana. Complete demolition and cleanup. Same-day service available. Call ${settings.phone}`,
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
      answer:
        "Yes, please remove all contents before our arrival. We can provide junk removal service for shed contents at an additional cost if needed.",
    },
    {
      question: "How much does shed removal cost in Evansville?",
      answer:
        "Shed removal costs $289-649 depending on size and materials. Small storage sheds start at $289, while large barns can cost up to $649. We provide free estimates.",
    },
    {
      question: "Can you remove sheds with concrete foundations?",
      answer:
        "Yes, we can remove concrete pads and foundations. This requires additional equipment and time, typically adding $200-400 to the base price depending on size.",
    },
    {
      question: "What materials can you recycle from shed demolition?",
      answer:
        "We recycle metal roofing, siding, hardware, and lumber when possible. Asphalt shingles and treated lumber are disposed of at certified facilities.",
    },
    {
      question: "How long does shed removal take?",
      answer:
        "Small sheds (8x10) take 2-3 hours, medium sheds (10x12) take 3-4 hours, and large sheds or barns can take 4-8 hours depending on complexity.",
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Shed Removal in Evansville</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Complete shed and outbuilding removal with demolition and cleanup services
            </p>
            <div className="flex items-center justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Same-day service available</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Shed Removal Services</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Free Assessment</h3>
                    <p className="text-gray-600">We evaluate your shed size, materials, and access for accurate pricing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Preparation & Safety</h3>
                    <p className="text-gray-600">Clear contents, disconnect utilities, and set up safety perimeter.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Careful Demolition</h3>
                    <p className="text-gray-600">Systematic dismantling starting from roof down to foundation.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  variant="outline"
                  className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Schedule Shed Removal
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Shed Removal Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Small Shed (up to 8x10)</span>
                  <span className="text-green-600 font-bold">$289-389</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Medium Shed (10x12)</span>
                  <span className="text-green-600 font-bold">$389-549</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-900">Large Shed / Barn</span>
                  <span className="text-green-600 font-bold">$549-649</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">*Final pricing depends on materials and access</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
