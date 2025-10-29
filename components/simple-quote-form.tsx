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

interface FieldErrors {
  fullName?: string
  phoneNumber?: string
  emailAddress?: string
  serviceNeeded?: string
  [key: string]: string | undefined
}

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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return undefined
      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required'
        const phoneRegex = /^[\d\s\-\(\)]+$/
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number'
        if (value.replace(/\D/g, '').length < 10) return 'Phone number must be at least 10 digits'
        return undefined
      case 'emailAddress':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return undefined
      case 'serviceNeeded':
        if (!value) return 'Please select a service'
        return undefined
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const errors: FieldErrors = {}
    const fullNameError = validateField('fullName', formData.fullName)
    if (fullNameError) errors.fullName = fullNameError

    const phoneError = validateField('phoneNumber', formData.phoneNumber)
    if (phoneError) errors.phoneNumber = phoneError

    const emailError = validateField('emailAddress', formData.emailAddress)
    if (emailError) errors.emailAddress = emailError

    const serviceError = validateField('serviceNeeded', formData.serviceNeeded)
    if (serviceError) errors.serviceNeeded = serviceError

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Mark all fields as touched
    setTouched({
      fullName: true,
      phoneNumber: true,
      emailAddress: true,
      serviceNeeded: true,
    })

    // Validate all fields
    if (!validateForm()) {
      setErrorMessage('Please fix the errors above')
      return
    }

    setIsSubmitting(true)

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
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field as keyof typeof formData])
    setFieldErrors(prev => ({ ...prev, [field]: error }))
  }

  if (isSubmitted) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
            <CheckCircle className="h-8 w-8 text-gray-900" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Quote Request Received!</h3>
          <p className="mx-auto mb-8 max-w-md text-gray-600">
            Thank you for your request. We'll contact you shortly with your free estimate and
            same-day service options.
          </p>
          <div className="space-y-4">
            <a
              href={`tel:${settings.phoneE164}`}
              className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-gray-900/35 px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-gray-900/45"
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
                onBlur={() => handleBlur('fullName')}
                required
                className={`mt-1 ${touched.fullName && fieldErrors.fullName ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
                aria-invalid={touched.fullName && !!fieldErrors.fullName}
                aria-describedby={
                  touched.fullName && fieldErrors.fullName ? 'fullName-error' : undefined
                }
              />
              {touched.fullName && fieldErrors.fullName && (
                <p id="fullName-error" className="text-destructive mt-1 text-sm">
                  {fieldErrors.fullName}
                </p>
              )}
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
                onBlur={() => handleBlur('phoneNumber')}
                required
                className={`mt-1 ${touched.phoneNumber && fieldErrors.phoneNumber ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
                aria-invalid={touched.phoneNumber && !!fieldErrors.phoneNumber}
                aria-describedby={
                  touched.phoneNumber && fieldErrors.phoneNumber ? 'phoneNumber-error' : undefined
                }
              />
              {touched.phoneNumber && fieldErrors.phoneNumber && (
                <p id="phoneNumber-error" className="text-destructive mt-1 text-sm">
                  {fieldErrors.phoneNumber}
                </p>
              )}
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
              onBlur={() => handleBlur('emailAddress')}
              required
              className={`mt-1 ${touched.emailAddress && fieldErrors.emailAddress ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
              aria-invalid={touched.emailAddress && !!fieldErrors.emailAddress}
              aria-describedby={
                touched.emailAddress && fieldErrors.emailAddress ? 'emailAddress-error' : undefined
              }
            />
            {touched.emailAddress && fieldErrors.emailAddress && (
              <p id="emailAddress-error" className="text-destructive mt-1 text-sm">
                {fieldErrors.emailAddress}
              </p>
            )}
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
                onValueChange={value => {
                  handleInputChange('serviceNeeded', value)
                  handleBlur('serviceNeeded')
                }}
              >
                <SelectTrigger
                  id="serviceNeeded"
                  className={`mt-1 ${touched.serviceNeeded && fieldErrors.serviceNeeded ? 'border-destructive focus:ring-destructive/20' : ''}`}
                  aria-label="Service Needed"
                  aria-invalid={touched.serviceNeeded && !!fieldErrors.serviceNeeded}
                  aria-describedby={
                    touched.serviceNeeded && fieldErrors.serviceNeeded
                      ? 'serviceNeeded-error'
                      : undefined
                  }
                  fit
                >
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
              {touched.serviceNeeded && fieldErrors.serviceNeeded && (
                <p id="serviceNeeded-error" className="mt-1 text-sm text-gray-900">
                  {fieldErrors.serviceNeeded}
                </p>
              )}
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
            {errorMessage && <p className="text-center text-sm text-gray-900">{errorMessage}</p>}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 py-3 text-lg font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
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
