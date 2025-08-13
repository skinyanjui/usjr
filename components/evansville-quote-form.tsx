"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function EvansvilleQuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    projectSize: "",
    details: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Integrate API or email service as needed
    // For now, we just simulate success
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardContent className="py-10 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thanks! We received your request.</h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            We'll text or call you shortly with your free estimate. For fastest service, call or text (812) 610-1657.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Request Free Quote</CardTitle>
        <CardDescription className="text-sm sm:text-base">Get an instant estimate for your Evansville project</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(812) 555-0123"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Service Address</Label>
              <Input
                id="address"
                placeholder="Evansville, IN address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="service">Service Needed *</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger id="service" aria-label="Service Needed">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junk-removal">Junk Removal</SelectItem>
                  <SelectItem value="dumpster-rental">Dumpster Rental</SelectItem>
                  <SelectItem value="furniture-removal">Furniture Removal</SelectItem>
                  <SelectItem value="appliance-removal">Appliance Removal</SelectItem>
                  <SelectItem value="garage-cleanout">Garage Cleanout</SelectItem>
                  <SelectItem value="yard-waste">Yard Waste Removal</SelectItem>
                  <SelectItem value="construction-debris">Construction Debris</SelectItem>
                  <SelectItem value="light-demo">Light Demolition</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="size">Project Size</Label>
              <Select
                value={formData.projectSize}
                onValueChange={(value) => setFormData({ ...formData, projectSize: value })}
              >
                <SelectTrigger id="size" aria-label="Project Size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-item">Single item</SelectItem>
                  <SelectItem value="quarter-truck">1/4 truck</SelectItem>
                  <SelectItem value="half-truck">1/2 truck</SelectItem>
                  <SelectItem value="three-quarter-truck">3/4 truck</SelectItem>
                  <SelectItem value="full-truck">Full truck</SelectItem>
                  <SelectItem value="not-sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="details">Project Details</Label>
              <Textarea
                id="details"
                placeholder="Tell us about your project in Evansville..."
                rows={4}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base sm:text-lg">
              Get Free Quote - Same Day Service Available
            </Button>
            <p className="text-xs sm:text-sm text-gray-500">
              By submitting this form, you agree to receive text messages and calls from Uncle Sam Junk Removal.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}