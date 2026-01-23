import { render, screen } from '@testing-library/react'
import { ReviewsRow } from '@/components/reviews-row'
import { Testimonial } from '@/lib/cms-content'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const mockReviews: Testimonial[] = [
  {
    id: '1',
    name: 'Alice',
    location: 'City A',
    service: 'Service A',
    rating: 5,
    text: 'Review 1',
    date: '2023-01-01',
    verified: true,
    active: true,
  },
  {
    id: '2',
    name: 'Bob',
    location: 'City B',
    service: 'Service B',
    rating: 5,
    text: 'Review 2',
    date: '2023-01-02',
    verified: true,
    active: true,
  },
]

describe('ReviewsRow', () => {
  it('renders reviews correctly', () => {
    render(<ReviewsRow reviews={mockReviews} />)
    expect(screen.getByText('"Review 1"')).toBeInTheDocument()
    expect(screen.getByText('— Alice • City A')).toBeInTheDocument()
    expect(screen.getByText('"Review 2"')).toBeInTheDocument()
  })
})
