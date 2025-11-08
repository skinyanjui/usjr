import { submitQuoteForm } from '@/lib/form-handlers'

// Mock fetch
global.fetch = jest.fn()

describe('submitQuoteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Suppress console.error in tests
    jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call onSuccess when submission succeeds', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ ok: true }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const onSuccess = jest.fn()
    const onError = jest.fn()

    await submitQuoteForm({
      formData: { name: 'Test User', email: 'test@example.com' },
      source: 'test-form',
      onSuccess,
      onError,
    })

    expect(onSuccess).toHaveBeenCalled()
    expect(onError).not.toHaveBeenCalled()
  })

  it('should call onError when submission fails', async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({ ok: false, error: 'Validation failed' }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const onSuccess = jest.fn()
    const onError = jest.fn()

    await submitQuoteForm({
      formData: { name: 'Test User' },
      source: 'test-form',
      onSuccess,
      onError,
    })

    expect(onSuccess).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledWith('Validation failed')
  })

  it('should call onFinally regardless of success or failure', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ ok: true }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const onFinally = jest.fn()

    await submitQuoteForm({
      formData: { name: 'Test User' },
      source: 'test-form',
      onSuccess: jest.fn(),
      onError: jest.fn(),
      onFinally,
    })

    expect(onFinally).toHaveBeenCalled()
  })

  it('should handle network errors', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

    const onError = jest.fn()

    await submitQuoteForm({
      formData: { name: 'Test User' },
      source: 'test-form',
      onSuccess: jest.fn(),
      onError,
    })

    expect(onError).toHaveBeenCalledWith('Network error')
  })

  it('should send correct data to API', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ ok: true }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const formData = { name: 'Test User', email: 'test@example.com' }
    const source = 'test-form'

    await submitQuoteForm({
      formData,
      source,
      onSuccess: jest.fn(),
      onError: jest.fn(),
    })

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/quote',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      })
    )
  })
})
