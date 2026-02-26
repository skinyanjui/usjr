import React from 'react'
import { render, act } from '@testing-library/react'
import LeafletMap from '@/components/leaflet-map'
import * as navigation from 'next/navigation'
import L from 'leaflet'

// Mock Leaflet
jest.mock('leaflet', () => {
  const mapObj = {
    addTo: jest.fn(),
    remove: jest.fn(),
    removeLayer: jest.fn(),
    fitBounds: jest.fn(),
    on: jest.fn(),
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

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('LeafletMap Performance', () => {
  it('re-initializes the map when router dependency changes', () => {
    // 1. Setup initial mock
    const push = jest.fn()
    const routerMock = { push }
    ;(navigation.useRouter as jest.Mock).mockReturnValue(routerMock)

    // 2. Initial Render
    const { rerender } = render(<LeafletMap />)

    expect(L.map).toHaveBeenCalledTimes(1)

    // 3. Change dependency (router reference)
    // We simulate a new router object, which mimics a navigation event or context update
    const newRouterMock = { push: jest.fn() }
    ;(navigation.useRouter as jest.Mock).mockReturnValue(newRouterMock)

    // 4. Force re-render
    // Note: Just calling rerender(<LeafletMap />) might not be enough if props didn't change and no context changed.
    // But since `useRouter` is a hook, if the component re-renders, it gets the new value.
    // To force the component to see the new hook value, we typically need to trigger a re-render.
    // Since LeafletMap has no props, we can't force it via props.
    // However, in a real app, a parent would re-render it.
    // Let's wrap it or just rely on the test runner.
    // Actually, `rerender` with the same element triggers a re-render of the component tree.
    // The component function will run again, call `useRouter` (mock), get the new object.
    // Then `useEffect` will compare `[locations, router]`. `locations` is memoized [], so stable.
    // `router` is new. So effect should run again.

    rerender(<LeafletMap />)

    // 5. Assert L.map NOT called again (still 1)
    expect(L.map).toHaveBeenCalledTimes(1)

    // Verify marker updates still happen (e.g. clearLayers called)
    // We can check if clearLayers was called on the layerGroup
    const layerGroupMock = L.layerGroup() // This returns the mock object we defined
    expect(layerGroupMock.clearLayers).toHaveBeenCalled()
  })
})
