import { render, screen } from '@testing-library/react'
import { TestimonialsSlider } from '@/components/testimonials-slider'
import { Testimonial } from '@/lib/cms-content'

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Doe',
    location: 'Test City, ST',
    service: 'Junk Removal',
    rating: 5,
    text: 'Great service!',
    date: '2023-01-01',
    verified: true,
    active: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    location: 'Other City, ST',
    service: 'Cleaning',
    rating: 4,
    text: 'Good job.',
    date: '2023-01-02',
    verified: true,
    active: true,
  },
]

describe('TestimonialsSlider', () => {
  it('renders nothing when no testimonials are provided', () => {
    const { container } = render(<TestimonialsSlider testimonials={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a testimonial when provided', () => {
    render(<TestimonialsSlider testimonials={mockTestimonials} />)
    expect(screen.getByText('"Great service!"')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Test City, ST')).toBeInTheDocument()
  })
})
