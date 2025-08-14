"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Shield, Leaf, Award } from "lucide-react"
import { settings } from "@/lib/cms-content"

export function BentoGrid() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    size: "",
    details: "",
  })

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {/* Get Your Free Quote - Large Card */}
          <Card className="lg:col-span-2 lg:row-span-2 p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">Get Your Free Quote</CardTitle>
              <p className="text-gray-600 text-sm">
                Ready to get rid of your junk in Evansville? Contact Uncle Sam Junk Removal today for a free,
                no-obligation quote. We'll beat any written estimate!
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 from 200+ Evansville customers</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="text-sm"
                />
                <Input
                  placeholder="(812) 555-0123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="text-sm"
                />
              </div>
              <Input
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-sm"
              />
              <Input
                placeholder="Evansville, IN address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junk-removal">Junk Removal</SelectItem>
                    <SelectItem value="dumpster-rental">Dumpster Rental</SelectItem>
                    <SelectItem value="both">Both Services</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Tell us about your project in Evansville..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="text-sm min-h-[60px]"
              />
              <Button className="w-full bg-red-700 hover:bg-red-800 text-sm">
                Get Free Quote - Same Day Service Available
              </Button>
              <p className="text-xs text-gray-500">
                By submitting this form, you agree to receive text messages and calls from Uncle Sam Junk Removal.
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="p-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-700" />
                <div>
                  <p className="font-semibold text-sm">{settings.phone}</p>
                  <p className="text-xs text-gray-600">Call or text for fastest response</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-700" />
                <div>
                  <p className="text-sm">info@unclesamjunkremoval.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-700" />
                <div>
                  <p className="text-sm">Evansville, IN & Southern Indiana</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-700" />
                <div>
                  <p className="text-sm">Monday - Sunday</p>
                  <p className="text-xs text-gray-600">8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Same Day Service */}
          <Card className="bg-red-700 text-white p-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Same Day Service!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Need your junk removed today? We offer same-day service throughout Evansville.
              </p>
              <Button variant="secondary" size="sm" className="w-full mb-3">
                <Phone className="w-4 h-4 mr-2" />
                Call Now: {settings.phone}
              </Button>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-xs">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-xs">Free Estimates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-xs">Eco-Friendly</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card className="lg:col-span-2 p-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Why Evansville Chooses Uncle Sam Junk Removal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-700" />
                  <span className="text-sm">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-700" />
                  <span className="text-sm">Locally Owned & Operated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-700" />
                  <span className="text-sm">Upfront Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-700" />
                  <span className="text-sm">Same Day Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-red-700" />
                  <span className="text-sm">Eco-Friendly Disposal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-700" />
                  <span className="text-sm">100% Satisfaction Guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
