"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Star, CheckCircle } from "lucide-react"
import { settings } from "@/lib/cms-content"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    projectSize: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        service: "",
        projectSize: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">Get Your Free Quote</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to get rid of your junk in Evansville? Contact Uncle Sam Junk Removal today for a free, no-obligation
            quote. We'll beat any written estimate!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 text-sm sm:text-base">4.9/5 from 200+ Evansville customers</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Contact Form */}
          <div>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Request Free Quote</CardTitle>
                <p className="text-sm sm:text-base text-gray-600">
                  Get an instant estimate for your Evansville project
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                    <p className="text-gray-600">{"We'll contact you within 30 minutes with your free quote."}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
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

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service Needed *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select a service</option>
                          <option value="junk-removal">Junk Removal</option>
                          <option value="dumpster-rental">Dumpster Rental</option>
                          <option value="both">Both Services</option>
                          <option value="estate-cleanout">Estate Cleanout</option>
                          <option value="construction-debris">Construction Debris</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="projectSize" className="block text-sm font-medium text-gray-700 mb-2">
                          Project Size
                        </label>
                        <select
                          id="projectSize"
                          name="projectSize"
                          value={formData.projectSize}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold text-base sm:text-lg"
                    >
                      Get Free Quote - Same Day Service Available
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      By submitting this form, you agree to receive text messages and calls from Uncle Sam Junk Removal.
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Uncle Sam Junk Removal</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600 text-base sm:text-lg font-semibold">{settings.phone}</p>
                        <p className="text-sm text-gray-500">Call or text for fastest response</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">info@unclesamjunkremoval.com</p>
                        <p className="text-gray-600">quotes@unclesamjunkremoval.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Service Area</h4>
                        <p className="text-gray-600">Evansville, IN & Southern Indiana</p>
                        <p className="text-gray-600">Vanderburgh, Warrick, Posey Counties</p>
                        <p className="text-sm text-gray-500">Also serving Henderson, KY area</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Hours</h4>
                        <p className="text-gray-600">Monday - Sunday</p>
                        <p className="text-gray-600">8:00 AM - 8:00 PM</p>
                        <p className="text-sm text-gray-500">Emergency service available</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass bg-red-600 text-white">
                <CardContent className="p-6 sm:p-8 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-black">Same Day Service in Evansville!</h3>
                  <p className="mb-6 text-white text-sm sm:text-base">
                    Need your junk removed today? We offer same-day service throughout Evansville and surrounding areas.
                  </p>
                  <a
                    href={`tel:${settings.phoneE164}`}
                    className="inline-flex items-center gap-2 rounded-lg ring-1 ring-white/30 px-6 sm:px-8 hover:bg-red-700/45 transition-colors font-semibold w-full sm:w-auto justify-center py-2 bg-red-500"
                  >
                    <Phone className="h-4 w-4" /> Call Now: {settings.phone}
                  </a>
                  <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-white">
                    <span>✓ Licensed & Insured</span>
                    <span>✓ Free Estimates</span>
                    <span>✓ Eco-Friendly</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass bg-blue-600 text-white">
                <CardContent className="p-6 sm:p-8 text-center">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-black">Why Evansville Chooses Uncle Sam Junk Removal</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-black">
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
