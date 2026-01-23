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
import { Badge } from '@/components/ui/badge'
import { Upload, Camera, X, CheckCircle, Leaf, Shield, Clock } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { useFileUpload } from '@/lib/hooks/useFileUpload'
import { submitQuoteForm } from '@/lib/form-handlers'

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
  const { files: uploadedFiles, handleUpload: handleFileUpload, removeFile } = useFileUpload(6)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Client-side validation
      if (!formData.service) {
        setSubmitError('Please select a service')
        return
      }

      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        setSubmitError('Please fill in all required fields')
        return
      }

      // Prepare the data to send to the API
      const quoteData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        service: formData.service,
        details: buildDetailsString(),
      }

      await submitQuoteForm({
        formData: {
          ...quoteData,
          attachments: uploadedFiles.map((f) => f.file),
        },
        source: 'quote-form',
        onSuccess: () => setIsSubmitted(true),
        onError: (errorMessage) => setSubmitError(errorMessage),
      })
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
      <Card className="mx-auto flex max-w-2xl flex-col shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">Quote Request Received!</h2>
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            Thank you for your detailed request. We'll review your information and get back to you within 2 hours.
          </p>

          <div className="mb-8 space-y-3">
            <Button asChild className="w-full max-w-xs">
              <a href={settings.squareBookingUrl} target="_blank" rel="noopener noreferrer">
                Schedule Call
              </a>
            </Button>
            <div className="text-center">
              <p className="mb-1 text-sm text-muted-foreground">Need immediate assistance?</p>
              <p className="font-semibold text-foreground">Text {settings.phone}</p>
            </div>
          </div>

          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>2-hour response</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Leaf className="h-3.5 w-3.5" />
              <span>Eco-friendly</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              <span>Insured</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto flex max-w-4xl flex-col shadow-sm">
      <CardHeader className="p-6 pb-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Request Quote</CardTitle>
            <CardDescription className="text-sm">
              We'll respond within 2 hours
            </CardDescription>
          </div>
          <Badge variant="outline" className="w-fit border-primary/50 text-primary">
            Free Estimate
          </Badge>
        </div>

        {/* Sector + Segment - Compact Row */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-1/2">
            <Select value={sector} onValueChange={value => setSector(value as typeof sector)}>
              <SelectTrigger id="sector" className="h-9">
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

          <div className="flex w-full sm:w-1/2 rounded-md bg-muted/50 p-1">
            <button
              type="button"
              onClick={() => setSegment('residential')}
              className={`flex-1 rounded-sm px-3 py-1 text-xs font-medium transition-colors ${segment === 'residential'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Residential
            </button>
            <button
              type="button"
              onClick={() => setSegment('commercial')}
              className={`flex-1 rounded-sm px-3 py-1 text-xs font-medium transition-colors ${segment === 'commercial'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Commercial
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Form Grid */}
          <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
            {/* Contact Info Group */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Contact</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street, City, Zip"
                    required
                    className="h-9"
                  />
                </div>
              </div>
            </div>

            <div className="my-2 h-px bg-border md:col-span-2" />

            {/* Service Selection */}
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="qfs-service" className="text-xs">Service Type *</Label>
              <Select
                value={formData.service}
                onValueChange={value => setFormData({ ...formData, service: value })}
                required
              >
                <SelectTrigger id="qfs-service" className="h-9">
                  <SelectValue placeholder="Select service..." />
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

            {/* Date/Time */}
            <div className="space-y-1.5">
              <Label htmlFor="preferredDate" className="text-xs">Preferred Date</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qfs-preferred-time" className="text-xs">Time Window</Label>
              <Select
                value={formData.preferredTime}
                onValueChange={value => setFormData({ ...formData, preferredTime: value })}
              >
                <SelectTrigger id="qfs-preferred-time" className="h-9">
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8-12)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12-5)</SelectItem>
                  <SelectItem value="evening">Evening (5-8)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Sector Fields */}
            {sector === 'junk-removal' && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="jr-load-size" className="text-xs">Est. Load Size</Label>
                  <Select value={formData.loadSize} onValueChange={value => setFormData({ ...formData, loadSize: value })}>
                    <SelectTrigger id="jr-load-size" className="h-9"><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Item</SelectItem>
                      <SelectItem value="quarter">¼ Truck</SelectItem>
                      <SelectItem value="half">½ Truck</SelectItem>
                      <SelectItem value="full">Full Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="jr-items" className="text-xs">Items Description</Label>
                  <Textarea
                    id="jr-items"
                    rows={2}
                    placeholder="Sofa, fridge, garage clutter..."
                    value={formData.itemsDescription}
                    onChange={e => setFormData({ ...formData, itemsDescription: e.target.value })}
                    className="resize-none"
                  />
                </div>
              </>
            )}

            {sector === 'light-demolition' && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="ld-structure" className="text-xs">Structure</Label>
                  <Select value={formData.structureType} onValueChange={value => setFormData({ ...formData, structureType: value })}>
                    <SelectTrigger id="ld-structure" className="h-9"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shed">Shed</SelectItem>
                      <SelectItem value="deck">Deck</SelectItem>
                      <SelectItem value="fence">Fence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ld-size" className="text-xs">Approx Size</Label>
                  <Input id="ld-size" className="h-9" placeholder="e.g. 10x12" value={formData.approxSize} onChange={e => setFormData({ ...formData, approxSize: e.target.value })} />
                </div>
              </>
            )}

            {sector === 'cleaning' && segment === 'residential' && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="qfs-bedrooms" className="text-xs">Bedrooms</Label>
                  <Select value={formData.bedrooms} onValueChange={v => setFormData({ ...formData, bedrooms: v })}>
                    <SelectTrigger id="qfs-bedrooms" className="h-9"><SelectValue placeholder="#" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(n => <SelectItem key={n} value={n.toString()}>{n}{n === 5 && '+'}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="qfs-bathrooms" className="text-xs">Bathrooms</Label>
                  <Select value={formData.bathrooms} onValueChange={v => setFormData({ ...formData, bathrooms: v })}>
                    <SelectTrigger id="qfs-bathrooms" className="h-9"><SelectValue placeholder="#" /></SelectTrigger>
                    <SelectContent>
                      {[1, 1.5, 2, 2.5, 3].map(n => <SelectItem key={n} value={n.toString()}>{n}{n === 3 && '+'}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Photos */}
            <div className="md:col-span-2 space-y-2">
              <Label className="text-xs">Photos (Optional)</Label>
              <div className="grid grid-cols-4 gap-2">
                <label className="border-border hover:bg-muted/50 flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="mt-1 text-[10px] text-muted-foreground">Upload</span>
                  <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileUpload} />
                </label>
                {uploadedFiles.map((fileWrapper) => (
                  <div key={fileWrapper.id} className="relative aspect-square rounded-md border bg-muted/30 p-1">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-sm">
                      <Camera className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                    <button type="button" onClick={() => removeFile(fileWrapper.id)} className="absolute -top-1 -right-1 rounded-full bg-destructive text-destructive-foreground p-0.5"><X className="h-2.5 w-2.5" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="md:col-span-2 space-y-1.5">
              <Label htmlFor="message" className="text-xs">Notes</Label>
              <Textarea
                id="message"
                className="min-h-[60px] resize-none"
                placeholder="Any access codes, parking info, or specific questions..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-2">
            {submitError && (
              <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                {submitError}
              </div>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? 'Sending Request...' : 'Get Free Quote'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
