import { artists, getArtist } from "@/data/artists";
import { getCampaignsByArtist } from "@/data/campaigns";
import { notFound } from "next/navigation";
import CampaignCard from "@/components/campaign/CampaignCard";
import Badge from "@/components/ui/Badge";
import { formatNumber } from "@/lib/formatters";
import Link from "next/link";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export default async function ArtistProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const artistCampaigns = getCampaignsByArtist(artist.id);
  const activeCampaigns = artistCampaigns.filter(
    (c) => c.status === "active" || c.status === "threshold_met"
  );

  return (
    <div className="min-h-screen">
      {/* ── Immersive Hero — pulls up under fixed navbar ── */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden -mt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.heroImageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/40 via-transparent to-surface-dark/40" />

        {/* Artist info overlay */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="flex items-end gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border-4 border-surface-dark shadow-2xl"
            />
            <div>
              <div className="flex items-center gap-2 mb-2">
                {artist.verified && (
                  <Badge variant="yellow">Verified</Badge>
                )}
                <Badge variant="default">
                  {artist.genre.replace("-", " ")}
                </Badge>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide">
                {artist.name}
              </h1>
              {artist.subGenres.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {artist.subGenres.map((sg) => (
                    <span
                      key={sg}
                      className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full"
                    >
                      {sg}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="bg-surface-dark border-y border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Monthly Listeners",
                value: formatNumber(artist.monthlyListeners),
              },
              {
                label: "Total Pledges",
                value: formatNumber(artist.totalPledges),
              },
              { label: "Shows Booked", value: String(artist.showsBooked) },
              {
                label: "Active Campaigns",
                value: String(activeCampaigns.length),
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold font-display text-btb-yellow">
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted mt-1 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Bio + Tracks */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-3">
                About
              </h2>
              <p className="text-text-secondary leading-relaxed text-base">
                {artist.bio}
              </p>

              {/* Social links */}
              <div className="flex gap-3 mt-4">
                {artist.socialLinks.spotify && (
                  <Link
                    href={artist.socialLinks.spotify}
                    className="text-text-muted hover:text-btb-yellow transition-colors text-sm"
                  >
                    Spotify
                  </Link>
                )}
                {artist.socialLinks.instagram && (
                  <Link
                    href={artist.socialLinks.instagram}
                    className="text-text-muted hover:text-btb-yellow transition-colors text-sm"
                  >
                    Instagram
                  </Link>
                )}
                {artist.socialLinks.twitter && (
                  <Link
                    href={artist.socialLinks.twitter}
                    className="text-text-muted hover:text-btb-yellow transition-colors text-sm"
                  >
                    Twitter
                  </Link>
                )}
                {artist.socialLinks.website && (
                  <Link
                    href={artist.socialLinks.website}
                    className="text-text-muted hover:text-btb-yellow transition-colors text-sm"
                  >
                    Website
                  </Link>
                )}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-white uppercase tracking-wide mb-3">
                Top Tracks
              </h2>
              <div className="bg-surface-elevated border border-border-dark rounded-xl overflow-hidden">
                {artist.topTracks.map((track, i) => (
                  <div
                    key={track.name}
                    className="flex items-center gap-4 px-5 py-3.5 border-b border-border-dark last:border-0 hover:bg-surface-hover/50 transition-colors"
                  >
                    <span className="text-sm text-text-muted w-6 text-right font-display font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-white flex-1">
                      {track.name}
                    </span>
                    <span className="text-xs text-text-muted">
                      {track.duration}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Campaigns sidebar */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-white uppercase tracking-wide">
              Campaigns
            </h2>
            {artistCampaigns.length > 0 ? (
              artistCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            ) : (
              <div className="bg-surface-elevated border border-border-dark rounded-xl p-6 text-center">
                <p className="text-text-muted text-sm">
                  No active campaigns yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
