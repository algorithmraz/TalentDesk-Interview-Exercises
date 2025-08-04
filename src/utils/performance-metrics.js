///////////////////////////////
//Performance & Orchestration//
///////////////////////////////

/**
 * @typedef {Object} ComplexityInfo
 * @property {string} time - Time complexity (e.g., "O(n²)")
 * @property {string} space - Space complexity (e.g., "O(1)")
 * @property {string} description - Human-readable explanation
 */

/**
 * @typedef {Object} PerformanceMetrics
 * @property {string} algorithm - Algorithm name
 * @property {number} executionTime - Time in milliseconds
 * @property {number} memoryUsed - Memory used in bytes
 * @property {SumCombination[]} result - Detected combinations
 * @property {number} resultCount - Number of results found
 * @property {number} inputSize - Input array size
 * @property {ComplexityInfo} complexity - Time/space complexity details
 * @property {string|null} error - Error message if execution failed
 */

/**
 * Executes an algorithm with performance monitoring and error handling
 * Measures execution time, memory usage, and captures any runtime errors
 *
 * @param {number[]} numArray - Input array to process
 * @param {string} algorithmName - Display name for the algorithm
 * @param {Function} algorithmFn - Algorithm function to execute
 * @returns {PerformanceMetrics} Performance metrics and results
 */
export function runAlgoWithPerfMetrics(numArray, algorithmName, algorithmFn) {
  const startTime = performance.now();
  const startMemory = performance.memory?.usedJSHeapSize || 0;

  let result;
  let executionError = null;

  try {
    result = algorithmFn(numArray);
  } catch (error) {
    executionError = error.message;
    result = [];
  }

  const endTime = performance.now();
  const endMemory = performance.memory?.usedJSHeapSize || startMemory;

  return {
    algorithm: algorithmName,
    executionTime: +(endTime - startTime).toFixed(3), // Round to 3 decimal places
    memoryUsed: performance.memory ? Math.max(0, endMemory - startMemory) : 0, // Handle when performance.memory is undefined
    result,
    resultCount: result.length,
    inputSize: numArray.length,
    complexity: getComplexityInfo(algorithmName),
    error: executionError,
  };
}

/**
 * Retrieves algorithm complexity information and descriptions
 * Provides both theoretical complexity and practical descriptions
 *
 * @param {string} algorithmName - Name identifier for the algorithm
 * @returns {ComplexityInfo|undefined} Complexity information object
 */
export function getComplexityInfo(algorithmName) {
  const complexities = {
    "Time Eff.": {
      time: "O(n² log n)",
      space: "O(n)",
      description: "Binary search optimized",
    },
    "Memory Eff.": {
      time: "O(n³)",
      space: "O(1)",
      description: "Triple nested loop",
    },
  };

  return complexities[algorithmName];
}
