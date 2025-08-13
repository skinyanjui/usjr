"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, X, CheckCircle, Leaf, Shield, Clock } from "lucide-react"

export function QuoteFormStandalone() {
  const [segment, setSegment] = useState<"residential" | "commercial">("residential")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    sqft: "",
    bedrooms: "",
    bathrooms: "",
    businessType: "",
    suiteAccess: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    ecoFriendly: true,
    message: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const residentialServices = [
    "Deep Cleaning",
    "Recurring Cleaning (Weekly)",
    "Recurring Cleaning (Bi-weekly)",
    "Recurring Cleaning (Monthly)",
    "Move-In/Move-Out Cleaning",
    "Refrigerator Cleaning",
    "Oven Cleaning",
    "Home Organizing",
    "Decluttering Service",
  ]

  const commercialServices = [
    "Office Cleaning (Daily)",
    "Office Cleaning (Weekly)",
    "Office Cleaning (Bi-weekly)",
    "Office Cleaning (Monthly)",
    "Retail Store Cleaning",
    "Medical Office Cleaning",
    "Restaurant Cleaning",
    "After-Hours Cleaning",
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (uploadedFiles.length + files.length <= 6) {
      setUploadedFiles([...uploadedFiles, ...files])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", { formData, uploadedFiles, segment })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Received!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Thank you for your detailed quote request. We'll review your information and photos, then get back to you
            within 2 hours with a comprehensive estimate.
          </p>

          <div className="space-y-4 mb-8">
            <Button className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white">
              Schedule Call - Calendar Link
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Need immediate assistance?</p>
              <p className="text-lg font-semibold text-gray-900">Text us at (812) 610-1657</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>2-hour response</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Leaf className="w-4 h-4 text-green-600" />
              <span>Natural products</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Fully insured</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold">Request Your Free Quote</CardTitle>
            <CardDescription className="text-sm sm:text-base">Detailed form for accurate pricing - we'll respond within 2 hours</CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">Free Estimate</Badge>
        </div>

        {/* Segment Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg max-w-md">
          <button
            type="button"
            onClick={() => setSegment("residential")}
            className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-md text-sm font-medium transition-colors ${
              segment === "residential" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Residential
          </button>
          <button
            type="button"
            onClick={() => setSegment("commercial")}
            className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-md text-sm font-medium transition-colors ${
              segment === "commercial" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Commercial
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Property Details</h3>
            <div>
              <Label htmlFor="address">Property Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street address, city, state, zip"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sqft">Square Footage (Optional)</Label>
                <Input
                  id="sqft"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                  placeholder="e.g., 1500"
                />
              </div>

              {segment === "residential" ? (
                <>
                  <div>
                    <Label htmlFor="qfs-bedrooms">Bedrooms</Label>
                    <Select
                      value={formData.bedrooms}
                      onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}
                    >
                      <SelectTrigger id="qfs-bedrooms" aria-label="Bedrooms">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="qfs-bathrooms">Bathrooms</Label>
                    <Select
                      value={formData.bathrooms}
                      onValueChange={(value) => setFormData({ ...formData, bathrooms: value })}
                    >
                      <SelectTrigger id="qfs-bathrooms" aria-label="Bathrooms">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="3+">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="qfs-business-type">Business Type</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                    >
                      <SelectTrigger id="qfs-business-type" aria-label="Business Type">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="retail">Retail Store</SelectItem>
                        <SelectItem value="medical">Medical Practice</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="warehouse">Warehouse</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="suiteAccess">Suite Access Notes</Label>
                    <Input
                      id="suiteAccess"
                      value={formData.suiteAccess}
                      onChange={(e) => setFormData({ ...formData, suiteAccess: e.target.value })}
                      placeholder="Access codes, key location, etc."
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Service Details</h3>
            <div>
              <Label htmlFor="qfs-service">Service Needed *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData({ ...formData, service: value })}
                required
              >
                <SelectTrigger id="qfs-service" aria-label="Service Needed">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {(segment === "residential" ? residentialServices : commercialServices).map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="qfs-preferred-time">Preferred Time Window</Label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                >
                  <SelectTrigger id="qfs-preferred-time" aria-label="Preferred Time Window">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                    <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Photos for Accurate Pricing</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Upload up to 6 photos of the areas to be cleaned for the most accurate estimate
            </p>

            <div>
              <label className="flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-xs sm:text-sm text-gray-500">
                    <span className="font-semibold">Click to upload photos</span> or drag and drop
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">PNG, JPG up to 10MB each (max 6 photos)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border">
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Eco-Friendly Option */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Cleaning Preferences</h3>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="ecoFriendly"
                checked={formData.ecoFriendly}
                onCheckedChange={(checked) => setFormData({ ...formData, ecoFriendly: checked as boolean })}
              />
              <Label htmlFor="ecoFriendly" className="text-sm flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Use eco-friendly, natural products only (recommended)
              </Label>
            </div>
          </div>

          {/* Additional Message */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
            <div>
              <Label htmlFor="message">Special Requirements or Questions</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any specific cleaning requirements, areas of concern, pets, allergies, or questions you'd like to discuss..."
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
              Get My Free Quote
            </Button>
            <p className="text-center text-sm text-gray-500 mt-3">
              We'll review your request and respond within 2 hours with a detailed estimate
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
