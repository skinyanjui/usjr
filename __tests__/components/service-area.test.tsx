
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ServiceArea } from '@/components/service-area'

// Mock the dynamic map component to avoid rendering issues in test
jest.mock('@/components/leaflet-map', () => {
  return function MockMap() {
    return <div data-testid="mock-map">Map</div>
  }
})

describe('ServiceArea', () => {
  it('shows default message initially', () => {
    render(<ServiceArea />)
    expect(screen.getByText('Enter your zip code to check coverage.')).toBeInTheDocument()
  })

  it('shows success message for supported zip', () => {
    render(<ServiceArea />)

    const input = screen.getByLabelText('ZIP code')
    fireEvent.change(input, { target: { value: '47708' } })

    const button = screen.getByText('Check')
    fireEvent.click(button)

    expect(screen.getByText('Yes! We serve your area. Same-day service may be available.')).toBeInTheDocument()
  })

  it('shows maybe message for unsupported zip', () => {
    render(<ServiceArea />)

    const input = screen.getByLabelText('ZIP code')
    fireEvent.change(input, { target: { value: '90210' } })

    const button = screen.getByText('Check')
    fireEvent.click(button)

    expect(screen.getByText('We likely cover your area. Text us your zip for confirmation.')).toBeInTheDocument()
  })

  it('clears result for short zip', () => {
    render(<ServiceArea />)

    // First set a valid state
    const input = screen.getByLabelText('ZIP code')
    fireEvent.change(input, { target: { value: '47708' } })
    fireEvent.click(screen.getByText('Check'))
    expect(screen.getByText('Yes! We serve your area. Same-day service may be available.')).toBeInTheDocument()

    // Now enter short zip
    fireEvent.change(input, { target: { value: '123' } })
    fireEvent.click(screen.getByText('Check'))

    expect(screen.getByText('Enter your zip code to check coverage.')).toBeInTheDocument()
  })
})
