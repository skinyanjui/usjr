import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Header } from '@/components/header'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock dynamic imports to avoid complexity with nested components
jest.mock('next/dynamic', () => () => {
  return function MockDynamicComponent() {
    return <div data-testid="mock-dropdown">Mock Dropdown</div>
  }
})

describe('Header Prefetching', () => {
  it('does not prefetch aggressively on hover but still opens menu', async () => {
    const prefetch = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      prefetch,
    })

    render(<Header />)

    // Find the Services button
    const servicesBtn = screen.getByRole('button', { name: /services/i })

    // Hover over the Services button
    fireEvent.mouseEnter(servicesBtn)

    // Wait for the dropdown to appear (verifying functionality)
    await waitFor(() => {
        expect(screen.getByTestId('mock-dropdown')).toBeInTheDocument()
    })

    // Assert that prefetch was NOT called
    expect(prefetch).toHaveBeenCalledTimes(0)
  })
})
