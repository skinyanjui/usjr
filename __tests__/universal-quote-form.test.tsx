import { render, screen, fireEvent } from '@testing-library/react'
import { UniversalQuoteForm } from '../components/universal-quote-form'

// Mock the fetch function
global.fetch = jest.fn()

describe('UniversalQuoteForm', () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it('renders simple variant correctly', () => {
    render(<UniversalQuoteForm variant="simple" />)
    
    expect(screen.getByText('Request Free Quote - Evansville')).toBeInTheDocument()
    expect(screen.getByLabelText('Full Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number *')).toBeInTheDocument()
    expect(screen.getByText('Get Free Quote')).toBeInTheDocument()
  })

  it('renders detailed variant with email and address fields', () => {
    render(<UniversalQuoteForm variant="detailed" />)
    
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument()
    expect(screen.getByLabelText('Service Address')).toBeInTheDocument()
  })

  it('shows photo upload when showPhotos is true', () => {
    render(<UniversalQuoteForm variant="contact" showPhotos={true} />)
    
    expect(screen.getByText('Photos (Optional)')).toBeInTheDocument()
    expect(screen.getByText('Upload Photos (0/6)')).toBeInTheDocument()
  })

  it('submits form with correct data format', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    })

    render(<UniversalQuoteForm variant="simple" />)
    
    fireEvent.change(screen.getByLabelText('Full Name *'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText('Phone Number *'), {
      target: { value: '(812) 555-0123' },
    })
    
    fireEvent.click(screen.getByText('Get Free Quote'))
    
    expect(fetch).toHaveBeenCalledWith('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        phone: '(812) 555-0123',
        email: '',
        address: '',
        service: '',
        projectSize: '',
        details: '',
        source: 'universal-quote-form-simple',
        location: 'Evansville',
        hasPhotos: false,
      }),
    })
  })

  it('applies custom theme classes', () => {
    render(<UniversalQuoteForm theme="blue" />)
    
    const submitButton = screen.getByText('Get Free Quote')
    expect(submitButton).toHaveClass('bg-blue-700', 'hover:bg-blue-800')
  })
})