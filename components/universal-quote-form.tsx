// Import the necessary components
import { SimpleQuoteForm } from './simple-quote-form'
import { EvansvilleQuoteForm } from './evansville-quote-form'
import ContactSection from './contact-section'
import { QuoteFormStandalone } from './quote-form-standalone'

interface UniversalQuoteFormProps {
  variant: 'simple' | 'detailed' | 'contact' | 'embedded'
}

export default function UniversalQuoteForm({ variant }: UniversalQuoteFormProps) {
  switch (variant) {
    case 'simple':
      return <SimpleQuoteForm />
    case 'detailed':
      return <EvansvilleQuoteForm />
    case 'contact':
      return (
        <>
          <ContactSection />
        </>
      )
    case 'embedded':
      return <QuoteFormStandalone />
    default:
      return null
  }
}
