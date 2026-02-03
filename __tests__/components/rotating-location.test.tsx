import { render, waitFor, act } from '@testing-library/react'
import { RotatingLocation } from '@/components/rotating-location'

// Mock locations
const locations = ['Evansville, IN', 'Newburgh, IN']

describe('RotatingLocation', () => {
  beforeEach(() => {
    // Reset mocks
    jest.restoreAllMocks()
  })

  it('does NOT call client-side fetch', async () => {
    // Mock fetch
    const fetchMock = jest.fn()
    global.fetch = fetchMock

    render(<RotatingLocation locations={locations} />)

    // Ensure fetch is not called
    await waitFor(() => {
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })

  it('accepts initialIndex prop', () => {
    const { getByText } = render(<RotatingLocation locations={locations} initialIndex={1} />)
    expect(getByText('Newburgh, IN')).toBeInTheDocument()
  })

  it('rotates locations', async () => {
    jest.useFakeTimers()
    const { getByText } = render(<RotatingLocation locations={locations} interval={100} />)

    expect(getByText('Evansville, IN')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(100)
    })

    await waitFor(() => {
      expect(getByText('Newburgh, IN')).toBeInTheDocument()
    })

    jest.useRealTimers()
  })
})
