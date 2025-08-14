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
      answer: "Yes, our team handles removal from any floor, including upstairs and basements.",
    },
    {
      question: "Do you recycle mattresses?",
      answer: "We recycle mattresses and box springs whenever possible to reduce landfill waste.",
    },
    {
      question: "Can you remove bed frames and headboards too?",
      answer: "Absolutely. We can disassemble and remove bed frames, headboards, and other bedroom furniture.",
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-16 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Mattress Removal in Evansville</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">Fast, eco-friendly pickup of mattresses and box springs</p>
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
                  Get Mattress Removal Quote
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Remove</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Mattresses (twin, full, queen, king)</li>
                <li>✓ Box springs and foundations</li>
                <li>✓ Bed frames and headboards</li>
                <li>✓ Futons and sofa beds</li>
                <li>✓ Mattress toppers</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq) => (
              <Card key={faq.question} className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">{faq.question}</CardTitle>
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
