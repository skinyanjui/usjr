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
  attachments?: File[] | FileList | null
  [key: string]: any
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
    const { attachments: rawAttachments, ...otherData } = formData

    const body = new FormData()

    // Append simple fields
    Object.entries(otherData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        body.append(key, String(value))
      }
    })
    body.append('source', source)

    // Append attachments
    if (rawAttachments) {
      const fileArray =
        rawAttachments instanceof FileList ? Array.from(rawAttachments) : rawAttachments

      fileArray.forEach(file => {
        body.append('attachments', file)
      })
    }

    const res = await fetch('/api/quote', {
      method: 'POST',
      // Content-Type header is omitted to allow browser to set boundary
      body,
    })

    let result: any = null

    try {
      result = await res.json()
    } catch (parseError) {
      // If parsing fails, check if the response status was bad
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      // If status was OK but parsing failed (e.g. empty body), throw the parse error
      throw parseError
    }

    if (!res.ok || (result && !result.ok)) {
      const errorMsg = extractErrorMessage(result, `HTTP error! status: ${res.status}`)
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
