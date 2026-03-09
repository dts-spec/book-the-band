"use client";

import { useState, useMemo } from "react";
import { campaigns } from "@/data/campaigns";
import { artists } from "@/data/artists";
import { formatNumber } from "@/lib/formatters";
import CampaignCard from "@/components/campaign/CampaignCard";
import SearchBar from "@/components/shared/SearchBar";
import CitySelector from "@/components/shared/CitySelector";
import GenreFilter from "@/components/shared/GenreFilter";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

const HERO_IMG =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80";

export default function BrandDiscoverPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "artists">("campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      if (c.status === "completed" || c.status === "expired") return false;
      if (selectedCity && c.city.id !== selectedCity) return false;
      if (selectedGenre && c.artist.genre !== selectedGenre) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          c.artist.name.toLowerCase().includes(q) ||
          c.city.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCity, selectedGenre]);

  const filteredArtists = useMemo(() => {
    return artists.filter((a) => {
      if (selectedGenre && a.genre !== selectedGenre) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          a.genre.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedGenre]);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="relative h-[280px] overflow-hidden -mt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/60 to-surface-dark" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wide">
            Find Your Next Partnership
          </h1>
          <p className="mt-2 text-white/70 text-lg">
            Browse artists and campaigns to sponsor, or book talent for your next event.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === "campaigns"
                ? "bg-btb-yellow text-black"
                : "bg-surface-elevated text-text-secondary border border-border-dark hover:text-white"
            }`}
          >
            Campaigns to Sponsor
          </button>
          <button
            onClick={() => setActiveTab("artists")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === "artists"
                ? "bg-btb-yellow text-black"
                : "bg-surface-elevated text-text-secondary border border-border-dark hover:text-white"
            }`}
          >
            Artists to Book
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          <SearchBar
            onSearch={setSearchQuery}
            variant="dark"
            placeholder={
              activeTab === "campaigns"
                ? "Search campaigns, artists, or cities..."
                : "Search artists or genres..."
            }
          />
          {activeTab === "campaigns" && (
            <CitySelector
              selectedCity={selectedCity}
              onSelect={setSelectedCity}
            />
          )}
          <GenreFilter
            selectedGenre={selectedGenre}
            onSelect={setSelectedGenre}
          />
        </div>

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <>
            {filteredCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-text-muted">No campaigns found</p>
                <p className="text-sm text-text-muted mt-2">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
            <div className="mt-6 text-sm text-text-muted">
              {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? "s" : ""} found
            </div>
          </>
        )}

        {/* Artists Tab */}
        {activeTab === "artists" && (
          <>
            {filteredArtists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="bg-surface-elevated border border-border-dark rounded-xl overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02]"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        {artist.verified && (
                          <Badge variant="success">Verified</Badge>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="default">
                          {artist.genre.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide truncate">
                          {artist.name}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {formatNumber(artist.monthlyListeners)} monthly listeners
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>{artist.showsBooked} shows booked</span>
                        <span>{formatNumber(artist.totalPledges)} pledges</span>
                      </div>
                      <Link href={`/book-artist/${artist.slug}`}>
                        <Button variant="outline" size="sm" fullWidth>
                          Book for Event &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-text-muted">No artists found</p>
                <p className="text-sm text-text-muted mt-2">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
            <div className="mt-6 text-sm text-text-muted">
              {filteredArtists.length} artist{filteredArtists.length !== 1 ? "s" : ""} found
            </div>
          </>
        )}
      </div>
    </div>
  );
}
