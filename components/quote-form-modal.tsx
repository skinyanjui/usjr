"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Upload, Camera, CheckCircle } from "lucide-react"
import { settings } from "@/lib/cms-content"

interface QuoteFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
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
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quote Request Received!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your quote request. We'll review your information and get back to you within 2 hours with a
              detailed estimate.
            </p>
            <div className="space-y-3 mb-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Schedule Call - Calendar Link</Button>
              <p className="text-sm text-gray-500">
                Or text us at <span className="font-semibold">{settings.phone}</span> for immediate assistance
              </p>
            </div>
            <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">Get Your Free Cleaning Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll provide a detailed estimate within 2 hours
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Segment Toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setSegment("residential")}
              className={`flex-1 py-2 sm:py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                segment === "residential" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Residential
            </button>
            <button
              type="button"
              onClick={() => setSegment("commercial")}
              className={`flex-1 py-2 sm:py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                segment === "commercial" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Commercial
            </button>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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

          {/* Property Information */}
          <div className="space-y-3 sm:space-y-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="sqft">Square Footage</Label>
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
                    <Label htmlFor="qfm-bedrooms">Bedrooms</Label>
                    <Select
                      value={formData.bedrooms}
                      onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}
                    >
                      <SelectTrigger id="qfm-bedrooms" aria-label="Bedrooms">
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
                    <Label htmlFor="qfm-bathrooms">Bathrooms</Label>
                    <Select
                      value={formData.bathrooms}
                      onValueChange={(value) => setFormData({ ...formData, bathrooms: value })}
                    >
                      <SelectTrigger id="qfm-bathrooms" aria-label="Bathrooms">
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
                    <Label htmlFor="qfm-business-type">Business Type</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                    >
                      <SelectTrigger id="qfm-business-type" aria-label="Business Type">
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
                  <div className="md:col-span-2">
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
          <div>
            <Label htmlFor="qfm-service">Service Needed *</Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
              required
            >
              <SelectTrigger id="qfm-service" aria-label="Service Needed">
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

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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
              <Label htmlFor="qfm-preferred-time">Preferred Time</Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
              >
                <SelectTrigger id="qfm-preferred-time" aria-label="Preferred Time">
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

          {/* Photo Upload */}
          <div>
            <Label>Photos (Optional - Up to 6 images)</Label>
            <div className="mt-2">
              <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-4 pb-5">
                  <Upload className="w-7 h-7 sm:w-8 sm:h-8 mb-2 text-gray-400" />
                  <p className="mb-1 text-xs text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">PNG, JPG up to 10MB each</p>
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
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ecoFriendly"
              checked={formData.ecoFriendly}
              onCheckedChange={(checked) => setFormData({ ...formData, ecoFriendly: checked as boolean })}
            />
            <Label htmlFor="ecoFriendly" className="text-sm">
              Use eco-friendly products only (recommended)
            </Label>
          </div>

          {/* Additional Message */}
          <div>
            <Label htmlFor="message">Additional Details (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any specific requirements, concerns, or questions..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">Submit Request</Button>
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
