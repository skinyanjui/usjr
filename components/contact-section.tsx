'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Star } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { UniversalQuoteForm } from './universal-quote-form'

export default function ContactSection() {

  return (
    <section id="contact" className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-5xl">
            Get Your Free Quote
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
            Ready to get rid of your junk in Evansville? Contact Uncle Sam Junk Removal today for a
            free, no-obligation quote. We'll beat any written estimate!
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600 sm:text-base">
              4.9/5 from 200+ Evansville customers
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Contact Form */}
          <div>
            <Card className="glass">
              <UniversalQuoteForm 
                variant="contact" 
                showPhotos={true}
                theme="red"
                title="Request Free Quote"
                description="Get an instant estimate for your Evansville project"
              />
            </Card>
          </div>

          {/* Contact Information Cards */}
          <div className="space-y-8">
            <div>
              <Card className="glass">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">
                    Contact Uncle Sam Junk Removal
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="mt-1 h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-base font-semibold text-gray-600 sm:text-lg">
                          {settings.phone}
                        </p>
                        <p className="text-sm text-gray-600">Call or text for fastest response</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="mt-1 h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">info@unclesamjunkremoval.com</p>
                        <p className="text-gray-600">quotes@unclesamjunkremoval.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Service Area</h4>
                        <p className="text-gray-600">Evansville, IN & Southern Indiana</p>
                        <p className="text-gray-600">Vanderburgh, Warrick, Posey Counties</p>
                        <p className="text-sm text-gray-600">Also serving Henderson, KY area</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="mt-1 h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Hours</h4>
                        <p className="text-gray-600">Monday - Sunday</p>
                        <p className="text-gray-600">8:00 AM - 8:00 PM</p>
                        <p className="text-sm text-gray-600">Emergency service available</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass bg-red-600 text-white">
                <CardContent className="p-6 text-center sm:p-8">
                  <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl">
                    Same Day Service in Evansville!
                  </h3>
                  <p className="mb-6 text-sm text-white sm:text-base">
                    Need your junk removed today? We offer same-day service throughout Evansville
                    and surrounding areas.
                  </p>
                  <a
                    href={`tel:${settings.phoneE164}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-6 py-2 font-semibold ring-1 ring-white/30 transition-colors hover:bg-red-700/45 sm:w-auto sm:px-8"
                  >
                    <Phone className="h-4 w-4" /> Call Now: {settings.phone}
                  </a>
                  <div className="flex items-center justify-center gap-3 text-xs text-white sm:text-sm">
                    <span>✓ Licensed & Insured</span>
                    <span>✓ Free Estimates</span>
                    <span>✓ Eco-Friendly</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass bg-blue-600 text-white">
                <CardContent className="p-6 text-center sm:p-8">
                  <h3 className="mb-4 text-lg font-bold text-black sm:text-xl">
                    Why Evansville Chooses Uncle Sam Junk Removal
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-sm text-black sm:grid-cols-2">
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
          </div>
        </div>
      </div>
    </section>
  )
}
