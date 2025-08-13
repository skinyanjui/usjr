import type { Metadata } from "next"
import { QuoteFormStandalone } from "@/components/quote-form-standalone"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Shield, Clock, Star, CheckCircle, Truck, Trash2, Sparkles, Phone, Camera } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Get Your Free Quote | Uncle Sam Junk Removal - Junk Removal, Dumpster Rental & Cleaning",
  description:
    "Get free quotes for junk removal, dumpster rental, and cleaning services in Evansville. Professional, eco-friendly services with transparent pricing and same-day availability.",
  keywords:
    "free quote Evansville, junk removal quote, dumpster rental quote, cleaning quote, Uncle Sam Junk Removal pricing",
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 pt-16 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center gap-2 mb-6">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Leaf className="w-3 h-3 mr-1" />
              Eco-Friendly
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              Fully Insured
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              <Star className="w-3 h-3 mr-1" />
              Woman-Owned
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              <Clock className="w-3 h-3 mr-1" />
              Same-Day Service
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get Your Free Quote Today</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            Professional junk removal, dumpster rental, and cleaning services in Evansville and Southern Indiana. Choose
            your service below for instant pricing and same-day availability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3">
              <Phone className="w-5 h-5 mr-2" />
              Call (812) 610-1657
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-blue-800 text-blue-800 hover:bg-blue-100 px-6 sm:px-8 py-3 bg-transparent"
            >
              <Camera className="w-5 h-5 mr-2" />
              Text Photos for Instant Quote
            </Button>
          </div>
        </div>

        {/* Service Selection Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Junk Removal Service */}
          <Card className="glass border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Junk Removal</h2>
                <p className="text-gray-600">Same-day pickup and hauling services</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Starting Prices:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Single item: $75-$150</li>
                    <li>• 1/4 truck load: $200-$300</li>
                    <li>• 1/2 truck load: $350-$450</li>
                    <li>• Full truck load: $500-$650</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Furniture & appliance removal
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Construction debris cleanup
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Estate & garage cleanouts
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Same-day availability
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Junk Removal Quote</Button>
                <Link href="/services/junk-removal">
                  <Button
                    variant="outline"
                    className="w-full border-blue-800 text-blue-800 hover:bg-blue-100 bg-transparent"
                  >
                    Learn More About Junk Removal
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Dumpster Rental Service */}
          <Card className="glass border-2 border-orange-200 hover:border-orange-400 transition-all duration-300">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dumpster Rental</h2>
                <p className="text-gray-600">Flexible rental periods for any project</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Rental Prices:</h3>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• 10-yard: $350/week</li>
                    <li>• 20-yard: $450/week</li>
                    <li>• 30-yard: $550/week</li>
                    <li>• 40-yard: $650/week</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Next-day delivery available
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Flexible rental periods
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Construction & renovation projects
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    No hidden fees
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Get Dumpster Quote</Button>
                <Link href="/services/dumpster-rental">
                  <Button
                    variant="outline"
                    className="w-full border-orange-800 text-orange-800 hover:bg-orange-100 bg-transparent"
                  >
                    Learn More About Dumpsters
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Cleaning Service */}
          <Card className="glass border-2 border-green-200 hover:border-green-400 transition-all duration-300">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Cleaning Services</h2>
                <p className="text-gray-600">Natural products for home & business</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Service Prices:</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Deep clean: $150-$400</li>
                    <li>• Recurring: $80-$200</li>
                    <li>• Move-in/out: $200-$500</li>
                    <li>• Commercial: Custom quote</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    100% natural cleaning products
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Residential & commercial
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    After-hours availability
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Satisfaction guaranteed
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Get Cleaning Quote</Button>
                <Link href="/cleaning">
                  <Button
                    variant="outline"
                    className="w-full border-green-800 text-green-800 hover:bg-green-100 bg-transparent"
                  >
                    Learn More About Cleaning
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quote Form Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Get Your Detailed Quote</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Fill out the form below or upload photos for the most accurate pricing. We'll respond within 2 hours with
              your detailed estimate.
            </p>
          </div>
          <QuoteFormStandalone />
        </div>

        {/* Why Choose Us Section */}
        <Card className="glass">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Uncle Sam Junk Removal?</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fully Licensed & Insured</h3>
                <p className="text-sm text-gray-600">Complete protection for your property and peace of mind</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Eco-Friendly Practices</h3>
                <p className="text-sm text-gray-600">Responsible disposal and natural cleaning products only</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Same-Day Service</h3>
                <p className="text-sm text-gray-600">Quick response times and flexible scheduling</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 sm:p-6 rounded-lg text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Our Service Guarantee</h4>
              <p className="text-gray-600 text-sm max-w-3xl mx-auto">
                We're committed to exceeding your expectations with transparent pricing, professional service, and
                eco-friendly practices. If you're not completely satisfied, we'll make it right or provide a full
                refund.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
