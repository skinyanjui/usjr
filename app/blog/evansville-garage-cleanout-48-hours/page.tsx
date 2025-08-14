import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, CheckCircle, Timer, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Evansville Garage Cleanout in 48 Hours: Complete Checklist & Timeline",
  description:
    "Step-by-step guide to completely clean out your Evansville garage in just 48 hours. Includes sorting strategies, disposal options, and organization tips.",
  keywords: "garage cleanout Evansville, garage organization, 48 hour cleanup, garage decluttering Indiana",
}

export default function GarageCleanoutPage() {
  const timeline = [
    {
      time: "Day 1: Morning (8am-12pm)",
      tasks: ["Empty entire garage", "Sort into 4 categories", "Take inventory photos"],
      icon: Timer,
    },
    {
      time: "Day 1: Afternoon (1pm-5pm)",
      tasks: ["Deep clean empty garage", "Repair/prep storage areas", "Schedule donations pickup"],
      icon: CheckCircle,
    },
    {
      time: "Day 2: Morning (8am-12pm)",
      tasks: ["Organize keep items", "Install storage solutions", "Load donation items"],
      icon: Timer,
    },
    {
      time: "Day 2: Afternoon (1pm-5pm)",
      tasks: ["Final organization", "Schedule junk removal", "Celebrate success!"],
      icon: Trash2,
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Evansville garage cleanout in 48 hours: checklist & timeline
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Uncle Sam Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>January 12, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>6 min read</span>
              </div>
            </div>
          </header>

          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
            <Image src="/organized-garage-cleanout.png" alt="Organized garage" fill className="object-cover" />
          </div>

          <section className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {timeline.map((segment) => (
                <Card key={segment.time} className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <segment.icon className="w-4 h-4 text-red-600" />
                      {segment.time}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {segment.tasks.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to reclaim your garage?</h2>
              <p className="text-gray-700 mb-4">We can haul away unwanted items and help with reorganization.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Get Free Quote</Button>
                <Link href="/services/junk-removal">
                  <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white bg-transparent">
                    Learn about Junk Removal
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
