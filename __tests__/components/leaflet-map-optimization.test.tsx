import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LeafletMap from '@/components/leaflet-map'
import { useRouter } from 'next/navigation'

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock Leaflet
jest.mock('leaflet', () => {
  const mapObj = {
    addTo: jest.fn(),
    remove: jest.fn(),
    removeLayer: jest.fn(),
    fitBounds: jest.fn(),
  }

  const layerMock = {
    addTo: jest.fn(function () {
      return this
    }),
    bindTooltip: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  }

  const layerGroupMock = {
    addTo: jest.fn(function () {
      return this
    }),
    clearLayers: jest.fn(),
    remove: jest.fn(),
  }

  const tileLayerMock = {
    addTo: jest.fn(function () {
      return this
    }),
    remove: jest.fn(),
  }

  return {
    map: jest.fn(() => mapObj),
    tileLayer: jest.fn(() => tileLayerMock),
    layerGroup: jest.fn(() => layerGroupMock),
    circleMarker: jest.fn(() => layerMock),
    latLngBounds: jest.fn(),
  }
})

describe('LeafletMap CSS Injection', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    })
  })

  it('does NOT inject external CSS link tag after optimization', () => {
    render(<LeafletMap />)

    // Check immediately and also maybe after a tick, but immediate check is usually fine
    // since the effect that added it is gone.
    const link = document.querySelector('link[data-leaflet-css="true"]')
    expect(link).not.toBeInTheDocument()
  })
})
