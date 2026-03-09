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

          {/* Sponsor badge */}
          {campaign.sponsorBrand && (
            <div className="absolute top-3 left-3">
              <Badge variant="yellow">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sponsored
                </span>
              </Badge>
            </div>
          )}

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
