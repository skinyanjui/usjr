import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">How-To Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Evansville garage cleanout in 48 hours: checklist & timeline
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
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
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
              <Image
                src="/organized-garage-cleanout.png"
                alt="Garage cleanout before and after"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Is your Evansville garage so cluttered you can't park your car? You're not alone. With Indiana's changing
              seasons, garages become catch-alls for everything from holiday decorations to lawn equipment. Here's your
              complete 48-hour garage transformation plan.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Before You Start: Essential Supplies</h2>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Gather These Items First</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Large trash bags (at least 20)</li>
                  <li>• Cardboard boxes for donations</li>
                  <li>• Cleaning supplies (broom, mop, degreaser)</li>
                  <li>• Labels and permanent markers</li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li>• Work gloves and safety glasses</li>
                  <li>• Folding table for sorting</li>
                  <li>• Camera or phone for photos</li>
                  <li>• Snacks and water (it's hard work!)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">The 48-Hour Timeline</h2>

            <div className="space-y-6 mb-8">
              {timeline.map((phase, index) => {
                const Icon = phase.icon
                return (
                  <Card key={index} className="glass">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900">{phase.time}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">The 4-Category Sorting System</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="glass border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-green-700">KEEP</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">Items you use regularly or seasonally</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tools and lawn equipment</li>
                    <li>• Holiday decorations</li>
                    <li>• Sports equipment</li>
                    <li>• Car maintenance supplies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-700">DONATE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">Good condition items you no longer need</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Outgrown sports equipment</li>
                    <li>• Working appliances</li>
                    <li>• Books and games</li>
                    <li>• Household items</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-yellow-700">SELL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">Valuable items worth the effort to sell</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Power tools</li>
                    <li>• Exercise equipment</li>
                    <li>• Antiques or collectibles</li>
                    <li>• Electronics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-red-700">TRASH/RECYCLE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">Broken, expired, or unusable items</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Broken tools</li>
                    <li>• Old paint and chemicals</li>
                    <li>• Worn-out items</li>
                    <li>• Expired products</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Evansville-Specific Disposal Options</h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Local Resources</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Donation Centers</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Goodwill (multiple locations)</li>
                    <li>• Salvation Army</li>
                    <li>• Habitat for Humanity ReStore</li>
                    <li>• Local churches</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hazardous Waste</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Vanderburgh County HHW events</li>
                    <li>• Auto parts stores (oil, batteries)</li>
                    <li>• Home Depot (paint disposal)</li>
                    <li>• Best Buy (electronics)</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Call the Professionals</h2>

            <p className="text-gray-700 mb-4">
              Sometimes the best 48-hour garage cleanout includes professional help. Consider calling Uncle Sam Junk Removal
              if you have:
            </p>

            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Large appliances or heavy items</li>
              <li>• More than 2 truck loads of disposal items</li>
              <li>• Hazardous materials that need special handling</li>
              <li>• Limited time or physical ability</li>
              <li>• Items too large for your vehicle</li>
            </ul>

            <div className="bg-red-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Garage Cleanout Service</h3>
              <p className="text-gray-700 mb-4">
                Let Uncle Sam Junk Removal handle the heavy lifting while you focus on organizing. We'll remove all unwanted
                items, coordinate donations, and leave your garage spotless.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold">
                  📞 Call (812) 610-1657
                </Button>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 font-semibold bg-transparent"
                >
                  Get Garage Cleanout Quote
                </Button>
              </div>
            </div>

            <p className="text-gray-700">
              <strong>Success Tip:</strong> The key to a successful 48-hour garage cleanout is commitment and the right
              plan. Stick to the timeline, be ruthless with the sorting, and don't be afraid to ask for help when you
              need it. Your future self (and your car) will thank you!
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
