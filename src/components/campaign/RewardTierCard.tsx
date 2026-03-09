"use client";

import { cn } from "@/lib/utils";
import type { RewardTier } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import Button from "@/components/ui/Button";

interface RewardTierCardProps {
  tier: RewardTier;
  onSelect?: (tier: RewardTier) => void;
  selected?: boolean;
  className?: string;
}

export default function RewardTierCard({
  tier,
  onSelect,
  selected = false,
  className,
}: RewardTierCardProps) {
  const slotsLeft = tier.totalSlots - tier.claimedSlots;
  const almostGone = slotsLeft <= 10;

  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all duration-200",
        selected
          ? "border-btb-yellow bg-btb-yellow/5 shadow-[var(--shadow-glow-yellow)]"
          : "border-border-dark bg-surface-elevated hover:border-text-muted",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-display text-lg font-bold text-white uppercase">
            {tier.name}
          </h4>
          <p className="text-sm text-text-secondary mt-0.5">{tier.description}</p>
        </div>
        <span className="text-xl font-bold font-display text-btb-yellow">
          {formatCurrency(tier.price)}
        </span>
      </div>

      <ul className="space-y-1.5 mb-4">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-text-secondary">
            <span className="text-btb-yellow mt-0.5 flex-shrink-0">&#10003;</span>
            {perk}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-xs font-medium",
            almostGone ? "text-warning" : "text-text-muted",
          )}
        >
          {slotsLeft} of {tier.totalSlots} spots left
        </span>
        <Button
          size="sm"
          variant={selected ? "primary" : "outline"}
          onClick={() => onSelect?.(tier)}
        >
          {selected ? "Selected" : "Select"}
        </Button>
      </div>
    </div>
  );
}
