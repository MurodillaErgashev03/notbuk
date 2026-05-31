import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as UZS price with space thousand separators.
 * e.g. 12500000 -> "12 500 000 UZS"
 */
export function formatPrice(value: number): string {
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} UZS`;
}

/** Format number with space separators (no currency suffix). */
export function formatNumber(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** Compute monthly installment (0% over n months). */
export function monthlyInstallment(total: number, months = 12): number {
  return Math.round(total / months);
}
