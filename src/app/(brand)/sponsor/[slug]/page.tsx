import { campaigns, getCampaign } from "@/data/campaigns";
import { SPONSORSHIP_TIERS } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";
import PledgeProgressBar from "@/components/campaign/PledgeProgressBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

const tiers = [
  { key: "presenting" as const, tier: SPONSORSHIP_TIERS.presenting },
  { key: "supporting" as const, tier: SPONSORSHIP_TIERS.supporting },
  { key: "community" as const, tier: SPONSORSHIP_TIERS.community },
];

export default async function SponsorCampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  return (
    <div className="min-h-screen">
      {/* Campaign Hero */}
      <div className="relative h-[300px] overflow-hidden -mt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={campaign.artworkUrl}
          alt={campaign.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/60 to-surface-dark" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="yellow">{campaign.city.name}</Badge>
            <Badge variant={
              campaign.status === "confirmed" ? "success" :
              campaign.status === "threshold_met" ? "warning" : "default"
            } dot>
              {campaign.status.replace("_", " ")}
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
            {campaign.title}
          </h1>
          <p className="mt-1 text-white/70 text-lg">
            by {campaign.artist.name} &middot; {campaign.artist.genre.replace("-", " ")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <Card variant="dark" padding="lg" className="mb-8">
          <PledgeProgressBar
            currentPledges={campaign.currentPledges}
            threshold={campaign.threshold}
            variant="compact"
            daysRemaining={campaign.daysRemaining}
            status={campaign.status}
          />
        </Card>

        {/* Sponsorship Tiers */}
        <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wide mb-6">
          Choose Your Sponsorship Tier
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tiers.map(({ key, tier }) => (
            <Card
              key={key}
              variant="dark"
              padding="lg"
              className={
                key === "presenting"
                  ? "ring-2 ring-btb-yellow"
                  : ""
              }
            >
              {key === "presenting" && (
                <Badge variant="yellow" className="mb-3">Most Popular</Badge>
              )}
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide">
                {tier.label}
              </h3>
              <p className="text-2xl font-bold font-display text-btb-yellow mt-2">
                {formatCurrency(tier.minAmount)}+
              </p>
              <ul className="mt-4 space-y-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-success mt-0.5">&#10003;</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  variant={key === "presenting" ? "primary" : "outline"}
                  fullWidth
                  size="md"
                >
                  Select Tier
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Campaign Description */}
        <Card variant="dark" padding="lg">
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-3">
            About This Campaign
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {campaign.description}
          </p>
        </Card>
      </div>
    </div>
  );
}
