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
      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link href="/blog" className="text-red-600 hover:text-red-700 font-medium">
              ← Back to Blog
            </Link>
          </div>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hot tub removal: what to know before we arrive</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Uncle Sam Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>January 8, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>
          </header>

          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
            <Image src="/hot-tub-removal-checklist.png" alt="Hot tub removal preparation" fill className="object-cover" />
          </div>

          <section className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {preparationSteps.map((step) => (
                <Card key={step.title} className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <step.icon className="w-4 h-4 text-red-600" />
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{step.description}</p>
                    <span className="inline-block mt-3 text-xs text-gray-600">Priority: {step.priority}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to remove your hot tub?</h2>
              <p className="text-gray-700 mb-4">We handle disassembly, hauling, and proper disposal. Get an instant quote.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Get Free Quote</Button>
                <Link href="/services/hot-tub-removal">
                  <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white bg-transparent">
                    Learn about Hot Tub Removal
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
