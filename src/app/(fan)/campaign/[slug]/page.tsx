import { campaigns, getCampaign } from "@/data/campaigns";
import { notFound } from "next/navigation";
import CampaignHero from "@/components/campaign/CampaignHero";
import PledgeSidebar from "@/components/campaign/PledgeSidebar";
import PledgeProgressBar from "@/components/campaign/PledgeProgressBar";
import RewardTierCard from "@/components/campaign/RewardTierCard";
import FanActivityFeed from "@/components/campaign/FanActivityFeed";
import ShareReferral from "@/components/campaign/ShareReferral";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  const { artist, city, description, rewardTiers, recentActivity } = campaign;

  return (
    <div className="min-h-screen">
      <div className="-mt-16">
        <CampaignHero campaign={campaign} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Full progress bar */}
            <PledgeProgressBar
              currentPledges={campaign.currentPledges}
              threshold={campaign.threshold}
              variant="full"
              daysRemaining={campaign.daysRemaining}
              status={campaign.status}
            />

            {/* About */}
            <section>
              <h2 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-4">
                About This Campaign
              </h2>
              <p className="text-text-secondary leading-relaxed">{description}</p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/artist/${artist.slug}`}
                  className="flex items-center gap-3 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-btb-yellow transition-colors">
                      {artist.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {artist.genre.replace("-", " ")} &middot;{" "}
                      {artist.monthlyListeners.toLocaleString()} monthly listeners
                    </p>
                  </div>
                </Link>
                {artist.verified && <Badge variant="yellow">Verified</Badge>}
              </div>
            </section>

            {/* Reward Tiers */}
            <section>
              <h2 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-4">
                Reward Tiers
              </h2>
              <div className="space-y-4">
                {rewardTiers.map((tier) => (
                  <RewardTierCard key={tier.id} tier={tier} />
                ))}
              </div>
            </section>

            {/* Activity Feed */}
            <section>
              <h2 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-4">
                Recent Activity
              </h2>
              <div className="bg-surface-elevated border border-border-dark rounded-xl overflow-hidden">
                <FanActivityFeed activities={recentActivity} />
              </div>
            </section>
          </div>

          {/* Sidebar - Airbnb-style sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <PledgeSidebar campaign={campaign} />
              <div className="mt-4">
                <ShareReferral campaignSlug={campaign.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
