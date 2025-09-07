'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, Phone, Upload } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { getServiceOptions } from '@/lib/service-options'

interface UniversalQuoteFormProps {
  variant?: 'simple' | 'detailed' | 'contact' | 'embedded'
  location?: string
  theme?: 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'teal'
  showPhotos?: boolean
  isModal?: boolean
  className?: string
  title?: string
  description?: string
}

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  service: string
  projectSize: string
  details: string
}

export function UniversalQuoteForm({
  variant = 'simple',
  location = 'Evansville',
  theme = 'red',
  showPhotos = false,
  className = '',
  title,
  description
}: UniversalQuoteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    projectSize: '',
    details: '',
  })
  
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: `universal-quote-form-${variant}`,
          location,
          hasPhotos: uploadedFiles.length > 0
        }),
      })
      
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to submit')
      }
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        service: '',
        projectSize: '',
        details: '',
      })
      setUploadedFiles([])
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again or call us.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (uploadedFiles.length + files.length <= 6) {
      setUploadedFiles([...uploadedFiles, ...files])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  // Success State
  if (isSubmitted) {
    return (
      <Card className={`w-full ${className}`}>
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Quote Request Received!</h3>
          <p className="mx-auto mb-8 max-w-md text-gray-600">
            Thank you for your request. We'll contact you shortly with your free estimate.
          </p>
          <Button asChild className={`bg-${theme}-700 hover:bg-${theme}-800`}>
            <a href={`tel:${settings.phoneE164}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call {settings.phone} Now
            </a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const defaultTitle = title || `Request Free Quote${location ? ` - ${location}` : ''}`
  const defaultDescription = description || `Get an instant estimate for your ${location} project`

  return (
    <Card className={`w-full ${className}`}>
      {variant !== 'embedded' && (
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 sm:text-2xl">
            {defaultTitle}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {defaultDescription}
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={variant === 'embedded' ? 'space-y-2 sm:space-y-3' : ''}>
        <form onSubmit={handleSubmit} className={variant === 'embedded' ? 'space-y-3' : 'space-y-6'}>
          {/* Basic Fields */}
          <div className={`grid gap-${variant === 'embedded' ? '3' : '4'} ${variant === 'embedded' ? 'grid-cols-1 sm:grid-cols-2' : 'md:grid-cols-2'}`}>
            <div>
              {variant !== 'embedded' && <Label htmlFor="name">Full Name *</Label>}
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={variant === 'embedded' ? 'text-sm' : ''}
              />
            </div>
            <div>
              {variant !== 'embedded' && <Label htmlFor="phone">Phone Number *</Label>}
              <Input
                id="phone"
                type="tel"
                placeholder="(812) 555-0123"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className={variant === 'embedded' ? 'text-sm' : ''}
              />
            </div>
          </div>

          {/* Extended Fields for detailed variants */}
          {(variant === 'detailed' || variant === 'contact') && (
            <>
              <div>
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
              <div>
                <Label htmlFor="address">Service Address</Label>
                <Input
                  id="address"
                  placeholder={`${location} address`}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </>
          )}

          {/* Email field for embedded variant */}
          {variant === 'embedded' && (
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="text-sm"
            />
          )}

          {/* Service Selection */}
          <div className={`grid gap-${variant === 'embedded' ? '2 sm:gap-3' : '4'} ${variant === 'embedded' ? 'grid-cols-2' : 'md:grid-cols-2'}`}>
            <div>
              {variant !== 'embedded' && <Label htmlFor="service">Service Needed *</Label>}
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData({ ...formData, service: value })}
              >
                <SelectTrigger className={variant === 'embedded' ? 'text-sm' : ''} aria-label="Service Needed">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {getServiceOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              {variant !== 'embedded' && <Label htmlFor="projectSize">Project Size</Label>}
              <Select
                value={formData.projectSize}
                onValueChange={(value) => setFormData({ ...formData, projectSize: value })}
              >
                <SelectTrigger className={variant === 'embedded' ? 'text-sm' : ''} aria-label="Project Size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Details */}
          <div>
            {variant !== 'embedded' && <Label htmlFor="details">Project Details</Label>}
            <Textarea
              id="details"
              placeholder={`Tell us about your project in ${location}...`}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className={variant === 'embedded' ? 'min-h-[60px] text-sm' : 'min-h-[80px]'}
            />
          </div>

          {/* Photo Upload */}
          {showPhotos && (
            <div>
              <Label htmlFor="photos">Photos (Optional)</Label>
              <div className="mt-2">
                <input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('photos')?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photos ({uploadedFiles.length}/6)
                </Button>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-${theme}-700 hover:bg-${theme}-800 ${variant === 'embedded' ? 'text-sm' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
          </Button>

          {/* Consent Text */}
          <p className={`text-gray-600 text-center ${variant === 'embedded' ? 'text-xs' : 'text-xs'}`}>
            By submitting this form, you agree to receive text messages and calls from Uncle Sam Junk Removal.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}