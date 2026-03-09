"use client";

import type { Campaign, RewardTier } from "@/types";
import { useState } from "react";
import PledgeProgressBar from "./PledgeProgressBar";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/formatters";
import { TRUST_COPY } from "@/lib/constants";

interface PledgeSidebarProps {
  campaign: Campaign;
}

export default function PledgeSidebar({ campaign }: PledgeSidebarProps) {
  const [selectedTier, setSelectedTier] = useState<RewardTier | null>(null);

  return (
    <div className="bg-surface-elevated border border-border-dark rounded-xl p-6 space-y-5">
      <PledgeProgressBar
        currentPledges={campaign.currentPledges}
        threshold={campaign.threshold}
        variant="compact"
        daysRemaining={campaign.daysRemaining}
        status={campaign.status}
      />

      <div className="border-t border-border-dark pt-5 space-y-3">
        <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide">
          Select Your Tier
        </h3>
        {campaign.rewardTiers.map((tier) => {
          const slotsLeft = tier.totalSlots - tier.claimedSlots;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 cursor-pointer ${
                selectedTier?.id === tier.id
                  ? "border-btb-yellow bg-btb-yellow/5"
                  : "border-border-dark hover:border-text-muted"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white">{tier.name}</span>
                <span className="text-sm font-bold text-btb-yellow">
                  {formatCurrency(tier.price)}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                {slotsLeft} spots left
              </p>
            </button>
          );
        })}
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={!selectedTier}
      >
        {selectedTier
          ? `Pledge ${formatCurrency(selectedTier.price)}`
          : "Select a Tier"}
      </Button>

      <p className="text-xs text-text-muted text-center">{TRUST_COPY}</p>
    </div>
  );
}
