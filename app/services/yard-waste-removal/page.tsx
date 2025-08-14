import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
      answer:
        "We remove leaves, grass clippings, brush, tree limbs (up to 6 inches diameter), hedge trimmings, garden debris, and other organic landscaping materials.",
    },
    {
      question: "How much does yard waste removal cost in Evansville?",
      answer:
        "Yard waste removal starts at $179 for small loads and goes up to $489 for large volumes. Tree limbs and brush may require additional fees based on size and quantity.",
    },
    {
      question: "Do you remove large tree limbs and branches?",
      answer:
        "Yes, we remove tree limbs up to 6 inches in diameter. Larger limbs or whole tree removal requires specialized tree service, which we can recommend local providers for.",
    },
    {
      question: "Can you remove yard waste during any season?",
      answer:
        "Yes, we provide year-round yard waste removal including spring cleanup, summer maintenance debris, fall leaf removal, and winter storm cleanup.",
    },
    {
      question: "What happens to the yard waste after removal?",
      answer:
        "All yard waste is taken to certified composting facilities where it's processed into mulch, compost, and soil amendments. Nothing goes to landfills - it's 100% recycled.",
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Yard Waste Removal in Evansville</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Professional yard waste and landscaping debris removal with eco-friendly processing
            </p>
            <div className="flex items-center justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Same-day service available</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>100% composted & recycled</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Yard Waste Removal Services</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">All Organic Materials</h3>
                    <p className="text-gray-600">Leaves, grass, brush, limbs, and garden debris</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Seasonal Cleanup</h3>
                    <p className="text-gray-600">Spring, summer, fall, and storm cleanup services</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Eco-Friendly Processing</h3>
                    <p className="text-gray-600">100% composting and recycling - zero landfill waste</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Schedule Pickup
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Yard Waste Removal Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Small Load (bags/small pile)</span>
                  <span className="text-green-600 font-bold">$179-249</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Medium Load (pickup truck)</span>
                  <span className="text-green-600 font-bold">$249-349</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Large Load (trailer size)</span>
                  <span className="text-green-600 font-bold">$349-489</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Tree Limbs (per load)</span>
                  <span className="text-green-600 font-bold">$289-389</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-900">Seasonal Cleanup</span>
                  <span className="text-green-600 font-bold">$389-649</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">*All prices include collection, hauling, and eco-processing</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Yard Waste Removal Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index} className="text-center glass hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
