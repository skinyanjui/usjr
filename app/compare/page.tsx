"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Truck, Container, Sparkles, Clock, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import { settings } from "@/lib/cms-content"
 
export default function ComparePage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const services = [
    {
      id: "junk-removal",
      name: "Junk Removal",
      icon: Truck,
      description: "Full-service junk removal with labor included",
      priceRange: "$89-$649",
      timeframe: "Same day available",
      bestFor: "Single items to full cleanouts",
      features: [
        "Labor included",
        "Same-day service",
        "Eco-friendly disposal",
        "Free estimates",
        "Licensed & insured",
        "No hidden fees",
      ],
      notIncluded: ["Hazardous materials", "Construction debris over 1 ton", "Liquids or chemicals"],
      color: "red",
    },
    {
      id: "dumpster-rental",
      name: "Dumpster Rental",
      icon: Container,
      description: "Self-service dumpster rental for DIY projects",
      priceRange: "$299-$599",
      timeframe: "7-14 day rental",
      bestFor: "Large projects, construction, renovations",
      features: [
        "Multiple sizes available",
        "7-14 day rental period",
        "Delivery & pickup included",
        "Flat-rate pricing",
        "Commercial & residential",
        "Flexible scheduling",
      ],
      notIncluded: ["Labor not included", "Hazardous materials", "Overweight fees may apply"],
      color: "orange",
    },
    {
      id: "cleaning",
      name: "Professional Cleaning",
      icon: Sparkles,
      description: "Eco-friendly residential and commercial cleaning",
      priceRange: "$99-$399",
      timeframe: "Flexible scheduling",
      bestFor: "Regular maintenance, deep cleaning, move-outs",
      features: [
        "Natural products used",
        "Woman-owned business",
        "Flexible scheduling",
        "Residential & commercial",
        "Recurring services available",
        "Satisfaction guaranteed",
      ],
      notIncluded: ["Junk removal", "Heavy lifting", "Exterior cleaning"],
      color: "green",
    },
  ]

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const getColorClasses = (color: string) => {
    const colors = {
      red: "border-red-200 bg-red-50 text-red-700",
      orange: "border-orange-200 bg-orange-50 text-orange-700",
      green: "border-green-200 bg-green-50 text-green-700",
    }
    return colors[color as keyof typeof colors] || colors.red
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Compare Our Services</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Not sure which service is right for you? Compare features, pricing, and benefits to make the best choice for
            your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = selectedServices.includes(service.id)

            return (
              <Card
                key={service.id}
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(service.color)}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {service.priceRange}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.timeframe}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Best For:
                    </h4>
                    <p className="text-gray-600">{service.bestFor}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Not Included:</h4>
                    <ul className="space-y-2">
                      {service.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Button
                      onClick={() => toggleService(service.id)}
                      variant={isSelected ? "default" : "outline"}
                      className="w-full"
                    >
                      {isSelected ? "Selected for Comparison" : "Select for Comparison"}
                    </Button>
                    <Button asChild variant="outline" className={`w-full bg-transparent ${service.color === "red" ? "border-red-700 text-red-700" : service.color === "orange" ? "border-orange-700 text-orange-700" : service.color === "green" ? "border-green-700 text-green-700" : ""}`}>
                      <Link href={service.id === "cleaning" ? "/cleaning" : `/services/${service.id}`} aria-label={`${service.name} details`} title={`${service.name} details`}>
                        View {service.name} details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedServices.length > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                You've selected {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""}. Get a free
                quote or bundle multiple services for potential savings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/quote">Get Free Quote</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={`tel:${settings.phoneE164}`}>Call {settings.phone}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Not Sure Which Service You Need?</h3>
            <p className="text-gray-600 mb-6">
              Our team can help you choose the right service for your project. Get personalized recommendations based on
              your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/quote">Get Personalized Quote</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/faq">View FAQ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
