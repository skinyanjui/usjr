import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/header'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}))

// Mock settings to avoid import errors if any
jest.mock('@/lib/cms-content', () => ({
  settings: {
    phone: '555-555-5555',
    phoneE164: '+15555555555',
  },
}))

// Mock quoteTracking
jest.mock('@/lib/quoteTracking', () => ({
  trackQuoteClick: jest.fn(),
}))

describe('Header Prefetching', () => {
  it('avoids aggressive prefetching on hover (optimized)', () => {
    const prefetch = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      prefetch: prefetch,
    })

    render(<Header />)

    const servicesButton = screen.getByText('Services')
    fireEvent.mouseEnter(servicesButton)

    // Optimized expectation: 0 calls
    console.log(`Prefetch called ${prefetch.mock.calls.length} times`)
    expect(prefetch).not.toHaveBeenCalled()
  })
})
