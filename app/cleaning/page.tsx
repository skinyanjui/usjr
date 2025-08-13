import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Leaf, Users, Clock, Shield, Star } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Professional Cleaning Services in Evansville, IN | Uncle Sam Junk Removal",
  description:
    "Veteran-led residential and commercial cleaning services in Evansville. Natural products, flexible scheduling, and spotless results. Book your cleaning today!",
  keywords:
    "cleaning services Evansville, residential cleaning, commercial cleaning, natural cleaning products, woman-owned business",
}

export default function CleaningHub() {
  const services = [
    {
      title: "Deep Cleaning",
      description: "Comprehensive one-time cleaning for your entire home",
      price: "From $150",
      href: "/cleaning/deep-clean",
      color: "bg-blue-50 border-blue-200",
      includes: ["High-to-low dusting", "Kitchen deep clean", "Bathroom sanitization", "Floor care"],
    },
    {
      title: "Recurring Cleaning",
      description: "Weekly, bi-weekly, or monthly maintenance cleaning",
      price: "From $80",
      href: "/cleaning/recurring",
      color: "bg-green-50 border-green-200",
      includes: ["Flexible scheduling", "Consistent team", "Supply included", "Quality guarantee"],
    },
    {
      title: "Move-In/Move-Out",
      description: "Complete property cleaning for transitions",
      price: "From $200",
      href: "/cleaning/move-in-move-out",
      color: "bg-purple-50 border-purple-200",
      includes: ["Inside appliances", "Cabinet interiors", "Window tracks", "Deep sanitization"],
    },
    {
      title: "Specialty Cleaning",
      description: "Organizing, decluttering, and specialized tasks",
      price: "From $100",
      href: "/cleaning/specialty",
      color: "bg-orange-50 border-orange-200",
      includes: ["Refrigerator cleaning", "Oven deep clean", "Home organizing", "Decluttering"],
    },
    {
      title: "Office/Business",
      description: "Professional commercial cleaning services",
      price: "From $120",
      href: "/cleaning/commercial",
      color: "bg-gray-50 border-gray-200",
      includes: ["After-hours service", "Disinfection", "Restroom restocking", "Quality sign-off"],
    },
  ]

  const valueProps = [
    { icon: Users, title: "Local Team", description: "Evansville-based, trusted professionals" },
    { icon: Clock, title: "Flexible Scheduling", description: "Work around your busy schedule" },
    { icon: Leaf, title: "Green Cleaning", description: "Natural, eco-friendly products only" },
    { icon: Shield, title: "Attention to Detail", description: "Thorough, consistent results every time" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
            Natural Products • Woman-Owned • Veteran-Led
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional Cleaning Services
            <span className="block text-green-600">in Evansville, IN</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Veteran-led, spotless results using natural products. Serving Evansville, Newburgh, Henderson KY, and
            surrounding areas with reliable, insured cleaning services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 bg-transparent"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <prop.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Cleaning Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From deep cleaning to recurring maintenance, we provide comprehensive cleaning solutions for homes and
              businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`${service.color} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                    <Badge variant="secondary" className="bg-white/80">
                      {service.price}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-700">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                      <Link href={service.href}>Learn More</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">48-Hour Re-Clean Guarantee</h2>
            <p className="text-gray-600 mb-6">
              Not completely satisfied with our cleaning? We'll return within 48 hours to make it right, at no
              additional cost.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-gray-700 ml-2">4.9/5 from 200+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready for a Spotless Space?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your cleaning service today or get a free, no-obligation quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Book Now - Square Link
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 bg-transparent"
            >
              Get Free Quote
            </Button>
            <Button size="lg" variant="ghost" className="text-green-600 hover:bg-green-50 px-8 py-3">
              Call (812) 610-1657
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Bulls of Indiana Cleaning Services",
            description: "Professional residential and commercial cleaning services in Evansville, IN",
            url: "https://bullsofindianacleaningservices.com/cleaning",
            telephone: "(812) 610-1657",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Evansville",
              addressRegion: "IN",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "37.9747",
              longitude: "-87.5558",
            },
            serviceArea: [
              "Evansville, IN",
              "Newburgh, IN",
              "Henderson, KY",
              "Owensboro, KY",
              "Boonville, IN",
              "Princeton, IN",
            ],
            services: [
              "Residential Cleaning",
              "Commercial Cleaning",
              "Deep Cleaning",
              "Move-in/Move-out Cleaning",
              "Recurring Cleaning",
            ],
          }),
        }}
      />
    </div>
  )
}
