import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getProgressPercentage(current: number, threshold: number): number {
  return Math.min(Math.round((current / threshold) * 100), 150);
}

export function getPledgeStatus(current: number, threshold: number) {
  const pct = getProgressPercentage(current, threshold);
  if (pct >= 100) return "threshold_met" as const;
  if (pct >= 75) return "almost_there" as const;
  if (pct >= 50) return "heating_up" as const;
  if (pct >= 25) return "building" as const;
  return "early" as const;
}

export function getProgressColor(current: number, threshold: number): string {
  const pct = getProgressPercentage(current, threshold);
  if (pct >= 100) return "var(--color-pledge-complete)";
  if (pct >= 75) return "var(--color-pledge-end)";
  return "var(--color-pledge-start)";
}
