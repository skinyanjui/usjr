'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { getServiceOptions } from '@/lib/service-options'
import { submitQuoteForm } from '@/lib/form-handlers'

const STAR_ICONS = [0, 1, 2, 3, 4]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    projectSize: '',
    message: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      // Client-side validation
      if (!formData.service) {
        setErrorMessage('Please select a service')
        return
      }

      if (!formData.name || !formData.email || !formData.phone) {
        setErrorMessage('Please fill in all required fields')
        return
      }

      await submitQuoteForm({
        formData,
        source: 'contact-section',
        onSuccess: () => {
          setIsSubmitted(true)
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            service: '',
            projectSize: '',
            message: '',
          })
        },
        onError: () => setErrorMessage('Something went wrong. Please try again or call us.'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="bg-muted/30 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-3xl md:text-5xl">
            Get Your Free Quote
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg">
            Ready to get rid of your junk in Evansville? Contact Uncle Sam Junk Removal today for a
            free, no-obligation quote. We'll beat any written estimate!
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {STAR_ICONS.map(i => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm sm:text-base">
              4.9/5 from 200+ Evansville customers
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Contact Form */}
          <div>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-foreground text-xl font-bold sm:text-2xl">
                  Request Free Quote
                </CardTitle>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Get an instant estimate for your Evansville project
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <CheckCircle className="mx-auto mb-4 h-12 w-12 text-gray-900 sm:h-16 sm:w-16" aria-hidden="true" />
                    <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">Thank You!</h3>
                    <p className="text-muted-foreground">
                      {"We'll contact you within 30 minutes with your free quote."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-muted-foreground mb-2 block text-sm font-medium"
                        >
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="text-muted-foreground mb-2 block text-sm font-medium"
                        >
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full"
                          placeholder="(812) 555-0123"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-muted-foreground mb-2 block text-sm font-medium"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="text-muted-foreground mb-2 block text-sm font-medium"
                      >
                        Service Address
                      </label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Evansville, IN address"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="service"
                          className="text-muted-foreground mb-2 block text-sm font-medium"
                        >
                          Service Needed *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          aria-required="true"
                          aria-describedby="service-required-hint"
                          value={formData.service}
                          onChange={handleChange}
                          className="border-border w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        >
                          <option value="">Select a service</option>
                          {getServiceOptions().map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <span id="service-required-hint" className="sr-only">
                          Required field
                        </span>
                      </div>
                      <div>
                        <label
                          htmlFor="projectSize"
                          className="text-muted-foreground mb-2 block text-sm font-medium"
                        >
                          Project Size
                        </label>
                        <select
                          id="projectSize"
                          name="projectSize"
                          value={formData.projectSize}
                          onChange={handleChange}
                          className="border-border w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        >
                          <option value="">Select size</option>
                          <option value="small">Small (1-2 items)</option>
                          <option value="medium">Medium (Room cleanout)</option>
                          <option value="large">Large (Multiple rooms)</option>
                          <option value="full-house">Full House/Estate</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="text-muted-foreground mb-2 block text-sm font-medium"
                      >
                        Project Details
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Tell us about your project in Evansville..."
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-center text-sm text-gray-900">{errorMessage}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-gray-900 py-3 text-base font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
                    </Button>

                    <p className="text-muted-foreground text-center text-sm">
                      By submitting this form, you agree to receive text messages and calls from
                      Uncle Sam Junk Removal.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Cards */}
          <div className="space-y-8">
            <div>
              <Card className="glass">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-foreground mb-6 text-2xl font-bold">
                    Contact Uncle Sam Junk Removal
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="mt-1 h-5 w-5 text-gray-900 sm:h-6 sm:w-6" aria-hidden="true" />
                      <div>
                        <h4 className="text-foreground font-semibold">Phone</h4>
                        <p className="text-muted-foreground text-base font-semibold sm:text-lg">
                          {settings.phone}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Call or text for fastest response
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="mt-1 h-5 w-5 text-gray-900 sm:h-6 sm:w-6" aria-hidden="true" />
                      <div>
                        <h4 className="text-foreground font-semibold">Email</h4>
                        <p className="text-muted-foreground">info@unclesamjunkremoval.com</p>
                        <p className="text-muted-foreground">quotes@unclesamjunkremoval.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-5 w-5 text-gray-900 sm:h-6 sm:w-6" aria-hidden="true" />
                      <div>
                        <h4 className="text-foreground font-semibold">Service Area</h4>
                        <p className="text-muted-foreground">Evansville, IN & Southern Indiana</p>
                        <p className="text-muted-foreground">
                          Vanderburgh, Warrick, Posey Counties
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Also serving Henderson, KY area
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="mt-1 h-5 w-5 text-gray-900 sm:h-6 sm:w-6" aria-hidden="true" />
                      <div>
                        <h4 className="text-foreground font-semibold">Hours</h4>
                        <p className="text-muted-foreground">Monday - Sunday</p>
                        <p className="text-muted-foreground">8:00 AM - 8:00 PM</p>
                        <p className="text-muted-foreground text-sm">Emergency service available</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass bg-gray-900 text-white">
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-2 font-semibold ring-1 ring-white/30 transition-colors hover:bg-gray-900/45 sm:w-auto sm:px-8"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" /> Call Now: {settings.phone}
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
              <Card className="glass bg-gray-900 text-white">
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
