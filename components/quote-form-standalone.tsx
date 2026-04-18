'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Upload, Camera, X, CheckCircle } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { getServiceOptions } from '@/lib/service-options'
import { useFileUpload } from '@/lib/hooks/useFileUpload'
import { submitQuoteForm } from '@/lib/form-handlers'

export function QuoteFormStandalone() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    preferredDate: '',
    message: '',
  })
  const { files: uploadedFiles, handleUpload: handleFileUpload, removeFile } = useFileUpload(6)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      if (!formData.service) {
        setSubmitError('Please select a service')
        return
      }
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        setSubmitError('Please fill in all required fields')
        return
      }

      await submitQuoteForm({
        formData: {
          ...formData,
          attachments: uploadedFiles.map(f => f.file),
        },
        source: 'quote-form',
        onSuccess: () => setIsSubmitted(true),
        onError: errorMessage => setSubmitError(errorMessage),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-xl shadow-sm">
        <CardContent className="p-12 text-center">
          <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <CheckCircle className="text-primary h-8 w-8" />
          </div>
          <h2 className="text-foreground mb-3 text-2xl font-bold tracking-tight">
            Request received
          </h2>
          <p className="text-muted-foreground mb-6">We'll be in touch within 2 hours.</p>
          <p className="text-muted-foreground text-sm">
            Need immediate help? Call{' '}
            <a href={`tel:${settings.phoneE164}`} className="text-foreground font-semibold">
              {settings.phone}
            </a>
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-xl shadow-sm">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold">Request a quote</CardTitle>
        <p className="text-muted-foreground text-sm">We'll respond within 2 hours.</p>
      </CardHeader>

      <CardContent className="p-6 pt-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs">
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="email" className="text-xs">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="address" className="text-xs">
                Address *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street, City, Zip"
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="qfs-service" className="text-xs">
                Service *
              </Label>
              <Select
                value={formData.service}
                onValueChange={value => setFormData({ ...formData, service: value })}
                required
              >
                <SelectTrigger id="qfs-service">
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
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="preferredDate" className="text-xs">
                Preferred Date
              </Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Photos (Optional)</Label>
            <div className="grid grid-cols-4 gap-2">
              <label className="border-border hover:bg-muted/50 flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors">
                <Upload className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground mt-1 text-[10px]">Upload</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
              {uploadedFiles.map(fileWrapper => (
                <div
                  key={fileWrapper.id}
                  className="bg-muted/30 relative aspect-square rounded-md border p-1"
                >
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-sm">
                    <Camera className="text-muted-foreground/50 h-4 w-4" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(fileWrapper.id)}
                    className="bg-destructive text-destructive-foreground absolute -top-1 -right-1 rounded-full p-0.5"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs">
              Notes
            </Label>
            <Textarea
              id="message"
              className="min-h-[80px] resize-none"
              placeholder="Tell us what you need removed, access notes, or any questions."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {submitError && (
            <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-md border p-3 text-xs">
              {submitError}
            </div>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full text-base font-semibold"
          >
            {isSubmitting ? 'Sending…' : 'Get Free Quote'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
