import { ChecklistItem } from '../types';

export interface ProgressSummary {
  total: number;
  packed: number;
  percentage: number;
  isComplete: boolean;
}

/**
 * Calculates checklist packed progress mathematically.
 * Returns safe default values if the items list is empty.
 */
export function calculateProgress(items: ChecklistItem[] = []): ProgressSummary {
  const total = items.length;
  if (total === 0) {
    return {
      total: 0,
      packed: 0,
      percentage: 0,
      isComplete: false,
    };
  }

  const packed = items.filter((item) => item.isPacked).length;
  const percentage = Math.round((packed / total) * 100);
  const isComplete = packed === total && total > 0;

  return {
    total,
    packed,
    percentage,
    isComplete,
  };
}

