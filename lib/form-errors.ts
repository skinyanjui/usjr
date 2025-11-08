/**
 * Shared error handling utilities for form submissions
 */

interface ApiErrorResponse {
  ok?: boolean
  error?: string
  errors?: {
    fieldErrors?: Record<string, string | string[]>
  }
}

/**
 * Extracts a user-friendly error message from API response
 * @param result - The API response object
 * @param defaultMessage - Fallback error message
 * @returns A formatted error message string
 */
export function extractErrorMessage(
  result: ApiErrorResponse,
  defaultMessage = 'Failed to submit'
): string {
  if (result.error) {
    return result.error
  }

  if (result.errors) {
    const fieldErrors = result.errors.fieldErrors || {}
    const errorMessages = Object.entries(fieldErrors)
      .map(([field, messages]) => {
        const msgArray = Array.isArray(messages) ? messages : [messages]
        return `${field}: ${msgArray.join(', ')}`
      })
      .join('; ')
    return errorMessages || 'Please check your form and try again'
  }

  return defaultMessage
}
