import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, AlertTriangle, CheckCircle, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { settings } from '@/lib/cms-content'
import { buildCanonicalMetadata } from '@/components/canonical'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

export const metadata = {
  title: 'Hot Tub Removal: What to Know Before We Arrive | Uncle Sam Junk Removal',
  description:
    'Essential preparation steps for hot tub removal including electrical disconnection, access requirements, and disposal options. Make your hot tub removal smooth and safe.',
  keywords:
    'hot tub removal preparation, spa removal Evansville, hot tub disposal, jacuzzi removal Indiana',
  ...buildCanonicalMetadata('/blog/hot-tub-removal-what-to-know', baseUrl),
}

export default function HotTubRemovalPage() {
  const preparationSteps = [
    {
      icon: Zap,
      title: 'Electrical Disconnection',
      description:
        'Turn off power at the breaker and have a licensed electrician disconnect if needed',
      priority: 'Critical',
      color: 'red',
    },
    {
      icon: CheckCircle,
      title: 'Clear Access Path',
      description: 'Remove obstacles from the path between hot tub and truck parking area',
      priority: 'Important',
      color: 'yellow',
    },
    {
      icon: AlertTriangle,
      title: 'Drain Completely',
      description: 'Remove all water and allow to dry to prevent mold and reduce weight',
      priority: 'Required',
      color: 'blue',
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
              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                Service Guide
              </span>
            </div>
            <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Hot tub removal: what to know before we arrive
            </h1>
            <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Uncle Sam Team</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>January 10, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg">
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
              Preparing properly for hot tub removal ensures safety and efficiency. Use this
              checklist to get everything ready before our team arrives.
            </p>

            <h2 className="mb-6 text-3xl font-bold text-gray-900">Pre-Removal Checklist</h2>

            <div className="mb-8 grid gap-6 md:grid-cols-3">
              {preparationSteps.map((step, index) => {
                const Icon = step.icon
                const colorClasses =
                  step.color === 'red'
                    ? 'bg-red-600'
                    : step.color === 'yellow'
                      ? 'bg-yellow-500'
                      : 'bg-blue-600'
                return (
                  <Card key={index} className="glass">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className={`${colorClasses} flex h-12 w-12 items-center justify-center rounded-full`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {step.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{step.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mb-8 rounded-lg bg-red-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Ready to remove your hot tub?
              </h3>
              <p className="mb-4 text-gray-700">
                We can often remove your hot tub the same or next day. Text a photo for an instant
                estimate, or call to schedule a crew.
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
