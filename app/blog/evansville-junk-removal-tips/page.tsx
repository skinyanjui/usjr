import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, MapPin, Truck } from 'lucide-react'
import Link from 'next/link'
import { settings } from '@/lib/cms-content'
import { PageHero } from '@/components/ui/page-hero'
import { StructuredData } from '@/components/structured-data'
import { UNIFORM_OFFERS } from '@/lib/uniform-offers'
import { buildCanonicalMetadata } from '@/components/canonical'
import { buildBlogMetadata } from '@/lib/seo-metadata'
import { InternalLinks } from '@/components/ui/internal-links'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unclesamjunkremoval.com'

const blogInfo = {
  topic: 'Evansville Junk Removal Tips',
  location: 'Evansville',
  category: 'Local Guide',
  readTime: '8 min',
}

const seoData = buildBlogMetadata(blogInfo)

export const metadata = {
  title: seoData.title,
  description: seoData.description,
  keywords: seoData.keywords,
  ...buildCanonicalMetadata('/blog/evansville-junk-removal-tips', baseUrl),
}

export default function EvansvilleJunkRemovalTipsPage() {
  const blogPost = {
    title: 'Essential Junk Removal Tips for Evansville Residents',
    excerpt:
      'Local expert tips for efficient, cost-effective junk removal in Evansville, IN. From preparation to disposal, make your cleanout a success.',
    author: 'Uncle Sam Team',
    date: 'January 28, 2025',
    readTime: '8 min read',
    category: 'Local Guide',
  }

  const tips = [
    {
      title: "Know Evansville's Bulk Pickup Schedule",
      description:
        "The City of Evansville offers bulk pickup twice yearly. Check your neighborhood's schedule to save on disposal costs for large items.",
      icon: Calendar,
    },
    {
      title: 'Use Local Recycling Centers',
      description:
        'Wesselman Woods Nature Center accepts electronics. Habitat ReStore takes reusable furniture and building materials.',
      icon: MapPin,
    },
    {
      title: 'Prepare Items for Easy Removal',
      description:
        'Clear pathways, separate recyclables, and have everything ready at one location. This saves time and reduces labor costs.',
      icon: Truck,
    },
    {
      title: 'Time Your Cleanout Right',
      description:
        'Spring and fall are busy seasons. Schedule mid-week in winter for potentially better rates and faster service.',
      icon: Clock,
    },
  ]

  const localResources = [
    {
      name: 'Evansville Recycling Center',
      address: '401 SE Riverside Dr',
      items: 'Metals, electronics, appliances',
    },
    {
      name: 'Habitat for Humanity ReStore',
      address: '2828 Washington Ave',
      items: 'Furniture, building materials, appliances',
    },
    {
      name: 'Goodwill Evansville',
      address: 'Multiple locations',
      items: 'Clothing, household items, small appliances',
    },
  ]

  return (
    <main className="min-h-screen">
      <PageHero title={blogPost.title} description={blogPost.excerpt} color="red" />

      <article className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          {/* Article Meta */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
            <Badge className="border-red-200 bg-red-100 text-red-800">{blogPost.category}</Badge>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg mb-12 max-w-none">
            <p className="text-xl leading-relaxed text-gray-700">
              Living in Evansville means you have access to great local resources for junk removal
              and recycling. Whether you're cleaning out your home near the University of Evansville
              or tackling a project downtown, these local tips will help you handle junk removal
              efficiently and cost-effectively.
            </p>
          </div>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Top Evansville Junk Removal Tips
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {tips.map((tip, index) => {
                const IconComponent = tip.icon
                return (
                  <Card key={index} className="glass">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <IconComponent className="mt-1 h-6 w-6 text-red-600" />
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{tip.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Local Resources */}
          <section className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Evansville Recycling & Donation Centers
            </h2>
            <div className="space-y-4">
              {localResources.map((resource, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-gray-900">
                          {resource.name}
                        </h3>
                        <p className="mb-2 text-gray-600">{resource.address}</p>
                        <p className="text-sm text-gray-500">Accepts: {resource.items}</p>
                      </div>
                      <MapPin className="h-5 w-5 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Local Expertise Section */}
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              When to Call Evansville Junk Removal Pros
            </h2>
            <div className="rounded-xl bg-red-50 p-8">
              <div className="prose prose-lg max-w-none">
                <p className="mb-4 text-gray-700">
                  While DIY disposal works for some items, professional junk removal makes sense
                  for:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>Large furniture that won't fit in your vehicle</li>
                  <li>Appliances requiring special disposal (refrigerators, washers)</li>
                  <li>Construction debris from home projects</li>
                  <li>Estate cleanouts or downsizing projects</li>
                  <li>Items too heavy for safe DIY removal</li>
                </ul>
                <p className="mt-4 text-gray-700">
                  As local Evansville experts, we know which items can be recycled locally, what
                  requires special handling, and how to dispose of everything responsibly according
                  to Indiana regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="rounded-2xl bg-red-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Need Professional Junk Removal in Evansville?
              </h2>
              <p className="mb-6 text-gray-600">
                Save time and effort with our local expertise. We handle everything from pickup to
                proper disposal.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button className="bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700">
                  📞 Call {settings.phone}
                </Button>
                <Link href="/quote">
                  <Button
                    variant="outline"
                    className="border-red-600 bg-transparent px-8 py-3 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    {UNIFORM_OFFERS.GET_FREE_QUOTE}
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Internal Links Section */}
          <section className="mt-12">
            <InternalLinks
              title="Related Services & Resources"
              links={[
                {
                  title: 'Junk Removal Services',
                  href: '/services/junk-removal',
                  description:
                    'Professional junk removal services in Evansville with same-day availability and transparent pricing.',
                  type: 'service',
                  category: 'Our Services',
                },
                {
                  title: 'Appliance Removal',
                  href: '/services/appliance-removal',
                  description:
                    'Specialized appliance removal for refrigerators, washers, dryers, and other large appliances.',
                  type: 'service',
                  category: 'Our Services',
                },
                {
                  title: 'Estate Cleanouts',
                  href: '/services/estate-cleanouts',
                  description:
                    'Comprehensive estate cleanout services for inherited properties and downsizing projects.',
                  type: 'service',
                  category: 'Our Services',
                },
                {
                  title: 'Junk Removal Cost Guide',
                  href: '/blog/junk-removal-cost-tri-state',
                  description:
                    'Understanding junk removal pricing in the Tri-State area and how to save money on your project.',
                  type: 'blog',
                  category: 'Pricing Guide',
                },
                {
                  title: 'Spring Cleaning Checklist',
                  href: '/blog/spring-cleaning-checklist-southern-indiana',
                  description:
                    'Comprehensive spring cleaning guide for Southern Indiana homeowners with local tips and resources.',
                  type: 'blog',
                  category: 'Seasonal Guide',
                },
                {
                  title: 'Evansville Location',
                  href: '/locations/evansville',
                  description:
                    'Learn more about our Evansville service area, local expertise, and special offers for residents.',
                  type: 'location',
                  category: 'Service Area',
                },
              ]}
              variant="grid"
              theme="red"
            />
          </section>
        </div>
      </article>

      {/* Structured Data */}
      <StructuredData
        type="FAQPage"
        data={{
          faqs: [
            {
              question: 'What are the best junk removal tips for Evansville residents?',
              answer:
                'Know your bulk pickup schedule, use local recycling centers like Wesselman Woods for electronics, prepare items in advance, and time your cleanout during off-peak seasons for better rates.',
            },
            {
              question: 'Where can I recycle items in Evansville?',
              answer:
                'Evansville Recycling Center on SE Riverside Dr takes metals and electronics. Habitat ReStore accepts furniture and building materials. Goodwill takes household items and clothing.',
            },
            {
              question: 'When should I hire professional junk removal in Evansville?',
              answer:
                'For large furniture, appliances requiring special disposal, construction debris, estate cleanouts, or items too heavy for safe DIY removal.',
            },
          ],
        }}
      />
    </main>
  )
}
