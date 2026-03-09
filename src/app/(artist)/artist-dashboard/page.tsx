import { getArtist } from "@/data/artists";
import { getCampaignsByArtist } from "@/data/campaigns";
import { formatNumber, formatCurrency } from "@/lib/formatters";
import PledgeProgressBar from "@/components/campaign/PledgeProgressBar";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ArtistDashboardPage() {
  // Mock: current artist is Rooney
  const artist = getArtist("rooney")!;
  const artistCampaigns = getCampaignsByArtist(artist.id);
  const totalPledges = artistCampaigns.reduce((sum, c) => sum + c.currentPledges, 0);
  const totalRevenue = artistCampaigns.reduce((sum, c) => sum + c.pledgeAmountTotal, 0);
  const activeCampaigns = artistCampaigns.filter((c) => c.status === "active");
  const confirmedCampaigns = artistCampaigns.filter((c) => c.status === "confirmed" || c.status === "threshold_met");

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <h1 className="font-display text-3xl font-bold text-white uppercase tracking-wide">
                Artist Dashboard
              </h1>
              <p className="text-text-secondary">{artist.name}</p>
            </div>
          </div>
          <Link href="/tour-builder">
            <Button variant="primary" size="md">
              + New Campaign
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Pledges", value: formatNumber(totalPledges), color: "text-btb-yellow" },
            { label: "Projected Revenue", value: formatCurrency(totalRevenue), color: "text-success" },
            { label: "Active Campaigns", value: String(activeCampaigns.length), color: "text-white" },
            { label: "Shows Confirmed", value: String(confirmedCampaigns.length), color: "text-success" },
          ].map((stat) => (
            <Card key={stat.label} variant="dark" padding="lg">
              <p className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-text-muted mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Campaigns Table */}
        <div className="bg-surface-elevated border border-border-dark rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border-dark">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wide">
              Campaigns by City
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-dark">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">City</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide min-w-[200px]">Progress</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Pledges</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Revenue</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Days Left</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {artistCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-border-dark last:border-0 hover:bg-surface-hover/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-white">{campaign.city.name}</p>
                      <p className="text-xs text-text-muted">{campaign.city.state}</p>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          campaign.status === "confirmed" ? "success" :
                          campaign.status === "threshold_met" ? "warning" : "yellow"
                        }
                        dot
                      >
                        {campaign.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <PledgeProgressBar
                        currentPledges={campaign.currentPledges}
                        threshold={campaign.threshold}
                        variant="card"
                      />
                    </td>
                    <td className="px-5 py-4 text-sm text-white font-medium">
                      {formatNumber(campaign.currentPledges)}
                    </td>
                    <td className="px-5 py-4 text-sm text-success font-medium">
                      {formatCurrency(campaign.pledgeAmountTotal)}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-muted">
                      {campaign.daysRemaining > 0 ? `${campaign.daysRemaining}d` : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/campaign-manage/${campaign.slug}`}>
                        <Button variant="ghost" size="sm">Manage</Button>
                      </Link>
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
