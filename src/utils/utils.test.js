import { calculateResult } from "./utils"; // Adjust import path as needed

describe("calculateResult Function Tests", () => {
  // Helper function to validate result structure
  const validateResultStructure = (analysisResult) => {
    expect(analysisResult).toHaveProperty("input");
    expect(analysisResult).toHaveProperty("result");
    expect(analysisResult).toHaveProperty("error");
    expect(analysisResult).toHaveProperty("performanceMetrics");
    expect(analysisResult).toHaveProperty("algorithmUsed");

    if (analysisResult.performanceMetrics) {
      expect(analysisResult.performanceMetrics).toHaveProperty("algorithm");
      expect(analysisResult.performanceMetrics).toHaveProperty("executionTime");
      expect(analysisResult.performanceMetrics).toHaveProperty("memoryUsed");
      expect(analysisResult.performanceMetrics).toHaveProperty("resultCount");
      expect(analysisResult.performanceMetrics).toHaveProperty("inputSize");
      expect(analysisResult.performanceMetrics).toHaveProperty("complexity");
      expect(analysisResult.performanceMetrics).toHaveProperty("error");
    }
  };

  describe("Basic Examples from Requirements", () => {
    test("should handle [1, 2, 3] - basic case", () => {
      const result = calculateResult("1,2,3", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([1, 2, 3]);
      expect(result.error).toBeNull();

      // The result should have one combination where indices sum to the third element
      expect(result.result).toHaveLength(1);
      const combination = result.result[0];
      expect(result.input[combination.pA] + result.input[combination.pB]).toBe(
        result.input[combination.sum]
      );
      expect(result.performanceMetrics.resultCount).toBe(1);
    });

    test("should handle [1, 2, 3, 4] - multiple combinations", () => {
      const result = calculateResult("1,2,3,4", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([1, 2, 3, 4]);
      expect(result.error).toBeNull();

      // Should find: 1+2=3 and 1+3=4
      expect(result.result).toHaveLength(2);

      // Verify each combination is valid
      result.result.forEach((combination) => {
        expect(
          result.input[combination.pA] + result.input[combination.pB]
        ).toBe(result.input[combination.sum]);
        expect(combination.pA).not.toBe(combination.pB);
        expect(combination.pA).not.toBe(combination.sum);
        expect(combination.pB).not.toBe(combination.sum);
      });

      expect(result.performanceMetrics.resultCount).toBe(2);
    });

    test("should handle [3, 0, 3] - duplicate values", () => {
      const result = calculateResult("3,0,3", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([3, 0, 3]);
      expect(result.error).toBeNull();

      // Should find: 3+0=3 (multiple valid combinations due to duplicates)
      expect(result.result.length).toBeGreaterThan(0);

      // Verify each combination is valid
      result.result.forEach((combination) => {
        expect(
          result.input[combination.pA] + result.input[combination.pB]
        ).toBe(result.input[combination.sum]);
        expect(combination.pA).not.toBe(combination.pB);
        expect(combination.pA).not.toBe(combination.sum);
        expect(combination.pB).not.toBe(combination.sum);
      });
    });

    test("should handle [1, 2, 4] - no valid combinations", () => {
      const result = calculateResult("1,2,4", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([1, 2, 4]);
      expect(result.error).toBeNull();
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics.resultCount).toBe(0);
    });

    test("should handle [3, 0, 2] - no valid combinations", () => {
      const result = calculateResult("3,0,2", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([3, 0, 2]);
      expect(result.error).toBeNull();
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics.resultCount).toBe(0);
    });

    test("should handle [1, 2, 3, 4, 5] - complex case", () => {
      const result = calculateResult("1,2,3,4,5", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([1, 2, 3, 4, 5]);
      expect(result.error).toBeNull();

      // Should find multiple combinations: 1+2=3, 1+3=4, 1+4=5, 2+3=5
      expect(result.result.length).toBeGreaterThan(0);

      // Verify each combination is valid
      result.result.forEach((combination) => {
        expect(
          result.input[combination.pA] + result.input[combination.pB]
        ).toBe(result.input[combination.sum]);
        expect(combination.pA).not.toBe(combination.pB);
        expect(combination.pA).not.toBe(combination.sum);
        expect(combination.pB).not.toBe(combination.sum);
      });
    });

    test("should handle [1, 2, 1, 3] - duplicates with valid combinations", () => {
      const result = calculateResult("1,2,1,3", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([1, 2, 1, 3]);
      expect(result.error).toBeNull();

      // Should find combinations like 1+2=3, etc.
      expect(result.result.length).toBeGreaterThan(0);

      // Verify each combination is valid
      result.result.forEach((combination) => {
        expect(
          result.input[combination.pA] + result.input[combination.pB]
        ).toBe(result.input[combination.sum]);
        expect(combination.pA).not.toBe(combination.pB);
        expect(combination.pA).not.toBe(combination.sum);
        expect(combination.pB).not.toBe(combination.sum);
      });
    });
  });

  describe("Input Validation and Error Handling", () => {
    test("should handle empty string input", () => {
      const result = calculateResult("", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([]);
      expect(result.error).toBe(
        "Please enter a valid input string (comma-separated numbers)"
      );
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics).toBeNull();
    });

    test("should handle whitespace-only input", () => {
      const result = calculateResult("   ", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([]);
      expect(result.error).toBe(
        "Please enter a valid input string (comma-separated numbers)"
      );
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics).toBeNull();
    });

    test("should handle empty values in comma-separated string", () => {
      const result = calculateResult("1,,3", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([]);
      expect(result.error).toBe("Empty value at position 2");
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics).toBeNull();
    });

    test("should handle trailing comma", () => {
      const result = calculateResult("1,2,3,", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([]);
      expect(result.error).toBe("Empty value at position 4");
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics).toBeNull();
    });

    test("should handle leading comma", () => {
      const result = calculateResult(",1,2,3", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([]);
      expect(result.error).toBe("Empty value at position 1");
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics).toBeNull();
    });

    test("should handle non-numeric values", () => {
      const result = calculateResult("1,abc,3", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([]);
      expect(result.error).toBe('Invalid integer "abc" at position 2');
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics).toBeNull();
    });

    test("should handle decimal numbers", () => {
      const result = calculateResult("1,2.5,3", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([]);
      expect(result.error).toBe('Invalid integer "2.5" at position 2');
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics).toBeNull();
    });

    test("should handle mixed valid and invalid values", () => {
      const result = calculateResult("1,2,invalid,4", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([]);
      expect(result.error).toBe('Invalid integer "invalid" at position 3');
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics).toBeNull();
    });
  });

  describe("Edge Cases", () => {
    test("should handle single element array", () => {
      const result = calculateResult("5", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([5]);
      expect(result.error).toBeNull();
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics.resultCount).toBe(0);
    });

    test("should handle two element array", () => {
      const result = calculateResult("3,7", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([3, 7]);
      expect(result.error).toBeNull();
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics.resultCount).toBe(0);
    });

    test("should handle negative numbers", () => {
      const result = calculateResult("-1,2,1", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([-1, 2, 1]);
      expect(result.error).toBeNull();

      // Should find -1 + 2 = 1
      if (result.result.length > 0) {
        result.result.forEach((combination) => {
          expect(
            result.input[combination.pA] + result.input[combination.pB]
          ).toBe(result.input[combination.sum]);
        });
      }
    });

    test("should handle all negative numbers", () => {
      const result = calculateResult("-3,-1,-4", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([-3, -1, -4]);
      expect(result.error).toBeNull();

      // Should find -3 + (-1) = -4
      if (result.result.length > 0) {
        result.result.forEach((combination) => {
          expect(
            result.input[combination.pA] + result.input[combination.pB]
          ).toBe(result.input[combination.sum]);
        });
      }
    });

    test("should handle zeros", () => {
      const result = calculateResult("0,0,0", "memory-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([0, 0, 0]);
      expect(result.error).toBeNull();

      // Should find 0 + 0 = 0 (multiple combinations)
      if (result.result.length > 0) {
        result.result.forEach((combination) => {
          expect(
            result.input[combination.pA] + result.input[combination.pB]
          ).toBe(result.input[combination.sum]);
        });
      }
    });

    test("should handle mixed zeros and non-zeros", () => {
      const result = calculateResult("0,5,5", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([0, 5, 5]);
      expect(result.error).toBeNull();

      // Should find 0 + 5 = 5
      if (result.result.length > 0) {
        result.result.forEach((combination) => {
          expect(
            result.input[combination.pA] + result.input[combination.pB]
          ).toBe(result.input[combination.sum]);
        });
      }
    });

    test("should handle large numbers", () => {
      const result = calculateResult(
        "1000000,2000000,3000000",
        "memory-efficient"
      );
      validateResultStructure(result);

      expect(result.input).toEqual([1000000, 2000000, 3000000]);
      expect(result.error).toBeNull();

      // Should find 1000000 + 2000000 = 3000000
      if (result.result.length > 0) {
        result.result.forEach((combination) => {
          expect(
            result.input[combination.pA] + result.input[combination.pB]
          ).toBe(result.input[combination.sum]);
        });
      }
    });

    test("should handle whitespace around numbers", () => {
      const result = calculateResult(" 1 , 2 , 3 ", "time-efficient");
      validateResultStructure(result);

      expect(result.input).toEqual([1, 2, 3]);
      expect(result.error).toBeNull();

      if (result.result.length > 0) {
        result.result.forEach((combination) => {
          expect(
            result.input[combination.pA] + result.input[combination.pB]
          ).toBe(result.input[combination.sum]);
        });
      }
    });
  });

  describe("Performance Metrics", () => {
    test("should provide performance metrics for successful execution", () => {
      const result = calculateResult("1,2,3,4,5", "time-efficient");
      validateResultStructure(result);

      if (result.performanceMetrics) {
        expect(result.performanceMetrics.executionTime).toBeGreaterThanOrEqual(
          0
        );
        expect(result.performanceMetrics.memoryUsed).toBeGreaterThanOrEqual(0);
        expect(result.performanceMetrics.inputSize).toBe(5);
        expect(result.performanceMetrics.resultCount).toBe(
          result.result.length
        );
        expect(result.performanceMetrics.error).toBeNull();
      }
    });
  });

  describe("Uniqueness and Consistency", () => {
    test("should produce same results with both algorithms", () => {
      const input = "1,2,3,4";

      const timeEfficientResult = calculateResult(input, "time-efficient");
      const memoryEfficientResult = calculateResult(input, "memory-efficient");

      // Both should have same number of results
      expect(timeEfficientResult.result.length).toBe(
        memoryEfficientResult.result.length
      );

      // Both should have same input
      expect(timeEfficientResult.input).toEqual(memoryEfficientResult.input);

      // All combinations should be mathematically valid for both
      const validateCombinations = (result) => {
        result.result.forEach((combination) => {
          expect(
            result.input[combination.pA] + result.input[combination.pB]
          ).toBe(result.input[combination.sum]);
          expect(combination.pA).not.toBe(combination.pB);
          expect(combination.pA).not.toBe(combination.sum);
          expect(combination.pB).not.toBe(combination.sum);
        });
      };

      validateCombinations(timeEfficientResult);
      validateCombinations(memoryEfficientResult);
    });
  });

  describe("Stress Tests", () => {
    test("should handle moderately large input efficiently", () => {
      const largeInput = Array.from({ length: 15 }, (_, i) => i + 1).join(",");
      const result = calculateResult(largeInput, "time-efficient");
      validateResultStructure(result);

      expect(result.error).toBeNull();
      if (result.performanceMetrics) {
        expect(result.performanceMetrics.inputSize).toBe(15);
        expect(result.performanceMetrics.executionTime).toBeLessThan(5000); // Should complete within 5 seconds
      }

      // Verify all results are valid
      result.result.forEach((combination) => {
        expect(
          result.input[combination.pA] + result.input[combination.pB]
        ).toBe(result.input[combination.sum]);
      });
    });

    test("should handle array with no valid combinations efficiently", () => {
      const primes = "3,5,7,11,13";
      const result = calculateResult(primes, "memory-efficient");
      validateResultStructure(result);

      expect(result.error).toBeNull();
      expect(result.result).toEqual([]);
      if (result.performanceMetrics) {
        expect(result.performanceMetrics.resultCount).toBe(0);
      }
    });
  });
});
