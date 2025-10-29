'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Upload, Camera, X, CheckCircle, Leaf, Shield, Clock } from 'lucide-react'
import { settings } from '@/lib/cms-content'

export function QuoteFormStandalone() {
  const [segment, setSegment] = useState<'residential' | 'commercial'>('residential')
  const [sector, setSector] = useState<
    'junk-removal' | 'cleaning' | 'light-demolition' | 'estate-cleanouts'
  >('junk-removal')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    sqft: '',
    bedrooms: '',
    bathrooms: '',
    businessType: '',
    suiteAccess: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    ecoFriendly: true,
    message: '',
    // Sector-specific fields
    loadSize: '',
    itemsDescription: '',
    structureType: '',
    approxSize: '',
    utilitiesDisconnected: false,
    demolitionMaterial: '',
    haulAway: false,
    estatePropertyType: '',
    estateRooms: '',
    estateAccess: '',
    estateTimeline: '',
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const residentialServices = [
    'Deep Cleaning',
    'Recurring Cleaning (Weekly)',
    'Recurring Cleaning (Bi-weekly)',
    'Recurring Cleaning (Monthly)',
    'Move-In/Move-Out Cleaning',
    'Refrigerator Cleaning',
    'Oven Cleaning',
    'Home Organizing',
    'Decluttering Service',
  ]

  const commercialServices = [
    'Office Cleaning (Daily)',
    'Office Cleaning (Weekly)',
    'Office Cleaning (Bi-weekly)',
    'Office Cleaning (Monthly)',
    'Retail Store Cleaning',
    'Medical Office Cleaning',
    'Restaurant Cleaning',
    'After-Hours Cleaning',
  ]

  const junkRemovalServices = [
    'Single Item Pickup',
    'Furniture Removal',
    'Appliance Removal',
    'Garage Cleanout',
    'Estate Cleanout',
    'Construction Debris',
    'Yard Waste',
    'Hot Tub Removal',
    'Shed Removal',
    'Light Demolition',
  ]

  const estateCleanoutServices = [
    'Estate Cleanout - Partial',
    'Estate Cleanout - Full',
    'Hoarding Cleanup',
  ]

  const lightDemolitionServices = [
    'Interior Demolition',
    'Deck Removal',
    'Fence Removal',
    'Shed Tear-Down',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    // Client-side validation
    if (!formData.service) {
      setSubmitError('Please select a service')
      setIsSubmitting(false)
      return
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setSubmitError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      // Prepare the data to send to the API
      const quoteData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        service: formData.service,
        details: buildDetailsString(),
        source: 'quote-form',
      }

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      })

      const result = await response.json()

      if (!response.ok || !result.ok) {
        // Handle both 'error' (string) and 'errors' (validation errors object)
        let errorMessage = 'Failed to submit quote request'
        if (result.error) {
          errorMessage = result.error
        } else if (result.errors) {
          // Extract field errors from zod validation
          const fieldErrors = result.errors.fieldErrors || {}
          const errorMessages = Object.entries(fieldErrors)
            .map(
              ([field, messages]) =>
                `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
            )
            .join('; ')
          errorMessage = errorMessages || 'Please check your form and try again'
        }
        throw new Error(errorMessage)
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting quote:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit quote. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Build a comprehensive details string from all form fields
  const buildDetailsString = () => {
    const details: string[] = []

    // Add segment and sector info
    details.push(`Segment: ${segment}`)
    details.push(`Sector: ${sector}`)

    // Add property details
    if (formData.sqft) details.push(`Square Footage: ${formData.sqft}`)
    if (formData.bedrooms) details.push(`Bedrooms: ${formData.bedrooms}`)
    if (formData.bathrooms) details.push(`Bathrooms: ${formData.bathrooms}`)
    if (formData.businessType) details.push(`Business Type: ${formData.businessType}`)
    if (formData.suiteAccess) details.push(`Suite Access: ${formData.suiteAccess}`)

    // Add scheduling preferences
    if (formData.preferredDate) details.push(`Preferred Date: ${formData.preferredDate}`)
    if (formData.preferredTime) details.push(`Preferred Time: ${formData.preferredTime}`)

    // Add sector-specific details
    if (sector === 'junk-removal') {
      if (formData.loadSize) details.push(`Load Size: ${formData.loadSize}`)
      if (formData.itemsDescription) details.push(`Items: ${formData.itemsDescription}`)
    }

    if (sector === 'light-demolition') {
      if (formData.structureType) details.push(`Structure Type: ${formData.structureType}`)
      if (formData.approxSize) details.push(`Approximate Size: ${formData.approxSize}`)
      if (formData.demolitionMaterial) details.push(`Material: ${formData.demolitionMaterial}`)
      if (formData.utilitiesDisconnected) details.push('Utilities: Disconnected')
      if (formData.haulAway) details.push('Haul-away: Yes')
    }

    if (sector === 'estate-cleanouts') {
      if (formData.estatePropertyType) details.push(`Property Type: ${formData.estatePropertyType}`)
      if (formData.estateRooms) details.push(`Rooms: ${formData.estateRooms}`)
      if (formData.estateAccess) details.push(`Access: ${formData.estateAccess}`)
      if (formData.estateTimeline) details.push(`Timeline: ${formData.estateTimeline}`)
    }

    // Add eco-friendly preference for cleaning
    if (sector === 'cleaning' && formData.ecoFriendly) {
      details.push('Eco-Friendly Products: Yes')
    }

    // Add custom message
    if (formData.message) details.push(`\nAdditional Notes: ${formData.message}`)

    // Add file upload info
    if (uploadedFiles.length > 0) {
      details.push(`\nPhotos Uploaded: ${uploadedFiles.length}`)
    }

    return details.join('\n')
  }

  const getSectorServiceOptions = () => {
    switch (sector) {
      case 'junk-removal':
        return junkRemovalServices
      case 'estate-cleanouts':
        return estateCleanoutServices
      case 'light-demolition':
        return lightDemolitionServices
      case 'cleaning':
      default:
        return segment === 'residential' ? residentialServices : commercialServices
    }
  }

  if (isSubmitted) {
    return (
      <Card className="mx-auto flex max-w-2xl flex-col">
        <CardContent className="p-6 text-center sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-foreground mb-4 text-2xl font-bold">Quote Request Received!</h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-md">
            Thank you for your detailed quote request. We'll review your information and photos,
            then get back to you within 2 hours with a comprehensive estimate.
          </p>

          <div className="mb-8 space-y-4">
            <Button asChild className="w-full max-w-sm bg-blue-600 text-white hover:bg-blue-700">
              <a href={settings.squareBookingUrl} target="_blank" rel="noopener noreferrer">
                Schedule Call - Calendar Link
              </a>
            </Button>
            <div className="text-center">
              <p className="text-muted-foreground mb-2 text-sm">Need immediate assistance?</p>
              <p className="text-foreground text-lg font-semibold">Text us at {settings.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>2-hour response</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <span>Natural products</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              <span>Fully insured</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto flex max-w-4xl flex-col">
      <CardHeader className="p-6 pb-4 sm:p-8">
        <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <CardTitle className="text-xl font-bold sm:text-2xl">Request Your Free Quote</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Detailed form for accurate pricing - we'll respond within 2 hours
            </CardDescription>
          </div>
          <Badge className="border-green-600 bg-green-100 text-green-700 dark:border-green-500 dark:text-green-400">
            Free Estimate
          </Badge>
        </div>

        {/* Sector + Segment Toggle */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="w-full max-w-md">
            <Label htmlFor="sector" className="mb-1 block text-sm">
              Service Sector
            </Label>
            <Select value={sector} onValueChange={value => setSector(value as typeof sector)}>
              <SelectTrigger id="sector" aria-label="Service Sector" fit>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junk-removal">Junk Removal</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="estate-cleanouts">Estate Cleanouts</SelectItem>
                <SelectItem value="light-demolition">Light Demolition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted/50 flex w-full max-w-md gap-2 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setSegment('residential')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors sm:px-6 sm:py-3 ${
                segment === 'residential'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Residential
            </button>
            <button
              type="button"
              onClick={() => setSegment('commercial')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors sm:px-6 sm:py-3 ${
                segment === 'commercial'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Commercial
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Contact Information */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-foreground text-base font-semibold sm:text-lg">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-foreground text-base font-semibold sm:text-lg">Property Details</h3>
            <div>
              <Label htmlFor="address">Property Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street address, city, state, zip"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
              <div>
                <Label htmlFor="sqft">Square Footage (Optional)</Label>
                <Input
                  id="sqft"
                  value={formData.sqft}
                  onChange={e => setFormData({ ...formData, sqft: e.target.value })}
                  placeholder="e.g., 1500"
                />
              </div>

              {sector === 'cleaning' && segment === 'residential' ? (
                <>
                  <div>
                    <Label htmlFor="qfs-bedrooms">Bedrooms</Label>
                    <Select
                      value={formData.bedrooms}
                      onValueChange={value => setFormData({ ...formData, bedrooms: value })}
                    >
                      <SelectTrigger id="qfs-bedrooms" aria-label="Bedrooms" fit>
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
                      onValueChange={value => setFormData({ ...formData, bathrooms: value })}
                    >
                      <SelectTrigger id="qfs-bathrooms" aria-label="Bathrooms" fit>
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
              ) : segment === 'commercial' ? (
                <>
                  <div>
                    <Label htmlFor="qfs-business-type">Business Type</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={value => setFormData({ ...formData, businessType: value })}
                    >
                      <SelectTrigger id="qfs-business-type" aria-label="Business Type" fit>
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
                      onChange={e => setFormData({ ...formData, suiteAccess: e.target.value })}
                      placeholder="Access codes, key location, etc."
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-foreground text-base font-semibold sm:text-lg">Service Details</h3>
            <div>
              <Label htmlFor="qfs-service">Service Needed *</Label>
              <Select
                value={formData.service}
                onValueChange={value => setFormData({ ...formData, service: value })}
                required
              >
                <SelectTrigger id="qfs-service" aria-label="Service Needed" fit>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {getSectorServiceOptions().map(service => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="qfs-preferred-time">Preferred Time Window</Label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={value => setFormData({ ...formData, preferredTime: value })}
                >
                  <SelectTrigger id="qfs-preferred-time" aria-label="Preferred Time Window" fit>
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

          {/* Sector-specific Details */}
          {sector === 'junk-removal' && (
            <div className="space-y-5 sm:space-y-6">
              <h3 className="text-foreground text-base font-semibold sm:text-lg">
                Junk Removal Details
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="jr-load-size">Estimated Load Size</Label>
                  <Select
                    value={formData.loadSize}
                    onValueChange={value => setFormData({ ...formData, loadSize: value })}
                  >
                    <SelectTrigger id="jr-load-size" aria-label="Estimated Load Size" fit>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Item</SelectItem>
                      <SelectItem value="quarter">¼ Truck Load</SelectItem>
                      <SelectItem value="half">½ Truck Load</SelectItem>
                      <SelectItem value="three-quarter">¾ Truck Load</SelectItem>
                      <SelectItem value="full">Full Truck Load</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="jr-items">Items or Areas to Clear</Label>
                  <Textarea
                    id="jr-items"
                    rows={3}
                    placeholder="List items or rooms to clear (e.g., sofa, fridge, garage, attic)"
                    value={formData.itemsDescription}
                    onChange={e => setFormData({ ...formData, itemsDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {sector === 'light-demolition' && (
            <div className="space-y-5 sm:space-y-6">
              <h3 className="text-foreground text-base font-semibold sm:text-lg">
                Demolition Details
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="ld-structure">Structure Type</Label>
                  <Select
                    value={formData.structureType}
                    onValueChange={value => setFormData({ ...formData, structureType: value })}
                  >
                    <SelectTrigger id="ld-structure" aria-label="Structure Type" fit>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shed">Shed</SelectItem>
                      <SelectItem value="deck">Deck</SelectItem>
                      <SelectItem value="fence">Fence</SelectItem>
                      <SelectItem value="interior">Interior Wall/Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ld-size">Approximate Size</Label>
                  <Input
                    id="ld-size"
                    placeholder="e.g., 10x12, 200 sq ft"
                    value={formData.approxSize}
                    onChange={e => setFormData({ ...formData, approxSize: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="ld-material">Primary Material</Label>
                  <Select
                    value={formData.demolitionMaterial}
                    onValueChange={value => setFormData({ ...formData, demolitionMaterial: value })}
                  >
                    <SelectTrigger id="ld-material" aria-label="Primary Material" fit>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wood">Wood</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="masonry">Masonry/Drywall</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="ld-utilities"
                    checked={formData.utilitiesDisconnected}
                    onCheckedChange={checked =>
                      setFormData({ ...formData, utilitiesDisconnected: checked as boolean })
                    }
                  />
                  <Label htmlFor="ld-utilities" className="text-sm">
                    Utilities disconnected (electric/water/gas)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="ld-haulaway"
                    checked={formData.haulAway}
                    onCheckedChange={checked =>
                      setFormData({ ...formData, haulAway: checked as boolean })
                    }
                  />
                  <Label htmlFor="ld-haulaway" className="text-sm">
                    Include debris haul-away
                  </Label>
                </div>
              </div>
            </div>
          )}

          {sector === 'estate-cleanouts' && (
            <div className="space-y-5 sm:space-y-6">
              <h3 className="text-foreground text-base font-semibold sm:text-lg">
                Estate Cleanout Details
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="ec-type">Property Type</Label>
                  <Select
                    value={formData.estatePropertyType}
                    onValueChange={value => setFormData({ ...formData, estatePropertyType: value })}
                  >
                    <SelectTrigger id="ec-type" aria-label="Property Type" fit>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="storage">Storage Unit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ec-rooms">Rooms/Areas</Label>
                  <Select
                    value={formData.estateRooms}
                    onValueChange={value => setFormData({ ...formData, estateRooms: value })}
                  >
                    <SelectTrigger id="ec-rooms" aria-label="Rooms/Areas" fit>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="few">1-3</SelectItem>
                      <SelectItem value="several">4-6</SelectItem>
                      <SelectItem value="many">7+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="ec-access">Access Constraints</Label>
                  <Input
                    id="ec-access"
                    placeholder="Stairs only, limited parking, narrow hallways, etc."
                    value={formData.estateAccess}
                    onChange={e => setFormData({ ...formData, estateAccess: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="ec-timeline">Timeline/Urgency</Label>
                  <Select
                    value={formData.estateTimeline}
                    onValueChange={value => setFormData({ ...formData, estateTimeline: value })}
                  >
                    <SelectTrigger id="ec-timeline" aria-label="Timeline/Urgency" fit>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="next-48h">Next 24-48 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Photo Upload */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-foreground text-base font-semibold sm:text-lg">
              Photos for Accurate Pricing
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Upload up to 6 photos of the areas/items for the job to help us provide the most
              accurate estimate
            </p>

            <div>
              <label className="border-border bg-muted/30 hover:bg-muted/50 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors sm:h-40">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="text-muted-foreground mb-3 h-8 w-8 sm:h-10 sm:w-10" />
                  <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
                    <span className="font-semibold">Click to upload photos</span> or drag and drop
                  </p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs">
                    PNG, JPG up to 10MB each (max 6 photos)
                  </p>
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
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="bg-muted/50 flex aspect-square items-center justify-center rounded-lg border">
                      <Camera className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs text-white dark:bg-blue-950/300"
                      aria-label={`Remove file ${file.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <p className="text-muted-foreground mt-1 truncate text-[10px] sm:text-xs">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preferences (cleaning only) */}
          {sector === 'cleaning' && (
            <div className="space-y-5 sm:space-y-6">
              <h3 className="text-foreground text-lg font-semibold">Preferences</h3>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="ecoFriendly"
                  checked={formData.ecoFriendly}
                  onCheckedChange={checked =>
                    setFormData({ ...formData, ecoFriendly: checked as boolean })
                  }
                />
                <Label htmlFor="ecoFriendly" className="flex items-center gap-2 text-sm">
                  <Leaf className="h-4 w-4 text-green-600" />
                  Use eco-friendly, natural products only (recommended)
                </Label>
              </div>
            </div>
          )}

          {/* Additional Message */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-foreground text-lg font-semibold">Additional Information</h3>
            <div>
              <Label htmlFor="message">Special Requirements or Questions</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any specific requirements, access details, hazards, or questions you'd like to discuss..."
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t pt-8">
            {submitError && (
              <div className="mb-4 rounded-lg border border-blue-800 bg-blue-50 p-4 text-sm text-blue-900 dark:border-red-500 dark:bg-blue-950/30 dark:text-blue-400">
                {submitError}
              </div>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 py-3 text-lg text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
            </Button>
            <p className="text-muted-foreground mt-4 text-center text-sm">
              We'll review your request and respond within 2 hours with a detailed estimate
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
