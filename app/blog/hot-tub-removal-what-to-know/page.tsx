import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, AlertTriangle, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Hot Tub Removal: What to Know Before We Arrive | Uncle Sam Junk Removal",
  description:
    "Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options. Make your hot tub removal smooth and safe.",
  keywords: "hot tub removal preparation, spa removal Evansville, hot tub disposal, jacuzzi removal Indiana",
}

export default function HotTubRemovalPage() {
  const preparationSteps = [
    {
      icon: Zap,
      title: "Electrical Disconnection",
      description: "Turn off power at the breaker and have a licensed electrician disconnect if needed",
      priority: "Critical",
      color: "red",
    },
    {
      icon: CheckCircle,
      title: "Clear Access Path",
      description: "Remove obstacles from the path between hot tub and truck parking area",
      priority: "Important",
      color: "yellow",
    },
    {
      icon: AlertTriangle,
      title: "Drain Completely",
      description: "Remove all water and allow to dry to prevent mold and reduce weight",
      priority: "Required",
      color: "blue",
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link href="/blog" className="text-red-600 hover:text-red-700 font-medium">
              ← Back to Blog
            </Link>
          </div>

          <header className="mb-12">
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Service Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hot tub removal: what to know before we arrive
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Uncle Sam Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>January 10, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
              <Image
                src="/hot-tub-removal-checklist.png"
                alt="Hot tub removal preparation"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Planning to remove that old hot tub from your Evansville backyard? Proper preparation makes the difference
              between a smooth removal and a complicated, expensive project. Here's everything you need to know to
              prepare for professional hot tub removal.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-red-800">Safety First</h3>
              </div>
              <p className="text-red-700">
                Hot tub removal involves electrical disconnection and heavy lifting. Never attempt to disconnect
                electrical connections yourself unless you're a licensed electrician. Water and electricity are a deadly
                combination.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Preparation Steps</h2>

            <div className="space-y-6 mb-8">
              {preparationSteps.map((step, index) => {
                const Icon = step.icon
                const colorClasses = {
                  red: "border-red-200 bg-red-50",
                  yellow: "border-yellow-200 bg-yellow-50",
                  blue: "border-blue-200 bg-blue-50",
                }
                return (
                  <Card key={index} className={`glass ${colorClasses[step.color as keyof typeof colorClasses]}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.color === "red"
                              ? "bg-red-600"
                              : step.color === "yellow"
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          }`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              step.color === "red"
                                ? "bg-red-100 text-red-700"
                                : step.color === "yellow"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {step.priority}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{step.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Electrical Disconnection Guide</h2>

            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Before Our Arrival</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">1. Turn Off Power at the Breaker</h4>
                  <p className="text-gray-700">
                    Locate your hot tub's dedicated circuit breaker and switch it to the OFF position. This is usually a
                    40-60 amp breaker labeled "Hot Tub" or "Spa."
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2. Test That Power is Off</h4>
                  <p className="text-gray-700">
                    Use a non-contact voltage tester to verify power is completely off at the disconnect box near your
                    hot tub.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3. When to Call an Electrician</h4>
                  <p className="text-gray-700">
                    If your hot tub is hardwired (not plugged in) or you're unsure about the electrical setup, hire a
                    licensed electrician for safe disconnection.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Access and Space Requirements</h2>

            <p className="text-gray-700 mb-4">
              Hot tub removal requires adequate space for our team and equipment. Here's what we need:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Minimum Access Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 4-foot wide path to hot tub</li>
                    <li>• 8-foot overhead clearance</li>
                    <li>• Stable ground for equipment</li>
                    <li>• Truck parking within 50 feet</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Common Obstacles to Remove</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Patio furniture</li>
                    <li>• Planters and decorations</li>
                    <li>• Low-hanging branches</li>
                    <li>• Garden hoses and equipment</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Happens During Removal</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Safety Assessment</h4>
                  <p className="text-gray-700">
                    We inspect the electrical disconnection, access path, and hot tub condition.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dismantling Process</h4>
                  <p className="text-gray-700">
                    We carefully dismantle the hot tub into manageable pieces, starting with the shell and cabinet.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cleanup and Disposal</h4>
                  <p className="text-gray-700">
                    All debris is removed, and we clean the area where your hot tub was located.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost Factors to Consider</h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing Variables</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Standard Removal: $389-489</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Ground level access</li>
                    <li>• Pre-disconnected electrical</li>
                    <li>• Clear access path</li>
                    <li>• Standard size hot tub</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Complex Removal: $489-649</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Deck or elevated location</li>
                    <li>• Electrical disconnection needed</li>
                    <li>• Difficult access</li>
                    <li>• Oversized or built-in spa</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready for Hot Tub Removal?</h3>
              <p className="text-gray-700 mb-4">
                Uncle Sam Junk Removal makes hot tub removal safe and hassle-free. We handle everything from electrical
                disconnection to final cleanup, so you can focus on enjoying your newly reclaimed space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white px-6 py-3 font-semibold bg-transparent"
                >
                  Get Hot Tub Removal Quote
                </Button>
              </div>
            </div>

            <p className="text-gray-700">
              <strong>Remember:</strong> Proper preparation saves time and money. When in doubt about electrical
              disconnection or access requirements, give us a call. We're happy to walk you through the preparation
              process and ensure your hot tub removal goes smoothly.
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
