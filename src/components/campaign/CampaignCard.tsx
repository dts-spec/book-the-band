import { cn } from "@/lib/utils";
import type { Campaign } from "@/types";
import PledgeProgressBar from "./PledgeProgressBar";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

interface CampaignCardProps {
  campaign: Campaign;
  className?: string;
}

function getStatusBadge(status: Campaign["status"]) {
  switch (status) {
    case "threshold_met":
      return <Badge variant="success" dot>Threshold Met</Badge>;
    case "confirmed":
      return <Badge variant="success" dot>Confirmed</Badge>;
    case "active":
      return null;
    default:
      return null;
  }
}

export default function CampaignCard({ campaign, className }: CampaignCardProps) {
  const { artist, city, slug, currentPledges, threshold, daysRemaining, status, artworkUrl } = campaign;

  return (
    <Link href={`/campaign/${slug}`} className={cn("group block", className)}>
      <div className="bg-surface-elevated border border-border-dark rounded-xl overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02]">
        {/* Artwork */}
        <div className="relative aspect-square overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artworkUrl}
            alt={`${artist.name} in ${city.name}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 right-3">
            {getStatusBadge(status)}
          </div>

          {/* City + Days remaining */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <Badge variant="default">{city.name}</Badge>
            {daysRemaining > 0 && status === "active" && (
              <span className="text-xs text-white/80">
                {daysRemaining}d left
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide truncate">
              {artist.name}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {artist.genre.replace("-", " ")} &middot; {city.name}, {city.state}
            </p>
          </div>

          <PledgeProgressBar
            currentPledges={currentPledges}
            threshold={threshold}
            variant="card"
          />
        </div>
      </div>
    </Link>
  );
}
