export const detectSums = (array) => {
  return null;
};

export function calculateResult(input) {
  const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10));
  let error = null;
  let result = '';
  try {
    result = detectSums(input);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error }
}
