'use client'

import { UniversalQuoteForm } from './universal-quote-form'

export function EvansvilleQuoteForm() {
  return (
    <UniversalQuoteForm 
      variant="detailed" 
      location="Evansville"
      theme="red"
      title="Request Free Quote"
      description="Get an instant estimate for your Evansville project"
    />
  )
}