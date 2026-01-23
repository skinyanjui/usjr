import { render, screen } from '@testing-library/react'
import { StarRating } from '@/components/ui/star-rating'

describe('StarRating', () => {
  it('renders correctly with default props', () => {
    render(<StarRating rating={5} />)
    const container = screen.getByRole('img', { name: /5 out of 5 stars/i })
    expect(container).toBeInTheDocument()
    // Check if 5 stars are present (implementation details might vary, but we expect 5 svgs or similar)
    // Since we use aria-hidden on stars, they might be ignored by some queries, but present in DOM.
  })

  it('renders correct label for rating', () => {
    render(<StarRating rating={3} />)
    const container = screen.getByRole('img', { name: /3 out of 5 stars/i })
    expect(container).toBeInTheDocument()
  })

  it('applies custom classes', () => {
    render(<StarRating rating={5} className="custom-class" />)
    const container = screen.getByRole('img')
    expect(container).toHaveClass('custom-class')
  })
})
