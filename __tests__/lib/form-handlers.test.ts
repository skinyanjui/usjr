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

  it('should send correct data to API as FormData', async () => {
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

    const fetchCalls = (global.fetch as jest.Mock).mock.calls
    expect(fetchCalls.length).toBe(1)

    const [url, options] = fetchCalls[0]
    expect(url).toBe('/api/quote')
    expect(options.method).toBe('POST')

    const body = options.body
    expect(body).toBeInstanceOf(FormData)

    expect(body.get('name')).toBe('Test User')
    expect(body.get('email')).toBe('test@example.com')
    expect(body.get('source')).toBe('test-form')

    if (options.headers) {
      expect(options.headers['Content-Type']).toBeUndefined()
    }
  })

  it('should handle attachments in FormData', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ ok: true }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const formData = {
      name: 'Test User',
      attachments: [file],
    }
    const source = 'test-form'

    await submitQuoteForm({
      formData,
      source,
      onSuccess: jest.fn(),
      onError: jest.fn(),
    })

    const [url, options] = (global.fetch as jest.Mock).mock.calls[0]
    const body = options.body as FormData

    expect(body.get('attachments')).toBeInstanceOf(File)
    expect((body.get('attachments') as File).name).toBe('test.txt')
  })

  it('should handle non-JSON error responses robustly', async () => {
    // Simulate a 500 error with HTML content (e.g. from Vercel/Next.js error page)
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => {
        throw new Error('Unexpected token < in JSON at position 0')
      },
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const onError = jest.fn()

    await submitQuoteForm({
      formData: { name: 'Test User' },
      source: 'test-form',
      onSuccess: jest.fn(),
      onError,
    })

    // Current implementation would catch the JSON parse error and pass it to onError.
    // We want the robust implementation to detect the 500 status and report that instead.
    expect(onError).toHaveBeenCalledWith('HTTP error! status: 500')
  })
})
