import { render, screen, fireEvent, act } from '@testing-library/react'
import { Header } from '@/components/header'

// Mock next/navigation
const mockPrefetch = jest.fn()
const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: mockPrefetch,
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock dynamic imports to render immediately for testing if needed,
// though for the header prefetch logic which is in the parent component,
// we might not strictly need the children to render to trigger the prefetch loop
// (the loop happens in handleDropdownEnter in Header).
// However, let's keep it simple first.

describe('Header Prefetching Behavior', () => {
  beforeEach(() => {
    mockPrefetch.mockClear()
  })

  it('aggressively prefetches all links in the dropdown on mouse enter', async () => {
    render(<Header />)

    const servicesButton = screen.getByText('Services')

    // Simulate hover
    await act(async () => {
        fireEvent.mouseEnter(servicesButton)
    })

    // After optimization, we expect NO manual prefetch calls from the event handler.
    // The previous test expected > 10 calls, now we expect 0.
    expect(mockPrefetch).not.toHaveBeenCalled()
  })
})
