'use client'

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
import { CheckCircle } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { getServiceOptions } from '@/lib/service-options'
import { submitQuoteForm } from '@/lib/form-handlers'

export function EvansvilleQuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    projectSize: '',
    details: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    // Client-side validation
    if (!formData.service) {
      setErrorMessage('Please select a service')
      setIsSubmitting(false)
      return
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    await submitQuoteForm({
      formData: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        service: formData.service,
        projectSize: formData.projectSize,
        details: formData.details,
      },
      source: 'evansville-quote-form',
      onSuccess: () => {
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
      },
      onError: () => setErrorMessage('Something went wrong. Please try again or call us.'),
      onFinally: () => setIsSubmitting(false),
    })
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardContent className="py-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
            <CheckCircle className="h-8 w-8 text-gray-900" />
          </div>
          <h3 className="text-foreground mb-2 text-xl font-bold sm:text-2xl">
            Thanks! We received your request.
          </h3>
          <p className="text-muted-foreground mx-auto max-w-md text-sm sm:text-base">
            We'll text or call you shortly with your free estimate. For fastest service, call or
            text {settings.phone}.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Request Free Quote</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Get an instant estimate for your Evansville project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
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
                placeholder="(812) 555-0123"
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
                placeholder="your@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Service Address</Label>
              <Input
                id="address"
                placeholder="Evansville, IN address"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="service">Service Needed *</Label>
              <Select
                value={formData.service}
                onValueChange={value => setFormData({ ...formData, service: value })}
              >
                <SelectTrigger id="service" aria-label="Service Needed">
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
              <Label htmlFor="size">Project Size</Label>
              <Select
                value={formData.projectSize}
                onValueChange={value => setFormData({ ...formData, projectSize: value })}
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
                onChange={e => setFormData({ ...formData, details: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            {errorMessage && <p className="text-center text-sm text-gray-900">{errorMessage}</p>}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 py-3 text-base text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
            </Button>
            <p className="text-muted-foreground text-xs sm:text-sm">
              By submitting this form, you agree to receive text messages and calls from Uncle Sam
              Junk Removal.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
