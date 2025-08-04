/**
 * Sum Detection Algorithms & Performance Tools
 *
 * This module provides optimized algorithms for detecting sum combinations
 * in arrays where A[pA] + A[pB] === A[sum], along with performance analysis tools.
 */

/**
 * @typedef {Object} SumCombination
 * @property {number} pA - Index of the first part of the sum
 * @property {number} pB - Index of the second part of the sum
 * @property {number} sum - Index of the element that equals A[pA] + A[pB]
 */

//////////////////////////
// Sum Detection Methods
//////////////////////////

/**
 * Memory-efficient version using triple nested loops
 * Finds all combinations where two elements sum to equal another element
 *
 * @param {number[]} numArray - Array of integers to analyze
 * @returns {SumCombination[]} Array of matching combinations
 */
export function detectSumsMemoryEfficient(numArray) {
  if (!Array.isArray(numArray)) throw new Error("Input must be an array");

  const results = [];
  const n = numArray.length;
  const seen = new Set(); // Track unique combinations

  // Use nested loops but ensure no duplicate combinations
  for (let pA = 0; pA < n; pA++) {
    for (let pB = pA + 1; pB < n; pB++) {
      const targetSum = numArray[pA] + numArray[pB];

      // Search for sum value at indices other than pA and pB
      for (let sumIndex = 0; sumIndex < n; sumIndex++) {
        if (
          sumIndex !== pA &&
          sumIndex !== pB &&
          numArray[sumIndex] === targetSum
        ) {
          // Create a key that represents the unique combination of values and positions
          // We need to ensure we don't count the same sum-parts combination twice
          const combination = {
            sum: { value: numArray[sumIndex], index: sumIndex },
            parts: [
              { value: numArray[pA], index: pA },
              { value: numArray[pB], index: pB },
            ].sort((a, b) => a.index - b.index), // Sort parts by index for consistency
          };

          const key = `${combination.sum.value}@${combination.sum.index}:${combination.parts[0].value}@${combination.parts[0].index}+${combination.parts[1].value}@${combination.parts[1].index}`;

          if (!seen.has(key)) {
            seen.add(key);
            results.push({ pA, pB, sum: sumIndex });
          }
        }
      }
    }
  }

  return results;
}

/**
 * Time-efficient version using binary search on pre-sorted array
 * Optimizes sum detection by sorting values while preserving original indexes
 *
 * @param {number[]} numArray - Array of integers to analyze
 * @returns {SumCombination[]} Array of matching combinations
 */
export function detectSumsTimeEfficient(numArray) {
  if (!Array.isArray(numArray)) throw new Error("Input must be an array");

  const results = [];
  const n = numArray.length;

  // Create indexed array for sorting while preserving original indices
  const indexed = numArray.map((value, index) => ({ value, index }));
  indexed.sort((a, b) => a.value - b.value);

  const seen = new Set();

  // For each pair of original indices, use binary search to find matching sums
  for (let pA = 0; pA < n; pA++) {
    for (let pB = pA + 1; pB < n; pB++) {
      const targetSum = numArray[pA] + numArray[pB];

      // Binary search for target sum in sorted array
      let left = 0,
        right = n - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = indexed[mid].value;

        if (midValue === targetSum) {
          // Found a match, check all occurrences of this value
          let k = mid;
          // Check left side
          while (k >= 0 && indexed[k].value === targetSum) {
            const sumIndex = indexed[k].index;
            if (sumIndex !== pA && sumIndex !== pB) {
              // Create a key that represents the unique combination
              const combination = {
                sum: { value: numArray[sumIndex], index: sumIndex },
                parts: [
                  { value: numArray[pA], index: pA },
                  { value: numArray[pB], index: pB },
                ].sort((a, b) => a.index - b.index),
              };

              const key = `${combination.sum.value}@${combination.sum.index}:${combination.parts[0].value}@${combination.parts[0].index}+${combination.parts[1].value}@${combination.parts[1].index}`;

              if (!seen.has(key)) {
                seen.add(key);
                results.push({ pA, pB, sum: sumIndex });
              }
            }
            k--;
          }
          // Check right side
          k = mid + 1;
          while (k < n && indexed[k].value === targetSum) {
            const sumIndex = indexed[k].index;
            if (sumIndex !== pA && sumIndex !== pB) {
              const combination = {
                sum: { value: numArray[sumIndex], index: sumIndex },
                parts: [
                  { value: numArray[pA], index: pA },
                  { value: numArray[pB], index: pB },
                ].sort((a, b) => a.index - b.index),
              };

              const key = `${combination.sum.value}@${combination.sum.index}:${combination.parts[0].value}@${combination.parts[0].index}+${combination.parts[1].value}@${combination.parts[1].index}`;

              if (!seen.has(key)) {
                seen.add(key);
                results.push({ pA, pB, sum: sumIndex });
              }
            }
            k++;
          }
          break;
        } else if (midValue < targetSum) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }
  }

  return results;
}
