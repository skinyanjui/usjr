import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Camera, Truck, Recycle, Clock } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"

export const metadata = {
  title: "Light Demolition Evansville IN | Same-Day Service | Uncle Sam Junk Removal",
  description:
    `Professional light demolition services in Evansville, Indiana. Interior demo, deck removal, fence removal. Same-day service available. Call ${settings.phone}`,
  keywords: "light demolition Evansville, interior demolition Indiana, deck removal, fence removal Evansville",
}

export default function LightDemolitionPage() {
  const steps = [
    {
      icon: Phone,
      title: "Project Assessment",
      description: "We evaluate your demolition project and provide detailed pricing and timeline.",
    },
    {
      icon: Camera,
      title: "Safety Preparation",
      description: "Secure area, disconnect utilities, and set up proper safety measures.",
    },
    {
      icon: Truck,
      title: "Careful Demolition",
      description: "Systematic demolition using proper tools and techniques for safety.",
    },
    {
      icon: Recycle,
      title: "Complete Cleanup",
      description: "Remove all debris, recycle materials, and leave area clean and safe.",
    },
  ]

  const faqs = [
    {
      question: "What types of light demolition do you handle?",
      answer:
        "We handle interior walls, decks, fences, small outbuildings, bathroom/kitchen demo, flooring removal, and similar projects. We don't handle structural or load-bearing demolition.",
    },
    {
      question: "How much does light demolition cost in Evansville?",
      answer:
        "Light demolition costs from $389-899 depending on project size and complexity. Interior room demo from $389, while deck or fence removal ranges from $289-649.",
    },
    {
      question: "Do you handle permits for demolition projects?",
      answer:
        "We can advise on permit requirements, but permits are typically the homeowner's responsibility. We ensure all work meets local building codes and safety standards.",
    },
    {
      question: "Can you do selective demolition to save certain elements?",
      answer:
        "Yes, we specialize in careful, selective demolition to preserve elements you want to keep. This includes saving fixtures, trim, or structural elements for reuse.",
    },
    {
      question: "What safety measures do you take during demolition?",
      answer:
        "We follow OSHA safety standards, use proper protective equipment, secure work areas, disconnect utilities safely, and ensure proper dust and debris containment.",
    },
  ]

  return (
    <main className="min-h-screen">
      <PageHero
        title="Light Demolition in Evansville"
        description="Interior demo, deck and fence removal with safety-first approach"
        imageSrc="/junk-removal-evansville.png"
        priority
      />
      <section className="pt-16 pb-16 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Light Demolition in Evansville</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Professional light demolition services with safety-first approach and complete cleanup
            </p>
            <div className="flex items-center justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-red-600" />
                <span>Same-day service available</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>OSHA safety compliant</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Light Demolition Services</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Interior Demolition</h3>
                    <p className="text-gray-600">Walls, flooring, cabinets, bathroom and kitchen demo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Exterior Structures</h3>
                    <p className="text-gray-600">Decks, fences, small sheds, and outbuildings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Selective Demolition</h3>
                    <p className="text-gray-600">Careful removal while preserving elements you want to keep</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold">
                  <a href={`tel:${settings.phoneE164}`}>📞 Call {settings.phone}</a>
                </Button>
                <Button
                  variant="outline"
                  className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-transparent"
                >
                  Get Project Quote
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Light Demolition Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Interior Room Demo</span>
                  <span className="text-red-600 font-bold">From $389-549</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Deck Removal</span>
                  <span className="text-red-600 font-bold">From $289-649</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Fence Removal</span>
                  <span className="text-red-600 font-bold">From $289-489</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Kitchen/Bath Demo</span>
                  <span className="text-red-600 font-bold">From $549-899</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-900">Flooring Removal</span>
                  <span className="text-red-600 font-bold">From $3-8/sq ft</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                *All prices include demolition, debris removal, and site cleanup
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Light Demolition Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index} className="text-center glass hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
    </main>
  )
}
