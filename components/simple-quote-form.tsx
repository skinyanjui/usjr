'use client'

import type React from 'react'
import { CheckCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { settings } from '@/lib/cms-content'
import { getServiceOptions } from '@/lib/service-options'

export function SimpleQuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceAddress: '',
    serviceNeeded: '',
    projectSize: '',
    projectDetails: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    // Client-side validation
    if (!formData.serviceNeeded) {
      setErrorMessage('Please select a service')
      setIsSubmitting(false)
      return
    }

    if (!formData.fullName || !formData.emailAddress || !formData.phoneNumber) {
      setErrorMessage('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
          serviceAddress: formData.serviceAddress,
          serviceNeeded: formData.serviceNeeded,
          projectSize: formData.projectSize,
          projectDetails: formData.projectDetails,
          source: 'simple-quote-form',
        }),
      })
      const result = await res.json()
      if (!res.ok || !result.ok) {
        // Handle both 'error' (string) and 'errors' (validation errors object)
        let errorMsg = 'Failed to submit'
        if (result.error) {
          errorMsg = result.error
        } else if (result.errors) {
          const fieldErrors = result.errors.fieldErrors || {}
          const errorMessages = Object.entries(fieldErrors)
            .map(
              ([field, messages]) =>
                `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
            )
            .join('; ')
          errorMsg = errorMessages || 'Please check your form and try again'
        }
        throw new Error(errorMsg)
      }
      setIsSubmitted(true)
      setFormData({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        serviceAddress: '',
        serviceNeeded: '',
        projectSize: '',
        projectDetails: '',
      })
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err)
      }
      setErrorMessage('Something went wrong. Please try again or call us.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Quote Request Received!</h3>
          <p className="mx-auto mb-8 max-w-md text-gray-600">
            Thank you for your request. We'll contact you shortly with your free estimate and
            same-day service options.
          </p>
          <div className="space-y-4">
            <a
              href={`tel:${settings.phoneE164}`}
              className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-red-700/35 px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-red-700/45"
            >
              <Phone className="h-4 w-4" /> Call {settings.phone} for Immediate Service
            </a>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Request Free Quote</CardTitle>
        <CardDescription className="text-gray-600">
          Get an instant estimate for your Evansville project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={e => handleInputChange('fullName', e.target.value)}
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
                onChange={e => handleInputChange('phoneNumber', e.target.value)}
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
              onChange={e => handleInputChange('emailAddress', e.target.value)}
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
              onChange={e => handleInputChange('serviceAddress', e.target.value)}
              className="mt-1"
              placeholder="Enter your service address"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="serviceNeeded" className="text-sm font-medium text-gray-700">
                Service Needed *
              </Label>
              <Select
                value={formData.serviceNeeded}
                onValueChange={value => handleInputChange('serviceNeeded', value)}
              >
                <SelectTrigger id="serviceNeeded" className="mt-1" aria-label="Service Needed" fit>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {getServiceOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="projectSize" className="text-sm font-medium text-gray-700">
                Project Size
              </Label>
              <Select
                value={formData.projectSize}
                onValueChange={value => handleInputChange('projectSize', value)}
              >
                <SelectTrigger id="projectSize" className="mt-1" aria-label="Project Size" fit>
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
              onChange={e => handleInputChange('projectDetails', e.target.value)}
              rows={4}
              className="mt-1"
              placeholder="Tell us more about your project..."
            />
          </div>

          <div className="space-y-4">
            {errorMessage && <p className="text-center text-sm text-red-600">{errorMessage}</p>}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 py-3 text-lg font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
            </Button>
            <p className="text-center text-sm text-gray-600">
              By submitting this form, you agree to receive text messages and calls from Uncle Sam
              Junk Removal.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
