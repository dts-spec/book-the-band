"use client";

import Button from "@/components/ui/Button";

interface ShareReferralProps {
  campaignSlug: string;
  className?: string;
}

export default function ShareReferral({ campaignSlug, className }: ShareReferralProps) {
  const referralLink = `booktheband.com/campaign/${campaignSlug}?ref=USER123`;

  return (
    <div className={className}>
      <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide mb-3">
        Share & Earn Points
      </h3>
      <p className="text-sm text-text-secondary mb-3">
        Share this campaign with friends. Every friend who pledges earns you ambassador points.
      </p>
      <div className="flex gap-2">
        <div className="flex-1 bg-surface-dark border border-border-dark rounded-lg px-3 py-2 text-sm text-text-muted truncate">
          {referralLink}
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigator.clipboard?.writeText(referralLink)}
        >
          Copy
        </Button>
      </div>
    </div>
  );
}
