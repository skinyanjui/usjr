"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { settings } from "@/lib/cms-content"

export function EvansvilleContactSidebar() {
  return (
    <div className="space-y-8">
      <Card className="glass">
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Contact Uncle Sam Junk Removal</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="text-gray-800 text-base sm:text-lg font-semibold">{settings.phone}</p>
                <p className="text-xs sm:text-sm text-gray-500">Call or text for fastest response</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-gray-700">info@unclesamjunkremoval.com</p>
                <p className="text-gray-700">quotes@unclesamjunkremoval.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Service Area</h4>
                <p className="text-gray-700">Evansville, IN & Southern Indiana</p>
                <p className="text-gray-700">Vanderburgh, Warrick, Posey Counties</p>
                <p className="text-xs sm:text-sm text-gray-500">Also serving Henderson, KY area</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Hours</h4>
                <p className="text-gray-700">Monday - Sunday</p>
                <p className="text-gray-700">8:00 AM - 8:00 PM</p>
                <p className="text-xs sm:text-sm text-gray-500">Emergency service available</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass bg-red-600 text-white">
        <CardContent className="p-6 sm:p-8 text-center">
          <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Same Day Service in Evansville!</h3>
          <p className="mb-5 sm:mb-6 text-white text-sm sm:text-base">
            Need your junk removed today? We offer same-day service throughout Evansville and surrounding areas.
          </p>
          <Button className="bg-white text-red-600 hover:bg-gray-100 w-full sm:w-auto px-6 sm:px-8 py-3 font-semibold mb-4">
            Call Now: {settings.phone}
          </Button>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-white">
            <span>✓ Licensed & Insured</span>
            <span>✓ Free Estimates</span>
            <span>✓ Eco-Friendly</span>
          </div>
        </CardContent>
      </Card>

      <Card className="glass bg-blue-600 text-white">
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Why Evansville Chooses Uncle Sam Junk Removal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
            <div>✓ 15+ Years Experience</div>
            <div>✓ Locally Owned & Operated</div>
            <div>✓ Upfront Pricing</div>
            <div>✓ Same Day Service</div>
            <div>✓ Eco-Friendly Disposal</div>
            <div>✓ 100% Satisfaction Guarantee</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
