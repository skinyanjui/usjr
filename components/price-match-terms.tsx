'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { settings } from '@/lib/cms-content'

interface PriceMatchTermsProps {
  trigger?: ReactNode
  className?: string
}

export function PriceMatchTerms({ trigger, className }: PriceMatchTermsProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className={className ?? 'text-blue-900 underline underline-offset-2'}
          >
            Price Match Terms
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-800" /> Price Match Guarantee Terms
          </DialogTitle>
          <DialogDescription>
            We stand behind transparent, competitive pricing. If you find a lower written quote for
            the same service, we’ll match it.
          </DialogDescription>
        </DialogHeader>
        <div className="text-muted-foreground space-y-4 text-sm">
          <div>
            <h3 className="text-foreground mb-1 font-semibold">What qualifies</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Written quote from a local competitor within our service area</li>
              <li>Same scope of work, materials, and disposal requirements</li>
              <li>Comparable scheduling (same-day/next-day) when requested</li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground mb-1 font-semibold">What doesn’t qualify</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Verbal estimates or non-itemized texts</li>
              <li>One-time promotions, coupons, or bundled offers</li>
              <li>Out-of-area or uninsured providers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground mb-1 font-semibold">How to submit</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Text a photo or PDF of the competitor’s quote to {settings.phone}</li>
              <li>Include your address and preferred service date</li>
              <li>We’ll verify and reply with a matched quote—often within minutes</li>
            </ul>
          </div>
          <p className="text-muted-foreground text-xs">
            Note: We may request photos to confirm the exact scope and ensure apples-to-apples
            pricing.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
