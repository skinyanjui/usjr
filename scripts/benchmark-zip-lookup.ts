
import { performance } from 'perf_hooks';

const SUPPORTED_ZIPS = [
  '47708',
  '47710',
  '47711',
  '47712',
  '47713',
  '47714',
  '47715',
  '47720', // Evansville
  '47630', // Newburgh
  '42420', // Henderson, KY
  '47601', // Boonville
  '47670', // Princeton
  '42301', // Owensboro, KY
  '62863', // Mount Carmel, IL
  '47620', // Mount Vernon, IN
  '47631', // New Harmony, IN
];

const SUPPORTED_ZIPS_SET = new Set(SUPPORTED_ZIPS);

const ITERATIONS = 10_000_000;
const TEST_ZIPS = ['47708', '47715', '99999', '12345', '47631', '00000'];

function benchmarkArray() {
  const start = performance.now();
  let hits = 0;
  for (let i = 0; i < ITERATIONS; i++) {
    const zip = TEST_ZIPS[i % TEST_ZIPS.length];
    if (SUPPORTED_ZIPS.includes(zip)) {
      hits++;
    }
  }
  const end = performance.now();
  return end - start;
}

function benchmarkSet() {
  const start = performance.now();
  let hits = 0;
  for (let i = 0; i < ITERATIONS; i++) {
    const zip = TEST_ZIPS[i % TEST_ZIPS.length];
    if (SUPPORTED_ZIPS_SET.has(zip)) {
      hits++;
    }
  }
  const end = performance.now();
  return end - start;
}

console.log(`Running ${ITERATIONS} lookups...`);

// Warmup
benchmarkArray();
benchmarkSet();

const arrayTime = benchmarkArray();
console.log(`Array.includes(): ${arrayTime.toFixed(2)}ms`);

const setTime = benchmarkSet();
console.log(`Set.has():        ${setTime.toFixed(2)}ms`);

const improvement = ((arrayTime - setTime) / arrayTime) * 100;
console.log(`Improvement:      ${improvement.toFixed(2)}%`);
