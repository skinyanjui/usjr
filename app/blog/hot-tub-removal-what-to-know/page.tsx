import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, AlertTriangle, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { settings } from "@/lib/cms-content"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata = {
  title: "Hot Tub Removal: What to Know Before We Arrive | Uncle Sam Junk Removal",
  description:
    "Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options. Make your hot tub removal smooth and safe.",
  keywords: "hot tub removal preparation, spa removal Evansville, hot tub disposal, jacuzzi removal Indiana",
  ...buildCanonicalMetadata("/blog/hot-tub-removal-what-to-know", baseUrl),
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
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Service Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hot tub removal: what to know before we arrive
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
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
              />
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p>
              Preparing properly for hot tub removal ensures safety and efficiency. Use this checklist to get everything
              ready before our team arrives.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pre-Removal Checklist</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {preparationSteps.map((step, index) => {
                const Icon = step.icon
                const colorClasses =
                  step.color === "red"
                    ? "bg-red-600"
                    : step.color === "yellow"
                      ? "bg-yellow-500"
                      : "bg-blue-600"
                return (
                  <Card key={index} className="glass">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`${colorClasses} w-12 h-12 rounded-full flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{step.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="bg-red-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to remove your hot tub?</h3>
              <p className="text-gray-700 mb-4">
                We can often remove your hot tub the same or next day. Text a photo for an instant estimate, or call to
                schedule a crew.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold">
                  <a href={`tel:${settings.phoneE164}`}>📞 Call {settings.phone}</a>
                </Button>
                <Button asChild variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-6 py-3 font-semibold bg-transparent">
                  <a href={`sms:${settings.phoneE164}`}>Text Photos for Instant Quote</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
