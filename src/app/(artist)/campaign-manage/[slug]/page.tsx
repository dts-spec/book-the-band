import { campaigns, getCampaign } from "@/data/campaigns";
import { notFound } from "next/navigation";
import PledgeProgressBar from "@/components/campaign/PledgeProgressBar";
import FanActivityFeed from "@/components/campaign/FanActivityFeed";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { formatNumber, formatCurrency, formatDate } from "@/lib/formatters";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export default async function CampaignManagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  const { artist, city, rewardTiers, recentActivity, venue } = campaign;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Badge
                variant={
                  campaign.status === "confirmed" ? "success" :
                  campaign.status === "threshold_met" ? "warning" : "yellow"
                }
                dot
              >
                {campaign.status.replace("_", " ")}
              </Badge>
            </div>
            <h1 className="font-display text-3xl font-bold text-white uppercase tracking-wide">
              {artist.name} in {city.name}
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <Card variant="dark" padding="lg">
              <PledgeProgressBar
                currentPledges={campaign.currentPledges}
                threshold={campaign.threshold}
                variant="full"
                daysRemaining={campaign.daysRemaining}
                status={campaign.status}
              />
            </Card>

            {/* Pledge Breakdown by Tier */}
            <Card variant="dark" padding="lg">
              <h2 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-4">
                Pledge Breakdown by Tier
              </h2>
              <div className="space-y-3">
                {rewardTiers.map((tier) => {
                  const fillPct = Math.round((tier.claimedSlots / tier.totalSlots) * 100);
                  return (
                    <div key={tier.id} className="flex items-center gap-4">
                      <div className="w-36 text-sm text-white font-medium truncate">{tier.name}</div>
                      <div className="flex-1 h-2 bg-surface-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-btb-yellow rounded-full"
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                      <div className="text-xs text-text-muted w-24 text-right">
                        {tier.claimedSlots}/{tier.totalSlots} ({fillPct}%)
                      </div>
                      <div className="text-xs text-success font-medium w-16 text-right">
                        {formatCurrency(tier.claimedSlots * tier.price)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Activity */}
            <Card variant="dark" padding="none">
              <div className="px-5 py-4 border-b border-border-dark">
                <h2 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                  Recent Activity
                </h2>
              </div>
              <FanActivityFeed activities={recentActivity} maxItems={10} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Campaign Timeline */}
            <Card variant="dark" padding="lg">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide mb-4">
                Campaign Timeline
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-text-muted">Started</p>
                  <p className="text-sm text-white">{formatDate(campaign.startDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Ends</p>
                  <p className="text-sm text-white">{formatDate(campaign.endDate)}</p>
                </div>
                {campaign.showDate && (
                  <div>
                    <p className="text-xs text-text-muted">Show Date</p>
                    <p className="text-sm text-success font-medium">{formatDate(campaign.showDate)}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-text-muted">Days Remaining</p>
                  <p className="text-sm text-white">
                    {campaign.daysRemaining > 0 ? `${campaign.daysRemaining} days` : "Campaign ended"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Venue Matching */}
            <Card variant="dark" padding="lg">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide mb-4">
                Venue Status
              </h3>
              {venue ? (
                <div>
                  <p className="text-sm text-success font-medium mb-1">Venue Matched</p>
                  <p className="text-sm text-white">{venue.name}</p>
                  <p className="text-xs text-text-muted">{venue.address}</p>
                  <p className="text-xs text-text-muted mt-1">Capacity: {venue.capacity}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-warning font-medium mb-1">Pending Match</p>
                  <p className="text-xs text-text-muted">
                    Venue will be matched when the pledge threshold is met.
                  </p>
                </div>
              )}
            </Card>

            {/* Revenue Summary */}
            <Card variant="dark" padding="lg">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide mb-4">
                Revenue Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Gross Revenue</span>
                  <span className="text-sm text-white font-medium">{formatCurrency(campaign.pledgeAmountTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted">Platform Fee (8%)</span>
                  <span className="text-sm text-text-muted">-{formatCurrency(campaign.pledgeAmountTotal * 0.08)}</span>
                </div>
                <div className="border-t border-border-dark pt-2 flex justify-between">
                  <span className="text-sm text-white font-medium">Net Revenue</span>
                  <span className="text-sm text-success font-bold">{formatCurrency(campaign.pledgeAmountTotal * 0.92)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
