import type { Campaign } from "@/types";
import Badge from "@/components/ui/Badge";

interface CampaignHeroProps {
  campaign: Campaign;
}

export default function CampaignHero({ campaign }: CampaignHeroProps) {
  const { artist, city, artworkUrl, gradientColors, venue, showDate, status } =
    campaign;

  return (
    <div
      className="relative w-full min-h-[450px] md:min-h-[550px] flex items-end overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
      }}
    >
      {/* Background artwork — larger and more prominent */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artworkUrl}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/30 via-transparent to-surface-dark/30" />
      </div>

      {/* Decorative accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-btb-yellow via-btb-yellow-muted to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-32">
        <div className="flex items-center gap-3 mb-4">
          {status === "confirmed" && (
            <Badge variant="success" dot>
              Show Confirmed
            </Badge>
          )}
          {status === "threshold_met" && (
            <Badge variant="warning" dot>
              Threshold Met
            </Badge>
          )}
          <Badge variant="default">{artist.genre.replace("-", " ")}</Badge>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-wide">
          {artist.name}
        </h1>
        <p className="text-xl sm:text-2xl text-white/70 mt-2 font-display uppercase tracking-wide">
          {city.name}, {city.state}
        </p>

        {venue && (
          <p className="text-sm text-white/50 mt-3">
            {venue.name} &middot; Capacity: {venue.capacity}
            {showDate && (
              <span>
                {" "}
                &middot;{" "}
                {new Date(showDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
