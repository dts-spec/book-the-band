"use client";

import { cn } from "@/lib/utils";
import { getProgressPercentage } from "@/lib/utils";
import { formatNumber } from "@/lib/formatters";
import { motion } from "motion/react";

type PledgeVariant = "full" | "compact" | "card";

interface PledgeProgressBarProps {
  currentPledges: number;
  threshold: number;
  variant?: PledgeVariant;
  daysRemaining?: number;
  status?: string;
  className?: string;
}

function getBarColor(pct: number): string {
  if (pct >= 100) return "var(--color-pledge-complete)";
  if (pct >= 75) return "var(--color-pledge-end)";
  return "var(--color-pledge-start)";
}

function getStatusLabel(pct: number, remaining: number): string {
  if (pct >= 100) return "SHOW CONFIRMED!";
  if (pct >= 75) return `${remaining} more needed!`;
  if (pct >= 50) return "Halfway there!";
  if (pct >= 25) return "Building momentum";
  return "Just getting started";
}

export default function PledgeProgressBar({
  currentPledges,
  threshold,
  variant = "full",
  daysRemaining,
  status,
  className,
}: PledgeProgressBarProps) {
  const pct = getProgressPercentage(currentPledges, threshold);
  const remaining = Math.max(threshold - currentPledges, 0);
  const barColor = getBarColor(pct);
  const isComplete = pct >= 100;
  const isAlmostThere = pct >= 75 && pct < 100;
  const barWidth = Math.min(pct, 100);

  if (variant === "card") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-semibold text-white">
            {formatNumber(currentPledges)}
            <span className="text-text-muted font-normal"> / {formatNumber(threshold)}</span>
          </span>
          <span className="text-xs text-text-muted">{pct}%</span>
        </div>
        <div className="h-1.5 bg-surface-dark rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", isAlmostThere && "animate-pledge-glow")}
            style={{ backgroundColor: barColor }}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold font-display text-white">
              {formatNumber(currentPledges)}
            </span>
            <span className="text-sm text-text-muted">
              of {formatNumber(threshold)} pledges
            </span>
          </div>
          <span
            className="text-sm font-bold"
            style={{ color: barColor }}
          >
            {pct}%
          </span>
        </div>
        <div className="h-2 bg-surface-dark rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", isAlmostThere && "animate-pledge-glow")}
            style={{ backgroundColor: barColor }}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        {daysRemaining !== undefined && daysRemaining > 0 && (
          <p className="text-xs text-text-muted">
            {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} remaining
          </p>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-display text-white">
              {formatNumber(currentPledges)}
            </span>
            <span className="text-text-muted">
              of {formatNumber(threshold)} pledges
            </span>
          </div>
          <p
            className="text-sm font-semibold mt-1"
            style={{ color: barColor }}
          >
            {status === "confirmed" || status === "completed"
              ? "SHOW CONFIRMED!"
              : getStatusLabel(pct, remaining)}
          </p>
        </div>
        <span
          className="text-2xl font-bold font-display"
          style={{ color: barColor }}
        >
          {pct}%
        </span>
      </div>

      <div className="h-3 bg-surface-dark rounded-full overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isAlmostThere && "animate-pledge-glow",
            isComplete && "shadow-[var(--shadow-glow-green)]",
          )}
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className="flex justify-between text-xs text-text-muted">
        <span>
          {isComplete
            ? `${currentPledges - threshold} over threshold`
            : `${formatNumber(remaining)} more pledges needed`}
        </span>
        {daysRemaining !== undefined && daysRemaining > 0 && (
          <span>
            {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} left
          </span>
        )}
      </div>
    </div>
  );
}
