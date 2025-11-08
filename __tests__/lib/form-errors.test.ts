import { extractErrorMessage } from '@/lib/form-errors'

describe('extractErrorMessage', () => {
  it('should extract simple error message', () => {
    const result = {
      error: 'Invalid email address',
    }
    expect(extractErrorMessage(result)).toBe('Invalid email address')
  })

  it('should extract field errors from validation object', () => {
    const result = {
      errors: {
        fieldErrors: {
          email: 'Invalid email',
          phone: ['Phone is required', 'Phone must be 10 digits'],
        },
      },
    }
    const message = extractErrorMessage(result)
    expect(message).toContain('email: Invalid email')
    expect(message).toContain('phone: Phone is required, Phone must be 10 digits')
  })

  it('should return default message when no error is present', () => {
    const result = { ok: false }
    expect(extractErrorMessage(result)).toBe('Failed to submit')
  })

  it('should return custom default message', () => {
    const result = { ok: false }
    expect(extractErrorMessage(result, 'Custom error')).toBe('Custom error')
  })

  it('should handle empty field errors', () => {
    const result = {
      errors: {
        fieldErrors: {},
      },
    }
    expect(extractErrorMessage(result)).toBe('Please check your form and try again')
  })
})
