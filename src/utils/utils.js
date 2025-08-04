import { ALGORITHMS } from "../constants";
import {
  detectSumsMemoryEfficient,
  detectSumsTimeEfficient,
} from "./sum-algorithms";

/**
 * Sum Detection Algorithms
 *
 * This module provides optimized algorithms for detecting sum combinations
 * in arrays where A[pA] + A[pB] === A[sum]
 */

/**
 * @typedef {Object} AnalysisResult
 * @property {number[]} input - Parsed input array
 * @property {SumCombination[]} result - Detected combinations
 * @property {string|null} error - Error message if any
 * @property {string} algorithmUsed - Algorithm selected
 */

/**
 * Main entry point for sum detection with input parsing and algorithm selection
 * Parses comma-separated string input, validates data, and executes chosen algorithm
 *
 * @param {string} input - Comma-separated string of integers (e.g., "1,2,3,4")
 * @param {string} algorithm - Algorithm choice: "memory-efficient" or "time-efficient"
 * @returns {AnalysisResult} Complete analysis results
 */
export function calculateResult(input, algorithm) {
  // Input validation
  const trimmedInput = input.trim();
  if (typeof input !== "string" || trimmedInput === "") {
    return {
      input: [],
      result: [],
      error: "Please enter a valid input string (comma-separated numbers)",
      algorithmUsed: algorithm,
    };
  }

  let parsedNumArray = [];
  let error = null;

  try {
    parsedNumArray = trimmedInput.split(",").map((value, index) => {
      const trimmedValue = value.trim();
      if (trimmedValue === "") {
        throw new Error(`Empty value at position ${index + 1}`);
      }

      const num = Number(trimmedValue);
      if (!Number.isInteger(num)) {
        throw new Error(
          `Invalid integer "${trimmedValue}" at position ${index + 1}`
        );
      }

      return num;
    });

    // Algorithm selection with validation
    const algorithms = {
      [ALGORITHMS.MEMORY_EFFICIENT.value]: {
        fn: detectSumsMemoryEfficient,
        name: ALGORITHMS.MEMORY_EFFICIENT.shortLabel,
      },
      [ALGORITHMS.TIME_EFFICIENT.value]: {
        fn: detectSumsTimeEfficient,
        name: ALGORITHMS.TIME_EFFICIENT.shortLabel,
      },
    };

    const selectedAlgorithm =
      algorithms[algorithm] || algorithms["time-efficient"];

    const result = selectedAlgorithm.fn(parsedNumArray);

    return {
      input: parsedNumArray,
      result,
      error,
      algorithmUsed: algorithm,
    };
  } catch (err) {
    error = err.message;

    return {
      input: parsedNumArray,
      result: [],
      error,
      algorithmUsed: algorithm,
    };
  }
}
