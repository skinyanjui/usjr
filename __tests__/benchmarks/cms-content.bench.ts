/**
 * @jest-environment node
 */
import {
  getActiveLocations,
  getActiveTestimonials,
  getActiveServices,
  getActiveFAQs,
  getAggregateTestimonialStats,
  getActiveGalleryImages
} from '@/lib/cms-content'

describe('CMS Content Performance Benchmark', () => {
  const ITERATIONS = 1000000

  it('measures getActiveLocations performance', () => {
    const start = performance.now()
    for (let i = 0; i < ITERATIONS; i++) {
      getActiveLocations()
    }
    const end = performance.now()
    console.log(`getActiveLocations (${ITERATIONS} calls): ${(end - start).toFixed(2)}ms`)
  })

  it('measures getActiveTestimonials performance', () => {
    const start = performance.now()
    for (let i = 0; i < ITERATIONS; i++) {
      getActiveTestimonials()
    }
    const end = performance.now()
    console.log(`getActiveTestimonials (${ITERATIONS} calls): ${(end - start).toFixed(2)}ms`)
  })

  it('measures getActiveServices performance', () => {
    const start = performance.now()
    for (let i = 0; i < ITERATIONS; i++) {
      getActiveServices()
    }
    const end = performance.now()
    console.log(`getActiveServices (${ITERATIONS} calls): ${(end - start).toFixed(2)}ms`)
  })

  it('measures getActiveFAQs performance', () => {
    const start = performance.now()
    for (let i = 0; i < ITERATIONS; i++) {
      getActiveFAQs()
    }
    const end = performance.now()
    console.log(`getActiveFAQs (${ITERATIONS} calls): ${(end - start).toFixed(2)}ms`)
  })

  it('measures getAggregateTestimonialStats performance', () => {
    const start = performance.now()
    for (let i = 0; i < ITERATIONS; i++) {
      getAggregateTestimonialStats()
    }
    const end = performance.now()
    console.log(`getAggregateTestimonialStats (${ITERATIONS} calls): ${(end - start).toFixed(2)}ms`)
  })

  it('measures getActiveGalleryImages performance', () => {
    const start = performance.now()
    for (let i = 0; i < ITERATIONS; i++) {
      getActiveGalleryImages()
    }
    const end = performance.now()
    console.log(`getActiveGalleryImages (${ITERATIONS} calls): ${(end - start).toFixed(2)}ms`)
  })
})
