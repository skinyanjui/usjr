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
      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link href="/blog" className="text-red-600 hover:text-red-700 font-medium">
              ← Back to Blog
            </Link>
          </div>

          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Property Manager Turnover Playbook</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Uncle Sam Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>January 6, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>10 min read</span>
              </div>
            </div>
          </header>

          <section className="space-y-8">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Image src="/rental-turnover-cleanup.png" alt="Rental turnover cleanup" fill className="object-cover" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {phases.map((phase, idx) => (
                <Card key={idx} className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <phase.icon className="w-4 h-4 text-red-600" />
                      {phase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">{phase.timeframe}</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {phase.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Need Turnover Support?</h2>
              <p className="text-gray-700 mb-4">We specialize in trash-outs, deep cleaning, and ready-for-market prep.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Free Quote</Button>
                <Link href="/compare">
                  <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white bg-transparent">
                    Compare Services
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
