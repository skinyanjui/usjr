import { render, screen, act } from '@testing-library/react'
import { useLazyLoad } from '@/lib/hooks/useLazyLoad'

describe('useLazyLoad', () => {
  let observeMock: jest.Mock
  let disconnectMock: jest.Mock
  let callback: IntersectionObserverCallback

  beforeEach(() => {
    observeMock = jest.fn()
    disconnectMock = jest.fn()

    window.IntersectionObserver = jest.fn((cb, options) => {
      callback = cb
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        takeRecords: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const TestComponent = ({ options }: { options?: any }) => {
    const { ref, shouldLoad } = useLazyLoad(options)
    return (
      <div ref={ref} data-testid="target">
        {shouldLoad ? 'Loaded' : 'Not Loaded'}
      </div>
    )
  }

  it('should start not loaded', () => {
    render(<TestComponent />)
    expect(screen.getByTestId('target')).toHaveTextContent('Not Loaded')
    expect(observeMock).toHaveBeenCalled()
  })

  it('should set shouldLoad to true when intersected', () => {
    render(<TestComponent />)

    act(() => {
      const entry = { isIntersecting: true } as IntersectionObserverEntry
      callback([entry], {} as IntersectionObserver)
    })

    expect(screen.getByTestId('target')).toHaveTextContent('Loaded')
    expect(disconnectMock).toHaveBeenCalled()
  })

  it('should not set shouldLoad to true when not intersected', () => {
    render(<TestComponent />)

    act(() => {
      const entry = { isIntersecting: false } as IntersectionObserverEntry
      callback([entry], {} as IntersectionObserver)
    })

    expect(screen.getByTestId('target')).toHaveTextContent('Not Loaded')
    expect(disconnectMock).not.toHaveBeenCalled()
  })

  it('should accept options', () => {
    const options = { rootMargin: '200px' }
    render(<TestComponent options={options} />)

    expect(window.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options)
  })
})
