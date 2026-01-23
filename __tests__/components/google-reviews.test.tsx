import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import { GoogleReviews } from '@/components/google-reviews'

// Setup IntersectionObserver mock
const observe = jest.fn()
const disconnect = jest.fn()

beforeEach(() => {
  window.IntersectionObserver = jest.fn((callback, options) => ({
    observe,
    disconnect,
    unobserve: jest.fn(),
    takeRecords: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
  })) as any
})

describe('GoogleReviews', () => {
  it('renders placeholder initially', () => {
    render(<GoogleReviews />)
    expect(screen.getByText('Scroll to load reviews...')).toBeInTheDocument()
    // The inner div shouldn't be rendered yet
    expect(document.querySelector('[data-elfsight-app-lazy]')).not.toBeInTheDocument()
  })

  it('injects script when visible', () => {
    // We need to trigger the callback manually
    let callback: IntersectionObserverCallback = () => {}

    window.IntersectionObserver = jest.fn((cb, opts) => {
      callback = cb
      return {
        observe,
        disconnect,
        unobserve: jest.fn(),
        takeRecords: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
      }
    }) as any

    render(<GoogleReviews />)

    // Trigger intersection
    act(() => {
       callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    })

    expect(screen.queryByText('Scroll to load reviews...')).not.toBeInTheDocument()
    expect(screen.getByText('Loading reviews...')).toBeInTheDocument()
  })
})
