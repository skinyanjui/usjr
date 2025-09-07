'use client'

import { UniversalQuoteForm } from './universal-quote-form'

export function SimpleQuoteForm() {
  return (
    <UniversalQuoteForm 
      variant="detailed" 
      theme="red"
      className="mx-auto w-full max-w-2xl"
      title="Request Free Quote"
      description="Get an instant estimate for your Evansville project"
    />
  )
}
