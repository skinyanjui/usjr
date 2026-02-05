import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LeafletMap from '@/components/leaflet-map'
import { useRouter } from 'next/navigation'
import L from 'leaflet'

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Define mock implementation objects
const mockMap = {
  remove: jest.fn(),
  removeLayer: jest.fn(),
  fitBounds: jest.fn(),
  addLayer: jest.fn(),
  on: jest.fn(),
}
const mockTileLayer = {
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn(),
}
const mockMarker = {
  addTo: jest.fn().mockReturnThis(),
  bindTooltip: jest.fn(),
  on: jest.fn(),
}
const mockLayerGroup = {
  addTo: jest.fn().mockReturnThis(),
  clearLayers: jest.fn(),
}

// Mock Leaflet
jest.mock('leaflet', () => {
  return {
    __esModule: true,
    default: {
      map: jest.fn(),
      tileLayer: jest.fn(),
      layerGroup: jest.fn(),
      circleMarker: jest.fn(),
      latLngBounds: jest.fn(),
    },
  }
})

describe('LeafletMap', () => {
  beforeEach(() => {
    // Setup return values for the mocked functions
    (L.map as jest.Mock).mockReturnValue(mockMap);
    (L.tileLayer as jest.Mock).mockReturnValue(mockTileLayer);
    (L.layerGroup as jest.Mock).mockReturnValue(mockLayerGroup);
    (L.circleMarker as jest.Mock).mockReturnValue(mockMarker);
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('navigates using router.push on marker click', () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push })

    render(<LeafletMap />)

    // Verify map initialization
    expect(L.map).toHaveBeenCalled()

    // Find the click handler
    const clickCalls = (mockMarker.on as jest.Mock).mock.calls.filter(call => call[0] === 'click')

    expect(clickCalls.length).toBeGreaterThan(0)

    // Simulate click on the first marker
    const clickHandler = clickCalls[0][1]
    clickHandler()

    // Verify router.push is called
    expect(push).toHaveBeenCalled()
    // Verify it is called with a location path
    expect(push).toHaveBeenCalledWith(expect.stringContaining('/locations/'))
  })
})
