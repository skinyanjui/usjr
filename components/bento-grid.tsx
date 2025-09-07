'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Star } from 'lucide-react'
import { getServiceOptions } from '@/lib/service-options'
import Link from 'next/link'

export function BentoGrid() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    size: '',
    details: '',
  })

  return (
    <section className="px-4 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center gap-4">
          {/* Get Your Free Quote - Large Card */}
          <div className="order-1 flex w-full justify-center md:w-full lg:w-1/2">
            <Card className="flex h-full w-full max-w-2xl flex-col p-0">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 sm:text-xl">
                  Get Your Free Quote
                </CardTitle>
                <p className="text-sm text-gray-700">
                  Ready to get rid of your junk in Evansville? Contact Uncle Sam Junk Removal today
                  for a free, no-obligation quote. We'll beat any written estimate!
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 from 200+ Evansville customers</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pb-2 sm:space-y-3 sm:pb-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="text-sm"
                  />
                  <Input
                    placeholder="(812) 555-0123"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <Input
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="text-sm"
                />
                <Input
                  placeholder="Evansville, IN address"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="text-sm"
                />
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <Select
                    value={formData.service}
                    onValueChange={value => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger className="text-sm" aria-label="Service Needed">
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
                  <Select
                    value={formData.size}
                    onValueChange={value => setFormData({ ...formData, size: value })}
                  >
                    <SelectTrigger className="text-sm" aria-label="Project Size">
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
                  onChange={e => setFormData({ ...formData, details: e.target.value })}
                  className="min-h-[60px] text-sm"
                />
                <Button asChild className="w-full bg-red-700 text-sm hover:bg-red-800">
                  <Link href="/quote" prefetch>
                    Get Free Quote
                  </Link>
                </Button>
                <p className="text-xs text-gray-600">
                  By submitting this form, you agree to receive text messages and calls from Uncle
                  Sam Junk Removal.
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
