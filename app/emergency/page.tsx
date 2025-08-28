import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Phone, MessageSquare, Zap, Shield } from "lucide-react"
import { settings } from "@/lib/cms-content"
import { QuoteCtaLink } from "@/components/quote-cta-link"
import { PageHero } from "@/components/ui/page-hero"
 
export default function EmergencyPage() {
  return (
    <div className="min-h-screen pt-0 pb-16 bg-red-50">
      <PageHero
        title="Emergency Junk Removal"
        description="24/7 emergency response throughout Evansville and Southern Indiana"
        imageSrc="/junk-removal-evansville.png"
        priority
      />
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Emergency Junk Removal</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Need immediate junk removal service? We provide same-day emergency response throughout Evansville and
            Southern Indiana.
          </p>
          <Badge className="bg-red-600 text-white mt-4 px-4 py-2 text-lg">
            <Clock className="w-4 h-4 mr-2" />
            Available 24/7 for Emergencies
          </Badge>
        </div>

        <Card className="mb-8 border-red-200 bg-white">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Now</h3>
                <p className="text-gray-600 mb-4">Speak directly with our emergency dispatch team</p>
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <a href={`tel:${settings.phoneE164}`}>{settings.phone}</a>
                </Button>
                <p className="text-sm text-gray-500 mt-2">Available 24/7 for emergencies</p>
              </div>

              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Text Photos</h3>
                <p className="text-gray-600 mb-4">Send photos for immediate assessment</p>
                <Button asChild size="lg" variant="outline" className="border-red-800 text-red-800 bg-transparent">
                  <a href={`sms:${settings.phoneE164}`}>Text {settings.phone}</a>
                </Button>
                <p className="text-sm text-gray-500 mt-2">Get instant quote via text</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Emergency Situations We Handle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Property damage cleanup</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Storm debris removal</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Eviction cleanouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Biohazard situations</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Urgent estate cleanouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Commercial emergencies</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Emergency Service Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>2-hour response time</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Same-day service available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Weekend & holiday service</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Licensed & insured</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Proper disposal guaranteed</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Upfront emergency pricing</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency Service Pricing</h3>
            <p className="text-gray-600 mb-6">
              Emergency services include a 50% surcharge for immediate response. All pricing is provided upfront with no
              hidden fees.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900">Small Emergency</h4>
                <p className="text-2xl font-bold text-red-600">$134-224</p>
                <p className="text-sm text-gray-600">1-3 items, 2-hour response</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900">Medium Emergency</h4>
                <p className="text-2xl font-bold text-red-600">$269-584</p>
                <p className="text-sm text-gray-600">Room cleanout, same-day</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900">Large Emergency</h4>
                <p className="text-2xl font-bold text-red-600">$734-974</p>
                <p className="text-sm text-gray-600">Full property, immediate</p>
              </div>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <QuoteCtaLink location="emergency" label="Get Emergency Quote Now">Get Emergency Quote Now</QuoteCtaLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
