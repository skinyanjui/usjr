import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, CheckCircle, DollarSign, Timer, Building2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Property Manager Turnover Playbook: Trash-Out to Broom Clean | Uncle Sam Junk Removal",
  description:
    "Complete guide for property managers handling tenant turnovers. From initial assessment to final cleanup, streamline your process and reduce vacancy time.",
  keywords:
    "property management turnover, rental cleanup Evansville, tenant turnover, property manager junk removal, rental property cleanup",
}

export default function PropertyManagerPlaybookPage() {
  const phases = [
    {
      icon: Building2,
      title: "Initial Assessment",
      timeframe: "Day 1",
      tasks: [
        "Document property condition",
        "Inventory abandoned items",
        "Assess cleaning needs",
        "Get cost estimates",
      ],
    },
    {
      icon: Timer,
      title: "Trash-Out Phase",
      timeframe: "Days 2-3",
      tasks: ["Remove all abandoned items", "Clear out appliances", "Dispose of debris", "Coordinate donations"],
    },
    {
      icon: CheckCircle,
      title: "Deep Cleaning",
      timeframe: "Days 4-5",
      tasks: ["Professional cleaning", "Carpet cleaning/replacement", "Paint touch-ups", "Final inspection"],
    },
    {
      icon: DollarSign,
      title: "Market Ready",
      timeframe: "Day 6",
      tasks: ["Final walkthrough", "Photography", "List property", "Schedule showings"],
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
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Property Management
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Property manager turnover playbook: trash-out to broom clean
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>Uncle Sam Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>January 8, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>10 min read</span>
              </div>
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
              <Image
                src="/rental-turnover-cleanup.png"
                alt="Property management turnover process"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Every property manager in Evansville knows the drill: tenant moves out, and you're left with everything
              from abandoned furniture to mysterious stains. Here's your complete playbook to get from "disaster zone"
              to "move-in ready" in just 6 days.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">The 6-Day Turnover Timeline</h2>

            <div className="space-y-6 mb-8">
              {phases.map((phase, index) => {
                const Icon = phase.icon
                return (
                  <Card key={index} className="glass">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900">{phase.title}</CardTitle>
                          <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {phase.timeframe}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-purple-600" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Day 1: Initial Assessment Checklist</h2>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Documentation is Key</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Photo Everything</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Overall condition of each room</li>
                    <li>• Damage beyond normal wear</li>
                    <li>• Abandoned items and furniture</li>
                    <li>• Appliances left behind</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Create Inventory Lists</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Items to be removed</li>
                    <li>• Repairs needed</li>
                    <li>• Cleaning requirements</li>
                    <li>• Estimated timeline</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Days 2-3: Professional Trash-Out</h2>

            <p className="text-gray-700 mb-4">
              This is where Uncle Sam Junk Removal saves you time and money. Instead of multiple trips to the dump and
              donation centers, we handle everything in one efficient sweep.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="glass border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-green-700">What We Remove</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• All abandoned furniture</li>
                    <li>• Appliances (working or broken)</li>
                    <li>• Personal belongings left behind</li>
                    <li>• Carpet and flooring (if needed)</li>
                    <li>• Construction debris</li>
                    <li>• Yard waste and outdoor items</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-700">Value Recovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Donate usable furniture</li>
                    <li>• Recycle metals and electronics</li>
                    <li>• Coordinate appliance donations</li>
                    <li>• Maximize tax deduction value</li>
                    <li>• Provide donation receipts</li>
                    <li>• Reduce disposal costs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost Management Strategies</h2>

            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Budget-Smart Approaches</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Flat-Rate Pricing</h4>
                  <p className="text-gray-700">
                    Our property management rates are $389-649 per unit, regardless of how long it takes. No hourly
                    surprises.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Multi-Unit Discounts</h4>
                  <p className="text-gray-700">
                    Managing multiple properties? We offer 15% discounts for 3+ units scheduled together.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recurring Service Benefits</h4>
                  <p className="text-gray-700">
                    Regular clients get priority scheduling and preferred pricing for urgent turnovers.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Turnover Challenges & Solutions</h2>

            <div className="space-y-6 mb-8">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Challenge: Hoarding Situations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">
                    <strong>Solution:</strong> We specialize in hoarding cleanouts with sensitivity and efficiency.
                    Expect 1-2 extra days and $200-400 additional cost.
                  </p>
                  <p className="text-sm text-gray-600">
                    Tip: Document everything for potential security deposit recovery.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Challenge: Hazardous Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">
                    <strong>Solution:</strong> We identify hazardous items and coordinate proper disposal through
                    certified facilities.
                  </p>
                  <p className="text-sm text-gray-600">
                    Tip: Never handle paint, chemicals, or asbestos yourself - liability issues.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Challenge: Tight Timelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">
                    <strong>Solution:</strong> Our same-day service can start trash-out within hours of your call.
                  </p>
                  <p className="text-sm text-gray-600">
                    Tip: Call us before the tenant officially moves out to schedule immediately.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Legal Considerations for Evansville Property Managers
            </h2>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <h3 className="text-lg font-bold text-red-800 mb-2">Important Legal Notes</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Indiana law requires 10-day notice before disposing of abandoned property worth over $300</li>
                <li>• Document all abandoned items with photos and estimated values</li>
                <li>• Store valuable items for the required period before disposal</li>
                <li>• Keep receipts for all disposal and donation activities</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Streamline Your Process</h2>

            <p className="text-gray-700 mb-4">
              The most successful property managers in Evansville have learned that professional junk removal isn't an
              expense - it's an investment in faster turnovers and higher occupancy rates.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-800 mb-3">Time Savings</h3>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>• 3-4 days faster turnover</li>
                  <li>• No multiple dump runs</li>
                  <li>• One-call solution</li>
                  <li>• Professional efficiency</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Cost Benefits</h3>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Reduced vacancy time</li>
                  <li>• Lower labor costs</li>
                  <li>• Tax deduction receipts</li>
                  <li>• Predictable pricing</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partner with Uncle Sam Junk Removal</h3>
              <p className="text-gray-700 mb-4">
                We understand the property management business. Fast turnovers mean higher profits, and we're here to
                help you achieve both. Our property management services include:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Same-day response for urgent turnovers</li>
                <li>• Flat-rate pricing with no surprises</li>
                <li>• Complete documentation for your records</li>
                <li>• Coordination with your cleaning and repair teams</li>
                <li>• Multi-property discounts</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white px-6 py-3 font-semibold bg-transparent"
                >
                  Get Property Management Rates
                </Button>
              </div>
            </div>

            <p className="text-gray-700">
              <strong>Bottom Line:</strong> Professional property management means professional partnerships. Let Uncle
              Sam Junk Removal handle the heavy lifting while you focus on finding great tenants and maximizing your
              rental income.
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
