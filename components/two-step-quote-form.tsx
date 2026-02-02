'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Camera, Truck, Package, Home, Building2 } from 'lucide-react'
import { settings } from '@/lib/cms-content'
import { junkRemovalTiers } from '@/lib/pricing'
import { submitQuoteForm } from '@/lib/form-handlers'

export function TwoStepQuoteForm() {
  const [step, setStep] = useState(1)
  const [zipCode, setZipCode] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [loadSize, setLoadSize] = useState('')
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    photos: null as FileList | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const serviceAreas = [
    '47708',
    '47711',
    '47712',
    '47713',
    '47714',
    '47715',
    '47716',
    '47720',
    '47721',
    '47722',
    '47724',
    '47725',
    '47727',
    '47728',
    '47730',
    '47732',
    '47733',
    '47734',
    '47735',
    '47736',
    '47737',
    '47739',
    '47747',
    '47750',
  ]

  const itemCategories = [
    { id: 'furniture', label: 'Furniture', icon: Home },
    { id: 'appliances', label: 'Appliances', icon: Package },
    { id: 'electronics', label: 'Electronics', icon: Package },
    { id: 'construction', label: 'Construction Debris', icon: Building2 },
    { id: 'yard-waste', label: 'Yard Waste', icon: Home },
    { id: 'hot-tub', label: 'Hot Tub/Spa', icon: Package },
    { id: 'mattress', label: 'Mattress/Box Spring', icon: Home },
    { id: 'other', label: 'Other Items', icon: Package },
  ]

  const priceById = new Map(junkRemovalTiers.map(t => [t.id, t.price]))
  const loadSizes = [
    {
      id: 'single',
      label: 'Single Item',
      description: '1-2 items',
      price: priceById.get('single') || '',
    },
    {
      id: 'quarter',
      label: '¼ Truck Load',
      description: 'Small pickup load',
      price: priceById.get('quarter') || '',
    },
    {
      id: 'half',
      label: '½ Truck Load',
      description: 'Half pickup load',
      price: priceById.get('half') || '',
    },
    {
      id: 'three-quarter',
      label: '¾ Truck Load',
      description: 'Large pickup load',
      price: priceById.get('three-quarter') || '',
    },
    {
      id: 'full',
      label: 'Full Truck Load',
      description: 'Complete truck load',
      price: priceById.get('full') || '',
    },
  ]

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (serviceAreas.includes(zipCode)) {
      setStep(2)
    } else {
      alert(
        `Sorry, we don't currently service that area. Please call ${settings.phone} for assistance.`
      )
    }
  }

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = {
        name: 'User (Two-Step Form)',
        email: contactInfo.email,
        phone: contactInfo.phone,
        service: 'Junk Removal (Custom Items)',
        projectSize: loadSize,
        details: `Selected Items: ${selectedItems.join(', ')}\nZIP Code: ${zipCode}`,
        attachments: contactInfo.photos,
      }

      await submitQuoteForm({
        formData,
        source: 'two-step-quote-form',
        onSuccess: () => {
          setIsSubmitted(true)
        },
        onError: msg => {
          setError(msg)
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="glass">
        <CardContent className="py-12 text-center">
          <CardTitle className="text-foreground mb-4 text-2xl font-bold">
            Quote Request Received!
          </CardTitle>
          <p className="text-muted-foreground mb-6">
            Thank you! We've received your information and will contact you within 15 minutes with
            your quote.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground"
          >
            Send Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {step === 1 ? (
        <Card className="glass">
          <CardHeader className="text-center">
            <CardTitle className="text-foreground flex items-center justify-center gap-2 text-xl font-bold sm:text-2xl">
              <MapPin className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
              Get Your Free Quote
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">
              Enter your ZIP code to get started
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleZipSubmit} className="space-y-4">
              <div>
                <Label htmlFor="zipcode" className="text-muted-foreground text-sm font-medium">
                  ZIP Code
                </Label>
                <Input
                  id="zipcode"
                  type="text"
                  placeholder="Enter your ZIP code"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  className="mt-1"
                  required
                  maxLength={5}
                  pattern="[0-9]{5}"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground w-full py-3 font-semibold hover:brightness-110"
              >
                Check Service Area
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass">
          <CardHeader className="text-center">
            <CardTitle className="text-foreground flex items-center justify-center gap-2 text-xl font-bold sm:text-2xl">
              <Truck className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
              What needs to be removed?
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base">
              Select items and load size for accurate pricing
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Item Selection */}
              <div>
                <Label className="text-muted-foreground mb-3 block text-sm font-medium">
                  Select Items to Remove
                </Label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
                  {itemCategories.map(item => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemToggle(item.id)}
                        className={`rounded-lg border-2 p-3 text-center transition-all ${
                          selectedItems.includes(item.id)
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className="mx-auto mb-1 h-5 w-5 sm:h-6 sm:w-6" />
                        <div className="text-xs font-medium">{item.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Load Size Selection */}
              <div>
                <Label className="text-muted-foreground mb-3 block text-sm font-medium">
                  Estimated Load Size
                </Label>
                <div className="space-y-2">
                  {loadSizes.map(size => (
                    <label
                      key={size.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-2 transition-all sm:p-3 ${
                        loadSize === size.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="loadSize"
                          value={size.id}
                          checked={loadSize === size.id}
                          onChange={e => setLoadSize(e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <div className="text-foreground font-medium">{size.label}</div>
                          <div className="text-muted-foreground text-sm">{size.description}</div>
                        </div>
                      </div>
                      <div className="text-foreground font-bold">{size.price}</div>
                    </label>
                  ))}
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  *Includes labor, hauling, and dump fees. Final price determined on-site.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Label className="text-muted-foreground text-sm font-medium">
                  Contact Information
                </Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={contactInfo.phone}
                      onChange={e => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={contactInfo.email}
                      onChange={e => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <Label className="text-muted-foreground mb-2 flex items-center gap-2 text-sm font-medium">
                  <Camera className="h-4 w-4" />
                  Upload Photos (Optional)
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  capture="environment"
                  onChange={e => setContactInfo(prev => ({ ...prev, photos: e.target.files }))}
                  className="file:bg-primary file:text-primary-foreground file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:brightness-110"
                />
                <p className="text-muted-foreground mt-1 text-xs">
                  Photos help us provide more accurate quotes
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gray-900 py-2 font-semibold text-white hover:bg-gray-900 sm:py-3"
                  disabled={!loadSize || selectedItems.length === 0 || isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Get My Quote'}
                </Button>
              </div>
              {error && (
                <p className="text-destructive mt-2 text-center text-sm font-medium">{error}</p>
              )}
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
