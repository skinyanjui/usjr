"use client"

import type React from "react"
import { CheckCircle, Phone } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function SimpleQuoteForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    serviceAddress: "",
    serviceNeeded: "",
    projectSize: "",
    projectDetails: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Received!</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Thank you for your request. We'll contact you shortly with your free estimate and same-day service options.
          </p>
          <div className="space-y-4">
            <a
              href="tel:+18126101657"
              className="inline-flex items-center gap-2 rounded-lg bg-red-700/35 text-white ring-1 ring-white/30 px-5 py-2.5 hover:bg-red-700/45 transition-colors font-semibold justify-center w-full max-w-sm"
            >
              <Phone className="h-4 w-4" /> Call (812) 610-1657 for Immediate Service
            </a>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Request Free Quote</CardTitle>
        <CardDescription className="text-gray-600">Get an instant estimate for your Evansville project</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="emailAddress" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange("emailAddress", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="serviceAddress" className="text-sm font-medium text-gray-700">
              Service Address
            </Label>
            <Input
              id="serviceAddress"
              type="text"
              value={formData.serviceAddress}
              onChange={(e) => handleInputChange("serviceAddress", e.target.value)}
              className="mt-1"
              placeholder="Enter your service address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="serviceNeeded" className="text-sm font-medium text-gray-700">
                Service Needed *
              </Label>
              <Select
                value={formData.serviceNeeded}
                onValueChange={(value) => handleInputChange("serviceNeeded", value)}
              >
                <SelectTrigger id="serviceNeeded" className="mt-1" aria-label="Service Needed">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junk-removal">Junk Removal</SelectItem>
                  <SelectItem value="dumpster-rental">Dumpster Rental</SelectItem>
                  <SelectItem value="both-services">Both Services</SelectItem>
                  <SelectItem value="estate-cleanout">Estate Cleanout</SelectItem>
                  <SelectItem value="construction-debris">Construction Debris</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="projectSize" className="text-sm font-medium text-gray-700">
                Project Size
              </Label>
              <Select value={formData.projectSize} onValueChange={(value) => handleInputChange("projectSize", value)}>
                <SelectTrigger id="projectSize" className="mt-1" aria-label="Project Size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-2 items)</SelectItem>
                  <SelectItem value="medium">Medium (Room cleanout)</SelectItem>
                  <SelectItem value="large">Large (Multiple rooms)</SelectItem>
                  <SelectItem value="full-house">Full House/Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="projectDetails" className="text-sm font-medium text-gray-700">
              Project Details
            </Label>
            <Textarea
              id="projectDetails"
              value={formData.projectDetails}
              onChange={(e) => handleInputChange("projectDetails", e.target.value)}
              rows={4}
              className="mt-1"
              placeholder="Tell us more about your project..."
            />
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold">
              Get Free Quote - Same Day Service Available
            </Button>
            <p className="text-sm text-gray-500 text-center">
              By submitting this form, you agree to receive text messages and calls from Uncle Sam Junk Removal.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
