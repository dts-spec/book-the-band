"use client";

import { getCurrentFan } from "@/data/fans";
import { AMBASSADOR_TIERS } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/formatters";
import Badge from "@/components/ui/Badge";
import ProgressRing from "@/components/ui/ProgressRing";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function FanDashboardPage() {
  const fan = getCurrentFan();
  const tierConfig = AMBASSADOR_TIERS[fan.ambassadorTier];
  const nextTier = fan.ambassadorTier === "fan"
    ? AMBASSADOR_TIERS.superfan
    : fan.ambassadorTier === "superfan"
      ? AMBASSADOR_TIERS.ambassador
      : fan.ambassadorTier === "ambassador"
        ? AMBASSADOR_TIERS.champion
        : null;

  const referralProgress = nextTier
    ? Math.round((fan.totalReferrals / nextTier.minReferrals) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fan.avatarUrl}
            alt={fan.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="font-display text-3xl font-bold text-text-dark uppercase tracking-wide">
              {fan.displayName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={
                  fan.ambassadorTier === "champion" ? "success" :
                  fan.ambassadorTier === "ambassador" ? "warning" :
                  fan.ambassadorTier === "superfan" ? "yellow" : "default"
                }
              >
                {tierConfig.label}
              </Badge>
              <span className="text-sm text-text-dark-secondary">
                {fan.city.name}, {fan.city.state}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Ambassador Status */}
          <Card variant="light" padding="lg">
            <h2 className="font-display text-lg font-bold text-text-dark uppercase tracking-wide mb-4">
              Ambassador Status
            </h2>
            <div className="flex items-center gap-6">
              <ProgressRing percentage={referralProgress} size={90} strokeWidth={8}>
                <span className="text-sm font-bold text-text-dark">{referralProgress}%</span>
              </ProgressRing>
              <div>
                <p className="text-sm text-text-dark-secondary">
                  <span className="text-lg font-bold text-text-dark">{fan.totalReferrals}</span> referrals
                </p>
                {nextTier && (
                  <p className="text-xs text-text-dark-muted mt-1">
                    {nextTier.minReferrals - fan.totalReferrals} more to reach {nextTier.label}
                  </p>
                )}
                <p className="text-sm text-text-dark-secondary mt-2">
                  <span className="font-semibold text-text-dark">{fan.points}</span> points earned
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card variant="light" padding="lg">
            <h2 className="font-display text-lg font-bold text-text-dark uppercase tracking-wide mb-4">
              Your Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Pledges", value: fan.totalPledges },
                { label: "Active Pledges", value: fan.pledges.filter((p) => p.status === "active").length },
                { label: "Confirmed", value: fan.pledges.filter((p) => p.status === "confirmed").length },
                { label: "Referrals", value: fan.totalReferrals },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold font-display text-text-dark">{stat.value}</p>
                  <p className="text-xs text-text-dark-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Member Since */}
          <Card variant="light" padding="lg">
            <h2 className="font-display text-lg font-bold text-text-dark uppercase tracking-wide mb-4">
              Member Info
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-dark-muted">Member Since</p>
                <p className="text-sm font-medium text-text-dark">{formatDate(fan.joinedAt)}</p>
              </div>
              <div>
                <p className="text-xs text-text-dark-muted">Home City</p>
                <p className="text-sm font-medium text-text-dark">{fan.city.name}, {fan.city.state}</p>
              </div>
              <div>
                <p className="text-xs text-text-dark-muted">Tier</p>
                <p className="text-sm font-medium text-text-dark">{tierConfig.label}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Pledges */}
        <div className="mt-8">
          <h2 className="font-display text-xl font-bold text-text-dark uppercase tracking-wide mb-4">
            Your Pledges
          </h2>
          <div className="bg-surface-light border border-border-light rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-dark-muted uppercase tracking-wide">Campaign</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-dark-muted uppercase tracking-wide hidden sm:table-cell">Tier</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-dark-muted uppercase tracking-wide">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-dark-muted uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {fan.pledges.map((pledge) => (
                  <tr key={pledge.id} className="border-b border-border-light last:border-0 hover:bg-surface-light-hover transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/campaign/${pledge.campaign.slug}`} className="hover:text-btb-yellow-dark transition-colors">
                        <p className="text-sm font-medium text-text-dark">{pledge.campaign.title}</p>
                        <p className="text-xs text-text-dark-muted">{formatDate(pledge.pledgedAt)}</p>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-dark-secondary hidden sm:table-cell">{pledge.tierName}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-text-dark">{formatCurrency(pledge.amount)}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          pledge.status === "confirmed" ? "success" :
                          pledge.status === "active" ? "yellow" :
                          pledge.status === "refunded" ? "error" : "default"
                        }
                      >
                        {pledge.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
