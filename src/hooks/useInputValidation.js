import { useCallback } from "react";

export const useInputValidation = () => {
  const formatInput = useCallback(
    (str) =>
      str
        .replace(/\s+/g, " ")
        .replace(/\s*,\s*/g, ",")
        .replace(/,\s*,/g, ",")
        .replace(/^,|,$/g, ""),
    []
  );

  const validateInput = useCallback((formatted) => {
    if (!formatted) return "";
    const parts = formatted.split(",");
    return parts.some((part) => isNaN(parseInt(part.trim(), 10)))
      ? "Please enter valid numbers separated by commas"
      : "";
  }, []);

  return { formatInput, validateInput };
};
