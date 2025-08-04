import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the utils module
jest.mock("./utils/utils", () => ({
  calculateResult: jest.fn(),
}));

// Mock the hooks module
jest.mock("./hooks", () => ({
  useDebounce: (value) => value,
  useInputValidation: () => ({
    formatInput: (input) => input.trim(),
    validateInput: (input) => {
      if (!input) return "Input is required";
      const numbers = input.split(",").map((n) => n.trim());
      for (const num of numbers) {
        if (isNaN(Number(num))) return "Invalid number format";
      }
      return "";
    },
  }),
}));

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("Detect Sums Calculator")).toBeInTheDocument();
    expect(
      screen.getByText("Find all combinations where A[pA] + A[pB] = A[sum]")
    ).toBeInTheDocument();
  });

  test("displays initial UI elements", () => {
    render(<App />);

    // Check for input field
    expect(
      screen.getByLabelText("Enter numbers (comma-separated):")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g., 1, 2, 3, 4")).toBeInTheDocument();

    // Check for algorithm selector
    expect(screen.getByLabelText("Choose algorithm:")).toBeInTheDocument();

    // Check for calculate button
    expect(
      screen.getByRole("button", { name: "Calculate" })
    ).toBeInTheDocument();

    // Check for examples section
    expect(screen.getByText("Examples:")).toBeInTheDocument();
  });

  test("handles input changes", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("e.g., 1, 2, 3, 4");
    await userEvent.type(input, "1, 2, 3");

    expect(input).toHaveValue("1, 2, 3");
  });

  test("shows clear button when input has value", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("e.g., 1, 2, 3, 4");

    // Clear button should not exist initially
    expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument();

    // Type something
    await userEvent.type(input, "1, 2, 3");

    // Clear button should appear
    expect(screen.getByLabelText("Clear input")).toBeInTheDocument();
  });

  test("clears input when clear button is clicked", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("e.g., 1, 2, 3, 4");
    await userEvent.type(input, "1, 2, 3");

    const clearButton = screen.getByLabelText("Clear input");
    await userEvent.click(clearButton);

    expect(input).toHaveValue("");
  });
});
