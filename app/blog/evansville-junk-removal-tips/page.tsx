import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, Truck } from "lucide-react"
import Link from "next/link"
import { settings } from "@/lib/cms-content"
import { PageHero } from "@/components/ui/page-hero"
import { StructuredData } from "@/components/structured-data"
import { UNIFORM_OFFERS } from "@/lib/uniform-offers"
import { buildCanonicalMetadata } from "@/components/canonical"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unclesamjunkremoval.com"

export const metadata = {
  title: "Evansville Junk Removal Tips: Local Guide | Uncle Sam Junk Removal",
  description:
    "Essential junk removal tips for Evansville residents. Learn local disposal options, recycling centers, and cost-saving strategies from local experts.",
  keywords:
    "Evansville junk removal tips, Evansville recycling, local disposal Evansville, junk removal guide Indiana",
  ...buildCanonicalMetadata("/blog/evansville-junk-removal-tips", baseUrl),
}

export default function EvansvilleJunkRemovalTipsPage() {
  const blogPost = {
    title: "Essential Junk Removal Tips for Evansville Residents",
    excerpt: "Local expert tips for efficient, cost-effective junk removal in Evansville, IN. From preparation to disposal, make your cleanout a success.",
    author: "Uncle Sam Team",
    date: "January 28, 2025",
    readTime: "8 min read",
    category: "Local Guide",
  }

  const tips = [
    {
      title: "Know Evansville's Bulk Pickup Schedule",
      description: "The City of Evansville offers bulk pickup twice yearly. Check your neighborhood's schedule to save on disposal costs for large items.",
      icon: Calendar
    },
    {
      title: "Use Local Recycling Centers",
      description: "Wesselman Woods Nature Center accepts electronics. Habitat ReStore takes reusable furniture and building materials.",
      icon: MapPin
    },
    {
      title: "Prepare Items for Easy Removal",
      description: "Clear pathways, separate recyclables, and have everything ready at one location. This saves time and reduces labor costs.",
      icon: Truck
    },
    {
      title: "Time Your Cleanout Right",
      description: "Spring and fall are busy seasons. Schedule mid-week in winter for potentially better rates and faster service.",
      icon: Clock
    }
  ]

  const localResources = [
    {
      name: "Evansville Recycling Center",
      address: "401 SE Riverside Dr",
      items: "Metals, electronics, appliances"
    },
    {
      name: "Habitat for Humanity ReStore",
      address: "2828 Washington Ave", 
      items: "Furniture, building materials, appliances"
    },
    {
      name: "Goodwill Evansville",
      address: "Multiple locations",
      items: "Clothing, household items, small appliances"
    }
  ]

  return (
    <main className="min-h-screen">
      <PageHero
        title={blogPost.title}
        description={blogPost.excerpt}
        imageSrc="/junk-removal-evansville.png"
        priority
      />

      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800 border-red-200">{blogPost.category}</Badge>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              Living in Evansville means you have access to great local resources for junk removal and recycling. 
              Whether you're cleaning out your home near the University of Evansville or tackling a project 
              downtown, these local tips will help you handle junk removal efficiently and cost-effectively.
            </p>
          </div>

          {/* Tips Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Evansville Junk Removal Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => {
                const IconComponent = tip.icon
                return (
                  <Card key={index} className="glass">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <IconComponent className="w-6 h-6 text-red-600 mt-1" />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Evansville Recycling & Donation Centers</h2>
            <div className="space-y-4">
              {localResources.map((resource, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{resource.name}</h3>
                        <p className="text-gray-600 mb-2">{resource.address}</p>
                        <p className="text-sm text-gray-500">Accepts: {resource.items}</p>
                      </div>
                      <MapPin className="w-5 h-5 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Local Expertise Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Call Evansville Junk Removal Pros</h2>
            <div className="bg-red-50 rounded-xl p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">
                  While DIY disposal works for some items, professional junk removal makes sense for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Large furniture that won't fit in your vehicle</li>
                  <li>Appliances requiring special disposal (refrigerators, washers)</li>
                  <li>Construction debris from home projects</li>
                  <li>Estate cleanouts or downsizing projects</li>
                  <li>Items too heavy for safe DIY removal</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  As local Evansville experts, we know which items can be recycled locally, 
                  what requires special handling, and how to dispose of everything responsibly 
                  according to Indiana regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Professional Junk Removal in Evansville?</h2>
              <p className="text-gray-600 mb-6">
                Save time and effort with our local expertise. We handle everything from pickup to proper disposal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold">
                  📞 Call {settings.phone}
                </Button>
                <Link href="/quote">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 font-semibold bg-transparent"
                  >
                    {UNIFORM_OFFERS.GET_FREE_QUOTE}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* Structured Data */}
      <StructuredData 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "What are the best junk removal tips for Evansville residents?",
              answer: "Know your bulk pickup schedule, use local recycling centers like Wesselman Woods for electronics, prepare items in advance, and time your cleanout during off-peak seasons for better rates."
            },
            {
              question: "Where can I recycle items in Evansville?",
              answer: "Evansville Recycling Center on SE Riverside Dr takes metals and electronics. Habitat ReStore accepts furniture and building materials. Goodwill takes household items and clothing."
            },
            {
              question: "When should I hire professional junk removal in Evansville?",
              answer: "For large furniture, appliances requiring special disposal, construction debris, estate cleanouts, or items too heavy for safe DIY removal."
            }
          ]
        }}
      />
    </main>
  )
}