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

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (disabled in production)
    if (process.env.NODE_ENV !== 'production') {
      console.log({ zipCode, selectedItems, loadSize, contactInfo })
    }
    alert("Thank you! We'll contact you within 15 minutes with your quote.")
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {step === 1 ? (
        <Card className="glass">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold text-gray-800 sm:text-2xl">
              <MapPin className="h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
              Get Your Free Quote
            </CardTitle>
            <p className="text-sm text-muted-foreground sm:text-base">Enter your ZIP code to get started</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleZipSubmit} className="space-y-4">
              <div>
                <Label htmlFor="zipcode" className="text-sm font-medium text-muted-foreground">
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
                className="w-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
              >
                Check Service Area
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold text-gray-800 sm:text-2xl">
              <Truck className="h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
              What needs to be removed?
            </CardTitle>
            <p className="text-sm text-muted-foreground sm:text-base">
              Select items and load size for accurate pricing
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Item Selection */}
              <div>
                <Label className="mb-3 block text-sm font-medium text-muted-foreground">
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
                            ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700'
                            : 'border-border hover:border-red-300'
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
                <Label className="mb-3 block text-sm font-medium text-muted-foreground">
                  Estimated Load Size
                </Label>
                <div className="space-y-2">
                  {loadSizes.map(size => (
                    <label
                      key={size.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-2 transition-all sm:p-3 ${
                        loadSize === size.id
                          ? 'border-red-600 bg-red-50 dark:bg-red-950/30'
                          : 'border-border hover:border-red-300'
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
                          <div className="font-medium text-gray-800">{size.label}</div>
                          <div className="text-sm text-muted-foreground">{size.description}</div>
                        </div>
                      </div>
                      <div className="font-bold text-red-600">{size.price}</div>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  *Includes labor, hauling, and dump fees. Final price determined on-site.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">Contact Information</Label>
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
                <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Camera className="h-4 w-4" />
                  Upload Photos (Optional)
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  capture="environment"
                  onChange={e => setContactInfo(prev => ({ ...prev, photos: e.target.files }))}
                  className="file:mr-4 file:rounded-full file:border-0 file:bg-red-50 dark:bg-red-950/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-red-700 hover:file:bg-red-100"
                />
                <p className="mt-1 text-xs text-muted-foreground">
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
                  className="flex-1 bg-red-600 py-2 font-semibold text-white hover:bg-red-700 sm:py-3"
                  disabled={!loadSize || selectedItems.length === 0}
                >
                  Get My Quote
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
