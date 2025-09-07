'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { UniversalQuoteForm } from './universal-quote-form'

export function BentoGrid() {

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
                <UniversalQuoteForm 
                  variant="embedded"
                  theme="red"
                  className="p-0"
                />
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
