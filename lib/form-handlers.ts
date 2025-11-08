import { extractErrorMessage } from './form-errors'

export interface QuoteFormData {
  name?: string
  fullName?: string
  email?: string
  emailAddress?: string
  phone?: string
  phoneNumber?: string
  address?: string
  serviceAddress?: string
  service?: string
  serviceNeeded?: string
  projectSize?: string
  details?: string
  projectDetails?: string
  message?: string
  [key: string]: string | undefined
}

export interface SubmitQuoteOptions {
  formData: QuoteFormData
  source: string
  onSuccess: () => void
  onError: (errorMessage: string) => void
  onFinally?: () => void
}

/**
 * Shared form submission handler for quote forms
 * Handles API call, error extraction, and callbacks
 */
export async function submitQuoteForm({
  formData,
  source,
  onSuccess,
  onError,
  onFinally,
}: SubmitQuoteOptions): Promise<void> {
  try {
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, source }),
    })

    const result = await res.json()

    if (!res.ok || !result.ok) {
      const errorMsg = extractErrorMessage(result, 'Failed to submit')
      throw new Error(errorMsg)
    }

    onSuccess()
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }
    const errorMessage =
      error instanceof Error ? error.message : 'Something went wrong. Please try again or call us.'
    onError(errorMessage)
  } finally {
    onFinally?.()
  }
}
