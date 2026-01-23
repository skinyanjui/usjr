import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuoteFormStandalone } from '@/components/quote-form-standalone'
import { submitQuoteForm } from '@/lib/form-handlers'

// Mock the form submission handler
jest.mock('@/lib/form-handlers', () => ({
  submitQuoteForm: jest.fn(),
}))

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Upload: () => <div data-testid="icon-upload" />,
  Camera: () => <div data-testid="icon-camera" />,
  X: () => <div data-testid="icon-x" />,
  CheckCircle: () => <div data-testid="icon-check-circle" />,
  Leaf: () => <div data-testid="icon-leaf" />,
  Shield: () => <div data-testid="icon-shield" />,
  Clock: () => <div data-testid="icon-clock" />,
  CheckIcon: () => <div data-testid="icon-check" />,
  ChevronDownIcon: () => <div data-testid="icon-chevron-down" />,
  ChevronUpIcon: () => <div data-testid="icon-chevron-up" />,
}))

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('QuoteFormStandalone', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form correctly', () => {
    render(<QuoteFormStandalone />)
    expect(screen.getByText('Request Quote')).toBeInTheDocument()
  })

  it('handles file uploads correctly', async () => {
    const user = userEvent.setup()
    const { container } = render(<QuoteFormStandalone />)

    const fileInput = screen.getByLabelText('Upload', { selector: 'input[type="file"]' })
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' })

    await user.upload(fileInput, file)

    await waitFor(() => {
        // Look for the wrapper div of the uploaded file
        // className="relative aspect-square rounded-md border bg-muted/30 p-1"
        const uploadedItems = container.getElementsByClassName('bg-muted/30')
        expect(uploadedItems.length).toBeGreaterThan(0)
    })
  })
})
