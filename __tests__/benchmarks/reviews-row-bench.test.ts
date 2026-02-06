/**
 * @jest-environment jsdom
 */

describe('ReviewsRow Performance Benchmark', () => {
  const ITEM_COUNT = 10000;

  // Mock setup
  const createMockElement = (id: number) => ({
    getBoundingClientRect: jest.fn(() => ({
      left: id * 100,
      top: 0,
      right: id * 100 + 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: id * 100,
      y: 0,
      toJSON: () => {}
    })),
    scrollLeft: 0,
  });

  let container: any;
  let children: any[];

  beforeEach(() => {
    container = {
      ...createMockElement(-1),
      scrollLeft: 50,
      children: [],
    };
    children = Array.from({ length: ITEM_COUNT }, (_, i) => createMockElement(i));
    container.children = children;
  });

  test('Benchmark: Layout Thrashing Optimization', () => {
    // ---------------------------------------------------------
    // BASELINE: Current Implementation
    // ---------------------------------------------------------

    // Reset mocks
    jest.clearAllMocks();
    children.forEach(c => c.getBoundingClientRect.mockClear());
    container.getBoundingClientRect.mockClear();

    const startSlow = performance.now();

    const childrenArraySlow = Array.from(container.children) as any[];
    // @ts-ignore
    const resultSlow = childrenArraySlow.map(child => {
      const childRect = child.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return childRect.left - containerRect.left + container.scrollLeft;
    });

    const endSlow = performance.now();
    const timeSlow = endSlow - startSlow;
    const callsSlow = container.getBoundingClientRect.mock.calls.length;

    // ---------------------------------------------------------
    // OPTIMIZED: Proposed Implementation
    // ---------------------------------------------------------

    // Reset mocks
    jest.clearAllMocks();
    children.forEach(c => c.getBoundingClientRect.mockClear());
    container.getBoundingClientRect.mockClear();

    const startFast = performance.now();

    const childrenArrayFast = Array.from(container.children) as any[];
    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerScrollLeft = container.scrollLeft;

    const resultFast = childrenArrayFast.map(child => {
      const childRect = child.getBoundingClientRect();
      return childRect.left - containerLeft + containerScrollLeft;
    });

    const endFast = performance.now();
    const timeFast = endFast - startFast;
    const callsFast = container.getBoundingClientRect.mock.calls.length;

    // ---------------------------------------------------------
    // REPORT
    // ---------------------------------------------------------

    console.log(`
============================================================
BENCHMARK RESULTS (N=${ITEM_COUNT} items)
============================================================
BASELINE (Unoptimized):
  Time: ${timeSlow.toFixed(3)}ms
  container.getBoundingClientRect calls: ${callsSlow}
------------------------------------------------------------
OPTIMIZED:
  Time: ${timeFast.toFixed(3)}ms
  container.getBoundingClientRect calls: ${callsFast}
------------------------------------------------------------
IMPROVEMENT:
  Time: ${(timeSlow / timeFast).toFixed(2)}x faster
  Calls reduced by: ${callsSlow - callsFast}
============================================================
    `);

    // Verify logic correctness
    expect(resultSlow).toEqual(resultFast);

    // Verify call counts
    expect(callsSlow).toBe(ITEM_COUNT);
    expect(callsFast).toBe(1);
  });
});
