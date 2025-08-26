"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"
import Link from "next/link"

export function BentoGrid() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    size: "",
    details: "",
  })

  return (
    <section className="py-8 sm:py-10 lg:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Get Your Free Quote - Large Card */}
          <div className="w-full md:w-full lg:w-1/2 order-1 flex justify-center">
          <Card className="flex flex-col h-full p-0 w-full max-w-2xl">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Get Your Free Quote</CardTitle>
              <p className="text-gray-600 text-sm">
                Ready to get rid of your junk in Evansville? Contact Uncle Sam Junk Removal today for a free,
                no-obligation quote. We'll beat any written estimate!
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 from 200+ Evansville customers</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pb-2 sm:pb-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="text-sm"
                />
                <Input
                  placeholder="(812) 555-0123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="text-sm"
                />
              </div>
              <Input
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-sm"
              />
              <Input
                placeholder="Evansville, IN address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="text-sm"
              />
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junk-removal">Junk Removal</SelectItem>
                    <SelectItem value="dumpster-rental">Dumpster Rental</SelectItem>
                    <SelectItem value="both">Both Services</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Tell us about your project in Evansville..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="text-sm min-h-[60px]"
              />
              <Button asChild className="w-full bg-red-700 hover:bg-red-800 text-sm">
                <Link href="/quote">Get Free Quote - Same Day Service Available</Link>
              </Button>
              <p className="text-xs text-gray-500">
                By submitting this form, you agree to receive text messages and calls from Uncle Sam Junk Removal.
              </p>
            </CardContent>
          </Card>
          </div>

          {/* Removed: Contact Info card */}

          {/* Removed: Same Day Service and Why Evansville cards */}
        </div>
      </div>
    </section>
  )
}
