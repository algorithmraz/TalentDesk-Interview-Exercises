import { calculateResult } from "./utils/utils"; // Adjust import path as needed

describe("calculateResult Function Tests", () => {
  describe("Basic Examples from Requirements", () => {
    test("should handle [1, 2, 3] - basic case", () => {
      const result = calculateResult("1,2,3", "time-efficient");

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

      expect(result.input).toEqual([1, 2, 4]);
      expect(result.error).toBeNull();
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics.resultCount).toBe(0);
    });

    test("should handle [3, 0, 2] - no valid combinations", () => {
      const result = calculateResult("3,0,2", "time-efficient");

      expect(result.input).toEqual([3, 0, 2]);
      expect(result.error).toBeNull();
      expect(result.result).toEqual([]);
      expect(result.performanceMetrics.resultCount).toBe(0);
    });

    test("should handle [1, 2, 3, 4, 5] - complex case", () => {
      const result = calculateResult("1,2,3,4,5", "memory-efficient");

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
});
