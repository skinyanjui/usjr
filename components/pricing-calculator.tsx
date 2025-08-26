"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Truck, Container, Sparkles, Info, Phone } from "lucide-react"
import Link from "next/link"
import { settings } from "@/lib/cms-content"
import { trackQuoteClick } from "@/lib/quoteTracking"

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
        {
          const size = loadSize?.[0] ?? 25
          basePrice = size <= 25 ? 89 : size <= 50 ? 179 : size <= 75 ? 289 : 489
        }
        break
      case "dumpster-rental":
        {
          const size = loadSize?.[0] ?? 25
          basePrice = size <= 25 ? 299 : size <= 50 ? 399 : size <= 75 ? 499 : 599
        }
        break
      case "cleaning":
        {
          const size = loadSize?.[0] ?? 25
          basePrice = size <= 25 ? 99 : size <= 50 ? 149 : size <= 75 ? 199 : 299
        }
        break
    }

    // Item count adjustment
    {
      const count = itemCount?.[0] ?? 0
      if (count > 10) multiplier += 0.2
      if (count > 20) multiplier += 0.3
    }

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
          <Label htmlFor="pc-service-type" className="text-sm font-medium text-gray-700 mb-2 block">
            Service Type
          </Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="pc-service-type" aria-label="Service Type">
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
          <Label
            id="pc-project-size-label"
            htmlFor="pc-project-size"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Project Size: {loadSize[0]}%
          </Label>
          <input
            id="pc-project-size"
            aria-labelledby="pc-project-size-label"
            type="range"
            min={10}
            max={100}
            step={5}
            value={loadSize[0]}
            onChange={(e) => setLoadSize([Number(e.target.value)])}
            className="w-full accent-red-600"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
            <span>10%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <div>
          <Label id="pc-item-count-label" htmlFor="pc-item-count" className="text-sm font-medium text-gray-700 mb-2 block">
            Item Count: {itemCount[0]}
          </Label>
          <input
            id="pc-item-count"
            aria-labelledby="pc-item-count-label"
            type="range"
            min={1}
            max={40}
            step={1}
            value={itemCount[0]}
            onChange={(e) => setItemCount([Number(e.target.value)])}
            className="w-full accent-red-600"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>20</span>
            <span>40</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pc-location" className="text-sm font-medium text-gray-700 mb-2 block">
              Location
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="pc-location" aria-label="Location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="evansville">Evansville</SelectItem>
                <SelectItem value="outside-evansville">Outside Evansville</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="pc-urgency" className="text-sm font-medium text-gray-700 mb-2 block">
              Urgency
            </Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger id="pc-urgency" aria-label="Urgency">
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="same-day">Same-Day</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800 font-semibold">
            <Info className="w-4 h-4" /> Estimated Price Range
          </div>
          <div className="mt-2 text-gray-800">
            {price.min === 0 ? (
              <span>Select options to see pricing</span>
            ) : (
              <span className="font-bold text-red-700">${price.min} - ${price.max}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="bg-red-700 hover:bg-red-800 text-white">
            <a href={`tel:${settings.phoneE164}`}>
              <Phone className="w-4 h-4" /> Call {settings.phone}
            </a>
          </Button>
          <Button asChild variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white bg-transparent">
            <Link
              href="/quote"
              prefetch
              onClick={() => trackQuoteClick({ location: "pricing-calculator", label: "Get Free Quote", destination: "/quote" })}
            >
              Get Free Quote
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
