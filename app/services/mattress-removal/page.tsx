import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Camera, Truck, Recycle, Clock } from "lucide-react"

export const metadata = {
  title: "Mattress Removal Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    "Professional mattress and box spring removal in Evansville, Indiana. Eco-friendly disposal and recycling. Same-day service available. Call (812) 610-1657",
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
    {
      question: "Do you offer same-day mattress removal?",
      answer:
        "Yes, we offer same-day service for mattress removal when you call before 2 PM. This is perfect for furniture deliveries or urgent cleanouts.",
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Mattress Removal in Evansville</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Fast, professional mattress and box spring removal with eco-friendly disposal
            </p>
            <div className="flex items-center justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>Same-day service available</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Eco-friendly recycling</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Uncle Sam Junk Removal for Mattress Removal?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Any Condition Accepted</h3>
                    <p className="text-gray-600">Stained, torn, or water-damaged mattresses welcome</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">From Any Location</h3>
                    <p className="text-gray-600">Upstairs, basements, tight spaces - we handle it all</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Recycling Partners</h3>
                    <p className="text-gray-600">Working with local facilities to maximize recycling</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Schedule Pickup
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mattress Removal Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Single Mattress</span>
                  <span className="text-purple-600 font-bold">$89</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Box Spring (with mattress)</span>
                  <span className="text-purple-600 font-bold">+$25</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Bed Frame (with set)</span>
                  <span className="text-purple-600 font-bold">+$35</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Complete Bedroom Set</span>
                  <span className="text-purple-600 font-bold">$149-179</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-900">Multiple Mattresses</span>
                  <span className="text-purple-600 font-bold">10% Discount</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">*All prices include pickup, hauling, and disposal fees</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Mattress Removal Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index} className="text-center glass hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
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

      <Footer />
    </main>
  )
}
