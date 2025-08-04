import React, { useState, useEffect, useCallback, useMemo } from "react";
import { calculateResult } from "./utils/utils";
import "./App.css";
import { ALGORITHM_OPTIONS, DEBOUNCE_DELAY } from "./constants";
import { useDebounce, useInputValidation } from "./hooks";

// Components
const ResultItem = React.memo(({ item }) => (
  <div className="result-item">
    <span className="result-text">
      {item.pA} + {item.pB} = {item.sum}
    </span>
    <span className="result-explanation">
      (A[{item.pA}] + A[{item.pB}] = A[{item.sum}])
    </span>
  </div>
));

ResultItem.displayName = "ResultItem";

const PerformanceMetrics = React.memo(({ metrics }) => {
  if (!metrics) return null;

  const memory =
    metrics.memoryUsed > 0
      ? `${(metrics.memoryUsed / 1024).toFixed(2)}KB`
      : "N/A";

  return (
    <div className="performance-metrics">
      <h4>Performance Analysis</h4>
      <div className="metrics-grid">
        <div className="metric-item">
          <span className="metric-label">Algorithm:</span>
          <span className="metric-value">{metrics.algorithm}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Execution Time:</span>
          <span className="metric-value">
            {metrics.executionTime.toFixed(2)}ms
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Memory Used:</span>
          <span className="metric-value">{memory}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Time Complexity:</span>
          <span className="metric-value">{metrics.complexity.time}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Space Complexity:</span>
          <span className="metric-value">{metrics.complexity.space}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Input Size:</span>
          <span className="metric-value">{metrics.inputSize} elements</span>
        </div>
      </div>
    </div>
  );
});

PerformanceMetrics.displayName = "PerformanceMetrics";

const LoadingSpinner = () => (
  <div className="loading" role="status" aria-label="Calculating results">
    <div className="spinner" aria-hidden="true"></div>
    <p>Processing...</p>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="error-message" role="alert">
    <span className="error-icon" aria-hidden="true">
      ⚠️
    </span>
    {error}
  </div>
);

const ExamplesSection = () => (
  <section className="examples">
    <h4>Examples:</h4>
    <div className="example-list">
      <div className="example-item">
        <strong>[1, 2, 3]</strong> → 1 + 2 = 3
      </div>
      <div className="example-item">
        <strong>[1, 2, 3, 4]</strong> → 1 + 2 = 3, 1 + 3 = 4
      </div>
      <div className="example-item">
        <strong>[3, 0, 3]</strong> → 3 + 0 = 3, 0 + 3 = 3
      </div>
    </div>
  </section>
);
// Main App Component
const App = () => {
  // State
  const [inputValue, setInputValue] = useState("");
  const [formattedInput, setFormattedInput] = useState("");
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [algorithm, setAlgorithm] = useState("time-efficient");

  // Custom hooks
  const debouncedInput = useDebounce(inputValue, DEBOUNCE_DELAY);
  const { formatInput, validateInput } = useInputValidation();

  // Effects
  useEffect(() => {
    if (!debouncedInput.trim()) {
      setFormattedInput("");
      setError("");
      setResultData(null);
      setMetrics(null);
      return;
    }

    const formatted = formatInput(debouncedInput);
    setFormattedInput(formatted);
    setError(validateInput(formatted));
  }, [debouncedInput, formatInput, validateInput]);

  // Event handlers
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
    setHasSubmitted(false);
  }, []);

  const handleAlgorithmChange = useCallback((e) => {
    setAlgorithm(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!inputValue.trim()) {
        setError("Please enter some numbers");
        return;
      }

      setIsLoading(true);
      setHasSubmitted(true);
      setError("");

      try {
        const executeCalculation = () => calculateResult(inputValue, algorithm);

        // Use requestIdleCallback for better performance if available
        const data =
          typeof requestIdleCallback !== "undefined"
            ? await new Promise((resolve) =>
                requestIdleCallback(() => resolve(executeCalculation()))
              )
            : executeCalculation();

        const { input, result, error: calcError, performanceMetrics } = data;

        if (calcError) {
          setError(calcError);
          setResultData(null);
          setMetrics(null);
        } else {
          setResultData({ input, result });
          setMetrics(performanceMetrics);
        }
      } catch (err) {
        console.error("Calculation error:", err);
        setError("Unexpected error occurred. Please try again.");
        setResultData(null);
        setMetrics(null);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, algorithm]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    setFormattedInput("");
    setResultData(null);
    setError("");
    setHasSubmitted(false);
    setMetrics(null);
  }, []);

  // Computed values
  const renderedResults = useMemo(() => {
    if (!resultData?.result?.length) return "No valid combinations found";

    return resultData.result.map((item) => (
      <ResultItem key={`${item.pA}-${item.pB}-${item.sum}`} item={item} />
    ));
  }, [resultData?.result]);

  const inputDisplay = useMemo(
    () => resultData?.input?.join(", ") || "",
    [resultData?.input]
  );

  const resultCount = useMemo(
    () => resultData?.result?.length || 0,
    [resultData?.result]
  );

  const isSubmitDisabled = isLoading || !inputValue.trim() || error;
  const showFormattedPreview = formattedInput && formattedInput !== inputValue;

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Detect Sums Calculator</h1>
          <p className="subtitle">
            Find all combinations where A[pA] + A[pB] = A[sum]
          </p>
        </header>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="numberInput" className="input-label">
              Enter numbers (comma-separated):
            </label>
            <div className="input-container">
              <input
                id="numberInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="e.g., 1, 2, 3, 4"
                className={`input-field ${error && hasSubmitted ? "input-error" : ""}`}
                disabled={isLoading}
                autoComplete="off"
                spellCheck="false"
                aria-describedby={error ? "error-message" : undefined}
                aria-invalid={!!(error && hasSubmitted)}
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="clear-button"
                  disabled={isLoading}
                  aria-label="Clear input"
                >
                  ×
                </button>
              )}
            </div>
            {showFormattedPreview && (
              <div className="formatted-preview">
                Formatted: {formattedInput}
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="algorithm" className="input-label">
              Choose algorithm:
            </label>
            <select
              id="algorithm"
              value={algorithm}
              onChange={handleAlgorithmChange}
              className="input-field"
              disabled={isLoading}
              aria-describedby="algorithm-description"
            >
              {ALGORITHM_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitDisabled}
              aria-describedby={error ? "error-message" : undefined}
            >
              {isLoading ? "Calculating..." : "Calculate"}
            </button>
          </div>
        </form>

        <div className="results-section">
          {isLoading && <LoadingSpinner />}

          {error && <ErrorMessage error={error} />}

          {resultData && !error && (
            <section className="results">
              <h3>Results ({resultCount} combinations)</h3>
              <div className="input-display">
                <strong>Input:</strong> [{inputDisplay}]
              </div>
              <div className="combinations">
                <strong>Valid Combinations:</strong>
                <div className="combinations-list">{renderedResults}</div>
              </div>
              <PerformanceMetrics metrics={metrics} />
            </section>
          )}

          {!resultData && !error && !isLoading && hasSubmitted && (
            <div className="no-results">
              <p>No valid combinations found for the given input.</p>
            </div>
          )}
        </div>

        <ExamplesSection />
      </div>
    </div>
  );
};

export default App;
