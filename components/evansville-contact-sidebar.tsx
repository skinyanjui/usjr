'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { settings } from '@/lib/cms-content'

export function EvansvilleContactSidebar() {
  return (
    <div className="space-y-8">
      <Card className="glass">
        <CardContent className="p-6 sm:p-8">
          <h3 className="text-foreground mb-6 text-xl font-bold sm:text-2xl">
            Contact Uncle Sam Junk Removal
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 text-gray-900 sm:h-6 sm:w-6" />
              <div>
                <h4 className="text-foreground font-semibold">Phone</h4>
                <p className="text-base font-semibold text-gray-800 sm:text-lg">{settings.phone}</p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Call or text for fastest response
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-gray-900 sm:h-6 sm:w-6" />
              <div>
                <h4 className="text-foreground font-semibold">Email</h4>
                <p className="text-muted-foreground">info@unclesamjunkremoval.com</p>
                <p className="text-muted-foreground">quotes@unclesamjunkremoval.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-gray-900 sm:h-6 sm:w-6" />
              <div>
                <h4 className="text-foreground font-semibold">Service Area</h4>
                <p className="text-muted-foreground">Evansville, IN & Southern Indiana</p>
                <p className="text-muted-foreground">Vanderburgh, Warrick, Posey Counties</p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Also serving Henderson, KY area
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 text-gray-900 sm:h-6 sm:w-6" />
              <div>
                <h4 className="text-foreground font-semibold">Hours</h4>
                <p className="text-muted-foreground">Monday - Sunday</p>
                <p className="text-muted-foreground">8:00 AM - 8:00 PM</p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Emergency service available
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass bg-gray-900 text-white">
        <CardContent className="p-6 text-center sm:p-8">
          <h3 className="mb-3 text-lg font-bold text-black sm:mb-4 sm:text-2xl">
            Same Day Service in Evansville!
          </h3>
          <p className="mb-5 text-sm text-white sm:mb-6 sm:text-base">
            Need your junk removed today? We offer same-day service throughout Evansville and
            surrounding areas.
          </p>
          <Button
            asChild
            className="bg-card mb-4 w-full px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100 sm:w-auto sm:px-8"
          >
            <a href={`tel:${settings.phoneE164}`}>Call Now: {settings.phone}</a>
          </Button>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white sm:text-sm">
            <span>✓ Licensed & Insured</span>
            <span>✓ Free Estimates</span>
            <span>✓ Eco-Friendly</span>
          </div>
        </CardContent>
      </Card>

      <Card className="glass bg-gray-900 text-white">
        <CardContent className="p-6 sm:p-8">
          <h3 className="mb-4 text-lg font-bold sm:text-xl">
            Why Evansville Chooses Uncle Sam Junk Removal
          </h3>
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
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
