import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Camera, Truck, Recycle, Clock } from "lucide-react"
import { settings } from "@/lib/cms-content"

export const metadata = {
  title: "Mattress Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional mattress and box spring removal in Evansville, Indiana. Eco-friendly disposal and recycling. Same-day service available. Call ${settings.phone}`,
  keywords: "mattress removal Evansville, box spring removal Indiana, bed disposal, mattress recycling Evansville",
}

export default function MattressRemovalPage() {
  const steps = [
    {
      icon: Phone,
      title: "Quick Scheduling",
      description: "Call or text for same-day pickup. No need to bag or wrap mattresses.",
    },
    {
      icon: Camera,
      title: "Professional Pickup",
      description: "Our team handles all lifting and loading from any location in your home.",
    },
    {
      icon: Truck,
      title: "Safe Transport",
      description: "Secure transport in covered trucks to prevent contamination.",
    },
    {
      icon: Recycle,
      title: "Eco-Friendly Processing",
      description: "Materials are recycled or donated when possible, never just dumped.",
    },
  ]

  const faqs = [
    {
      question: "Do you remove mattresses from upstairs bedrooms?",
      answer:
        "Yes, we remove mattresses from any location including upstairs bedrooms, basements, and tight spaces. Our team handles all the heavy lifting and navigation.",
    },
    {
      question: "How much does mattress removal cost in Evansville?",
      answer:
        "Single mattress removal starts at $89, with box springs adding $25. Full bedroom sets (mattress, box spring, frame) start at $149. We offer volume discounts for multiple items.",
    },
    {
      question: "Can you remove stained or damaged mattresses?",
      answer:
        "Yes, we remove mattresses in any condition including stained, torn, or water-damaged. We follow proper sanitation protocols and disposal methods for all mattresses.",
    },
    {
      question: "What happens to my old mattress after removal?",
      answer:
        "We partner with local recycling facilities to break down mattresses into component materials. Springs, foam, and fabric are recycled when possible. Unusable materials go to certified disposal facilities.",
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Mattress Removal in Evansville</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Professional mattress and box spring removal with eco-friendly disposal
            </p>
            <div className="flex items-center justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Same-day service available</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mattress Removal Services</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Quick Scheduling</h3>
                    <p className="text-gray-600">Call or text for same-day pickup. No need to bag or wrap mattresses.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Professional Pickup</h3>
                    <p className="text-gray-600">Our team handles all lifting and loading from any location in your home.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Eco-Friendly Processing</h3>
                    <p className="text-gray-600">Materials are recycled or donated when possible, never just dumped.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Get Mattress Removal Quote
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mattress Removal Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Single Mattress</span>
                  <span className="text-blue-600 font-bold">$89-129</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Mattress + Box Spring</span>
                  <span className="text-blue-600 font-bold">$119-179</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-900">Full Bedroom Set</span>
                  <span className="text-blue-600 font-bold">$149-229</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">*Final pricing depends on access and item condition</p>
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
