import React from 'react'
import { render, screen } from '@testing-library/react'
import LeafletMap from '../../components/leaflet-map'
import '@testing-library/jest-dom'

// Mock Leaflet
jest.mock('leaflet', () => {
  return {
    map: jest.fn(() => ({
      fitBounds: jest.fn(),
      remove: jest.fn(),
      removeLayer: jest.fn(),
    })),
    tileLayer: jest.fn(() => ({
      addTo: jest.fn(function() { return this }),
      remove: jest.fn(),
    })),
    layerGroup: jest.fn(() => ({
      addTo: jest.fn(function() { return this }),
      clearLayers: jest.fn(),
    })),
    circleMarker: jest.fn(() => {
      const element = document.createElement('div') // Mocking the SVG path as a div for simplicity in JSDOM
      element.classList.add('leaflet-marker-icon')
      return {
        addTo: jest.fn(function() { return this }),
        bindTooltip: jest.fn(),
        on: jest.fn(), // Leaflet event listener
        getElement: jest.fn(() => element),
        openTooltip: jest.fn(),
        closeTooltip: jest.fn(),
      }
    }),
    latLngBounds: jest.fn(() => ({})),
  }
})

describe('LeafletMap Accessibility', () => {
  it('renders the map container with correct aria attributes', () => {
    render(<LeafletMap />)
    const mapContainer = screen.getByLabelText(/Interactive map of service areas/i)
    expect(mapContainer).toBeInTheDocument()
    expect(mapContainer).toHaveAttribute('role', 'application')
  })

  it('adds keyboard accessibility attributes to markers', () => {
    // We need to access the mocked implementation of circleMarker to get the elements it returned
    const L = require('leaflet')
    render(<LeafletMap />)

    // Wait for useEffect to run (render is synchronous but useEffect runs after)
    // The component logic runs immediately in useEffect.

    // Check if circleMarker was called
    expect(L.circleMarker).toHaveBeenCalled()

    // Get the results of the mock calls
    const markerMockResults = L.circleMarker.mock.results
    expect(markerMockResults.length).toBeGreaterThan(0)

    markerMockResults.forEach((result: any) => {
      const markerInstance = result.value
      const element = markerInstance.getElement()

      expect(element).toHaveAttribute('tabIndex', '0')
      expect(element).toHaveAttribute('role', 'button')
      // Check for a non-empty aria-label that starts with "View details for"
      expect(element.getAttribute('aria-label')).toMatch(/^View details for/)
    })
  })

  it('handles Enter key on markers', () => {
     const L = require('leaflet')
     // Mock window.location.href
     Object.defineProperty(window, 'location', {
       writable: true,
       value: { href: '' }
     })

     render(<LeafletMap />)

     const markerMockResults = L.circleMarker.mock.results
     const markerInstance = markerMockResults[0].value
     const element = markerInstance.getElement()

     // Trigger Enter key
     const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
     element.dispatchEvent(enterEvent)

     expect(window.location.href).not.toBe('')
  })
})
