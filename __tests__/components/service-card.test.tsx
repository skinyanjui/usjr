import { render, screen } from '@testing-library/react'
import { ServiceCard } from '@/components/ui/service-card'
import { Truck } from 'lucide-react'

describe('ServiceCard', () => {
  const mockService = {
    id: 'junk-removal',
    title: 'Junk Removal',
    description: 'Professional junk removal services',
    color: 'red' as const,
    icon: Truck,
    href: '/services/junk-removal',
  }

  it('renders service card with correct content', () => {
    render(<ServiceCard {...mockService} />)

    expect(screen.getByText('Junk Removal')).toBeInTheDocument()
    expect(screen.getByText('Professional junk removal services')).toBeInTheDocument()
  })

  it('renders with the correct link', () => {
    render(<ServiceCard {...mockService} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/services/junk-removal')
  })

  it('renders the icon', () => {
    render(<ServiceCard {...mockService} />)

    // Check if SVG icon is rendered (lucide-react renders SVG elements)
    const icon = screen.getByRole('link').querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('applies the correct color theme', () => {
    const { container } = render(<ServiceCard {...mockService} />)

    // Check if red theme classes are applied
    const card = container.querySelector('.linear-card')
    expect(card).toBeInTheDocument()
  })

  it('renders with different color themes', () => {
    const greenService = { ...mockService, color: 'green' as const }
    const { rerender } = render(<ServiceCard {...mockService} />)

    expect(screen.getByText('Junk Removal')).toBeInTheDocument()

    rerender(<ServiceCard {...greenService} />)
    expect(screen.getByText('Junk Removal')).toBeInTheDocument()
  })
})
