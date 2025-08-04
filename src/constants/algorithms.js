export const ALGORITHMS = {
  TIME_EFFICIENT: { value: "time-efficient", shortLabel: "Time Eff." },
  MEMORY_EFFICIENT: { value: "memory-efficient", shortLabel: "Memory Eff." },
};

export const ALGORITHM_OPTIONS = [
  {
    label: "Memory Efficient",
    value: ALGORITHMS.MEMORY_EFFICIENT.value,
  },
  {
    label: "Time Efficient",
    value: ALGORITHMS.TIME_EFFICIENT.value,
  },
];

export const DEFAULT_ALGORITHM = "time-efficient";
