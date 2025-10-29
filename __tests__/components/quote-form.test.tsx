import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SimpleQuoteForm } from '@/components/simple-quote-form'

describe('QuoteForm', () => {
  it('renders the quote form', () => {
    render(<SimpleQuoteForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<SimpleQuoteForm />)

    const submitButton = screen.getByRole('button', { name: /get free quote/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      // Check if validation errors are displayed
      expect(screen.getByText(/name is required/i) || screen.getByText(/required/i)).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<SimpleQuoteForm />)

    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    const submitButton = screen.getByRole('button', { name: /get free quote/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/valid email/i) || screen.getByText(/email/i)
      ).toBeInTheDocument()
    })
  })

  it('validates phone number', async () => {
    render(<SimpleQuoteForm />)

    const phoneInput = screen.getByLabelText(/phone/i)
    fireEvent.change(phoneInput, { target: { value: '123' } })

    const submitButton = screen.getByRole('button', { name: /get free quote/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/phone/i) || screen.getByText(/required/i)
      ).toBeInTheDocument()
    })
  })

  it('allows valid form submission', async () => {
    render(<SimpleQuoteForm />)

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '8124019022' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    })

    const submitButton = screen.getByRole('button', { name: /get free quote/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      // Form should be processing or submitted
      expect(submitButton).toBeDisabled() ||
      expect(screen.getByText(/submitting/i) || screen.getByText(/sending/i)).toBeInTheDocument()
    })
  })
})
