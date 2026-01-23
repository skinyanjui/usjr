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
 * Converts a File object to a base64 string
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        const base64String = result.split(',')[1]
        resolve(base64String || '')
      } else {
        reject(new Error('Failed to read file as data URL'))
      }
    }
    reader.onerror = error => reject(error)
  })
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
    let processedAttachments: { filename: string; content: string }[] = []

    if (rawAttachments) {
      const fileArray =
        rawAttachments instanceof FileList ? Array.from(rawAttachments) : rawAttachments
      processedAttachments = await Promise.all(
        fileArray.map(async file => ({
          filename: file.name,
          content: await fileToBase64(file),
        }))
      )
    }

    const body = {
      ...otherData,
      source,
      ...(processedAttachments.length ? { attachments: processedAttachments } : {}),
    };
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

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
