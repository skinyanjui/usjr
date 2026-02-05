import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { RotatingLocation } from '@/components/rotating-location'

// Mock findClosestCityIndex if needed, but using real one is fine for integration test.
// Let's use real one to ensure end-to-end logic works.

const locations = ['Evansville, IN', 'Newburgh, IN', 'Henderson, KY']

describe('RotatingLocation', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    global.fetch = jest.fn()
    sessionStorage.clear()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('renders initial location correctly', () => {
    render(<RotatingLocation locations={locations} initialIndex={0} />)
    expect(screen.getByText('Evansville, IN')).toBeInTheDocument()
  })

  it('rotates locations over time', () => {
    render(<RotatingLocation locations={locations} initialIndex={0} interval={1000} />)

    expect(screen.getByText('Evansville, IN')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Newburgh, IN')).toBeInTheDocument()

    act(() => {
        jest.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Henderson, KY')).toBeInTheDocument()
  })

  it('fetches location from API if initialIndex is 0 and not cached', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ latitude: 37.9445, longitude: -87.4053 }), // Newburgh coords
    })

    render(<RotatingLocation locations={locations} initialIndex={0} />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/geo')
    })

    // Should update to Newburgh (Index 1)
    await waitFor(() => {
        expect(screen.getByText('Newburgh, IN')).toBeInTheDocument()
    })

    // Should cache in sessionStorage
    expect(sessionStorage.getItem('user_location_index')).toBe('1')
  })

  it('uses cached location if available', async () => {
    sessionStorage.setItem('user_location_index', '2') // Henderson

    render(<RotatingLocation locations={locations} initialIndex={0} />)

    await waitFor(() => {
        expect(screen.getByText('Henderson, KY')).toBeInTheDocument()
    })

    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('does not fetch if initialIndex is not 0', async () => {
    render(<RotatingLocation locations={locations} initialIndex={1} />)

    expect(screen.getByText('Newburgh, IN')).toBeInTheDocument()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('handles fetch error gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'))

    render(<RotatingLocation locations={locations} initialIndex={0} />)

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled()
    })

    // Should stay on initial location
    expect(screen.getByText('Evansville, IN')).toBeInTheDocument()
    expect(console.error).toHaveBeenCalled()
  })
})
