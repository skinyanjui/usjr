import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, CheckCircle, Timer, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'
import { SolidPanel } from '@/components/ui/solid-panel'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata = {
  title: 'Evansville Garage Cleanout in 48 Hours: Complete Checklist & Timeline',
  description:
    'Step-by-step guide to completely clean out your Evansville garage in just 48 hours. Includes sorting strategies, disposal options, and organization tips.',
  keywords:
    'garage cleanout Evansville, garage organization, 48 hour cleanup, garage decluttering Indiana',
  ...buildCanonicalMetadata('/blog/evansville-garage-cleanout-48-hours', baseUrl),
}

export default function GarageCleanoutPage() {
  const timeline = [
    {
      time: 'Day 1: Morning (8am-12pm)',
      tasks: ['Empty entire garage', 'Sort into 4 categories', 'Take inventory photos'],
      icon: Timer,
    },
    {
      time: 'Day 1: Afternoon (1pm-5pm)',
      tasks: ['Deep clean empty garage', 'Repair/prep storage areas', 'Schedule donations pickup'],
      icon: CheckCircle,
    },
    {
      time: 'Day 2: Morning (8am-12pm)',
      tasks: ['Organize keep items', 'Install storage solutions', 'Load donation items'],
      icon: Timer,
    },
    {
      time: 'Day 2: Afternoon (1pm-5pm)',
      tasks: ['Final organization', 'Schedule junk removal', 'Celebrate success!'],
      icon: Trash2,
    },
  ]

  return (
    <main className="min-h-screen">
      <article className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <Link href="/blog" className="font-medium text-red-600 hover:text-red-700">
              ← Back to Blog
            </Link>
          </div>

          <header className="mb-12">
            <div className="mb-4">
              <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                How-To Guide
              </span>
            </div>
            <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Evansville garage cleanout in 48 hours: checklist & timeline
            </h1>
            <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Uncle Sam Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>January 12, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>
            <SolidPanel color="blue" label="Garage Cleanout" className="mb-8 h-64">
              Two focused days turn a packed garage into organized parking and storage space.
            </SolidPanel>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="mb-8 text-xl text-gray-600">
              Is your Evansville garage so cluttered you can't park your car? You're not alone. With
              Indiana's changing seasons, garages become catch-alls for everything from holiday
              decorations to lawn equipment. Here's your complete 48-hour garage transformation
              plan.
            </p>

            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Before You Start: Essential Supplies
            </h2>

            <div className="mb-8 rounded-lg bg-blue-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Gather These Items First</h3>
              <div className="grid gap-4 md:grid-cols-2">
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

            <h2 className="mb-6 text-3xl font-bold text-gray-900">The 48-Hour Timeline</h2>

            <div className="mb-8 space-y-6">
              {timeline.map((phase, index) => {
                const Icon = phase.icon
                return (
                  <Card key={index} className="glass">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {phase.time}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-2 text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <h2 className="mb-6 text-3xl font-bold text-gray-900">The 4-Category Sorting System</h2>

            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <Card className="glass border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-green-700">KEEP</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-gray-700">Items you use regularly or seasonally</p>
                  <ul className="space-y-1 text-sm text-gray-600">
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
                  <p className="mb-2 text-gray-700">Good condition items you no longer need</p>
                  <ul className="space-y-1 text-sm text-gray-600">
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
                  <p className="mb-2 text-gray-700">Valuable items worth the effort to sell</p>
                  <ul className="space-y-1 text-sm text-gray-600">
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
                  <p className="mb-2 text-gray-700">Broken, expired, or unusable items</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Broken tools</li>
                    <li>• Old paint and chemicals</li>
                    <li>• Worn-out items</li>
                    <li>• Expired products</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Evansville-Specific Disposal Options
            </h2>

            <div className="mb-8 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Local Resources</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">Donation Centers</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Goodwill (multiple locations)</li>
                    <li>• Salvation Army</li>
                    <li>• Habitat for Humanity ReStore</li>
                    <li>• Local churches</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">Hazardous Waste</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Vanderburgh County HHW events</li>
                    <li>• Auto parts stores (oil, batteries)</li>
                    <li>• Home Depot (paint disposal)</li>
                    <li>• Best Buy (electronics)</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              When to Call the Professionals
            </h2>

            <p className="mb-4 text-gray-700">
              Sometimes the best 48-hour garage cleanout includes professional help. Consider
              calling Uncle Sam Junk Removal if you have:
            </p>

            <ul className="mb-6 space-y-2 text-gray-700">
              <li>• Large appliances or heavy items</li>
              <li>• More than 2 truck loads of disposal items</li>
              <li>• Hazardous materials that need special handling</li>
              <li>• Limited time or physical ability</li>
              <li>• Items too large for your vehicle</li>
            </ul>

            <div className="mb-8 rounded-lg bg-red-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Professional Garage Cleanout Service
              </h3>
              <p className="mb-4 text-gray-700">
                Let Uncle Sam Junk Removal handle the heavy lifting while you focus on organizing.
                We'll remove all unwanted items, coordinate donations, and leave your garage
                spotless.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  className="bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                >
                  <a href={`tel:${settings.phoneE164}`}>📞 Call {settings.phone}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-red-800 bg-transparent px-6 py-3 font-semibold text-red-800 hover:bg-red-800 hover:text-white"
                >
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
