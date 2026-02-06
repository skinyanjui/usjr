import { getDistance } from '@/lib/location-utils'
import { performance } from 'perf_hooks'

const ITERATIONS = 100_000_000

function runBenchmark() {
  const lat1 = 37.9716
  const lon1 = -87.5711
  const lat2 = 37.9445
  const lon2 = -87.4053

  // Warmup
  for (let i = 0; i < 1000; i++) {
    getDistance(lat1, lon1, lat2, lon2)
  }

  const start = performance.now()
  let sum = 0
  for (let i = 0; i < ITERATIONS; i++) {
    sum += getDistance(lat1 + (i % 100) * 0.001, lon1, lat2, lon2)
  }
  const end = performance.now()

  console.log(`Iterations: ${ITERATIONS}`)
  console.log(`Total time: ${(end - start).toFixed(2)}ms`)
  console.log(`Average time: ${((end - start) / ITERATIONS).toFixed(6)}ms`)
  console.log(`Checksum: ${sum}`) // To prevent DCE
}

runBenchmark()
