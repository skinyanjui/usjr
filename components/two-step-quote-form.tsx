"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Camera, Truck, Package, Home, Building2 } from "lucide-react"

export function TwoStepQuoteForm() {
  const [step, setStep] = useState(1)
  const [zipCode, setZipCode] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [loadSize, setLoadSize] = useState("")
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    photos: null as FileList | null,
  })

  const serviceAreas = [
    "47708",
    "47711",
    "47712",
    "47713",
    "47714",
    "47715",
    "47716",
    "47720",
    "47721",
    "47722",
    "47724",
    "47725",
    "47727",
    "47728",
    "47730",
    "47732",
    "47733",
    "47734",
    "47735",
    "47736",
    "47737",
    "47739",
    "47747",
    "47750",
  ]

  const itemCategories = [
    { id: "furniture", label: "Furniture", icon: Home },
    { id: "appliances", label: "Appliances", icon: Package },
    { id: "electronics", label: "Electronics", icon: Package },
    { id: "construction", label: "Construction Debris", icon: Building2 },
    { id: "yard-waste", label: "Yard Waste", icon: Home },
    { id: "hot-tub", label: "Hot Tub/Spa", icon: Package },
    { id: "mattress", label: "Mattress/Box Spring", icon: Home },
    { id: "other", label: "Other Items", icon: Package },
  ]

  const loadSizes = [
    { id: "single", label: "Single Item", description: "1-2 items", price: "$89-149" },
    { id: "quarter", label: "¼ Truck Load", description: "Small pickup load", price: "$179-249" },
    { id: "half", label: "½ Truck Load", description: "Half pickup load", price: "$289-389" },
    { id: "three-quarter", label: "¾ Truck Load", description: "Large pickup load", price: "$389-489" },
    { id: "full", label: "Full Truck Load", description: "Complete truck load", price: "$489-649" },
  ]

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (serviceAreas.includes(zipCode)) {
      setStep(2)
    } else {
      alert("Sorry, we don't currently service that area. Please call (812) 610-1657 for assistance.")
    }
  }

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      zipCode,
      selectedItems,
      loadSize,
      contactInfo,
    })
    alert("Thank you! We'll contact you within 15 minutes with your quote.")
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {step === 1 ? (
        <Card className="glass">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              Get Your Free Quote
            </CardTitle>
            <p className="text-sm sm:text-base text-gray-600">Enter your ZIP code to get started</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleZipSubmit} className="space-y-4">
              <div>
                <Label htmlFor="zipcode" className="text-sm font-medium text-gray-700">
                  ZIP Code
                </Label>
                <Input
                  id="zipcode"
                  type="text"
                  placeholder="Enter your ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="mt-1"
                  required
                  maxLength={5}
                  pattern="[0-9]{5}"
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3">
                Check Service Area
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              What needs to be removed?
            </CardTitle>
            <p className="text-sm sm:text-base text-gray-600">Select items and load size for accurate pricing</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Item Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Items to Remove</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {itemCategories.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemToggle(item.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          selectedItems.includes(item.id)
                            ? "border-red-600 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-red-300"
                        }`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
                        <div className="text-xs font-medium">{item.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Load Size Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Estimated Load Size</Label>
                <div className="space-y-2">
                  {loadSizes.map((size) => (
                    <label
                      key={size.id}
                      className={`flex items-center justify-between p-2 sm:p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        loadSize === size.id ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="loadSize"
                          value={size.id}
                          checked={loadSize === size.id}
                          onChange={(e) => setLoadSize(e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{size.label}</div>
                          <div className="text-sm text-gray-600">{size.description}</div>
                        </div>
                      </div>
                      <div className="text-red-600 font-bold">{size.price}</div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Includes labor, hauling, and dump fees. Final price determined on-site.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Contact Information</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Upload Photos (Optional)
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  capture="environment"
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, photos: e.target.files }))}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                <p className="text-xs text-gray-500 mt-1">Photos help us provide more accurate quotes</p>
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-3"
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
