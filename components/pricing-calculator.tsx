"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calculator, Truck, Container, Sparkles, Info } from "lucide-react"
import Link from "next/link"

export function PricingCalculator() {
  const [service, setService] = useState("")
  const [loadSize, setLoadSize] = useState([25])
  const [itemCount, setItemCount] = useState([5])
  const [location, setLocation] = useState("")
  const [urgency, setUrgency] = useState("")

  const calculatePrice = () => {
    if (!service) return { min: 0, max: 0 }

    let basePrice = 0
    let multiplier = 1

    // Base pricing by service
    switch (service) {
      case "junk-removal":
        basePrice = loadSize[0] <= 25 ? 89 : loadSize[0] <= 50 ? 179 : loadSize[0] <= 75 ? 289 : 489
        break
      case "dumpster-rental":
        basePrice = loadSize[0] <= 25 ? 299 : loadSize[0] <= 50 ? 399 : loadSize[0] <= 75 ? 499 : 599
        break
      case "cleaning":
        basePrice = loadSize[0] <= 25 ? 99 : loadSize[0] <= 50 ? 149 : loadSize[0] <= 75 ? 199 : 299
        break
    }

    // Item count adjustment
    if (itemCount[0] > 10) multiplier += 0.2
    if (itemCount[0] > 20) multiplier += 0.3

    // Location adjustment
    if (location === "outside-evansville") multiplier += 0.15

    // Urgency adjustment
    if (urgency === "same-day") multiplier += 0.25
    if (urgency === "emergency") multiplier += 0.5

    const finalPrice = basePrice * multiplier
    return {
      min: Math.round(finalPrice * 0.9),
      max: Math.round(finalPrice * 1.1),
    }
  }

  const price = calculatePrice()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          Pricing Calculator
        </CardTitle>
        <p className="text-gray-600 text-sm sm:text-base">Get an instant estimate for your project</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Service Type</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junk-removal">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Junk Removal
                </div>
              </SelectItem>
              <SelectItem value="dumpster-rental">
                <div className="flex items-center gap-2">
                  <Container className="w-4 h-4" />
                  Dumpster Rental
                </div>
              </SelectItem>
              <SelectItem value="cleaning">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Cleaning Service
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Project Size: {loadSize[0]}%</Label>
          <Slider value={loadSize} onValueChange={setLoadSize} max={100} min={10} step={5} className="w-full" />
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
            <span>Full Load</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Number of Items: {itemCount[0]}</Label>
          <Slider value={itemCount} onValueChange={setItemCount} max={50} min={1} step={1} className="w-full" />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="evansville">Evansville, IN</SelectItem>
              <SelectItem value="newburgh">Newburgh, IN</SelectItem>
              <SelectItem value="henderson">Henderson, KY</SelectItem>
              <SelectItem value="outside-evansville">Outside Primary Area (+15%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Service Timeline</Label>
          <Select value={urgency} onValueChange={setUrgency}>
            <SelectTrigger>
              <SelectValue placeholder="When do you need service?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flexible">Flexible (Standard Rate)</SelectItem>
              <SelectItem value="within-week">Within a Week</SelectItem>
              <SelectItem value="same-day">Same Day (+25%)</SelectItem>
              <SelectItem value="emergency">Emergency (+50%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {service && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Estimated Price Range</h3>
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
                ${price.min} - ${price.max}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 mb-4">
                <Info className="w-4 h-4" />
                <span>Final price determined on-site after inspection</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                  <Link href="/quote">Get Exact Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href="tel:+18126101657">Call for Confirmation</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-[11px] sm:text-xs text-gray-500 text-center space-y-1">
          <p>
            * Estimates are approximate and may vary based on actual items, accessibility, and disposal requirements.
          </p>
          <p>* All prices include labor, hauling, and eco-friendly disposal fees.</p>
        </div>
      </CardContent>
    </Card>
  )
}
