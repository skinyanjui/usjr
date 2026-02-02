import { render } from '@testing-library/react'
import { RoutePrefetcher } from '@/components/route-prefetcher'
import { useRouter, usePathname } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}))

describe('RoutePrefetcher Performance Benchmark', () => {
  const mockPrefetch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      prefetch: mockPrefetch,
    })
    ;(usePathname as jest.Mock).mockReturnValue('/')
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('counts the number of prefetched routes', () => {
    render(<RoutePrefetcher />)

    // Fast-forward time to trigger the idle callback/timeout
    jest.runAllTimers()

    console.log(`[Benchmark] Prefetched routes count: ${mockPrefetch.mock.calls.length}`)
  })
})
